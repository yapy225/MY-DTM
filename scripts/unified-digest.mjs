// DIGEST UNIFIÉ — canal e-mail UNIQUE du réseau (remplace l'e-mail de la mesure).
// Lit le contrat gouverné (reports/network-report.json) + l'activité de l'agent T2
// (reports/t2-status.json, écrit par la routine T2) → UN seul e-mail à 08:00 UTC
// (après la mesure 06:00 et l'agent T2 07:31). Ne recalcule RIEN : simple présentateur.
//
// Dead-man's switch renforcé : si le rapport de mesure est absent → alerte « mesure en panne ».
// ENV : RESEND_API_KEY · ALERT_EMAIL_TO · ALERT_EMAIL_FROM · HEARTBEAT_DOW (défaut lundi).

import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { emailBody } from './network-report.mjs';

const RESEND_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.ALERT_EMAIL_TO || 'yapy.mambo@gmail.com';
const ALERT_FROM = process.env.ALERT_EMAIL_FROM || 'My DTM <hello@centreculturelafricain.fr>';
const HEARTBEAT_DOW = Number.parseInt(process.env.HEARTBEAT_DOW || '1', 10);

// Section « agent T2 » à partir de son JSON de sortie (verdicts FIX_PR/DRAFT_ONLY/NO_CODE_CAUSE/…).
export function t2Section(t2) {
  if (!t2) return '\n\n🤖 AGENT T2 : (pas de résultat disponible ce run)';
  const names = (arr) => (arr || []).map((x) => x.brand || x.repo || String(x)).join(', ');
  const lines = [];
  if (t2.traite?.length) lines.push(`   • traités : ${t2.traite.map((x) => `${x.brand}→${x.verdict}${x.pr ? ` (${x.pr})` : ''}`).join(' ; ')}`);
  if (t2.no_code_cause?.length) lines.push(`   • faux positifs écartés (aucune cause code) : ${names(t2.no_code_cause)}`);
  if (t2.escalade_humain?.length) lines.push(`   • escaladés humain : ${names(t2.escalade_humain)}`);
  if (t2.ignore_hors_carte?.length) lines.push(`   • hors carte (ignorés) : ${names(t2.ignore_hors_carte)}`);
  if (!lines.length) lines.push('   • rien à corriger (RAS)');
  return `\n\n🤖 AGENT T2 (dernier run) :\n${lines.join('\n')}`;
}

// Compose le digest. Retourne { send, subject, text }. Pure → testable.
export function composeDigest(report, t2, { isHeartbeat }) {
  if (!report) {
    return { send: true, subject: '[Réseau SEO] ⚠️ ALERTE — rapport de mesure ABSENT',
      text: 'Le digest n\'a trouvé AUCUN rapport de mesure (reports/network-report.json).\n\n'
          + '⚠️ La mesure quotidienne est probablement EN PANNE (cron, secrets, ou quota). À vérifier.' };
  }
  const somethingToSay = (report.anomalies?.length || 0) > 0 || (report.remediation?.length || 0) > 0;
  const nFix = (report.remediation || []).filter((r) => r.ok).length;
  const nTodo = (report.anomalies || []).filter((x) => x.tier >= 2).length;
  const nT2 = (t2?.traite?.length || 0);
  const subject = somethingToSay || nT2
    ? `[Réseau SEO] ${nFix} auto-corrigé(s) · ${nTodo} à traiter · T2 ${nT2}`
    : `[Réseau SEO] 💓 battement — réseau sain (${Object.keys(report.gsc || {}).length} sites)`;
  const text = emailBody(report) + t2Section(t2);
  return { send: somethingToSay || nT2 > 0 || isHeartbeat, subject, text };
}

async function sendResend(subject, text) {
  if (!RESEND_KEY) { console.log('RESEND_API_KEY absent → pas d\'email.'); return; }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: ALERT_FROM, to: [ALERT_TO], subject, text }),
  });
  console.log(r.ok ? '✉️  digest envoyé.' : `✉️  échec: ${await r.text()}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) (async () => {
  const report = await fs.readFile('reports/network-report.json', 'utf8').then(JSON.parse).catch(() => null);
  const t2 = await fs.readFile('reports/t2-status.json', 'utf8').then(JSON.parse).catch(() => null);
  const isHeartbeat = new Date().getUTCDay() === HEARTBEAT_DOW;
  const { send, subject, text } = composeDigest(report, t2, { isHeartbeat });
  console.log(`digest: send=${send} · ${subject}`);
  if (send) await sendResend(subject, text);
  else console.log('✅ Rien à dire, hors battement → aucun email (silent success).');
})().catch((e) => { console.error('Erreur:', e.message); process.exit(1); });
