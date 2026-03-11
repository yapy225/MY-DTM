"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Combien coute un site web ?",
    a: "Nos tarifs commencent a partir de 1 500 EUR pour un site vitrine et montent selon la complexite (e-commerce, plateforme, etc.). Chaque projet est unique : on vous fait un devis personnalise sous 48h apres l'audit gratuit.",
  },
  {
    q: "Combien de temps prend la creation d'un site ?",
    a: "Un site vitrine est generalement livre en 2 a 4 semaines. Les projets plus complexes (marketplace, billetterie, ecosysteme complet) prennent entre 4 et 8 semaines. Vous suivez l'avancement en temps reel.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "Nous travaillons avec Next.js, React, TypeScript et Tailwind CSS pour le front-end. Cote back-end : Prisma, PostgreSQL, Stripe pour les paiements, et Vercel pour l'hebergement. Tout est optimise pour la performance et le SEO.",
  },
  {
    q: "Est-ce que le SEO est inclus ?",
    a: "Oui, chaque site est construit avec le SEO technique integre : Schema.org JSON-LD, meta tags optimises, sitemap automatique, robots.txt, et indexation Google. Nous proposons aussi des forfaits SEO avance en complement.",
  },
  {
    q: "Comment fonctionne le WhatsApp Business ?",
    a: "On configure l'API WhatsApp Business sur votre compte : reponses automatiques 24/7, notifications de commandes, capture de leads Facebook vers WhatsApp. Le tout est operationnel en 48h.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl">
            Questions frequentes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Trouvez les reponses aux questions les plus posees par nos clients.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                openIndex === i
                  ? "border-primary/20 bg-white shadow-lg shadow-primary/5"
                  : "border-border bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="pr-4 font-semibold text-dark">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-muted transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-[15px] leading-relaxed text-muted">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
