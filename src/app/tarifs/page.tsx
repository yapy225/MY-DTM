import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs — Prix Creation Site Web, SEO, WhatsApp Business, Marketing Digital",
  description:
    "Tarifs transparents : creation site web a partir de 1 500\u20AC, audit SEO 500\u20AC, WhatsApp Business 800\u20AC, marketing multi-canal 1 000\u20AC/mois. Devis gratuit.",
  keywords: [
    "tarif agence web Paris",
    "prix creation site web",
    "tarif agence SEO",
    "prix referencement Google",
    "combien coute un site internet",
    "devis site internet professionnel",
    "tarif WhatsApp Business API",
    "prix marketing digital agence",
  ],
  alternates: { canonical: "https://my-dtm.fr/tarifs" },
  openGraph: {
    title: "Tarifs — My-DTM Digital Agency",
    description: "Tarifs transparents : site web a partir de 1 500€, SEO 500€, WhatsApp Business 800€. Devis gratuit.",
    url: "https://my-dtm.fr/tarifs",
    type: "website",
    locale: "fr_FR",
  },
};

const CATEGORIES = [
  {
    title: "Creation Site Web",
    href: "/services/creation-site-web",
    items: [
      { name: "Site Vitrine Pro", price: "1 500 \u20AC", desc: "5-10 pages, responsive, SEO de base" },
      { name: "Site E-commerce", price: "3 000 \u20AC", desc: "Stripe, gestion stocks, dashboard" },
      { name: "Plateforme Evenementielle", price: "4 000 \u20AC", desc: "Billetterie, QR codes, exposants" },
      { name: "Ecosysteme Complet", price: "Sur devis", desc: "Multi-modules interconnectes" },
    ],
  },
  {
    title: "SEO Technique",
    href: "/services/seo",
    items: [
      { name: "Audit SEO Complet", price: "500 \u20AC", desc: "Analyse + rapport + call" },
      { name: "SEO Technique", price: "1 500 \u20AC", desc: "Schema.org, redirections, indexation" },
      { name: "Recuperation Trafic", price: "1 000 \u20AC", desc: "Redirections 301, nettoyage" },
      { name: "SEO Contenu Mensuel", price: "800 \u20AC/mois", desc: "4 articles + maillage + rapport" },
    ],
  },
  {
    title: "WhatsApp Business",
    href: "/services/whatsapp-business",
    items: [
      { name: "Starter", price: "800 \u20AC", desc: "Compte API + 3 templates + webhook" },
      { name: "Business", price: "1 500 \u20AC", desc: "Chatbot + Facebook Leads + analytics" },
      { name: "Enterprise", price: "Sur devis", desc: "CRM, multi-numeros, API custom" },
    ],
  },
  {
    title: "Marketing Digital",
    href: "/services/marketing-digital",
    items: [
      { name: "Acquisition 360\u00B0", price: "1 000 \u20AC/mois", desc: "SEO + WhatsApp + Ads + Email" },
      { name: "Lancement Evenement", price: "2 000 \u20AC", desc: "Landing + Ads + WhatsApp + email" },
      { name: "Reseaux Sociaux", price: "800 \u20AC/mois", desc: "12 posts/mois + community management" },
      { name: "Newsletter", price: "400 \u20AC/mois", desc: "2-4 envois + segmentation + A/B" },
    ],
  },
];

export default function TarifsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-sans text-4xl font-extrabold text-dark sm:text-5xl">
            Tarifs clairs. Pas de surprises.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Tous les prix sont HT. Chaque projet est unique — contactez-nous pour un devis adapte.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat) => (
          <section key={cat.title}>
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-2xl font-extrabold text-dark">{cat.title}</h2>
              <Link href={cat.href} className="text-sm font-semibold text-primary hover:underline">Voir le detail</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cat.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-base font-bold text-dark">{item.name}</h3>
                  <div className="mt-2 font-sans text-2xl font-extrabold text-gradient-primary">{item.price}</div>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-10 text-center text-white">
          <h2 className="font-sans text-3xl font-extrabold">Besoin d&apos;un devis sur mesure ?</h2>
          <p className="mt-3 text-white/80">Chaque projet est unique. On vous repond sous 48h.</p>
          <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-white px-10 py-4 text-base font-bold text-primary transition-all hover:-translate-y-1 hover:shadow-xl">
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </>
  );
}
