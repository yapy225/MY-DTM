// Source de verite des guides premium (page web gratuite SEO + produits payants).
// Ajouter un objet ici cree automatiquement la page /guides/<slug>, l'entree
// dans /guides, le sitemap, et cable le tunnel de paiement Stripe.

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

// Un produit payant attache a un guide. `type` decide de la livraison :
//   - "pdf" : email Resend + lien de telechargement signe (l'ebook)
//   - "cal" : email Resend + lien de reservation Cal.com (l'accompagnement)
export type GuideProduct = {
  id: string; // identifiant stable, utilise dans Stripe metadata + token
  type: "pdf" | "cal";
  name: string;
  price: number; // prix affiche en euros
  priceCents: number; // montant envoye a Stripe (centimes)
  tagline: string;
  includes: string[];
  cta: string;
  featured?: boolean;
  file?: string; // pour type "pdf" : nom du fichier dans private/ebooks/
};

export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string; // titre SEO (balise title / h1)
  description: string; // meta description
  date: string; // ISO YYYY-MM-DD
  readingTime: string;
  category: string;
  keywords: string[];
  eyebrow: string; // sur-titre du hero
  intro: string; // chapeau sous le h1
  content: Block[]; // le contenu GRATUIT et indexable (le "pourquoi")
  products: GuideProduct[]; // les offres payantes (le "comment, cle en main")
  faq: GuideFaq[]; // questions/reponses (SEO + schema FAQ)
  relatedService: { href: string; label: string }; // l'offre de delegation (3e carte)
};

export const GUIDES: Guide[] = [
  {
    slug: "automatiser-reseaux-sociaux",
    title: "Automatiser ses réseaux sociaux : le guide complet (2026)",
    description:
      "Comment automatiser ses posts sur Instagram, Facebook et LinkedIn sans perdre en authenticité : les outils, le calendrier éditorial, les erreurs à éviter.",
    date: "2026-06-03",
    readingTime: "9 min",
    category: "Automatisation",
    keywords: [
      "automatiser ses réseaux sociaux",
      "automatiser ses posts Instagram",
      "outil automatisation réseaux sociaux",
      "calendrier éditorial automatisé",
      "programmer ses posts automatiquement",
    ],
    eyebrow: "Guide premium",
    intro:
      "Publier tous les jours sur Instagram, Facebook et LinkedIn sans y passer ses soirées, c'est possible — à condition d'automatiser intelligemment, pas bêtement. Voici la méthode complète, les outils qui valent vraiment le coup, et le système exact que nous installons chez nos clients.",
    content: [
      { type: "p", text: "La plupart des entrepreneurs abandonnent leurs réseaux sociaux au bout de trois semaines. Pas par manque d'idées, mais parce que publier manuellement chaque jour est un travail à temps plein. L'automatisation résout ça — mais mal utilisée, elle transforme votre marque en robot que personne ne suit. L'enjeu est de trouver l'équilibre : automatiser la mécanique (la publication, la programmation, le recyclage) tout en gardant l'humain là où il compte (les réponses, les histoires, les moments forts)." },

      { type: "h2", text: "Ce qu'on peut automatiser — et ce qu'on ne doit jamais automatiser" },
      { type: "p", text: "Tout ne se vaut pas. Certaines tâches gagnent à être 100 % automatisées, d'autres ruinent votre crédibilité si vous les déléguez à une machine." },
      { type: "ul", items: [
        "À automatiser sans hésiter : la programmation des posts, le recyclage des contenus performants, la publication multi-plateformes, les rapports de statistiques, la veille.",
        "À semi-automatiser : la génération de légendes et de visuels (l'IA propose, vous validez), les réponses aux questions fréquentes (réponses suggérées).",
        "À ne JAMAIS automatiser : les réponses aux commentaires sensibles, les messages privés personnels, les prises de position, la gestion d'un bad buzz.",
      ]},
      { type: "p", text: "La règle est simple : automatisez la distribution, jamais la conversation. Les algorithmes d'Instagram et de LinkedIn détectent et pénalisent les comportements 100 % robotisés (likes automatiques, commentaires génériques). Un compte qui automatise tout finit shadowban." },

      { type: "h2", text: "Les 5 piliers d'une présence automatisée qui tient dans le temps" },
      { type: "p", text: "Un système d'automatisation durable repose sur cinq briques qui s'enchaînent. Chacune élimine un point de friction qui, autrement, vous ferait décrocher." },
      { type: "ul", items: [
        "1. Le calendrier éditorial : décider à l'avance QUOI publier et QUAND. Sans lui, l'automatisation n'a rien à distribuer.",
        "2. La banque de contenus : produire en lot (batch) une fois par mois plutôt qu'au jour le jour.",
        "3. La programmation multi-plateformes : un seul outil qui publie partout au bon format et au bon moment.",
        "4. Le recyclage : republier automatiquement vos meilleurs contenus, adaptés, plutôt que de toujours repartir de zéro.",
        "5. La mesure : un rapport automatique qui vous dit ce qui marche, pour produire plus de ce qui fonctionne.",
      ]},

      { type: "h2", text: "Les outils du marché, comparés sans langue de bois" },
      { type: "p", text: "Il existe des dizaines d'outils. Dans la pratique, trois familles couvrent 95 % des besoins, selon votre niveau et votre budget." },
      { type: "ul", items: [
        "Les programmateurs simples (Metricool, Buffer, Later) : parfaits pour démarrer. Vous programmez, ils publient. Comptez 0 à 25 €/mois. Idéal pour une PME ou un indépendant.",
        "Les plateformes tout-en-un (Metricool Premium, Hootsuite) : ajoutent les rapports, la boîte de réception unifiée et la collaboration. 25 à 100 €/mois.",
        "Les moteurs d'automatisation (Make, n8n) : pour aller plus loin — connecter votre blog, votre boutique, votre CRM et déclencher des publications automatiquement. Plus technique, mais sans limite. C'est là qu'on construit les vrais systèmes sur-mesure.",
      ]},
      { type: "p", text: "Notre recommandation pour 90 % des entreprises : démarrer avec Metricool (gratuit, puis ~18 €/mois) pour la programmation et les stats, et brancher Make par-dessus dès que vous voulez automatiser la création de contenu (ex. : un nouvel article de blog déclenche automatiquement trois posts adaptés à chaque réseau)." },

      { type: "h2", text: "L'IA dans la boucle : générer sans sonner faux" },
      { type: "p", text: "L'IA accélère énormément la production de légendes, d'idées et de visuels. Mais un texte d'IA brut se repère à des kilomètres et fait fuir votre audience. La bonne méthode : utiliser l'IA comme premier jet, avec des prompts qui intègrent VOTRE ton, vos expressions, vos cas concrets — puis toujours relire et personnaliser. L'IA fait gagner 70 % du temps de rédaction, pas 100 %." },

      { type: "h2", text: "Les erreurs qui font échouer 80 % des automatisations" },
      { type: "ul", items: [
        "Programmer un mois de posts puis disparaître : l'automatisation distribue, elle ne dialogue pas. Il faut revenir répondre aux commentaires.",
        "Le même contenu identique partout : un post LinkedIn n'est pas un post Instagram. L'outil publie partout, mais le format doit être adapté.",
        "Oublier de mesurer : automatiser sans regarder les chiffres, c'est répéter ses erreurs plus vite.",
        "Tout miser sur un outil propriétaire fragile : privilégiez des briques que vous contrôlez (votre calendrier, vos contenus exportables).",
        "Croire que l'automatisation remplace la stratégie : un mauvais contenu automatisé reste un mauvais contenu, diffusé plus souvent.",
      ]},

      { type: "h2", text: "Par où commencer concrètement" },
      { type: "p", text: "La première semaine, ne cherchez pas la perfection. Choisissez un seul outil de programmation, bloquez 2 heures pour produire 10 posts en lot, programmez-les sur deux semaines, et observez. Une fois ce socle en place, vous ajoutez le recyclage, puis l'IA pour la production, puis les automatisations avancées. C'est exactement ce parcours, étape par étape, avec les modèles prêts à l'emploi, que nous avons condensé dans le guide ci-dessous." },
    ],
    products: [
      {
        id: "ebook-reseaux-sociaux",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "Le système clé en main pour automatiser vos réseaux en 1 week-end.",
        includes: [
          "Le calendrier éditorial 30 jours prêt à l'emploi (à dupliquer)",
          "50+ templates de posts à copier-coller (Instagram, Facebook, LinkedIn)",
          "La configuration pas-à-pas de Metricool + Make (captures d'écran)",
          "Les prompts IA pour générer légendes et visuels sans sonner faux",
          "La checklist de mise en route en 7 étapes",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "automatiser-reseaux-sociaux.pdf",
      },
      {
        id: "accompagnement-reseaux-sociaux",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On installe votre système ensemble, en direct, sur vos comptes.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On configure VOTRE outil d'automatisation ensemble (Metricool / Make)",
          "On adapte le calendrier 30 jours à votre activité",
          "On programme vos premiers posts en direct",
          "L'ebook complet inclus",
          "Vous repartez avec la machine qui tourne",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Faut-il des compétences techniques pour automatiser ses réseaux sociaux ?", a: "Non pour la programmation de posts (Metricool, Buffer sont accessibles à tous). Oui, un peu, pour les automatisations avancées avec Make ou n8n — mais l'ebook détaille chaque étape avec des captures, et l'accompagnement le fait avec vous." },
      { q: "L'automatisation est-elle pénalisée par Instagram ou LinkedIn ?", a: "Programmer ses publications via un outil officiel n'est pas pénalisé. Ce qui l'est, ce sont les faux engagements automatiques (likes/commentaires robotisés). Notre méthode automatise uniquement la distribution, jamais la conversation." },
      { q: "Combien de temps pour mettre en place le système ?", a: "Le socle (outil + calendrier + premiers posts) se met en place en un week-end avec l'ebook. L'accompagnement de 90 min permet d'avoir tout opérationnel le jour même." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète et les modèles à appliquer vous-même. L'accompagnement, c'est la même chose mais on le fait avec vous en visio, sur vos propres comptes, adapté à votre activité — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/automatisation", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "vendre-avec-whatsapp",
    title: "Vendre avec WhatsApp Business : le guide complet (2026)",
    description:
      "Comment transformer WhatsApp Business en machine à vendre : profil, catalogue, messages automatiques, pipeline et tunnel de conversation qui convertit.",
    date: "2026-06-04",
    readingTime: "8 min",
    category: "WhatsApp Business",
    keywords: [
      "vendre avec WhatsApp Business",
      "WhatsApp Business pour vendre",
      "automatiser WhatsApp Business",
      "tunnel de vente WhatsApp",
      "catalogue WhatsApp Business",
    ],
    eyebrow: "Guide premium",
    intro:
      "WhatsApp est le canal le plus lu au monde : plus de 90 % d'ouverture, en temps réel. Bien structuré, il devient votre meilleur vendeur. Voici la méthode complète — et l'ebook clé en main pour l'appliquer dès ce week-end.",
    content: [
      { type: "p", text: "La plupart des entrepreneurs utilisent WhatsApp comme une simple messagerie : ils répondent au coup par coup, le soir, sans structure. Résultat : des prospects qui attendent, des « c'est combien ? » sans suite, et des ventes qui filent chez le concurrent qui a répondu plus vite. Pourtant, avec un peu de méthode, WhatsApp devient un véritable tunnel de vente." },
      { type: "h2", text: "Pourquoi WhatsApp convertit mieux que tout le reste" },
      { type: "p", text: "Là où un email s'ouvre à 20 %, un message WhatsApp s'ouvre à plus de 90 % et se lit dans les minutes qui suivent. On y parle comme à un vrai vendeur : instantané, humain, multimédia. C'est le canal idéal pour transformer un prospect en client — surtout quand il arrive d'une publicité." },
      { type: "h2", text: "Les 5 piliers d'un WhatsApp qui vend" },
      { type: "ul", items: [
        "Un profil professionnel qui inspire confiance (numéro dédié, logo, description, horaires).",
        "Un catalogue qui affiche vos offres et leurs prix — le client se qualifie tout seul.",
        "Des messages automatiques (accueil, absence, réponses rapides) pour ne jamais laisser un prospect sans réponse.",
        "Un pipeline avec étiquettes pour suivre chaque prospect (nouveau, devis envoyé, attente paiement, client).",
        "Un tunnel de conversation en 5 temps : accueillir, qualifier, présenter, lever l'objection, closer.",
      ]},
      { type: "h2", text: "L'erreur n°1 : ne jamais relancer" },
      { type: "p", text: "80 % des ventes demandent un suivi. Filtrer chaque soir les conversations « devis envoyé » et « attente paiement », puis envoyer une relance simple, récupère 20 à 30 % des indécis. C'est souvent ce seul réflexe qui double les ventes — sans changer le trafic." },
      { type: "p", text: "Tout le système, étape par étape, avec les modèles de messages prêts à coller, est détaillé dans l'ebook ci-dessous." },
    ],
    products: [
      {
        id: "ebook-whatsapp",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "Le système clé en main pour faire de WhatsApp votre meilleur vendeur.",
        includes: [
          "Profil, catalogue et messages automatiques pas-à-pas",
          "Le pipeline à étiquettes pour ne perdre aucun prospect",
          "Le tunnel de conversation en 5 temps (avec dialogue complet)",
          "15 templates de messages de vente à copier-coller",
          "Les règles RGPD & consentement pour ne pas se faire bannir",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "vendre-avec-whatsapp.pdf",
      },
      {
        id: "accompagnement-whatsapp",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On configure votre WhatsApp de vente ensemble, en direct.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On met en place VOTRE profil, catalogue et messages automatiques",
          "On crée vos étiquettes et votre tunnel de vente",
          "On adapte vos templates à votre activité",
          "L'ebook complet inclus",
          "Vous repartez avec une machine à vendre opérationnelle",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Faut-il l'API WhatsApp pour vendre ?", a: "Non. L'application WhatsApp Business gratuite suffit pour tout ce qui est dans ce guide (profil, catalogue, messages auto, étiquettes). L'API ne devient utile que pour industrialiser de gros volumes." },
      { q: "WhatsApp peut-il bannir mon numéro ?", a: "Oui, si vous envoyez des messages non sollicités à des inconnus. La méthode reste sur des échanges initiés par le client et des relances à des contacts consentants — aucun risque." },
      { q: "Combien de temps pour voir des résultats ?", a: "Dès la première semaine : une meilleure réactivité et des relances systématiques augmentent les ventes sur le même trafic. L'accompagnement de 90 min permet de tout mettre en place le jour même." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète et les 15 templates à appliquer vous-même. L'accompagnement, c'est la même chose mais on le fait avec vous en visio, sur votre compte, adapté à votre activité — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/whatsapp-business", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "publicite-facebook-instagram",
    title: "La Publicité Facebook & Instagram : le guide complet (2026)",
    description:
      "Lancer des campagnes Facebook et Instagram qui vendent, même avec un petit budget : objectifs, Pixel, click-to-WhatsApp, KPI, audiences et retargeting.",
    date: "2026-06-04",
    readingTime: "9 min",
    category: "Marketing digital",
    keywords: [
      "publicité Facebook Instagram",
      "campagne Facebook Ads débutant",
      "publicité Facebook petit budget",
      "campagne click to WhatsApp",
      "Meta Ads entrepreneur",
    ],
    eyebrow: "Guide premium",
    intro:
      "La plupart des entrepreneurs « boostent » une publication, dépensent 50 € et ne voient rien venir. Le problème n'est presque jamais le budget — c'est la méthode. Voici comment dépenser moins et vendre plus avec les Meta Ads, et l'ebook pour l'appliquer.",
    content: [
      { type: "p", text: "Facebook et Instagram restent la plateforme publicitaire la plus accessible pour un entrepreneur : on démarre dès quelques euros par jour, avec un ciblage précis, et une seule campagne tourne sur les deux réseaux. Mais sans méthode, on brûle son budget. La bonne nouvelle : la rentabilité se construit, étape par étape." },
      { type: "h2", text: "Booster une publication ne suffit pas" },
      { type: "p", text: "Booster est simple mais limité : ciblage basique, objectifs réduits, mesure sommaire. Pour vendre sérieusement, on crée une vraie campagne dans le Business Manager, avec le bon objectif, une audience pensée, et des créas qu'on teste. C'est là que se joue la rentabilité." },
      { type: "h2", text: "La campagne la plus rentable pour démarrer : click-to-WhatsApp" },
      { type: "p", text: "Plutôt que d'envoyer les gens sur un site où ils repartent, la campagne « click-to-WhatsApp » ouvre directement une conversation dans votre WhatsApp. Le prospect arrive prêt à parler, et vous le convertissez en direct. C'est le pont parfait entre la publicité et la vente." },
      { type: "h2", text: "Ce qui fait (ou défait) une campagne" },
      { type: "ul", items: [
        "Le bon objectif : il dit à l'algorithme qui chercher (Messages pour vendre via WhatsApp).",
        "La créa : les 3 premières secondes ou la première ligne doivent stopper le scroll.",
        "Les placements : prévoyez du vertical (Stories, Reels) — souvent le moins cher.",
        "Les KPI : CTR, coût par conversation, coût par vente, ROAS — on garde ce qui marche, on coupe le reste.",
        "Les audiences : froid pour découvrir, retargeting pour convertir ceux qui vous connaissent déjà.",
      ]},
      { type: "p", text: "La méthode complète — du compte publicitaire au scaling, avec les seuils chiffrés et les prompts IA — est détaillée dans l'ebook ci-dessous." },
    ],
    products: [
      {
        id: "ebook-publicite-meta",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "La méthode des Meta Ads pour vendre avec un petit budget.",
        includes: [
          "Business Manager, compte publicitaire et Pixel pas-à-pas",
          "La campagne click-to-WhatsApp qui convertit, étape par étape",
          "Objectifs, budgets et tunnel froid → tiède → chaud",
          "Les KPI à suivre et leurs seuils + le diagnostic par symptôme",
          "Audiences, retargeting, lookalike, A/B et scaling",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "publicite-facebook-instagram.pdf",
      },
      {
        id: "accompagnement-publicite-meta",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On lance votre première campagne ensemble, en direct.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On crée votre Business Manager, votre Pixel et votre compte publicitaire",
          "On monte votre première campagne click-to-WhatsApp",
          "On prépare créa, ciblage et budget adaptés à votre activité",
          "L'ebook complet inclus",
          "Vous repartez avec une campagne en ligne",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Quel budget pour commencer la publicité Facebook ?", a: "5 à 10 € par jour suffisent pour tester et apprendre. L'important n'est pas la taille du budget mais la régularité et la lecture des résultats : tant que le coût par vente reste sous votre marge, vous pouvez continuer et augmenter." },
      { q: "Faut-il un site web ?", a: "Non pour la campagne click-to-WhatsApp, qui envoie directement dans votre messagerie. Un site avec Pixel devient utile pour les campagnes Conversions, quand vous vendez depuis une page de vente." },
      { q: "Combien de temps avant d'avoir des résultats ?", a: "Laissez 3 à 5 jours d'apprentissage avant de juger une campagne. On décide ensuite sur la tendance, pas sur une seule journée." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète à appliquer vous-même. L'accompagnement, c'est la même chose mais on crée la campagne avec vous, en direct, sur votre compte — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/marketing-digital", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "referencement-naturel-seo",
    title: "Le référencement naturel (SEO) : le guide complet (2026)",
    description:
      "Comment faire venir des clients depuis Google sans payer la publicité : mots-clés, optimisation des pages, SEO technique, contenu, local et netlinking.",
    date: "2026-06-05",
    readingTime: "9 min",
    category: "SEO",
    keywords: [
      "référencement naturel",
      "guide SEO débutant",
      "SEO pour entrepreneur",
      "comment être premier sur Google",
      "améliorer son référencement Google",
    ],
    eyebrow: "Guide premium",
    intro:
      "La publicité s'arrête le jour où vous arrêtez de payer. Le référencement naturel, lui, vous amène des clients tous les jours, gratuitement, pendant des mois. Voici la méthode SEO complète pour entrepreneurs — et l'ebook pour l'appliquer.",
    content: [
      { type: "p", text: "Apparaître en haut de Google quand un client cherche ce que vous vendez, c'est récupérer un prospect chaud sans avoir misé un centime de publicité. C'est exactement ce que permet le référencement naturel (SEO). Mais beaucoup d'entrepreneurs s'y perdent ou abandonnent trop tôt. Voici la méthode claire, par étapes." },
      { type: "h2", text: "Les 3 piliers que Google évalue" },
      { type: "p", text: "Google cherche la meilleure réponse à chaque recherche. Pour décider du classement, il regarde trois choses : la technique (peut-il accéder et lire votre page ?), le contenu (répond-il vraiment à la recherche ?) et la popularité (les autres sites vous font-ils confiance ?). Un bon SEO travaille les trois en équilibre." },
      { type: "h2", text: "Tout commence par les mots-clés" },
      { type: "p", text: "Inutile de viser des mots trop larges et ultra-concurrentiels. Visez la longue traîne : des expressions précises de 3 à 5 mots, avec une intention claire. Moins de volume, mais moins de concurrence et un visiteur qui convertit mieux. L'autocomplétion de Google et le bloc « Autres questions posées » sont une mine de mots-clés réels et gratuits." },
      { type: "h2", text: "Optimiser une page : la check-list" },
      { type: "ul", items: [
        "Une balise title accrocheuse avec le mot-clé au début.",
        "Une meta description qui donne envie de cliquer.",
        "Un seul H1, des sous-titres structurés, une URL courte et lisible.",
        "Un contenu qui répond complètement à l'intention, avec vos exemples et votre expérience.",
        "Des images compressées avec attribut alt, et un maillage interne vers vos autres pages.",
      ]},
      { type: "h2", text: "Mesurer pour progresser" },
      { type: "p", text: "Sans Google Search Console, le SEO se fait à l'aveugle. C'est votre tableau de bord gratuit : pages indexées, impressions, clics, position moyenne, requêtes réelles. Le gain le plus rapide ? Améliorer les pages déjà en position 8-15 pour les faire grimper dans le top 10." },
      { type: "p", text: "La méthode complète — technique, contenu, SEO local, netlinking et un plan d'action sur 90 jours — est détaillée dans l'ebook ci-dessous." },
    ],
    products: [
      {
        id: "ebook-seo",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "La méthode SEO clé en main pour faire de Google une source de clients.",
        includes: [
          "Les 3 piliers du classement Google expliqués simplement",
          "La recherche de mots-clés & l'intention de recherche",
          "Les check-lists on-page et SEO technique",
          "Le contenu qui ranke (sans sonner IA) + le maillage interne",
          "Le SEO local, le netlinking et un plan d'action 90 jours",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "referencement-naturel-seo.pdf",
      },
      {
        id: "accompagnement-seo",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On bâtit votre plan SEO ensemble, sur votre site.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On vérifie votre Search Console et votre indexation",
          "On identifie vos mots-clés prioritaires",
          "On optimise vos pages clés en direct",
          "L'ebook complet inclus",
          "Vous repartez avec un plan d'action SEO sur-mesure",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Combien de temps pour voir des résultats en SEO ?", a: "Comptez 2 à 3 mois pour les premiers signes, et 6 à 12 mois pour une vraie traction. Le SEO est un marathon : ceux qui tiennent gagnent une source de clients durable et quasi gratuite." },
      { q: "Faut-il payer des outils coûteux ?", a: "Non pour démarrer. Google Search Console, Google Analytics et les suggestions de Google sont gratuits et suffisent à mener l'essentiel du travail décrit dans l'ebook." },
      { q: "Le SEO remplace-t-il la publicité ?", a: "Il la complète. La publicité amorce vite, le SEO construit le long terme et réduit votre dépendance à la pub. L'idéal est de mener les deux en parallèle." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète à appliquer vous-même. L'accompagnement, c'est la même chose mais on vérifie votre site, on identifie vos mots-clés et on optimise vos pages avec vous — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/seo", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "creer-site-web-qui-vend",
    title: "Créer un site web qui vend : le guide complet (2026)",
    description:
      "Créer un site web qui vend en 2026 : structure des pages qui convertissent, tunnel, SEO, vitesse et confiance. La méthode pour un site PME rentable.",
    date: "2026-08-09",
    readingTime: "9 min",
    category: "Site web",
    keywords: ["créer un site web qui vend", "site internet qui convertit", "site vitrine ou e-commerce", "structure page qui convertit", "site web PME Paris"],
    eyebrow: "Guide premium",
    intro: "Un beau site ne vend pas forcément. Un site qui vend, si — parce qu'il est construit autour d'une seule action et du problème du client. Voici la méthode, du hero à la mise en ligne.",
    content: [
      { type: "p", text: "La plupart des sites d'entreprise sont conçus comme des plaquettes : élégants, mais incapables de transformer un visiteur en client. Un site qui vend part d'une question simple — quelle action unique voulez-vous que le visiteur accomplisse ? — et met tout au service de cette action. Ce guide vous donne le pourquoi et la méthode ; la mise en œuvre pas à pas est détaillée dans l'ebook complet." },
      { type: "h2", text: "Un site qui vend n'est pas un joli site" },
      { type: "p", text: "La beauté n'est pas un objectif commercial, c'est un moyen. L'objectif d'un site qui vend, c'est de faire passer un inconnu de « je découvre » à « je vous contacte » ou « je paie ». Cela suppose un renversement mental : on ne conçoit pas le site « sur soi » (notre histoire, notre équipe) mais « sur le client » — son problème, ce qu'il gagne, la preuve que ça marche, et le chemin le plus court pour agir." },
      { type: "p", text: "La différence se mesure. À trafic égal, deux sites peuvent avoir un rapport de 1 à 10 sur le nombre de contacts générés. La variable n'est presque jamais le nombre de visiteurs, mais le taux de conversion : faire passer ce taux de 1 % à 3 %, c'est tripler ses demandes sans dépenser un euro de plus." },
      { type: "h2", text: "Les 3 rôles d'un site : capter, convaincre, convertir" },
      { type: "p", text: "Un site performant remplit trois missions, dans cet ordre. Si l'une manque, la chaîne casse et le visiteur part." },
      { type: "ul", items: ["Capter : répondre en 3 secondes à « Où suis-je ? Est-ce pour moi ? Qu'est-ce que j'y gagne ? » — cela se joue dans le premier écran.", "Convaincre : lever les doutes (sérieux, budget, résultat, garantie) avant qu'ils ne deviennent des raisons de partir.", "Convertir : rendre l'action évidente et sans friction — un bouton clair, un formulaire court, un seul choix."] },
      { type: "p", text: "Test rapide : ouvrez votre page d'accueil sur votre téléphone. Sans faire défiler, peut-on dire ce que vous vendez, à qui, et cliquer sur une action ? Si non, vous perdez des visiteurs dès la première seconde." },
      { type: "h2", text: "Ce qui fait vraiment vendre : structure, vitesse et confiance" },
      { type: "p", text: "Une page qui convertit suit une ossature éprouvée : un hero qui porte la promesse, une preuve sociale immédiate, le problème et sa solution, le fonctionnement en 3 étapes, l'offre avec un repère de prix, la FAQ qui traite les objections, puis un appel à l'action final. Autour de cette page, trois piliers décident du résultat." },
      { type: "ul", items: ["Le mobile et la vitesse : plus de 6 visiteurs sur 10 arrivent du téléphone, et un site lent perd ses visiteurs avant même le premier écran (Core Web Vitals).", "Le tunnel et les appels à l'action : un CTA visible, orienté bénéfice, unique par page, avec un formulaire minimal.", "La confiance : avis clients réels, réassurance au point de décision, mentions légales, HTTPS et coordonnées visibles."] },
      { type: "p", text: "S'ajoutent le SEO posé dès la conception (une page par intention de recherche, titres soignés, URL propres) et la mesure continue avec GA4 : un site qui vend est un site qu'on observe et qu'on ajuste chaque mois, pas un site qu'on livre puis qu'on oublie." },
      { type: "h2", text: "Vitrine, e-commerce ou sur-mesure" },
      { type: "p", text: "Le bon type de site dépend de votre objectif, pas de la mode. Un site vitrine convient à la majorité des PME de services, dont la vente se conclut par un devis ou un rendez-vous. L'e-commerce s'impose pour vendre des produits en ligne avec paiement immédiat, et le sur-mesure pour une logique métier spécifique (réservation, espace client, calcul de devis)." },
      { type: "p", text: "Le piège le plus fréquent : vouloir d'emblée boutique, blog, espace membre et chatbot. Le projet devient cher, long, jamais fini. Lancez d'abord la version qui vend le plus vite, puis étoffez." },
      { type: "p", text: "Ce guide gratuit vous donne les fondations. L'ebook complet à 9 € détaille chaque chapitre avec des modèles de hero, de formulaire et de page à copier, la checklist de mise en ligne et le plan de lancement en 30 jours — tout ce qu'il faut pour passer d'un site plaquette à un site qui génère des demandes." }
    ],
    products: [
      {
        id: "ebook-creation-site",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "La méthode intégrale pour un site qui transforme vos visiteurs en clients, avec des modèles prêts à copier.",
        includes: [
          "14 chapitres détaillés au format PDF",
          "Les modèles de hero, de formulaire et de page qui convertissent",
          "La checklist complète avant mise en ligne",
          "Le plan de lancement en 30 jours, semaine par semaine",
          "Le comparatif vitrine / e-commerce / sur-mesure avec budgets",
          "Le glossaire et les 7 erreurs qui coûtent des ventes"
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "creer-site-web-qui-vend.pdf"
      },
      {
        id: "accompagnement-creation-site",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "Un expert applique la méthode à votre site, en direct, pour repartir avec un plan d'action sur-mesure.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "L'audit de votre site actuel (ou de votre projet) page par page",
          "Votre structure de conversion définie ensemble (hero, offre, CTA)",
          "Votre feuille de route SEO et priorités des 30 prochains jours",
          "L'ebook complet inclus",
          "Le compte-rendu écrit avec actions concrètes après la séance"
        ],
        cta: "Réserver mon accompagnement — 150 €"
      }
    ],
    faq: [
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 €", a: "L'ebook à 9 € est la méthode complète à appliquer soi-même, à son rythme, avec tous les modèles. L'accompagnement à 150 € inclut cet ebook, plus une visio de 90 min où un expert audite votre site, définit avec vous la structure de conversion et vous remet une feuille de route personnalisée. L'ebook vous donne le savoir ; l'accompagnement l'applique à votre cas précis." },
      { q: "Combien coûte un site web qui vend", a: "Un site vitrine professionnel démarre autour de 500 € et varie selon le nombre de pages et les fonctionnalités. Le prix compte moins que le retour : un site qui génère quelques devis par mois se rembourse rapidement. L'ebook détaille les fourchettes par type de site." },
      { q: "Combien de temps avant d'être visible sur Google", a: "Techniquement, quelques jours suffisent pour être indexé. Pour bien se positionner sur des mots-clés concurrentiels comme « création site web Paris », comptez 3 à 6 mois de contenu régulier et de SEO posé dès la conception." },
      { q: "Puis-je créer un site qui vend moi-même", a: "Oui, pour un site simple, avec un bon outil et la méthode de ce guide. La partie qui fait vraiment vendre — stratégie, textes qui convertissent, structure et SEO — est là où l'ebook, puis l'accompagnement, changent la rentabilité de votre site." }
    ],
    relatedService: { href: "/services/creation-site-web", label: "Déléguer entièrement (à partir de 500 €)" }
  },

  {
    slug: "vendre-billets-en-ligne",
    title: "Vendre ses billets en ligne : le guide complet (2026)",
    description:
      "Vendre ses billets en ligne sans stress : choisir sa plateforme, créer une page qui convertit, gérer Stripe, le QR code et le contrôle d'accès le jour J.",
    date: "2026-08-09",
    readingTime: "9 min",
    category: "Billetterie",
    keywords: [
      "vendre ses billets en ligne",
      "billetterie en ligne association",
      "logiciel billetterie événement",
      "billet QR code",
      "plateforme billetterie France",
    ],
    eyebrow: "Guide premium",
    intro:
      "Encaisser ses billets avant l'événement, diviser le no-show par trois et repartir avec un fichier clients : c'est ce que change une vraie billetterie en ligne. Voici la méthode complète — de la page qui convertit au contrôle d'accès par QR le jour J — et le système exact que nous installons chez nos clients.",
    content: [
      { type: "p", text: "Vendre à l'entrée ou par virement de la main à la main, c'est prendre trois risques d'un coup : l'argent qui n'arrive jamais, la salle à moitié vide malgré les « oui, je viens », et zéro donnée pour l'édition suivante. La billetterie en ligne supprime ces trois angles morts. Elle transforme une intention (« j'aimerais bien venir ») en engagement réel (« j'ai payé, donc je viens »). Encore faut-il choisir la bonne plateforme, construire une page qui vend et anticiper le jour J." },
      { type: "h2", text: "Pourquoi vendre ses billets en ligne change tout" },
      { type: "p", text: "Le paiement immédiat sécurise votre budget : vous savez, une semaine à l'avance, combien vous avez encaissé, donc ce que vous pouvez engager en logistique, en cachets ou en communication. Fini l'avance de frais sur des recettes hypothétiques." },
      { type: "ul", items: [
        "Moins de no-show : un billet gratuit affiche 40 à 60 % d'absentéisme ; un billet payé — même 5 € — fait chuter ce taux sous les 15 %. On honore ce qu'on a payé.",
        "Un fichier clients constitué automatiquement : chaque billet vous laisse un e-mail, un prénom, parfois un téléphone. C'est la base qui remplira votre prochaine édition.",
        "Un contrôle d'accès instantané par QR code au lieu d'une liste papier, et une comptabilité exportable en un clic.",
      ]},
      { type: "p", text: "Astuce pour un événement « prix libre » : mettez un plancher symbolique (2 ou 3 €). Vous gardez l'accessibilité tout en divisant le no-show par trois — et vous collectez quand même les coordonnées de chaque participant." },
      { type: "h2", text: "Choisir sa plateforme et lire les frais sans se faire piéger" },
      { type: "p", text: "Le marché se divise en trois familles : les places de marché grand public (rapides à lancer, mais votre page est hébergée chez elles), les billetteries intégrées à votre propre site (meilleure conversion, image pro, données 100 % à vous) et le sur-mesure pour les organisateurs récurrents. Le vrai sujet, ensuite, c'est la commission." },
      { type: "ul", items: [
        "La commission tourne souvent autour de 3 à 5 % + 0,50 € par billet, en plus des frais bancaires (Stripe : environ 1,5 % + 0,25 € en Europe).",
        "La question n'est pas « combien ça coûte » mais « qui paie » : frais à la charge de l'acheteur (vous encaissez le plein tarif) ou de l'organisateur (prix affiché « rond », la commission sort de votre recette).",
        "Vérifiez le délai de reversement : après l'événement, ou en continu via Stripe Connect. Un reversement rapide (J+2 à J+7) est un vrai avantage de trésorerie.",
      ]},
      { type: "p", text: "Attention aux commissions « 0 % » : elles cachent presque toujours des frais reportés sur l'acheteur au dernier écran. Simulez toujours un panier réel avant de vous engager — c'est le montant final affiché qui pèse sur votre taux de conversion." },
      { type: "h2", text: "Une page événement qui convertit, une grille tarifaire qui vend" },
      { type: "p", text: "Une page de billetterie n'est pas une affiche : c'est un tunnel de vente. Chaque élément doit lever un doute et rapprocher du clic « Payer ». L'ossature qui convertit : un visuel net au bon format, l'essentiel (quoi, quand, où, combien) visible en trois secondes, une description qui fait vivre l'expérience, de la réassurance (paiement sécurisé, e-billet immédiat, remboursement) et un bouton d'achat toujours visible sur mobile." },
      { type: "ul", items: [
        "L'early-bird : un tarif réduit sur les premiers billets crée une vague d'achats à l'ouverture et prouve, sur les réseaux, que l'événement « prend ».",
        "Des paliers de prix (normal, dernière minute) et des quotas par catégorie (Standard, Réduit, VIP) qui créent de la rareté visible : « plus que 8 places ».",
        "Des codes promo tracés : un par partenaire pour mesurer qui vous amène des ventes, un code de relance limité dans le temps pour réactiver les indécis.",
      ]},
      { type: "p", text: "Point clé souvent oublié : 70 à 80 % des billets se vendent sur téléphone. Testez tout le parcours sur votre propre mobile — si payer prend plus de trois écrans, vous perdez des ventes. Et ne bradez jamais en façade : un prix barré permanent détruit la valeur perçue." },
      { type: "h2", text: "Paiement, QR code et spécificités association" },
      { type: "p", text: "Côté encaissement, Stripe est le standard (carte, Apple Pay, Google Pay). L'erreur n°1 qui bloque un go-live : rester en mode « test » — la vente semble marcher mais aucun euro n'arrive. Faites toujours une vraie transaction de 1 €, encaissée sur votre compte, avant d'ouvrir la vente. Affichez aussi une politique de remboursement claire avant l'achat pour réduire les litiges." },
      { type: "p", text: "Le QR code sépare l'amateur du pro à l'entrée : chaque billet génère un code unique, à usage unique, marqué « entré » au scan en temps réel — un doublon frauduleux est refusé automatiquement. Prévoyez toujours un mode hors-ligne (salle sans réseau) et testez-le la veille. Une association, elle, peut vendre des billets dans le cadre de ses activités ; mais pour une programmation commerciale récurrente, il est plus sûr de la porter via une société dédiée, afin de protéger le non-lucratif et les subventions." },
      { type: "p", text: "Nous n'avons fait qu'effleurer la promotion (mailing J-4, WhatsApp, Meta Ads), le dispositif du jour J (dimensionner l'entrée, gérer les incidents) et l'après-événement (relance, fidélisation, réédition). L'ebook déroule chaque étape avec la checklist de lancement complète, les modèles d'e-mails prêts à copier et les gabarits de page — pour remplir votre salle sans rien laisser au hasard." },
    ],
    products: [
      {
        id: "ebook-billetterie",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "La méthode clé en main pour remplir votre salle et encaisser sans stress.",
        includes: [
          "Le gabarit de page événement qui convertit (structure + réassurance)",
          "La grille tarifaire early-bird / paliers / quotas prête à dupliquer",
          "Les modèles d'e-mails (ouverture, J-4, remerciement) à copier-coller",
          "La checklist de lancement complète (4 semaines → jour J → après)",
          "Le protocole contrôle d'accès QR & le plan hors-ligne le jour J",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "vendre-billets-en-ligne.pdf",
      },
      {
        id: "accompagnement-billetterie",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On configure votre billetterie ensemble, en direct, sur votre événement.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On paramètre VOTRE billetterie et votre compte Stripe ensemble",
          "On construit votre grille tarifaire et vos quotas adaptés à l'événement",
          "On met en place le contrôle d'accès QR et le plan du jour J",
          "L'ebook complet inclus",
          "Vous repartez avec la vente ouverte et la machine qui tourne",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Puis-je vendre des billets en ligne sans site web ?", a: "Oui, via une place de marché de billetterie qui héberge votre page. Mais une billetterie installée sur votre propre domaine convertit mieux, renvoie une image plus pro et vous garde 100 % de vos données clients." },
      { q: "Qui paie la commission de la billetterie ?", a: "Vous choisissez : soit l'acheteur (vous encaissez alors le plein tarif, la commission apparaît au checkout), soit vous (le prix affiché reste « rond » mais la commission sort de votre recette). Pour la plupart des événements payants, la charge à l'acheteur est la norme." },
      { q: "Une association peut-elle vendre des billets en ligne ?", a: "Oui, dans le cadre de ses activités. Des plateformes non-lucratives existent (sans commission pour l'association). Pour une programmation commerciale récurrente, il est plus sûr de la porter via une société dédiée afin de protéger le non-lucratif et les subventions." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète, les gabarits et les modèles à appliquer vous-même. L'accompagnement, c'est la même chose mais on le fait avec vous en visio, sur votre propre billetterie et votre compte Stripe, adapté à votre événement — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/plateforme-evenementielle", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "securiser-son-site-web",
    title: "Sécuriser son site web : le guide complet (2026)",
    description:
      "Rançongiciel, vol de données, spam : protégez votre site et vos clients. HTTPS, mots de passe, 2FA, sauvegardes, en-têtes de sécurité et RGPD.",
    date: "2026-08-09",
    readingTime: "9 min",
    category: "Sécurité web",
    keywords: [
      "sécuriser son site web",
      "protéger site WordPress piratage",
      "headers de sécurité HTTPS",
      "sauvegarde site internet",
      "sécurité site e-commerce PME",
    ],
    eyebrow: "Guide premium",
    intro:
      "« Mon site est trop petit pour être attaqué » est la phrase la plus dangereuse en sécurité web. La plupart des attaques sont automatiques et opportunistes : elles ne vous choisissent pas, elles trouvent une faille. Voici la méthode claire pour vous protéger — et l'ebook pour tout appliquer.",
    content: [
      { type: "p", text: "Un site n'est jamais « trop petit » pour être piraté. La grande majorité des attaques sont menées par des robots qui parcourent le web en continu et s'engouffrent dans la première faille venue, sans jamais savoir qui vous êtes. La bonne nouvelle : parce que ces attaques sont opportunistes, quelques mesures de base éliminent l'essentiel du risque." },
      { type: "h2", text: "Ce qu'un pirate cherche vraiment" },
      { type: "p", text: "Voler « vos secrets » est rarement le but. Un site compromis a une valeur en soi : le chiffrer contre rançon (rançongiciel), le défigurer, exfiltrer vos données clients, l'utiliser pour envoyer du spam ou miner de la cryptomonnaie. Le vrai coût n'est pas la rançon : c'est l'arrêt d'activité, la perte de confiance et le référencement Google effondré." },
      { type: "h2", text: "Les 5 réflexes qui bloquent 90 % des attaques" },
      { type: "ul", items: [
        "HTTPS partout : certificat valide (gratuit avec Let's Encrypt) et redirection HTTP → HTTPS forcée.",
        "Des mots de passe longs et uniques dans un gestionnaire, plus la double authentification (2FA) sur tous les accès sensibles.",
        "Des mises à jour à jour : CMS, plugins, thèmes et dépendances — la première cause de piratage sur WordPress.",
        "Des sauvegardes automatiques, déconnectées, et surtout testées (une sauvegarde jamais restaurée n'en est pas une).",
        "Des en-têtes de sécurité (HSTS, CSP, X-Frame-Options…) qui ferment des portes d'attaque entières, gratuitement.",
      ]},
      { type: "h2", text: "Protéger les formulaires et les données" },
      { type: "p", text: "Chaque formulaire est une porte d'entrée : on la blinde avec un honeypot (champ piège invisible), du rate-limiting et une validation stricte des saisies pour bloquer spam et injections. Et dès que vous collectez une donnée personnelle, le RGPD s'applique : en cas de fuite, vous avez 72 heures pour notifier la CNIL. La sécurité et la conformité sont les deux faces d'une même pièce." },
      { type: "h2", text: "Détecter et réagir" },
      { type: "p", text: "La question n'est pas seulement d'empêcher, mais de savoir vite : un site peut rester compromis des semaines avant qu'on le remarque. Monitoring de disponibilité, Search Console et scan de malware vous alertent tôt — une intrusion repérée en une heure se nettoie en une matinée. Et avoir un plan de réaction écrit avant la panique évite d'aggraver la situation le jour J." },
      { type: "p", text: "La méthode complète — HTTPS, 2FA, mises à jour, sauvegardes 3-2-1, en-têtes de sécurité, RGPD, moindre privilège, détection d'intrusion et plan de réaction en cas de piratage — est détaillée pas à pas dans l'ebook ci-dessous." },
    ],
    products: [
      {
        id: "ebook-securite-web",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "La méthode complète pour protéger votre site, vos clients et votre réputation.",
        includes: [
          "Pourquoi les PME sont des cibles et ce qu'un pirate cherche vraiment",
          "HTTPS/TLS, mots de passe, gestionnaire & double authentification (2FA)",
          "Mises à jour, dépendances et sauvegardes 3-2-1 avec test de restauration",
          "Les en-têtes de sécurité (HSTS, CSP, X-Frame-Options…) vulgarisés",
          "Protection des formulaires, RGPD, moindre privilège et détection d'intrusion",
          "Format PDF — accès immédiat après paiement",
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "securiser-son-site-web.pdf",
      },
      {
        id: "accompagnement-securite-web",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "On audite votre site et on corrige les failles ensemble, en direct.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On audite votre site et on repère les failles prioritaires",
          "On vérifie HTTPS, en-têtes de sécurité, accès et sauvegardes",
          "On active la 2FA et on durcit vos formulaires avec vous",
          "L'ebook complet inclus",
          "Vous repartez avec un plan de sécurisation sur-mesure",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "Mon site est vraiment petit, dois-je m'en soucier ?", a: "Oui. Les attaques sont automatiques et opportunistes : elles ne vous choisissent pas, elles trouvent une faille. Un petit site mal protégé est une cible plus facile qu'un gros site bien défendu. Quelques mesures de base éliminent l'essentiel du risque." },
      { q: "WordPress est-il moins sûr qu'un autre système ?", a: "Non, il est simplement le plus répandu, donc le plus visé. Bien maintenu — mises à jour régulières, peu de plugins, 2FA — il est parfaitement sûr. Le danger vient presque toujours d'extensions négligées ou abandonnées." },
      { q: "Un certificat HTTPS suffit-il à sécuriser mon site ?", a: "Non. HTTPS chiffre la connexion, mais ne protège ni contre les mots de passe faibles, ni contre les failles de plugins, ni contre le spam. C'est une brique indispensable, pas la maison entière : il faut aussi 2FA, mises à jour, sauvegardes et en-têtes de sécurité." },
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 € ?", a: "L'ebook vous donne la méthode complète à appliquer vous-même. L'accompagnement, c'est la même chose mais on audite votre site en direct, on repère vos failles prioritaires et on les corrige avec vous en visio — l'ebook est inclus." },
    ],
    relatedService: { href: "/services/securite-web", label: "Déléguer entièrement (à partir de 500 €)" },
  },

  {
    slug: "tracking-rgpd-consent-mode",
    title: "Tracking & RGPD : mesurer sans être hors-la-loi (guide 2026)",
    description: "Consent Mode v2, Conversions API Meta et déduplication serveur : récupérez le signal perdu tout en restant conforme à la CNIL et au RGPD.",
    date: "2026-08-09",
    readingTime: "9 min",
    category: "Tracking & RGPD",
    keywords: ["consentement cookies RGPD", "Google Consent Mode v2", "Conversions API Meta RGPD", "bannière cookies conforme CNIL", "tracking conversions sans cookies"],
    eyebrow: "Guide premium",
    intro: "Vos tableaux de bord affichent 20 à 40 % de conversions en moins que la réalité ? Ce ne sont pas des ventes perdues, mais des ventes invisibles. Ce guide montre comment mesurer juste, en règle.",
    content: [
      { type: "h2", text: "Mesurer sans tricher : le vrai enjeu de 2026" },
      { type: "p", text: "Tout annonceur vit la même tension : savoir ce que rapporte chaque euro de publicité, tout en respectant une réglementation et des navigateurs qui verrouillent le suivi. La conformité mal faite ne protège pas mieux les données, elle sabote votre rentabilité. Bonne nouvelle : conformité CNIL et performance publicitaire ne s'opposent pas quand le tracking est bien conçu." },
      { type: "h2", text: "Le consentement, socle légal (et technique)" },
      { type: "p", text: "La directive ePrivacy et les lignes directrices de la CNIL imposent le consentement avant de déposer un cookie publicitaire ou de mesure. Pour être valable, ce consentement doit être libre, spécifique, éclairé, univoque et révocable — et vous devez pouvoir en prouver l'existence." },
      { type: "ul", items: ["Aucun traceur non essentiel ne se déclenche avant le choix de l'internaute", "« Tout refuser » aussi accessible que « Tout accepter » (exigence CNIL sanctionnée)", "Un journal de consentement horodaté, conservé comme preuve", "Un moyen permanent de revenir sur son choix"] },
      { type: "h2", text: "Consent Mode v2 : le langage entre votre bannière et Google" },
      { type: "p", text: "Obligatoire depuis mars 2024 dans l'EEE, le Consent Mode v2 traduit le choix de l'internaute en signaux (ad_storage, analytics_storage, ad_user_data, ad_personalization). En mode advanced, Google reçoit des pings anonymes sans cookie qui lui permettent de modéliser une partie des conversions non consenties — c'est le réglage recommandé pour la performance." },
      { type: "h2", text: "Pixel Meta vs Conversions API : pourquoi il en faut deux" },
      { type: "p", text: "Le Pixel s'exécute dans le navigateur et fuit de partout : ITP de Safari (cookies plafonnés à 7 jours), adblocks (25 à 40 % des visiteurs), onglets fermés. Un pixel seul ne remonte souvent que 60 à 70 % des vraies conversions. La Conversions API (CAPI) envoie les événements depuis votre serveur : un adblock ne peut pas la bloquer, l'ITP ne l'affecte pas. Attention : la CAPI reste soumise au consentement — ce n'est pas une porte dérobée." },
      { type: "h2", text: "Déduplication : ne comptez pas deux fois le même achat" },
      { type: "p", text: "Si le même achat part par le pixel ET par la CAPI, Meta risque de le compter deux fois. La déduplication repose sur un event_id unique, strictement identique côté navigateur et côté serveur. C'est le point le plus souvent raté : un event_id différent = double comptage silencieux et budget mal optimisé." },
      { type: "h2", text: "iOS ATT, sGTM et qualité de mesure" },
      { type: "p", text: "Post-ATT, le signal iOS s'effondre : on le reconstruit via correspondance avancée, domaine vérifié et AEM. Le server-side tagging (sGTM) fiabilise encore la collecte et renforce la conformité. Pilotez le tout avec trois indicateurs : EMQ (viser 7+), taux de consentement (50 à 70 %) et écart d'attribution entre back-office et plateformes." },
      { type: "p", text: "Ce n'est qu'un aperçu. L'ebook complet détaille la configuration de la bannière, les gabarits de code Consent Mode et CAPI, le partage de l'event_id, la migration sGTM et une checklist conformité prête à l'emploi — tout pour récupérer le signal perdu, en règle." }
    ],
    products: [
      {
        id: "ebook-tracking-rgpd",
        type: "pdf",
        name: "L'ebook complet",
        price: 9,
        priceCents: 900,
        tagline: "Le guide de A à Z pour mesurer vos conversions sans enfreindre le RGPD.",
        includes: [
          "14 chapitres experts : consentement, Consent Mode v2, CAPI, sGTM",
          "Gabarits de code prêts à copier (Consent Mode, pixel, CAPI, event_id)",
          "La méthode de déduplication navigateur + serveur pas à pas",
          "Reconstruire la mesure post-iOS ATT (AEM, domaine vérifié)",
          "Une checklist conformité CNIL + performance à cocher",
          "Glossaire complet et FAQ pour ne plus jamais être perdu"
        ],
        cta: "Télécharger l'ebook — 9 €",
        featured: true,
        file: "tracking-rgpd-consent-mode.pdf"
      },
      {
        id: "accompagnement-tracking-rgpd",
        type: "cal",
        name: "L'accompagnement",
        price: 150,
        priceCents: 15000,
        tagline: "L'ebook, plus un expert en direct pour auditer votre setup et vous débloquer.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "Un audit live de votre bannière, de votre Consent Mode et de vos pixels",
          "Le diagnostic de votre déduplication et de votre écart d'attribution",
          "Un plan d'action personnalisé priorisé pour votre site",
          "L'ebook complet inclus",
          "Le compte rendu écrit + vos questions répondues par e-mail après la visio"
        ],
        cta: "Réserver mon accompagnement — 150 €"
      }
    ],
    faq: [
      { q: "Quelle différence entre l'ebook à 9 € et l'accompagnement à 150 €", a: "L'ebook à 9 € vous donne toute la méthode et les gabarits pour installer un tracking conforme et performant par vous-même. L'accompagnement à 150 € inclut l'ebook, mais y ajoute 90 minutes en visio avec un expert qui audite votre setup en direct, diagnostique vos fuites de mesure et vous remet un plan d'action personnalisé. Vous passez du savoir au fait-pour-vous." },
      { q: "La Conversions API me permet-elle de tracer les visiteurs qui ont refusé les cookies", a: "Non, et c'est un point de conformité essentiel. La CAPI reste soumise au consentement au même titre que le pixel : elle transmet des données personnelles à Meta et exige donc l'accord de l'internaute. Elle fiabilise la mesure de ceux qui ont accepté — elle n'est pas une porte dérobée pour suivre ceux qui ont refusé." },
      { q: "Le Consent Mode v2 remplace-t-il ma bannière cookies", a: "Non, les deux sont complémentaires. La bannière (CMP) recueille et prouve le choix de l'internaute ; le Consent Mode v2 se contente de traduire ce choix en signaux transmis à Google. Sans bannière conforme, le Consent Mode n'a rien à transmettre. Depuis mars 2024, le Consent Mode v2 est obligatoire dans l'EEE pour alimenter le remarketing et les audiences Google." },
      { q: "Peut-on vraiment concilier conformité CNIL et performance publicitaire", a: "Oui, et c'est tout l'objet du guide. La perte de signal ne vient pas de la conformité en soi, mais d'un tracking mal conçu. Bien fait — bannière propre, Consent Mode advanced, CAPI avec déduplication et modélisation — un dispositif conforme récupère une grande partie des conversions perdues, tout en restant parfaitement en règle." }
    ],
    relatedService: { href: "/services/tracking-conformite", label: "Déléguer entièrement (à partir de 500 €)" }
  },

  {
    slug: "facturation-electronique-obligatoire",
    title: "Facturation électronique obligatoire : le guide complet (2026-2027)",
    description:
      "Facturation électronique obligatoire en France : ce que c'est, qui est concerné, les dates (réception 2026, émission 2026-2027), les plateformes agréées et les formats. Le guide clair pour se mettre en conformité.",
    date: "2026-09-02",
    readingTime: "10 min",
    category: "Facturation électronique",
    keywords: [
      "facturation électronique obligatoire",
      "facturation électronique obligation",
      "facturation électronique c'est quoi",
      "facturation électronique pour qui",
      "facturation électronique réforme",
      "facturation électronique 2026",
    ],
    eyebrow: "Guide premium",
    intro:
      "La facturation électronique devient obligatoire en France entre 2026 et 2027. Derrière le calendrier se cachent deux obligations distinctes, des formats précis et le passage forcé par une plateforme agréée. Voici la méthode claire pour comprendre ce qui vous concerne — et vous mettre en conformité sans stress avant l'échéance.",
    content: [
      { type: "p", text: "La facturation électronique n'est pas un simple PDF envoyé par e-mail. C'est une facture émise, transmise et reçue dans un format structuré, lisible par une machine, qui transite par des plateformes agréées et alimente l'administration fiscale. La réforme française la rend progressivement obligatoire pour toutes les entreprises assujetties à la TVA. Ce guide vous donne le « pourquoi » et le « quoi » ; l'accompagnement ci-dessous applique le « comment » à votre cas précis." },

      { type: "h2", text: "La facturation électronique, c'est quoi exactement ?" },
      { type: "p", text: "Une facture électronique au sens de la réforme n'est pas un document PDF classique. C'est une facture émise dans un format structuré — Factur-X (un PDF qui embarque des données XML), UBL ou CII — que les logiciels savent lire automatiquement. Elle ne se transmet plus par simple e-mail : elle passe par une plateforme agréée, qui garantit son acheminement et transmet certaines données à l'administration. L'objectif de l'État : simplifier la TVA, réduire la fraude et alléger, à terme, les déclarations." },

      { type: "h2", text: "Deux obligations à ne pas confondre : recevoir et émettre" },
      { type: "p", text: "C'est le point qui prête le plus à confusion. La réforme distingue l'obligation de recevoir une facture électronique et celle d'en émettre — et elles n'ont pas la même date." },
      { type: "ul", items: [
        "Réception : dès le 1er septembre 2026, TOUTES les entreprises assujetties, quelle que soit leur taille, doivent être en capacité de recevoir une facture électronique.",
        "Émission — grandes entreprises et ETI : obligatoire elle aussi au 1er septembre 2026.",
        "Émission — PME, TPE, micro-entreprises et indépendants : obligatoire à partir du 1er septembre 2027.",
      ]},
      { type: "p", text: "Traduit simplement : au 1er septembre 2026, tout le monde doit pouvoir recevoir ; les grandes structures émettent déjà, et les plus petites ont jusqu'au 1er septembre 2027 pour émettre à leur tour. Le calendrier a été plusieurs fois reporté depuis le projet initial de 2024 — méfiez-vous des contenus qui citent encore d'anciennes dates, et recoupez toujours avec la DGFiP." },

      { type: "h2", text: "Qui est concerné (et qui ne l'est pas) ?" },
      { type: "p", text: "Le critère central n'est pas le statut juridique mais l'assujettissement à la TVA. La réforme vise les opérations B2B entre assujettis établis en France." },
      { type: "ul", items: [
        "Concernés : entreprises, indépendants, professions libérales, mais aussi associations et SCI dès lors qu'ils exercent une activité assujettie à la TVA.",
        "Réception pour tous : même un assujetti qui n'émet pas encore doit pouvoir recevoir dès 2026.",
        "Nuances par statut : associations et SCI dépendent de leur régime TVA activité par activité — d'où des guides dédiés pour ces cas.",
        "Hors périmètre B2B : les ventes aux particuliers (B2C) et à l'international ne passent pas par la facture électronique mais par l'e-reporting (transmission des données de transaction).",
      ]},

      { type: "h2", text: "La plateforme agréée (PA) : le passage obligé" },
      { type: "p", text: "Vous ne pourrez plus envoyer une facture directement par e-mail à un client professionnel. Elle devra transiter par une Plateforme Agréée (PA) — anciennement appelée « PDP » — c'est-à-dire un opérateur immatriculé par l'administration. Le Portail Public de Facturation (PPF), lui, ne joue plus le rôle de plateforme de dépôt gratuite prévu à l'origine : il devient un annuaire et un concentrateur de données. Concrètement, chaque entreprise doit choisir sa plateforme (souvent celle de son logiciel de facturation ou de son expert-comptable)." },

      { type: "h2", text: "Les formats : Factur-X, UBL, CII" },
      { type: "p", text: "La facture doit être produite dans un format structuré normalisé. Trois formats socles sont admis : Factur-X (format hybride PDF + XML, très répandu en France car lisible par un humain ET une machine), UBL et CII (formats XML purs). Votre logiciel ou votre plateforme s'en charge — mais c'est ce qui explique qu'un simple PDF « fait maison » ne suffira plus." },

      { type: "h2", text: "Les nouvelles mentions obligatoires" },
      { type: "p", text: "La réforme ajoute des mentions à faire figurer sur les factures (numéro SIREN du client, type d'opération, adresse de livraison le cas échéant, option de paiement de la TVA…). Point de vigilance majeur : le SIREN de l'émetteur est une donnée obligatoire et contrôlée par la plateforme. Une entité sans SIREN valide ne peut pas émettre — un sujet à régler en amont si votre structure est en cours d'immatriculation." },

      { type: "h2", text: "Par où commencer concrètement" },
      { type: "p", text: "Inutile d'attendre 2027 : la réception s'impose dès 2026, et le choix d'une plateforme, la mise à jour des mentions et les tests de format prennent du temps. La marche à suivre tient en cinq étapes : déterminer votre situation TVA et votre date exacte, choisir votre plateforme agréée, vérifier vos mentions obligatoires (dont le SIREN), adapter votre outil de facturation au format structuré, et organiser la réception. C'est exactement ce parcours, appliqué à votre activité, que couvre l'accompagnement ci-dessous." },
    ],
    products: [
      {
        id: "ebook-facturation-electronique",
        type: "pdf",
        name: "Le Kit conformité (ebook)",
        price: 9,
        priceCents: 900,
        tagline: "La méthode complète pour vous mettre en conformité avant l'échéance, checklists et modèles inclus.",
        includes: [
          "Le test « suis-je concerné » et votre calendrier exact (réception / émission)",
          "La grille pour choisir votre Plateforme Agréée sans vous tromper",
          "Les nouvelles mentions obligatoires + la fiabilisation de la base clients",
          "Le plan de mise en conformité en 30 jours, semaine par semaine",
          "Les cas pratiques par profil (auto-entrepreneur, TPE/PME, association, SCI, B2C)",
          "Checklists et modèles d'e-mails prêts à l'emploi — format PDF, accès immédiat",
        ],
        cta: "Télécharger le Kit — 9 €",
        featured: true,
        file: "kit-conformite-facturation-electronique.pdf",
      },
      {
        id: "accompagnement-facturation-electronique",
        type: "cal",
        name: "L'accompagnement conformité",
        price: 150,
        priceCents: 15000,
        tagline: "On met votre facturation en conformité ensemble, en direct, avant l'échéance.",
        includes: [
          "1 visio de 90 min en direct avec un expert",
          "On détermine VOTRE date d'obligation exacte (réception et émission)",
          "On choisit votre Plateforme Agréée (PA) adaptée à vos outils",
          "On vérifie vos mentions obligatoires et votre format (Factur-X)",
          "On cadre l'e-reporting si vous vendez aux particuliers ou à l'international",
          "Le Kit conformité (ebook) inclus",
          "Vous repartez avec un plan de mise en conformité écrit, étape par étape",
        ],
        cta: "Réserver mon accompagnement — 150 €",
      },
    ],
    faq: [
      { q: "La facturation électronique est-elle obligatoire ?", a: "Oui, progressivement. La réception de factures électroniques est obligatoire pour toutes les entreprises assujetties à la TVA dès le 1er septembre 2026. L'émission est obligatoire au 1er septembre 2026 pour les grandes entreprises et ETI, et au 1er septembre 2027 pour les PME, TPE, micro-entreprises et indépendants." },
      { q: "La facturation électronique, c'est quoi ?", a: "C'est une facture émise dans un format structuré (Factur-X, UBL ou CII), lisible par une machine, transmise via une plateforme agréée plutôt que par simple e-mail. Elle alimente aussi l'administration fiscale. Un PDF classique envoyé par mail ne répond pas à cette définition." },
      { q: "Qui est concerné par la facturation électronique obligatoire ?", a: "Toutes les entreprises assujetties à la TVA et établies en France, pour leurs opérations entre professionnels (B2B) : sociétés, indépendants, professions libérales, mais aussi associations et SCI selon leur régime TVA. Les ventes aux particuliers et à l'international relèvent, elles, de l'e-reporting." },
      { q: "Faut-il un logiciel payant pour se mettre en conformité ?", a: "La facture doit transiter par une Plateforme Agréée, mais l'offre est large et inclut des solutions à faible coût. Le bon choix dépend de votre volume, de vos outils actuels et de votre expert-comptable — c'est précisément ce qu'on cadre en accompagnement pour éviter de payer pour des fonctions inutiles." },
      { q: "Que faire si mon entreprise n'a pas encore de SIREN ?", a: "Le SIREN de l'émetteur est une donnée obligatoire et contrôlée : sans immatriculation valide, vous ne pouvez pas émettre de facture électronique conforme. Si votre structure est en cours de création, il faut anticiper ce point avant l'échéance d'émission qui vous concerne." },
    ],
    relatedService: { href: "/services/automatisation", label: "Déléguer la mise en conformité (sur devis)" },
  },
];

// --- Garde-fou d'integrite du catalogue -----------------------------------
// Verifie les invariants du tunnel de paiement au chargement du module (donc
// au build et au demarrage). Une incoherence fait echouer le deploiement tot
// plutot que de facturer un mauvais montant ou de livrer un PDF fantome.
// Tient lieu de test unitaire sans dependance de test supplementaire.
function validateCatalog(guides: Guide[]): void {
  const productIds = new Set<string>();
  const slugs = new Set<string>();
  for (const guide of guides) {
    if (slugs.has(guide.slug)) throw new Error(`Catalogue: slug de guide en double "${guide.slug}"`);
    slugs.add(guide.slug);
    for (const p of guide.products) {
      if (productIds.has(p.id)) throw new Error(`Catalogue: id de produit en double "${p.id}"`);
      productIds.add(p.id);
      if (!Number.isInteger(p.priceCents) || p.priceCents <= 0) {
        throw new Error(`Catalogue: priceCents invalide pour "${p.id}" (${p.priceCents})`);
      }
      if (p.priceCents !== Math.round(p.price * 100)) {
        throw new Error(
          `Catalogue: price/priceCents incoherents pour "${p.id}" (${p.price}€ vs ${p.priceCents}c)`,
        );
      }
      if (p.type === "pdf" && !p.file) {
        throw new Error(`Catalogue: produit PDF "${p.id}" sans fichier`);
      }
    }
  }
}
validateCatalog(GUIDES);

export function getAllGuides() {
  return [...GUIDES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

// Retrouve un produit par son id, tous guides confondus (utilise par le tunnel).
export function getProductById(productId: string): { guide: Guide; product: GuideProduct } | undefined {
  for (const guide of GUIDES) {
    const product = guide.products.find((p) => p.id === productId);
    if (product) return { guide, product };
  }
  return undefined;
}
