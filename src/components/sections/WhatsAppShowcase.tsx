import Link from "next/link";
import { Bot, Zap, Users, CheckCircle2 } from "lucide-react";

export default function WhatsAppShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Left — Content */}
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <svg viewBox="0 0 32 32" className="h-9 w-9 fill-white">
                <path d="M16.004 2.667c-7.364 0-13.337 5.973-13.337 13.333 0 2.347.613 4.64 1.78 6.66L2.667 29.333l6.84-1.793a13.28 13.28 0 006.497 1.693c7.36 0 13.33-5.973 13.33-13.333S23.364 2.667 16.004 2.667zm0 24.4a11.04 11.04 0 01-5.63-1.54l-.4-.24-4.16 1.093 1.11-4.067-.26-.42a11.02 11.02 0 01-1.69-5.893c0-6.1 4.964-11.067 11.067-11.067 6.1 0 11.063 4.967 11.063 11.067S22.107 27.067 16.004 27.067zm6.067-8.287c-.333-.167-1.967-.97-2.273-1.08-.307-.113-.53-.167-.753.167s-.867 1.08-1.063 1.3c-.193.22-.393.247-.727.083-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.393.5-.587.167-.193.22-.333.333-.553.113-.22.057-.413-.03-.58-.083-.167-.753-1.813-1.033-2.487-.273-.647-.55-.56-.753-.57l-.643-.01c-.22 0-.58.083-.883.413-.307.333-1.167 1.14-1.167 2.777s1.193 3.22 1.36 3.443c.167.22 2.347 3.583 5.69 5.027.793.343 1.413.547 1.897.7.797.253 1.523.217 2.097.133.64-.097 1.967-.803 2.247-1.58.273-.777.273-1.443.193-1.58-.083-.14-.307-.22-.64-.387z" />
              </svg>
            </div>

            <h2 className="font-serif text-3xl font-black text-white sm:text-4xl">
              WhatsApp Business pour votre entreprise
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
              98% de taux d&apos;ouverture. 10x plus efficace que l&apos;email. On configure tout en 48h.
            </p>

            {/* 3 features */}
            <div className="mt-8 space-y-4">
              {[
                { icon: <Bot size={20} />, text: "Reponses automatiques 24h/24" },
                { icon: <Zap size={20} />, text: "Notifications commandes & RDV en temps reel" },
                { icon: <Users size={20} />, text: "Capture de leads Facebook \u2192 WhatsApp instantanee" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm font-medium text-white/90">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    {f.icon}
                  </div>
                  {f.text}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#075E54] transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Configurer mon WhatsApp — a partir de 800&nbsp;&euro;
              </Link>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="mx-auto w-full max-w-xs">
            <div className="overflow-hidden rounded-3xl border-4 border-white/20 bg-white shadow-2xl">
              <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
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
                  <p className="text-[9px] font-semibold text-violet">Reponse auto</p>
                </div>
                <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2">
                  <p className="text-xs text-[#303030]">4 personnes a 20h</p>
                </div>
                <div className="mr-auto max-w-[80%] rounded-xl rounded-tl-sm bg-white px-3 py-2">
                  <p className="text-xs text-[#303030]">Reservation confirmee pour 4 ce soir a 20h. A bientot !</p>
                  <p className="text-[9px] font-semibold text-violet">Reponse auto</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
