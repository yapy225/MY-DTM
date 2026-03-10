import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-24 text-center sm:px-6 lg:px-8">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.15)_0%,transparent_70%)]" />

      <h2 className="relative font-serif text-4xl font-black text-white sm:text-5xl">
        Pret a{" "}
        <span className="text-gradient">lancer votre projet</span> ?
      </h2>
      <p className="relative mt-4 text-lg text-white/60">
        Premier appel gratuit. On vous repond sous 48h.
      </p>

      <div className="relative mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="rounded-full bg-gradient-to-r from-violet to-gold px-9 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30"
        >
          Audit gratuit
        </Link>
        <Link
          href="tel:+33743537551"
          className="rounded-full border border-white/20 px-9 py-4 text-base font-semibold text-white transition-all hover:border-violet-light hover:text-violet-light"
        >
          Nous appeler
        </Link>
      </div>
    </section>
  );
}
