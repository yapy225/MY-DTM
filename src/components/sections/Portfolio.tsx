"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  return (
    <section
      className="ei-appdownload-section"
      style={{
        background: "linear-gradient(135deg, #1a0530 0%, #2d1b69 50%, #7c0dbe 100%)",
        padding: "100px 0 50px",
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative blobs with parallax */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "-170px",
          left: "-115px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.4), transparent 70%)",
          animation: "scale 3s ease 0s infinite alternate",
          zIndex: -1,
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "-225px",
          right: 0,
          left: "-270px",
          margin: "0 auto",
          textAlign: "center",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,214,0.15), transparent 70%)",
          zIndex: -1,
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          right: "-10px",
          top: 0,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,231,243,0.2), transparent 70%)",
          zIndex: -1,
        }}
      />
      {/* Bottom-left blob */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-80px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,162,0.15), transparent 70%)",
          animation: "scale 3s ease 0s infinite alternate",
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          {/* Left — Phone mockup */}
          <div style={{ flex: "0 0 50%", maxWidth: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                width: "260px",
                height: "500px",
                borderRadius: "40px",
                border: "8px solid rgba(255,255,255,0.9)",
                background: "linear-gradient(180deg, #2d1b69 0%, #7c0dbe 50%, #ff00d6 100%)",
                position: "relative",
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                overflow: "hidden",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "28px",
                  borderRadius: "0 0 18px 18px",
                  background: "rgba(0,0,0,0.3)",
                }}
              />
              {/* Screen content */}
              <div style={{ padding: "50px 20px 20px", textAlign: "center" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #ff00d6, #750cf8)",
                    margin: "0 auto 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "18px", fontWeight: 800 }}>M</span>
                </div>
                <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, marginBottom: "25px" }}>My-DTM Portfolio</p>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px", marginBottom: "10px", textAlign: "left" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", fontWeight: 600 }}>DreamTeam Africa</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "8px", marginTop: "4px" }}>Ecosysteme complet</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px", marginBottom: "10px", textAlign: "left" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", fontWeight: 600 }}>Saison Culturelle</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "8px", marginTop: "4px" }}>Billetterie en ligne</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px", marginBottom: "10px", textAlign: "left" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", fontWeight: 600 }}>Marketplace</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "8px", marginTop: "4px" }}>E-commerce Afro</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px", textAlign: "left" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", fontWeight: 600 }}>Journal L&apos;Afropeen</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "8px", marginTop: "4px" }}>Media & SEO</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="ei-app-down-text" style={{ flex: "0 0 50%", maxWidth: "450px", paddingTop: "90px" }}>
            <div className="eight-section-title appeight-headline pera-content">
              <span
                className="eg-title-tag"
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                  position: "relative",
                  marginLeft: "55px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {/* Square shape badge */}
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
                Portfolio
              </span>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  padding: "15px 0 12px",
                  lineHeight: 1.306,
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  margin: 0,
                }}
              >
                Nos realisations{" "}
                <span style={{ fontWeight: 400 }}>parlent d&apos;elles-memes.</span>
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.647,
                  color: "rgba(255,255,255,0.75)",
                  paddingBottom: "32px",
                }}
              >
                Ecosystemes digitaux complets : journal, marketplace, billetterie, annuaire professionnel. Plus de 8000 clics/mois recuperes.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <Link
                href="/portfolio"
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 32px",
                  fontSize: "15px",
                  borderRadius: "30px",
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Voir le portfolio
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#0090ff",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  textDecoration: "none",
                }}
              >
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for scale animation */}
      <style jsx>{`
        @keyframes scale {
          from { transform: scale(0.9); }
          to { transform: scale(1.08); }
        }
        @media (max-width: 768px) {
          .ei-appdownload-section .container > div {
            flex-direction: column !important;
          }
          .ei-appdownload-section .container > div > div {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
          .ei-app-down-text {
            padding-top: 40px !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
