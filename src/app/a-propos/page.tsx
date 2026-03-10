import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez My-DTM, agence de marketing digital a Paris specialisee dans les ecosystemes numeriques.",
};

const VALUES = [
  { icon: "\u{1F3AF}", title: "Resultats concrets", desc: "On ne vend pas du vent. Chaque action est mesurable : trafic, leads, conversions." },
  { icon: "\u26A1", title: "Rapidite d'execution", desc: "48h pour un audit. 2 semaines pour un site vitrine. On avance vite, bien." },
  { icon: "\u{1F91D}", title: "Transparence totale", desc: "Pas de jargon, pas de surprises. Vous savez exactement ce qu'on fait et pourquoi." },
  { icon: "\u{1F680}", title: "Technologie de pointe", desc: "Next.js, React, API modernes. On utilise les memes outils que les startups de la Silicon Valley." },
];

export default function AProposPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
            A propos
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            On ne fait pas que du marketing.
            <br />
            <span className="text-gradient">On construit des empires.</span>
          </h1>
        </div>
      </section>

      <div className="accent-strip" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Story */}
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-black text-dark">Notre histoire</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              My-DTM est nee d&apos;un constat simple : les entreprises de la diaspora africaine
              en France meritent les memes outils digitaux que les grandes marques. Pas des
              sites WordPress basiques, mais de vrais ecosystemes performants.
            </p>
            <p>
              On a commence par construire Dream Team Africa — une plateforme complete avec
              journal, marketplace, billetterie et annuaire. Le resultat : +8 000 clics/mois
              recuperes, des centaines d&apos;articles indexes, une communaute active.
            </p>
            <p>
              Aujourd&apos;hui, on met cette expertise au service d&apos;entrepreneurs,
              d&apos;associations et d&apos;organisations qui veulent dominer le digital.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-center font-serif text-3xl font-black text-dark">Nos valeurs</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/[0.05]"
              >
                <span className="text-5xl">{v.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-dark">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA inline */}
        <div className="mt-24 text-center">
          <h2 className="font-serif text-3xl font-black text-dark">Envie de travailler ensemble ?</h2>
          <p className="mt-3 text-muted">Premier audit gratuit, sans engagement.</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet to-gold px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      <CTA />
    </>
  );
}
