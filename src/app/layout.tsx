import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My DTM — Agence Digitale Paris | Marketing, SEO, Developpement Web",
    template: "%s | My DTM",
  },
  description:
    "Agence de marketing digital a Paris. Developpement web, SEO technique, automatisation API et marketing multi-canal. Audit gratuit.",
  keywords: [
    "agence digitale Paris",
    "marketing digital",
    "developpement web",
    "SEO technique",
    "automatisation API",
    "agence web Paris",
  ],
  metadataBase: new URL("https://my-dtm.fr"),
  verification: {
    // Token fourni par Google Search Console (methode "balise HTML").
    // A definir dans Vercel > Settings > Environment Variables : GOOGLE_SITE_VERIFICATION
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // Revendication du domaine sur Pinterest (compte My DTM Paris).
    other: { "p:domain_verify": "306c7badd695acd557743f16d44701fa" },
  },
  openGraph: {
    title: "My DTM — Agence Digitale Paris",
    description: "Developpement web, SEO, automatisation et marketing digital. Audit gratuit.",
    url: "https://my-dtm.fr",
    siteName: "My DTM",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "My DTM",
              legalName: "My DTM",
              alternateName: "My-DTM",
              url: "https://my-dtm.fr",
              logo: "https://my-dtm.fr/icon.svg",
              sameAs: [
                "https://www.instagram.com/mydreamteammedia/",
                "https://www.facebook.com/mydreamteammedia/",
                "https://x.com/DreamTeamAfriQ",
              ],
              description: "Agence de marketing digital a Paris specialisee dans la creation d'ecosystemes numeriques complets.",
              foundingDate: "2026",
              areaServed: { "@type": "Country", name: "France" },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+33743537551",
                email: "hello@my-dtm.fr",
                areaServed: "FR",
                availableLanguage: ["French"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "48 rue de Birague",
                postalCode: "94490",
                addressLocality: "Ormesson-sur-Marne",
                addressRegion: "Île-de-France",
                addressCountry: "FR",
              },
              knowsAbout: [
                "Web Development",
                "SEO",
                "Marketing Automation",
                "WhatsApp Business API",
                "Digital Strategy",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "My DTM",
              image: "https://my-dtm.fr/opengraph-image",
              description: "Agence de marketing digital a Paris. Developpement web, SEO, automatisation, marketing multi-canal.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "48 rue de Birague",
                postalCode: "94490",
                addressLocality: "Ormesson-sur-Marne",
                addressRegion: "Île-de-France",
                addressCountry: "FR",
              },
              telephone: "+33743537551",
              email: "hello@my-dtm.fr",
              url: "https://my-dtm.fr",
              priceRange: "€€",
              areaServed: ["Paris", "Ile-de-France", "France"],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
            }),
          }}
        />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
