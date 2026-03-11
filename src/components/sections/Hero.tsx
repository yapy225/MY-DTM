"use client";

import { useState, useEffect } from "react";

const WORDS = ["sites web", "le SEO", "l'automatisation", "WhatsApp Business"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="eight-banner-section" style={{ position: "relative" }}>
      {/* Background shape overlay (CSS-only replacement for bl-shape.png) */}
      <div style={{
        position: "absolute",
        content: "",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
        zIndex: 1,
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", position: "relative", zIndex: 5 }}>
        <div>
          <div style={{ width: "100%" }}>
            <div className="eight-banner-content" style={{ position: "relative", zIndex: 5 }}>
              <div className="banner-content-box appeight-headline pera-content" style={{ maxWidth: "650px" }}>
                {/* Headline with rotating words */}
                <h1 className="cd-headline clip is-full-width" style={{
                  color: "#fff",
                  fontSize: "72px",
                  fontWeight: 700,
                  lineHeight: 1.083,
                  paddingBottom: "20px",
                  fontFamily: "Poppins",
                  margin: 0,
                }}>
                  Votre agence digitale pour{" "}
                  <span className="cd-words-wrapper" style={{
                    display: "inline-block",
                    position: "relative",
                    textAlign: "left",
                    verticalAlign: "top",
                  }}>
                    <b className="is-visible" style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      color: "#000",
                      position: "relative",
                      display: "inline-block",
                      fontWeight: 700,
                    }}>
                      {WORDS[wordIndex]}
                    </b>
                  </span>
                </h1>

                {/* Subtitle */}
                <p style={{ fontSize: "19px", color: "#fff", marginBottom: 0 }}>
                  My-DTM est la meilleure agence de marketing digital a Paris. Sites web, SEO, automatisation et WhatsApp Business pour booster votre croissance.
                </p>

                {/* CTA Buttons */}
                <div className="ei-banner-btn" style={{ padding: "45px 0px 25px 0px" }}>
                  <a
                    href="/contact"
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      fontFamily: "Poppins",
                      display: "inline-block",
                      transition: "0.3s all ease-in-out",
                      height: "55px",
                      color: "#fff",
                      width: "175px",
                      lineHeight: "55px",
                      textAlign: "center",
                      borderRadius: "50px",
                      marginRight: "20px",
                      borderTopRightRadius: 0,
                      backgroundColor: "#ff00d6",
                      textDecoration: "none",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ position: "relative", top: "4px", marginRight: "8px" }}
                    >
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                    Commencer
                  </a>
                  <a
                    href="/services"
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      fontFamily: "Poppins",
                      display: "inline-block",
                      transition: "0.3s all ease-in-out",
                      color: "#4ce7f3",
                      position: "relative",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ color: "#fff", marginRight: "2px" }}>ou</span> essai gratuit
                  </a>
                </div>

                {/* Star rating review */}
                <div className="ei-banner-review pera-content ul-li" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <ul style={{ margin: 0, padding: 0, marginRight: "20px", display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <li key={s} style={{ listStyle: "none", display: "inline-block" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#f6b91c">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "14px", color: "#fff", marginBottom: 0 }}>
                    (base sur <span style={{ fontFamily: "Poppins", fontWeight: 700, color: "#000" }}>50+ avis clients</span>)
                  </p>
                </div>
              </div>

              {/* Phone mockup - hero image */}
              <div className="ei-banner-mbl-mockup" style={{ position: "absolute", top: 0, right: 0 }}>
                <img
                  src="/img/hero-phone.png"
                  alt="My-DTM App"
                  style={{ maxHeight: "550px", width: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Animation - 3 SVG wave layers exactly like SaaSio */}
      <div className="waveWrapper waveAnimation" style={{
        overflow: "hidden",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 0,
        margin: "auto",
      }}>
        {/* Wave layer 1 - top (subtle) */}
        <div className="waveWrapperInner bgTop" style={{
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          bottom: "-1px",
          background: "linear-gradient(to right, #c12dd1, #6d8cf8)",
          zIndex: 15,
          opacity: 0.5,
        }}>
          <div className="wave waveTop" style={{
            position: "absolute",
            left: 0,
            width: "200%",
            height: "100%",
            backgroundRepeat: "repeat no-repeat",
            backgroundPosition: "0 bottom",
            transformOrigin: "center bottom",
            backgroundSize: "50% 100px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-36.69,206.8-37.69C438.64,35.22,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff' opacity='.5'/%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Wave layer 2 - middle */}
        <div className="waveWrapperInner bgMiddle" style={{
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          bottom: "-1px",
          background: "linear-gradient(to right, #c12dd1, #6d8cf8)",
          zIndex: 10,
          opacity: 0.75,
        }}>
          <div className="wave waveMiddle" style={{
            position: "absolute",
            left: 0,
            width: "200%",
            height: "100%",
            backgroundRepeat: "repeat no-repeat",
            backgroundPosition: "0 bottom",
            transformOrigin: "center bottom",
            backgroundSize: "50% 120px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23ffffff' opacity='.7'/%3E%3C/svg%3E")`,
            animation: "move_wave 10s linear infinite",
          }} />
        </div>

        {/* Wave layer 3 - bottom (solid) */}
        <div className="waveWrapperInner bgBottom" style={{
          position: "absolute",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          bottom: "-1px",
          background: "linear-gradient(to right, #c12dd1, #6d8cf8)",
          zIndex: 5,
        }}>
          <div className="wave waveBottom" style={{
            position: "absolute",
            left: 0,
            width: "200%",
            height: "100%",
            backgroundRepeat: "repeat no-repeat",
            backgroundPosition: "0 bottom",
            transformOrigin: "center bottom",
            backgroundSize: "50% 100px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            animation: "move_wave 15s linear infinite",
          }} />
        </div>
      </div>

      {/* Responsive styles for phone mockup hide on mobile */}
      <style jsx global>{`
        @media screen and (max-width: 991px) {
          .eight-banner-section .eight-banner-content .ei-banner-mbl-mockup {
            position: static !important;
            margin-top: 40px;
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
