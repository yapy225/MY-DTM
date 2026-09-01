#!/usr/bin/env node
// truth-network-check.mjs — vérifie que les sites du réseau ne publient AUCUN faux numéro
// (source = la vérité SERVIE par le gateway Yap IA, /api/truth). Self-healing : détecte +
// alerte (Resend), n'écrit rien sur les sites. Étend le monitor réseau (cf network-report.mjs).
//
// ENV : YAP_IA_TOKEN (accès /api/truth) · RESEND_API_KEY · ALERT_EMAIL_TO · ALERT_EMAIL_FROM
//
//   node scripts/truth-network-check.mjs           # scanne + alerte si dérive
//   node scripts/truth-network-check.mjs --strict   # exit 1 si dérive (pour CI bloquante)

const TRUTH_ENDPOINT = process.env.TRUTH_ENDPOINT || "https://mon-ia-five.vercel.app/api/truth";
const TOKEN = process.env.YAP_IA_TOKEN;
const RESEND_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.ALERT_EMAIL_TO || "yapy.mambo@gmail.com";
const ALERT_FROM = process.env.ALERT_EMAIL_FROM || "My DTM <hello@my-dtm.fr>";

// Sites événements du réseau + pages où vit le n° (source : network-map.json).
const SITES = [
  "foiredafrique.fr", "evasionparis.fr", "festivalduconteafricain.fr",
  "fashionweekafrica.fr", "festivalinternationalducinemaafricain.fr",
  "salonmadeinafrica.fr", "zaouliparis.fr", "justeunedanse.fr",
  // Plateforme billetterie (eburnia.fr = repo ARCHIVÉ, non modifiable → surveillé seulement)
  // + site principal.
  "eburnia.fr", "dreamteamafrica.com",
];
const PAGES = ["mentions-legales", "cgv-billetterie", "annulation", ""]; // "" = home

// Construit, pour un n° national 9 chiffres, un regex tolérant (espaces, &nbsp;, préfixes 0/+33).
function phoneRegex(n9) {
  const g = [n9[0], n9.slice(1, 3), n9.slice(3, 5), n9.slice(5, 7), n9.slice(7, 9)];
  const sep = "[  ]?";
  return new RegExp(`(?:\\+?33${sep}|0)?` + g.join(sep));
}

async function fetchTruth() {
  if (!TOKEN) throw new Error("NO_TOKEN");
  const r = await fetch(TRUTH_ENDPOINT, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!r.ok) throw new Error(`truth HTTP ${r.status}`);
  const j = await r.json();
  if (!j?.ok || !j?.truth?.wrongPhones) throw new Error("truth invalide");
  return j.truth;
}

async function getHtml(url) {
  try {
    const r = await fetch(url, { redirect: "follow" });
    if (!r.ok) return null;
    return (await r.text()).replace(/&nbsp;/g, " ");
  } catch { return null; }
}

async function sendAlert(violations, valid) {
  if (!RESEND_KEY) { console.log("(pas de RESEND_API_KEY — alerte non envoyée)"); return; }
  const body = `⚠️ FAUX NUMÉRO détecté sur ${violations.length} page(s) du réseau (source de vérité = ${valid}).\n\n`
    + violations.map((v) => `• ${v.url}\n  forme trouvée : « ${v.match} » (faux n° ${v.wrong})`).join("\n\n")
    + `\n\nCorriger : le numéro valide est ${valid}. Éditer la page, ou re-corriger via la source unique.`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: ALERT_FROM, to: ALERT_TO, subject: `🔴 Réseau : faux numéro publié (${violations.length})`, text: body }),
  }).catch((e) => console.error("Resend échec:", String(e)));
}

const strict = process.argv.includes("--strict");

let truth;
try { truth = await fetchTruth(); }
catch (e) {
  if (String(e.message) === "NO_TOKEN") { console.log("↷ YAP_IA_TOKEN absent — skip."); process.exit(0); }
  console.error(`✗ vérité indisponible (${e.message}) — skip.`); process.exit(0);
}

const wrongRes = truth.wrongPhones.map((w) => ({ wrong: w, re: phoneRegex(w) }));
const valid = truth.validWhatsApp.display;
const violations = [];

for (const site of SITES) {
  for (const page of PAGES) {
    const url = `https://${site}/${page}`;
    const html = await getHtml(url);
    if (!html) continue;
    for (const { wrong, re } of wrongRes) {
      const m = html.match(re);
      if (m) violations.push({ url, wrong, match: m[0].replace(/ /g, " ") });
    }
  }
}

if (violations.length) {
  console.error(`🔴 ${violations.length} faux numéro(s) détecté(s) :`);
  for (const v of violations) console.error(`   · ${v.url} → « ${v.match} » (faux ${v.wrong})`);
  await sendAlert(violations, valid);
  if (strict) process.exit(1);
} else {
  console.log(`✓ Réseau propre : aucun faux numéro sur ${SITES.length} sites (n° valide ${valid}).`);
}
