# Plan d'indexation GSC — my-dtm.fr

> Objectif : faire indexer en priorité les pages qui convertissent, sans gaspiller
> le quota. Point de départ (juin 2026) : **3 / 28 pages indexées**. Cible : > 25 pages
> à forte valeur indexées en 4-6 semaines.

## Mode d'emploi (à faire dans Google Search Console)

1. **Re-soumettre le sitemap** : GSC → Sitemaps → soumettre `https://my-dtm.fr/sitemap.xml`
   (il liste désormais 100+ URLs). C'est gratuit et sans quota → **à faire en premier**.
2. **Demander l'indexation** des URLs prioritaires : GSC → *Inspection de l'URL* → coller
   l'URL → *Demander l'indexation*. Quota UI ≈ **10-15 URLs / jour / propriété**.
   → suivre l'ordre des tiers ci-dessous, ~10 par jour.
3. **Ne PAS** demander l'indexation des articles Tier 3 : laisser le sitemap + le maillage
   interne faire le travail. On concentre le quota sur ce qui rapporte.
4. **Mesurer** chaque semaine : GSC → *Pages* → suivre « Indexées » vs « Non indexées ».

⚠️ Rappel : l'Indexing API (script) partage un quota de **200/jour** sur tout le projet GCP
`629308940843` (utilisé aussi par les autres sites du groupe). La méthode manuelle « Demander
l'indexation » dans l'UI est indépendante et suffit ici.

---

## TIER 0 — Pages de conversion (JOUR 1, priorité absolue)

Ce sont elles qui transforment le trafic en clients. À indexer avant tout.

- https://my-dtm.fr/
- https://my-dtm.fr/services
- https://my-dtm.fr/services/creation-site-web
- https://my-dtm.fr/services/seo
- https://my-dtm.fr/services/whatsapp-business
- https://my-dtm.fr/services/automatisation
- https://my-dtm.fr/services/marketing-digital
- https://my-dtm.fr/services/tracking-conformite
- https://my-dtm.fr/services/securite-web
- https://my-dtm.fr/services/plateforme-evenementielle
- https://my-dtm.fr/realisations
- https://my-dtm.fr/tarifs
- https://my-dtm.fr/ecosysteme
- https://my-dtm.fr/contact

## TIER 1 — Articles à intention d'ACHAT (JOURS 2-4)

Requêtes « prix / coût / vs / comparatif » = les plus proches de la vente.

- https://my-dtm.fr/blog/prix-creation-site-web-professionnel
- https://my-dtm.fr/blog/combien-coute-referencement-google
- https://my-dtm.fr/blog/prix-automatisation-processus-entreprise
- https://my-dtm.fr/blog/prix-plateforme-billetterie-evenementielle
- https://my-dtm.fr/blog/cout-whatsapp-business-api-france
- https://my-dtm.fr/blog/cout-publicite-facebook-instagram
- https://my-dtm.fr/blog/nextjs-ou-wordpress-que-choisir
- https://my-dtm.fr/blog/shopify-vs-site-sur-mesure
- https://my-dtm.fr/blog/zapier-make-n8n-comparatif
- https://my-dtm.fr/blog/google-ads-vs-facebook-ads
- https://my-dtm.fr/blog/whatsapp-business-vs-whatsapp-classique
- https://my-dtm.fr/blog/billetterie-comparatif-frais-plateformes
- https://my-dtm.fr/blog/billetterie-sur-mesure-vs-solution-saas
- https://my-dtm.fr/blog/combien-de-temps-creer-site-web
- https://my-dtm.fr/blog/site-vitrine-ou-e-commerce-choisir

## TIER 2 — Articles piliers par service (JOURS 5-10)

Les « têtes de cluster » qui soutiennent les pages services et se maillent au reste.

- https://my-dtm.fr/blog/creer-boutique-en-ligne-guide
- https://my-dtm.fr/blog/vendre-billets-en-ligne-guide
- https://my-dtm.fr/blog/integrer-whatsapp-business-api-guide
- https://my-dtm.fr/blog/automatiser-taches-repetitives-entreprise
- https://my-dtm.fr/blog/comment-faire-audit-seo
- https://my-dtm.fr/blog/refonte-site-web-sans-perdre-seo
- https://my-dtm.fr/blog/migration-wordpress-nextjs-seo
- https://my-dtm.fr/blog/optimiser-fiche-google-business-profile
- https://my-dtm.fr/blog/referencement-google-maps
- https://my-dtm.fr/blog/strategie-marketing-digital-pme
- https://my-dtm.fr/blog/chatbot-ia-site-web-entreprise
- https://my-dtm.fr/blog/mise-en-conformite-rgpd-site-web
- https://my-dtm.fr/blog/proteger-site-web-piratage
- https://my-dtm.fr/blog/ameliorer-core-web-vitals-vitesse-site
- https://my-dtm.fr/blog/landing-page-qui-convertit

## TIER 3 — Le reste (~59 articles)

Ne PAS forcer via GSC. Ils sont dans le sitemap et maillés en interne : Google les
découvrira au fur et à mesure que l'autorité du domaine monte (backlinks). Forcer
l'indexation de dizaines de pages « secondaires » sur un domaine jeune est contre-productif
(ratio indexé/publié faible = mauvais signal Helpful Content). On les pousse plus tard,
une fois les Tiers 0-1-2 indexés.

Inclut : articles sectoriels (restaurant, association, artisan, coach, immobilier,
profession libérale), sous-sujets sécurité/tracking/social/conversion/SEO local détaillés,
guides secondaires WhatsApp/billetterie/e-commerce.

---

## Après l'indexation (semaines 3-6)

1. **Backlinks** : les 14 domaines frères sont câblés (footer « Réalisé par My DTM »).
   Viser en plus 2-3 liens externes/mois (annuaires d'agences, French Tech, article invité).
2. **Fiche Google Business Profile** : renommer « My -DTM » → « My DTM », vérifier le
   téléphone (`+33 7 43 53 75 51`). C'est le levier le plus rapide pour le pack local.
3. **Doubler la mise** sur les articles arrivés en page 2 dans GSC (Performances → position
   11-20) : enrichir + liens internes → page 1.
4. **Cadence de publication** : 2-3 articles/mois MAX désormais (le stock est large).
   Priorité à l'indexation et aux liens, pas au volume.
