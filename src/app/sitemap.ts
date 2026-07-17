import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllGuides } from "@/lib/guides/guides";

const baseUrl = "https://my-dtm.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified STABLE pour les pages statiques : ne pas utiliser new Date()
  // (Google recrawlerait tout à chaque build → crawl budget gaspillé). Les
  // articles/guides gardent leur vraie date. À bumper lors d'une vraie refonte.
  const LAST_MODIFIED = "2026-07-09";

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guides: MetadataRoute.Sitemap = getAllGuides().map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(g.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guides`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    ...guides,
    { url: `${baseUrl}/services`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/creation-site-web`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/seo`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/whatsapp-business`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/automatisation`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/marketing-digital`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/tracking-conformite`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/securite-web`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/plateforme-evenementielle`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    ...blogPosts,
    { url: `${baseUrl}/tarifs`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
