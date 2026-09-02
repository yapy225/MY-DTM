"use client";

// Capture d'email contre l'ebook gratuit (aimant à leads). POST /api/lead-magnet
// → email envoyé avec le lien de téléchargement + lead enregistré (Resend).
// `onDark` : styles adaptés à un fond dégradé (cartes de résultat des outils).

import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";

type Props = {
  productId: string;
  source: string;
  cta?: string;
  placeholder?: string;
  onDark?: boolean;
};

export default function LeadMagnetForm({ productId, source, cta = "Recevoir le Kit gratuit", placeholder = "Votre email professionnel", onDark = false }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId, source, company }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("done");
        // Mesure de conversion (si GA chargé).
        (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "generate_lead", {
          method: "kit-facturation",
          source,
        });
      } else {
        setError(data.error || "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={`flex items-start gap-2.5 rounded-xl p-4 text-sm ${onDark ? "bg-white/15 text-white" : "bg-green/10 text-dark"}`}>
        <MailCheck className={`mt-0.5 h-5 w-5 shrink-0 ${onDark ? "text-white" : "text-green"}`} />
        <span>
          <strong>C&apos;est envoyé !</strong> Vérifiez votre boîte mail (et les spams) : votre Kit conformité arrive.
        </span>
      </div>
    );
  }

  const inputCls = onDark
    ? "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
    : "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none";
  const btnCls = onDark
    ? "inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
    : "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={inputCls}
          aria-label="Votre email"
        />
        {/* honeypot anti-bot (invisible) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <button type="submit" disabled={status === "loading"} className={`${btnCls} shrink-0`}>
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {status === "loading" ? "Envoi…" : cta}
        </button>
      </div>
      {error ? <p className={`mt-2 text-xs ${onDark ? "text-white/90" : "text-red-600"}`}>{error}</p> : null}
      <p className={`mt-2 text-xs ${onDark ? "text-white/70" : "text-muted"}`}>
        Gratuit. Pas de spam — vous pourrez vous désabonner en un clic.
      </p>
    </form>
  );
}
