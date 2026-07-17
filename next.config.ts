import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inclut les PDF des ebooks dans le bundle de la route de telechargement
  // (sinon Vercel ne les embarque pas dans la fonction serverless).
  outputFileTracingIncludes: {
    "/api/download": ["./private/ebooks/**/*"],
  },
  // Vestige /saison-culturelle-africaine → 301 vers son équivalent DreamTeam.
  // (Les anciens articles /lafropeen, eux, ne sont PAS redirigés : ils renvoient
  // désormais 410 Gone via src/app/lafropeen/[[...slug]]/route.ts — contenu
  // actu/politique hors-sujet pour l'agence, à sortir de l'index Google.)
  async redirects() {
    return [
      // Osature d'indexation : www → apex en 308 permanent (effectif une fois www passé de
      // "Redirect" à "domaine assigné" dans Vercel ; aujourd'hui www est en 307 plateforme).
      { source: "/", has: [{ type: "host", value: "www.my-dtm.fr" }], destination: "https://my-dtm.fr/", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.my-dtm.fr" }], destination: "https://my-dtm.fr/:path*", permanent: true },
      {
        source: "/saison-culturelle-africaine/:path*",
        destination: "https://dreamteamafrica.com/saison-culturelle-africaine/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Politique de securite du contenu. On autorise 'unsafe-inline' pour scripts
    // et styles car le site s'appuie sur du JSON-LD inline (layout) + des styles
    // inline (dashboard) et l'hydratation Next ; le durcissement suivant serait
    // une CSP a nonce via middleware. Les directives verrouillees ci-dessous
    // (frame-ancestors, base-uri, object-src, form-action) ferment deja les
    // vecteurs les plus courants (clickjacking, injection de <base>, plugins).
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
