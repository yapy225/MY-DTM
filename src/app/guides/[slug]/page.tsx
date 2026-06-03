import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Star } from "lucide-react";
import { getAllGuides, getGuide } from "@/lib/guides/guides";
import BuyButton from "@/components/BuyButton";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `https://my-dtm.fr/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      locale: "fr_FR",
      publishedTime: guide.date,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `https://my-dtm.fr/guides/${guide.slug}`;
  const ebook = guide.products.find((p) => p.type === "pdf");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://my-dtm.fr" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://my-dtm.fr/guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  const productJsonLd = ebook
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${guide.title} — ${ebook.name}`,
        description: ebook.tagline,
        brand: { "@type": "Brand", name: "My-DTM" },
        offers: {
          "@type": "Offer",
          price: ebook.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url,
        },
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {productJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      ) : null}

      <article>
        {/* Hero */}
        <header className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <nav className="mb-8 text-sm text-muted">
              <Link href="/" className="hover:text-primary">Accueil</Link><span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-primary">Guides</Link><span className="mx-2">/</span>
              <span className="text-dark">{guide.category}</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">{guide.eyebrow}</p>
            <h1 className="mt-4 font-sans text-3xl font-extrabold leading-tight text-dark sm:text-4xl">{guide.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{guide.intro}</p>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted">
              <time dateTime={guide.date}>{new Date(guide.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} />{guide.readingTime} de lecture</span>
            </div>
            <a href="#offres" className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Passer à l'action — dès 9 € <ArrowRight size={15} />
            </a>
          </div>
        </header>

        {/* Contenu gratuit (SEO) */}
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {guide.content.map((block, i) => {
              if (block.type === "h2") {
                return <h2 key={i} className="mt-10 font-sans text-2xl font-extrabold text-dark">{block.text}</h2>;
              }
              if (block.type === "p") {
                return <p key={i} className="mt-5 text-base leading-relaxed text-muted">{block.text}</p>;
              }
              return (
                <ul key={i} className="mt-5 space-y-2.5">
                  {block.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-base leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{it}
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>

        {/* Offres payantes */}
        <section id="offres" className="scroll-mt-24 bg-surface px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Passez à l'action</p>
              <h2 className="mt-4 font-sans text-3xl font-extrabold text-dark sm:text-4xl">3 façons de vous lancer</h2>
              <p className="mt-4 text-muted">Le guide pour faire seul, l'accompagnement pour le faire avec nous, ou la délégation complète.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {guide.products.map((product) => (
                <div
                  key={product.id}
                  className={`relative flex flex-col rounded-2xl border bg-white p-7 ${product.featured ? "border-primary shadow-xl shadow-primary/10 lg:-mt-3 lg:mb-3" : "border-border"}`}
                >
                  {product.featured ? (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-bold text-white">
                      <Star size={11} /> Le plus populaire
                    </span>
                  ) : null}
                  <h3 className="font-sans text-lg font-extrabold text-dark">{product.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-sans text-4xl font-extrabold text-dark">{product.price} €</span>
                    <span className="text-sm text-muted">TTC</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{product.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-3">
                    {product.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-dark">
                        <Check size={16} className="mt-0.5 shrink-0 text-green" />{item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <BuyButton productId={product.id} label={product.cta} variant={product.featured ? "primary" : "outline"} />
                  </div>
                </div>
              ))}
            </div>

            {/* 3e voie : delegation complete */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white p-7 sm:flex-row">
              <div>
                <h3 className="font-sans text-lg font-extrabold text-dark">Vous préférez tout déléguer ?</h3>
                <p className="mt-1 text-sm text-muted">On gère votre présence sociale de A à Z. Audit gratuit pour estimer votre projet.</p>
              </div>
              <Link href={guide.relatedService.href} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary px-6 py-3 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/5">
                {guide.relatedService.label} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-sans text-2xl font-extrabold text-dark sm:text-3xl">Questions fréquentes</h2>
            <div className="mt-8 space-y-4">
              {guide.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-white p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-dark">
                    {f.q}
                    <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
