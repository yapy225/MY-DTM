import "server-only";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";
import { parisDateKey, parisDayLabels } from "./time";

// --- Metriques Stripe pour le dashboard /pilotage -------------------------
// Source de verite = les Checkout Sessions. On ne stocke rien : on agrege a la
// volee sur la periode demandee. Stripe est la source unique pour le CA, le
// tunnel (cree vs paye) et la repartition par produit.

export type DayPoint = { date: string; label: string; revenue: number; count: number };

export type ProductLine = {
  productId: string;
  label: string;
  type: "pdf" | "cal" | "inconnu";
  count: number;
  revenue: number;
};

export type Transaction = {
  date: string; // ISO
  email: string;
  label: string;
  amount: number; // euros
};

export type StripeMetrics = {
  ok: true;
  currency: string;
  revenue: number; // CA brut paye (euros)
  refundedAmount: number; // rembourse (euros)
  netRevenue: number; // revenue - refunds
  paidCount: number;
  refundCount: number;
  avgBasket: number;
  // Tunnel
  sessionsCreated: number;
  conversionRate: number; // paidCount / sessionsCreated
  byDay: DayPoint[];
  byProduct: ProductLine[];
  recent: Transaction[];
  // true si la periode contient plus de transactions/remboursements que la
  // limite d'agregation : les chiffres sont alors sous-estimes (tronques).
  capped: boolean;
};

export type StripeMetricsError = { ok: false; reason: string };

// Plafonds d'agregation (au-dela, les totaux seraient tronques silencieusement).
const SESSIONS_LIMIT = 2000;
const REFUNDS_LIMIT = 1000;

function productLabel(productId: string | undefined): { label: string; type: ProductLine["type"] } {
  if (!productId) return { label: "Produit inconnu", type: "inconnu" };
  const found = getProductById(productId);
  if (!found) return { label: productId, type: "inconnu" };
  return { label: `${found.product.name} · ${found.guide.title}`, type: found.product.type };
}

export async function getStripeMetrics(days: number): Promise<StripeMetrics | StripeMetricsError> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ok: false, reason: "STRIPE_SECRET_KEY non configurée." };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const gte = nowSeconds - days * 24 * 60 * 60;
  const stripe = getStripe();

  try {
    // Toutes les sessions de la periode (auto-pagination, plafonnee).
    const sessions = await stripe.checkout.sessions
      .list({ created: { gte }, limit: 100 })
      .autoPagingToArray({ limit: SESSIONS_LIMIT });

    // Remboursements de la periode.
    const refunds = await stripe.refunds
      .list({ created: { gte }, limit: 100 })
      .autoPagingToArray({ limit: REFUNDS_LIMIT });

    // On a atteint un plafond => les totaux sont potentiellement tronques.
    const capped = sessions.length >= SESSIONS_LIMIT || refunds.length >= REFUNDS_LIMIT;

    const currency = "eur";
    const paid = sessions.filter((s) => s.payment_status === "paid");

    let revenue = 0;
    const byDayMap = new Map<string, { revenue: number; count: number }>();
    const byProductMap = new Map<string, ProductLine>();
    const recent: Transaction[] = [];

    for (const s of paid) {
      const amount = (s.amount_total ?? 0) / 100;
      revenue += amount;

      const key = parisDateKey(s.created);
      const day = byDayMap.get(key) ?? { revenue: 0, count: 0 };
      day.revenue += amount;
      day.count += 1;
      byDayMap.set(key, day);

      const productId = s.metadata?.productId;
      const { label, type } = productLabel(productId);
      const pKey = productId ?? "inconnu";
      const line = byProductMap.get(pKey) ?? { productId: pKey, label, type, count: 0, revenue: 0 };
      line.count += 1;
      line.revenue += amount;
      byProductMap.set(pKey, line);

      recent.push({
        date: new Date(s.created * 1000).toISOString(),
        email: s.customer_details?.email || s.customer_email || "—",
        label,
        amount,
      });
    }

    const refundedAmount = refunds.reduce((sum, r) => sum + (r.amount ?? 0) / 100, 0);

    // Serie temporelle continue (jours sans vente = 0) en Europe/Paris.
    const dayLabels = parisDayLabels(days);
    const byDay: DayPoint[] = dayLabels.map(({ key, label }) => {
      const v = byDayMap.get(key);
      return { date: key, label, revenue: v?.revenue ?? 0, count: v?.count ?? 0 };
    });

    const byProduct = [...byProductMap.values()].sort((a, b) => b.revenue - a.revenue);
    recent.sort((a, b) => (a.date < b.date ? 1 : -1));

    const paidCount = paid.length;
    return {
      ok: true,
      currency,
      revenue,
      refundedAmount,
      netRevenue: revenue - refundedAmount,
      paidCount,
      refundCount: refunds.length,
      avgBasket: paidCount ? revenue / paidCount : 0,
      sessionsCreated: sessions.length,
      conversionRate: sessions.length ? paidCount / sessions.length : 0,
      byDay,
      byProduct,
      recent: recent.slice(0, 12),
      capped,
    };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Erreur Stripe inconnue." };
  }
}
