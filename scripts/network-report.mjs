// FULL-AUTO — Mesure réseau consolidée + auto-remédiation Tier 1 (GitHub Actions).
// Self-discovering. Découvre TOUTES les propriétés GSC (sites.list) + GA4 (accountSummaries)
// via le compte de service, mesure indexation + audience, détecte + CLASSE les anomalies en
// 3 tiers, applique le Tier 1 (nudges sûrs réversibles), et envoie UN mail (Resend) SEULEMENT
// s'il y a quelque chose à dire (silent success sinon).
//
// TIERS :
//   T1 = auto-fixable & réversible (resoumission sitemap) → appliqué ici, aucun humain.
//   T2 = cause probable dans le CODE (désindexation) → nudge T1 + à router vers l'agent de
//        correction (PR ; auto-merge si tests verts) — hors de ce script (routine distante).
//   T3 = non auto-fixable (backlinks/autorité, cause externe) → diagnostic + plan, action humaine.
//
// Aucune écriture sur les sites. Écrit reports/network-report.json (commité par le workflow).
//
// ENV (secrets) : GSC_SA_JSON · RESEND_API_KEY · ALERT_EMAIL_TO · ALERT_EMAIL_FROM.
// ENV (options) : INDEX_THRESHOLD=0.4 · MAX_URLS_PER_SITE=150 · GA4_DAYS=28.

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { remediateTier1 } from './lib/remediate.mjs';

const SA = process.env.GSC_SA_JSON;
const RESEND_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.ALERT_EMAIL_TO || 'yapy.mambo@gmail.com';
const ALERT_FROM = process.env.ALERT_EMAIL_FROM || 'My DTM <hello@my-dtm.fr>';
const INDEX_THRESHOLD = Number.parseFloat(process.env.INDEX_THRESHOLD || '0.4');
const MIN_URLS = 5;                       // sous ce total, ratio non significatif → pas d'anomalie
const MAX_URLS = Number.parseInt(process.env.MAX_URLS_PER_SITE || '80', 10);
const GA4_DAYS = Number.parseInt(process.env.GA4_DAYS || '28', 10);
const DEBOUNCE_RUNS = Number.parseInt(process.env.DEBOUNCE_RUNS || '2', 10);   // une anomalie doit persister N runs avant d'être actionnable (anti-faux-positif)
const DESINDEX_MIN = Number.parseInt(process.env.DESINDEX_MIN || '2', 10);     // nb mini d'URL réellement basculées non-indexées pour signaler
const HEARTBEAT_DOW = Number.parseInt(process.env.HEARTBEAT_DOW || '1', 10);   // jour (0=dim..6=sam) du battement « je suis vivant » (défaut lundi)
const REPORT_PATH = 'reports/network-report.json';
// webmasters (full, pas readonly) pour resoumettre le sitemap ; analytics readonly pour GA4.
const SCOPES = 'https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/indexing';

if (!SA) { console.error('GSC_SA_JSON manquant (secret).'); process.exit(1); }
const key = JSON.parse(SA);
const b64 = (x) => Buffer.from(x).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const d = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({
    iss: key.client_email, scope: SCOPES, aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now,
  }))}`;
  const s = crypto.createSign('RSA-SHA256'); s.update(d); s.end();
  const jwt = `${d}.${b64(s.sign(key.private_key))}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error('token: ' + JSON.stringify(j));
  return j.access_token;
}

const brandKey = (s) => String(s).replace(/^sc-domain:/, '').replace(/^https?:\/\//, '').replace(/\/$/, '')
  .replace(/\.(fr|com|net|org)$/i, '').toLowerCase();

// ---- GSC : découverte + indexation par propriété -------------------------
async function gscNetwork(tok) {
  const r = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites', { headers: { Authorization: `Bearer ${tok}` } });
  const j = await r.json();
  if (j.error) throw new Error('sites.list: ' + j.error.message);
  const sites = (j.siteEntry || []).filter((s) => s.permissionLevel !== 'siteUnverifiedUser');
  const out = {};
  for (const s of sites) {
    const prop = s.siteUrl;
    const host = prop.replace(/^sc-domain:/, '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    let urls = [];
    try {
      const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
      urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.endsWith('.xml')).slice(0, MAX_URLS);
    } catch { /* pas de sitemap accessible */ }
    let indexed = 0, inspected = 0; const notIndexed = [], indexedUrls = [];
    for (const u of urls) {
      try {
        const ir = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ inspectionUrl: u, siteUrl: prop }),
        });
        const ij = await ir.json();
        const st = ij?.inspectionResult?.indexStatusResult?.coverageState || '';
        inspected++;
        if (/^Submitted and indexed$/i.test(st)) { indexed++; indexedUrls.push(u); }
        else notIndexed.push(u);              // pour la demande d'indexation Tier 1
      } catch { /* skip URL */ }
    }
    out[brandKey(prop)] = { property: prop, total: inspected, indexed, indexedUrls, notIndexed };
  }
  return out;
}

// ---- GA4 : découverte + audience 28 j -------------------------------------
async function ga4Network(tok) {
  const r = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200', { headers: { Authorization: `Bearer ${tok}` } });
  const j = await r.json();
  if (j.error) return { __error: j.error.message };
  const out = {};
  for (const a of j.accountSummaries || []) {
    for (const p of a.propertySummaries || []) {
      const id = p.property.replace('properties/', '');
      let sessions = null, users = null, status = 'NO_DATA';
      try {
        const rr = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${id}:runReport`, {
          method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateRanges: [{ startDate: `${GA4_DAYS}daysAgo`, endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'activeUsers' }] }),
        });
        const rj = await rr.json();
        const row = rj.rows?.[0];
        if (row) { sessions = Number(row.metricValues[0].value); users = Number(row.metricValues[1].value); status = 'OK'; }
      } catch { status = 'ERROR'; }
      out[brandKey(p.displayName.replace(/\s*[-–]\s*ga4$/i, '').replace(/\s+/g, '-'))] = { name: p.displayName, sessions, users, status };
    }
  }
  return out;
}

// ---- Détection + CLASSEMENT en tiers (vs run précédent) -------------------
// tier 1 = auto-fixable sûr · tier 2 = cause code (→ agent/PR) · tier 3 = humain.
function detect(now, prev) {
  const a = [];
  const prevAnoms = prev?.anomalies || [];
  const streakOf = (brand, type) => (prevAnoms.find((x) => x.brand === brand && x.type === type)?.streak || 0);
  for (const [brand, g] of Object.entries(now.gsc || {})) {
    // INDEXATION_LOW → Tier 1 : nudge sûr, agit tout de suite (pas besoin de debounce).
    if (g.total >= MIN_URLS && g.indexed / g.total < INDEX_THRESHOLD) {
      a.push({ severity: 'P1', type: 'INDEXATION_LOW', tier: 1, brand, streak: streakOf(brand, 'INDEXATION_LOW') + 1,
        detail: `${g.indexed}/${g.total} indexé (${Math.round(100 * g.indexed / g.total)}%)`,
        action: 'resoumission sitemap + demande indexation (auto)' });
    }
    // DESINDEXATION → sur les MÊMES URL (étaient indexées, ne le sont plus), pas un delta de total agrégé,
    // + debounce : ne devient actionnable (tier 2) qu'après persistance sur DEBOUNCE_RUNS runs.
    const p = prev?.gsc?.[brand];
    if (p && Array.isArray(p.indexedUrls) && Array.isArray(g.notIndexed)) {
      const nowNI = new Set(g.notIndexed);
      const flipped = p.indexedUrls.filter((u) => nowNI.has(u));   // vraie bascule indexé → non indexé
      if (flipped.length >= DESINDEX_MIN) {
        const streak = streakOf(brand, 'DESINDEXATION') + 1;
        const confirmed = streak >= DEBOUNCE_RUNS;
        a.push({ severity: 'P1', type: 'DESINDEXATION', tier: confirmed ? 2 : 0, brand, streak, confirmed,
          detail: `${flipped.length} URL désindexées (run ${streak}/${DEBOUNCE_RUNS})`,
          action: confirmed ? 'diagnostic code → agent (PR, auto-merge si tests verts)'
                            : 'surveillance — non confirmé (persiste ?)' });
      }
    }
  }
  for (const [brand, g] of Object.entries(now.ga4 || {})) {
    const p = prev?.ga4?.[brand];
    if (g.status === 'OK' && p?.status === 'OK' && p.sessions > 0 && g.sessions < p.sessions * 0.5) {
      const streak = streakOf(brand, 'CHUTE_AUDIENCE') + 1;
      const confirmed = streak >= DEBOUNCE_RUNS;
      a.push({ severity: 'P1', type: 'CHUTE_AUDIENCE', tier: confirmed ? 3 : 0, brand, streak, confirmed,
        detail: `sessions ${p.sessions} → ${g.sessions} (-${Math.round(100 * (1 - g.sessions / p.sessions))}%, run ${streak}/${DEBOUNCE_RUNS})`,
        action: confirmed ? 'diagnostic requis (tag GA4 / cause externe) — action humaine' : 'surveillance — non confirmé' });
    }
  }
  return a;
}

function emailBody(report) {
  const byTier = (t) => report.anomalies.filter((x) => x.tier === t);
  const seg = [];
  const fixed = report.remediation.filter((r) => r.ok);
  if (fixed.length) seg.push(`✅ AUTO-CORRIGÉ (Tier 1) :\n` + fixed.map((r) => `   • ${r.brand} — ${r.action}${r.detail ? ` : ${r.detail}` : ''}${r.reason ? ` (${r.reason})` : ''}`).join('\n'));
  const t2 = byTier(2);
  if (t2.length) seg.push(`🟡 À CORRIGER PAR L'AGENT (Tier 2 — code) :\n` + t2.map((x) => `   • ${x.brand} : ${x.type} — ${x.detail}\n     → ${x.action}`).join('\n'));
  const t3 = byTier(3);
  if (t3.length) seg.push(`🔴 À REGARDER (Tier 3 — humain) :\n` + t3.map((x) => `   • ${x.brand} : ${x.type} — ${x.detail}\n     → ${x.action}`).join('\n'));
  const watch = byTier(0);
  if (watch.length) seg.push(`👀 EN SURVEILLANCE (non confirmé — anti-faux-positif) :\n` + watch.map((x) => `   • ${x.brand} : ${x.type} — ${x.detail}`).join('\n'));
  const failed = report.remediation.filter((r) => !r.ok);
  if (failed.length) seg.push(`⚠️ Tier 1 échec (à vérifier) :\n` + failed.map((r) => `   • ${r.brand} — ${r.action} (${r.status ?? r.error ?? r.detail})`).join('\n'));
  if (!seg.length) seg.push('✅ Aucune anomalie. Réseau sain.');
  return `Mesure automatique du réseau (${report.generatedAt}).\n\n${seg.join('\n\n')}\n\nDétail complet : reports/network-report.json.`;
}

async function sendEmail(report, isHeartbeat) {
  if (!RESEND_KEY) { console.log('RESEND_API_KEY absent → pas d\'email (résumé affiché seulement).'); return; }
  const nFix = report.remediation.filter((r) => r.ok).length;
  const nTodo = report.anomalies.filter((x) => x.tier >= 2).length;
  const nothing = report.anomalies.length === 0 && report.remediation.length === 0;
  const jour = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][HEARTBEAT_DOW];
  const subject = nothing
    ? `[Réseau SEO] 💓 battement — réseau sain (${Object.keys(report.gsc).length} sites)`
    : `[Réseau SEO] ${nFix} auto-corrigé(s) · ${nTodo} à traiter`;
  const text = (isHeartbeat && nothing)
    ? `Battement de cœur hebdo — le système est VIVANT (${report.generatedAt}).\n\n✅ ${Object.keys(report.gsc).length} sites mesurés, aucune anomalie.\n\n⚠️ Si tu ne reçois PAS ce message un ${jour}, le système est peut-être en panne (dead-man's switch).\n\nDétail : reports/network-report.json.`
    : emailBody(report);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: ALERT_FROM, to: [ALERT_TO], subject, text }),
  });
  console.log(r.ok ? '✉️  email envoyé.' : `✉️  échec email: ${await r.text()}`);
}

(async () => {
  const tok = await token();
  const [gsc, ga4] = await Promise.all([gscNetwork(tok), ga4Network(tok)]);
  const now = { generatedAt: new Date().toISOString(), gsc, ga4 };
  let prev = null;
  try { prev = JSON.parse(await fs.readFile(REPORT_PATH, 'utf8')); } catch { /* premier run */ }
  now.anomalies = detect(now, prev);
  // Token FRAIS avant la remédiation : l'inspection peut durer ~1h et le token vit 60 min
  // (sinon le PUT sitemap échoue en HTTP 401 « token expiré »).
  const tokFresh = await token();
  now.remediation = await remediateTier1(now.anomalies, now, tokFresh);   // Tier 1 auto-appliqué

  const nIdx = Object.keys(gsc).length, nAud = Object.values(ga4).filter((x) => x.status === 'OK').length;
  console.log(`GSC: ${nIdx} propriétés · GA4: ${nAud}/${Object.keys(ga4).length} avec données · anomalies: ${now.anomalies.length} · auto-corrigé: ${now.remediation.filter((r) => r.ok).length}`);
  for (const x of now.anomalies) console.log(`  • [T${x.tier}] ${x.type} — ${x.brand} : ${x.detail}`);
  for (const r of now.remediation) console.log(`  ⚙️  ${r.ok ? 'OK' : 'ÉCHEC'} ${r.action} — ${r.brand} (HTTP ${r.status ?? r.error})`);

  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile(REPORT_PATH, JSON.stringify(now, null, 2));

  // e-mail si : quelque chose à dire (anomalie/remédiation) OU jour du battement de cœur
  // (dead-man's switch : l'absence du battement hebdo = système en panne).
  const somethingToSay = now.anomalies.length > 0 || now.remediation.length > 0;
  const isHeartbeat = new Date().getUTCDay() === HEARTBEAT_DOW;
  if (somethingToSay || isHeartbeat) await sendEmail(now, isHeartbeat);
  else console.log('✅ Aucune anomalie, hors jour de battement → aucun email (silent success).');
})().catch((e) => { console.error('Erreur:', e.message); process.exit(1); });
