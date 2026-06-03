"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    text: "+8 000 clics/mois recuperes via le SEO technique : 239 redirections 301, indexation forcee (Indexing API) et donnees structurees Schema.org.",
    name: "Dream Team Africa",
    role: "Ecosysteme evenementiel",
    initials: "DTA",
  },
  {
    text: "Billetterie en ligne sur mesure : billets QR code, paiement Stripe, reservation exposants et controle d'acces. Sans commission par billet.",
    name: "Saison Culturelle",
    role: "Billetterie evenementielle",
    initials: "SC",
  },
  {
    text: "Tracking Meta (Pixel + Conversions API) conforme RGPD, automatisation WhatsApp et annuaire optimise SEO pour la relation client et l'acquisition.",
    name: "L'Afropeen",
    role: "Media & annuaire",
    initials: "LA",
  },
];

/* Floating decorative avatars */
const FLOATING_AVATARS = [
  { initials: "S", top: "8%", left: "5%", size: 80, delay: "0s" },
  { initials: "L", top: "20%", right: "8%", size: 65, delay: "1s" },
  { initials: "K", bottom: "15%", left: "3%", size: 70, delay: "2s" },
  { initials: "R", bottom: "25%", right: "5%", size: 80, delay: "0.5s" },
  { initials: "D", top: "50%", left: "8%", size: 55, delay: "1.5s" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section
      className="ei-testimonial-section"
      style={{
        padding: "120px 0 115px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f0edf8 0%, #e9e5f5 50%, #f5f2fb 100%)",
      }}
    >
      {/* Background decorative overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 30% 50%, rgba(124,13,190,0.08), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,0,214,0.06), transparent 60%)",
        }}
      />

      {/* Floating avatar circles (decorative) */}
      {FLOATING_AVATARS.map((av, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: av.size,
            height: av.size,
            top: av.top,
            left: av.left,
            right: av.right,
            bottom: av.bottom,
            borderRadius: "50%",
            border: "10px solid #e7eaef",
            opacity: 0.5,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 700,
            color: "rgba(124,13,190,0.4)",
            backgroundColor: "#fff",
            animation: `avatarScale 3s ease ${av.delay} infinite alternate`,
            pointerEvents: "none",
          }}
          className="floating-avatar"
        >
          {av.initials}
        </div>
      ))}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", position: "relative", zIndex: 10 }}>
        {/* Header — centered */}
        <div
          className="eight-section-title appeight-headline pera-content"
          style={{ margin: "0 auto", maxWidth: "490px", paddingBottom: "64px", textAlign: "center" }}
        >
          <span
            className="eg-title-tag"
            style={{
              color: "#000",
              fontSize: "14px",
              fontWeight: 500,
              position: "relative",
              marginLeft: "55px",
              fontFamily: "Poppins, sans-serif",
              display: "inline-block",
            }}
          >
            <span
              className="square-shape"
              style={{
                width: "40px",
                height: "35px",
                left: "-52px",
                top: 0,
                position: "absolute",
              }}
            >
              <i style={{ height: "5px", width: "5px", position: "absolute", top: "-8px", left: "20px", backgroundColor: "#4ce7f3", display: "block" }} />
              <i style={{ height: "10px", width: "10px", position: "absolute", top: 0, left: "28px", backgroundColor: "#4ce7f3", display: "block" }} />
              <i style={{ height: "17px", width: "17px", position: "absolute", top: 0, left: 0, backgroundColor: "#7c0dbe", display: "block" }} />
              <i style={{ height: "12px", width: "12px", position: "absolute", top: "10px", left: "10px", backgroundColor: "#ff00d6", display: "block" }} />
            </span>
            Resultats clients
          </span>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 700,
              padding: "15px 0 12px",
              lineHeight: 1.306,
              margin: 0,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Des resultats concrets,{" "}
            <span style={{ fontWeight: 400 }}>pas des promesses.</span>
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.647, marginBottom: 0 }}>
            Quelques realisations de notre ecosysteme digital et leurs resultats mesurables.
          </p>
        </div>

        {/* Testimonial content */}
        <div className="ei-testimonial-content" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Pill-shaped testimonial card */}
          <div
            className="ei-testimonial-img-text"
            style={{
              padding: "30px 40px 30px 0",
              borderRadius: "120px",
              backgroundColor: "#fff",
              boxShadow: "0px 10px 20px 0px rgba(0,5,50,0.1)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Quote icon top-right */}
            <div
              className="test--quote-icon"
              style={{
                position: "absolute",
                top: "-20px",
                right: "100px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#cfd8e8">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </div>

            {/* Circular avatar */}
            <div
              className="ei-testimonial-img"
              style={{
                height: "160px",
                width: "160px",
                position: "relative",
                top: "-25px",
                left: "-25px",
                lineHeight: "157px",
                backgroundColor: "#fff",
                borderRadius: "100%",
                boxShadow: "0px 0px 18px 0px rgba(0,5,50,0.12)",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* Inner circle with initials */}
              <div
                style={{
                  height: "130px",
                  width: "130px",
                  borderRadius: "100%",
                  background: "linear-gradient(135deg, #7c0dbe, #ff00d6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span style={{ color: "#fff", fontSize: "36px", fontWeight: 700 }}>{t.initials}</span>
              </div>
            </div>

            {/* Testimonial text */}
            <div className="ei-testimonial-text" style={{ flex: 1, paddingLeft: "10px" }}>
              <div className="ei-testimonial-name" style={{ paddingBottom: "5px" }}>
                <h3
                  style={{
                    color: "#000",
                    fontSize: "20px",
                    fontWeight: 700,
                    paddingBottom: "5px",
                    margin: 0,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t.name}
                </h3>
                <span style={{ fontSize: "15px", color: "#0887fc" }}>{t.role}</span>
              </div>
              <p
                style={{
                  lineHeight: 1.529,
                  marginBottom: 0,
                  paddingBottom: "8px",
                  fontSize: "15px",
                  color: "#555",
                }}
              >
                {t.text}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "48px" }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "78px",
                height: "13px",
                borderRadius: "30px",
                backgroundColor: i === active ? "#7b0dbd" : "#e9ebf7",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
              aria-label={`Temoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes avatarScale {
          from { transform: scale(0.95); }
          to { transform: scale(1.05); }
        }
        .floating-avatar {
          display: none !important;
        }
        @media (min-width: 1024px) {
          .floating-avatar {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .ei-testimonial-img-text {
            flex-direction: column !important;
            border-radius: 30px !important;
            padding: 30px 20px !important;
            text-align: center;
          }
          .ei-testimonial-img {
            top: 0 !important;
            left: 0 !important;
            margin: 0 auto 20px !important;
          }
          .ei-testimonial-text {
            padding-left: 0 !important;
          }
          .ei-testi-rate {
            justify-content: center;
          }
          .ei-testimonial-name {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
