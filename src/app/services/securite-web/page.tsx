import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sécurité Web Paris — Audit, Hardening, CSP, Rotation des Secrets",
  description:
    "Agence sécurité web à Paris. Audit, hardening (CSP, headers, secrets), protection des routes et uploads. Blindez votre site avant qu'il soit trop tard.",
  keywords: [
    "securite site web Paris",
    "audit securite web",
    "hardening application web",
    "Content Security Policy CSP",
    "rotation des secrets",
    "protection routes API",
    "validation upload fichiers",
    "securite Next.js",
    "headers securite HTTP",
    "audit OWASP PME",
    "infogerance securite Paris",
    "conformite securite donnees",
  ],
  openGraph: {
    title: "Sécurité Web — My-DTM",
    description: "Audit sécurité, hardening CSP, rotation des secrets, protection des routes et uploads. Audit sécurité gratuit.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/securite-web" },
};

const OFFERS = [
  { name: "Audit de Sécurité", price: "À partir de 700 €", desc: "On identifie les failles avant les attaquants : headers, dépendances, secrets exposés.", features: ["Analyse des headers de sécurité", "Scan des dépendances vulnérables", "Détection des secrets exposés dans le code", "Vérification des routes non protégées", "Rapport priorisé + plan de remédiation"] },
  { name: "Hardening Complet", price: "À partir de 1 500 €", desc: "Mise en sécurité de bout en bout de votre application et de votre plateforme.", features: ["Content Security Policy (CSP) avec nonce", "Headers sécurité (HSTS, X-Frame, etc.)", "Validation stricte des uploads (magic bytes)", "Protection des routes admin (role, UUID)", "Sécurisation des webhooks (signature)", "Rate limiting et anti-bruteforce"], popular: true },
  { name: "Rotation des Secrets", price: "À partir de 500 €", desc: "On purge les secrets exposés dans Git et on met en place une rotation propre.", features: ["Audit des secrets dans l'historique Git", "Rotation Stripe / base de données / APIs", "Mise en place d'un coffre (.env sécurisé)", "Nettoyage de l'historique si nécessaire", "Procédure de rotation documentée"] },
  { name: "Monitoring & Maintenance", price: "Sur devis", desc: "Surveillance continue, mises à jour de sécurité et réaction aux incidents.", features: ["Surveillance des dépendances (Dependabot)", "Alertes sur vulnérabilités critiques", "Mises à jour de sécurité régulières", "Plan de réponse aux incidents", "Rapport de sécurité mensuel"] },
];

const RESULTS = [
  { number: "50+", label: "correctifs de sécurité", detail: "Déployés sur une plateforme en production" },
  { number: "100%", label: "routes admin protégées", detail: "Role + UUID + vérification serveur" },
  { number: "0", label: "secret exposé", detail: "Après rotation et nettoyage Git" },
  { number: "A+", label: "score headers", detail: "CSP, HSTS, X-Frame-Options" },
];

const FAQ = [
  { q: "Pourquoi mon site a-t-il besoin d'un audit de sécurité ?", a: "La plupart des sites en production ont des failles invisibles : secrets exposés dans le code, routes admin accessibles, uploads non validés, headers manquants. Un audit identifie ces failles avant qu'un attaquant ne les exploite. C'est moins cher de prévenir que de gérer une fuite de données ou un site piraté." },
  { q: "C'est quoi une Content Security Policy (CSP) ?", a: "La CSP est un en-tête HTTP qui indique au navigateur quelles ressources (scripts, styles, images) il a le droit de charger. Bien configurée avec un nonce, elle bloque la majorité des attaques XSS (injection de code malveillant), qui sont parmi les plus courantes sur le web." },
  { q: "Que se passe-t-il si des secrets ont été exposés dans Git ?", a: "Si une clé API ou un mot de passe est apparu dans l'historique Git, il faut le considérer comme compromis, même s'il a été supprimé ensuite : l'historique reste accessible. On effectue une rotation de tous les secrets concernés (Stripe, base de données, APIs) et on met en place une procédure pour éviter que cela se reproduise." },
  { q: "Vous intervenez sur quelles technologies ?", a: "On travaille principalement sur des applications web modernes (Next.js, React, Node.js) et leurs infrastructures (Vercel, Cloudflare, bases PostgreSQL/Neon). L'audit et le hardening s'adaptent à votre stack, que ce soit un site vitrine, un e-commerce ou une plateforme complète." },
];

export default function SecuriteWebPage() {
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
    name: "Sécurité Web (audit, hardening, rotation des secrets)",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Audit de sécurité, hardening complet (CSP, headers, uploads, routes), rotation des secrets et monitoring pour applications web et plateformes.",
    areaServed: { "@type": "Country", name: "France" },
    offers: { "@type": "AggregateOffer", lowPrice: "500", highPrice: "1500", priceCurrency: "EUR" },
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
          { "@type": "ListItem", position: 3, name: "Sécurité Web", item: "https://my-dtm.fr/services/securite-web" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Sécurité Web</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Sécurité web — blindez votre site avant qu'il ne soit trop tard
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Audit, hardening complet (CSP, headers, secrets), protection des routes et des uploads. On sécurise votre application de bout en bout.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Audit sécurité gratuit
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
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos offres sécurité</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className={`rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${o.popular ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/10" : "border-border bg-white"}`}>
                {o.popular && <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Le + demandé</span>}
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
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark">Questions fréquentes</h2>
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
              { href: "/services/tracking-conformite", label: "Tracking & Conformité" },
              { href: "/services/creation-site-web", label: "Création site web" },
              { href: "/services/automatisation", label: "Automatisation" },
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
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Votre plateforme est-elle vraiment sécurisée ?</h2>
        <p className="relative mt-4 text-white/60">Audit sécurité gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Audit sécurité gratuit
        </Link>
      </section>
    </>
  );
}
