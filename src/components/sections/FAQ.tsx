"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Combien coûte un site web ?",
    a: "Nos tarifs commencent à partir de 1 500 € pour un site vitrine et montent selon la complexité (e-commerce, plateforme, billetterie). Chaque projet est unique : on vous fait un devis personnalisé sous 48h après l'audit gratuit.",
  },
  {
    q: "Combien de temps prend la création d'un site ?",
    a: "Un site vitrine est généralement livré en 2 à 4 semaines. Les projets plus complexes (marketplace, billetterie, écosystème complet) prennent entre 4 et 8 semaines.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "Next.js, React, TypeScript et Tailwind CSS pour le front-end. Côté back-end : Prisma, PostgreSQL, Stripe pour les paiements, et Vercel pour l'hébergement.",
  },
  {
    q: "Est-ce que le SEO est inclus ?",
    a: "Oui, chaque site est construit avec le SEO technique intégré : Schema.org JSON-LD, meta tags optimisés, sitemap automatique, robots.txt et indexation Google.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">FAQ</p>
          <h2 className="mt-4 font-sans text-3xl font-extrabold text-dark sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className={`rounded-2xl border transition-all ${isOpen ? "border-primary/20 bg-surface/40 shadow-sm" : "border-border bg-white"}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-dark">{faq.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
