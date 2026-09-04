import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Réalisations — sites, plateformes et SEO livrés par My DTM",
  description:
    "Études de cas My DTM : billetterie SaaS, magazine à fort trafic, e-commerce et +8000 clics/mois récupérés en SEO. Projets réels, résultats mesurables.",
  keywords: [
    "réalisations agence digitale",
    "études de cas agence web Paris",
    "portfolio agence SEO",
    "projets Next.js",
    "références agence web",
  ],
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations & études de cas — My DTM",
    description:
      "Billetterie SaaS, magazine à fort trafic, e-commerce et récupération de trafic SEO. Des projets réels que nous concevons et pilotons.",
    url: "https://my-dtm.fr/realisations",
    type: "website",
  },
};

type CaseStudy = {
  name: string;
  url: string;
  sector: string;
  challenge: string;
  work: string[];
  result: { value: string; label: string };
  services: { href: string; label: string }[];
  initials: string;
};

const CASES: CaseStudy[] = [
  {
    name: "eburnia",
    url: "https://eburnia.fr",
    sector: "Billetterie événementielle · SaaS",
    challenge:
      "Créer une plateforme de billetterie complète capable de vendre en ligne, encaisser par Stripe et reverser automatiquement aux organisateurs.",
    work: [
      "Développement d'une plateforme SaaS multi-organisateurs sur Next.js",
      "Paiement Stripe, 3× sans frais et reversement automatique (Stripe Connect)",
      "Billets à QR code, contrôle d'accès et tableau de bord organisateur",
      "Tracking conversions serveur (CAPI) conforme RGPD",
    ],
    result: { value: "SaaS", label: "billetterie en production, paiements réels" },
    services: [
      { href: "/services/plateforme-evenementielle", label: "Plateforme événementielle" },
      { href: "/services/tracking-conformite", label: "Tracking & Conformité" },
    ],
    initials: "EB",
  },
  {
    name: "Black Sublime",
    url: "https://blacksublime.fr",
    sector: "Cosmétique naturelle africaine · Marketplace",
    challenge:
      "Lancer une marketplace e-commerce de cosmétiques afro (marque propre + créateurs tiers) sur le socle eburnia, avec conformité cosmétique et un moteur SEO complet dès l'ouverture.",
    work: [
      "Marketplace multi-vendeur sur eburnia (Stripe Connect, commission, reversement)",
      "Paiement à la livraison confirmée (séquestre) + suivi transporteur",
      "SEO complet : données structurées, guides ingrédients, page experte E-E-A-T",
      "Pont média→commerce avec L'Afropéen (autorité + acquisition)",
    ],
    result: { value: "Pré-lancement", label: "boutique en ligne, capture d'emails active" },
    services: [
      { href: "/services/creation-site-web", label: "Création de site web" },
      { href: "/services/seo", label: "SEO technique" },
    ],
    initials: "BS",
  },
  {
    name: "Dream Team Africa",
    url: "https://dreamteamafrica.com",
    sector: "Culture & événementiel · Média",
    challenge:
      "Refonte technique et récupération du trafic SEO perdu après migration, avec un volume d'articles important à réindexer.",
    work: [
      "239 redirections 301 (mapping ancien → nouveau site)",
      "Sitemap XML dynamique + soumission Google Indexing API",
      "Schema.org complet (Event, NewsArticle, FAQPage, BreadcrumbList)",
      "Optimisation Core Web Vitals et TTFB",
    ],
    result: { value: "+8 000", label: "clics/mois récupérés en quelques semaines" },
    services: [
      { href: "/services/seo", label: "SEO technique" },
      { href: "/services/creation-site-web", label: "Création de site web" },
    ],
    initials: "DTA",
  },
  {
    name: "L'Afropéen",
    url: "https://lafropeen.com",
    sector: "Magazine afro-européen · Média",
    challenge:
      "Faire tourner un magazine mis à jour quotidiennement, avec des centaines d'articles à faire indexer et une architecture éditoriale scalable.",
    work: [
      "Architecture éditoriale à fort volume (rendu ISR, sitemap automatique)",
      "Balisage NewsArticle + max-image-preview pour Google Discover",
      "Stratégie d'indexation (sitemap + nudges) sous quota Indexing API",
      "Maillage interne et diffusion sociale automatisée",
    ],
    result: { value: "Quotidien", label: "publication et indexation en continu" },
    services: [
      { href: "/services/seo", label: "SEO technique" },
      { href: "/services/marketing-digital", label: "Marketing digital" },
    ],
    initials: "LA",
  },
  {
    name: "Parfums de Paris & Sneakers Love",
    url: "https://parfumsdeparis.fr",
    sector: "E-commerce · Lifestyle",
    challenge:
      "Lancer des vitrines e-commerce de marque, rapides et optimisées pour la conversion et le référencement produit.",
    work: [
      "Sites e-commerce de marque sur stack moderne",
      "Fiches produit optimisées SEO (Product Schema, OpenGraph)",
      "Performance et Core Web Vitals soignés pour la conversion",
      "Intégration tracking et pixels publicitaires conformes",
    ],
    result: { value: "2", label: "marques lifestyle en ligne, prêtes à scaler" },
    services: [
      { href: "/services/creation-site-web", label: "Création de site web" },
      { href: "/services/tracking-conformite", label: "Tracking & Conformité" },
    ],
    initials: "PP",
  },
];

export default function RealisationsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
      { "@type": "ListItem", position: 2, name: "Réalisations", item: "https://my-dtm.fr/realisations" },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Réalisations My DTM",
    itemListElement: CASES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "CreativeWork", name: c.name, url: c.url, about: c.sector },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Header */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Réalisations</p>
          <h1 className="mt-4 font-sans text-4xl font-extrabold text-dark sm:text-5xl">
            Des projets réels, <span className="font-normal">des résultats mesurables.</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            Nous ne nous contentons pas de livrer des sites : nous concevons, développons et pilotons
            des plateformes en production. Voici quelques réalisations de notre écosystème.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-surface px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {CASES.map((c) => (
            <article key={c.name} className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-white p-8 lg:grid-cols-[1fr_1.4fr] lg:p-10">
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-sans text-lg font-extrabold text-white">
                    {c.initials}
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-extrabold text-dark">{c.name}</h2>
                    <p className="text-sm text-muted">{c.sector}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">{c.challenge}</p>
                <div className="mt-6 rounded-xl bg-gradient-to-br from-primary/[0.06] to-secondary/[0.06] p-5">
                  <div className="font-sans text-3xl font-extrabold text-gradient">{c.result.value}</div>
                  <p className="mt-1 text-sm font-semibold text-dark">{c.result.label}</p>
                </div>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  Voir le site {c.name} <ArrowUpRight size={15} />
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-dark">Ce que nous avons fait</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.work.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" />{w}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {c.services.map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                      {s.label} <ArrowRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Link to ecosystem */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-2xl font-extrabold text-dark">Un écosystème de marques</h2>
          <p className="mt-4 text-muted">
            Ces réalisations font partie d&apos;un ensemble plus large de marques que nous concevons et
            pilotons au quotidien.
          </p>
          <Link href="/ecosysteme" className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
            Découvrir notre écosystème <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Votre projet, notre prochaine réalisation ?</h2>
        <p className="relative mt-4 text-white/60">Audit gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Parler de mon projet
        </Link>
      </section>
    </>
  );
}
