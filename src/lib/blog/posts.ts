// Source de verite des articles de blog. Ajouter un objet ici cree
// automatiquement la page /blog/<slug>, l'entree dans /blog et le sitemap.

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; text: string; href: string; label: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  readingTime: string;
  category: string;
  keywords: string[];
  related: { href: string; label: string }[];
  content: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "integrer-whatsapp-business-api-guide",
    title: "Comment intégrer l'API WhatsApp Business en 2026 (guide complet)",
    description:
      "Guide pratique pour intégrer l'API WhatsApp Business : différence avec l'app, étapes, prix réels, cas d'usage et erreurs à éviter. Par une agence d'intégration.",
    date: "2026-06-03",
    readingTime: "6 min",
    category: "WhatsApp Business",
    keywords: [
      "intégration WhatsApp Business API",
      "connecter WhatsApp Business à mon site",
      "WhatsApp Business API webhook",
      "automatisation WhatsApp entreprise",
    ],
    related: [
      { href: "/services/whatsapp-business", label: "Intégration WhatsApp Business API" },
      { href: "/services/automatisation", label: "Automatisation & API" },
    ],
    content: [
      { type: "p", text: "L'API WhatsApp Business permet d'automatiser la relation client à grande échelle : chatbots, notifications, relances, multi-agents. Mais entre l'application gratuite, les BSP (Business Solution Providers) et l'intégration sur votre propre site, il est facile de se perdre. Voici comment ça marche vraiment, et comment l'intégrer proprement." },
      { type: "h2", text: "App WhatsApp Business vs API : ne pas confondre" },
      { type: "p", text: "L'application WhatsApp Business (gratuite) cible les petits commerces : un numéro, un téléphone, des réponses manuelles. L'API WhatsApp Business, elle, est faite pour automatiser et intégrer : elle se connecte à votre site, votre CRM, vos campagnes publicitaires, et gère des milliers de conversations simultanées." },
      { type: "ul", items: [
        "App : manuelle, 1 appareil, pas d'automatisation réelle.",
        "API : automatisable, multi-agents, webhooks, intégrations, à l'échelle.",
        "L'API passe obligatoirement par un BSP agréé par Meta (ou par l'API Cloud officielle).",
      ]},
      { type: "h2", text: "Les étapes d'une intégration propre" },
      { type: "p", text: "Une intégration WhatsApp Business API se déroule en quelques étapes clés, qu'on réalise généralement en 48h pour une PME :" },
      { type: "ul", items: [
        "Création et vérification du compte WhatsApp Business via Meta Business Manager.",
        "Validation du numéro (un numéro dédié, qui ne sera plus utilisable sur l'app classique).",
        "Création des templates de messages (confirmations, rappels, promos) approuvés par Meta.",
        "Mise en place des webhooks : réception des messages entrants et déclenchement d'automatisations.",
        "Connexion à vos outils : site web, Facebook/Instagram Lead Ads, CRM, paiement.",
      ]},
      { type: "h2", text: "Combien ça coûte réellement ?" },
      { type: "p", text: "Il y a deux postes à distinguer. D'abord, le coût Meta par conversation : environ 0,05 € pour une conversation initiée par l'entreprise et 0,03 € pour une conversation initiée par le client, avec un volume gratuit chaque mois. Pour la plupart des PME, cela représente 10 à 50 € par mois. Ensuite, le coût d'intégration : certains BSP facturent un abonnement mensuel, d'autres facturent l'installation une fois. Méfiez-vous des prestataires qui facturent 1 000 € pour une création de compte qui prend dix minutes." },
      { type: "h2", text: "Le cas d'usage le plus rentable : WhatsApp + Lead Ads" },
      { type: "p", text: "Quand un prospect remplit un formulaire Facebook ou Instagram, il reçoit automatiquement un message WhatsApp dans la seconde. Le taux de conversion est 3 à 5 fois supérieur à l'email, car le message arrive là où les gens lisent vraiment (98 % de taux d'ouverture sur WhatsApp). C'est l'automatisation qui rentabilise le plus vite une intégration." },
      { type: "cta", text: "Vous voulez intégrer WhatsApp Business API sans vous occuper de la technique ?", href: "/services/whatsapp-business", label: "Voir notre offre d'intégration WhatsApp Business" },
      { type: "h2", text: "Les erreurs à éviter" },
      { type: "ul", items: [
        "Migrer un numéro déjà utilisé sur l'app WhatsApp classique sans l'avoir anticipé (il devient inutilisable sur l'app).",
        "Envoyer des messages marketing sans consentement : Meta sanctionne, et c'est non conforme au RGPD.",
        "Négliger les templates : tout message hors fenêtre de 24h doit passer par un template approuvé.",
        "Oublier les webhooks : sans eux, pas d'automatisation des messages entrants.",
      ]},
      { type: "p", text: "Bien intégrée, l'API WhatsApp Business devient un canal d'acquisition et de relation client redoutable. Mal intégrée, c'est un numéro bloqué et des messages non délivrés. L'enjeu est dans la configuration." },
    ],
  },
  {
    slug: "conversions-api-meta-rgpd-guide",
    title: "Conversions API Meta & RGPD : le guide complet (2026)",
    description:
      "Pourquoi vos conversions Facebook ne remontent plus, comment la Conversions API server-side les récupère, et comment rester 100 % conforme au RGPD et à la CNIL.",
    date: "2026-06-03",
    readingTime: "7 min",
    category: "Tracking & Data",
    keywords: [
      "Conversions API server-side",
      "déduplication événements Pixel Meta",
      "consentement Meta Pixel CNIL",
      "tracking conversions iOS 14",
    ],
    related: [
      { href: "/services/tracking-conformite", label: "Tracking & Conformité RGPD" },
      { href: "/services/marketing-digital", label: "Marketing Digital" },
    ],
    content: [
      { type: "p", text: "Depuis iOS 14.5 et la généralisation des bloqueurs de publicité, le Pixel Meta côté navigateur perd une part croissante des conversions. Résultat : vos campagnes paraissent moins performantes qu'elles ne le sont, et l'optimisation de Meta se dégrade. La Conversions API (CAPI) corrige ça — à condition de la brancher correctement et dans le respect du RGPD." },
      { type: "h2", text: "Pourquoi le Pixel seul ne suffit plus" },
      { type: "p", text: "Le Pixel s'exécute dans le navigateur. Or les navigateurs limitent désormais les cookies tiers, et beaucoup d'utilisateurs bloquent les scripts publicitaires. Une partie des achats, leads et ajouts au panier ne remontent donc jamais à Meta. Sans données, Meta cible moins bien et votre coût par acquisition grimpe." },
      { type: "h2", text: "Ce que fait la Conversions API (CAPI)" },
      { type: "p", text: "La CAPI envoie les événements directement depuis votre serveur vers Meta, sans dépendre du navigateur. Couplée au Pixel, elle restaure une mesure fiable. Trois ingrédients sont indispensables pour qu'elle soit efficace :" },
      { type: "ul", items: [
        "La déduplication : chaque événement envoyé à la fois par le Pixel et la CAPI doit porter le même event_id, sinon Meta le compte deux fois.",
        "L'Advanced Matching : on transmet email et téléphone hashés, ce qui améliore le taux de correspondance (Event Match Quality).",
        "Les bons paramètres : fbp, fbc, external_id, IP, user agent — plus ils sont complets, mieux Meta retrouve l'utilisateur.",
      ]},
      { type: "h2", text: "La CAPI ne contourne PAS le RGPD" },
      { type: "p", text: "C'est l'erreur la plus dangereuse : croire que parce que les données partent du serveur, on échappe au consentement. Faux. La CNIL est claire : un traitement à des fins publicitaires nécessite le consentement, quel que soit le canal technique. La CAPI doit donc être branchée derrière votre CMP (bandeau de consentement), et le flux serveur doit respecter le choix de l'internaute exactement comme le Pixel." },
      { type: "ul", items: [
        "Aucun événement de tracking n'est envoyé tant que l'utilisateur n'a pas accepté (Consent Mode).",
        "Les données personnelles (email, téléphone) sont hashées (SHA-256) avant envoi.",
        "Les CMP les plus utilisées en France (Axeptio, Didomi) s'intègrent nativement.",
        "On documente le tout pour la conformité CNIL.",
      ]},
      { type: "cta", text: "Vous voulez une CAPI fiable ET conforme RGPD, sans y passer des semaines ?", href: "/services/tracking-conformite", label: "Voir notre offre Tracking & Conformité" },
      { type: "h2", text: "Quels résultats attendre ?" },
      { type: "p", text: "Une implémentation propre permet typiquement de récupérer la majorité des conversions perdues, de pousser l'Event Match Quality au-dessus de la moyenne, et d'éliminer les doublons. Concrètement : Meta optimise mieux, vos audiences similaires sont de meilleure qualité, et votre ROAS s'améliore — le tout en restant en règle." },
      { type: "p", text: "Le tracking server-side n'est plus optionnel en 2026. Mais entre une CAPI mal branchée (doublons, hors consentement) et une CAPI propre, la différence se chiffre directement en budget publicitaire gaspillé ou récupéré." },
    ],
  },
  {
    slug: "prix-plateforme-billetterie-evenementielle",
    title: "Combien coûte une plateforme de billetterie événementielle ?",
    description:
      "Prix d'une billetterie en ligne sur mesure vs plateformes à commission (Billetweb, Weezevent), ce qui fait le coût, et quand le sur-mesure devient rentable.",
    date: "2026-06-03",
    readingTime: "6 min",
    category: "Événementiel",
    keywords: [
      "prix plateforme billetterie",
      "plateforme billetterie sur mesure",
      "alternative Billetweb Weezevent",
      "logiciel réservation exposants",
    ],
    related: [
      { href: "/services/plateforme-evenementielle", label: "Plateforme billetterie sur mesure" },
      { href: "/services/creation-site-web", label: "Création site web" },
    ],
    content: [
      { type: "p", text: "Pour vendre des billets en ligne, vous avez deux voies : une plateforme grand public à commission (Billetweb, Weezevent, Helloasso…) ou une billetterie sur mesure qui vous appartient. La bonne décision dépend surtout de votre volume et de vos besoins spécifiques. Décryptage des coûts." },
      { type: "h2", text: "Le vrai coût des plateformes à commission" },
      { type: "p", text: "Les solutions clé en main sont gratuites à l'installation, mais prélèvent une commission sur chaque billet vendu (souvent 1 à 5 %, parfois plus avec les frais de service refacturés à l'acheteur). Sur un petit événement, c'est indolore. Sur un événement à fort volume ou récurrent, la facture grimpe vite — et vous payez à vie." },
      { type: "ul", items: [
        "Commission par billet (récurrente, proportionnelle au succès de votre événement).",
        "Votre marque s'efface derrière celle de la plateforme.",
        "Fonctionnalités limitées : difficile d'ajouter réservation exposants, acompte, invitations VIP, tracking publicitaire.",
        "Vos données clients ne vous appartiennent pas vraiment.",
      ]},
      { type: "h2", text: "Le coût d'une billetterie sur mesure" },
      { type: "p", text: "Une billetterie sur mesure est un investissement unique, sans commission par billet. Les fourchettes réalistes :" },
      { type: "ul", items: [
        "Billetterie essentielle (page événement, billets QR code, paiement Stripe, dashboard) : à partir de 4 000 €.",
        "Plateforme complète (réservation exposants, contrôle d'accès, tarifs multiples, acompte, relances) : à partir de 7 000 €.",
        "Écosystème multi-événements (multi-saisons, annuaire, journal, comptabilité) : sur devis.",
      ]},
      { type: "h2", text: "Qu'est-ce qui fait le prix ?" },
      { type: "ul", items: [
        "Le tunnel d'achat et la génération de billets PDF avec QR code unique.",
        "Le contrôle d'accès (scan à l'entrée, anti-doublon, comptage temps réel).",
        "La réservation exposants : paiement, acompte, badges, dashboard dédié.",
        "Les intégrations : paiement Stripe/PayPal, emails, WhatsApp, tracking publicitaire.",
      ]},
      { type: "cta", text: "Un événement à billetter, avec exposants ou contrôle d'accès ?", href: "/services/plateforme-evenementielle", label: "Voir notre offre billetterie sur mesure" },
      { type: "h2", text: "Quand le sur-mesure devient rentable" },
      { type: "p", text: "La règle simple : calculez la commission que vous paieriez sur votre volume annuel de billets. Si elle dépasse le coût d'une plateforme sur mesure sur 1 à 2 ans, le sur-mesure est rentable — et au-delà, chaque billet vendu est 100 % à vous. Ajoutez-y la valeur de posséder vos données clients et de ne plus dépendre d'un tiers : pour un organisateur récurrent, le calcul penche vite en faveur du sur-mesure." },
    ],
  },
  {
    slug: "cout-whatsapp-business-api-france",
    title: "Combien coûte l'API WhatsApp Business en France ? (2026)",
    description:
      "Le détail réel des coûts de l'API WhatsApp Business : tarifs Meta par conversation, coût d'intégration, abonnements BSP, et combien prévoir selon votre volume.",
    date: "2026-06-03",
    readingTime: "5 min",
    category: "WhatsApp Business",
    keywords: [
      "coût WhatsApp Business API France",
      "WhatsApp Business API prix",
      "tarif WhatsApp Business API",
      "WhatsApp Business API gratuit",
    ],
    related: [
      { href: "/services/whatsapp-business", label: "Intégration WhatsApp Business API" },
      { href: "/services/automatisation", label: "Automatisation & API" },
    ],
    content: [
      { type: "p", text: "« Combien ça coûte ? » est la première question quand on envisage l'API WhatsApp Business. La réponse honnête : ça dépend de deux postes bien distincts, qu'on confond souvent. Voici le détail, sans zone d'ombre." },
      { type: "h2", text: "Poste 1 : ce que facture Meta (par conversation)" },
      { type: "p", text: "Meta ne facture pas par message mais par conversation (une fenêtre de 24h). Le tarif dépend de la catégorie et du marché. En France, à titre indicatif :" },
      { type: "ul", items: [
        "Conversation marketing (vous initiez une promo) : environ 0,065 € l'unité.",
        "Conversation utilitaire (confirmation, rappel, suivi) : environ 0,038 €.",
        "Conversation de service (réponse à un client qui vous écrit) : souvent gratuite.",
        "Un volume de conversations de service est inclus chaque mois.",
      ]},
      { type: "p", text: "Pour une PME qui envoie quelques centaines de messages par mois, ce poste tourne souvent entre 10 et 50 € mensuels." },
      { type: "h2", text: "Poste 2 : l'intégration et l'outil (BSP ou agence)" },
      { type: "p", text: "L'API passe par un BSP (Business Solution Provider) agréé Meta, ou par l'API Cloud officielle intégrée sur votre infrastructure. Les modèles de prix varient énormément :" },
      { type: "ul", items: [
        "Plateformes SaaS clé en main : abonnement mensuel récurrent (de ~30 € à plus de 100 €/mois selon les fonctions et le nombre d'agents).",
        "Certaines facturent en plus des frais de connexion par numéro.",
        "Méfiance : des prestataires facturent jusqu'à 1 000 € la création de compte… qui prend dix minutes.",
        "Intégration sur mesure (agence) : un coût d'installation unique, puis vous payez seulement Meta.",
      ]},
      { type: "h2", text: "App gratuite vs API : ne pas payer pour rien" },
      { type: "p", text: "Si vous avez juste besoin de répondre manuellement depuis un téléphone, l'application WhatsApp Business gratuite suffit. L'API ne se justifie que si vous voulez automatiser (chatbot, relances), connecter vos outils (site, CRM, Lead Ads) ou gérer plusieurs agents. Payer une API pour un usage manuel, c'est de l'argent jeté." },
      { type: "cta", text: "Vous voulez une intégration sans abonnement caché, où vous ne payez que Meta ?", href: "/services/whatsapp-business", label: "Voir notre offre d'intégration WhatsApp Business" },
      { type: "h2", text: "Combien prévoir, concrètement ?" },
      { type: "p", text: "Pour une PME type : un coût d'intégration unique (à partir de quelques centaines d'euros pour une config propre), puis 10 à 50 €/mois de conversations Meta. Le vrai retour sur investissement vient de l'automatisation : un message WhatsApp envoyé dans la seconde à un lead Facebook convertit 3 à 5 fois mieux qu'un email. C'est ce gain qui rembourse l'installation, généralement en quelques semaines." },
    ],
  },
  {
    slug: "deduplication-evenements-pixel-capi",
    title: "Déduplication d'événements Pixel / CAPI : pourquoi et comment",
    description:
      "Sans déduplication, Meta compte vos conversions deux fois et fausse vos chiffres. Voici comment fonctionne l'event_id et comment dédupliquer proprement Pixel et Conversions API.",
    date: "2026-06-03",
    readingTime: "6 min",
    category: "Tracking & Data",
    keywords: [
      "déduplication événements Pixel Meta",
      "event_id Pixel Conversions API",
      "doublons conversions Facebook",
      "Pixel et CAPI en même temps",
    ],
    related: [
      { href: "/services/tracking-conformite", label: "Tracking & Conformité RGPD" },
      { href: "/services/marketing-digital", label: "Marketing Digital" },
    ],
    content: [
      { type: "p", text: "Quand on met en place la Conversions API (CAPI) en complément du Pixel, on envoie le même achat deux fois à Meta : une fois depuis le navigateur, une fois depuis le serveur. Sans déduplication, Meta compte deux conversions au lieu d'une. Résultat : des chiffres gonflés, un ROAS faussé, et des décisions de budget prises sur de mauvaises données." },
      { type: "h2", text: "Pourquoi envoyer l'événement deux fois ?" },
      { type: "p", text: "Ce n'est pas une erreur, c'est volontaire. Le Pixel (navigateur) capte le contexte (cookies, comportement) mais perd des événements à cause d'iOS et des bloqueurs. La CAPI (serveur) est fiable mais a moins de contexte. En envoyant les deux, on maximise la couverture. Mais il faut alors dire à Meta que c'est le même événement." },
      { type: "h2", text: "La clé : l'event_id" },
      { type: "p", text: "La déduplication repose sur deux paramètres que Meta compare : l'event_name (ex. Purchase) et surtout l'event_id, un identifiant unique partagé entre le Pixel et la CAPI pour un même événement." },
      { type: "ul", items: [
        "On génère un event_id unique côté serveur (ou côté client) pour chaque événement.",
        "Le Pixel envoie l'événement avec cet event_id.",
        "La CAPI envoie le même événement avec le MÊME event_id.",
        "Meta voit deux signaux portant le même event_id → il les fusionne et n'en compte qu'un.",
      ]},
      { type: "h2", text: "Les pièges classiques" },
      { type: "ul", items: [
        "Générer l'event_id à deux endroits différents (Pixel et serveur indépendamment) → les ID ne correspondent pas → pas de dédup.",
        "Oublier d'envoyer le même event_name des deux côtés.",
        "Une fenêtre de déduplication dépassée (Meta déduplique sur une période limitée).",
        "Confondre event_id et external_id : l'external_id sert au matching d'utilisateur, pas à la déduplication.",
      ]},
      { type: "cta", text: "Vous voulez une CAPI sans doublons, vérifiée dans le gestionnaire d'événements ?", href: "/services/tracking-conformite", label: "Voir notre offre Tracking & Conformité" },
      { type: "h2", text: "Comment vérifier que ça marche" },
      { type: "p", text: "Dans le gestionnaire d'événements Meta, chaque événement affiche le nombre reçu par le navigateur, par le serveur, et le pourcentage dédupliqué. Une intégration propre montre un taux de déduplication élevé : Meta reçoit bien les deux signaux mais ne compte qu'une conversion. Si vous voyez vos conversions doubler après l'ajout de la CAPI, c'est le signal d'une déduplication absente ou cassée — à corriger en priorité avant d'optimiser quoi que ce soit." },
    ],
  },
  {
    slug: "securiser-application-nextjs-checklist",
    title: "Sécuriser une application Next.js : la checklist 2026",
    description:
      "Les points de sécurité essentiels d'une app Next.js en production : headers, CSP, protection des routes, validation des uploads, secrets et webhooks. Checklist actionnable.",
    date: "2026-06-03",
    readingTime: "7 min",
    category: "Sécurité Web",
    keywords: [
      "sécuriser application Next.js",
      "sécurité Next.js production",
      "protéger routes admin Next.js",
      "headers sécurité Next.js",
    ],
    related: [
      { href: "/services/securite-web", label: "Sécurité Web (audit & hardening)" },
      { href: "/services/creation-site-web", label: "Création site web" },
    ],
    content: [
      { type: "p", text: "Next.js est performant et agréable à développer, mais une app mise en production sans durcissement laisse souvent des portes ouvertes : routes admin accessibles, secrets exposés, uploads non validés, headers manquants. Voici la checklist qu'on applique avant chaque mise en ligne." },
      { type: "h2", text: "1. Les headers de sécurité" },
      { type: "p", text: "Ce sont les fondations, faciles à oublier. À configurer (via next.config ou un middleware) :" },
      { type: "ul", items: [
        "Strict-Transport-Security (HSTS) : force le HTTPS.",
        "X-Frame-Options / frame-ancestors : empêche le clickjacking.",
        "X-Content-Type-Options: nosniff.",
        "Referrer-Policy et Permissions-Policy pour limiter les fuites et les accès (caméra, micro, géoloc).",
      ]},
      { type: "h2", text: "2. La Content Security Policy (CSP)" },
      { type: "p", text: "La CSP est votre meilleure défense contre les attaques XSS (injection de scripts). L'idéal en Next.js est une CSP stricte avec nonce généré par requête, plutôt qu'un fourre-tout en unsafe-inline. C'est un sujet à part entière — on lui consacre un guide dédié." },
      { type: "h2", text: "3. La protection des routes et des API" },
      { type: "ul", items: [
        "Vérifier l'authentification ET les autorisations côté serveur (jamais seulement masquer un bouton côté client).",
        "Contrôler le rôle de l'utilisateur sur chaque route sensible (un user ne doit pas atteindre une route admin).",
        "Utiliser des identifiants non devinables (UUID plutôt que des ID séquentiels) pour éviter l'énumération.",
        "Limiter le débit (rate limiting) sur les endpoints sensibles : login, contact, paiement.",
      ]},
      { type: "h2", text: "4. La validation des uploads" },
      { type: "p", text: "Ne faites jamais confiance à l'extension ou au type déclaré d'un fichier. On vérifie les magic bytes (la vraie signature binaire du fichier), on limite la taille, et on stocke les fichiers hors du dossier servi publiquement quand c'est possible." },
      { type: "h2", text: "5. Les secrets et les webhooks" },
      { type: "ul", items: [
        "Aucun secret côté client : seules les variables NEXT_PUBLIC_ sont exposées au navigateur — n'y mettez jamais de clé sensible.",
        "Vérifier la signature des webhooks entrants (Stripe, Meta…) avant de traiter la requête.",
        "Si un secret a fui dans l'historique Git, le considérer comme compromis et le faire tourner.",
      ]},
      { type: "cta", text: "Vous voulez un audit de sécurité complet de votre app Next.js ?", href: "/services/securite-web", label: "Voir notre offre Sécurité Web" },
      { type: "h2", text: "En résumé" },
      { type: "p", text: "La sécurité d'une app Next.js n'est pas une fonctionnalité qu'on ajoute à la fin, c'est une hygiène : headers, CSP, autorisations serveur, validation des entrées, gestion des secrets. Chacun de ces points est simple pris isolément ; c'est leur absence cumulée qui crée les incidents. La bonne nouvelle : une fois en place, ça protège durablement." },
    ],
  },
  {
    slug: "content-security-policy-nonce-nextjs",
    title: "Content Security Policy avec nonce : le guide Next.js",
    description:
      "Pourquoi une CSP stricte avec nonce protège vraiment des attaques XSS, et comment la mettre en place dans Next.js sans casser vos scripts ni vos styles.",
    date: "2026-06-03",
    readingTime: "6 min",
    category: "Sécurité Web",
    keywords: [
      "Content Security Policy nonce",
      "CSP Next.js",
      "mise en place Content Security Policy",
      "protéger site XSS",
    ],
    related: [
      { href: "/services/securite-web", label: "Sécurité Web (audit & hardening)" },
      { href: "/services/creation-site-web", label: "Création site web" },
    ],
    content: [
      { type: "p", text: "La Content Security Policy (CSP) est l'un des remparts les plus efficaces contre les attaques XSS, qui restent parmi les plus courantes sur le web. Mais une CSP mal configurée ne protège de rien — ou casse votre site. Le bon réglage en Next.js passe par le nonce." },
      { type: "h2", text: "Ce qu'est une CSP (et contre quoi elle protège)" },
      { type: "p", text: "La CSP est un en-tête HTTP qui dit au navigateur quelles ressources il a le droit d'exécuter : quels scripts, styles, images, domaines. Si un attaquant parvient à injecter un script malveillant dans votre page (XSS), une CSP stricte empêche le navigateur de l'exécuter, car il ne fait pas partie des sources autorisées." },
      { type: "h2", text: "Le piège du unsafe-inline" },
      { type: "p", text: "La tentation, pour que tout fonctionne vite, est d'autoriser script-src 'unsafe-inline'. Mais ça revient à laisser la porte grande ouverte : n'importe quel script inline injecté s'exécutera. Une CSP avec unsafe-inline donne l'illusion d'être protégé sans l'être. C'est là que le nonce entre en jeu." },
      { type: "h2", text: "La solution : le nonce par requête" },
      { type: "p", text: "Un nonce est une valeur aléatoire, unique à chaque chargement de page. Le principe :" },
      { type: "ul", items: [
        "À chaque requête, le serveur génère un nonce aléatoire.",
        "Il l'ajoute à l'en-tête CSP (script-src 'nonce-XXXX').",
        "Seuls les scripts portant l'attribut nonce=\"XXXX\" sont exécutés.",
        "Un script injecté par un attaquant n'a pas le bon nonce → le navigateur le bloque.",
      ]},
      { type: "h2", text: "La mise en place dans Next.js" },
      { type: "p", text: "En pratique, on génère le nonce dans le middleware Next.js, on le transmet via les en-têtes, et Next.js l'applique automatiquement à ses propres scripts. Les points d'attention :" },
      { type: "ul", items: [
        "Générer le nonce dans le middleware et le propager (header de requête).",
        "Construire la CSP avec ce nonce pour script-src et, idéalement, style-src.",
        "Tester chaque page : les scripts tiers (analytics, pixels) doivent être whitelistés proprement.",
        "Surveiller la console : les violations CSP y sont rapportées pendant la phase de réglage.",
      ]},
      { type: "cta", text: "Vous voulez une CSP stricte qui protège sans casser votre site ?", href: "/services/securite-web", label: "Voir notre offre Sécurité Web" },
      { type: "h2", text: "Le bon réflexe" },
      { type: "p", text: "Une CSP se déploie progressivement : on commence souvent en mode report-only (qui signale les violations sans bloquer), on ajuste jusqu'à ce qu'il n'y ait plus de faux positifs, puis on passe en mode bloquant. C'est cette méthode qui permet d'avoir une politique stricte ET un site qui fonctionne — l'objectif final étant une CSP sans unsafe-inline, basée sur le nonce." },
    ],
  },
  {
    slug: "migration-wordpress-nextjs-seo",
    title: "Migrer de WordPress à Next.js sans perdre son SEO",
    description:
      "Une migration WordPress vers Next.js peut faire chuter votre trafic… ou le booster. La méthode pour tout migrer en préservant (et améliorant) votre référencement.",
    date: "2026-06-03",
    readingTime: "7 min",
    category: "SEO & Web",
    keywords: [
      "migration WordPress Next.js SEO",
      "refonte site sans perdre référencement",
      "redirections 301 migration",
      "passer de WordPress à Next.js",
    ],
    related: [
      { href: "/services/seo", label: "SEO Technique" },
      { href: "/services/creation-site-web", label: "Création site web" },
    ],
    content: [
      { type: "p", text: "Passer de WordPress à Next.js apporte un gain énorme en performance, en sécurité et en flexibilité. Mais une migration bâclée est la première cause de chute de trafic SEO : URLs changées sans redirection, pages perdues, balises oubliées. La bonne nouvelle, c'est que bien menée, une migration peut au contraire faire grimper votre référencement." },
      { type: "h2", text: "Pourquoi le trafic chute après une refonte" },
      { type: "ul", items: [
        "Les URLs changent et les anciennes renvoient des 404 → Google perd vos pages bien classées.",
        "Des pages existantes ne sont pas reportées sur le nouveau site.",
        "Les balises title, meta et les données structurées (Schema.org) sont oubliées.",
        "Le sitemap et le fichier robots ne sont pas mis à jour.",
      ]},
      { type: "h2", text: "Étape 1 : cartographier l'existant" },
      { type: "p", text: "Avant de toucher à quoi que ce soit, on liste toutes les URLs actuelles et leurs positions : export du sitemap WordPress, données de Google Search Console (quelles pages apportent du trafic, sur quels mots-clés). On sait alors précisément ce qu'on ne doit surtout pas perdre." },
      { type: "h2", text: "Étape 2 : le plan de redirections 301" },
      { type: "p", text: "C'est le cœur de la migration. Chaque ancienne URL doit pointer, via une redirection 301 (permanente), vers son équivalent sur le nouveau site. La 301 transmet l'essentiel de l'autorité SEO de l'ancienne page à la nouvelle." },
      { type: "ul", items: [
        "Mapping ancien → nouveau, URL par URL (pas une redirection globale vers l'accueil).",
        "Redirections 301 en masse implémentées dans Next.js (next.config ou middleware).",
        "Vérification : aucune ancienne URL ne doit renvoyer un 404.",
      ]},
      { type: "h2", text: "Étape 3 : préserver et améliorer le on-page" },
      { type: "ul", items: [
        "Reporter (et améliorer) les balises title et meta description.",
        "Réimplémenter les données structurées Schema.org (Article, FAQ, Breadcrumb…), souvent mieux qu'avec un plugin WordPress.",
        "Générer un sitemap.xml dynamique et un robots.txt propres.",
        "Soigner les Core Web Vitals : c'est justement là que Next.js fait gagner des places.",
      ]},
      { type: "cta", text: "Vous migrez depuis WordPress et vous ne voulez perdre aucun classement ?", href: "/services/seo", label: "Voir notre offre SEO & récupération de trafic" },
      { type: "h2", text: "Étape 4 : après la mise en ligne" },
      { type: "p", text: "Le jour J, on soumet le nouveau sitemap dans Search Console, on demande l'indexation des pages clés, et on surveille le rapport de couverture pour détecter d'éventuelles 404 résiduelles. Sur des migrations bien faites, non seulement le trafic est préservé, mais les gains de vitesse et la propreté technique de Next.js font souvent remonter les positions dans les semaines qui suivent." },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
