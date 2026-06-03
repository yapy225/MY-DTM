"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function BuyButton({
  productId,
  label,
  variant = "primary",
}: {
  productId: string;
  label: string;
  variant?: "primary" | "outline";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
      setLoading(false);
    }
  }

  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
      : "border border-primary text-primary hover:bg-primary/5";

  return (
    <div className="w-full">
      <button onClick={handleClick} disabled={loading} className={`${base} ${styles}`}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Redirection…" : label}
      </button>
      {error ? <p className="mt-2 text-center text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
