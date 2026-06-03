const STATS = [
  { value: "+8 000", label: "Clics SEO/mois récupérés" },
  { value: "239", label: "Redirections 301 gérées" },
  { value: "48h", label: "Délai d'audit" },
  { value: "99%", label: "Uptime (Vercel)" },
];

export default function Stats() {
  return (
    <section className="bg-dark px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-sans text-4xl font-extrabold text-gradient sm:text-5xl">{s.value}</div>
            <p className="mt-2 text-sm font-medium text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
