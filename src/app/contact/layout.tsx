import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | My-DTM — Agence Digitale Paris",
  description:
    "Contactez My-DTM pour un audit gratuit de votre projet digital. Reponse sous 48h. Developpement web, SEO, automatisation, marketing digital a Paris.",
  keywords: [
    "contact agence digitale Paris",
    "audit gratuit site web",
    "devis marketing digital",
    "contact agence SEO Paris",
  ],
  alternates: { canonical: "https://my-dtm.fr/contact" },
  openGraph: {
    title: "Contactez My-DTM — Audit Gratuit",
    description: "Audit gratuit sous 48h. Parlons de votre projet digital.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
