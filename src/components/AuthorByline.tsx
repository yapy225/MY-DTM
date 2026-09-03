import Link from "next/link";
import { AUTHOR } from "@/lib/author";

// Signature d'auteur (byline) réutilisée sur les articles et guides.
// Renvoie vers la fiche auteur — signal E-E-A-T.
export default function AuthorByline({ className = "" }: { className?: string }) {
  return (
    <Link
      href={`/auteur/${AUTHOR.slug}`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
        {AUTHOR.initials}
      </span>
      <span className="text-sm text-muted">
        Par <span className="font-semibold text-dark group-hover:text-primary">{AUTHOR.name}</span>
        <span className="hidden sm:inline"> · {AUTHOR.role}</span>
      </span>
    </Link>
  );
}
