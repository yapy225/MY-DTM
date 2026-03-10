import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-white to-surface px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -right-[15%] -top-[30%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet/15 bg-violet/[0.06] px-5 py-2 text-sm font-semibold text-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-green" style={{ animation: "pulse-dot 2s infinite" }} />
          Agence digitale Paris
        </div>

        <h1 className="max-w-[900px] font-serif text-5xl font-black leading-[1.05] text-dark sm:text-6xl lg:text-7xl">
          On construit votre
          <br />
          <span className="text-gradient">empire digital.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Agence de marketing digital specialisee dans la creation
          d&apos;ecosystemes numeriques complets. Du site web a l&apos;acquisition
          client, on s&apos;occupe de tout.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-violet to-gold px-9 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30"
          >
            Lancer mon projet
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-border px-9 py-4 text-base font-semibold text-dark transition-all hover:border-violet hover:text-violet"
          >
            Voir nos realisations
          </Link>
        </div>
      </div>
    </section>
  );
}
