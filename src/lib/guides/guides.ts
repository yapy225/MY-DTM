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
      "Comment automatiser ses posts sur Instagram, Facebook et LinkedIn sans perdre en authenticité : les outils, le calendrier éditorial, les erreurs à éviter. Guide d'agence + ebook prêt à l'emploi.",
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
      "Comment transformer WhatsApp Business en machine à vendre : profil, catalogue, messages automatiques, pipeline et tunnel de conversation qui convertit. Méthode d'agence + ebook prêt à l'emploi.",
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
      "Lancer des campagnes Facebook et Instagram qui vendent, même avec un petit budget : objectifs, Pixel, click-to-WhatsApp, KPI, audiences et retargeting. Méthode d'agence + ebook prêt à l'emploi.",
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
      "Comment faire venir des clients depuis Google sans payer la publicité : mots-clés, optimisation des pages, SEO technique, contenu, local et netlinking. Méthode d'agence + ebook prêt à l'emploi.",
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
