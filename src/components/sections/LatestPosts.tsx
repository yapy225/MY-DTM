import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog/posts";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Le blog</p>
            <h2 className="mt-3 font-sans text-3xl font-extrabold text-dark sm:text-4xl">
              Derniers articles
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Guides concrets : WhatsApp Business, tracking Meta, billetterie événementielle, SEO et sécurité web.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary"
          >
            Tous les articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.05]"
            >
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{p.category}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-dark group-hover:text-primary">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><Clock size={13} />{p.readingTime}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">Lire <ArrowRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
