// Rapport GA4 transverse du réseau (audience par marque).
// -------------------------------------------------------------------------
// Découvre AUTOMATIQUEMENT toutes les propriétés GA4 visibles par le compte de
// service (Analytics Admin API) puis lit les métriques de chacune (Analytics
// Data API). Aucun ID de propriété en dur → auto-adaptatif quand tu en ajoutes.
//
// Usage : npm run ga4:report            (28 derniers jours par défaut)
//         GA4_DAYS=7 npm run ga4:report (fenêtre personnalisée)
//
// PRÉREQUIS (une seule fois) :
//   1) Le compte de service est LECTEUR sur le compte GA4 « Dream Team Africa Paris ».
//   2) Activer 2 APIs dans le projet GCP dreamteamafrica :
//      - Analytics Admin API : https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com
//      - Analytics Data API  : https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com
//
// Clé du compte de service : ~/Library/Application Support/yapia-seo/gsc-key.json
//   (override via GSC_KEY_FILE / GSC_KEY). Scope demandé : analytics.readonly.
//
// DOCTRINE (LIVRE-MAITRE §10/§17) : une propriété SANS données (GA4 déployé mais
// pas encore collectant) est déclarée « NO_DATA », JAMAIS lue comme « 0 visiteur ».

import crypto from "node:crypto";
import fs from "node:fs/promises";

const HOME = process.env.HOME || process.env.USERPROFILE || "";
const KEY_FILE =
  process.env.GSC_KEY_FILE ||
  process.env.GSC_KEY ||
  `${HOME}/Library/Application Support/yapia-seo/gsc-key.json`;
const DAYS = Number.parseInt(process.env.GA4_DAYS || "28", 10);
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const CONCURRENCY = 4;

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken() {
  const key = JSON.parse(await fs.readFile(KEY_FILE, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const data = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({ iss: key.client_email, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now }),
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
  return { token: json.access_token, sa: key.client_email };
}

function apiHint(status, message) {
  if (/has not been used in project|is disabled/i.test(message || "")) {
    return "\n⚠️  API Google non activée. Active dans le projet GCP dreamteamafrica :\n" +
      "   • Analytics Admin API : https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com\n" +
      "   • Analytics Data API  : https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com";
  }
  if (status === 403) return "\n⚠️  Accès refusé : le compte de service n'est pas (encore) Lecteur sur le compte/la propriété GA4.";
  return "";
}

async function listProperties(token) {
  const res = await fetch("https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (json.error) throw new Error(`Admin API ${json.error.status}: ${json.error.message}${apiHint(res.status, json.error.message)}`);
  const props = [];
  for (const a of json.accountSummaries || []) {
    for (const p of a.propertySummaries || []) {
      props.push({ account: a.displayName, name: p.displayName, id: p.property.replace("properties/", "") });
    }
  }
  return props;
}

async function runReport(token, propertyId) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: "today" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "engagedSessions" },
      ],
    }),
  });
  const json = await res.json();
  if (json.error) return { status: "ERROR", detail: json.error.message };
  const row = json.rows?.[0];
  if (!row) return { status: "NO_DATA" }; // GA4 déployé mais pas encore de collecte → PAS « 0 »
  const v = row.metricValues.map((m) => Number(m.value));
  return { status: "OK", sessions: v[0], users: v[1], views: v[2], engaged: v[3] };
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let i = 0;
  async function next() {
    const idx = i++;
    if (idx >= items.length) return;
    results[idx] = await worker(items[idx], idx);
    return next();
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

(async () => {
  const { token, sa } = await getAccessToken();
  const props = await listProperties(token);
  console.log(`→ ${props.length} propriétés GA4 visibles (SA ${sa}) · fenêtre ${DAYS} j\n`);

  const rows = await runPool(props, CONCURRENCY, async (p) => ({ ...p, ...(await runReport(token, p.id)) }));

  const pad = (s, n) => String(s).padEnd(n);
  const num = (s, n) => String(s).padStart(n);
  console.log(pad("MARQUE", 26) + num("Sessions", 10) + num("Utilis.", 9) + num("Pages", 9) + num("Engagées", 10) + "  Statut");
  console.log("-".repeat(80));
  const sorted = [...rows].sort((a, b) => (b.sessions || 0) - (a.sessions || 0));
  let live = 0, nodata = 0, err = 0;
  for (const r of sorted) {
    if (r.status === "OK") {
      live++;
      console.log(pad(r.name, 26) + num(r.sessions, 10) + num(r.users, 9) + num(r.views, 9) + num(r.engaged, 10) + "  ✅");
    } else if (r.status === "NO_DATA") {
      nodata++;
      console.log(pad(r.name, 26) + num("—", 10) + num("—", 9) + num("—", 9) + num("—", 10) + "  ⏳ NO_DATA (pas encore de collecte)");
    } else {
      err++;
      console.log(pad(r.name, 26) + "  ⛔ " + (r.detail || "").slice(0, 60));
    }
  }
  console.log("-".repeat(80));
  console.log(`Live: ${live}  ·  NO_DATA: ${nodata}  ·  Erreurs: ${err}  ·  Total: ${rows.length}`);

  await fs.writeFile(
    "ga4-report.json",
    JSON.stringify({ generatedAt: new Date().toISOString(), windowDays: DAYS, serviceAccount: sa, properties: rows }, null, 2),
  );
  console.log("\n✓ Rapport écrit : ga4-report.json");
})().catch((e) => {
  console.error("Erreur:", e.message);
  process.exit(1);
});
