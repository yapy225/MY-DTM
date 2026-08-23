// TIER 1 — Auto-remédiation SÛRE & RÉVERSIBLE. Ne touche JAMAIS au code d'un site :
// uniquement des « nudges » Google réversibles au niveau site.
//   • resoumission du sitemap (0 quota, redit à Google « recrawle-moi »).
//   • (optionnel) demande d'indexation par URL (Indexing API, quota 200/j PARTAGÉ).
// Requiert le scope https://www.googleapis.com/auth/webmasters (le compte de service
// est owner GSC) et, pour l'indexing, https://www.googleapis.com/auth/indexing + l'API activée.

// Resoumet le sitemap d'une propriété. PUT → 204 = OK. Sans quota, sans risque.
export async function resubmitSitemap(property, token) {
  const host = property.replace(/^sc-domain:/, '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const feed = `https://${host}/sitemap.xml`;
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(feed)}`;
  const r = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  return { feed, ok: r.status === 204 || r.ok, status: r.status };
}

// Applique le Tier 1 aux anomalies d'indexation. Idempotent (une resoumission / propriété).
// Retourne la liste des actions RÉELLEMENT tentées + leur résultat (jamais fabriqué).
export async function remediateTier1(anomalies, report, token) {
  const done = [];
  const seen = new Set();
  for (const a of anomalies) {
    if (a.tier !== 1) continue;                       // seul le Tier 1 est auto-appliqué ici
    const prop = report.gsc?.[a.brand]?.property;
    if (!prop || seen.has(prop)) continue;
    seen.add(prop);
    try {
      const res = await resubmitSitemap(prop, token);
      done.push({ action: 'resubmit_sitemap', brand: a.brand, property: prop, reason: a.type, ...res });
    } catch (e) {
      done.push({ action: 'resubmit_sitemap', brand: a.brand, property: prop, ok: false, error: e.message });
    }
  }
  return done;
}
