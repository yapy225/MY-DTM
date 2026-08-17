import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | My-DTM Digital Agency",
  description: "Politique de confidentialité de my-dtm.fr — traitement des données personnelles, droits RGPD et cookies.",
  alternates: { canonical: "https://my-dtm.fr/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <h1 className="font-sans text-4xl font-extrabold text-dark">Politique de confidentialité</h1>
      <p className="mt-4 text-sm text-muted">Dernière mise à jour : mars 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-dark">
        <div>
          <h2>1. Responsable du traitement</h2>
          <p>
            My-DTM Digital Agency, micro-entreprise basée à Paris, France.
            Contact : hello@my-dtm.fr | +33 7 43 53 75 51.
          </p>
        </div>

        <div>
          <h2>2. Données collectées</h2>
          <p>Nous collectons uniquement les données que vous nous transmettez volontairement :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Description de votre projet</li>
          </ul>
        </div>

        <div>
          <h2>3. Finalité du traitement</h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Répondre à votre demande de contact ou d&apos;audit</li>
            <li>Vous envoyer un devis personnalisé</li>
            <li>Assurer le suivi de votre projet</li>
          </ul>
          <p className="mt-2">
            Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
          </p>
        </div>

        <div>
          <h2>4. Base légale</h2>
          <p>
            Le traitement repose sur votre consentement (article 6.1.a du RGPD) lorsque vous remplissez
            le formulaire de contact, et sur l&apos;exécution d&apos;un contrat (article 6.1.b) dans le cadre d&apos;une prestation.
          </p>
        </div>

        <div>
          <h2>5. Durée de conservation</h2>
          <p>
            Vos données de contact sont conservées pendant 3 ans à compter de votre dernière interaction avec nous.
            Les données liées à un contrat sont conservées conformément aux obligations légales (5 ans).
          </p>
        </div>

        <div>
          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, envoyez un email à hello@my-dtm.fr.
          </p>
        </div>

        <div>
          <h2>7. Cookies</h2>
          <p>
            Le site my-dtm.fr utilise uniquement des cookies techniques strictement nécessaires
            au bon fonctionnement du site. Aucun cookie de traçage publicitaire n&apos;est utilisé.
          </p>
        </div>

        <div>
          <h2>8. Hébergement et sous-traitants</h2>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li><strong>Hébergement :</strong> Vercel Inc. (États-Unis) — transfert encadré par les clauses contractuelles types de la Commission européenne.</li>
            <li><strong>Envoi d&apos;emails :</strong> Resend (États-Unis) — utilisé pour le traitement des formulaires de contact.</li>
          </ul>
        </div>

        <div>
          <h2>9. Contact</h2>
          <p>
            Pour toute question relative à cette politique, contactez-nous à{" "}
            <a href="mailto:hello@my-dtm.fr" className="text-primary underline">
              hello@my-dtm.fr
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
