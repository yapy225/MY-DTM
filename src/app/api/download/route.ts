import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyDownloadToken } from "@/lib/stripe";
import { getProductById } from "@/lib/guides/guides";

// Sert le PDF d'un ebook UNIQUEMENT si le token signe est valide et non expire.
// Les PDF vivent dans private/ebooks/ (hors du dossier public, donc non
// accessibles en direct). Voir next.config.ts (outputFileTracingIncludes).
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Lien invalide." }, { status: 400 });
  }

  const productId = verifyDownloadToken(token, Math.floor(Date.now() / 1000));
  if (!productId) {
    return NextResponse.json({ error: "Lien invalide ou expiré." }, { status: 403 });
  }

  const found = getProductById(productId);
  if (!found || found.product.type !== "pdf" || !found.product.file) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  // Garde-fou : on ne sert que le nom de fichier de base, jamais un chemin.
  const fileName = path.basename(found.product.file);
  const filePath = path.join(process.cwd(), "private", "ebooks", fileName);

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Fichier indisponible. Contactez-nous à hello@my-dtm.fr." },
      { status: 404 },
    );
  }
}
