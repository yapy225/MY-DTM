import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/pilotage/auth";
import { listCampaigns, getStats, regieConfigured } from "@/lib/regie/worker";
import RegieClient from "@/components/regie/RegieClient";

export const metadata: Metadata = {
  title: "Régie LAFF — L'Afropéen",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RegiePage() {
  if (!(await isAuthenticated())) redirect("/pilotage/login");

  const configured = regieConfigured();
  const [campaigns, stats] = configured
    ? await Promise.all([listCampaigns(), getStats()])
    : [[], { byCampaign: [], byArticle: [] }];

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 80px" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-heading)" }}>
          Régie LAFF — L'Afropéen
        </h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, marginTop: 4 }}>
          Piloter les encarts (événements + affiliation) diffusés sur le réseau, et mesurer les leads.
        </p>
      </header>

      {!configured && (
        <p
          style={{
            background: "#FEF3C7",
            color: "#92400E",
            fontSize: 13,
            padding: "12px 14px",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          ⚠️ Régie non connectée : définis <code>LAFF_WORKER_BASE</code> et <code>LAFF_ADMIN_TOKEN</code>{" "}
          sur Vercel (my-dtm) une fois le Worker déployé.
        </p>
      )}

      <RegieClient
        initialCampaigns={campaigns}
        stats={stats}
        configured={configured}
      />
    </main>
  );
}
