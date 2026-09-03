import { NextResponse } from "next/server";
import { createFormToken } from "@/lib/form-token";

// Émet un jeton de formulaire signé (voir @/lib/form-token). Appelé au montage
// des formulaires ; renvoyé lors de la soumission pour prouver l'interaction
// réelle et mesurer le temps de remplissage. Jamais mis en cache.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { token: createFormToken(Date.now()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
