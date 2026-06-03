"use client";

import { useEffect, useRef, useState } from "react";

/* ── Individual counter component (avoids hooks-in-map violation) ── */
function CounterCard({
  target,
  suffix,
  label,
  color,
  visible,
}: {
  target: number;
  suffix: string;
  label: string;
  color: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [target, visible]);

  return (
    <div className="eg-counter-number pera-content" style={{ textAlign: "center" }}>
      <span className="odometer" style={{ fontSize: "50px", fontFamily: "Poppins", fontWeight: 600, color }}>
        {target >= 1000 ? count.toLocaleString("fr-FR") : count}
      </span>
      <strong style={{ top: "8px", lineHeight: 1, fontSize: "50px", fontWeight: 600, position: "relative", color }}>
        {suffix}
      </strong>
      <p>{label}</p>
    </div>
  );
}

/* ── Stats data ── */
const STATS = [
  { target: 8000, suffix: "+", label: "Clics SEO/mois recuperes", color: "#7c0dbe" },
  { target: 239, suffix: "", label: "Redirections 301 gerees", color: "#ff00d6" },
  { target: 48, suffix: "h", label: "Delai d'audit", color: "#4ce7f3" },
  { target: 99, suffix: "%", label: "Uptime (Vercel)", color: "#009cff" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="eg-fun-fact-section" style={{ position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div>
          <div style={{ width: "100%" }}>
            <div className="eg-funfact-content" style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
              {/* Left — Laptop/phone CSS mockup */}
              <div className="eg-fun-fact-mockup">
                <div className="main-mockup" style={{ position: "relative" }}>
                  {/* Laptop mockup */}
                  <div
                    style={{
                      width: "420px",
                      height: "280px",
                      backgroundColor: "#1a1a2e",
                      borderRadius: "12px",
                      border: "3px solid #2d2d44",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Screen content */}
                    <div style={{ padding: "15px", height: "100%" }}>
                      <div style={{ display: "flex", gap: "5px", marginBottom: "12px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#28ca42" }} />
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                        <div style={{ flex: 1, height: "40px", borderRadius: "6px", background: "linear-gradient(135deg, rgba(124,13,190,0.3), rgba(124,13,190,0.1))" }} />
                        <div style={{ flex: 1, height: "40px", borderRadius: "6px", background: "linear-gradient(135deg, rgba(255,0,214,0.3), rgba(255,0,214,0.1))" }} />
                        <div style={{ flex: 1, height: "40px", borderRadius: "6px", background: "linear-gradient(135deg, rgba(76,231,243,0.3), rgba(76,231,243,0.1))" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "140px" }}>
                        {[30, 45, 35, 60, 50, 75, 65, 85, 70, 95, 80, 100].map((h, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: `${h * 1.2}px`,
                              borderRadius: "2px 2px 0 0",
                              background:
                                i % 2 === 0
                                  ? "linear-gradient(to top, rgba(124,13,190,0.4), rgba(124,13,190,0.8))"
                                  : "linear-gradient(to top, rgba(255,0,214,0.3), rgba(255,0,214,0.6))",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Laptop base */}
                  <div
                    style={{
                      width: "480px",
                      height: "16px",
                      backgroundColor: "#c0c0c0",
                      borderRadius: "0 0 8px 8px",
                      margin: "0 auto",
                      marginLeft: "-30px",
                      background: "linear-gradient(180deg, #d4d4d4, #a0a0a0)",
                    }}
                  />
                </div>
                {/* Phone mockup overlapping */}
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "100px",
                    width: "140px",
                    height: "240px",
                    backgroundColor: "#1a1a2e",
                    borderRadius: "18px",
                    border: "3px solid #2d2d44",
                    overflow: "hidden",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                    zIndex: 2,
                  }}
                >
                  <div style={{ padding: "12px 8px", height: "100%" }}>
                    <div style={{ textAlign: "center", fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: "10px", paddingTop: "8px" }}>My-DTM</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ borderRadius: "6px", backgroundColor: "rgba(124,13,190,0.4)", padding: "8px", fontSize: "7px", color: "#fff", fontWeight: 600 }}>+8 000 clics/mois</div>
                      <div style={{ borderRadius: "6px", backgroundColor: "rgba(255,0,214,0.3)", padding: "8px", fontSize: "7px", color: "#fff", fontWeight: 600 }}>239 redir. 301</div>
                      <div style={{ borderRadius: "6px", backgroundColor: "rgba(76,231,243,0.3)", padding: "8px", fontSize: "7px", color: "#fff", fontWeight: 600 }}>99% uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Stats text */}
              <div className="eg-funfact-text" style={{ flex: 1 }}>
                <div className="eight-section-title appeight-headline pera-content" style={{ textAlign: "left" }}>
                  <span className="eg-title-tag">
                    {" "}Nos chiffres
                    <i className="square-shape">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </i>
                  </span>
                  <h2>
                    Des resultats concrets{" "}
                    <span>pour nos clients.</span>
                  </h2>
                  <p>
                    Nous aidons les entreprises a developper leur presence
                    digitale avec des resultats mesurables.
                  </p>
                </div>

                <div className="fun-fact-counter" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {STATS.map((s) => (
                    <CounterCard
                      key={s.label}
                      target={s.target}
                      suffix={s.suffix}
                      label={s.label}
                      color={s.color}
                      visible={visible}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 991px) {
          .eg-funfact-content {
            flex-direction: column !important;
          }
          .eg-fun-fact-mockup {
            margin-bottom: 40px;
          }
          .fun-fact-counter {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .fun-fact-counter {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
