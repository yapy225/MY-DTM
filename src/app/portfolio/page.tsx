import type { Metadata } from "next";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio — Nos Realisations Web, SEO et Marketing Digital",
  description:
    "Decouvrez nos realisations : ecosystemes digitaux, plateformes evenementielles, journaux en ligne. +8 000 clics/mois, 99% uptime. Resultats concrets.",
  keywords: [
    "portfolio agence web Paris",
    "realisations agence digitale",
    "exemples sites web",
    "etudes de cas marketing digital",
  ],
  alternates: { canonical: "https://my-dtm.fr/portfolio" },
  openGraph: {
    title: "Portfolio — My-DTM Digital Agency",
    description: "Nos realisations : ecosystemes digitaux, plateformes evenementielles, resultats concrets.",
    url: "https://my-dtm.fr/portfolio",
    type: "website",
    locale: "fr_FR",
  },
};

const PROJECTS = [
  {
    slug: "dream-team-africa",
    icon: "\u{1F30D}",
    title: "Dream Team Africa",
    badge: "Ecosysteme complet",
    badgeClass: "bg-violet/10 text-violet",
    desc: "Ecosysteme digital complet pour la diaspora africaine a Paris : journal en ligne, marketplace artisanat, billetterie evenementielle, annuaire professionnel.",
    results: [
      "+8 000 clics/mois recuperes via SEO",
      "239 redirections 301 implementees",
      "119 URLs dans le sitemap dynamique",
      "5 modules interconnectes (journal, marketplace, billetterie, annuaire, exposants)",
    ],
    tech: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "Stripe", "WhatsApp API", "Vercel"],
  },
  {
    slug: "saison-culturelle-africaine",
    icon: "\u{1F3AD}",
    title: "Saison Culturelle Africaine",
    badge: "SEO + Billetterie",
    badgeClass: "bg-green/10 text-green",
    desc: "Plateforme evenementielle pour 7 festivals africains a Paris. Billetterie en ligne, reservation de stands, schema SEO optimise.",
    results: [
      "Billetterie Stripe avec QR codes",
      "FAQ SEO avec schema FAQPage JSON-LD",
      "7 pages evenements avec schema Event",
      "Reservation stands exposants en ligne",
    ],
    tech: ["Next.js", "Stripe Checkout", "Schema.org", "Prisma", "Resend"],
  },
  {
    slug: "lafropeen",
    icon: "\u{1F4F0}",
    title: "L'Afropeen — Journal Digital",
    badge: "Journal & SEO",
    badgeClass: "bg-gold/15 text-gold-dark",
    desc: "Journal en ligne de la diaspora africaine avec CMS custom, 9 rubriques, systeme de zones editoriales inspire de la presse traditionnelle.",
    results: [
      "40+ articles indexes sur Google",
      "9 pages categorie avec SEO complet",
      "Systeme de zones editoriales (UNE, FACE UNE, etc.)",
      "Articles SEO automatises via IA",
    ],
    tech: ["Next.js", "Prisma", "NewsArticle Schema", "OpenGraph", "Google Indexing API"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
            Portfolio
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            Des projets concrets, des resultats mesurables.
          </h1>
        </div>
      </section>

      <div className="accent-strip" />

      <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-8">
        {PROJECTS.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
          >
            {/* Visual */}
            <div className="flex aspect-[16/10] items-center justify-center rounded-3xl bg-gradient-to-br from-violet/10 to-gold/[0.06] text-8xl">
              {p.icon}
            </div>

            {/* Info */}
            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${p.badgeClass}`}>
                {p.badge}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-black text-dark">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>

              <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-violet">
                Resultats
              </h3>
              <ul className="mt-3 space-y-2">
                {p.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1 text-green">&#10003;</span>
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-violet/10 bg-violet/[0.05] px-3 py-1 text-xs font-semibold text-violet"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTA />
    </>
  );
}
