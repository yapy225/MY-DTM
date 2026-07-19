"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// Habillage du site marketing (Navbar/Footer/WhatsApp). On le retire sur les
// dashboards /pilotage et /regie, qui ont leur propre mise en page plein écran.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/pilotage") || pathname?.startsWith("/regie");

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
