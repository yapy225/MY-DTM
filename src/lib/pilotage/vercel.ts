import "server-only";
import { unstable_cache } from "next/cache";

// --- Vercel Web Analytics (trafic) ----------------------------------------
// L'API de LECTURE du Web Analytics n'est pas officiellement documentee : on
// interroge l'endpoint interne "insights" utilise par le dashboard Vercel.
// Implementation defensive : en cas d'absence de token OU de changement de
// format cote Vercel, le bloc affiche "indispo" sans casser le reste.
// Env requis : VERCEL_API_TOKEN, VERCEL_PROJECT_ID, optionnel VERCEL_TEAM_ID.

const BASE = "https://vercel.com/api/web/insights";

export type TrafficRow = { path: string; views: number };
export type VercelTraffic = {
  ok: true;
  pageviews: number;
  visitors: number | null;
  topPages: TrafficRow[];
};
export type VercelError = { ok: false; reason: string };

function isoDateTime(days: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  return { from: from.toISOString(), to: to.toISOString() };
}

async function call(
  path: string,
  params: Record<string, string>,
  token: string,
): Promise<unknown | null> {
  const qs = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${BASE}/${path}?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Extrait un tableau { key, total } d'une reponse au format incertain.
function asRows(json: unknown): { key: string; total: number }[] {
  const data = (json as { data?: unknown })?.data;
  if (!Array.isArray(data)) return [];
  return data
    .map((d) => {
      const o = d as { key?: unknown; total?: unknown };
      const key = typeof o.key === "string" ? o.key : String(o.key ?? "");
      const total = typeof o.total === "number" ? o.total : Number(o.total ?? 0);
      return { key, total: Number.isFinite(total) ? total : 0 };
    })
    .filter((r) => r.key);
}

async function _getVercelTraffic(days: number): Promise<VercelTraffic | VercelError> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    return { ok: false, reason: "VERCEL_API_TOKEN / VERCEL_PROJECT_ID non configurés." };
  }

  const { from, to } = isoDateTime(days);
  const common: Record<string, string> = { projectId, environment: "production", from, to };
  if (process.env.VERCEL_TEAM_ID) common.teamId = process.env.VERCEL_TEAM_ID;

  const [timeseries, pathStats] = await Promise.all([
    call("timeseries", common, token),
    call("stats/path", { ...common, limit: "10" }, token),
  ]);

  if (!timeseries && !pathStats) {
    return { ok: false, reason: "Endpoint Vercel insights indisponible (format ou accès)." };
  }

  // Pages vues : total top-niveau si present, sinon somme de la serie.
  const tsTotal = (timeseries as { total?: unknown })?.total;
  const tsRows = asRows(timeseries);
  const pageviews =
    typeof tsTotal === "number" ? tsTotal : tsRows.reduce((s, r) => s + r.total, 0);

  const visitorsRaw = (timeseries as { devices?: unknown; visitors?: unknown })?.visitors;
  const visitors = typeof visitorsRaw === "number" ? visitorsRaw : null;

  const topPages: TrafficRow[] = asRows(pathStats)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map((r) => ({ path: r.key, views: r.total }));

  return { ok: true, pageviews, visitors, topPages };
}

// Cache 30 min : le trafic se consulte, pas en temps reel.
export const getVercelTraffic = (days: number) =>
  unstable_cache(() => _getVercelTraffic(days), ["vercel-traffic", String(days)], {
    revalidate: 1800,
  })();
