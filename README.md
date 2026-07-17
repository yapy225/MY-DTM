# My-DTM — site & tunnel de vente

Site vitrine de l'agence digitale **My-DTM** (Paris) : pages services, blog SEO,
guides premium avec vente d'ebooks et d'accompagnements, et un dashboard de
pilotage privé.

- **Stack** : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4
- **Paiement** : Stripe Checkout · **Email/CRM** : Resend · **RDV** : Cal.com
- **Analytics** : Google Search Console + Vercel Analytics
- **Hébergement** : Vercel · domaine `my-dtm.fr`

## Parti pris d'architecture : aucune base de données

Toutes les données vivent dans des services externes ou dans le code :

- **Catalogue** (`src/lib/guides/guides.ts`) : source de vérité unique. Ajouter
  un guide y crée automatiquement la page `/guides/<slug>`, l'entrée du sitemap
  et le câblage Stripe. Un garde-fou (`validateCatalog`) échoue au build si un
  prix ou un produit est incohérent.
- **Livraison des ebooks** : token HMAC signé (`src/lib/stripe.ts`), le PDF vit
  hors de `public/` dans `private/ebooks/` et n'est servi que sur token valide.
- **Leads** : stockés comme contacts d'une audience Resend.
- **Dashboard `/pilotage`** : agrège en direct Stripe / GSC / Cal.com / Resend,
  ne stocke rien. Protégé par mot de passe unique + cookie signé HMAC.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

Créer un `.env.local` (voir variables ci-dessous). Sans clés, les fonctionnalités
correspondantes se dégradent proprement (le site reste servi).

## Variables d'environnement

| Variable | Rôle | Requis |
|---|---|---|
| `STRIPE_SECRET_KEY` | Client Stripe (checkout, métriques) | paiement |
| `STRIPE_WEBHOOK_SECRET` | Vérif signature du webhook `/api/stripe-webhook` | paiement |
| `RESEND_API_KEY` | Envoi des emails + audience leads | email |
| `APP_SIGNING_SECRET` | Clé HMAC (cookie session + tokens download). À défaut `DOWNLOAD_SIGNING_SECRET`. **Aucun fallback codé en dur : absence = erreur.** | oui |
| `DOWNLOAD_SIGNING_SECRET` | Alias historique de la clé HMAC | (compat) |
| `PILOTAGE_PASSWORD` | Mot de passe du dashboard `/pilotage` | dashboard |
| `NEXT_PUBLIC_SITE_URL` | URL publique (défaut `https://my-dtm.fr`) | non |
| `NEXT_PUBLIC_CAL_LINK` | Lien Cal.com de réservation | accompagnement |
| `CAL_API_KEY` | Lecture des RDV Cal.com (dashboard) | non |
| `GOOGLE_SA_JSON` / `GSC_KEY_FILE` | Service account GSC (dashboard + scripts SEO) | non |
| `CONTACT_NOTIFY_TO` | Destinataire des notifications contact/ventes | non |
| `GOOGLE_SITE_VERIFICATION` | Balise de vérification GSC | non |

> ⚠️ La clé de signature HMAC est **découplée** de la clé Stripe : ne jamais
> réutiliser l'une pour l'autre.

## Déploiement

Déployé sur **Vercel** (projet dédié). Le webhook Stripe doit pointer vers
`https://my-dtm.fr/api/stripe-webhook` et `STRIPE_WEBHOOK_SECRET` doit
correspondre. Après changement du catalogue, vérifier le build (le garde-fou
`validateCatalog` bloque un catalogue incohérent).

## CI

`.github/workflows/ci.yml` : typecheck (bloquant) + lint (informatif) sur chaque
push/PR. `.github/workflows/gsc-daily.yml` : audit d'indexation GSC quotidien.
