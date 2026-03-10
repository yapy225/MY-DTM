import Link from "next/link";

const PROJECTS = [
  {
    icon: "\u{1F30D}",
    title: "Dream Team Africa",
    desc: "Ecosysteme digital complet : journal, marketplace, billetterie, annuaire professionnel. +8000 clics/mois recuperes.",
    badge: "Ecosysteme complet",
    badgeClass: "bg-violet/10 text-violet",
    slug: "dream-team-africa",
  },
  {
    icon: "\u{1F3AD}",
    title: "Saison Culturelle Africaine",
    desc: "Plateforme evenementielle avec billetterie Stripe, reservation exposants et FAQ SEO structurees.",
    badge: "SEO + Billetterie",
    badgeClass: "bg-green/10 text-green",
    slug: "saison-culturelle-africaine",
  },
  {
    icon: "\u{1F4F0}",
    title: "L'Afropeen",
    desc: "Journal en ligne avec CMS custom, 9 rubriques, systeme de zones editoriales et articles SEO automatises.",
    badge: "Journal & SEO",
    badgeClass: "bg-gold/15 text-gold-dark",
    slug: "lafropeen",
  },
];

export default function Portfolio() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8" id="portfolio">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
          Portfolio
        </p>
        <h2 className="mt-4 max-w-lg font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
          Projets qui parlent d&apos;eux-memes.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio#${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet/[0.08]"
            >
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-violet/10 to-gold/[0.06] text-7xl transition-transform duration-500 group-hover:scale-105">
                {p.icon}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-dark">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <span className={`mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${p.badgeClass}`}>
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
