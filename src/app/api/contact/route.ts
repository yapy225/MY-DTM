import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 },
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "My-DTM Contact <contact@my-dtm.fr>",
      to: ["contact@my-dtm.fr"],
      replyTo: email,
      subject: `Nouveau message de ${name} — ${service || "Contact"}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Telephone :</strong> ${phone || "Non renseigne"}</p>
        <p><strong>Service :</strong> ${service || "Non precise"}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 },
    );
  }
}
