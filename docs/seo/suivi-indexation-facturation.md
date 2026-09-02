# Suivi d'indexation — cluster « facturation électronique »

> Objectif : faire indexer vite les 34 URLs du cluster (pilier + 31 spokes + 2 outils),
> puis piloter les positions. Outil de mesure dédié : `npm run gsc:facturation`.
> Propriété GSC : `sc-domain:my-dtm.fr` (URL Inspection API, clé service account).

## Baseline J0 — 2026-09-02 (jour du déploiement)

| État | Nb |
|------|----|
| ✅ Submitted and indexed | **4 / 34** |
| 🔍 Discovered - not indexed | 6 |
| ❔ URL is unknown to Google | 24 |

**Déjà indexées en quelques heures** (bon signe) :
- `/guides/facturation-electronique-obligatoire` (pilier)
- `/outils/facturation-electronique-simulateur`
- `/blog/facturation-electronique-avocats`
- `/blog/facturation-electronique-auto-entrepreneur`

Rapport machine : `reports/gsc-facturation.json` (écrasé et comparé à chaque run).

---

## Actions manuelles à faire dans Google Search Console

### 1. Soumettre le sitemap (à faire en premier, sans quota)
GSC → **Sitemaps** → soumettre `https://my-dtm.fr/sitemap.xml`.
C'est ce qui sort les 24 URLs « inconnues de Google » de l'ombre.

### 2. « Demander l'indexation » des URLs prioritaires (~10-15/jour, quota UI)
GSC → **Inspection de l'URL** → coller l'URL → **Demander l'indexation**.
On concentre le quota sur la valeur : gros volumes + outils d'abord.

**Jour 1 (priorité — gros volumes + link magnet) :**
1. `/outils/comparateur-plateformes-agreees` (2ᵉ outil, link magnet)
2. `/blog/facturation-electronique-2026` (vol ~8100)
3. `/blog/facturation-electronique-gratuite-logiciel` (vol ~6600)
4. `/blog/comparatif-plateformes-facturation-electronique` (intent d'achat)
5. `/blog/plateforme-agreee-facturation-electronique`
6. `/blog/facturation-electronique-calendrier-dates`
7. `/blog/facturation-electronique-tpe-pme`
8. `/blog/facturation-electronique-sci-lmnp`
9. `/blog/facturation-electronique-association`
10. `/blog/e-reporting-facturation-electronique`

**Jour 2 (personas + technique) :**
11. `/blog/facturation-electronique-particuliers`
12. `/blog/facturation-electronique-ecommerce`
13. `/blog/facturation-electronique-banque`
14. `/blog/facturation-electronique-restaurant`
15. `/blog/facturation-electronique-batiment-btp`
16. `/blog/factur-x-ubl-formats-facture-electronique`
17. `/blog/nouvelles-mentions-obligatoires-facture-electronique`
18. `/blog/facturation-electronique-professions-liberales`
19. `/blog/facturation-electronique-vtc-taxi`
20. `/blog/facturation-electronique-comment-ca-marche`

**Jour 3 (le reste — ou laisser le sitemap + maillage faire) :**
chorus-pro, sanctions-amende, artiste-auteur, agriculteur, holding,
syndic-copropriete, dom-tom, expert-comptable, entreprise-individuelle,
international-etranger.

> Astuce : pas besoin de demander l'indexation des 34. Faites les ~20 à plus forte
> valeur ; le maillage interne (chaque spoke lie le pilier + les outils) et le
> sitemap font indexer le reste tout seuls.

---

## Suivi hebdomadaire

Chaque semaine, lancer :

```bash
npm run gsc:facturation
```

Le script réinspecte les 34 URLs, écrit `reports/gsc-facturation.json` et affiche
le **delta vs la semaine précédente** (nouvelles pages indexées en vert).

**Ce qu'on veut voir** : la ligne « Indexées » grimper de 4 → ~30 en 2-4 semaines,
les « unknown » et « discovered » fondre.

**Cible** : > 28 / 34 indexées à 4-6 semaines.

Pour une vue site entière (toutes pages, pas seulement le cluster) :
```bash
npm run gsc:report
```

---

## Phase 2 — piloter les positions (une fois l'indexation acquise)

Quand les pages sont indexées, le levier bascule de « être indexé » à « monter ».

1. GSC → **Résultats de recherche (Performances)** → filtrer par page du cluster →
   repérer les requêtes où on est en **position 8-15** (page 1 basse / page 2).
2. Renforcer ces pages précises (titre, intro, FAQ, maillage, un exemple concret) —
   c'est là que se gagnent les places, PAS en ajoutant de nouveaux articles.
3. Suivre le CTR : un bon titre/meta peut doubler les clics à position égale.

## Levier d'autorité — backlinks vers les 2 outils

Le domaine est jeune : les **outils interactifs** (simulateur + comparateur) sont
les meilleurs aimants à liens. Les diffuser (réseaux, groupes pros, partenaires,
signature) apporte des backlinks qui font monter TOUT le cluster, pas juste l'outil.

---

## Rappels techniques

- Le tracker filtre le sitemap sur `facturation-electronique | facture-electronique |
  comparateur-plateformes-agreees` → il s'ajuste tout seul si on ajoute des spokes.
- Clé GSC : `~/Library/Application Support/yapia-seo/gsc-key.json` (compte de service
  `search-console-bot@…`). Override via `GSC_KEY_FILE`.
- L'URL Inspection API est en **lecture seule** : elle ne demande PAS l'indexation
  (ça reste manuel dans l'UI). Elle sert uniquement à mesurer l'état.
