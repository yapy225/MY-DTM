import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, createDownloadToken, getCalLink } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://my-dtm.fr";
const FROM = "My-DTM <hello@my-dtm.fr>";
const INTERNAL_TO = process.env.CONTACT_NOTIFY_TO || "yapy.mambo@gmail.com";

// Stripe a besoin du corps brut pour verifier la signature : pas de parsing JSON.
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature ?? "", webhookSecret);
  } catch (err) {
    console.error("Webhook signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const email = session.customer_details?.email || session.customer_email;
    const buyerName = session.customer_details?.name || "";

    if (productId && email) {
      try {
        // event.id est stable entre les re-tentatives Stripe du meme evenement :
        // il sert de cle d'idempotence pour ne pas re-livrer en double.
        await deliver(productId, email, buyerName, event.id);
      } catch (err) {
        // On loggue mais on renvoie 200 : Stripe ne doit pas re-tenter a l'infini
        // sur une erreur de livraison. La page de succes reste un filet de secours.
        console.error("Erreur de livraison:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}

async function deliver(productId: string, email: string, buyerName: string, eventId: string) {
  const found = getProductById(productId);
  if (!found) return;
  const { guide, product } = found;

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const hello = buyerName ? `Bonjour ${buyerName},` : "Bonjour,";

  if (product.type === "pdf") {
    const token = createDownloadToken(product.id, Math.floor(Date.now() / 1000));
    const link = `${SITE_URL}/api/download?token=${encodeURIComponent(token)}`;
    await resend.emails.send(
      {
        from: FROM,
        to: [email],
        subject: `Votre ebook : ${guide.title}`,
        html: `
        <p>${hello}</p>
        <p>Merci pour votre achat ! Voici votre accès à <strong>${guide.title}</strong>.</p>
        <p><a href="${link}" style="display:inline-block;background:#7c0dbe;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Télécharger mon ebook (PDF)</a></p>
        <p style="color:#6b7280;font-size:13px;">Ce lien est valable 7 jours. Conservez cet email.</p>
        <p>Une question ? Répondez simplement à cet email.</p>
        <p>— L'équipe My-DTM</p>
      `,
      },
      // Dedup Resend (fenetre 24h) : un retry Stripe du meme event ne renvoie
      // pas un 2e email a l'acheteur.
      { idempotencyKey: `deliver-${eventId}-buyer` },
    );
  } else {
    const cal = getCalLink();
    await resend.emails.send(
      {
        from: FROM,
        to: [email],
        subject: `Réservez votre accompagnement : ${guide.title}`,
        html: `
        <p>${hello}</p>
        <p>Merci ! Votre <strong>accompagnement</strong> est confirmé. Dernière étape : choisissez le créneau qui vous arrange.</p>
        <p><a href="${cal}" style="display:inline-block;background:#7c0dbe;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Réserver mon créneau (visio 90 min)</a></p>
        <p style="color:#6b7280;font-size:13px;">L'ebook complet est inclus — on le déroulera ensemble en direct.</p>
        <p>À très vite,<br/>— L'équipe My-DTM</p>
      `,
      },
      { idempotencyKey: `deliver-${eventId}-buyer` },
    );
    // Notification interne pour preparer la session.
    await resend.emails.send(
      {
        from: FROM,
        to: [INTERNAL_TO],
        subject: `🗓️ Accompagnement vendu — ${email}`,
        html: `<p>Nouvel accompagnement « ${product.name} » (${guide.title}) acheté par <strong>${email}</strong>${buyerName ? ` (${buyerName})` : ""}. En attente de réservation Cal.com.</p>`,
      },
      { idempotencyKey: `deliver-${eventId}-internal` },
    );
  }
}
