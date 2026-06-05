// Pousse via l'Indexing API de Google les URLs non indexées trouvées par
// scripts/gsc-crawled-not-indexed.mjs (rapport gsc-indexation-report.json).
// Usage : node scripts/push-unknown-urls.mjs [--all]
//   sans --all : pousse seulement "URL is unknown to Google"
//   --all      : pousse aussi "Discovered - not indexed" et "Crawled - not indexed"
//
// NB : l'Indexing API est officiellement prévue pour JobPosting/BroadcastEvent.
// Usage ici pour accélérer la découverte des pages (même schéma que DTA).

import crypto from "node:crypto";
import fs from "node:fs/promises";

const KEY_FILE = process.env.GSC_KEY_FILE || "/Users/yaps225/Downloads/dreamteamafrica-643167d8e328.json";
const REPORT = "gsc-indexation-report.json";
const pushAll = process.argv.includes("--all");

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

async function submit(token, url) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  const json = await res.json();
  return { status: res.status, body: json };
}

(async () => {
  let data;
  try {
    data = JSON.parse(await fs.readFile(REPORT, "utf8"));
  } catch {
    console.log(`Rapport ${REPORT} introuvable — lancez d'abord scripts/gsc-crawled-not-indexed.mjs`);
    return;
  }
  const unknown = data.byState?.["URL is unknown to Google"] || [];
  const discovered = data.byState?.["Discovered - currently not indexed"] || [];
  const crawled = data.byState?.["Crawled - currently not indexed"] || [];

  const toPush = pushAll ? [...unknown, ...discovered, ...crawled] : unknown;
  console.log(`✓ ${toPush.length} URLs à pousser`);
  console.log(`   - unknown: ${unknown.length}`);
  console.log(`   - discovered (--all): ${discovered.length}${pushAll ? "" : " [skip]"}`);
  console.log(`   - crawled (--all): ${crawled.length}${pushAll ? "" : " [skip]"}\n`);

  if (toPush.length === 0) {
    console.log("Rien à pousser 🎉");
    return;
  }

  const token = await getAccessToken("https://www.googleapis.com/auth/indexing");
  console.log("✓ Token Indexing obtenu\n");

  const QUOTA = 200; // quota Indexing API par jour
  const batch = toPush.slice(0, QUOTA);
  if (toPush.length > QUOTA) {
    console.log(`⚠️  Quota 200/jour — je pousse les ${QUOTA} premières (${toPush.length - QUOTA} restantes pour plus tard)\n`);
  }

  let ok = 0;
  let ko = 0;
  const errors = [];
  for (let i = 0; i < batch.length; i++) {
    const url = batch[i];
    const r = await submit(token, url);
    if (r.status === 200) {
      ok++;
      console.log(`  [${i + 1}/${batch.length}] ✓ ${url}`);
    } else {
      ko++;
      errors.push({ url, status: r.status, error: r.body?.error?.message });
      console.log(`  [${i + 1}/${batch.length}] ✗ ${url} → ${r.body?.error?.message}`);
    }
    await new Promise((res) => setTimeout(res, 150));
  }

  console.log(`\nRésultat : ${ok} acceptées, ${ko} rejetées`);
  if (errors.length > 0) {
    console.log("\nErreurs :");
    errors.slice(0, 5).forEach((e) => console.log(`  ${e.url}\n    → ${e.error}`));
  }
})().catch((e) => {
  console.error("Erreur:", e.message);
  process.exit(1);
});
