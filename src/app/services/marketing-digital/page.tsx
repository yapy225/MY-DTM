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

const FAQ = [
  { q: "Combien coute le marketing digital pour une PME ?", a: "Notre offre Acquisition 360° (SEO + WhatsApp + Ads + Email) demarre a partir de 1 000€/mois. La gestion des reseaux sociaux commence a 800€/mois, la newsletter et fidelisation a 400€/mois, et le Pack Lancement Evenement a partir de 2 000€. On construit le mix de canaux selon votre budget et vos objectifs." },
  { q: "Quelle difference entre l’acquisition 360° et la gestion des reseaux sociaux ?", a: "L’Acquisition 360° (a partir de 1 000€/mois) pilote tous vos canaux d’acquisition depuis un tableau de bord unifie : SEO, Facebook/Instagram Ads, WhatsApp et newsletter. La Gestion des reseaux sociaux (a partir de 800€/mois) se concentre sur le calendrier editorial, la creation de contenu et le community management. La premiere vise les leads, la seconde la presence et l’engagement." },
  { q: "Combien de temps pour voir des resultats en marketing digital ?", a: "Les campagnes Ads et WhatsApp generent des premiers resultats des le premier mois, avec un rapport de performance a l’appui. Le SEO et le contenu montent en puissance sur 3 a 6 mois. On mesure tout et on ajuste chaque mois lors d’un call strategie." },
  { q: "Pourquoi une approche multi-canal plutot qu’un seul canal ?", a: "Vos clients ne sont pas tous au meme endroit : certains cherchent sur Google, d’autres reagissent a une pub Facebook ou repondent sur WhatsApp. En combinant SEO, Ads, WhatsApp et email, on multiplie les points de contact et on ne depend pas d’un seul canal. Resultat : une acquisition plus stable et un cout par lead optimise." },
  { q: "Que comprend le Pack Lancement Evenement ?", a: "Le Pack Lancement Evenement (a partir de 2 000€) est une offre cle en main : landing page dediee, campagne Facebook/Instagram Ads, sequence WhatsApp (confirmation et rappels), email blast sur votre base de contacts et relance post-evenement. Ideal pour remplir un evenement du lancement jusqu’a l’after." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Digital Multi-Canal",
    provider: { "@type": "Organization", name: "My DTM", url: "https://my-dtm.fr" },
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
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Marketing Digital</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Marketing digital multi-canal — vos clients vous trouvent partout
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            SEO, WhatsApp, Facebook Ads, email. On gere tous vos canaux d&apos;acquisition pour un maximum de resultats.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Audit gratuit
          </Link>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos offres marketing</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className="rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-bold text-dark">{o.name}</h3>
                <div className="mt-2 font-sans text-3xl font-extrabold text-gradient-primary">{o.price}</div>
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

      {/* FAQ */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark">Questions frequentes</h2>
          <div className="mt-14 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="text-base font-bold text-dark">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-sans text-2xl font-extrabold text-dark">Nos autres services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/services/creation-site-web", label: "Creation site web" },
              { href: "/services/seo", label: "SEO Technique" },
              { href: "/services/whatsapp-business", label: "WhatsApp Business" },
              { href: "/services/automatisation", label: "Automatisation" },
              { href: "/services/tracking-conformite", label: "Tracking & Conformite" },
              { href: "/services/securite-web", label: "Securite Web" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Pret a booster votre acquisition ?</h2>
        <p className="relative mt-4 text-white/60">Audit gratuit. Resultats mesurables des le premier mois.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Lancer ma strategie
        </Link>
      </section>
    </>
  );
}
