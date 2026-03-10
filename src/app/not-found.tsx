import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-black text-gradient-violet font-serif">404</span>
      <h1 className="mt-4 font-serif text-3xl font-black text-dark">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-muted">
        La page que vous cherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-violet to-gold px-8 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/30"
      >
        Retour a l&apos;accueil
      </Link>
    </section>
  );
}
