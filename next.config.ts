import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inclut les PDF des ebooks dans le bundle de la route de telechargement
  // (sinon Vercel ne les embarque pas dans la fonction serverless).
  outputFileTracingIncludes: {
    "/api/download": ["./private/ebooks/**/*"],
  },
  // Vestiges de l'ancien contenu dreamteam hébergé sur my-dtm.fr (pages /lafropeen
  // et /saison-culturelle-africaine, aujourd'hui en 404) → 301/308 vers leur
  // équivalent sur dreamteamafrica.com. Le site de services my-dtm reste intact.
  async redirects() {
    return [
      {
        source: "/lafropeen/:path*",
        destination: "https://dreamteamafrica.com/lafropeen/:path*",
        permanent: true,
      },
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
