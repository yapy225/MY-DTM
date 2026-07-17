import "server-only";

// --- Secret de signature HMAC de l'application ----------------------------
// Sert a signer : le cookie de session /pilotage ET les tokens de
// telechargement des ebooks. Volontairement DECOUPLE de la cle Stripe : une
// fuite de l'une ne doit jamais compromettre l'autre.
//
// Precedence :
//   1. APP_SIGNING_SECRET      (nom canonique, a privilegier)
//   2. DOWNLOAD_SIGNING_SECRET (nom historique deja pose en prod → compat
//      ascendante : les cookies et tokens deja emis restent valides)
//
// Si aucun n'est defini, on ECHOUE bruyamment. Jamais de secret code en dur :
// une constante publique dans le code source rendrait cookies et tokens
// forgeables par n'importe qui. Le throw est lazy (appele a la requete, pas a
// l'import) pour ne pas casser le build quand l'env n'est pas encore charge.
export function signingSecret(): string {
  const secret = process.env.APP_SIGNING_SECRET || process.env.DOWNLOAD_SIGNING_SECRET;
  if (!secret) {
    throw new Error(
      "Secret de signature manquant : definir APP_SIGNING_SECRET dans l'environnement " +
        "(ou conserver DOWNLOAD_SIGNING_SECRET). Aucun fallback code en dur n'est autorise.",
    );
  }
  return secret;
}
