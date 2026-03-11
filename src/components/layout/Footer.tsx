import Link from "next/link";

const SERVICES = [
  { href: "/services#dev", label: "Developpement Web" },
  { href: "/services#seo", label: "SEO Technique" },
  { href: "/services#auto", label: "Automatisation" },
  { href: "/services#marketing", label: "Marketing Digital" },
];

const AGENCE = [
  { href: "/a-propos", label: "A propos" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <>
      <div className="accent-strip" />
      <footer className="bg-dark text-white/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <span className="text-xs font-black text-white">M</span>
                </div>
                <span className="text-lg font-bold text-white">My-DTM</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
                Agence de marketing digital specialisee dans la creation
                d&apos;ecosystemes numeriques complets.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-light">
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-sm text-white/40 transition-colors hover:text-primary-light">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agence */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-light">
                Agence
              </h4>
              <ul className="space-y-2.5">
                {AGENCE.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className="text-sm text-white/40 transition-colors hover:text-primary-light">
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-light">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm text-white/40">
                <li>contact@my-dtm.fr</li>
                <li>+33 7 43 53 75 51</li>
                <li>Paris, France</li>
              </ul>

              {/* Social */}
              <div className="mt-6 flex gap-3">
                <a href="https://www.instagram.com/mydreamteammedia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/30 transition-all hover:bg-primary/20 hover:text-primary-light">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.96c.458.458.78.92.96 1.47.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.96 1.47 4.08 4.08 0 01-1.47.96c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.47-.96 4.08 4.08 0 01-.96-1.47c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.96-1.47 4.08 4.08 0 011.47-.96c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.151.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.762.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.151-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.762.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.261-2.151-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.098.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/mydreamteammedia/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/30 transition-all hover:bg-primary/20 hover:text-primary-light">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://x.com/DreamTeamAfriQ" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/30 transition-all hover:bg-primary/20 hover:text-primary-light">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/25 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} My-DTM Digital Agency. Tous droits reserves.</span>
            <span className="flex gap-4">
              <Link href="/mentions-legales" className="transition-colors hover:text-primary-light">Mentions legales</Link>
              <span>|</span>
              <Link href="/politique-de-confidentialite" className="transition-colors hover:text-primary-light">Confidentialite</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
