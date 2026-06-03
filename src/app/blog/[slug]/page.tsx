import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://my-dtm.fr/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "fr_FR",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "My-DTM Digital Agency", url: "https://my-dtm.fr" },
    publisher: { "@type": "Organization", name: "My-DTM Digital Agency", logo: { "@type": "ImageObject", url: "https://my-dtm.fr/icon.svg" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://my-dtm.fr/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://my-dtm.fr/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://my-dtm.fr/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article>
        <header className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <nav className="mb-8 text-sm text-muted">
              <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link><span className="mx-2">/</span>
              <span className="text-dark">{post.category}</span>
            </nav>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{post.category}</span>
            <h1 className="mt-5 font-sans text-3xl font-extrabold leading-tight text-dark sm:text-4xl">{post.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} />{post.readingTime} de lecture</span>
            </div>
          </div>
        </header>

        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return <h2 key={i} className="mt-10 font-sans text-2xl font-extrabold text-dark">{block.text}</h2>;
              }
              if (block.type === "p") {
                return <p key={i} className="mt-5 text-base leading-relaxed text-muted">{block.text}</p>;
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="mt-5 space-y-2.5">
                    {block.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-base leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{it}
                      </li>
                    ))}
                  </ul>
                );
              }
              // cta
              return (
                <div key={i} className="mt-8 rounded-2xl border border-primary/20 bg-primary/[0.03] p-6">
                  <p className="text-base font-semibold text-dark">{block.text}</p>
                  <Link href={block.href} className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    {block.label} <ArrowRight size={15} />
                  </Link>
                </div>
              );
            })}

            {/* Related services */}
            <div className="mt-14 border-t border-border pt-8">
              <h2 className="font-sans text-lg font-extrabold text-dark">Pour aller plus loin</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {post.related.map((l) => (
                  <Link key={l.href} href={l.href} className="flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary">
                    {l.label} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-primary">
                <ArrowLeft size={15} /> Tous les articles
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-dark to-charcoal px-4 py-20 text-center">
          <h2 className="relative font-sans text-3xl font-extrabold text-white sm:text-4xl">Un projet en tête ?</h2>
          <p className="relative mt-4 text-white/60">Audit gratuit sous 48h.</p>
          <Link href="/contact" className="relative mt-8 inline-flex rounded-lg bg-gradient-to-r from-primary to-secondary px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl">
            Parler de mon projet
          </Link>
        </section>
      </article>
    </>
  );
}
