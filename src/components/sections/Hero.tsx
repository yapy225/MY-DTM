import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-charcoal to-[#3a1063] px-4 pt-36 pb-28 sm:px-6 lg:px-8">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-pink/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
          <Sparkles size={15} className="text-accent-light" />
          Agence digitale à Paris
        </span>

        <h1 className="mt-7 font-sans text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl">
          Votre écosystème digital,{" "}
          <span className="text-gradient">conçu et piloté</span> à Paris.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Développement web, SEO technique, automatisation, WhatsApp Business, tracking et sécurité.
          Tout l&apos;écosystème digital, d&apos;une seule agence.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          >
            Audit gratuit <ArrowRight size={18} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
          >
            Voir les services
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
          <span><strong className="font-bold text-white">+8 000 clics/mois</strong> récupérés pour nos clients</span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span><strong className="font-bold text-white">Audit gratuit</strong> sous 48h</span>
        </div>
      </div>
    </section>
  );
}
