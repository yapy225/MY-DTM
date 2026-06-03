const RESULTS = [
  {
    project: "Dream Team Africa",
    type: "Écosystème événementiel",
    text: "+8 000 clics/mois récupérés via le SEO technique : 239 redirections 301, indexation forcée (Indexing API) et données structurées Schema.org.",
    initials: "DTA",
  },
  {
    project: "Saison Culturelle",
    type: "Billetterie événementielle",
    text: "Billetterie en ligne sur mesure : billets QR code, paiement Stripe, réservation exposants et contrôle d'accès. Sans commission par billet.",
    initials: "SC",
  },
  {
    project: "L'Afropéen",
    type: "Média & annuaire",
    text: "Tracking Meta (Pixel + Conversions API) conforme RGPD, automatisation WhatsApp et annuaire optimisé SEO pour l'acquisition et la relation client.",
    initials: "LA",
  },
];

export default function Results() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Résultats clients</p>
          <h2 className="mt-4 font-sans text-3xl font-extrabold text-dark sm:text-4xl">
            Des résultats concrets, <span className="font-normal">pas des promesses.</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Quelques réalisations de notre écosystème digital et leurs résultats mesurables.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {RESULTS.map((r) => (
            <div key={r.project} className="flex flex-col rounded-2xl border border-border bg-white p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-base font-bold text-white">
                  {r.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark">{r.project}</h3>
                  <p className="text-sm text-secondary">{r.type}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
