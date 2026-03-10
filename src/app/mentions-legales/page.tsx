import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Legales | My-DTM Digital Agency",
  description: "Mentions legales du site my-dtm.fr — informations sur l'editeur, l'hebergeur et les conditions d'utilisation.",
  alternates: { canonical: "https://my-dtm.fr/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl font-black text-dark">Mentions legales</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-dark">
        <div>
          <h2>1. Editeur du site</h2>
          <p>
            Le site <strong>my-dtm.fr</strong> est edite par My-DTM Digital Agency, micro-entreprise immatriculee en France.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Responsable de la publication : My-DTM Digital Agency</li>
            <li>Email : contact@my-dtm.fr</li>
            <li>Telephone : +33 7 43 53 75 51</li>
            <li>Adresse : Paris, France</li>
          </ul>
        </div>

        <div>
          <h2>2. Hebergement</h2>
          <p>
            Le site est heberge par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, Etats-Unis.
            Site : vercel.com.
          </p>
        </div>

        <div>
          <h2>3. Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus presents sur le site my-dtm.fr (textes, images, logos, illustrations, mises en page)
            sont la propriete exclusive de My-DTM Digital Agency ou de leurs auteurs respectifs.
            Toute reproduction, representation ou diffusion, en tout ou partie, sans autorisation ecrite prealable est interdite.
          </p>
        </div>

        <div>
          <h2>4. Donnees personnelles</h2>
          <p>
            Les informations recueillies via le formulaire de contact sont destinees exclusivement a My-DTM Digital Agency
            pour le traitement de votre demande. Conformement au RGPD, vous disposez d&apos;un droit d&apos;acces,
            de rectification et de suppression de vos donnees en nous contactant a contact@my-dtm.fr.
          </p>
          <p className="mt-2">
            Pour plus de details, consultez notre{" "}
            <a href="/politique-de-confidentialite" className="text-violet underline">
              Politique de confidentialite
            </a>.
          </p>
        </div>

        <div>
          <h2>5. Cookies</h2>
          <p>
            Le site my-dtm.fr utilise uniquement des cookies techniques necessaires a son bon fonctionnement.
            Aucun cookie publicitaire ou de tracage n&apos;est installe sans votre consentement.
          </p>
        </div>

        <div>
          <h2>6. Limitation de responsabilite</h2>
          <p>
            My-DTM Digital Agency s&apos;efforce de fournir des informations exactes et a jour sur le site.
            Cependant, elle ne saurait etre tenue responsable des erreurs, omissions ou des resultats
            obtenus suite a l&apos;utilisation de ces informations.
          </p>
        </div>
      </div>
    </section>
  );
}
