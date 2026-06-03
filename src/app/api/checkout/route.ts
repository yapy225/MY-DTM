import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://my-dtm.fr";

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Paiement non configuré." }, { status: 503 });
    }

    const { productId } = await req.json();
    const found = getProductById(productId);
    if (!found) {
      return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
    }
    const { guide, product } = found;

    const successUrl = `${SITE_URL}/guides/${guide.slug}/merci?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${SITE_URL}/guides/${guide.slug}?annule=1`;

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: product.priceCents,
            product_data: {
              name: `${guide.title} — ${product.name}`,
              description: product.tagline,
            },
          },
        },
      ],
      // Stripe collecte l'email de l'acheteur (sert a la livraison).
      billing_address_collection: "auto",
      metadata: { productId: product.id, guideSlug: guide.slug },
      // Recopie dans le PaymentIntent pour retrouver le produit cote webhook.
      payment_intent_data: { metadata: { productId: product.id, guideSlug: guide.slug } },
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: "fr",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement." }, { status: 500 });
  }
}
