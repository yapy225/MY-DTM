import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre écosystème — les marques que My DTM conçoit et pilote",
  description:
    "My DTM conçoit et pilote un écosystème de marques : culture africaine, événementiel, billetterie, commerce, bien-être et services. Découvrez le groupe.",
  alternates: { canonical: "/ecosysteme" },
  openGraph: {
    title: "Notre écosystème — My DTM",
    description:
      "Un écosystème de marques conçues et pilotées par My DTM : culture, événementiel, billetterie, commerce, bien-être et services.",
    url: "https://my-dtm.fr/ecosysteme",
    type: "website",
  },
};

type Brand = { name: string; sector: string; blurb: string; href: string; initials: string };
type Cluster = { title: string; note?: string; brands: Brand[] };

const CLUSTERS: Cluster[] = [
  {
    title: "Culture & Événementiel",
    note: "Le pôle culturel africain",
    brands: [
      { name: "Dream Team Africa", sector: "Maison de la culture africaine", blurb: "Événements, médias et commerce culturel africain à Paris — la maison qui réunit tous les univers.", href: "https://dreamteamafrica.com", initials: "DTA" },
      { name: "L'Afropéen", sector: "Magazine afro-européen", blurb: "Le magazine des cultures afro-européennes, mis à jour chaque jour.", href: "https://lafropeen.com", initials: "LA" },
      { name: "L'Officiel d'Afrique", sector: "Annuaire de la diaspora", blurb: "Le référentiel des acteurs, marques et talents de la diaspora.", href: "https://lofficieldafrique.fr", initials: "OA" },
    ],
  },
  {
    title: "Billetterie & Technologie",
    brands: [
      { name: "eburnia", sector: "Billetterie événementielle (SaaS)", blurb: "Billetterie en ligne : QR code, paiement Stripe, 3× sans frais et reversement automatique aux organisateurs.", href: "https://eburnia.fr", initials: "EB" },
    ],
  },
  {
    title: "Lifestyle & Commerce",
    brands: [
      { name: "Sneakers Love", sector: "Sneakers & streetwear", blurb: "Sélection et univers sneakers pour les passionnés.", href: "https://sneakerslove.fr", initials: "SL" },
      { name: "Parfums de Paris", sector: "Parfumerie", blurb: "Parfums d'exception, esprit parisien.", href: "https://parfumsdeparis.fr", initials: "PP" },
      { name: "La Plante", sector: "Végétal & décoration", blurb: "Plantes et décoration végétale pour la maison et le bureau.", href: "https://la-plante.com", initials: "LP" },
    ],
  },
  {
    title: "Bien-être & Services",
    brands: [
      { name: "Entreprise Bien-être", sector: "QVT & bien-être B2B", blurb: "Ateliers et prestations bien-être pour les entreprises.", href: "https://entreprise-bienetre.fr", initials: "BE" },
      { name: "Service at Home", sector: "Services à domicile", blurb: "Prestations et services à domicile, simplement.", href: "https://serviceathome.fr", initials: "SH" },
    ],
  },
];

export default function EcosystemePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Notre écosystème</p>
          <h1 className="mt-4 font-sans text-4xl font-extrabold text-dark sm:text-5xl">
            Les marques que nous <span className="font-normal">concevons et pilotons.</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            My DTM n&apos;est pas qu&apos;une agence : c&apos;est l&apos;opérateur d&apos;un écosystème de
            marques, de la culture africaine au commerce, au bien-être et aux services. Chacune a son
            site ; nous en assurons la conception, le développement et le pilotage.
          </p>
        </div>
      </section>

      {/* Clusters */}
      {CLUSTERS.map((cluster, ci) => (
        <section
          key={cluster.title}
          className={`px-4 py-16 sm:px-6 lg:px-8 ${ci % 2 === 0 ? "bg-surface" : "bg-white"}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-wrap items-baseline gap-3">
              <h2 className="font-sans text-2xl font-extrabold text-dark sm:text-3xl">{cluster.title}</h2>
              {cluster.note && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {cluster.note}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {cluster.brands.map((b) => (
                <a
                  key={b.name}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-base font-bold text-white">
                      {b.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark group-hover:text-primary">{b.name}</h3>
                      <p className="text-sm text-secondary">{b.sector}</p>
                    </div>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">{b.blurb}</p>
                  <span className="mt-4 text-sm font-semibold text-primary">
                    {b.href.replace(/^https?:\/\//, "")} &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-dark px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-extrabold text-white sm:text-4xl">
            Un projet dans le même esprit ?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Nous concevons, développons et pilotons des écosystèmes digitaux de bout en bout.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold text-dark transition-colors hover:bg-surface"
          >
            Parler de votre projet
          </Link>
        </div>
      </section>
    </>
  );
}
