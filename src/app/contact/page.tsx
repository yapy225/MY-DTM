"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const SERVICES = [
  "Developpement Web",
  "SEO Technique",
  "Automatisation API",
  "Marketing Multi-Canal",
  "Audit Gratuit",
  "Autre",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[3px] text-violet">
            Contact
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-tight text-dark sm:text-5xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Audit gratuit sous 48h. Sans engagement.
          </p>
        </div>
      </section>

      <div className="accent-strip" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-2xl border border-green/20 bg-green/5 p-12 text-center">
                <span className="text-6xl">&#10003;</span>
                <h2 className="mt-4 font-serif text-2xl font-black text-dark">
                  Message envoye !
                </h2>
                <p className="mt-2 text-muted">
                  On vous repond sous 48h. Merci pour votre confiance.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark">
                      Nom complet
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-violet"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-dark">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-violet"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark">
                    Telephone (optionnel)
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-violet"
                    placeholder="+33 7 ..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark">
                    Service souhaite
                  </label>
                  <select className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-violet">
                    <option value="">Selectionnez un service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-dark">
                    Decrivez votre projet
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-violet"
                    placeholder="Parlez-nous de votre projet, vos objectifs, votre budget approximatif..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-gold px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30"
                >
                  <Send size={18} />
                  Envoyer
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-8">
              <h3 className="font-serif text-lg font-bold text-dark">Coordonnees</h3>
              <div className="mt-6 space-y-4">
                <a
                  href="mailto:contact@my-dtm.com"
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-violet"
                >
                  <Mail size={18} className="text-violet" />
                  contact@my-dtm.com
                </a>
                <a
                  href="tel:+33743537551"
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-violet"
                >
                  <Phone size={18} className="text-violet" />
                  +33 7 43 53 75 51
                </a>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <MapPin size={18} className="text-violet" />
                  Paris, France
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8">
              <h3 className="font-serif text-lg font-bold text-dark">Reponse rapide</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Pour une reponse immediate, contactez-nous directement sur WhatsApp.
              </p>
              <a
                href="https://wa.me/33743537551?text=Bonjour%2C%20je%20souhaite%20un%20audit%20gratuit%20pour%20mon%20projet%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                WhatsApp
              </a>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-violet to-gold p-8 text-white">
              <h3 className="font-serif text-lg font-bold">Audit gratuit</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                On analyse votre site, votre SEO et vos outils actuels. Rapport complet sous 48h, sans engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
