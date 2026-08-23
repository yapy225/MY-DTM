// Planificateur de MAILLAGE inter-sites — le levier « autorité » sûr et possédé.
// Quand le crawl ne suffit pas (site stagnant), on propose des liens ENTRANTS depuis des
// sites FRÈRES du MÊME cluster thématique : pertinents pour Google ET l'utilisateur.
//
// ⚠️ Garde-fous anti-PBN (Private Blog Network = pénalisable) :
//   - JAMAIS tout le réseau : seulement des sites du même cluster, plafonné.
//   - Ancres VARIÉES, jamais le même mot-clé répété.
//   - Liens ÉDITORIAUX/contextuels, pas un bloc footer identique sitewide.
//   - Progressif dans le temps.
// Le plan est une PROPOSITION : l'exécution reste humaine (le link-building = jugement + risque
// de pénalité), pas de l'auto-merge.

export function buildLinkingPlan(brand, map, opts = {}) {
  const max = opts.max || 3;
  const me = map.brands?.[brand];
  if (!me) return null;
  const cluster = me.cluster;
  const siblings = Object.entries(map.brands)
    .filter(([k, v]) => k !== brand && v.cluster === cluster)
    .map(([k, v]) => ({ brand: k, ...v }));

  if (siblings.length === 0) {
    return { cluster, targets: [],
      note: `Aucun site frère pertinent (cluster « ${cluster} » = ce site est seul de son thème). `
          + `Le maillage interne n'aiderait pas ici → lever d'autorité EXTERNE (presse, partenaires, annuaires de niche).` };
  }

  // ancres variées (jamais le même mot-clé partout) : nom lisible, phrase neutre, URL nue
  const name = me.domain.replace(/\.(fr|com|net|org)$/i, '').replace(/-/g, ' ');
  const anchorPool = [name, 'en savoir plus', me.domain, `découvrir ${name}`];
  const targets = siblings.slice(0, max).map((s, i) => ({
    from_repo: s.repo, from_domain: s.domain, to_domain: me.domain,
    anchor_suggestion: anchorPool[i % anchorPool.length],
    placement: 'lien éditorial dans une page/article PERTINENT (agenda, article lié), pas un footer sitewide',
    why: `même univers « ${cluster} » → lien légitime et utile`,
  }));

  return {
    cluster, targets,
    guardrails: [
      `max ${max} liens entrants pour ce site (pas tout le réseau → évite l'empreinte PBN)`,
      'ancres variées, jamais le même mot-clé répété',
      'liens éditoriaux/contextuels, pas un bloc footer identique sur toutes les pages',
      'étaler dans le temps (pas N liens le même jour)',
    ],
    execution: 'PROPOSITION — à poser à la main / en PR relue (le link-building reste humain).',
  };
}
