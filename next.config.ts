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
      // Osature d'indexation : www → apex en 308 permanent (effectif une fois www passé de
      // "Redirect" à "domaine assigné" dans Vercel ; aujourd'hui www est en 307 plateforme).
      { source: "/", has: [{ type: "host", value: "www.my-dtm.fr" }], destination: "https://my-dtm.fr/", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.my-dtm.fr" }], destination: "https://my-dtm.fr/:path*", permanent: true },
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
