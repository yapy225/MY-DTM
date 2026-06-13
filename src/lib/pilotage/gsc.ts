import "server-only";
import crypto from "crypto";
import { unstable_cache } from "next/cache";
import { getAllGuides } from "@/lib/guides/guides";
import { getAllPosts } from "@/lib/blog/posts";
import { isoDaysAgo } from "./time";

// --- Google Search Console pour le dashboard /pilotage --------------------
// Auth = service account (meme cle que les scripts SEO). En prod, la cle JSON
// est lue depuis l'env GOOGLE_SA_JSON ; en local, depuis un fichier (GSC_KEY_FILE).
// Aucune dependance : on signe le JWT a la main (comme scripts/*.mjs).

const GSC_SITE = "sc-domain:my-dtm.fr";
const BASE_URL = "https://my-dtm.fr";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function b64url(buf: crypto.BinaryLike): string {
  return Buffer.from(buf as Buffer | string)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

type ServiceAccount = { client_email: string; private_key: string };

async function loadKey(): Promise<ServiceAccount | null> {
  const json = process.env.GOOGLE_SA_JSON;
  if (json) {
    try {
      return JSON.parse(json) as ServiceAccount;
    } catch {
      return null;
    }
  }
  const file = process.env.GSC_KEY_FILE;
  if (file) {
    try {
      const fs = await import("node:fs/promises");
      return JSON.parse(await fs.readFile(file, "utf8")) as ServiceAccount;
    } catch {
      return null;
    }
  }
  return null;
}

async function getAccessToken(): Promise<string | null> {
  const key = await loadKey();
  if (!key?.client_email || !key?.private_key) return null;
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );
  const data = `${header}.${payload}`;
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
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

// --- Search Analytics -----------------------------------------------------

export type GscTotals = { clicks: number; impressions: number; ctr: number; position: number };
export type GscRow = { key: string; clicks: number; impressions: number; ctr: number; position: number };
export type GscTrend = { date: string; clicks: number; impressions: number };

export type GscPerformance = {
  ok: true;
  totals: GscTotals;
  trend: GscTrend[];
  topQueries: GscRow[];
  topPages: GscRow[];
};
export type GscError = { ok: false; reason: string };

type SaRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function querySa(
  token: string,
  body: Record<string, unknown>,
): Promise<SaRow[]> {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`GSC ${res.status}`);
  const json = (await res.json()) as { rows?: SaRow[] };
  return json.rows ?? [];
}

async function _getGscPerformance(days: number): Promise<GscPerformance | GscError> {
  const token = await getAccessToken();
  if (!token) return { ok: false, reason: "Clé service account GSC absente ou invalide." };

  const startDate = isoDaysAgo(days);
  const endDate = isoDaysAgo(0);

  try {
    const [totalsRows, dateRows, queryRows, pageRows] = await Promise.all([
      querySa(token, { startDate, endDate }),
      querySa(token, { startDate, endDate, dimensions: ["date"] }),
      querySa(token, { startDate, endDate, dimensions: ["query"], rowLimit: 10 }),
      querySa(token, { startDate, endDate, dimensions: ["page"], rowLimit: 10 }),
    ]);

    const t = totalsRows[0];
    const totals: GscTotals = t
      ? { clicks: t.clicks, impressions: t.impressions, ctr: t.ctr, position: t.position }
      : { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const trend: GscTrend[] = dateRows.map((r) => ({
      date: r.keys?.[0] ?? "",
      clicks: r.clicks,
      impressions: r.impressions,
    }));

    const toRows = (rows: SaRow[]): GscRow[] =>
      rows.map((r) => ({
        key: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      }));

    return { ok: true, totals, trend, topQueries: toRows(queryRows), topPages: toRows(pageRows) };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Erreur GSC inconnue." };
  }
}

// Cache 1h : la donnee GSC a deja un retard de ~2-3 jours, inutile de re-query.
export const getGscPerformance = (days: number) =>
  unstable_cache(() => _getGscPerformance(days), ["gsc-perf", String(days)], {
    revalidate: 3600,
  })();

// --- Indexation (URL Inspection API) --------------------------------------

export type IndexRow = { url: string; verdict: string; coverage: string };
export type IndexStatus = {
  ok: true;
  total: number;
  indexed: number;
  groups: Record<string, number>;
  rows: IndexRow[];
};

function siteUrls(): string[] {
  const urls = new Set<string>([
    `${BASE_URL}/`,
    `${BASE_URL}/guides`,
    `${BASE_URL}/services`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/tarifs`,
    `${BASE_URL}/contact`,
  ]);
  for (const g of getAllGuides()) urls.add(`${BASE_URL}/guides/${g.slug}`);
  for (const p of getAllPosts()) urls.add(`${BASE_URL}/blog/${p.slug}`);
  for (const s of [
    "creation-site-web",
    "seo",
    "whatsapp-business",
    "automatisation",
    "marketing-digital",
    "tracking-conformite",
    "securite-web",
    "plateforme-evenementielle",
  ]) {
    urls.add(`${BASE_URL}/services/${s}`);
  }
  return [...urls];
}

async function inspectUrl(token: string, url: string): Promise<IndexRow> {
  try {
    const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_SITE }),
    });
    if (!res.ok) return { url, verdict: "ERREUR", coverage: `HTTP ${res.status}` };
    const json = (await res.json()) as {
      inspectionResult?: { indexStatusResult?: { verdict?: string; coverageState?: string } };
    };
    const r = json.inspectionResult?.indexStatusResult;
    return {
      url,
      verdict: r?.verdict ?? "INCONNU",
      coverage: r?.coverageState ?? "Inconnu",
    };
  } catch {
    return { url, verdict: "ERREUR", coverage: "Échec requête" };
  }
}

async function _getIndexStatus(): Promise<IndexStatus | GscError> {
  const token = await getAccessToken();
  if (!token) return { ok: false, reason: "Clé service account GSC absente ou invalide." };

  const urls = siteUrls();
  const rows: IndexRow[] = [];
  // Concurrence limitee pour menager les quotas Inspection API.
  const CONCURRENCY = 5;
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    rows.push(...(await Promise.all(batch.map((u) => inspectUrl(token, u)))));
  }

  const groups: Record<string, number> = {};
  let indexed = 0;
  for (const r of rows) {
    groups[r.coverage] = (groups[r.coverage] ?? 0) + 1;
    if (r.verdict === "PASS") indexed += 1;
  }
  rows.sort((a, b) => (a.verdict === b.verdict ? a.url.localeCompare(b.url) : a.verdict < b.verdict ? 1 : -1));

  return { ok: true, total: rows.length, indexed, groups, rows };
}

// Cache 6h : l'inspection de ~28 URLs est couteuse, l'indexation bouge lentement.
export const getIndexStatus = () =>
  unstable_cache(() => _getIndexStatus(), ["gsc-index"], { revalidate: 21600 })();
