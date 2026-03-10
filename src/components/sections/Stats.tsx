const STATS = [
  { number: "50+", label: "Projets livres" },
  { number: "8K+", label: "Clics/mois recuperes (SEO)" },
  { number: "99%", label: "Uptime garanti" },
  { number: "48h", label: "Temps de reponse" },
];

export default function Stats() {
  return (
    <section className="border-b border-border bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 text-center lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-serif text-5xl font-black text-gradient-violet sm:text-6xl">
              {s.number}
            </div>
            <p className="mt-3 text-sm font-medium text-muted sm:text-base">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
