import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialite | My-DTM Digital Agency",
  description: "Politique de confidentialite de my-dtm.fr — traitement des donnees personnelles, droits RGPD et cookies.",
  alternates: { canonical: "https://my-dtm.fr/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl font-black text-dark">Politique de confidentialite</h1>
      <p className="mt-4 text-sm text-muted">Derniere mise a jour : mars 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-dark">
        <div>
          <h2>1. Responsable du traitement</h2>
          <p>
            My-DTM Digital Agency, micro-entreprise basee a Paris, France.
            Contact : contact@my-dtm.fr | +33 7 43 53 75 51.
          </p>
        </div>

        <div>
          <h2>2. Donnees collectees</h2>
          <p>Nous collectons uniquement les donnees que vous nous transmettez volontairement :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Numero de telephone (optionnel)</li>
            <li>Description de votre projet</li>
          </ul>
        </div>

        <div>
          <h2>3. Finalite du traitement</h2>
          <p>Vos donnees sont utilisees exclusivement pour :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Repondre a votre demande de contact ou d&apos;audit</li>
            <li>Vous envoyer un devis personnalise</li>
            <li>Assurer le suivi de votre projet</li>
          </ul>
          <p className="mt-2">
            Vos donnees ne sont jamais vendues, louees ou partagees avec des tiers a des fins commerciales.
          </p>
        </div>

        <div>
          <h2>4. Base legale</h2>
          <p>
            Le traitement repose sur votre consentement (article 6.1.a du RGPD) lorsque vous remplissez
            le formulaire de contact, et sur l&apos;execution d&apos;un contrat (article 6.1.b) dans le cadre d&apos;une prestation.
          </p>
        </div>

        <div>
          <h2>5. Duree de conservation</h2>
          <p>
            Vos donnees de contact sont conservees pendant 3 ans a compter de votre derniere interaction avec nous.
            Les donnees liees a un contrat sont conservees conformement aux obligations legales (5 ans).
          </p>
        </div>

        <div>
          <h2>6. Vos droits</h2>
          <p>Conformement au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Droit d&apos;acces a vos donnees</li>
            <li>Droit de rectification</li>
            <li>Droit a l&apos;effacement</li>
            <li>Droit a la portabilite</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, envoyez un email a contact@my-dtm.fr.
          </p>
        </div>

        <div>
          <h2>7. Cookies</h2>
          <p>
            Le site my-dtm.fr utilise uniquement des cookies techniques strictement necessaires
            au bon fonctionnement du site. Aucun cookie de tracage publicitaire n&apos;est utilise.
          </p>
        </div>

        <div>
          <h2>8. Hebergement et sous-traitants</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>Hebergement :</strong> Vercel Inc. (Etats-Unis) — transfert encadre par les clauses contractuelles types de la Commission europeenne.</li>
            <li><strong>Envoi d&apos;emails :</strong> Resend (Etats-Unis) — utilise pour le traitement des formulaires de contact.</li>
          </ul>
        </div>

        <div>
          <h2>9. Contact</h2>
          <p>
            Pour toute question relative a cette politique, contactez-nous a{" "}
            <a href="mailto:contact@my-dtm.fr" className="text-violet underline">
              contact@my-dtm.fr
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
