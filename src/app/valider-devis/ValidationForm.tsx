"use client";

import { useEffect, useState } from "react";

// Formulaire de signature « bon pour accord » (signature électronique simple).
// Récupère un jeton de formulaire (anti-bot) au montage, puis poste au
// /api/valider-devis avec le jeton signé du devis. Aucun paiement ici.

export default function ValidationForm({
  token,
  devisId,
}: {
  token: string;
  devisId: string;
}) {
  const [formToken, setFormToken] = useState<string>("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/form-token")
      .then((r) => r.json())
      .then((d) => setFormToken(d?.token ?? ""))
      .catch(() => {});
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError("Cochez « Bon pour accord » pour valider.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/valider-devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, formToken, nom, email, consent, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setStatus("done");
      } else {
        setStatus("error");
        setError(data?.error || "Une erreur est survenue. Réessayez.");
      }
    } catch {
      setStatus("error");
      setError("Réseau indisponible. Réessayez.");
    }
  }

  if (status === "done") {
    return (
      <div
        style={{
          padding: "18px 20px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          color: "#166534",
        }}
      >
        <strong>✅ Devis {devisId} accepté.</strong>
        <p style={{ margin: "8px 0 0" }}>
          Merci ! Un email de confirmation vous a été envoyé. Vous recevrez sous peu la
          facture d'acompte et son lien de paiement sécurisé.
        </p>
      </div>
    );
  }

  const field: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d4d4d8",
    borderRadius: 10,
    fontSize: 15,
    marginTop: 6,
  };

  return (
    <form onSubmit={submit}>
      <p style={{ fontSize: 14, color: "#3f3f46" }}>
        Pour valider ce devis, renseignez votre identité et cochez « Bon pour accord ».
        Cela vaut acceptation de l'offre (signature électronique).
      </p>

      <label style={{ display: "block", marginTop: 16, fontSize: 13, fontWeight: 600 }}>
        Nom et prénom
        <input
          style={field}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          autoComplete="name"
        />
      </label>

      <label style={{ display: "block", marginTop: 16, fontSize: 13, fontWeight: 600 }}>
        Email
        <input
          style={field}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>

      {/* Honeypot anti-bot : caché aux humains */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>
          Société
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <label style={{ display: "flex", gap: 10, marginTop: 20, fontSize: 14, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: 3 }}
        />
        <span>
          <strong>Bon pour accord.</strong> J'accepte ce devis et ses conditions, et je
          reconnais que cette validation vaut engagement contractuel.
        </span>
      </label>

      {error && (
        <p style={{ color: "#b91c1c", fontSize: 14, marginTop: 14 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          marginTop: 22,
          width: "100%",
          padding: "14px 26px",
          border: "none",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 15,
          color: "#fff",
          cursor: status === "sending" ? "wait" : "pointer",
          background: "linear-gradient(135deg,#7c0dbe,#4d71ee)",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Validation…" : "Valider le devis"}
      </button>

      <p style={{ fontSize: 12, color: "#52525b", marginTop: 14 }}>
        Aucun paiement à cette étape. La facture d'acompte et le lien de règlement vous
        seront envoyés après validation.
      </p>
    </form>
  );
}
