import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllGuides } from "@/lib/guides/guides";

export const metadata: Metadata = {
  title: "Guides & ebooks — Automatisation, WhatsApp, réseaux sociaux",
  description:
    "Des guides complets et des ebooks prêts à l'emploi pour automatiser votre activité : réseaux sociaux, WhatsApp Business, tracking. Méthode + modèles par une agence digitale.",
  keywords: ["guides automatisation", "ebook réseaux sociaux", "ebook WhatsApp Business", "guide marketing digital"],
  alternates: { canonical: "https://my-dtm.fr/guides" },
  openGraph: {
    title: "Guides & ebooks — My-DTM",
    description: "Guides complets et ebooks prêts à l'emploi pour automatiser votre activité.",
    url: "https://my-dtm.fr/guides",
    type: "website",
    locale: "fr_FR",
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">Guides & ebooks</p>
          <h1 className="mt-4 max-w-3xl font-sans text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
            Des méthodes prêtes à l'emploi pour automatiser votre activité
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Chaque guide est gratuit à lire. Pour passer à l'action, un ebook clé en main et un accompagnement en option.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => {
            const ebook = g.products.find((p) => p.type === "pdf");
            return (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{g.category}</span>
                  {ebook ? <span className="text-sm font-extrabold text-dark">dès {ebook.price} €</span> : null}
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug text-dark group-hover:text-primary">{g.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{g.description}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} />{g.readingTime}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">Lire le guide <ArrowRight size={13} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
