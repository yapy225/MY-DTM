# Ebooks (fichiers PDF livrés après paiement)

Déposez ici les PDF vendus sur les pages `/guides/<slug>`.

Le nom du fichier doit correspondre exactement au champ `file` du produit
dans `src/lib/guides/guides.ts`.

| Guide | Fichier attendu |
|-------|-----------------|
| Automatiser ses réseaux sociaux | `automatiser-reseaux-sociaux.pdf` |
| Vendre avec WhatsApp Business | `vendre-avec-whatsapp.pdf` |
| Publicité Facebook & Instagram | `publicite-facebook-instagram.pdf` |
| Référencement naturel (SEO) | `referencement-naturel-seo.pdf` |
| Créer un site web qui vend | `creer-site-web-qui-vend.pdf` |
| Vendre ses billets en ligne | `vendre-billets-en-ligne.pdf` |
| Sécuriser son site web | `securiser-son-site-web.pdf` |
| Tracking & RGPD (Consent Mode / CAPI) | `tracking-rgpd-consent-mode.pdf` |
| Kit conformité facturation électronique | `kit-conformite-facturation-electronique.pdf` |

> Le PDF `kit-conformite-facturation-electronique.pdf` est régénéré depuis le HTML
> du même nom via Chrome headless :
> `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=kit-conformite-facturation-electronique.pdf file://<chemin absolu>/kit-conformite-facturation-electronique.html`

Ces fichiers ne sont JAMAIS servis en direct : la route `/api/download`
vérifie un token signé (HMAC) avant de les transmettre. Ils sont inclus dans
le bundle Vercel via `outputFileTracingIncludes` dans `next.config.ts`.
