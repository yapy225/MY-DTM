const STEPS = [
  { title: "Decouverte", desc: "On analyse vos besoins, votre marche et vos objectifs. Audit gratuit sous 48h." },
  { title: "Strategie", desc: "On definit l'architecture technique, le design et le plan marketing adapte." },
  { title: "Execution", desc: "On construit, on teste, on optimise. Vous suivez l'avancement en temps reel." },
  { title: "Lancement", desc: "Deploiement, indexation Google, activation des campagnes. C'est parti." },
];

export default function Process() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
          Comment on travaille
        </p>
        <h2 className="mt-4 max-w-lg font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
          4 etapes, zero prise de tete.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={i} className="group text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet to-gold font-serif text-3xl font-black text-white shadow-lg shadow-violet/20 transition-transform group-hover:scale-110">
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold text-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
