import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllGuides } from "@/lib/guides/guides";

const baseUrl = "https://my-dtm.fr";

export default function sitemap(): MetadataRoute.Sitemap {
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
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...guides,
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/creation-site-web`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/seo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/whatsapp-business`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/automatisation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/marketing-digital`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/tracking-conformite`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/securite-web`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/plateforme-evenementielle`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...blogPosts,
    { url: `${baseUrl}/tarifs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
