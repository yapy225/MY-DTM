import Link from "next/link";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    icon: "🌍",
    title: "Dream Team Africa",
    desc: "Ecosysteme digital complet : journal, marketplace, billetterie, annuaire professionnel. +8000 clics/mois recuperes.",
    badge: "Ecosysteme complet",
    gradient: "from-primary/20 to-secondary/10",
    slug: "dream-team-africa",
  },
  {
    icon: "🎭",
    title: "Saison Culturelle Africaine",
    desc: "Plateforme evenementielle avec billetterie Stripe, reservation exposants et FAQ SEO structurees.",
    badge: "SEO + Billetterie",
    gradient: "from-accent/20 to-primary/10",
    slug: "saison-culturelle-africaine",
  },
  {
    icon: "📰",
    title: "L'Afropeen",
    desc: "Journal en ligne avec CMS custom, 9 rubriques, systeme de zones editoriales et articles SEO automatises.",
    badge: "Journal & SEO",
    gradient: "from-secondary/20 to-accent/10",
    slug: "lafropeen",
  },
];

export default function Portfolio() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8" id="portfolio">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Portfolio
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl lg:text-5xl">
            Nos realisations parlent d&apos;elles-memes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Decouvrez les projets que nous avons construits pour nos clients. Chaque projet est un ecosysteme unique.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio#${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/[0.08]"
            >
              <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${p.gradient} text-7xl transition-transform duration-500 group-hover:scale-105`}>
                {p.icon}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-dark">{p.title}</h3>
                  <ExternalLink size={16} className="mt-1 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  {p.badge}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
