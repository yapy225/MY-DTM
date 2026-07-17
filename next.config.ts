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
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
