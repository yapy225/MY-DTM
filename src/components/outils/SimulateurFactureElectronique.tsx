"use client";

// Simulateur « Suis-je concerné + quelle est ma date ? » pour la facturation
// électronique obligatoire. 100 % déterministe, aucun backend : la logique vit
// dans computeResult(). Différenciateur SEO (link magnet) du cluster.
// YMYL : résultat indicatif, renvoie vers la vérification DGFiP / expert-comptable.

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CalendarClock, ArrowRight, RefreshCw } from "lucide-react";

type Assujetti = "oui" | "non";
type Taille = "ge-eti" | "pme" | "tpe-micro";

type Result = {
  concerne: boolean;
  reception: string | null;
  emission: string | null;
  title: string;
  points: string[];
};

const DATE_2026 = "1er septembre 2026";
const DATE_2027 = "1er septembre 2027";

function computeResult(assujetti: Assujetti, taille: Taille): Result {
  if (assujetti === "non") {
    return {
      concerne: false,
      reception: null,
      emission: null,
      title: "Vous n'êtes a priori pas dans le périmètre de l'émission",
      points: [
        "La réforme vise les assujettis à la TVA établis en France pour leurs opérations entre professionnels (B2B).",
        "Si vous recevez des factures de fournisseurs assujettis, vous devrez tout de même pouvoir les recevoir au format électronique.",
        "Cas fréquent de confusion : la franchise en base de TVA ne fait PAS sortir du dispositif — dans ce cas, répondez « Oui » à la première question.",
        "En cas de doute, faites confirmer votre situation TVA par votre expert-comptable.",
      ],
    };
  }

  const emission = taille === "ge-eti" ? DATE_2026 : DATE_2027;
  return {
    concerne: true,
    reception: DATE_2026,
    emission,
    title: "Vous êtes concerné par la facturation électronique",
    points: [
      `Réception obligatoire dès le ${DATE_2026} : vous devez pouvoir recevoir une facture électronique.`,
      `Émission obligatoire à partir du ${emission}.`,
      "Vos factures devront être au format structuré (Factur-X, UBL ou CII) et transiter par une Plateforme Agréée.",
      "Si vous vendez aussi aux particuliers ou à l'international, l'e-reporting s'ajoute à la facture électronique B2B.",
    ],
  };
}

const TAILLES: { value: Taille; label: string; hint: string }[] = [
  { value: "ge-eti", label: "Grande entreprise ou ETI", hint: "≥ 250 salariés, ou CA / bilan élevés" },
  { value: "pme", label: "PME", hint: "Jusqu'à 250 salariés" },
  { value: "tpe-micro", label: "TPE, micro-entreprise ou indépendant", hint: "Auto-entrepreneur, très petite structure" },
];

export default function SimulateurFactureElectronique() {
  const [assujetti, setAssujetti] = useState<Assujetti | null>(null);
  const [taille, setTaille] = useState<Taille | null>(null);

  const showTaille = assujetti === "oui";
  const canCompute = assujetti === "non" || (assujetti === "oui" && taille !== null);
  const result: Result | null = canCompute
    ? computeResult(assujetti as Assujetti, (taille ?? "tpe-micro") as Taille)
    : null;

  function reset() {
    setAssujetti(null);
    setTaille(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      {/* Question 1 */}
      <fieldset>
        <legend className="text-base font-bold text-dark">
          1. Êtes-vous assujetti à la TVA et établi en France ?
        </legend>
        <p className="mt-1 text-sm text-muted">
          La franchise en base de TVA compte comme « Oui » : un auto-entrepreneur non redevable
          reste un assujetti.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { value: "oui" as Assujetti, label: "Oui (y compris franchise de TVA)" },
              { value: "non" as Assujetti, label: "Non / particulier" },
            ]
          ).map((opt) => {
            const active = assujetti === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setAssujetti(opt.value);
                  if (opt.value === "non") setTaille(null);
                }}
                className={`rounded-xl border p-4 text-left text-sm font-semibold transition-all ${
                  active
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-dark hover:border-primary/50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Question 2 */}
      {showTaille && (
        <fieldset className="mt-8">
          <legend className="text-base font-bold text-dark">
            2. Quelle est la taille de votre structure ?
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {TAILLES.map((opt) => {
              const active = taille === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTaille(opt.value)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className={`block text-sm font-semibold ${active ? "text-primary" : "text-dark"}`}>
                    {opt.label}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{opt.hint}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Résultat */}
      {result && (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white sm:p-8">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />
            <h2 className="font-sans text-xl font-extrabold">{result.title}</h2>
          </div>

          {result.concerne && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <CalendarClock className="h-4 w-4" /> Réception
                </div>
                <div className="mt-1 text-lg font-extrabold">{result.reception}</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <CalendarClock className="h-4 w-4" /> Émission
                </div>
                <div className="mt-1 text-lg font-extrabold">{result.emission}</div>
              </div>
            </div>
          )}

          <ul className="mt-6 space-y-2">
            {result.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-white/90">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/guides/facturation-electronique-obligatoire"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Voir le guide et me mettre en conformité
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" /> Recommencer
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Résultat indicatif, fondé sur le calendrier en vigueur (réception 2026, émission 2026 pour les
        grandes entreprises/ETI et 2027 pour les autres). Le dispositif peut évoluer : vérifiez votre
        cas auprès de la DGFiP ou de votre expert-comptable.
      </p>
    </div>
  );
}
