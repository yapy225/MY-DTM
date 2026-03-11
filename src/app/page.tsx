import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import WhatsAppShowcase from "@/components/sections/WhatsAppShowcase";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "My-DTM — Agence Digitale Paris | Creation Site Web, SEO, Marketing Digital",
  description:
    "Agence de marketing digital a Paris specialisee dans la creation d'ecosystemes numeriques complets. Developpement web, SEO technique, automatisation API et marketing multi-canal. Audit gratuit sous 48h.",
  keywords: [
    "agence digitale Paris",
    "agence marketing digital Paris",
    "creation site web Paris",
    "agence SEO Paris",
    "developpement web Paris",
    "marketing digital PME",
    "automatisation marketing",
    "WhatsApp Business API France",
  ],
  alternates: { canonical: "https://my-dtm.fr" },
  openGraph: {
    title: "My-DTM — Agence Digitale Paris",
    description: "Creation site web, SEO, automatisation et marketing digital. Audit gratuit sous 48h.",
    url: "https://my-dtm.fr",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhatsAppShowcase />
      <Stats />
      <Process />
      <Portfolio />
      <FAQ />
      <Testimonials />
      <CTA />
    </>
  );
}
