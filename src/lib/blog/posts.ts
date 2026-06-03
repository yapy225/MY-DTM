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
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
