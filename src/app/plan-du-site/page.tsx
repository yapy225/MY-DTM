import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan du site — My-DTM Digital Agency",
  description:
    "Plan du site my-dtm.fr : accueil, services, blog, guides, tarifs, contact et mentions légales.",
  alternates: { canonical: "https://my-dtm.fr/plan-du-site" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "Tous les services" },
      { href: "/services/creation-site-web", label: "Création site web" },
      { href: "/services/seo", label: "SEO technique" },
      { href: "/services/whatsapp-business", label: "WhatsApp Business API" },
      { href: "/services/automatisation", label: "Automatisation & API" },
      { href: "/services/marketing-digital", label: "Marketing digital" },
      { href: "/services/tracking-conformite", label: "Tracking & Conformité RGPD" },
      { href: "/services/securite-web", label: "Sécurité web" },
      { href: "/services/plateforme-evenementielle", label: "Plateforme événementielle" },
    ],
  },
  {
    title: "Blog",
    links: [
      { href: "/blog", label: "Tous les articles" },
      { href: "/blog/integrer-whatsapp-business-api-guide", label: "Comment intégrer l'API WhatsApp Business" },
      { href: "/blog/conversions-api-meta-rgpd-guide", label: "Conversions API Meta & RGPD" },
      { href: "/blog/prix-plateforme-billetterie-evenementielle", label: "Prix d'une plateforme de billetterie" },
      { href: "/blog/cout-whatsapp-business-api-france", label: "Coût WhatsApp Business API France" },
      { href: "/blog/deduplication-evenements-pixel-capi", label: "Déduplication événements Pixel / CAPI" },
      { href: "/blog/securiser-application-nextjs-checklist", label: "Sécuriser une application Next.js" },
      { href: "/blog/content-security-policy-nonce-nextjs", label: "Content Security Policy avec nonce Next.js" },
      { href: "/blog/migration-wordpress-nextjs-seo", label: "Migrer de WordPress à Next.js sans perdre son SEO" },
      { href: "/blog/chatbot-whatsapp-entreprise", label: "Chatbot WhatsApp pour entreprise" },
      { href: "/blog/whatsapp-business-vs-whatsapp-classique", label: "WhatsApp Business vs WhatsApp classique" },
      { href: "/blog/consent-mode-v2-rgpd-cnil", label: "Consent Mode v2 & cookies RGPD/CNIL" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guides", label: "Tous les guides" },
      { href: "/guides/automatiser-reseaux-sociaux", label: "Automatiser ses réseaux sociaux" },
      { href: "/guides/vendre-avec-whatsapp", label: "Vendre avec WhatsApp Business" },
      { href: "/guides/publicite-facebook-instagram", label: "Publicité Facebook & Instagram" },
      { href: "/guides/referencement-naturel-seo", label: "Le référencement naturel (SEO)" },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/tarifs", label: "Tarifs" },
      { href: "/contact", label: "Contact" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
    ],
  },
];

export default function PlanDuSitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
              { "@type": "ListItem", position: 2, name: "Plan du site", item: "https://my-dtm.fr/plan-du-site" },
            ],
          }),
        }}
      />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-dark">Plan du site</span>
          </nav>
          <h1 className="font-sans text-4xl font-extrabold text-dark sm:text-5xl">Plan du site</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">Toutes les pages de my-dtm.fr accessibles en un coup d&apos;œil.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-sans text-xl font-extrabold text-dark">{section.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
