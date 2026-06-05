// Audit d'indexation GSC sur tout le sitemap de my-dtm.fr.
// Propriété GSC = Domaine : sc-domain:my-dtm.fr
// Usage local : GSC_KEY_FILE=/Users/yaps225/Downloads/dreamteamafrica-643167d8e328.json node scripts/gsc-crawled-not-indexed.mjs

import crypto from "node:crypto";
import fs from "node:fs/promises";

const KEY_FILE = process.env.GSC_KEY_FILE || "/Users/yaps225/Downloads/dreamteamafrica-643167d8e328.json";
const SITE_URL = "https://my-dtm.fr"; // pour récupérer le sitemap
const GSC_SITE = "sc-domain:my-dtm.fr"; // propriété Domaine pour l'URL Inspection API
const CONCURRENCY = 6;

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken(scope) {
  const key = JSON.parse(await fs.readFile(KEY_FILE, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const data = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({
      iss: key.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  )}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  const jwt = `${data}.${b64url(signer.sign(key.private_key))}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Token error: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function fetchSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  const xml = await res.text();
  let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const subSitemaps = urls.filter((u) => u.endsWith(".xml"));
  if (subSitemaps.length > 0) {
    const all = [];
    for (const sm of subSitemaps) {
      const r = await fetch(sm);
      const t = await r.text();
      all.push(...[...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    }
    urls = all;
  }
  return urls;
}

async function inspectUrl(token, url) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_SITE }),
  });
  const json = await res.json();
  return {
    status: res.status,
    coverageState: json?.inspectionResult?.indexStatusResult?.coverageState ?? null,
    verdict: json?.inspectionResult?.indexStatusResult?.verdict ?? null,
    lastCrawl: json?.inspectionResult?.indexStatusResult?.lastCrawlTime ?? null,
    error: json?.error?.message ?? null,
  };
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let i = 0;
  let done = 0;
  async function next() {
    const idx = i++;
    if (idx >= items.length) return;
    results[idx] = await worker(items[idx], idx);
    done++;
    if (done % 10 === 0 || done === items.length) {
      process.stdout.write(`\r  Progress: ${done}/${items.length}`);
    }
    return next();
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

(async () => {
  console.log("→ Auth GSC…");
  const token = await getAccessToken("https://www.googleapis.com/auth/webmasters.readonly");
  console.log("✓ Token obtenu");

  console.log("→ Récupération sitemap…");
  const urls = await fetchSitemap();
  console.log(`✓ ${urls.length} URLs au sitemap\n`);

  console.log(`→ Inspection URL Inspection API (concurrence ${CONCURRENCY})…`);
  const t0 = Date.now();
  const results = await runPool(urls, CONCURRENCY, async (u) => {
    try {
      return { url: u, ...(await inspectUrl(token, u)) };
    } catch (e) {
      return { url: u, status: -1, error: e.message };
    }
  });
  console.log(`\n✓ Terminé en ${((Date.now() - t0) / 1000).toFixed(0)}s\n`);

  const groups = {};
  for (const r of results) {
    const key = r.coverageState ?? `ERROR_${r.status}`;
    (groups[key] ||= []).push(r);
  }

  console.log("Répartition des coverageState :");
  for (const [k, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${list.length.toString().padStart(5)}  ${k}`);
  }

  const indexed = results.filter((r) => /^Submitted and indexed$|indexed/i.test(r.coverageState || "") && !/not indexed/i.test(r.coverageState || ""));
  console.log(`\n✅ Indexées : ${indexed.length} / ${results.length}`);

  const crawledNotIndexed = results.filter(
    (r) => /crawled/i.test(r.coverageState || "") && /not indexed/i.test(r.coverageState || ""),
  );
  if (crawledNotIndexed.length) {
    console.log(`\n🎯 "Explorée, actuellement non indexée" : ${crawledNotIndexed.length} URL(s)`);
    crawledNotIndexed.slice(0, 30).forEach((r, i) => console.log(`  ${i + 1}. ${r.url}`));
  }

  const discovered = results.filter(
    (r) => /discovered/i.test(r.coverageState || "") && /not indexed/i.test(r.coverageState || ""),
  );
  if (discovered.length) {
    console.log(`\n🔍 "Découverte, actuellement non indexée" : ${discovered.length} URL(s)`);
    discovered.slice(0, 30).forEach((r, i) => console.log(`  ${i + 1}. ${r.url}`));
  }

  await fs.writeFile(
    "gsc-indexation-report.json",
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        site: GSC_SITE,
        total: results.length,
        indexed: indexed.length,
        groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])),
        byState: Object.fromEntries(Object.entries(groups).map(([k, list]) => [k, list.map((r) => r.url)])),
      },
      null,
      2,
    ),
  );
  console.log("\n✓ Rapport écrit : gsc-indexation-report.json");
})().catch((e) => {
  console.error("Erreur:", e.message);
  process.exit(1);
});
