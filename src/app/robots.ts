import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/pilotage"],
    },
    sitemap: "https://my-dtm.fr/sitemap.xml",
  };
}
