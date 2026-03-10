import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Creation Site Web Paris — Site Vitrine, E-commerce, Plateforme Sur Mesure",
  description:
    "Agence creation site web a Paris. Sites vitrines, e-commerce Stripe, plateformes evenementielles. Next.js, React, performance et SEO integres. Devis gratuit.",
  keywords: [
    "creation site web Paris",
    "agence creation site internet Paris",
    "creation site vitrine professionnel prix",
    "creation site e-commerce Paris",
    "creation boutique en ligne Paris",
    "refonte site internet prix",
    "developpeur Next.js Paris",
    "agence web Paris",
    "creation site web artisan Paris",
    "site internet TPE PME",
  ],
  openGraph: {
    title: "Creation Site Web Paris — My-DTM Agency",
    description: "Sites vitrines, e-commerce, plateformes sur mesure. Devis gratuit sous 48h.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/creation-site-web" },
};

const OFFERS = [
  { name: "Site Vitrine Pro", price: "A partir de 1 500 \u20AC", desc: "Design responsive, SEO de base, formulaire contact, Google Maps. Ideal pour restaurants, freelances, artisans, associations.", features: ["Design responsive mobile-first", "5 a 10 pages", "SEO technique integre", "Formulaire de contact", "Hebergement Vercel inclus", "Livraison 2 semaines"] },
  { name: "Site E-commerce", price: "A partir de 3 000 \u20AC", desc: "Marketplace complete avec paiement Stripe, gestion stocks, dashboard vendeur.", features: ["Catalogue produits illimite", "Paiement Stripe securise", "Gestion stocks & commandes", "Dashboard vendeur", "Emails transactionnels", "Livraison 4 semaines"] },
  { name: "Plateforme Evenementielle", price: "A partir de 4 000 \u20AC", desc: "Billetterie en ligne avec QR codes, reservation de stands, dashboard admin temps reel.", features: ["Billetterie Stripe + QR codes", "Reservation stands exposants", "Dashboard admin temps reel", "Emails de confirmation", "Schema SEO Event", "Livraison 4-6 semaines"] },
  { name: "Ecosysteme Digital Complet", price: "Sur devis", desc: "Site + marketplace + billetterie + journal + annuaire. Tout interconnecte sous une plateforme.", features: ["Modules interconnectes", "Base de donnees centralisee", "CMS custom", "API sur mesure", "SEO complet", "Livraison 8-12 semaines"] },
];

const TECH_STACK = [
  { name: "Next.js", desc: "Framework React pour des sites ultra-rapides" },
  { name: "React 19", desc: "Interface utilisateur reactive et moderne" },
  { name: "Tailwind CSS", desc: "Design responsive et personnalisable" },
  { name: "Prisma + PostgreSQL", desc: "Base de donnees robuste et scalable" },
  { name: "Stripe", desc: "Paiements securises et conformes" },
  { name: "Vercel", desc: "Hebergement CDN global, 99.9% uptime" },
];

export default function CreationSiteWebPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Creation Site Web Paris",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Agence creation site web a Paris. Sites vitrines, e-commerce, plateformes sur mesure.",
    areaServed: { "@type": "City", name: "Paris" },
    offers: { "@type": "AggregateOffer", lowPrice: "1500", highPrice: "10000", priceCurrency: "EUR" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://my-dtm.fr/services" },
          { "@type": "ListItem", position: 3, name: "Creation Site Web", item: "https://my-dtm.fr/services/creation-site-web" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-violet">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-violet">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-dark">Creation Site Web</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            Creation de site web a Paris — performant, rapide, optimise SEO
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            On cree des sites qui convertissent, pas juste des sites qui existent. Performance, design et SEO integres des le premier jour.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30">
            Devis gratuit sous 48h
          </Link>
        </div>
      </section>

      <div className="accent-strip" />

      {/* Offers */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">Nos offres</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className="rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/[0.05]">
                <h3 className="text-xl font-bold text-dark">{o.name}</h3>
                <div className="mt-2 font-serif text-3xl font-black text-gradient-violet">{o.price}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.desc}</p>
                <ul className="mt-6 space-y-2">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">Technologies utilisees</h2>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
            {TECH_STACK.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-white p-6 text-center">
                <h3 className="text-lg font-bold text-dark">{t.name}</h3>
                <p className="mt-2 text-sm text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-2xl font-black text-dark">Nos autres services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/services/seo", label: "SEO Technique" },
              { href: "/services/whatsapp-business", label: "WhatsApp Business" },
              { href: "/services/automatisation", label: "Automatisation" },
              { href: "/services/marketing-digital", label: "Marketing Digital" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-violet hover:text-violet">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-serif text-3xl font-black text-white sm:text-4xl">Pret a lancer votre site ?</h2>
        <p className="relative mt-4 text-white/60">Devis gratuit sous 48h. On s&apos;occupe de tout.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Demander un devis
        </Link>
      </section>
    </>
  );
}
