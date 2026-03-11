import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Automatisation Marketing & API — WhatsApp, Facebook Leads, Stripe, Email",
  description:
    "Agence automatisation marketing a Paris. Integration WhatsApp Business API, Facebook Leads, Stripe, emails automatiques. On connecte vos outils pour tout automatiser.",
  keywords: [
    "automatisation marketing PME",
    "integration API entreprise",
    "marketing automation France",
    "automatisation email marketing",
    "integration Facebook Leads CRM",
    "webhook automatisation",
    "automatisation prospection",
    "integration Stripe paiement",
    "workflow automatisation e-commerce",
  ],
  alternates: { canonical: "https://my-dtm.fr/services/automatisation" },
};

const INTEGRATIONS = [
  { name: "WhatsApp Business API", desc: "Chatbot, templates, notifications automatiques, multi-agents.", href: "/services/whatsapp-business" },
  { name: "Facebook & Instagram Leads", desc: "Capture automatique des leads. Webhook → CRM → WhatsApp en temps reel." },
  { name: "Stripe", desc: "Paiement en ligne, webhooks, factures automatiques, dashboard revenus." },
  { name: "Resend / SendGrid", desc: "Emails transactionnels, sequences automatiques, templates responsive." },
  { name: "Google Search Console", desc: "Connexion API, rapports automatiques, indexation forcee." },
  { name: "CRM & Google Sheets", desc: "Synchronisation contacts, export automatique, reporting." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatisation Marketing & API",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Integration WhatsApp Business API, Facebook Leads, Stripe, emails automatiques. On connecte vos outils pour tout automatiser.",
    areaServed: { "@type": "Country", name: "France" },
    offers: { "@type": "AggregateOffer", lowPrice: "500", highPrice: "3000", priceCurrency: "EUR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://my-dtm.fr/services" },
      { "@type": "ListItem", position: 3, name: "Automatisation", item: "https://my-dtm.fr/services/automatisation" },
    ],
  },
];

export default function AutomatisationPage() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Automatisation</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Automatisez tout. Concentrez-vous sur votre business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            On connecte vos outils entre eux pour que vos leads, paiements, emails et messages WhatsApp tournent sans vous.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Audit gratuit
          </Link>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos integrations</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((i) => (
              <div key={i.name} className="rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-bold text-dark">{i.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{i.desc}</p>
                {i.href && (
                  <Link href={i.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    En savoir plus <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example workflow */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl font-extrabold text-dark">Exemple de workflow automatise</h2>
          <div className="mt-12 space-y-4 text-left">
            {[
              "Un prospect remplit un formulaire Facebook Lead Ad",
              "Webhook capture le lead en temps reel → stocke en base de donnees",
              "Message WhatsApp envoye automatiquement dans la seconde",
              "Email de bienvenue envoye avec brochure PDF",
              "Notification interne → votre equipe est alertee",
              "Relance automatique J+3 si pas de reponse",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">{i + 1}</div>
                <p className="text-sm text-dark">{step}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
            Automatiser mon business
          </Link>
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
              { href: "/services/marketing-digital", label: "Marketing Digital" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
