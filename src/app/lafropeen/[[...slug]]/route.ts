// 410 Gone pour toutes les anciennes URLs /lafropeen/* (contenu actu/politique
// hérité de DreamTeam, hors-sujet pour le site agence my-dtm.fr et contraire à
// la ligne éditoriale de L'Afropean). Le 410 dit à Google « supprimé
// définitivement » : déréférencement plus rapide qu'un 301, et le script
// scripts/gsc-deindex-old-urls.mjs les prend alors en charge (404/410).
//
// Catch-all optionnel : couvre /lafropeen ET /lafropeen/<n'importe quoi>.

const BODY = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page supprimée</title></head><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;text-align:center"><h1>410 — Contenu supprimé</h1><p>Cette page n'existe plus. Rendez-vous sur <a href="https://my-dtm.fr">my-dtm.fr</a>.</p></body></html>`;

function gone(): Response {
  return new Response(BODY, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function GET() {
  return gone();
}

export function HEAD() {
  return gone();
}
