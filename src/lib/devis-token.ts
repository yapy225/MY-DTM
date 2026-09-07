import "server-only";
import crypto from "crypto";
import { signingSecret } from "@/lib/secret";

// Jeton de validation de devis, AUTO-PORTEUR et signé (HMAC-SHA256).
// Le jeton encode le devis lui-même (numéro, client, objet, montant, dates) puis
// une signature qui empêche toute falsification. Conséquence : aucune base de
// données et aucun redéploiement par devis — on génère le jeton hors-ligne, on
// l'imprime en QR code sur le PDF, et la page /valider-devis le décode + vérifie.
//
// Format : `${base64url(JSON payload)}.${hmacHex}`
// La signature couvre le corps base64url ; modifier un euro invalide le jeton.

export type DevisPayload = {
  id: string; // ex. "DEV-2026-001"
  client: string; // ex. "Cabinet IBC"
  objet: string; // libellé court de la prestation
  montantHT: number; // en euros
  emisLe: string; // date d'émission ISO "2026-09-06"
  validiteJours: number; // ex. 15
};

function sign(data: string): string {
  return crypto.createHmac("sha256", signingSecret()).update(data).digest("hex");
}

export function createDevisToken(p: DevisPayload): string {
  const body = Buffer.from(JSON.stringify(p), "utf8").toString("base64url");
  return `${body}.${sign(body)}`;
}

export type DevisCheck =
  | { ok: true; devis: DevisPayload; expired: boolean }
  | { ok: false; reason: "missing" | "invalid" };

export function verifyDevisToken(token: string | undefined, nowMs: number): DevisCheck {
  if (!token) return { ok: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "invalid" };
  const [body, sig] = parts;
  const expected = sign(body);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return { ok: false, reason: "invalid" };
  }
  let devis: DevisPayload;
  try {
    devis = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as DevisPayload;
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (
    typeof devis?.id !== "string" ||
    typeof devis?.client !== "string" ||
    typeof devis?.montantHT !== "number"
  ) {
    return { ok: false, reason: "invalid" };
  }
  // Expiration informative : la validité du devis (horloge A du PROCESS.md).
  const emis = Date.parse(devis.emisLe);
  const expired =
    Number.isFinite(emis) && nowMs > emis + devis.validiteJours * 86_400_000;
  return { ok: true, devis, expired };
}
