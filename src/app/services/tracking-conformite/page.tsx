import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tracking & Conformite RGPD Paris — Meta Pixel, Conversions API, Consentement",
  description:
    "Agence tracking a Paris. Meta Pixel + Conversions API server-side, deduplication, Advanced Matching, consentement RGPD. Recuperez vos conversions perdues par iOS et les bloqueurs. Audit tracking gratuit.",
  keywords: [
    "tracking Meta Pixel Paris",
    "Conversions API Facebook",
    "CAPI server-side",
    "deduplication evenements Pixel",
    "Advanced Matching Meta",
    "consentement RGPD tracking",
    "match quality Facebook Ads",
    "tracking conversions iOS 14",
    "EMQ Event Match Quality",
    "agence tracking publicitaire Paris",
    "Google Ads conversion tracking",
    "server-side tagging",
  ],
  openGraph: {
    title: "Tracking & Conformite RGPD — My-DTM",
    description: "Meta Pixel + Conversions API, deduplication, Advanced Matching, consentement RGPD. Audit tracking gratuit.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/tracking-conformite" },
};

const OFFERS = [
  { name: "Audit Tracking", price: "500 €", desc: "On verifie ce qui remonte vraiment dans vos plateformes pub et ce que vous perdez.", features: ["Audit Pixel + Conversions API", "Detection des doublons et evenements manquants", "Score Event Match Quality (EMQ)", "Verification consentement RGPD", "Rapport + plan d'action priorise"] },
  { name: "Setup Pixel + Conversions API", price: "A partir de 800 €", desc: "Tracking server-side complet pour ne plus perdre de conversions a cause d'iOS et des bloqueurs.", features: ["Meta Pixel + Conversions API (server-side)", "Deduplication par event_id", "Advanced Matching (email, telephone hashes)", "Evenements e-commerce (Purchase, IC, Lead)", "external_id + parametres fbp/fbc"], popular: true },
  { name: "Mise en Conformite RGPD", price: "A partir de 600 €", desc: "Bandeau de consentement, mode consent et tracking conforme a la CNIL.", features: ["Banniere de consentement (Consent Mode)", "Tracking conditionne au consentement", "Politique de confidentialite a jour", "Anonymisation / hash des donnees", "Documentation conformite CNIL"] },
  { name: "Optimisation Match Quality", price: "A partir de 700 €", desc: "On pousse votre score de correspondance pour des audiences et un ROAS meilleurs.", features: ["Enrichissement Advanced Matching", "Currency uppercase + ViewContent enrichi", "Dedup Purchase / Lead / InitiateCheckout", "Backfill historique via CAPI", "Suivi EMQ avant / apres"] },
];

const RESULTS = [
  { number: "95%", label: "couverture fbp", detail: "Apres fix PageView post-consentement" },
  { number: "+40%", label: "Match Quality moyen", detail: "Via Advanced Matching + external_id" },
  { number: "0", label: "doublon d'evenement", detail: "Deduplication par event_id Pixel + CAPI" },
  { number: "100%", label: "conforme RGPD", detail: "Consent Mode + tracking conditionne" },
];

const FAQ = [
  { q: "Pourquoi mes conversions Facebook ne remontent plus correctement ?", a: "Depuis iOS 14.5 et la generalisation des bloqueurs de publicite, le Pixel cote navigateur perd une partie des evenements. La Conversions API (CAPI) envoie les conversions directement depuis votre serveur, ce qui recupere les evenements perdus. Combinee a la deduplication, elle restaure une mesure fiable." },
  { q: "C'est quoi la deduplication d'evenements ?", a: "Quand vous envoyez le meme achat a la fois par le Pixel (navigateur) et par la Conversions API (serveur), Meta doit savoir qu'il s'agit du meme evenement, sinon il le compte deux fois. La deduplication par event_id permet a Meta de fusionner les deux signaux sans gonfler vos chiffres." },
  { q: "Le tracking server-side est-il conforme au RGPD ?", a: "Oui, a condition de respecter le consentement. On met en place un Consent Mode : aucun evenement de tracking n'est envoye tant que l'utilisateur n'a pas accepte. Les donnees personnelles (email, telephone) sont hashees avant envoi. On documente le tout pour votre conformite CNIL." },
  { q: "C'est quoi l'Event Match Quality (EMQ) ?", a: "C'est un score de 0 a 10 que Meta attribue a la qualite des informations envoyees avec vos evenements (email, telephone, nom, IP, external_id...). Plus le score est haut, mieux Meta retrouve les utilisateurs, ce qui ameliore le ciblage, les audiences similaires et le ROAS de vos campagnes." },
];

export default function TrackingConformitePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tracking & Conformite RGPD (Meta Pixel + Conversions API)",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Setup Meta Pixel + Conversions API server-side, deduplication, Advanced Matching et consentement RGPD pour fiabiliser vos conversions.",
    areaServed: { "@type": "Country", name: "France" },
    offers: { "@type": "AggregateOffer", lowPrice: "500", highPrice: "800", priceCurrency: "EUR" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://my-dtm.fr/services" },
          { "@type": "ListItem", position: 3, name: "Tracking & Conformite", item: "https://my-dtm.fr/services/tracking-conformite" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Tracking & Conformite</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Tracking & conformite RGPD — arretez de perdre vos conversions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Meta Pixel + Conversions API server-side, deduplication, Advanced Matching et consentement RGPD. Une mesure fiable, des campagnes mieux optimisees.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Audit tracking gratuit
          </Link>
        </div>
      </section>

      {/* Results proof */}
      <section className="bg-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {RESULTS.map((r) => (
            <div key={r.label} className="text-center">
              <div className="font-sans text-4xl font-extrabold text-gradient sm:text-5xl">{r.number}</div>
              <p className="mt-2 text-sm font-semibold text-white">{r.label}</p>
              <p className="mt-1 text-xs text-white/50">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos offres tracking</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className={`rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${o.popular ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/10" : "border-border bg-white"}`}>
                {o.popular && <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Le + demande</span>}
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

      {/* Internal links */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-sans text-2xl font-extrabold text-dark">Nos autres services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/services/marketing-digital", label: "Marketing Digital" },
              { href: "/services/automatisation", label: "Automatisation" },
              { href: "/services/securite-web", label: "Securite Web" },
              { href: "/services/seo", label: "SEO Technique" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Vos conversions, enfin fiables ?</h2>
        <p className="relative mt-4 text-white/60">Audit tracking gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Audit tracking gratuit
        </Link>
      </section>
    </>
  );
}
