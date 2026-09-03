import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AUTHOR } from "@/lib/author";

export const metadata: Metadata = {
  title: `${AUTHOR.name} — ${AUTHOR.role}`,
  description: AUTHOR.short,
  alternates: { canonical: AUTHOR.url },
  openGraph: {
    title: `${AUTHOR.name} — ${AUTHOR.role}`,
    description: AUTHOR.short,
    url: AUTHOR.url,
    type: "profile",
    locale: "fr_FR",
  },
};

const EXPERTISE = [
  { t: "Référencement naturel (SEO)", d: "Audit technique, contenu qui répond à l'intention, SEO local et maillage — pour une visibilité durable sur Google sans dépendre de la publicité." },
  { t: "Référencement payant (SEA)", d: "Google Ads et Meta Ads pilotés au ROI : bonnes campagnes, bons mots-clés, bonne mesure, sans brûler le budget." },
  { t: "Marketing digital & acquisition", d: "Des tunnels qui transforment le trafic en clients : landing pages, email, WhatsApp, retargeting." },
  { t: "Automatisation", d: "Connecter site, CRM, paiement et messagerie pour gagner du temps et ne perdre aucun lead (API, WhatsApp Business, workflows)." },
  { t: "Tracking & conformité RGPD", d: "Mesurer juste tout en restant en règle : Consent Mode, Conversions API, déduplication — la performance sans l'illégalité." },
  { t: "Conformité numérique des entreprises", d: "Accompagnement des TPE/PME sur leurs obligations, dont la facturation électronique 2026-2027 (plateformes agréées, formats, e-reporting)." },
];

export default function AuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
    jobTitle: AUTHOR.role,
    description: AUTHOR.short,
    worksFor: { "@type": "Organization", name: "My DTM", url: "https://my-dtm.fr" },
    knowsAbout: [...AUTHOR.knowsAbout],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-extrabold text-white">
            {AUTHOR.initials}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Auteur</p>
            <h1 className="mt-2 font-sans text-4xl font-extrabold text-dark">{AUTHOR.name}</h1>
            <p className="mt-2 text-lg text-muted">{AUTHOR.role}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="mt-8 text-lg leading-relaxed text-muted">
          Alex NTÉBY est consultant en marketing digital au sein de <strong className="text-dark">My-DTM Paris</strong>.
          Il accompagne les TPE, PME, associations et indépendants sur leur visibilité en ligne et leur
          conformité numérique — de la première position sur Google à la mise en conformité de leur facturation.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Sa conviction : le digital doit servir des résultats concrets (des clients, du temps gagné, de la
          tranquillité réglementaire), pas des vanity metrics. C&apos;est cette approche qu&apos;il partage dans les
          guides et articles de My-DTM.
        </p>

        <h2 className="mt-12 font-sans text-2xl font-extrabold text-dark">Domaines d&apos;expertise</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EXPERTISE.map((e) => (
            <div key={e.t} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="flex items-start gap-2 text-base font-bold text-dark">
                <Check size={18} className="mt-0.5 shrink-0 text-green" /> {e.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.03] p-7">
          <h2 className="font-sans text-lg font-extrabold text-dark">Démarche éditoriale</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Sur les sujets réglementaires (facturation électronique, RGPD, fiscalité), chaque article est
            recoupé avec les <strong className="text-dark">sources officielles</strong> (DGFiP, BOFiP, CNIL,
            textes en vigueur) et daté. Le calendrier de ces réformes évolue : les contenus sont mis à jour et
            signalent toujours de vérifier votre cas précis. Ces articles sont <strong className="text-dark">informatifs</strong> et
            ne remplacent pas un conseil personnalisé — pour votre situation, consultez un professionnel
            (expert-comptable, avocat).
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/guides" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
            Voir les guides <ArrowRight size={15} />
          </Link>
          <Link href="/blog" className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/5">
            Lire les articles <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
