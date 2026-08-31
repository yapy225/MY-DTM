// ON-PAGE FIXERS (T2 étendu) — fonctions PURES, déterministes, testables (0 réseau, 0 dép).
// Le driver (scripts/t2-onpage.mjs) les compose ; ici, aucune I/O.
//
// Doctrine (LIVRE-MAITRE §21 FULL-AUTO · §GEO/§Média de la doctrine SEO) : on n'AUTO-CORRIGE
// que ce qui est sûr, idempotent, réversible ET non fabriqué (`THE BOT NEVER LIES`).
//   • llms.txt          → AUTO-FIX : créer un fichier statique manquant = zéro blast radius, réversible.
//   • max-image-preview → DÉTECTÉ, REPORTÉ (pas auto-fix) : édition de layout/HTML par stack = fragile.
//   • sameAs            → DÉTECTÉ, REPORTÉ (jamais auto-fix) : exige les VRAIES URLs sociales (données
//                          qu'on n'a pas) → un auto-fix fabriquerait des liens = interdit.

// Chemin où déposer llms.txt selon la stack (servi à la racine dans les deux cas).
export function llmsTxtPath(stack) {
  return stack === 'next' ? 'public/llms.txt' : 'llms.txt';
}

// Contenu llms.txt HONNÊTE et minimal : uniquement des URLs qui existent réellement
// (accueil + sitemap). Bonus de découvrabilité IA (§GEO 5) ; un humain l'enrichit ensuite.
// Ne fabrique aucune donnée (pas de description inventée, pas de liste de pages devinée).
export function buildLlmsTxt(domain) {
  return [
    `# ${domain}`,
    '',
    '> Ressources clés pour agents IA (llms.txt — standard émergent GEO/AEO).',
    '> Généré automatiquement (passe on-page T2) ; à enrichir manuellement.',
    '',
    `- Accueil : https://${domain}/`,
    `- Plan du site (sitemap) : https://${domain}/sitemap.xml`,
    '',
  ].join('\n');
}

// Audit HTML PUR (chaîne → drapeaux), pour REPORTING seulement. Ne modifie rien.
// - max-image-preview:large : directive robots requise pour les grandes vignettes SERP/Discover.
// - sameAs : signal d'entité (Knowledge Graph) — présence dans un JSON-LD.
export function auditHtml(html) {
  const h = String(html || '');
  return {
    hasMaxImagePreview: /max-image-preview\s*:\s*large/i.test(h),
    hasSameAs: /["']sameAs["']\s*:/.test(h),
  };
}

// Décide, à partir de la carte + du statut live, l'action llms.txt pour une marque.
// PURE (pas de réseau) : le driver fournit `liveStatus` (code HTTP de GET /llms.txt).
//   200            → COMPLIANT (rien à faire, idempotent).
//   onpage===false → SKIP (repo monorepo/sensible exclu de l'auto-fix fichier).
//   sinon (404/…)  → FIX (créer le fichier). autoMerge = brand.ci (Option A : seuls les Next ci:true).
export function planLlmsAction(brand, liveStatus) {
  if (liveStatus === 200) return { verdict: 'COMPLIANT' };
  if (brand?.onpage === false) return { verdict: 'SKIP', reason: 'onpage:false (monorepo/sensible)' };
  return {
    verdict: 'FIX',
    path: llmsTxtPath(brand.stack),
    autoMerge: brand.ci === true,
  };
}
