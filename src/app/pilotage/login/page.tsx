import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated, isConfigured } from "@/lib/pilotage/auth";

export const metadata: Metadata = {
  title: "Connexion — Pilotage",
  robots: { index: false, follow: false },
};

export default async function PilotageLogin({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  if (await isAuthenticated()) redirect("/pilotage");
  const { err } = await searchParams;
  const configured = isConfigured();

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#fff",
          border: "1px solid var(--color-border)",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 10px 40px rgba(124,13,190,0.08)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-heading)", marginBottom: 6 }}>
          Pilotage My-DTM
        </h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 20 }}>
          Accès réservé. Entre ton mot de passe.
        </p>

        {!configured && (
          <p
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              fontSize: 13,
              padding: "10px 12px",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            ⚠️ Variable <code>PILOTAGE_PASSWORD</code> non définie sur Vercel.
          </p>
        )}

        {err && (
          <p
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              fontSize: 13,
              padding: "10px 12px",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            Mot de passe incorrect.
          </p>
        )}

        <form method="POST" action="/api/pilotage/login">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            autoFocus
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              fontSize: 15,
              marginBottom: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
