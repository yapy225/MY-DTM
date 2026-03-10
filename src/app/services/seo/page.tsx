import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Agence SEO Paris — Audit, Referencement Naturel, Indexation Google",
  description:
    "Agence SEO technique a Paris. Audit complet, redirections 301, Schema.org JSON-LD, indexation Google forcee. +8000 clics/mois recuperes pour nos clients. Audit gratuit.",
  keywords: [
    "agence SEO Paris",
    "audit SEO gratuit",
    "referencement naturel Paris",
    "consultant SEO Paris",
    "tarif agence SEO",
    "prix referencement Google",
    "agence SEO e-commerce",
    "referencement local PME Paris",
    "optimisation Google My Business",
    "migration SEO WordPress Next.js",
    "redirections 301 site web",
    "Schema.org JSON-LD",
  ],
  openGraph: {
    title: "Agence SEO Paris — My-DTM",
    description: "Audit SEO, referencement naturel, indexation Google. +8000 clics/mois recuperes. Audit gratuit.",
  },
  alternates: { canonical: "https://my-dtm.fr/services/seo" },
};

const OFFERS = [
  { name: "Audit SEO Complet", price: "500 \u20AC", desc: "Analyse technique, mots-cles, concurrence, Search Console. Rapport PDF + call.", features: ["Analyse technique complete (vitesse, structure, erreurs)", "Audit mots-cles vs concurrence", "Analyse Search Console", "Rapport PDF actionnable", "Call de restitution 45min"] },
  { name: "SEO Technique", price: "A partir de 1 500 \u20AC", desc: "Implementation complete : Schema.org, redirections, sitemap, Core Web Vitals.", features: ["Schema.org JSON-LD (FAQ, Event, Product, Article)", "Redirections 301 (migration WordPress)", "Sitemap XML dynamique", "Canonical URLs + OpenGraph", "Connexion Search Console + Indexing API", "Optimisation Core Web Vitals"] },
  { name: "Recuperation Trafic Perdu", price: "A partir de 1 000 \u20AC", desc: "On recupere les clics que vous perdez depuis votre migration ou refonte.", features: ["Mapping ancien → nouveau site", "Redirections 301 en masse", "Nettoyage pages en erreur", "Indexation forcee Google Indexing API", "Suivi avant/apres"], popular: true },
  { name: "SEO Contenu Mensuel", price: "A partir de 800 \u20AC/mois", desc: "Articles optimises, maillage interne, FAQ structurees. Croissance organique durable.", features: ["4 articles/mois optimises SEO", "Recherche mots-cles longue traine", "Maillage interne strategique", "FAQ avec schema FAQPage", "Rapport mensuel positions + trafic"] },
];

const RESULTS = [
  { number: "+8 000", label: "clics/mois recuperes", detail: "Via 239 redirections 301 sur Dream Team Africa" },
  { number: "119", label: "URLs dans le sitemap", detail: "Pages dynamiques indexees automatiquement" },
  { number: "11", label: "pages forcees via Indexing API", detail: "Indexation Google en quelques heures" },
  { number: "100%", label: "score Schema.org", detail: "FAQPage, Event, NewsArticle, BreadcrumbList" },
];

const FAQ = [
  { q: "Combien coute le referencement SEO a Paris ?", a: "Un audit SEO complet coute a partir de 500\u20AC. L'optimisation technique complete demarre a 1 500\u20AC. Le suivi mensuel avec creation de contenu commence a 800\u20AC/mois. Chaque projet est different, on adapte notre offre a vos besoins et votre budget." },
  { q: "Combien de temps pour voir des resultats SEO ?", a: "Les corrections techniques (redirections, indexation) montrent des resultats en 2 a 4 semaines. Le contenu SEO prend 3 a 6 mois pour atteindre son plein potentiel. Nos redirections 301 ont recupere +8000 clics/mois en quelques semaines." },
  { q: "Quelle est la difference entre SEO technique et SEO contenu ?", a: "Le SEO technique optimise la structure de votre site (vitesse, indexation, schema, redirections). Le SEO contenu cree des articles et pages optimises pour des mots-cles cibles. Les deux sont complementaires : un bon contenu sur un site mal structure ne rankera pas." },
  { q: "Vous travaillez avec quels types de sites ?", a: "Tous types : sites vitrines, e-commerce, plateformes evenementielles, blogs, annuaires. Que votre site soit sur WordPress, Shopify, Next.js ou autre, on s'adapte a votre stack technique." },
];

export default function SEOPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://my-dtm.fr/services" },
          { "@type": "ListItem", position: 3, name: "SEO Technique", item: "https://my-dtm.fr/services/seo" },
        ],
      }) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-violet">Accueil</Link><span className="mx-2">/</span>
            <Link href="/services" className="hover:text-violet">Services</Link><span className="mx-2">/</span>
            <span className="text-dark">SEO</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            Agence SEO a Paris — on recupere le trafic que vous perdez
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Audit technique, redirections 301, Schema.org, indexation Google forcee. Des resultats concrets, pas des promesses.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30">
            Audit SEO gratuit
          </Link>
        </div>
      </section>

      <div className="accent-strip" />

      {/* Results proof */}
      <section className="bg-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {RESULTS.map((r) => (
            <div key={r.label} className="text-center">
              <div className="font-serif text-4xl font-black text-gradient sm:text-5xl">{r.number}</div>
              <p className="mt-2 text-sm font-semibold text-white">{r.label}</p>
              <p className="mt-1 text-xs text-white/50">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">Nos offres SEO</h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFERS.map((o) => (
              <div key={o.name} className={`rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${o.popular ? "border-violet bg-violet/[0.02] shadow-lg shadow-violet/10" : "border-border bg-white"}`}>
                {o.popular && <span className="mb-4 inline-block rounded-full bg-violet px-3 py-1 text-xs font-bold text-white">Le + demande</span>}
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

      {/* FAQ */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark">Questions frequentes</h2>
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
          <h2 className="font-serif text-2xl font-black text-dark">Nos autres services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/services/creation-site-web", label: "Creation site web" },
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
        <h2 className="relative font-serif text-3xl font-black text-white sm:text-4xl">Pret a dominer Google ?</h2>
        <p className="relative mt-4 text-white/60">Audit SEO gratuit sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
          Audit SEO gratuit
        </Link>
      </section>
    </>
  );
}
