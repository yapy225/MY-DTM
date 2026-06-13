import "server-only";
import { unstable_cache } from "next/cache";

// --- Cal.com (RDV accompagnement) -----------------------------------------
// Lit les reservations via l'API v2. Necessite CAL_API_KEY. Degradation propre
// si la cle est absente (le bloc affiche "indispo" sans casser le dashboard).

const CAL_API = "https://api.cal.com/v2/bookings";
const CAL_VERSION = "2024-08-13";

type CalBooking = {
  id?: number;
  start?: string;
  status?: string; // accepted | pending | cancelled | rejected
  title?: string;
  attendees?: { name?: string; email?: string }[];
  eventType?: { title?: string };
};

export type BookingRow = { date: string; who: string; title: string; status: string };
export type CalMetrics = {
  ok: true;
  total: number; // RDV sur la periode (par date de debut)
  upcoming: number; // RDV a venir (acceptes)
  cancelled: number;
  recent: BookingRow[];
};
export type CalError = { ok: false; reason: string };

async function _getCalMetrics(days: number): Promise<CalMetrics | CalError> {
  const key = process.env.CAL_API_KEY;
  if (!key) return { ok: false, reason: "CAL_API_KEY non configurée." };

  try {
    const res = await fetch(`${CAL_API}?take=100&sortStart=desc`, {
      headers: { Authorization: `Bearer ${key}`, "cal-api-version": CAL_VERSION },
    });
    if (!res.ok) return { ok: false, reason: `Cal.com HTTP ${res.status}` };
    const json = (await res.json()) as { data?: CalBooking[] };
    const bookings = json.data ?? [];

    const now = Date.now();
    const since = now - days * 24 * 60 * 60 * 1000;

    let total = 0;
    let upcoming = 0;
    let cancelled = 0;
    const recent: BookingRow[] = [];

    for (const b of bookings) {
      const startMs = b.start ? new Date(b.start).getTime() : NaN;
      const status = (b.status ?? "").toLowerCase();
      const isCancelled = status === "cancelled" || status === "rejected";

      if (Number.isFinite(startMs) && startMs >= since) {
        total += 1;
        if (isCancelled) cancelled += 1;
      }
      if (Number.isFinite(startMs) && startMs >= now && !isCancelled) upcoming += 1;

      const who = b.attendees?.[0]?.name || b.attendees?.[0]?.email || "—";
      recent.push({
        date: b.start ? new Date(b.start).toISOString() : "",
        who,
        title: b.eventType?.title || b.title || "RDV",
        status,
      });
    }

    recent.sort((a, b) => (a.date < b.date ? 1 : -1));
    return { ok: true, total, upcoming, cancelled, recent: recent.slice(0, 10) };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Erreur Cal.com inconnue." };
  }
}

// Cache 15 min : les RDV ne changent pas a la seconde.
export const getCalMetrics = (days: number) =>
  unstable_cache(() => _getCalMetrics(days), ["cal", String(days)], { revalidate: 900 })();
