import type { Metadata } from "next";
import Link from "next/link";
import SimulateurFactureElectronique from "@/components/outils/SimulateurFactureElectronique";

export const metadata: Metadata = {
  title: "Simulateur facturation électronique : suis-je concerné et à quelle date ?",
  description:
    "Répondez à 2 questions et découvrez si vous êtes concerné par la facturation électronique obligatoire et votre date exacte (réception 2026, émission 2026 ou 2027).",
  keywords: [
    "suis-je concerné facturation électronique",
    "facturation électronique à partir de quand",
    "facturation électronique quelle date",
    "facturation électronique pour qui",
    "simulateur facturation électronique",
  ],
  alternates: { canonical: "https://my-dtm.fr/outils/facturation-electronique-simulateur" },
  openGraph: {
    title: "Simulateur facturation électronique — suis-je concerné et à quelle date ?",
    description:
      "2 questions pour connaître votre date d'obligation de facturation électronique (réception 2026, émission 2026 ou 2027).",
    url: "https://my-dtm.fr/outils/facturation-electronique-simulateur",
    type: "website",
    locale: "fr_FR",
  },
};

export default function SimulateurPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-primary">Outil gratuit</p>
          <h1 className="mt-2 font-sans text-4xl font-extrabold text-dark sm:text-5xl">
            Suis-je concerné par la facturation électronique ?
          </h1>
          <p className="mt-4 text-lg text-muted">
            Deux questions suffisent pour connaître votre situation et votre date exacte d&apos;obligation —
            réception et émission n&apos;ont pas le même calendrier.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <SimulateurFactureElectronique />

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-base font-bold text-dark">Aller plus loin</h2>
          <p className="mt-2 text-sm text-muted">
            Pour comprendre les formats (Factur-X), les plateformes agréées et les nouvelles mentions
            obligatoires, consultez le guide complet — ou faites-vous accompagner pour vous mettre en
            conformité avant l&apos;échéance.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/guides/facturation-electronique-obligatoire"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Le guide complet de la facturation électronique →
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">
              Être accompagné →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
