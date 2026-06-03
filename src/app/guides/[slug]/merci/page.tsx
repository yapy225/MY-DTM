import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download, CalendarCheck, Mail } from "lucide-react";
import { getStripe, createDownloadToken, getCalLink } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";

export const metadata: Metadata = {
  title: "Merci pour votre achat",
  robots: { index: false, follow: false },
};

export default async function MerciPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { slug } = await params;
  const { session_id } = await searchParams;

  let status: "ok" | "pending" | "error" = "error";
  let productType: "pdf" | "cal" | null = null;
  let productName = "";
  let downloadUrl: string | null = null;
  let email: string | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email || null;
      const productId = session.metadata?.productId;
      const found = productId ? getProductById(productId) : undefined;

      if (session.payment_status === "paid" && found) {
        status = "ok";
        productType = found.product.type;
        productName = found.product.name;
        if (found.product.type === "pdf") {
          const token = createDownloadToken(found.product.id, Math.floor(Date.now() / 1000));
          downloadUrl = `/api/download?token=${encodeURIComponent(token)}`;
        }
      } else if (found) {
        status = "pending";
      }
    } catch {
      status = "error";
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-8 text-center shadow-lg sm:p-12">
        {status === "ok" ? (
          <>
            <CheckCircle2 size={56} className="mx-auto text-green" />
            <h1 className="mt-6 font-sans text-2xl font-extrabold text-dark sm:text-3xl">Merci pour votre achat !</h1>

            {productType === "pdf" ? (
              <>
                <p className="mt-4 text-muted">
                  Votre ebook <strong>{productName}</strong> est prêt. Téléchargez-le ci-dessous — nous vous l'avons aussi envoyé par email{email ? ` à ${email}` : ""}.
                </p>
                {downloadUrl ? (
                  <a href={downloadUrl} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <Download size={18} /> Télécharger mon ebook (PDF)
                  </a>
                ) : null}
              </>
            ) : (
              <>
                <p className="mt-4 text-muted">
                  Votre <strong>accompagnement</strong> est confirmé. Dernière étape : choisissez le créneau de votre visio de 90 min.
                </p>
                <a href={getCalLink()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <CalendarCheck size={18} /> Réserver mon créneau
                </a>
                <p className="mt-4 text-xs text-muted">Un email de confirmation vous a été envoyé{email ? ` à ${email}` : ""}.</p>
              </>
            )}
          </>
        ) : status === "pending" ? (
          <>
            <Mail size={56} className="mx-auto text-primary" />
            <h1 className="mt-6 font-sans text-2xl font-extrabold text-dark">Paiement en cours de validation</h1>
            <p className="mt-4 text-muted">Votre paiement est en cours de traitement. Vous recevrez votre accès par email dans quelques instants.</p>
          </>
        ) : (
          <>
            <Mail size={56} className="mx-auto text-muted" />
            <h1 className="mt-6 font-sans text-2xl font-extrabold text-dark">Commande introuvable</h1>
            <p className="mt-4 text-muted">Nous n'avons pas pu retrouver votre commande. Si vous avez été débité, écrivez-nous à <a href="mailto:contact@my-dtm.fr" className="font-semibold text-primary">contact@my-dtm.fr</a> et nous vous enverrons votre accès.</p>
          </>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <Link href={`/guides/${slug}`} className="text-sm font-semibold text-muted transition-colors hover:text-primary">
            ← Retour au guide
          </Link>
        </div>
      </div>
    </section>
  );
}
