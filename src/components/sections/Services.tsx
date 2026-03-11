import Link from "next/link";
import { Globe, Search, Cog, Megaphone } from "lucide-react";

const SERVICES = [
  {
    icon: <Globe size={28} />,
    title: "Developpement Web",
    desc: "Sites vitrines, e-commerce, plateformes evenementielles et ecosystemes complets. Performance, design et SEO integres.",
    tags: ["Next.js", "React", "Stripe", "Vercel"],
    id: "dev",
    color: "from-primary to-primary/60",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: <Search size={28} />,
    title: "SEO Technique",
    desc: "Audit complet, redirections 301, Schema.org JSON-LD, indexation forcee Google. On recupere le trafic que vous perdez.",
    tags: ["Search Console", "Indexing API", "Schema.org"],
    id: "seo",
    color: "from-secondary to-secondary/60",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    icon: <Cog size={28} />,
    title: "Automatisation API",
    desc: "WhatsApp Business, Facebook Leads, Stripe, emails automatiques. On connecte vos outils pour que tout tourne sans vous.",
    tags: ["WhatsApp API", "Facebook Leads", "Stripe", "Resend"],
    id: "auto",
    color: "from-accent to-accent/60",
    iconBg: "bg-accent/10 text-accent",
  },
  {
    icon: <Megaphone size={28} />,
    title: "Marketing Multi-Canal",
    desc: "Acquisition 360 : SEO + WhatsApp + Ads + Email. Un seul tableau de bord pour tous vos canaux. Resultats mesurables.",
    tags: ["SEO", "Ads", "Newsletter", "Social Media"],
    id: "marketing",
    color: "from-green to-green/60",
    iconBg: "bg-green/10 text-green",
  },
];

export default function Services() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Nos services
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl lg:text-5xl">
            Pourquoi choisir My-DTM ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Nous creons des ecosystemes numeriques complets qui generent du trafic, convertissent des leads et automatisent votre business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/[0.06]"
            >
              {/* Gradient bar on hover */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color} opacity-0 transition-opacity group-hover:opacity-100`} />

              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${s.iconBg} transition-transform group-hover:scale-110`}>
                {s.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-dark">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{s.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
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
            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary"
          >
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
