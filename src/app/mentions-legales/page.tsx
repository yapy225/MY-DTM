import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | My-DTM Digital Agency",
  description: "Mentions légales du site my-dtm.fr — informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
  alternates: { canonical: "https://my-dtm.fr/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <h1 className="font-sans text-4xl font-extrabold text-dark">Mentions légales</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-dark">
        <div>
          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>my-dtm.fr</strong> est édité par My-DTM Digital Agency, micro-entreprise immatriculée en France.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Responsable de la publication : My-DTM Digital Agency</li>
            <li>Email : hello@my-dtm.fr</li>
            <li>Téléphone : +33 7 43 53 75 51</li>
            <li>Adresse : Paris, France</li>
          </ul>
        </div>

        <div>
          <h2>2. Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            Site : vercel.com.
          </p>
        </div>

        <div>
          <h2>3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur le site my-dtm.fr (textes, images, logos, illustrations, mises en page)
            sont la propriété exclusive de My-DTM Digital Agency ou de leurs auteurs respectifs.
            Toute reproduction, représentation ou diffusion, en tout ou partie, sans autorisation écrite préalable est interdite.
          </p>
        </div>

        <div>
          <h2>4. Données personnelles</h2>
          <p>
            Les informations recueillies via le formulaire de contact sont destinées exclusivement à My-DTM Digital Agency
            pour le traitement de votre demande. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
            de rectification et de suppression de vos données en nous contactant à hello@my-dtm.fr.
          </p>
          <p className="mt-2">
            Pour plus de détails, consultez notre{" "}
            <a href="/politique-de-confidentialite" className="text-primary underline">
              Politique de confidentialité
            </a>.
          </p>
        </div>

        <div>
          <h2>5. Cookies</h2>
          <p>
            Le site my-dtm.fr utilise uniquement des cookies techniques nécessaires à son bon fonctionnement.
            Aucun cookie publicitaire ou de traçage n&apos;est installé sans votre consentement.
          </p>
        </div>

        <div>
          <h2>6. Limitation de responsabilité</h2>
          <p>
            My-DTM Digital Agency s&apos;efforce de fournir des informations exactes et à jour sur le site.
            Cependant, elle ne saurait être tenue responsable des erreurs, omissions ou des résultats
            obtenus suite à l&apos;utilisation de ces informations.
          </p>
        </div>
      </div>
    </section>
  );
}
