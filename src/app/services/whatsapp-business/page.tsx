import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Users, MessageCircle, BarChart3, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Configuration WhatsApp Business API — Agence Chatbot WhatsApp Paris",
  description:
    "Agence specialisee WhatsApp Business API a Paris. Configuration complete, chatbot automatique, templates, webhooks Facebook Leads. Installation en 48h. Devis gratuit.",
  keywords: [
    "WhatsApp Business API configuration",
    "agence chatbot WhatsApp France",
    "integration WhatsApp Business entreprise",
    "automatiser WhatsApp Business",
    "WhatsApp Business API prix France",
    "chatbot WhatsApp e-commerce",
    "WhatsApp Business restaurant",
    "WhatsApp Business multi-agents",
    "configurer WhatsApp Business API",
    "WhatsApp Business catalogue produits",
  ],
  openGraph: {
    title: "Configuration WhatsApp Business API — My-DTM Paris",
    description: "On configure votre WhatsApp Business API en 48h. Chatbot, templates, webhooks. Devis gratuit.",
    type: "website",
  },
  alternates: { canonical: "https://my-dtm.com/services/whatsapp-business" },
};

const FEATURES = [
  { icon: <Bot size={24} />, title: "Chatbot automatique", desc: "Reponses instantanees 24h/24 : FAQ, horaires, menu, tarifs. Vos clients n'attendent jamais." },
  { icon: <Zap size={24} />, title: "Webhooks temps reel", desc: "Lead Facebook/Instagram capture → message WhatsApp envoye dans la seconde. Zero lead perdu." },
  { icon: <MessageCircle size={24} />, title: "Templates pre-approuves", desc: "Messages de confirmation, rappel RDV, promo, relance. Valides par Meta, prets a l'emploi." },
  { icon: <Users size={24} />, title: "Multi-agents", desc: "Plusieurs collaborateurs repondent depuis le meme numero. Ideal pour les equipes." },
  { icon: <BarChart3 size={24} />, title: "Analytics & reporting", desc: "Taux de lecture, reponse, conversion. Mesurez l'impact de chaque campagne WhatsApp." },
  { icon: <Clock size={24} />, title: "Installation 48h", desc: "Compte Business API, verification Meta, templates, webhooks. On s'occupe de tout." },
];

const USE_CASES = [
  { sector: "Restaurants & Traiteurs", examples: "Reservations automatiques, menu du jour, confirmation de commande, rappel J-1" },
  { sector: "E-commerce & Boutiques", examples: "Suivi commande, relance panier abandonne, alertes promo, SAV instantane" },
  { sector: "Evenementiel & Festivals", examples: "Envoi billets, rappels J-7/J-1, infos pratiques, feedback post-evenement" },
  { sector: "Salons de coiffure & Beaute", examples: "Prise de RDV automatique, rappels, envoi portfolio, fidelisation" },
  { sector: "Agences immobilieres", examples: "Alertes nouveaux biens, confirmation visite, suivi dossier, relance" },
  { sector: "Associations & ONG", examples: "Communication membres, cotisations, evenements, newsletters communautaires" },
  { sector: "Cabinets medicaux", examples: "Rappel RDV, resultats labo, ordonnances, teleconsultation" },
  { sector: "Auto-ecoles & Formation", examples: "Planning cours, rappels examen, resultats, facturation" },
];

const PRICING = [
  { name: "Starter", price: "800", desc: "Compte Business API + 3 templates + webhook basique", features: ["Compte Business API verifie", "3 templates personnalises", "Webhook notifications", "Formation 1h", "Support 15 jours"] },
  { name: "Business", price: "1 500", desc: "Chatbot complet + integration Facebook Leads + analytics", features: ["Tout Starter +", "Chatbot multi-scenarios", "Integration Facebook Leads", "Dashboard analytics", "Multi-agents (3 postes)", "Support 30 jours"], popular: true },
  { name: "Enterprise", price: "Sur devis", desc: "Solution sur mesure, CRM, multi-numeros, API custom", features: ["Tout Business +", "Integration CRM", "API custom", "Multi-numeros", "Agents illimites", "Support prioritaire 90 jours"] },
];

const FAQ = [
  { q: "Quelle est la difference entre WhatsApp Business et WhatsApp Business API ?", a: "WhatsApp Business (gratuit) est une app pour petits commerces avec des fonctions limitees. WhatsApp Business API est la version professionnelle qui permet l'automatisation, les chatbots, les webhooks, le multi-agents et l'integration avec vos outils (CRM, site web, Facebook Leads). C'est cette version que nous configurons." },
  { q: "Combien coute WhatsApp Business API par mois ?", a: "Meta facture par conversation : environ 0.05€ par conversation initiee par l'entreprise et 0.03€ par conversation initiee par le client. Les 1000 premieres conversations par mois sont gratuites. Pour la plupart des PME, le cout mensuel est entre 10€ et 50€." },
  { q: "Combien de temps pour installer WhatsApp Business API ?", a: "Notre equipe configure tout en 48h : creation du compte, verification Meta, templates, webhooks et tests. Vous n'avez rien a faire techniquement." },
  { q: "Puis-je garder mon numero actuel ?", a: "Oui, vous pouvez migrer votre numero existant vers WhatsApp Business API. Attention : le numero ne pourra plus etre utilise sur l'app WhatsApp classique ou WhatsApp Business app." },
  { q: "WhatsApp Business API fonctionne-t-il avec Facebook Leads ?", a: "Oui, c'est meme l'un des cas d'usage les plus puissants. Quand un prospect remplit un formulaire Facebook/Instagram Lead Ad, il recoit automatiquement un message WhatsApp dans la seconde. Le taux de conversion est 3 a 5x superieur a l'email." },
  { q: "Faut-il un site web pour utiliser WhatsApp Business API ?", a: "Non, mais c'est recommande. Meta demande une URL de politique de confidentialite pour la verification. On peut creer cette page pour vous si besoin." },
];

export default function WhatsAppBusinessPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Configuration WhatsApp Business API",
    provider: {
      "@type": "Organization",
      name: "My-DTM Digital Agency",
      url: "https://my-dtm.com",
    },
    description: "Configuration complete de WhatsApp Business API pour entreprises. Chatbot, templates, webhooks, multi-agents.",
    areaServed: { "@type": "Country", name: "France" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "800",
      highPrice: "3000",
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white/80">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">WhatsApp Business</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="font-serif text-4xl font-black text-white sm:text-5xl">
                Configuration WhatsApp Business API pour votre entreprise
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                98% de taux d&apos;ouverture. On configure votre chatbot, vos templates et vos automatisations en 48h.
                Vos clients vous contactent, vous repondez automatiquement.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="rounded-full bg-white px-8 py-4 text-base font-bold text-[#075E54] transition-all hover:-translate-y-1 hover:shadow-xl">
                  Audit gratuit
                </Link>
                <Link href="https://wa.me/33743537551?text=Bonjour%2C%20je%20souhaite%20configurer%20WhatsApp%20Business%20pour%20mon%20entreprise." target="_blank" className="rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10">
                  Discuter sur WhatsApp
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "98%", label: "Taux d'ouverture" },
                { num: "45%", label: "Taux de reponse" },
                { num: "10x", label: "Plus que l'email" },
                { num: "48h", label: "Installation" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 px-6 py-6 text-center backdrop-blur-sm">
                  <div className="font-serif text-4xl font-black text-white">{s.num}</div>
                  <div className="mt-1 text-sm font-medium text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">
            Ce qu&apos;on configure pour vous
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-violet/20 hover:shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">{f.icon}</div>
                <h3 className="mt-5 text-lg font-bold text-dark">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">
            WhatsApp Business pour chaque secteur
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Quel que soit votre metier, WhatsApp Business automatise votre relation client.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((uc) => (
              <div key={uc.sector} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="text-base font-bold text-dark">{uc.sector}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{uc.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">
            Tarifs WhatsApp Business API
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Installation complete. Pas d&apos;abonnement cache.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING.map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-8 ${p.popular ? "border-violet bg-violet/[0.02] shadow-lg shadow-violet/10" : "border-border bg-white"}`}>
                {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-violet px-4 py-1 text-xs font-bold text-white">Populaire</span>}
                <h3 className="text-xl font-bold text-dark">{p.name}</h3>
                <div className="mt-3 font-serif text-4xl font-black text-gradient-violet">{p.price}{p.price !== "Sur devis" && <span className="text-lg font-sans font-normal text-muted">&nbsp;&euro; HT</span>}</div>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 block rounded-full py-3 text-center text-sm font-bold transition-all hover:-translate-y-0.5 ${p.popular ? "bg-gradient-to-r from-violet to-gold text-white hover:shadow-lg" : "border border-border text-dark hover:border-violet hover:text-violet"}`}>
                  Choisir {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-black text-dark sm:text-4xl">
            Questions frequentes
          </h2>
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
              { href: "/services/seo", label: "SEO Technique" },
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,211,102,0.1)_0%,transparent_70%)]" />
        <h2 className="relative font-serif text-3xl font-black text-white sm:text-4xl">Pret a automatiser votre WhatsApp ?</h2>
        <p className="relative mt-4 text-white/60">Audit gratuit. On vous repond sous 48h.</p>
        <Link href="/contact" className="relative mt-8 inline-flex rounded-full bg-[#25D366] px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/30">
          Configurer mon WhatsApp Business
        </Link>
      </section>
    </>
  );
}
