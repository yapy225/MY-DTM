import type { Metadata } from "next";
import { verifyDevisToken } from "@/lib/devis-token";
import ValidationForm from "./ValidationForm";

// Page atterrissage du QR code de validation de devis. Décode le jeton signé,
// affiche le récapitulatif du devis, puis propose la signature « bon pour accord ».
// Non indexable (contenu privé lié à un jeton).

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Validation de votre devis — My DTM Paris",
  robots: { index: false, follow: false },
};

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const wrap: React.CSSProperties = {
  maxWidth: 560,
  margin: "0 auto",
  padding: "48px 20px",
  fontFamily: "-apple-system,Segoe UI,Helvetica,Arial,sans-serif",
  color: "#0e0a1a",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const check = verifyDevisToken(t, Date.now());

  if (!check.ok) {
    return (
      <main style={wrap}>
        <h1 style={{ color: "#7c0dbe" }}>Lien invalide</h1>
        <p>
          Ce lien de validation n'est pas reconnu. Vérifiez que vous avez scanné le QR
          code de la dernière version de votre devis, ou écrivez-nous à{" "}
          <a href="mailto:hello@my-dtm.fr" style={{ color: "#7c0dbe" }}>
            hello@my-dtm.fr
          </a>
          .
        </p>
      </main>
    );
  }

  const { devis, expired } = check;

  return (
    <main style={wrap}>
      <p style={{ letterSpacing: 2, fontSize: 12, color: "#b8860b", fontWeight: 700, textTransform: "uppercase" }}>
        My DTM Paris
      </p>
      <h1 style={{ color: "#7c0dbe", marginTop: 4 }}>Validation de votre devis</h1>

      <div
        style={{
          border: "1px solid #e7e1f3",
          borderRadius: 12,
          padding: 20,
          margin: "20px 0",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        <div><span style={{ color: "#52525b" }}>Devis&nbsp;:</span> <strong>{devis.id}</strong></div>
        <div><span style={{ color: "#52525b" }}>Client&nbsp;:</span> {devis.client}</div>
        <div><span style={{ color: "#52525b" }}>Objet&nbsp;:</span> {devis.objet}</div>
        <div style={{ marginTop: 8, fontSize: 18 }}>
          <span style={{ color: "#52525b", fontSize: 14 }}>Montant&nbsp;:</span>{" "}
          <strong>{eur(devis.montantHT)} HT</strong>
        </div>
        <div style={{ fontSize: 12, color: "#52525b", marginTop: 4 }}>
          TVA non applicable, art. 293 B du CGI · émis le {devis.emisLe} · validité {devis.validiteJours} jours
        </div>
      </div>

      {expired ? (
        <div
          style={{
            padding: "14px 18px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 10,
            color: "#991b1b",
          }}
        >
          <strong>Ce devis a expiré.</strong> Sa durée de validité est dépassée.
          Contactez-nous à{" "}
          <a href="mailto:hello@my-dtm.fr" style={{ color: "#991b1b" }}>hello@my-dtm.fr</a>{" "}
          pour recevoir un devis à jour.
        </div>
      ) : (
        <ValidationForm token={t as string} devisId={devis.id} />
      )}
    </main>
  );
}
