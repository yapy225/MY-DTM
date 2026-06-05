// Désindexe les URLs de l'ANCIEN site my-dtm.fr encore connues de Google.
// Sécurité : ne pousse URL_DELETED que pour les URLs qui sont
//   (1) hors du sitemap actuel ET (2) réellement en 404/410 (vérifié en direct).
// Impossible de désindexer une page vivante par erreur.
//
// Usage local :
//   GSC_KEY_FILE=~/Downloads/dreamteamafrica-643167d8e328.json node scripts/gsc-deindex-old-urls.mjs --dry-run
//   GSC_KEY_FILE=...                                           node scripts/gsc-deindex-old-urls.mjs   (pousse réellement)

import crypto from "node:crypto";
import fs from "node:fs/promises";

const KEY_FILE = process.env.GSC_KEY_FILE || "/Users/yaps225/Downloads/dreamteamafrica-643167d8e328.json";
const GSC_SITE = "sc-domain:my-dtm.fr";
const SITEMAP = "https://my-dtm.fr/sitemap.xml";
const DRY = process.argv.includes("--dry-run");
const LOOKBACK_DAYS = 180;
const QUOTA = 200; // Indexing API : 200 requêtes/jour

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const norm = (u) => u.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "").toLowerCase();

async function getAccessToken(scope) {
  const key = JSON.parse(await fs.readFile(KEY_FILE, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const data = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({ iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now }),
  )}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  const jwt = `${data}.${b64url(signer.sign(key.private_key))}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString(),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Token error: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function fetchIndexedPages(token) {
  const end = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10); // -2j (latence API)
  const start = new Date(Date.now() - LOOKBACK_DAYS * 86400000).toISOString().slice(0, 10);
  const pages = [];
  let startRow = 0;
  for (;;) {
    const r = await (
      await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 1000, startRow }),
      })
    ).json();
    const rows = r.rows || [];
    pages.push(...rows.map((x) => x.keys[0]));
    if (rows.length < 1000) break;
    startRow += 1000;
  }
  return pages;
}

async function realUrlSet() {
  const xml = await (await fetch(SITEMAP)).text();
  return new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1])));
}

async function isGone(url) {
  try {
    const r = await fetch(url, { redirect: "follow" });
    return r.status === 404 || r.status === 410;
  } catch {
    return false; // en cas d'erreur réseau, on ne supprime pas (sécurité)
  }
}

async function pool(items, n, worker) {
  const out = new Array(items.length);
  let i = 0;
  async function next() {
    const idx = i++;
    if (idx >= items.length) return;
    out[idx] = await worker(items[idx], idx);
    return next();
  }
  await Promise.all(Array.from({ length: n }, next));
  return out;
}

async function deleteUrl(token, url) {
  const r = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: "URL_DELETED" }),
  });
  return { status: r.status, body: await r.json() };
}

(async () => {
  console.log(`→ Auth GSC… ${DRY ? "(DRY-RUN, aucune suppression)" : ""}`);
  const roToken = await getAccessToken("https://www.googleapis.com/auth/webmasters.readonly");

  console.log("→ Pages connues de Google (Search Analytics)…");
  const pages = await fetchIndexedPages(roToken);
  console.log(`✓ ${pages.length} pages avec impressions sur ${LOOKBACK_DAYS}j`);

  if (pages.length === 0) {
    console.log("\nℹ️  Aucune donnée pour le moment (propriété récente : l'API met 2-3 jours à se remplir).");
    console.log("   Rien à faire aujourd'hui — relancez le script dans quelques jours.");
    return;
  }

  const real = await realUrlSet();
  const candidates = [...new Set(pages.filter((p) => !real.has(norm(p))))];
  console.log(`→ ${candidates.length} candidates (hors sitemap actuel). Vérification 404 en direct…`);

  const checked = await pool(candidates, 6, async (u) => ({ url: u, gone: await isGone(u) }));
  const toDelete = checked.filter((c) => c.gone).map((c) => c.url);
  const alive = checked.filter((c) => !c.gone).map((c) => c.url);

  console.log(`\n✅ Confirmées SUPPRIMÉES (404/410) : ${toDelete.length}`);
  toDelete.slice(0, 30).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
  if (toDelete.length > 30) console.log(`  … et ${toDelete.length - 30} autres`);
  if (alive.length) {
    console.log(`\n⏭️  Hors sitemap MAIS vivantes (NON supprimées, par sécurité) : ${alive.length}`);
    alive.slice(0, 15).forEach((u) => console.log(`  - ${u}`));
  }

  await fs.writeFile(
    "deindex-report.json",
    JSON.stringify({ generatedAt: new Date().toISOString(), candidates: candidates.length, toDelete, alive }, null, 2),
  );

  if (DRY) {
    console.log("\n(DRY-RUN) — rien n'a été poussé. Retirez --dry-run pour désindexer.");
    return;
  }
  if (toDelete.length === 0) {
    console.log("\nRien à désindexer 🎉");
    return;
  }

  const idxToken = await getAccessToken("https://www.googleapis.com/auth/indexing");
  const batch = toDelete.slice(0, QUOTA);
  if (toDelete.length > QUOTA) console.log(`\n⚠️  Quota ${QUOTA}/jour — ${toDelete.length - QUOTA} restantes pour les jours suivants.`);
  console.log(`\n→ Désindexation (URL_DELETED) de ${batch.length} URLs…`);
  let ok = 0, ko = 0;
  for (let i = 0; i < batch.length; i++) {
    const r = await deleteUrl(idxToken, batch[i]);
    if (r.status === 200) { ok++; console.log(`  [${i + 1}/${batch.length}] ✓ ${batch[i]}`); }
    else { ko++; console.log(`  [${i + 1}/${batch.length}] ✗ ${batch[i]} → ${r.body?.error?.message}`); }
    await new Promise((res) => setTimeout(res, 150));
  }
  console.log(`\nRésultat : ${ok} désindexées, ${ko} rejetées`);
})().catch((e) => {
  console.error("Erreur:", e.message);
  process.exit(1);
});
