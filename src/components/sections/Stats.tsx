"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, Users, Download, Star } from "lucide-react";

const STATS = [
  { icon: <Layers size={24} />, target: 50, suffix: "+", label: "Projets livres", color: "text-primary" },
  { icon: <Users size={24} />, target: 120, suffix: "+", label: "Clients actifs", color: "text-secondary" },
  { icon: <Download size={24} />, target: 8000, suffix: "+", label: "Clics SEO / mois", color: "text-accent" },
  { icon: <Star size={24} />, target: 99, suffix: "%", label: "Uptime garanti", color: "text-green" },
];

function useCountUp(target: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target, start]);
  return count;
}

function StatCard({ icon, target, suffix, label, color }: {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(target, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const formatted = target >= 1000
    ? `${Math.floor(count / 1000).toLocaleString("fr-FR")}${count >= 1000 ? "," + String(count % 1000).padStart(3, "0").slice(0, -2) : ""}`.replace(",0", ",")
    : count.toString();

  return (
    <div ref={ref} className="text-center">
      <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface ${color}`}>
        {icon}
      </div>
      <div className="text-4xl font-extrabold text-dark sm:text-5xl">
        {target >= 1000 ? count.toLocaleString("fr-FR") : count}
        <span className="text-gradient">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Nos chiffres
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-dark sm:text-4xl">
            Des resultats concrets pour nos clients
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Nous aidons les entreprises a developper leur presence digitale avec des resultats mesurables et verifiables.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
