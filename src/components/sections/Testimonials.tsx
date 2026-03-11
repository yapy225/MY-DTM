"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Ils ont transforme notre simple site en une vraie machine a leads. Le WhatsApp automatique a change notre facon de gerer les clients.",
    name: "Amadou K.",
    role: "Restaurant Le Mafe d'Or",
    initials: "AK",
  },
  {
    text: "Notre trafic a triple en 3 mois grace au SEO. Les redirections et l'indexation Google ont recupere tout ce qu'on perdait.",
    name: "Fatou D.",
    role: "Boutique Wax & Style",
    initials: "FD",
  },
  {
    text: "La billetterie en ligne + les emails automatiques ont simplifie toute notre gestion evenementielle. Pro du debut a la fin.",
    name: "Moussa N.",
    role: "Festival Afro Vibes",
    initials: "MN",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Temoignages
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl lg:text-5xl">
            Ce que disent nos clients
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Nous construisons des relations de confiance avec chacun de nos clients. Voici leurs retours.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.initials}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                i === active
                  ? "border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-white hover:border-primary/10"
              }`}
              onClick={() => setActive(i)}
            >
              {/* Quote icon */}
              <Quote size={32} className="mb-4 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-dark">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/30"
              }`}
              aria-label={`Temoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
