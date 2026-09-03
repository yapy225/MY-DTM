"use client";

import { useEffect, useRef } from "react";

// Récupère un jeton de formulaire au montage (et à la demande) et le met en
// cache pour la soumission. Retourne `ensure()` : renvoie le jeton (le fetch au
// besoin). Le jeton est émis par /api/form-token ; l'horodatage qu'il porte sert
// à mesurer le temps de remplissage côté serveur (anti-bot).
export function useFormToken() {
  const tokenRef = useRef<string>("");

  async function ensure(): Promise<string> {
    if (tokenRef.current) return tokenRef.current;
    try {
      const r = await fetch("/api/form-token", { cache: "no-store" });
      const d = await r.json();
      if (d?.token) tokenRef.current = d.token;
    } catch {
      /* réseau indisponible : on soumettra sans jeton (rejeté proprement) */
    }
    return tokenRef.current;
  }

  useEffect(() => {
    void ensure();
  }, []);

  return ensure;
}
