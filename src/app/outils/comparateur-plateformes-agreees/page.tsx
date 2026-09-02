import type { Metadata } from "next";
import Link from "next/link";
import ComparateurPlateformesAgreees from "@/components/outils/ComparateurPlateformesAgreees";

export const metadata: Metadata = {
  title: "Comparateur de plateformes de facturation électronique (2026)",
  description:
    "Répondez à 3 questions et trouvez la famille de plateforme de facturation électronique adaptée à votre profil, avec votre checklist personnalisée de vérification.",
  keywords: [
    "comparateur facturation électronique",
    "quelle plateforme facturation électronique choisir",
    "plateforme agréée facturation électronique",
    "liste plateformes facturation électronique",
    "comparatif plateformes facturation électronique",
  ],
  alternates: { canonical: "https://my-dtm.fr/outils/comparateur-plateformes-agreees" },
  openGraph: {
    title: "Comparateur de plateformes de facturation électronique",
    description:
      "3 questions pour trouver la famille de plateforme adaptée à votre profil + votre checklist de vérification.",
    url: "https://my-dtm.fr/outils/comparateur-plateformes-agreees",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ComparateurPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-primary">Outil gratuit</p>
          <h1 className="mt-2 font-sans text-4xl font-extrabold text-dark sm:text-5xl">
            Quelle plateforme de facturation électronique pour vous ?
          </h1>
          <p className="mt-4 text-lg text-muted">
            Trois questions suffisent pour orienter votre choix vers la bonne famille de solution — et repartir
            avec la checklist des points à vérifier avant de vous engager.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <ComparateurPlateformesAgreees />

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-base font-bold text-dark">Aller plus loin</h2>
          <p className="mt-2 text-sm text-muted">
            Pour comprendre ce qu&apos;est une Plateforme Agréée, comparer les familles de solutions en détail,
            ou vérifier votre date d&apos;obligation, ces ressources complètent le comparateur.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/blog/comparatif-plateformes-facturation-electronique" className="text-sm font-semibold text-primary hover:underline">
              Le comparatif détaillé des solutions →
            </Link>
            <Link href="/blog/plateforme-agreee-facturation-electronique" className="text-sm font-semibold text-primary hover:underline">
              Qu&apos;est-ce qu&apos;une Plateforme Agréée ? →
            </Link>
            <Link href="/outils/facturation-electronique-simulateur" className="text-sm font-semibold text-primary hover:underline">
              Suis-je concerné et à quelle date ? →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
