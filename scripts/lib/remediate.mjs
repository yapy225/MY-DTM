// TIER 1 — Auto-remédiation SÛRE & RÉVERSIBLE. Ne touche JAMAIS au code d'un site :
// uniquement des « nudges » Google réversibles au niveau site.
//   • resoumission du sitemap (0 quota, redit à Google « recrawle-moi »).
//   • demande d'indexation par URL (Indexing API, quota 200/j PARTAGÉ) pour les URL non indexées.
// Requiert les scopes webmasters (SA owner GSC) + indexing (API activée).
// NB : l'Indexing API est officiellement réservée à JobPosting/BroadcastEvent — pour d'autres
// types de pages Google peut ignorer la demande ; c'est un nudge best-effort, non garanti.

const INDEXING_BUDGET = Number.parseInt(process.env.INDEXING_BUDGET || '180', 10);

// Resoumet le sitemap d'une propriété. PUT → 204 = OK. Sans quota, sans risque.
export async function resubmitSitemap(property, token) {
  const host = property.replace(/^sc-domain:/, '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const feed = `https://${host}/sitemap.xml`;
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(feed)}`;
  const r = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  return { feed, ok: r.status === 204 || r.ok, status: r.status };
}

// Demande l'indexation d'UNE URL (URL_UPDATED). Renvoie le status HTTP.
async function requestIndexing(url, token) {
  const r = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  return r.status;
}

// Applique le Tier 1 aux anomalies d'indexation. Idempotent (une resoumission / propriété).
// 1) resoumet le sitemap ; 2) demande l'indexation des URL non indexées dans le budget quotidien
//    partagé (arrêt net si 403 API désactivée / 429 quota). Retourne les actions réellement tentées.
export async function remediateTier1(anomalies, report, token) {
  const done = [];
  const seen = new Set();
  let budget = INDEXING_BUDGET;
  let indexingBlocked = 0;                     // 403/429 → on arrête les demandes d'indexation
  for (const a of anomalies) {
    if (a.tier !== 1) continue;                // seul le Tier 1 est auto-appliqué ici
    const g = report.gsc?.[a.brand];
    const prop = g?.property;
    if (!prop || seen.has(prop)) continue;
    seen.add(prop);

    // 1) resoumission sitemap
    try {
      const res = await resubmitSitemap(prop, token);
      done.push({ action: 'resubmit_sitemap', brand: a.brand, property: prop, reason: a.type, ...res });
    } catch (e) {
      done.push({ action: 'resubmit_sitemap', brand: a.brand, property: prop, ok: false, error: e.message });
    }

    // 2) demande d'indexation des URL non indexées (best-effort, budget partagé).
    //    Sauté si le site est « stagnant » (nudge prouvé inefficace) → on préserve le quota.
    if (!indexingBlocked && budget > 0 && !a.stagnant) {
      const urls = g?.notIndexed || [];
      let ok = 0, ko = 0;
      for (const u of urls) {
        if (budget <= 0) break;
        budget -= 1;
        let st = 0;
        try { st = await requestIndexing(u, token); } catch { st = 0; }
        if (st === 200) { ok += 1; }
        else { ko += 1; if (st === 403 || st === 429) { indexingBlocked = st; break; } }
      }
      if (ok + ko > 0) {
        done.push({ action: 'request_indexing', brand: a.brand, ok: ok > 0,
          detail: `${ok}/${ok + ko} URL demandées (200)`, budget_left: budget });
      }
    }
  }
  if (indexingBlocked) done.push({ action: 'request_indexing', brand: '(réseau)', ok: false,
    detail: `demandes d'indexation stoppées (HTTP ${indexingBlocked} : quota 200/j ou API)` });
  return done;
}
