import Link from "next/link";
import { Bot, Zap, Users, Shield, CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    icon: <Shield size={24} />,
    title: "Sans bug",
    desc: "Code propre, teste et deploye sur une infrastructure fiable. Garantie 99% uptime.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Bien organise",
    desc: "Architecture claire, documentation complete. Votre projet reste maintenable et evolutif.",
  },
  {
    icon: <Zap size={24} />,
    title: "Code performant",
    desc: "Technologies modernes, optimisations SEO et temps de chargement ultra-rapides.",
  },
];

export default function WhatsAppShowcase() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Visual card */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-white p-8 shadow-xl shadow-primary/5">
              {/* WhatsApp mockup */}
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#075E54] to-[#128C7E] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">BIZ</div>
                  <div>
                    <p className="text-sm font-bold text-white">Votre Business</p>
                    <p className="text-[10px] text-white/60">en ligne</p>
                  </div>
                </div>
                <div className="space-y-2.5 bg-[#ECE5DD] p-3">
                  <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2">
                    <p className="text-xs text-[#303030]">Bonjour, je voudrais reserver pour ce soir</p>
                    <p className="mt-0.5 text-right text-[9px] text-[#999]">18:32</p>
                  </div>
                  <div className="mr-auto max-w-[80%] rounded-xl rounded-tl-sm bg-white px-3 py-2">
                    <p className="text-xs text-[#303030]">Bonjour ! Pour combien de personnes ?</p>
                    <p className="text-[9px] font-semibold text-primary">Reponse auto</p>
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2">
                    <p className="text-xs text-[#303030]">4 personnes a 20h</p>
                  </div>
                  <div className="mr-auto max-w-[80%] rounded-xl rounded-tl-sm bg-white px-3 py-2">
                    <p className="text-xs text-[#303030]">Reservation confirmee pour 4 ce soir a 20h !</p>
                    <p className="text-[9px] font-semibold text-primary">Reponse auto</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-border bg-white px-5 py-4 shadow-xl">
              <p className="text-xs text-muted">Taux d&apos;ouverture</p>
              <p className="text-2xl font-extrabold text-gradient">98%</p>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              Qualite garantie
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Nous construisons des solutions digitales robustes, performantes et pensees pour durer. Chaque projet est traite avec le plus grand soin.
            </p>

            <div className="mt-8 space-y-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-dark">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
            >
              Demarrer un projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
