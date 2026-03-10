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
              <div className="font-serif text-xl font-black text-gradient-violet">
                My-DTM Agency
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Agence de marketing digital specialisee dans la creation
                d&apos;ecosystemes numeriques complets.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-light">
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-sm text-white/50 transition-colors hover:text-violet-light">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agence */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-light">
                Agence
              </h4>
              <ul className="space-y-2.5">
                {AGENCE.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className="text-sm text-white/50 transition-colors hover:text-violet-light">
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-light">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li>contact@my-dtm.fr</li>
                <li>+33 7 43 53 75 51</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-white/30 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} My-DTM Digital Agency. Tous droits reserves.</span>
            <span className="flex gap-4">
              <Link href="/mentions-legales" className="transition-colors hover:text-violet-light">Mentions legales</Link>
              <span>|</span>
              <Link href="/politique-de-confidentialite" className="transition-colors hover:text-violet-light">Confidentialite</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
