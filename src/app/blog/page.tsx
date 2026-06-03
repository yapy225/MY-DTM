import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Web, SEO, WhatsApp, Tracking & Événementiel",
  description:
    "Guides et conseils d'agence : intégration WhatsApp Business API, Conversions API Meta & RGPD, billetterie événementielle, SEO et développement web.",
  keywords: [
    "blog agence digitale",
    "guide WhatsApp Business API",
    "guide Conversions API Meta",
    "prix billetterie événementielle",
    "conseils SEO développement web",
  ],
  alternates: { canonical: "https://my-dtm.fr/blog" },
  openGraph: {
    title: "Blog — My-DTM Digital Agency",
    description: "Guides et conseils : WhatsApp Business API, tracking Meta CAPI/RGPD, billetterie, SEO, web.",
    url: "https://my-dtm.fr/blog",
    type: "website",
    locale: "fr_FR",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog My-DTM",
    url: "https://my-dtm.fr/blog",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://my-dtm.fr/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Le blog</p>
          <h1 className="mt-4 max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Guides & conseils pour faire grandir votre activité en ligne
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            WhatsApp Business, tracking Meta, billetterie événementielle, SEO, développement web — des articles concrets, écrits par des praticiens.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.05]"
            >
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{p.category}</span>
              <h2 className="mt-4 text-lg font-bold leading-snug text-dark group-hover:text-primary">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><Clock size={13} />{p.readingTime}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">Lire <ArrowRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
