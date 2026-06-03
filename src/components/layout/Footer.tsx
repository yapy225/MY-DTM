import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const SERVICES = [
  { href: "/services/creation-site-web", label: "Création web" },
  { href: "/services/seo", label: "SEO technique" },
  { href: "/services/whatsapp-business", label: "WhatsApp Business" },
  { href: "/services/marketing-digital", label: "Marketing digital" },
  { href: "/services/tracking-conformite", label: "Tracking & Conformité" },
  { href: "/services/securite-web", label: "Sécurité web" },
  { href: "/services/plateforme-evenementielle", label: "Plateforme événementielle" },
];

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/mydreamteammedia/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.7 5.7 0 002.13-1.38 5.7 5.7 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.7 5.7 0 00-1.38-2.13A5.7 5.7 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" },
  { href: "https://www.facebook.com/mydreamteammedia/", label: "Facebook", path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z" },
  { href: "https://x.com/DreamTeamAfriQ", label: "X", path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" },
];

export default function Footer() {
  return (
    <footer className="bg-dark px-4 pt-16 pb-8 text-white/70 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink text-sm font-black text-white">M</span>
              <span className="text-lg font-bold text-white">My-DTM</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Agence digitale à Paris : développement web, SEO, marketing, tracking et sécurité. Tout l&apos;écosystème digital sous un seul toit.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-accent-light">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Liens</h3>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-accent-light">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="mailto:contact@my-dtm.fr" className="flex items-center gap-2.5 text-sm transition-colors hover:text-accent-light">
                  <Mail size={16} className="text-primary-light" /> contact@my-dtm.fr
                </a>
              </li>
              <li>
                <a href="tel:+33743537551" className="flex items-center gap-2.5 text-sm transition-colors hover:text-accent-light">
                  <Phone size={16} className="text-primary-light" /> +33 7 43 53 75 51
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <MapPin size={16} className="text-primary-light" /> Paris, France
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-br hover:from-primary hover:to-pink"
                >
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row">
          <span>&copy; 2026 My-DTM Digital Agency. Tous droits réservés.</span>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-accent-light">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="transition-colors hover:text-accent-light">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
