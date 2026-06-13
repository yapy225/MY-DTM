import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/pilotage/auth";
import { getStripeMetrics } from "@/lib/pilotage/stripe-metrics";
import { getGscPerformance, getIndexStatus } from "@/lib/pilotage/gsc";
import { getLeadsMetrics } from "@/lib/pilotage/leads";
import { getCalMetrics } from "@/lib/pilotage/cal";
import { getVercelTraffic } from "@/lib/pilotage/vercel";
import {
  Card,
  Kpi,
  BarChart,
  Sparkline,
  Table,
  Badge,
  ErrorNote,
  fmtEur,
  fmtNum,
  fmtPct,
  fmtPos,
} from "@/components/pilotage/ui";

export const metadata: Metadata = {
  title: "Pilotage My-DTM",
  robots: { index: false, follow: false },
};

// Donnees live (Stripe/GSC) + cookies : jamais de cache statique.
export const dynamic = "force-dynamic";

const PERIODS = [7, 30, 90] as const;

function envBadge(present: boolean) {
  return present ? <Badge tone="good">OK</Badge> : <Badge tone="bad">manquant</Badge>;
}

export default async function PilotagePage({
  searchParams,
}: {
  searchParams: Promise<{ j?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/pilotage/login");

  const { j } = await searchParams;
  const days = PERIODS.includes(Number(j) as (typeof PERIODS)[number]) ? Number(j) : 30;

  const [stripe, gsc, index, leads, cal, traffic] = await Promise.all([
    getStripeMetrics(days),
    getGscPerformance(days),
    getIndexStatus(),
    getLeadsMetrics(days),
    getCalMetrics(days),
    getVercelTraffic(days),
  ]);

  const gscOk = gsc.ok;
  const env = {
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    webhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resend: Boolean(process.env.RESEND_API_KEY),
    gsc: Boolean(process.env.GOOGLE_SA_JSON || process.env.GSC_KEY_FILE),
    cal: Boolean(process.env.NEXT_PUBLIC_CAL_LINK),
    calApi: Boolean(process.env.CAL_API_KEY),
    vercel: Boolean(process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID),
  };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 80px" }}>
      {/* En-tete */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Pilotage</h1>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "2px 0 0" }}>
            my-dtm.fr · {days} derniers jours
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4, background: "#F1F5F9", borderRadius: 10, padding: 4 }}>
            {PERIODS.map((p) => (
              <a
                key={p}
                href={`/pilotage?j=${p}`}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 7,
                  textDecoration: "none",
                  color: p === days ? "#fff" : "#475569",
                  background: p === days ? "#7c0dbe" : "transparent",
                }}
              >
                {p}j
              </a>
            ))}
          </div>
          <form method="POST" action="/api/pilotage/logout">
            <button
              type="submit"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #eef0f6",
                background: "#fff",
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      {/* ---- KPIs ---- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {stripe.ok ? (
          <>
            <Kpi label="CA net" value={fmtEur(stripe.netRevenue)} sub={`${fmtEur(stripe.revenue)} brut`} tone="good" />
            <Kpi label="Ventes" value={fmtNum(stripe.paidCount)} sub={`panier ${fmtEur(stripe.avgBasket)}`} />
            <Kpi
              label="Conversion tunnel"
              value={fmtPct(stripe.conversionRate)}
              sub={`${stripe.sessionsCreated} checkout(s)`}
              tone={stripe.conversionRate < 0.3 ? "warn" : "default"}
            />
            <Kpi
              label="Remboursements"
              value={fmtNum(stripe.refundCount)}
              sub={stripe.refundedAmount ? fmtEur(stripe.refundedAmount) : "—"}
              tone={stripe.refundCount > 0 ? "warn" : "default"}
            />
          </>
        ) : (
          <Kpi label="Stripe" value="indispo" sub={stripe.reason} tone="bad" />
        )}
        {gscOk ? (
          <Kpi
            label="Clics SEO"
            value={fmtNum(gsc.totals.clicks)}
            sub={`${fmtNum(gsc.totals.impressions)} impressions`}
          />
        ) : (
          <Kpi label="Clics SEO" value="indispo" sub={gsc.reason} tone="bad" />
        )}
        {index.ok && (
          <Kpi
            label="Indexation"
            value={`${index.indexed}/${index.total}`}
            sub="pages dans Google"
            tone={index.indexed / index.total < 0.5 ? "bad" : index.indexed / index.total < 0.85 ? "warn" : "good"}
          />
        )}
        {leads.ok && (
          <Kpi label="Leads contact" value={fmtNum(leads.total)} sub={`${fmtNum(leads.totalAll)} au total`} />
        )}
        {cal.ok && (
          <Kpi
            label="RDV accompagnement"
            value={fmtNum(cal.total)}
            sub={`${cal.upcoming} à venir`}
            tone={cal.upcoming > 0 ? "good" : "default"}
          />
        )}
        {traffic.ok && (
          <Kpi
            label="Trafic"
            value={fmtNum(traffic.pageviews)}
            sub={traffic.visitors != null ? `${fmtNum(traffic.visitors)} visiteurs` : "pages vues"}
          />
        )}
      </div>

      {/* ---- Revenus ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}>
        <Card title={`Chiffre d'affaires · ${days} jours`}>
          {stripe.ok ? (
            <BarChart data={stripe.byDay.map((d) => ({ label: d.label, value: d.revenue, count: d.count }))} />
          ) : (
            <ErrorNote>{stripe.reason}</ErrorNote>
          )}
        </Card>
        <Card title="Par produit">
          {stripe.ok ? (
            <Table
              head={["Produit", "Ventes", "CA"]}
              rows={stripe.byProduct.map((p) => [
                <span key="l" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Badge tone={p.type === "cal" ? "warn" : p.type === "pdf" ? "muted" : "bad"}>
                    {p.type === "cal" ? "accomp." : p.type === "pdf" ? "ebook" : "?"}
                  </Badge>
                  <span style={{ fontSize: 12 }}>{p.label}</span>
                </span>,
                fmtNum(p.count),
                fmtEur(p.revenue),
              ])}
            />
          ) : (
            <ErrorNote>{stripe.reason}</ErrorNote>
          )}
        </Card>
      </div>

      {/* ---- Transactions ---- */}
      <div style={{ marginBottom: 16 }}>
        <Card title="Dernières transactions">
          {stripe.ok ? (
            <Table
              head={["Date", "Client", "Produit", "Montant"]}
              rows={stripe.recent.map((t) => [
                new Date(t.date).toLocaleString("fr-FR", {
                  timeZone: "Europe/Paris",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                t.email,
                <span key="p" style={{ fontSize: 12 }}>{t.label}</span>,
                fmtEur(t.amount),
              ])}
            />
          ) : (
            <ErrorNote>{stripe.reason}</ErrorNote>
          )}
        </Card>
      </div>

      {/* ---- SEO ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 16 }}>
        <Card title="Performance SEO (GSC)">
          {gscOk ? (
            <>
              <div style={{ display: "flex", gap: 18, marginBottom: 10, flexWrap: "wrap" }}>
                <Mini label="Clics" value={fmtNum(gsc.totals.clicks)} />
                <Mini label="Impressions" value={fmtNum(gsc.totals.impressions)} />
                <Mini label="CTR" value={fmtPct(gsc.totals.ctr)} />
                <Mini label="Position" value={fmtPos(gsc.totals.position)} />
              </div>
              <Sparkline points={gsc.trend.map((t) => t.clicks)} />
            </>
          ) : (
            <ErrorNote>{gsc.reason}</ErrorNote>
          )}
        </Card>
        <Card title="Top requêtes">
          {gscOk ? (
            <Table
              head={["Requête", "Clics", "Pos."]}
              rows={gsc.topQueries.map((r) => [
                <span key="q" style={{ fontSize: 12 }}>{r.key}</span>,
                fmtNum(r.clicks),
                fmtPos(r.position),
              ])}
            />
          ) : (
            <ErrorNote>{gsc.reason}</ErrorNote>
          )}
        </Card>
        <Card title="Top pages">
          {gscOk ? (
            <Table
              head={["Page", "Clics", "Pos."]}
              rows={gsc.topPages.map((r) => [
                <span key="p" style={{ fontSize: 12 }}>{r.key.replace("https://my-dtm.fr", "") || "/"}</span>,
                fmtNum(r.clicks),
                fmtPos(r.position),
              ])}
            />
          ) : (
            <ErrorNote>{gsc.reason}</ErrorNote>
          )}
        </Card>
      </div>

      {/* ---- Leads / RDV / Trafic (V2) ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 16 }}>
        <Card
          title="Leads (formulaire contact)"
          right={leads.ok ? <Badge tone="muted">{leads.total} / {days}j</Badge> : undefined}
        >
          {leads.ok ? (
            <>
              <BarChart data={leads.byDay.map((d) => ({ label: d.label, value: d.count }))} />
              <div style={{ marginTop: 12 }}>
                <Table
                  head={["Date", "Nom", "Email"]}
                  rows={leads.recent.map((l) => [
                    new Date(l.date).toLocaleDateString("fr-FR", {
                      timeZone: "Europe/Paris",
                      day: "2-digit",
                      month: "2-digit",
                    }),
                    <span key="n" style={{ fontSize: 12 }}>{l.name}</span>,
                    <span key="e" style={{ fontSize: 12 }}>{l.email}</span>,
                  ])}
                />
              </div>
            </>
          ) : (
            <ErrorNote>{leads.reason}</ErrorNote>
          )}
        </Card>

        <Card
          title="RDV accompagnement (Cal.com)"
          right={cal.ok ? <Badge tone={cal.upcoming > 0 ? "good" : "muted"}>{cal.upcoming} à venir</Badge> : undefined}
        >
          {cal.ok ? (
            <Table
              head={["Date", "Personne", "Statut"]}
              rows={cal.recent.map((b) => [
                b.date
                  ? new Date(b.date).toLocaleString("fr-FR", {
                      timeZone: "Europe/Paris",
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—",
                <span key="w" style={{ fontSize: 12 }}>{b.who}</span>,
                <Badge key="s" tone={b.status === "accepted" ? "good" : b.status === "cancelled" || b.status === "rejected" ? "bad" : "warn"}>
                  {b.status || "?"}
                </Badge>,
              ])}
            />
          ) : (
            <ErrorNote>{cal.reason}</ErrorNote>
          )}
        </Card>

        <Card
          title="Trafic (Vercel Analytics)"
          right={traffic.ok ? <Badge tone="muted">{fmtNum(traffic.pageviews)} vues</Badge> : undefined}
        >
          {traffic.ok ? (
            <Table
              head={["Page", "Vues"]}
              rows={traffic.topPages.map((p) => [
                <span key="p" style={{ fontSize: 12 }}>{p.path || "/"}</span>,
                fmtNum(p.views),
              ])}
            />
          ) : (
            <ErrorNote>{traffic.reason}</ErrorNote>
          )}
        </Card>
      </div>

      {/* ---- Indexation ---- */}
      <div style={{ marginBottom: 16 }}>
        <Card
          title="Indexation Google"
          right={index.ok ? <Badge tone={index.indexed / index.total < 0.5 ? "bad" : "good"}>{index.indexed}/{index.total} indexées</Badge> : undefined}
        >
          {index.ok ? (
            <Table
              head={["Page", "Couverture", "Statut"]}
              rows={index.rows.map((r) => [
                <span key="u" style={{ fontSize: 12 }}>{r.url.replace("https://my-dtm.fr", "") || "/"}</span>,
                <span key="c" style={{ fontSize: 12 }}>{r.coverage}</span>,
                <Badge key="v" tone={r.verdict === "PASS" ? "good" : r.verdict === "ERREUR" ? "bad" : "warn"}>
                  {r.verdict === "PASS" ? "indexée" : r.verdict === "ERREUR" ? "erreur" : "non indexée"}
                </Badge>,
              ])}
            />
          ) : (
            <ErrorNote>{index.reason}</ErrorNote>
          )}
        </Card>
      </div>

      {/* ---- Ops / Sante ---- */}
      <Card title="Santé & configuration">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <EnvItem label="Stripe (clé)" ok={env.stripe} />
          <EnvItem label="Webhook Stripe" ok={env.webhook} />
          <EnvItem label="Resend (emails/leads)" ok={env.resend} />
          <EnvItem label="GSC (service acct)" ok={env.gsc} />
          <EnvItem label="Lien Cal.com" ok={env.cal} />
          <EnvItem label="Cal.com API (RDV)" ok={env.calApi} />
          <EnvItem label="Vercel Analytics" ok={env.vercel} />
        </div>
      </Card>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>{value}</div>
    </div>
  );
}

function EnvItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
      <span style={{ color: "#475569" }}>{label}</span>
      {envBadge(ok)}
    </div>
  );
}
