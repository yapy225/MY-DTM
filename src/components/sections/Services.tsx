import Link from "next/link";
import { Globe, Search, Zap, MessageCircle, Megaphone, BarChart3, ShieldCheck, Server, LayoutDashboard, ArrowRight } from "lucide-react";

const SERVICES = [
  { icon: Globe, title: "Création Web", desc: "Sites & plateformes sur mesure en Next.js, React et Tailwind. Responsive et ultra-rapides.", href: "/services/creation-site-web" },
  { icon: Search, title: "SEO Technique", desc: "JSON-LD, Core Web Vitals, redirections, indexation. Plus de visibilité sur Google.", href: "/services/seo" },
  { icon: Zap, title: "Automatisation & API", desc: "Workflows, intégrations Stripe, webhooks et emails transactionnels. Gagnez du temps.", href: "/services/automatisation" },
  { icon: MessageCircle, title: "WhatsApp Business", desc: "Intégration de l'API : templates, webhooks, réponses automatiques, relation client.", href: "/services/whatsapp-business" },
  { icon: Megaphone, title: "Marketing Digital", desc: "Acquisition 360° : Facebook & Instagram Ads, réseaux sociaux, newsletters.", href: "/services/marketing-digital" },
  { icon: BarChart3, title: "Tracking & Conformité", desc: "Meta Pixel + Conversions API, déduplication, Advanced Matching, consentement RGPD.", href: "/services/tracking-conformite" },
  { icon: ShieldCheck, title: "Sécurité Web", desc: "Hardening complet : CSP, rotation des secrets, validation des uploads, routes protégées.", href: "/services/securite-web" },
  { icon: Server, title: "Infra & Cloud", desc: "Orchestration de crons, Cloudflare Workers, optimisation des coûts. Une infra autonome.", href: "/services/automatisation" },
  { icon: LayoutDashboard, title: "Dashboards Analytics", desc: "Tableaux de bord sur mesure, métriques temps réel, reporting fiable (Europe/Paris).", href: "/services" },
];

export default function Services() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      {/* Shared gradient for icon strokes */}
      <svg width={0} height={0} className="absolute">
        <defs>
          <linearGradient id="svc-grad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="30%" stopColor="#ff00d7" />
            <stop offset="67%" stopColor="#50c7f5" />
            <stop offset="99%" stopColor="#72aaff" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Nos services</p>
          <h2 className="mt-4 font-sans text-3xl font-extrabold text-dark sm:text-4xl">
            Création web, SEO, marketing, <span className="font-normal">tracking &amp; sécurité.</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Neuf expertises complémentaires pour faire grandir votre activité en ligne.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.06]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface transition-transform group-hover:scale-110">
                  <Icon size={30} strokeWidth={1.6} stroke="url(#svc-grad)" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-dark group-hover:text-primary">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
