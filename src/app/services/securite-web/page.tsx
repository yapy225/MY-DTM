import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Securite Web Paris — Audit, Hardening, CSP, Rotation des Secrets",
  description:
    "Agence securite web a Paris. Audit de securite, hardening complet (CSP, headers, secrets), protection des routes et des uploads. Blindez votre site et votre plateforme. Audit securite gratuit.",
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
    title: "Securite Web — My-DTM",
    description: "Audit securite, hardening CSP, rotation des secrets, protection des routes et uploads. Audit securite gratuit.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/securite-web" },
};

const OFFERS = [
  { name: "Audit de Securite", price: "A partir de 700 €", desc: "On identifie les failles avant les attaquants : headers, dependances, secrets exposes.", features: ["Analyse des headers de securite", "Scan des dependances vulnerables", "Detection des secrets exposes dans le code", "Verification des routes non protegees", "Rapport priorise + plan de remediation"] },
  { name: "Hardening Complet", price: "A partir de 1 500 €", desc: "Mise en securite de bout en bout de votre application et de votre plateforme.", features: ["Content Security Policy (CSP) avec nonce", "Headers securite (HSTS, X-Frame, etc.)", "Validation stricte des uploads (magic bytes)", "Protection des routes admin (role, UUID)", "Securisation des webhooks (signature)", "Rate limiting et anti-bruteforce"], popular: true },
  { name: "Rotation des Secrets", price: "A partir de 500 €", desc: "On purge les secrets exposes dans Git et on met en place une rotation propre.", features: ["Audit des secrets dans l'historique Git", "Rotation Stripe / base de donnees / APIs", "Mise en place d'un coffre (.env securise)", "Nettoyage de l'historique si necessaire", "Procedure de rotation documentee"] },
  { name: "Monitoring & Maintenance", price: "Sur devis", desc: "Surveillance continue, mises a jour de securite et reaction aux incidents.", features: ["Surveillance des dependances (Dependabot)", "Alertes sur vulnerabilites critiques", "Mises a jour de securite regulieres", "Plan de reponse aux incidents", "Rapport de securite mensuel"] },
];

const RESULTS = [
  { number: "50+", label: "correctifs de securite", detail: "Deployes sur une plateforme en production" },
  { number: "100%", label: "routes admin protegees", detail: "Role + UUID + verification serveur" },
  { number: "0", label: "secret expose", detail: "Apres rotation et nettoyage Git" },
  { number: "A+", label: "score headers", detail: "CSP, HSTS, X-Frame-Options" },
];

const FAQ = [
  { q: "Pourquoi mon site a-t-il besoin d'un audit de securite ?", a: "La plupart des sites en production ont des failles invisibles : secrets exposes dans le code, routes admin accessibles, uploads non valides, headers manquants. Un audit identifie ces failles avant qu'un attaquant ne les exploite. C'est moins cher de prevenir que de gerer une fuite de donnees ou un site pirate." },
  { q: "C'est quoi une Content Security Policy (CSP) ?", a: "La CSP est un en-tete HTTP qui indique au navigateur quelles ressources (scripts, styles, images) il a le droit de charger. Bien configuree avec un nonce, elle bloque la majorite des attaques XSS (injection de code malveillant), qui sont parmi les plus courantes sur le web." },
  { q: "Que se passe-t-il si des secrets ont ete exposes dans Git ?", a: "Si une cle API ou un mot de passe est apparu dans l'historique Git, il faut le considerer comme compromis, meme s'il a ete supprime ensuite : l'historique reste accessible. On effectue une rotation de tous les secrets concernes (Stripe, base de donnees, APIs) et on met en place une procedure pour eviter que cela se reproduise." },
  { q: "Vous intervenez sur quelles technologies ?", a: "On travaille principalement sur des applications web modernes (Next.js, React, Node.js) et leurs infrastructures (Vercel, Cloudflare, bases PostgreSQL/Neon). L'audit et le hardening s'adaptent a votre stack, que ce soit un site vitrine, un e-commerce ou une plateforme complete." },
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
    name: "Securite Web (audit, hardening, rotation des secrets)",
    provider: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    description: "Audit de securite, hardening complet (CSP, headers, uploads, routes), rotation des secrets et monitoring pour applications web et plateformes.",
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
          { "@type": "ListItem", position: 3, name: "Securite Web", item: "https://my-dtm.fr/services/securite-web" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">Securite Web</span>
          </nav>
          <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Securite web — blindez votre site avant qu'il ne soit trop tard
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Audit, hardening complet (CSP, headers, secrets), protection des routes et des uploads. On securise votre application de bout en bout.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30">
            Audit securite gratuit
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
          <h2 className="text-center font-sans text-3xl font-extrabold text-dark sm:text-4xl">Nos offres securite</h2>
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
              { href: "/services/tracking-conformite", label: "Tracking & Conformite" },
              { href: "/services/creation-site-web", label: "Creation site web" },
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
        <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Votre plateforme est-elle vraiment securisee ?</h2>
        <p className="relative mt-4 text-white/60">Audit securite gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Audit securite gratuit
        </Link>
      </section>
    </>
  );
}
