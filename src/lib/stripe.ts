import "server-only";
import Stripe from "stripe";
import crypto from "crypto";

// Client Stripe instancie a la demande (cle dans Vercel > Env : STRIPE_SECRET_KEY).
// Lazy pour ne pas crasher au build quand la cle n'est pas presente.
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2026-05-27.dahlia",
    });
  }
  return _stripe;
}

// --- Tokens de telechargement signes (HMAC) -------------------------------
// Permet de livrer un PDF sans base de donnees : on signe { produit, expiration }
// avec un secret serveur, et la route /api/download verifie la signature.

const SIGNING_SECRET =
  process.env.DOWNLOAD_SIGNING_SECRET || process.env.STRIPE_SECRET_KEY || "dev-secret-change-me";

// Duree de validite d'un lien de telechargement : 7 jours.
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

function sign(payload: string): string {
  return crypto.createHmac("sha256", SIGNING_SECRET).update(payload).digest("hex");
}

// Cree un token autonome : "<productId>.<expiry>.<signature>"
export function createDownloadToken(productId: string, nowSeconds: number): string {
  const expiry = nowSeconds + TOKEN_TTL_SECONDS;
  const payload = `${productId}.${expiry}`;
  return `${payload}.${sign(payload)}`;
}

// Verifie un token et renvoie le productId si valide, sinon null.
export function verifyDownloadToken(token: string, nowSeconds: number): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [productId, expiryStr, signature] = parts;
  const payload = `${productId}.${expiryStr}`;
  const expected = sign(payload);
  // Comparaison a temps constant pour eviter les attaques par timing.
  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null;
  }
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < nowSeconds) return null;
  return productId;
}

// Lien de reservation Cal.com pour l'accompagnement (configurable par env).
export function getCalLink(): string {
  return process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/my-dtm";
}
