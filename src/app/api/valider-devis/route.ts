import { NextResponse } from "next/server";
import { verifyDevisToken } from "@/lib/devis-token";
import { verifyFormToken } from "@/lib/form-token";

// Validation d'un devis par le client (signature électronique « simple » eIDAS).
// Flux : le client scanne le QR du devis → page /valider-devis → il saisit
// nom + email, coche « Bon pour accord » → cette route vérifie le jeton signé,
// puis envoie DEUX emails via Resend :
//   1. une PREUVE d'acceptation en interne (audit trail : qui, quand, IP, devis) ;
//   2. une confirmation au client.
// Aucune base de données : l'email de preuve EST la piste d'audit archivable.
// Le paiement (Stripe) et l'émission de la facture d'acompte restent HUMAN_GATE.

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://my-dtm.fr";
const NOTIFY_TO = process.env.CONTACT_NOTIFY_TO || "yapy.mambo@gmail.com";
const MAX = { email: 254, name: 200 } as const;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

// Rate-limit best-effort en mémoire (par instance serverless).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000)
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
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
    // Jeton de formulaire (preuve d'interaction réelle, anti-bot).
    const tok = verifyFormToken(
      typeof body.formToken === "string" ? body.formToken : undefined,
      Date.now(),
      { minAgeMs: 1500 },
    );
    if (!tok.ok) {
      if (tok.reason === "too_fast") return NextResponse.json({ success: true });
      return NextResponse.json(
        { error: "Session expirée. Rechargez la page et réessayez." },
        { status: 400 },
      );
    }
    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    // Jeton du devis (signé). Toute altération du montant/objet l'invalide.
    const check = verifyDevisToken(
      typeof body.token === "string" ? body.token : undefined,
      Date.now(),
    );
    if (!check.ok) {
      return NextResponse.json({ error: "Lien de validation invalide." }, { status: 400 });
    }
    if (check.expired) {
      return NextResponse.json(
        { error: "Ce devis a expiré. Contactez-nous pour un devis à jour." },
        { status: 409 },
      );
    }

    const nom = String(body.nom ?? "").trim().slice(0, MAX.name);
    const email = String(body.email ?? "").trim().slice(0, MAX.email);
    const consent = body.consent === true;

    if (nom.length < 2) {
      return NextResponse.json({ error: "Nom et prénom requis." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json(
        { error: "Cochez « Bon pour accord » pour valider." },
        { status: 400 },
      );
    }

    const { devis } = check;
    const ip = clientIp(req);
    const acceptedAt = new Date();
    const stampFr = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Europe/Paris",
    }).format(acceptedAt);

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1) Preuve d'acceptation (audit trail) → interne. À archiver dans
    //    ~/Documents/Projets/My DTM Paris/_archive/preuves-acceptation/.
    await resend.emails.send({
      from: "My DTM Devis <hello@my-dtm.fr>",
      to: [NOTIFY_TO],
      subject: `✅ Devis ${devis.id} ACCEPTÉ — ${escapeHtml(devis.client)}`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0e0a1a;line-height:1.6">
          <h2 style="color:#7c0dbe">Devis accepté (bon pour accord)</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            <tr><td style="padding:4px 0;color:#52525b">Devis</td><td><strong>${escapeHtml(devis.id)}</strong></td></tr>
            <tr><td style="padding:4px 0;color:#52525b">Client</td><td>${escapeHtml(devis.client)}</td></tr>
            <tr><td style="padding:4px 0;color:#52525b">Objet</td><td>${escapeHtml(devis.objet)}</td></tr>
            <tr><td style="padding:4px 0;color:#52525b">Montant HT</td><td>${eur(devis.montantHT)}</td></tr>
            <tr><td style="padding:4px 0;color:#52525b">Signataire</td><td>${escapeHtml(nom)} &lt;${escapeHtml(email)}&gt;</td></tr>
            <tr><td style="padding:4px 0;color:#52525b">Accepté le</td><td>${escapeHtml(stampFr)}</td></tr>
            <tr><td style="padding:4px 0;color:#52525b">IP</td><td>${escapeHtml(ip)}</td></tr>
          </table>
          <p style="margin-top:20px;padding:12px 16px;background:#faf6ec;border-left:3px solid #b8860b;font-size:13px">
            <strong>Prochaine étape (HUMAN_GATE) :</strong> émettre la facture d'acompte
            (50 %) et le lien de paiement Stripe. Rien n'est encaissé automatiquement.
          </p>
          <p style="font-size:12px;color:#52525b">Preuve d'acceptation — signature électronique simple (eIDAS). Conservez cet email comme piste d'audit.</p>
        </div>`,
    });

    // 2) Confirmation → client.
    await resend.emails.send({
      from: "My DTM Paris <hello@my-dtm.fr>",
      to: [email],
      subject: `Confirmation — votre acceptation du devis ${devis.id}`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0e0a1a;line-height:1.6">
          <h2 style="color:#7c0dbe">Merci ${escapeHtml(nom)} !</h2>
          <p>Nous confirmons la bonne réception de votre accord sur le devis
             <strong>${escapeHtml(devis.id)}</strong> (${escapeHtml(devis.objet)}),
             d'un montant de <strong>${eur(devis.montantHT)} HT</strong>.</p>
          <p>Accord enregistré le <strong>${escapeHtml(stampFr)}</strong>.</p>
          <p>Vous allez recevoir sous peu la <strong>facture d'acompte (50 %)</strong>
             accompagnée d'un lien de paiement sécurisé. La mise en œuvre démarre dès
             réception de l'acompte.</p>
          <hr style="border:none;border-top:1px solid #e7e1f3;margin:24px 0" />
          <p style="font-size:12px;color:#52525b">My DTM Paris — pour Dream Team Africa (SIREN 852 965 201)<br/>
             TVA non applicable, art. 293 B du CGI · <a href="${SITE_URL}" style="color:#7c0dbe">my-dtm.fr</a> · hello@my-dtm.fr</p>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("valider-devis error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la validation. Réessayez ou écrivez-nous à hello@my-dtm.fr." },
      { status: 500 },
    );
  }
}
