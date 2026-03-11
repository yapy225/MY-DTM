import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services — Developpement Web, SEO, Automatisation, Marketing Digital",
  description:
    "Tous nos services : creation site web, SEO technique, automatisation API, marketing multi-canal. 16 offres adaptees aux PME et startups. Devis gratuit.",
  keywords: [
    "services agence digitale Paris",
    "creation site web prix",
    "SEO technique agence",
    "automatisation marketing",
    "marketing digital PME",
    "agence web full-stack",
  ],
  alternates: { canonical: "https://my-dtm.fr/services" },
  openGraph: {
    title: "Services — My-DTM Digital Agency",
    description: "Developpement web, SEO, automatisation et marketing digital. 16 offres adaptees.",
    url: "https://my-dtm.fr/services",
    type: "website",
    locale: "fr_FR",
  },
};

const OFFERS = [
  {
    id: "dev",
    icon: "\u{1F680}",
    title: "Developpement Web Full-Stack",
    items: [
      { name: "Site Vitrine Pro", desc: "Next.js performant, responsive, SEO integre. Pour restaurants, freelances, associations.", price: "A partir de 1 500\u00A0\u20AC" },
      { name: "Plateforme E-commerce", desc: "Marketplace complete avec Stripe, gestion stocks, dashboard vendeur.", price: "A partir de 3 000\u00A0\u20AC" },
      { name: "Plateforme Evenementielle", desc: "Billetterie en ligne, QR codes, reservation exposants, dashboard admin.", price: "A partir de 4 000\u00A0\u20AC" },
      { name: "Ecosysteme Digital Complet", desc: "Site + marketplace + billetterie + journal + annuaire. Tout interconnecte.", price: "Sur devis" },
    ],
  },
  {
    id: "seo",
    icon: "\u{1F4A1}",
    title: "SEO Technique Avance",
    items: [
      { name: "Audit SEO Complet", desc: "Analyse technique, mots-cles, concurrence, Search Console. Rapport + plan d'action.", price: "A partir de 500\u00A0\u20AC" },
      { name: "Optimisation SEO Technique", desc: "Schema.org JSON-LD, redirections 301, sitemap, Core Web Vitals, indexation.", price: "A partir de 1 500\u00A0\u20AC" },
      { name: "Recuperation de Trafic Perdu", desc: "Mapping ancien \u2192 nouveau site, redirections en masse, nettoyage Search Console.", price: "A partir de 1 000\u00A0\u20AC" },
      { name: "SEO Contenu", desc: "Recherche mots-cles, articles optimises, maillage interne, FAQ structurees.", price: "A partir de 800\u00A0\u20AC/mois" },
    ],
  },
  {
    id: "auto",
    icon: "\u2699\uFE0F",
    title: "Integration API & Automatisation",
    items: [
      { name: "WhatsApp Business Automation", desc: "Config complete, templates, webhooks, reponses automatiques.", price: "A partir de 800\u00A0\u20AC" },
      { name: "Facebook & Instagram Leads", desc: "Formulaires Leads Ads, webhook temps reel, dashboard suivi.", price: "A partir de 500\u00A0\u20AC" },
      { name: "Paiement en Ligne Stripe", desc: "Checkout, webhooks, factures auto, dashboard revenus.", price: "A partir de 600\u00A0\u20AC" },
      { name: "Email Automatise", desc: "Emails transactionnels, sequences, templates responsive.", price: "A partir de 500\u00A0\u20AC" },
    ],
  },
  {
    id: "marketing",
    icon: "\u{1F4E3}",
    title: "Marketing Multi-Canal",
    items: [
      { name: "Acquisition Client 360\u00B0", desc: "SEO + WhatsApp + Ads + Email. Tableau de bord unifie, rapport mensuel.", price: "A partir de 1 000\u00A0\u20AC/mois" },
      { name: "Pack Lancement Evenement", desc: "Landing page + Facebook Ads + WhatsApp + email blast. Cle en main.", price: "A partir de 2 000\u00A0\u20AC" },
      { name: "Gestion Reseaux Sociaux", desc: "Calendrier editorial, creation contenu, publication, community management.", price: "A partir de 800\u00A0\u20AC/mois" },
      { name: "Newsletter & Fidelisation", desc: "Setup, templates, segmentation, A/B testing, suivi performance.", price: "A partir de 400\u00A0\u20AC/mois" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            Nos services
          </p>
          <h1 className="mt-4 max-w-2xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Des solutions pour chaque besoin digital.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            4 piliers, des offres claires, des resultats mesurables.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {OFFERS.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{cat.icon}</span>
              <h2 className="font-sans text-3xl font-extrabold text-dark">{cat.title}</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.05]"
                >
                  <h3 className="text-lg font-bold text-dark">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                  <p className="mt-4 font-sans text-lg font-bold text-gradient-primary">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          >
            Demander un audit gratuit
          </Link>
        </div>
      </div>

      <CTA />
    </>
  );
}
