// Suivi d'indexation CIBLÉ du cluster « facturation électronique ».
// Inspecte uniquement les URLs du cluster (pilier + spokes + outils) via la
// GSC URL Inspection API, groupe par coverageState, écrit un rapport horodaté
// et affiche le delta vs le rapport précédent.
//
// Usage : npm run gsc:facturation
// Clé de service account : ~/Library/Application Support/yapia-seo/gsc-key.json
//   (override : GSC_KEY_FILE ou GSC_KEY). Même clé que gsc:report.

import crypto from "node:crypto";
import fs from "node:fs/promises";

const HOME = process.env.HOME || process.env.USERPROFILE || "";
const KEY_FILE =
  process.env.GSC_KEY_FILE ||
  process.env.GSC_KEY ||
  `${HOME}/Library/Application Support/yapia-seo/gsc-key.json`;
const SITE_URL = "https://my-dtm.fr";
const GSC_SITE = "sc-domain:my-dtm.fr";
const REPORT_FILE = "reports/gsc-facturation.json";
const CONCURRENCY = 6;

// Une URL appartient au cluster si son chemin correspond à l'un de ces motifs.
const CLUSTER_RE = /(facturation-electronique|facture-electronique|comparateur-plateformes-agreees)/;

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

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

async function fetchClusterUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls.filter((u) => CLUSTER_RE.test(u)).sort();
}

async function inspectUrl(token, url) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_SITE }),
  });
  const json = await res.json();
  const r = json?.inspectionResult?.indexStatusResult ?? {};
  return { status: res.status, coverageState: r.coverageState ?? null, verdict: r.verdict ?? null, lastCrawl: r.lastCrawlTime ?? null, error: json?.error?.message ?? null };
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let i = 0;
  async function next() {
    const idx = i++;
    if (idx >= items.length) return;
    results[idx] = await worker(items[idx]);
    return next();
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

function isIndexed(state) {
  return /indexed/i.test(state || "") && !/not indexed/i.test(state || "");
}

(async () => {
  console.log("→ Auth GSC…");
  const token = await getAccessToken("https://www.googleapis.com/auth/webmasters.readonly");

  console.log("→ Récupération des URLs du cluster (sitemap)…");
  const urls = await fetchClusterUrls();
  console.log(`✓ ${urls.length} URLs du cluster « facturation électronique »\n`);

  console.log(`→ Inspection (concurrence ${CONCURRENCY})…`);
  const t0 = Date.now();
  const results = await runPool(urls, CONCURRENCY, async (u) => {
    try {
      return { url: u, ...(await inspectUrl(token, u)) };
    } catch (e) {
      return { url: u, status: -1, error: e.message, coverageState: null };
    }
  });
  console.log(`✓ Terminé en ${((Date.now() - t0) / 1000).toFixed(0)}s\n`);

  const groups = {};
  for (const r of results) (groups[r.coverageState ?? `ERROR_${r.status}`] ||= []).push(r.url);

  console.log("Répartition (coverageState) :");
  for (const [k, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${list.length.toString().padStart(3)}  ${k}`);
  }

  const indexed = results.filter((r) => isIndexed(r.coverageState));
  const pending = results.filter((r) => !isIndexed(r.coverageState));
  console.log(`\n✅ Indexées : ${indexed.length} / ${results.length}`);

  if (pending.length) {
    console.log(`\n🎯 À faire indexer (${pending.length}) — candidates pour « Demander l'indexation » (GSC UI, ~10/jour) :`);
    pending.forEach((r, i) => console.log(`  ${(i + 1).toString().padStart(2)}. [${r.coverageState ?? "?"}] ${r.url}`));
  }

  // Delta vs rapport précédent.
  let prev = null;
  try { prev = JSON.parse(await fs.readFile(REPORT_FILE, "utf8")); } catch { /* première exécution */ }

  await fs.mkdir("reports", { recursive: true });
  await fs.writeFile(
    REPORT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        site: GSC_SITE,
        cluster: "facturation-electronique",
        total: results.length,
        indexed: indexed.length,
        groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])),
        indexedUrls: indexed.map((r) => r.url).sort(),
        pendingUrls: pending.map((r) => ({ url: r.url, state: r.coverageState })),
      },
      null,
      2,
    ),
  );
  console.log(`\n✓ Rapport écrit : ${REPORT_FILE}`);

  if (prev) {
    const fmt = (n) => (n >= 0 ? `+${n}` : `${n}`);
    console.log(`\n📊 Évolution vs ${prev.generatedAt?.slice(0, 10) ?? "précédent"} :`);
    console.log(`  Indexées : ${prev.indexed ?? 0} → ${indexed.length}  (${fmt(indexed.length - (prev.indexed ?? 0))})`);
    const prevIdx = new Set(prev.indexedUrls ?? []);
    const gained = indexed.map((r) => r.url).filter((u) => !prevIdx.has(u));
    if (gained.length) {
      console.log(`  🟢 Nouvellement indexées (${gained.length}) :`);
      gained.forEach((u) => console.log(`     + ${u}`));
    }
  }
})().catch((e) => {
  console.error("Erreur:", e.message);
  process.exit(1);
});
