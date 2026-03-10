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
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
          Temoignages
        </p>
        <h2 className="mt-4 max-w-lg font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
          Ce que disent nos clients.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.initials}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <div className="text-gold text-base tracking-widest">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <p className="mt-4 text-[15px] italic leading-relaxed text-muted">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet to-gold text-sm font-bold text-white">
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
      </div>
    </section>
  );
}
