"use client";

// Boundary d'erreur global (App Router). Attrape les erreurs runtime des
// segments non couverts par un error.tsx plus proche, pour eviter l'ecran
// d'erreur brut de Next et proposer une porte de sortie a l'internaute.
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Trace cote serveur (Vercel logs). `digest` correle avec le log serveur.
    console.error("Erreur non geree:", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-white p-8 text-center shadow-lg sm:p-12">
        <span className="text-6xl">😕</span>
        <h1 className="mt-6 font-sans text-2xl font-extrabold text-dark sm:text-3xl">
          Une erreur est survenue
        </h1>
        <p className="mt-4 text-muted">
          Désolé, quelque chose s&apos;est mal passé de notre côté. Vous pouvez réessayer, ou nous
          écrire à{" "}
          <a href="mailto:hello@my-dtm.fr" className="font-semibold text-primary">
            hello@my-dtm.fr
          </a>
          .
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-muted">Référence : {error.digest}</p>
        ) : null}

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            ← Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
