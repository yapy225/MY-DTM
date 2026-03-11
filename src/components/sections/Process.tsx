"use client";

import { UserPlus, Download, Fingerprint, FileText, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: <UserPlus size={30} strokeWidth={1.5} />,
    title: "Decouverte",
    desc: "On analyse vos besoins, votre marche et vos objectifs. Audit gratuit sous 48h.",
  },
  {
    icon: <Download size={30} strokeWidth={1.5} />,
    title: "Strategie",
    desc: "On definit l'architecture technique, le design et le plan marketing adapte.",
  },
  {
    icon: <Fingerprint size={30} strokeWidth={1.5} />,
    title: "Execution",
    desc: "On construit, on teste, on optimise. Vous suivez l'avancement en temps reel.",
  },
  {
    icon: <FileText size={30} strokeWidth={1.5} />,
    title: "Lancement",
    desc: "Deploiement, indexation Google, activation des campagnes. C'est parti.",
  },
  {
    icon: <Rocket size={30} strokeWidth={1.5} />,
    title: "Suivi",
    desc: "Rapports mensuels, optimisations continues et support reactif inclus.",
  },
];

export default function Process() {
  return (
    <section className="eg-how-work-section" style={{ position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div className="process-row" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 58.33%", maxWidth: "58.33%" }} className="process-col-left">
            <div className="ei-how-work-content-item">
              <div className="eight-section-title appeight-headline pera-content" style={{ textAlign: "left" }}>
                <span className="eg-title-tag">
                  Notre methode
                  <i className="square-shape">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </i>
                </span>
                <h2>
                  Comment on travaille en{" "}
                  <span>5 etapes !</span>
                </h2>
              </div>

              <div className="how-work-scroller" style={{ height: "auto", overflow: "visible" }}>
                <div className="eg-how-work-content">
                  {STEPS.map((step, i) => (
                    <div key={i} className="eg-how-work-icon-text" style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                      <span className="scroller-no">{i + 1}</span>
                      <div className="eg-how-work-icon" style={{ textAlign: "center", flexShrink: 0 }}>
                        <span
                          style={{
                            display: "block",
                            backgroundImage:
                              "linear-gradient(173deg, #ff00d7 30%, #50c7f5 67%, #72aaff 99%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            lineHeight: 1,
                          }}
                        >
                          {step.icon}
                        </span>
                      </div>
                      <div className="eg-how-work-text appeight-headline pera-content">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "0 0 41.67%", maxWidth: "41.67%" }} className="process-col-right">
            <div className="how-work-mockup" style={{ position: "relative" }}>
              {/* CSS-only phone mockup */}
              <div
                style={{
                  width: "260px",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "260px",
                    height: "500px",
                    borderRadius: "35px",
                    border: "7px solid rgba(255,255,255,0.9)",
                    backgroundColor: "#fff",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Notch */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100px",
                      height: "22px",
                      borderRadius: "0 0 12px 12px",
                      backgroundColor: "#fff",
                      zIndex: 2,
                    }}
                  />
                  {/* Screen */}
                  <div
                    style={{
                      height: "100%",
                      background: "linear-gradient(135deg, #7c0dbe 0%, #a855f7 50%, #7c0dbe 100%)",
                      padding: "40px 20px 20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>My-DTM</p>
                    <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Suivi Projet</p>
                    <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(255,0,214,0.3))", marginTop: "20px" }} />
                    <div style={{ width: "100%", marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {STEPS.map((step, i) => (
                        <div
                          key={i}
                          style={{
                            borderRadius: "8px",
                            backgroundColor: `rgba(255,255,255,${0.08 + i * 0.02})`,
                            padding: "8px 10px",
                            fontSize: "8px",
                            fontWeight: 600,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255,255,255,0.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "7px",
                              flexShrink: 0,
                            }}
                          >
                            {i + 1}
                          </span>
                          {step.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative gradient circles */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "80px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(76,231,243,0.4), rgba(0,156,255,0.2))",
                  zIndex: -1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "20px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(255,0,214,0.3), rgba(124,13,190,0.2))",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 991px) {
          .process-row {
            flex-direction: column !important;
          }
          .process-col-left,
          .process-col-right {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
