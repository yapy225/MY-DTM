import "server-only";
import crypto from "crypto";
import { signingSecret } from "@/lib/secret";

// Jeton de formulaire signé (HMAC) : preuve qu'un formulaire réel a été affiché,
// et mesure du temps de remplissage. Défense anti-bot complémentaire du honeypot :
//   - un bot qui poste en direct sur l'API n'a pas de jeton → rejeté ;
//   - un remplissage trop rapide (< seuil) trahit un bot → rejeté ;
//   - un jeton trop vieux (rejoué) → expiré.
// Le jeton porte uniquement l'horodatage d'émission ; sa signature empêche de le
// forger. Aucun état serveur (stateless), aucune base.

function sign(payload: string): string {
  return crypto.createHmac("sha256", signingSecret()).update(payload).digest("hex");
}

export function createFormToken(nowMs: number): string {
  const payload = String(nowMs);
  return `${payload}.${sign(payload)}`;
}

export type FormTokenCheck =
  | { ok: true }
  | { ok: false; reason: "missing" | "invalid" | "too_fast" | "expired" };

export function verifyFormToken(
  token: string | undefined,
  nowMs: number,
  opts?: { minAgeMs?: number; maxAgeMs?: number },
): FormTokenCheck {
  const minAgeMs = opts?.minAgeMs ?? 2500; // < 2,5 s pour remplir = bot
  const maxAgeMs = opts?.maxAgeMs ?? 2 * 60 * 60 * 1000; // 2 h de validité

  if (!token) return { ok: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "invalid" };
  const [issuedStr, sig] = parts;
  const expected = sign(issuedStr);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return { ok: false, reason: "invalid" };
  }
  const issued = Number(issuedStr);
  if (!Number.isFinite(issued)) return { ok: false, reason: "invalid" };
  const age = nowMs - issued;
  if (age < minAgeMs) return { ok: false, reason: "too_fast" };
  if (age > maxAgeMs) return { ok: false, reason: "expired" };
  return { ok: true };
}
