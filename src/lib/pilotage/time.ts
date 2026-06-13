import "server-only";

// Helpers de dates en Europe/Paris.
// IMPORTANT (incident vente 00h54 disparue) : les timestamps Stripe/GSC sont en
// UTC ; tout regroupement par jour DOIT se faire en Europe/Paris, sinon les
// ventes de fin de soiree basculent sur le mauvais jour.

const TZ = "Europe/Paris";

const keyFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const labelFmt = new Intl.DateTimeFormat("fr-FR", {
  timeZone: TZ,
  day: "2-digit",
  month: "2-digit",
});

// "YYYY-MM-DD" pour un timestamp en secondes Unix, en heure de Paris.
export function parisDateKey(unixSeconds: number): string {
  return keyFmt.format(new Date(unixSeconds * 1000));
}

// Liste continue des `days` derniers jours (aujourd'hui inclus), du plus ancien
// au plus recent : { key: "YYYY-MM-DD", label: "JJ/MM" }.
export function parisDayLabels(days: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const now = Date.now();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 24 * 60 * 60 * 1000);
    out.push({ key: keyFmt.format(d), label: labelFmt.format(d) });
  }
  return out;
}

// "YYYY-MM-DD" a `days` jours dans le passe (pour les bornes d'API GSC).
export function isoDaysAgo(days: number): string {
  return keyFmt.format(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
}
