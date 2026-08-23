// FULL-AUTO — Mesure réseau consolidée (GitHub Actions). Self-discovering, READ-ONLY.
// Découvre TOUTES les propriétés GSC (sites.list) + GA4 (accountSummaries) via le
// compte de service, mesure indexation + audience, détecte les anomalies vs le run
// précédent, et envoie UN mail (Resend) SEULEMENT s'il y a une anomalie (silent success).
//
// Aucune action, aucune écriture sur les sites : lit des APIs Google + écrit un
// rapport JSON local (reports/network-report.json, commité par le workflow pour le delta).
//
// ENV (secrets GitHub) : GSC_SA_JSON (clé du compte de service, JSON complet) ·
//   RESEND_API_KEY · ALERT_EMAIL_TO · ALERT_EMAIL_FROM (from = domaine vérifié Resend).
// ENV (options) : INDEX_THRESHOLD=0.4 · MAX_URLS_PER_SITE=150 · GA4_DAYS=28.

import crypto from 'node:crypto';
import fs from 'node:fs/promises';

const SA = process.env.GSC_SA_JSON;
const RESEND_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.ALERT_EMAIL_TO || 'yapy.mambo@gmail.com';
const ALERT_FROM = process.env.ALERT_EMAIL_FROM || 'My DTM <hello@my-dtm.fr>';
const INDEX_THRESHOLD = Number.parseFloat(process.env.INDEX_THRESHOLD || '0.4');
const MIN_URLS = 5;                       // sous ce total, ratio non significatif → pas d'anomalie
const MAX_URLS = Number.parseInt(process.env.MAX_URLS_PER_SITE || '150', 10);
const GA4_DAYS = Number.parseInt(process.env.GA4_DAYS || '28', 10);
const REPORT_PATH = 'reports/network-report.json';
const SCOPES = 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly';

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
    let indexed = 0, inspected = 0;
    for (const u of urls) {
      try {
        const ir = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ inspectionUrl: u, siteUrl: prop }),
        });
        const ij = await ir.json();
        const st = ij?.inspectionResult?.indexStatusResult?.coverageState || '';
        inspected++;
        if (/^Submitted and indexed$/i.test(st)) indexed++;
      } catch { /* skip URL */ }
    }
    out[brandKey(prop)] = { property: prop, total: inspected, indexed };
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

// ---- Détection d'anomalies (vs run précédent) -----------------------------
function detect(now, prev) {
  const a = [];
  for (const [brand, g] of Object.entries(now.gsc || {})) {
    if (g.total >= MIN_URLS && g.indexed / g.total < INDEX_THRESHOLD) {
      a.push({ severity: 'P1', type: 'INDEXATION_LOW', brand, detail: `${g.indexed}/${g.total} indexé (${Math.round(100 * g.indexed / g.total)}%)` });
    }
    const p = prev?.gsc?.[brand];
    if (p && g.indexed < p.indexed - 2) {
      a.push({ severity: 'P1', type: 'DESINDEXATION', brand, detail: `indexé ${p.indexed} → ${g.indexed} (-${p.indexed - g.indexed})` });
    }
  }
  for (const [brand, g] of Object.entries(now.ga4 || {})) {
    const p = prev?.ga4?.[brand];
    if (g.status === 'OK' && p?.status === 'OK' && p.sessions > 0 && g.sessions < p.sessions * 0.5) {
      a.push({ severity: 'P1', type: 'CHUTE_AUDIENCE', brand, detail: `sessions ${p.sessions} → ${g.sessions} (-${Math.round(100 * (1 - g.sessions / p.sessions))}%)` });
    }
  }
  return a;
}

async function sendEmail(anoms, now) {
  if (!RESEND_KEY) { console.log('RESEND_API_KEY absent → pas d\'email (anomalies affichées seulement).'); return; }
  const lines = anoms.map((x) => `• [${x.severity}] ${x.type} — ${x.brand} : ${x.detail}`).join('\n');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: ALERT_FROM, to: [ALERT_TO],
      subject: `[Réseau SEO] ${anoms.length} anomalie(s) à regarder`,
      text: `Mesure automatique du réseau (${now.generatedAt}).\n\n${lines}\n\nDétail : reports/network-report.json.\nSilence = tout va bien (silent success).`,
    }),
  });
  console.log(r.ok ? '✉️  email envoyé.' : `✉️  échec email: ${await r.text()}`);
}

(async () => {
  const tok = await token();
  const [gsc, ga4] = await Promise.all([gscNetwork(tok), ga4Network(tok)]);
  const now = { generatedAt: new Date().toISOString(), gsc, ga4 };
  let prev = null;
  try { prev = JSON.parse(await fs.readFile(REPORT_PATH, 'utf8')); } catch { /* premier run */ }
  const anomalies = detect(now, prev);
  now.anomalies = anomalies;

  const nIdx = Object.keys(gsc).length, nAud = Object.values(ga4).filter((x) => x.status === 'OK').length;
  console.log(`GSC: ${nIdx} propriétés · GA4: ${nAud} avec données / ${Object.keys(ga4).length} · anomalies: ${anomalies.length}`);
  for (const x of anomalies) console.log(`  • [${x.severity}] ${x.type} — ${x.brand} : ${x.detail}`);

  await fs.mkdir('reports', { recursive: true });
  await fs.writeFile(REPORT_PATH, JSON.stringify(now, null, 2));
  if (anomalies.length > 0) await sendEmail(anomalies, now);
  else console.log('✅ Aucune anomalie → aucun email (silent success).');
})().catch((e) => { console.error('Erreur:', e.message); process.exit(1); });
