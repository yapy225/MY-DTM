import { NextResponse } from "next/server";
import { createDownloadToken } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";
import { recordLead } from "@/lib/pilotage/leads";

// Livraison d'un aimant à leads (ebook gratuit) contre email.
// Flux : email → lead enregistré (audience Resend) → email au visiteur avec un
// lien de téléchargement signé (HMAC, 7 j) vers /api/download. Pas de paiement,
// pas de base de données. Réutilise la même plomberie que les ebooks payants.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { email: 254, name: 200, source: 60 } as const;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://my-dtm.fr";

function escapeHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Rate-limit best-effort en mémoire (par instance serverless).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
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

    // Honeypot : rempli = bot → 200 muet.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }
    if (rateLimited(clientIp(req))) {
      return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
    }

    const email = String(body.email ?? "").trim().slice(0, MAX.email);
    const name = String(body.name ?? "").trim().slice(0, MAX.name);
    const source = String(body.source ?? "site").trim().slice(0, MAX.source);
    const productId = String(body.productId ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }

    // On ne génère un token que pour un produit livrable réel (PDF avec fichier).
    const found = getProductById(productId);
    if (!found || found.product.type !== "pdf" || !found.product.file) {
      return NextResponse.json({ error: "Ressource introuvable." }, { status: 404 });
    }

    const token = createDownloadToken(productId, Math.floor(Date.now() / 1000));
    const downloadUrl = `${SITE_URL}/api/download?token=${encodeURIComponent(token)}`;
    const guideUrl = `${SITE_URL}/guides/${found.guide.slug}`;

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "My DTM <hello@my-dtm.fr>",
      to: [email],
      subject: "Votre Kit conformité facturation électronique 📄",
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0e0a1a;line-height:1.6">
          <h2 style="color:#7c0dbe">Voici votre Kit conformité</h2>
          <p>Merci de votre confiance ! Votre guide complet pour vous mettre en conformité avec la facturation électronique (2026-2027) est prêt.</p>
          <p style="margin:28px 0">
            <a href="${downloadUrl}" style="background:linear-gradient(135deg,#7c0dbe,#4d71ee);color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:10px;display:inline-block">Télécharger le Kit (PDF)</a>
          </p>
          <p style="font-size:13px;color:#52525b">Ce lien est valable 7 jours. S'il expire, revenez sur le guide pour en redemander un.</p>
          <hr style="border:none;border-top:1px solid #e7e1f3;margin:24px 0" />
          <p>Un doute sur votre situation, ou envie qu'on le fasse avec vous ? Découvrez l'accompagnement conformité (90 min en visio) sur <a href="${guideUrl}" style="color:#7c0dbe">le guide</a>.</p>
          <p style="font-size:12px;color:#52525b">Document d'information — ne constitue pas un conseil fiscal individualisé. Vérifiez votre situation auprès de la DGFiP ou de votre expert-comptable.<br/>© My-DTM Paris — Agence digitale · my-dtm.fr · hello@my-dtm.fr</p>
        </div>`,
    });

    // Enregistre le lead (best-effort). `source` tracé dans le service.
    await recordLead({ name, email, service: `kit-facturation:${escapeHtml(source)}` });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("lead-magnet error:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi. Réessayez ou écrivez-nous à hello@my-dtm.fr." }, { status: 500 });
  }
}
