import { NextResponse } from "next/server";
import {
  checkPassword,
  isConfigured,
  createSessionValue,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/pilotage/auth";

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Dashboard non configuré (PILOTAGE_PASSWORD manquant)." },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  if (!checkPassword(password)) {
    // Retour vers la page de login avec un drapeau d'erreur.
    return NextResponse.redirect(new URL("/pilotage/login?err=1", req.url), { status: 303 });
  }

  const res = NextResponse.redirect(new URL("/pilotage", req.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, createSessionValue(Math.floor(Date.now() / 1000)), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
