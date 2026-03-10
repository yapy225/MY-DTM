import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My-DTM — Agence Digitale Paris | Marketing, SEO, Developpement Web",
    template: "%s | My-DTM Agency",
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
  openGraph: {
    title: "My-DTM — Agence Digitale Paris",
    description: "Developpement web, SEO, automatisation et marketing digital. Audit gratuit.",
    url: "https://my-dtm.fr",
    siteName: "My-DTM Digital Agency",
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
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "My-DTM Digital Agency",
              url: "https://my-dtm.fr",
              logo: "https://my-dtm.fr/icon.svg",
              sameAs: [
                "https://www.instagram.com/mydreamteammedia/",
                "https://www.facebook.com/mydreamteammedia/",
                "https://x.com/DreamTeamAfriQ",
              ],
              description: "Agence de marketing digital a Paris specialisee dans la creation d'ecosystemes numeriques complets.",
              foundingDate: "2024",
              areaServed: { "@type": "Country", name: "France" },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+33743537551",
                email: "contact@my-dtm.fr",
                areaServed: "FR",
                availableLanguage: ["French"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Paris",
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
              name: "My-DTM Digital Agency",
              image: "https://my-dtm.fr/opengraph-image",
              description: "Agence de marketing digital a Paris. Developpement web, SEO, automatisation, marketing multi-canal.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Paris",
                addressCountry: "FR",
              },
              telephone: "+33743537551",
              email: "contact@my-dtm.fr",
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
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
