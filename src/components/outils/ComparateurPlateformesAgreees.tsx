"use client";

// Comparateur / recommandeur de Plateforme Agréée. 100 % déterministe, aucun
// backend. Volontairement FRAMEWORK-BASED : il recommande une FAMILLE de solution
// et une checklist de vérification, sans jamais affirmer qu'une marque précise est
// « agréée » (statut invérifiable en live = risque YMYL). Voir aussi le comparatif
// blog. Différenciateur SEO (link magnet) du cluster facturation électronique.

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, RefreshCw, ListChecks } from "lucide-react";
import LeadMagnetForm from "@/components/LeadMagnetForm";

type Profil = "indep" | "tpe-pme" | "erp";
type Clients = "b2b" | "b2c" | "mixte";
type Outil = "compta" | "banque" | "caisse" | "rien";

type Option<T extends string> = { value: T; label: string; hint: string };

type Reco = {
  family: string;
  examples: string;
  why: string;
  ereporting: boolean;
  checklist: string[];
};

const PROFILS: Option<Profil>[] = [
  { value: "indep", label: "Indépendant / micro", hint: "Auto-entrepreneur, très petite structure" },
  { value: "tpe-pme", label: "TPE / PME", hint: "Quelques salariés à 250" },
  { value: "erp", label: "Gestion intégrée / ERP", hint: "Stocks, achats, ventes déjà connectés" },
];

const CLIENTS: Option<Clients>[] = [
  { value: "b2b", label: "Surtout des professionnels", hint: "Facture électronique B2B" },
  { value: "b2c", label: "Surtout des particuliers", hint: "E-reporting" },
  { value: "mixte", label: "Les deux", hint: "Facture électronique + e-reporting" },
];

const OUTILS: Option<Outil>[] = [
  { value: "compta", label: "Un logiciel de compta / facturation", hint: "ex. via votre expert-comptable" },
  { value: "banque", label: "Une néobanque pro", hint: "L'outil qui gère déjà vos paiements" },
  { value: "caisse", label: "Une caisse enregistreuse", hint: "Commerce, restaurant…" },
  { value: "rien", label: "Rien de particulier", hint: "Vous partez de zéro" },
];

function baseChecklist(needsEreporting: boolean): string[] {
  const list = [
    "Est-ce une Plateforme Agréée immatriculée, ou connectée à l'une d'elles ? (recoupez avec la liste officielle)",
    "Couvre-t-elle l'émission ET la réception au format structuré (Factur-X, UBL, CII) ?",
  ];
  if (needsEreporting) {
    list.push("Gère-t-elle l'e-reporting (ventes aux particuliers / international) ?");
  }
  list.push(
    "S'intègre-t-elle à vos outils actuels (banque, compta, caisse, e-commerce) ?",
    "Propose-t-elle l'archivage à valeur probante ?",
    "Le tarif est-il adapté à votre volume réel de factures ?",
  );
  return list;
}

function computeReco(profil: Profil, clients: Clients, outil: Outil): Reco {
  const ereporting = clients !== "b2b";
  const checklist = baseChecklist(ereporting);

  if (outil === "compta") {
    return {
      family: "Votre logiciel de compta / facturation actuel",
      examples: "solutions de type Pennylane, Tiime… ou la plateforme de votre expert-comptable",
      why: "Le plus simple et souvent le moins cher est de rester dans l'outil que vous utilisez déjà, s'il est (ou sera) une Plateforme Agréée. Commencez par lui poser la question.",
      ereporting,
      checklist,
    };
  }
  if (outil === "banque") {
    return {
      family: "Votre néobanque / outil pro — à vérifier",
      examples: "solutions de type Qonto… qui gèrent déjà vos paiements",
      why: "Rester dans l'outil qui encaisse déjà peut être pratique. Vérifiez explicitement s'il sera une Plateforme Agréée ou connecté à l'une d'elles, et s'il couvre bien la réception.",
      ereporting,
      checklist,
    };
  }
  if (outil === "caisse") {
    return {
      family: "Votre éditeur de caisse + une Plateforme Agréée",
      examples: "votre logiciel de caisse pour l'e-reporting, complété par une PA pour les factures pro",
      why: "Avec une caisse, l'e-reporting de vos ventes aux particuliers passe souvent par votre logiciel de caisse. Vérifiez qu'il transmet les données et qu'il s'articule avec une Plateforme Agréée pour vos clients professionnels.",
      ereporting: true,
      checklist: baseChecklist(true),
    };
  }
  // outil === "rien" → on recommande selon le profil
  if (profil === "erp") {
    return {
      family: "Un ERP / une gestion intégrée",
      examples: "solutions de type Odoo, Sage…",
      why: "Si vous avez déjà (ou visez) une gestion intégrée (stocks, achats, ventes), un ERP qui intègre la conformité évite de multiplier les outils.",
      ereporting,
      checklist,
    };
  }
  if (profil === "indep") {
    return {
      family: "Un outil pour indépendants",
      examples: "solutions de type Indy, Abby, Henrri…",
      why: "Pour un indépendant, un outil simple pensé pour les micro-entreprises (souvent avec un palier gratuit ou faible coût) suffit généralement, à condition qu'il soit une Plateforme Agréée ou connecté à l'une d'elles.",
      ereporting,
      checklist,
    };
  }
  // tpe-pme sans outil
  return {
    family: "Une solution compta / facturation tout-en-un",
    examples: "solutions de type Pennylane, Tiime… ou la plateforme de votre expert-comptable",
    why: "Pour une TPE/PME, centraliser facturation et compta dans un même outil (idéalement avec votre expert-comptable) simplifie la mise en conformité et le quotidien.",
    ereporting,
    checklist,
  };
}

// Groupe de choix — déclaré au niveau module (pas dans le render) pour ne pas
// être recréé à chaque rendu.
function OptionGroup<T extends string>(props: {
  legend: string;
  options: Option<T>[];
  value: T | null;
  onChange: (v: T) => void;
  cols: string;
}) {
  return (
    <fieldset>
      <legend className="text-base font-bold text-dark">{props.legend}</legend>
      <div className={`mt-4 grid grid-cols-1 gap-3 ${props.cols}`}>
        {props.options.map((opt) => {
          const active = props.value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => props.onChange(opt.value)}
              className={`rounded-xl border p-4 text-left transition-all ${
                active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
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
  );
}

export default function ComparateurPlateformesAgreees() {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [clients, setClients] = useState<Clients | null>(null);
  const [outil, setOutil] = useState<Outil | null>(null);

  const reco = profil && clients && outil ? computeReco(profil, clients, outil) : null;

  function reset() {
    setProfil(null);
    setClients(null);
    setOutil(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      <div className="space-y-8">
        <OptionGroup legend="1. Quel est votre profil ?" options={PROFILS} value={profil} onChange={setProfil} cols="sm:grid-cols-3" />
        <OptionGroup legend="2. Vos clients sont…" options={CLIENTS} value={clients} onChange={setClients} cols="sm:grid-cols-3" />
        <OptionGroup legend="3. Utilisez-vous déjà un outil ?" options={OUTILS} value={outil} onChange={setOutil} cols="sm:grid-cols-2" />
      </div>

      {reco && (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white sm:p-8">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white/80">Piste recommandée</p>
              <h2 className="font-sans text-xl font-extrabold">{reco.family}</h2>
            </div>
          </div>
          <p className="mt-2 text-sm text-white/90">{reco.examples}</p>
          <p className="mt-4 text-sm text-white/90">{reco.why}</p>

          {reco.ereporting && (
            <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm text-white/90">
              <strong>À ne pas oublier :</strong> comme vous vendez (aussi) à des particuliers, veillez à ce que
              votre solution couvre l&apos;e-reporting, pas seulement la facture électronique B2B.
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <ListChecks className="h-4 w-4" /> Votre checklist de vérification
            </div>
            <ul className="mt-3 space-y-2">
              {reco.checklist.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-white/90">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-white/10 p-5">
            <p className="text-sm font-bold">📩 Recevez le Kit conformité + cette checklist par email</p>
            <p className="mt-1 text-xs text-white/80">
              Le guide complet (choix de plateforme, mentions, plan 30 jours) — gratuit, tout de suite.
            </p>
            <div className="mt-3">
              <LeadMagnetForm productId="ebook-facturation-electronique" source="comparateur" onDark cta="Recevoir le Kit" />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog/comparatif-plateformes-facturation-electronique"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Voir le comparatif détaillé des solutions
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" /> Recommencer
            </button>
          </div>
          <p className="mt-3 text-xs text-white/80">
            Vous hésitez encore ? En 90 min, un expert choisit votre plateforme avec vous et vous remet un
            plan de mise en conformité —{" "}
            <Link href="/guides/facturation-electronique-obligatoire" className="font-semibold underline">
              voir l&apos;accompagnement
            </Link>
            .
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Recommandation indicative et volontairement générique : ce comparateur oriente vers une famille de
        solution et les points à vérifier, sans certifier le statut d&apos;agrément d&apos;un éditeur précis.
        Vérifiez toujours qu&apos;une solution figure dans la liste officielle des Plateformes Agréées, et
        validez votre choix avec votre expert-comptable.
      </p>
    </div>
  );
}
