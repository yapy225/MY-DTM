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
];

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
