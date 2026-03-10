import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Agence Marketing Digital Paris — Acquisition Multi-Canal, SEO, Ads, WhatsApp",
  description:
    "Agence marketing digital a Paris. Acquisition 360 : SEO + WhatsApp + Facebook Ads + Email. Resultats mesurables, rapport mensuel. Audit gratuit.",
  keywords: [
    "agence marketing digital Paris",
    "marketing multi-canal PME",
    "acquisition client digital",
    "agence Facebook Ads Paris",
    "gestion reseaux sociaux Paris",
    "newsletter marketing entreprise",
    "strategie marketing digital PME",
    "community management Paris",
    "campagne marketing digital prix",
  ],
  alternates: { canonical: "https://my-dtm.fr/services/marketing-digital" },
};

const OFFERS = [
  { name: "Acquisition 360\u00B0", price: "A partir de 1 000 \u20AC/mois", desc: "SEO + WhatsApp + Ads + Email. Tous vos canaux geres depuis un tableau de bord unifie.", features: ["SEO contenu mensuel", "Campagnes Facebook/Instagram Ads", "Automatisation WhatsApp", "Newsletter mensuelle", "Rapport de performance mensuel", "Call strategie mensuel"] },
  { name: "Pack Lancement Evenement", price: "A partir de 2 000 \u20AC", desc: "Landing page + campagne Ads + WhatsApp + email. Cle en main du lancement a l'after.", features: ["Landing page dediee", "Campagne Facebook/Instagram Ads", "Sequence WhatsApp (confirmation + rappels)", "Email blast base contacts", "Relance post-evenement"] },
  { name: "Gestion Reseaux Sociaux", price: "A partir de 800 \u20AC/mois", desc: "Calendrier editorial, creation de contenu, publication et community management.", features: ["Calendrier editorial mensuel", "12 publications/mois", "Creation visuels", "Community management", "Rapport mensuel engagement"] },
  { name: "Newsletter & Fidelisation", price: "A partir de 400 \u20AC/mois", desc: "Template, segmentation, envois reguliers, A/B testing.", features: ["Setup template responsive", "Segmentation base contacts", "2-4 envois/mois", "A/B testing sujets", "Suivi taux ouverture/clics"] },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Digital Multi-Canal",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Acquisition 360 : SEO + WhatsApp + Facebook Ads + Email. Resultats mesurables, rapport mensuel.",
    areaServed: { "@type": "Country", name: "France" },
    offers: { "@type": "AggregateOffer", lowPrice: "400", highPrice: "2000", priceCurrency: "EUR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://my-dtm.fr/services" },
      { "@type": "ListItem", position: 3, name: "Marketing Digital", item: "https://my-dtm.fr/services/marketing-digital" },
    ],
  },
];

export default function MarketingDigitalPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-violet">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-violet">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Marketing Digital</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            Marketing digital multi-canal — vos clients vous trouvent partout
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            SEO, WhatsApp, Facebook Ads, email. On gere tous vos canaux d&apos;acquisition pour un maximum de resultats.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30">
            Audit gratuit
          </Link>
        </div>
      </section>

      <div className="accent-strip" />

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">Nos offres marketing</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className="rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-bold text-dark">{o.name}</h3>
                <div className="mt-2 font-serif text-3xl font-black text-gradient-violet">{o.price}</div>
                <p className="mt-3 text-sm text-muted">{o.desc}</p>
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-2xl font-black text-dark">Nos autres services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/services/creation-site-web", label: "Creation site web" },
              { href: "/services/seo", label: "SEO Technique" },
              { href: "/services/whatsapp-business", label: "WhatsApp Business" },
              { href: "/services/automatisation", label: "Automatisation" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-violet hover:text-violet">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-serif text-3xl font-black text-white sm:text-4xl">Pret a booster votre acquisition ?</h2>
        <p className="relative mt-4 text-white/60">Audit gratuit. Resultats mesurables des le premier mois.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Lancer ma strategie
        </Link>
      </section>
    </>
  );
}
