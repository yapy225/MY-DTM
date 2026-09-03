"use client";

import { useEffect, useState } from "react";

// ID de mesure GA4 (public). Surchargable via NEXT_PUBLIC_GA_ID (Vercel) ;
// à défaut, l'ID de la propriété « My DTM » sert de valeur par défaut.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-119H3GR7KD";
const STORAGE_KEY = "mydtm_consent"; // "granted" | "denied"

declare global {
  interface Window {
    dataLayer?: unknown[];
    __gaLoaded?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function loadGA() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

function grant() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  loadGA();
}

/**
 * GA4 conforme CNIL : Consent Mode v2 (tout refusé par défaut) ; GA ne se
 * charge qu'après un clic explicite sur « Accepter ». Le choix est mémorisé.
 */
export default function GoogleAnalytics() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!GA_ID || GA_ID.indexOf("XXXX") !== -1) return;
    // Expose gtag globalement pour la mesure d'événements de conversion
    // (LeadMagnetForm, BuyButton…). Les events poussés avant le consentement
    // restent en file dans dataLayer sans réseau (Consent Mode denied).
    window.gtag = gtag;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage indisponible */
    }
    if (stored === "granted") grant();
    // Affichage du bandeau au montage si aucun choix stocké : lecture localStorage
    // (client-only) impossible dans l'initialiseur d'état → effet intentionnel.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (stored !== "denied") setShowBanner(true);
  }, []);

  if (!showBanner) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "granted");
    } catch {
      /* noop */
    }
    grant();
    setShowBanner(false);
  };
  const refuse = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "denied");
    } catch {
      /* noop */
    }
    setShowBanner(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-4 bottom-4 z-[9999] mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-dark px-5 py-4 text-sm text-white/80 shadow-2xl"
    >
      <p className="m-0 flex-1 basis-72 leading-relaxed">
        Nous utilisons des cookies de mesure d&apos;audience (Google Analytics)
        pour améliorer le site. Vous pouvez accepter ou refuser.
      </p>
      <div className="flex flex-shrink-0 gap-2.5">
        <button
          type="button"
          onClick={refuse}
          className="rounded-full border border-white/25 px-5 py-2 font-semibold text-white transition-colors hover:bg-white/10"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 font-semibold text-white"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
