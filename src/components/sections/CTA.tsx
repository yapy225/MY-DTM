import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-dark via-charcoal to-dark p-12 text-center sm:p-16">
          {/* Background effects */}
          <div className="pointer-events-none absolute -right-[20%] -top-[30%] h-[400px] w-[400px] rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-[20%] -left-[20%] h-[400px] w-[400px] rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Pret a{" "}
              <span className="text-gradient">lancer votre projet</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/50">
              Premier appel gratuit. On analyse votre projet et on vous repond sous 48h avec un plan d&apos;action concret.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-9 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
              >
                Audit gratuit
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="tel:+33743537551"
                className="rounded-lg border border-white/15 px-9 py-4 text-base font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
              >
                Nous appeler
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                100% securise
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Reponse sous 48h
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Sans engagement
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
