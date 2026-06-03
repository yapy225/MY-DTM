import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-dark via-charcoal to-[#3a1063] px-6 py-20 text-center">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-sans text-3xl font-extrabold text-white sm:text-4xl">
            Un projet digital en tête ?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Audit gratuit sous 48h. On analyse vos besoins et on vous propose un plan d&apos;action clair.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
          >
            Demander mon audit gratuit <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
