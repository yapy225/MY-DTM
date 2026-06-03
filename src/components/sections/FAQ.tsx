"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Combien coute un site web ?",
    a: "Nos tarifs commencent a partir de 1 500 EUR pour un site vitrine et montent selon la complexite (e-commerce, plateforme, etc.). Chaque projet est unique : on vous fait un devis personnalise sous 48h apres l'audit gratuit.",
  },
  {
    q: "Combien de temps prend la creation d'un site ?",
    a: "Un site vitrine est generalement livre en 2 a 4 semaines. Les projets plus complexes (marketplace, billetterie, ecosysteme complet) prennent entre 4 et 8 semaines.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "Nous travaillons avec Next.js, React, TypeScript et Tailwind CSS pour le front-end. Cote back-end : Prisma, PostgreSQL, Stripe pour les paiements, et Vercel pour l'hebergement.",
  },
  {
    q: "Est-ce que le SEO est inclus ?",
    a: "Oui, chaque site est construit avec le SEO technique integre : Schema.org JSON-LD, meta tags optimises, sitemap automatique, robots.txt, et indexation Google.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      className="ei-faq-section"
      style={{
        backgroundColor: "#eceef6",
        padding: "145px 0 110px",
        zIndex: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Decorative shapes */}
      <div
        className="ei-faq-shape fq-shape-style1"
        style={{
          position: "absolute",
          top: "-70px",
          left: "140px",
          zIndex: 2,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.2), transparent 70%)",
        }}
      />
      <div
        className="ei-faq-shape fq-shape-style2"
        style={{
          position: "absolute",
          top: "-70px",
          left: "75px",
          zIndex: 1,
          opacity: 0.4,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "2px solid rgba(124,13,190,0.15)",
          animation: "spining 35s linear infinite",
        }}
      />
      <div
        className="ei-faq-shape fq-shape-style3"
        style={{
          position: "absolute",
          top: "50%",
          left: "165px",
          transform: "translateX(-50%)",
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "#ff00d6",
          animation: "scale 3s ease 0s infinite alternate",
          zIndex: -1,
        }}
      />
      <div
        className="ei-faq-shape fq-shape-style4"
        style={{
          position: "absolute",
          top: "40%",
          right: "165px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#4ce7f3",
          zIndex: -1,
        }}
      />
      <div
        className="ei-faq-shape fq-shape-style5"
        style={{
          position: "absolute",
          left: "20%",
          top: "115px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "2px solid rgba(124,13,190,0.1)",
          animation: "spining 50s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="ei-faq-shape fq-shape-style7"
        style={{
          position: "absolute",
          top: "65px",
          right: "20%",
          width: "20px",
          height: "20px",
          zIndex: -1,
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "3px",
            backgroundColor: "rgba(124,13,190,0.15)",
            animation: "spining 5s linear infinite",
            marginTop: "10px",
          }}
        />
      </div>
      {/* Bottom-right large blob shape */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: "-30px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.08), transparent 70%)",
          zIndex: -2,
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div className="ei-faq-content" style={{ position: "relative", zIndex: 5 }}>
          {/* Title area — 2 column layout */}
          <div
            className="ei-title-faq pera-content"
            style={{ maxWidth: "885px", margin: "0 auto", paddingBottom: "32px" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 50%", maxWidth: "50%" }}>
                <div className="eight-section-title appeight-headline">
                  <span
                    className="eg-title-tag"
                    style={{
                      color: "#000",
                      fontSize: "15px",
                      fontWeight: 500,
                      position: "relative",
                      marginLeft: "55px",
                      fontFamily: "Poppins, sans-serif",
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
                    FAQ
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
                    Apprenez-en plus{" "}
                    <span style={{ fontWeight: 400 }}>sur nos services !</span>
                  </h2>
                </div>
              </div>
              <div style={{ flex: "0 0 50%", maxWidth: "50%", display: "flex", alignItems: "flex-end" }}>
                <p
                  style={{
                    color: "#383838",
                    fontSize: "17px",
                    marginTop: "35px",
                    lineHeight: 1.647,
                    marginBottom: 0,
                  }}
                >
                  En tant qu&apos;experts en marketing digital, nous aidons les entreprises a se developper sur internet avec des solutions adaptees.
                </p>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="ei-faq-queans" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div className="accordion">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`ei-faq${isOpen ? " faq_bg" : ""}`}
                    style={{
                      padding: isOpen ? "25px 55px" : "0 55px",
                      marginBottom: "25px",
                      transition: "0.3s all ease-in-out",
                      backgroundColor: isOpen ? "#fff" : "transparent",
                      boxShadow: isOpen ? "0px 5px 15px -14px rgba(0,0,0,0.75)" : "none",
                      borderRadius: isOpen ? "8px" : "0",
                    }}
                  >
                    <div className="ei-faq-header">
                      <button
                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
                        style={{
                          border: "none",
                          fontSize: "20px",
                          fontWeight: 700,
                          position: "relative",
                          marginBottom: "5px",
                          padding: "0 0 0 50px",
                          fontFamily: "Poppins, sans-serif",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* Icon before button text */}
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#118bfc",
                            fontSize: "30px",
                            fontWeight: 900,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isOpen ? <Minus size={24} color="#118bfc" /> : <Plus size={24} color="#118bfc" />}
                        </span>
                        {faq.q}
                      </button>
                    </div>
                    <div
                      className="collapse"
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? "300px" : "0",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      <div
                        className="ei-faq-body"
                        style={{
                          marginTop: "15px",
                          fontSize: "16px",
                          lineHeight: 1.647,
                          color: "#383838",
                          paddingBottom: "10px",
                        }}
                      >
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spining {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scale {
          from { transform: scale(0.9); }
          to { transform: scale(1.08); }
        }
        @media (max-width: 768px) {
          .ei-title-faq .row > div,
          .ei-title-faq > div > div {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
          .ei-faq {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .ei-faq-header button {
            font-size: 16px !important;
            padding-left: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
