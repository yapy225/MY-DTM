# Ebooks (fichiers PDF livrés après paiement)

Déposez ici les PDF vendus sur les pages `/guides/<slug>`.

Le nom du fichier doit correspondre exactement au champ `file` du produit
dans `src/lib/guides/guides.ts`.

| Guide | Fichier attendu |
|-------|-----------------|
| Automatiser ses réseaux sociaux | `automatiser-reseaux-sociaux.pdf` |

Ces fichiers ne sont JAMAIS servis en direct : la route `/api/download`
vérifie un token signé (HMAC) avant de les transmettre. Ils sont inclus dans
le bundle Vercel via `outputFileTracingIncludes` dans `next.config.ts`.
