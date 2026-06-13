import "server-only";
import { parisDateKey, parisDayLabels } from "./time";

// --- Leads (formulaire contact) -------------------------------------------
// Pas de base de donnees : on stocke chaque lead comme un contact dans une
// audience Resend dediee (durable, gratuit, deja dans la stack). L'audience est
// resolue/creee automatiquement ; on peut forcer son id via RESEND_AUDIENCE_ID.

const AUDIENCE_NAME = "my-dtm-leads";

type ResendLike = {
  audiences: {
    list: () => Promise<{ data?: { data?: { id: string; name: string }[] } | null }>;
    create: (a: { name: string }) => Promise<{ data?: { id: string } | null }>;
  };
  contacts: {
    create: (c: Record<string, unknown>) => Promise<unknown>;
    list: (a: { audienceId: string }) => Promise<{
      data?: { data?: ResendContact[] } | null;
    }>;
  };
};

type ResendContact = {
  email?: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  unsubscribed?: boolean;
};

let cachedAudienceId: string | null = null;

async function getResend(): Promise<ResendLike | null> {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = await import("resend");
  return new Resend(process.env.RESEND_API_KEY) as unknown as ResendLike;
}

// Resout l'id de l'audience "leads" : env > recherche par nom > creation.
async function resolveAudienceId(resend: ResendLike): Promise<string | null> {
  if (process.env.RESEND_AUDIENCE_ID) return process.env.RESEND_AUDIENCE_ID;
  if (cachedAudienceId) return cachedAudienceId;
  try {
    const list = await resend.audiences.list();
    const found = list.data?.data?.find((a) => a.name === AUDIENCE_NAME);
    if (found) return (cachedAudienceId = found.id);
    const created = await resend.audiences.create({ name: AUDIENCE_NAME });
    if (created.data?.id) return (cachedAudienceId = created.data.id);
  } catch {
    return null;
  }
  return null;
}

// Enregistre un lead (best-effort, ne doit jamais bloquer l'envoi du mail).
export async function recordLead(input: { name?: string; email: string; service?: string }): Promise<void> {
  const resend = await getResend();
  if (!resend) return;
  const audienceId = await resolveAudienceId(resend);
  if (!audienceId) return;
  const [first, ...rest] = (input.name ?? "").trim().split(/\s+/);
  try {
    await resend.contacts.create({
      audienceId,
      email: input.email,
      firstName: first || undefined,
      lastName: rest.join(" ") || undefined,
      unsubscribed: false,
    });
  } catch {
    // Doublon d'email ou erreur API : on ignore silencieusement.
  }
}

// --- Metriques pour le dashboard ------------------------------------------

export type LeadRow = { date: string; email: string; name: string };
export type LeadsMetrics = {
  ok: true;
  total: number; // leads sur la periode
  totalAll: number; // contacts dans l'audience (tout l'historique)
  byDay: { date: string; label: string; count: number }[];
  recent: LeadRow[];
};
export type LeadsError = { ok: false; reason: string };

export async function getLeadsMetrics(days: number): Promise<LeadsMetrics | LeadsError> {
  const resend = await getResend();
  if (!resend) return { ok: false, reason: "RESEND_API_KEY non configurée." };
  const audienceId = await resolveAudienceId(resend);
  if (!audienceId) return { ok: false, reason: "Audience Resend introuvable." };

  try {
    const res = await resend.contacts.list({ audienceId });
    const contacts = res.data?.data ?? [];
    const sinceSeconds = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

    const byDayMap = new Map<string, number>();
    const recent: LeadRow[] = [];
    let total = 0;

    for (const c of contacts) {
      if (!c.created_at) continue;
      const seconds = Math.floor(new Date(c.created_at).getTime() / 1000);
      if (!Number.isFinite(seconds) || seconds < sinceSeconds) continue;
      total += 1;
      const key = parisDateKey(seconds);
      byDayMap.set(key, (byDayMap.get(key) ?? 0) + 1);
      const name = [c.first_name, c.last_name].filter(Boolean).join(" ").trim();
      recent.push({ date: new Date(c.created_at).toISOString(), email: c.email ?? "—", name: name || "—" });
    }

    const byDay = parisDayLabels(days).map(({ key, label }) => ({
      date: key,
      label,
      count: byDayMap.get(key) ?? 0,
    }));
    recent.sort((a, b) => (a.date < b.date ? 1 : -1));

    return { ok: true, total, totalAll: contacts.length, byDay, recent: recent.slice(0, 12) };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Erreur Resend inconnue." };
  }
}
