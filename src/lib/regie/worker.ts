import "server-only";

// Client serveur de l'API admin du Worker LAFF (régie pub/affiliation).
// Le token admin ne sort JAMAIS côté client : toutes les écritures passent par
// les routes /api/regie/* (elles-mêmes protégées par l'auth /pilotage).

const BASE = process.env.LAFF_WORKER_BASE; // ex https://laff-regie.xxx.workers.dev
const TOKEN = process.env.LAFF_ADMIN_TOKEN;

export function regieConfigured(): boolean {
  return Boolean(BASE && TOKEN);
}

async function call(path: string, init?: RequestInit): Promise<Response> {
  if (!BASE || !TOKEN) throw new Error("LAFF non configuré (LAFF_WORKER_BASE / LAFF_ADMIN_TOKEN)");
  return fetch(BASE + path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

export interface Campaign {
  id: string;
  type: "event" | "affiliation";
  title: string;
  image_url: string | null;
  body: string | null;
  cta_label: string;
  dest_url: string;
  target_sites: string[];
  slots: string[];
  weight: number;
  starts_at: string | null;
  ends_at: string | null;
  status: string;
}

export async function listCampaigns(): Promise<Campaign[]> {
  try {
    const r = await call("/admin/campaigns");
    if (!r.ok) return [];
    const d = await r.json();
    return (d.campaigns || []) as Campaign[];
  } catch {
    return [];
  }
}

export async function getStats(): Promise<{ byCampaign: any[]; byArticle: any[] }> {
  try {
    const r = await call("/admin/stats");
    if (!r.ok) return { byCampaign: [], byArticle: [] };
    return (await r.json()) as { byCampaign: any[]; byArticle: any[] };
  } catch {
    return { byCampaign: [], byArticle: [] };
  }
}

export const upsertCampaign = (body: unknown) =>
  call("/admin/campaigns", { method: "POST", body: JSON.stringify(body) });
export const patchCampaign = (id: string, body: unknown) =>
  call(`/admin/campaigns/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) });
export const deleteCampaign = (id: string) =>
  call(`/admin/campaigns/${encodeURIComponent(id)}`, { method: "DELETE" });
export const publish = () => call("/admin/publish", { method: "POST", body: "{}" });
