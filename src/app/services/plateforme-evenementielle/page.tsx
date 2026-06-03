import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Plateforme Billetterie Sur Mesure — Création Site Événementiel | Paris",
  description:
    "Agence qui crée votre plateforme de billetterie événementielle sur mesure : billets QR code, réservation exposants, paiement en ligne, dashboard admin. Sans commission par billet. Devis gratuit.",
  keywords: [
    "plateforme billetterie sur mesure",
    "creation site evenementiel",
    "logiciel reservation exposants",
    "billetterie QR code evenement",
    "site billetterie association",
    "billetterie en ligne sans commission",
    "plateforme evenementielle Paris",
    "logiciel billetterie festival",
    "systeme reservation evenement",
    "billetterie foire salon",
    "creation site billetterie Next.js",
    "alternative Billetweb Weezevent",
  ],
  openGraph: {
    title: "Plateforme Billetterie Sur Mesure — My-DTM Paris",
    description: "On crée votre billetterie événementielle sur mesure : QR codes, exposants, paiement, dashboard. Sans commission par billet.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/plateforme-evenementielle" },
};

const OFFERS = [
  { name: "Billetterie Essentielle", price: "A partir de 4 000 €", desc: "Votre site de billetterie en ligne, prêt à vendre, à votre image.", features: ["Page événement + tunnel d'achat", "Billets PDF avec QR code unique", "Paiement Stripe / PayPal intégré", "Emails de confirmation automatiques", "Dashboard ventes en temps réel"] },
  { name: "Plateforme Complète", price: "A partir de 7 000 €", desc: "Billetterie + réservation exposants + contrôle d'accès. La solution tout-en-un.", features: ["Tout Essentielle +", "Espace réservation exposants", "Scan QR code à l'entrée (contrôle d'accès)", "Tarifs multiples, codes promo, invitations", "Acompte / paiement en plusieurs fois", "Relances automatiques (email + WhatsApp)"], popular: true },
  { name: "Écosystème Événementiel", price: "Sur devis", desc: "Plusieurs événements, multi-organisateurs, annuaire, journal. Sur mesure intégral.", features: ["Tout Plateforme Complète +", "Multi-événements / multi-saisons", "Annuaire exposants + journal", "Espace organisateur / comptabilité", "Tracking Meta + acquisition intégrés", "Hébergement & maintenance"] },
];

const RESULTS = [
  { number: "0 %", label: "commission par billet", detail: "Contrairement aux plateformes type Billetweb/Weezevent" },
  { number: "QR", label: "billets sécurisés", detail: "QR code unique, scan à l'entrée, anti-fraude" },
  { number: "100%", label: "à votre image", detail: "Votre marque, votre domaine, votre design" },
  { number: "Stripe", label: "paiement direct", detail: "Vous encaissez directement, sans intermédiaire" },
];

const FAQ = [
  { q: "Pourquoi une billetterie sur mesure plutôt que Billetweb ou Weezevent ?", a: "Les plateformes grand public prélèvent une commission sur chaque billet (souvent 1 à 5 %), affichent leur marque et limitent vos fonctionnalités. Une billetterie sur mesure vous appartient : zéro commission par billet, votre image, votre domaine, et toutes les fonctions spécifiques à votre événement (réservation exposants, acompte, invitations VIP, tracking publicitaire). Sur de gros volumes, elle est vite rentabilisée." },
  { q: "Combien coûte une plateforme de billetterie événementielle ?", a: "Une billetterie en ligne essentielle démarre à 4 000 €. Une plateforme complète avec réservation exposants et contrôle d'accès démarre à 7 000 €. Un écosystème multi-événements est sur devis. Contrairement aux solutions en SaaS, c'est un investissement unique, sans commission récurrente par billet vendu." },
  { q: "Les billets fonctionnent-ils avec un QR code à l'entrée ?", a: "Oui. Chaque billet vendu génère un QR code unique. Le jour J, vous scannez les billets avec un simple smartphone : le système vérifie la validité, empêche les doublons et vous donne le comptage des entrées en temps réel." },
  { q: "Peut-on gérer la réservation des exposants ?", a: "Oui, c'est l'une de nos spécialités. Les exposants réservent leur stand en ligne, paient (intégralement ou par acompte), reçoivent leurs badges, et vous suivez tout depuis un dashboard. On a déjà déployé ce système pour des foires et salons avec des centaines d'exposants." },
  { q: "Le paiement et l'argent passent-ils par vous ?", a: "Non. Le paiement est branché directement sur votre compte Stripe (et/ou PayPal) : vous encaissez immédiatement, sans intermédiaire ni rétention de fonds. On configure tout, mais l'argent est à vous, en temps réel." },
];

export default function PlateformeEvenementiellePage() {
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
    name: "Création de plateforme de billetterie événementielle sur mesure",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Plateforme de billetterie sur mesure : billets QR code, réservation exposants, paiement en ligne, contrôle d'accès et dashboard admin.",
    areaServed: { "@type": "Country", name: "France" },
    offers: { "@type": "AggregateOffer", lowPrice: "4000", highPrice: "20000", priceCurrency: "EUR" },
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
          { "@type": "ListItem", position: 3, name: "Plateforme Événementielle", item: "https://my-dtm.fr/services/plateforme-evenementielle" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Plateforme Événementielle</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Votre plateforme de billetterie événementielle, sur mesure
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Billets QR code, réservation exposants, paiement en ligne, contrôle d&apos;accès et dashboard. À votre image, sur votre domaine, <strong className="text-dark">sans commission par billet</strong>.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Devis gratuit
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
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos formules billetterie</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {OFFERS.map((o) => (
              <div key={o.name} className={`rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${o.popular ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/10" : "border-border bg-white"}`}>
                {o.popular && <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Le + complet</span>}
                <h3 className="text-xl font-bold text-dark">{o.name}</h3>
                <div className="mt-2 font-sans text-2xl font-extrabold text-gradient-primary">{o.price}</div>
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
              { href: "/services/creation-site-web", label: "Creation site web" },
              { href: "/services/whatsapp-business", label: "WhatsApp Business" },
              { href: "/services/marketing-digital", label: "Marketing Digital" },
              { href: "/services/tracking-conformite", label: "Tracking & Conformite" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Un événement à billetter ?</h2>
        <p className="relative mt-4 text-white/60">Devis gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Demander un devis
        </Link>
      </section>
    </>
  );
}
