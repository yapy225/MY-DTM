import Link from "next/link";

const SERVICES = [
  {
    icon: "\u{1F680}",
    title: "Developpement Web Full-Stack",
    desc: "Sites vitrines, e-commerce, plateformes evenementielles et ecosystemes complets. Performance, design et SEO integres des le depart.",
    tags: ["Next.js", "React", "Stripe", "Vercel"],
    id: "dev",
  },
  {
    icon: "\u{1F4A1}",
    title: "SEO Technique Avance",
    desc: "Audit complet, redirections 301, Schema.org JSON-LD, indexation forcee Google. On recupere le trafic que vous perdez.",
    tags: ["Search Console", "Indexing API", "Schema.org"],
    id: "seo",
  },
  {
    icon: "\u2699\uFE0F",
    title: "Integration API & Automatisation",
    desc: "WhatsApp Business, Facebook Leads, Stripe, emails automatiques. On connecte vos outils pour que tout tourne sans vous.",
    tags: ["WhatsApp API", "Facebook Leads", "Stripe", "Resend"],
    id: "auto",
  },
  {
    icon: "\u{1F4E3}",
    title: "Marketing Multi-Canal",
    desc: "Acquisition 360 : SEO + WhatsApp + Ads + Email. Un seul tableau de bord pour tous vos canaux. Resultats mesurables.",
    tags: ["SEO", "Ads", "Newsletter", "Social Media"],
    id: "marketing",
  },
];

export default function Services() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
          Nos expertises
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
          Tout ce qu&apos;il faut pour dominer le digital.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-violet/25 hover:shadow-xl hover:shadow-violet/[0.06]"
            >
              {/* Top bar on hover */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-violet to-gold opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/10 to-gold/[0.06] text-[42px] transition-transform group-hover:scale-110 group-hover:-rotate-[5deg]">
                {s.icon}
              </div>

              <h3 className="mt-6 font-serif text-xl font-bold text-dark sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{s.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-violet/10 bg-violet/[0.05] px-3 py-1 text-xs font-semibold text-violet"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex rounded-full border border-border px-8 py-3 text-sm font-semibold text-dark transition-all hover:border-violet hover:text-violet"
          >
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
