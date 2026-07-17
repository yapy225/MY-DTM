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
