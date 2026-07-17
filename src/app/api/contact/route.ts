import { NextResponse } from "next/server";
import { recordLead } from "@/lib/pilotage/leads";

// Bornes de validation (anti-payload massif).
const MAX = { name: 200, email: 254, phone: 40, service: 120, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Échappe les métacaractères HTML : les champs saisis par l'internaute sont
// injectés dans le mail de notification, jamais faire confiance à leur contenu.
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Rate-limit best-effort en mémoire (par instance serverless) : un garde-fou
// suffisant contre le flood basique. Pour une limite globale stricte, brancher
// un store partagé (Vercel KV / Upstash).
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Purge opportuniste pour éviter que la Map ne gonfle indéfiniment.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    // Honeypot : champ invisible pour l'humain, souvent rempli par les bots.
    // Rempli = on répond 200 sans rien envoyer (le bot croit avoir réussi).
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    // Normalisation + bornes.
    const name = String(body.name ?? "").trim().slice(0, MAX.name);
    const email = String(body.email ?? "").trim().slice(0, MAX.email);
    const phone = String(body.phone ?? "").trim().slice(0, MAX.phone);
    const service = String(body.service ?? "").trim().slice(0, MAX.service);
    const message = String(body.message ?? "").trim().slice(0, MAX.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Destinataire des notifications. LWS ne reçoit pas le courrier externe de
    // my-dtm.fr (à régler côté LWS) → on route vers une boîte fiable, surchargeable
    // par env CONTACT_NOTIFY_TO une fois la réception my-dtm.fr réparée.
    const notifyTo = process.env.CONTACT_NOTIFY_TO || "yapy.mambo@gmail.com";

    await resend.emails.send({
      from: "My-DTM Contact <hello@my-dtm.fr>",
      to: [notifyTo],
      replyTo: email,
      subject: `Nouveau message de ${escapeHtml(name)} — ${escapeHtml(service || "Contact")}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Telephone :</strong> ${phone ? escapeHtml(phone) : "Non renseigne"}</p>
        <p><strong>Service :</strong> ${service ? escapeHtml(service) : "Non precise"}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    // Enregistre le lead dans l'audience Resend (best-effort, ne bloque pas).
    await recordLead({ name, email, service });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 },
    );
  }
}
