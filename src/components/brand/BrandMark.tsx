/**
 * BrandMark — symbole My DTM Paris : badge « M » signal (barres montantes)
 * coiffé d'un point néon. Voir brand-assets/logo/logo-symbol.svg.
 *
 * Utilisable en composant serveur comme client. Les ids de dégradé sont
 * statiques : toutes les instances étant identiques, le partage d'id est sûr.
 */
export default function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="bm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#29f5eb" />
          <stop offset="0.5" stopColor="#4d71ee" />
          <stop offset="1" stopColor="#e511e6" />
        </linearGradient>
        <linearGradient id="bm-bars" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#4ce7f3" />
          <stop offset="1" stopColor="#ff00d6" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" rx="46" fill="#0e0a1a" stroke="url(#bm-grad)" strokeWidth="5" />
      <g transform="translate(56 60)" fill="url(#bm-bars)">
        <rect x="0" y="40" width="16" height="40" rx="4" />
        <rect x="24" y="12" width="16" height="68" rx="4" />
        <rect x="48" y="12" width="16" height="68" rx="4" />
        <rect x="72" y="40" width="16" height="40" rx="4" />
      </g>
      <circle cx="144" cy="64" r="9" fill="#29f5eb" />
    </svg>
  );
}
