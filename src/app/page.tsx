import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import WhatsAppShowcase from "@/components/sections/WhatsAppShowcase";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="accent-strip" />
      <Stats />
      <WhatsAppShowcase />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
