"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

const ROTATING_WORDS = ["sites web", "SEO", "marketing", "automatisation"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-dark via-charcoal to-dark px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute -right-[20%] top-[10%] h-[600px] w-[600px] animate-blob bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[500px] w-[500px] animate-blob bg-secondary/10 blur-3xl" style={{ animationDelay: "4s" }} />
      <div className="pointer-events-none absolute left-[40%] top-[20%] h-[300px] w-[300px] animate-blob bg-accent/8 blur-3xl" style={{ animationDelay: "2s" }} />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left — Content */}
          <div>
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green" style={{ animation: "pulse-dot 2s infinite" }} />
              Agence digitale Paris
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              L&apos;agence qui booste votre{" "}
              <span
                className={`text-gradient inline-block transition-all duration-300 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
              My-DTM est l&apos;agence de marketing digital qui cree des ecosystemes
              numeriques complets. Du site web a l&apos;acquisition client, on
              s&apos;occupe de tout.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
              >
                Lancer mon projet
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="rounded-lg border border-white/15 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/30 hover:bg-white/5"
              >
                Voir nos realisations
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["AK", "FD", "MN", "SB"].map((initials, i) => (
                  <div
                    key={initials}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dark bg-gradient-to-br from-primary to-secondary text-[10px] font-bold text-white"
                    style={{ zIndex: 4 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-white/40">
                  Avis clients certifies
                </p>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block">
            <div className="animate-float relative mx-auto w-full max-w-md">
              {/* Main card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* SEO metric */}
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Trafic SEO</span>
                      <span className="text-xs font-bold text-green">+256%</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-white">8,247</p>
                    <div className="mt-3 flex gap-1">
                      {[40, 55, 35, 70, 60, 85, 75, 95, 80, 100, 90, 110].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-primary"
                          style={{ height: `${h * 0.5}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Conversion */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <span className="text-xs text-white/40">Conversion</span>
                      <p className="mt-1 text-xl font-bold text-white">12.8%</p>
                      <span className="text-xs text-green">+3.2%</span>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4">
                      <span className="text-xs text-white/40">Leads/mois</span>
                      <p className="mt-1 text-xl font-bold text-white">342</p>
                      <span className="text-xs text-green">+89</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -top-4 rounded-xl border border-white/10 bg-charcoal/80 px-4 py-3 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green to-green/60 p-1.5">
                    <svg viewBox="0 0 24 24" className="h-full w-full text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Projet deploye</p>
                    <p className="text-[10px] text-white/40">Il y a 2 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
