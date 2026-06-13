import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

// --- Auth du dashboard /pilotage ------------------------------------------
// Pas de systeme de comptes sur le site : on protege /pilotage par un mot de
// passe unique (env PILOTAGE_PASSWORD) + un cookie de session signe en HMAC.
// Aucune base de donnees, aucune dependance externe.

const COOKIE_NAME = "pilotage_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 jours

function secret(): string {
  // Reutilise un secret existant si PILOTAGE_SECRET n'est pas defini.
  return (
    process.env.PILOTAGE_SECRET ||
    process.env.DOWNLOAD_SIGNING_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    "dev-pilotage-secret-change-me"
  );
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

// Le mot de passe attendu. Si non configure, l'acces est verrouille (pas de
// fallback ouvert : on prefere bloquer plutot que d'exposer le dashboard).
export function isConfigured(): boolean {
  return Boolean(process.env.PILOTAGE_PASSWORD);
}

// Compare le mot de passe saisi en temps constant.
export function checkPassword(input: string): boolean {
  const expected = process.env.PILOTAGE_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Fabrique la valeur du cookie : "<expiry>.<signature>".
export function createSessionValue(nowSeconds: number): string {
  const expiry = nowSeconds + SESSION_TTL_SECONDS;
  const payload = String(expiry);
  return `${payload}.${sign(payload)}`;
}

function verifySessionValue(value: string | undefined, nowSeconds: number): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [expiryStr, signature] = parts;
  const expected = sign(expiryStr);
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return false;
  }
  const expiry = Number(expiryStr);
  return Number.isFinite(expiry) && expiry > nowSeconds;
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

// Verifie depuis les cookies de la requete (server component / route handler).
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return verifySessionValue(value, Math.floor(Date.now() / 1000));
}
