const STEPS = [
  {
    num: "01",
    title: "Decouverte",
    desc: "On analyse vos besoins, votre marche et vos objectifs. Audit gratuit sous 48h.",
  },
  {
    num: "02",
    title: "Strategie",
    desc: "On definit l'architecture technique, le design et le plan marketing adapte.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "On construit, on teste, on optimise. Vous suivez l'avancement en temps reel.",
  },
  {
    num: "04",
    title: "Lancement",
    desc: "Deploiement, indexation Google, activation des campagnes. C'est parti.",
  },
  {
    num: "05",
    title: "Suivi",
    desc: "Rapports mensuels, optimisations continues et support reactif inclus.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-charcoal to-dark px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-light">
            Notre methode
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Comment on travaille ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
            Un processus simple et transparent en 5 etapes pour transformer votre vision en realite digitale.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white/[0.06]"
            >
              {/* Step number */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-extrabold text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                {step.num}
              </div>

              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-[42px] hidden h-px w-6 translate-x-full bg-gradient-to-r from-primary/40 to-transparent lg:block" />
              )}

              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
