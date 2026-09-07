#!/usr/bin/env node
// Génère le jeton signé d'un devis + son URL de validation, et l'affiche.
// Le QR code lui-même se rend via `npx qrcode` (voir README) — ce script ne
// dépend d'AUCUN paquet ajouté au repo : uniquement `crypto` natif.
//
// Le jeton est AUTO-PORTEUR : il encode le devis (numéro, client, objet,
// montant, dates) + une signature HMAC. Doit correspondre EXACTEMENT au format
// de src/lib/devis-token.ts. Le secret est lu dans l'environnement, puis en
// dernier recours dans .env.local / .env (DOWNLOAD_SIGNING_SECRET ou
// APP_SIGNING_SECRET) — le MÊME que celui déployé sur Vercel, sinon le jeton
// sera rejeté en production.
//
// Usage :
//   node scripts/generate-devis-qr.mjs '{"id":"DEV-2026-001","client":"Cabinet IBC","objet":"Dispositif com. digitale","montantHT":3000,"emisLe":"2026-09-06","validiteJours":15}'

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

function loadSecret() {
  if (process.env.APP_SIGNING_SECRET) return process.env.APP_SIGNING_SECRET;
  if (process.env.DOWNLOAD_SIGNING_SECRET) return process.env.DOWNLOAD_SIGNING_SECRET;
  for (const f of [".env.local", ".env"]) {
    try {
      const txt = fs.readFileSync(path.resolve(process.cwd(), f), "utf8");
      for (const key of ["APP_SIGNING_SECRET", "DOWNLOAD_SIGNING_SECRET"]) {
        const m = txt.match(new RegExp(`^${key}=(.*)$`, "m"));
        if (m) return m[1].trim().replace(/^["']|["']$/g, "");
      }
    } catch {
      /* fichier absent */
    }
  }
  throw new Error(
    "Secret de signature introuvable : définir APP_SIGNING_SECRET (ou DOWNLOAD_SIGNING_SECRET) dans l'env ou .env.local",
  );
}

function createDevisToken(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return `${body}.${sig}`;
}

const REQUIRED = ["id", "client", "objet", "montantHT", "emisLe", "validiteJours"];

function main() {
  const raw = process.argv[2];
  if (!raw) {
    console.error("Fournir le devis en JSON. Voir l'en-tête du script pour un exemple.");
    process.exit(1);
  }
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    console.error("JSON invalide.");
    process.exit(1);
  }
  for (const k of REQUIRED) {
    if (!(k in payload)) {
      console.error(`Champ manquant : ${k}`);
      process.exit(1);
    }
  }
  payload.montantHT = Number(payload.montantHT);
  payload.validiteJours = Number(payload.validiteJours);

  const secret = loadSecret();
  const token = createDevisToken(payload, secret);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://my-dtm.fr";
  const url = `${base}/valider-devis?t=${encodeURIComponent(token)}`;

  console.log(JSON.stringify({ token, url }, null, 2));
  console.error(
    `\nPour générer le QR code (PNG) :\n  npx --yes qrcode -o devis-${payload.id}-qr.png "${url}"\n`,
  );
}

main();
