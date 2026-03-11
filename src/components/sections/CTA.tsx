"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="ei-newslatter-section"
      style={{
        overflow: "visible",
        position: "relative",
        padding: "0 15px",
      }}
    >
      <div
        className="ei-newslatter-box"
        style={{
          overflow: "hidden",
          padding: "80px 0 85px",
          background: "linear-gradient(-90deg, #ff00a2 0%, #750cf8 50%, #4ce7f3 100%)",
          position: "relative",
          borderRadius: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="ei-news-vector1"
          style={{
            position: "absolute",
            top: "-40px",
            left: "250px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
            animation: "scale 3s ease 0s infinite alternate",
            pointerEvents: "none",
          }}
        />
        <div
          className="ei-news-vector2"
          style={{
            position: "absolute",
            top: "-30px",
            right: "-70px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
            animation: "scale 2s ease 0s infinite alternate",
            pointerEvents: "none",
          }}
        />
        <div
          className="ei-news-vector3"
          style={{
            position: "absolute",
            left: "-75px",
            bottom: "-235px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <div
            className="ei-newslatter-contnet appeight-headline pera-content"
            style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <h3
              style={{
                color: "#fff",
                fontSize: "26px",
                fontWeight: 700,
                margin: 0,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Abonnez-vous a notre{" "}
              <span style={{ fontWeight: 100 }}>newsletter !</span>
            </h3>

            <div
              className="ei-newslatter-form"
              style={{ marginTop: "20px", position: "relative" }}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    className="email"
                    placeholder="Entrez votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      height: "72px",
                      borderRadius: "50px",
                      paddingLeft: "30px",
                      paddingRight: "190px",
                      marginBottom: "15px",
                      fontSize: "15px",
                      outline: "none",
                      color: "#373a5b",
                    }}
                  />
                  <div
                    className="nws-button"
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        height: "48px",
                        width: "162px",
                        border: "none",
                        color: "#fff",
                        borderRadius: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        backgroundImage: "linear-gradient(90deg, #ff03d0 0%, #4599fb 53%, #70fcff 99%)",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      S&apos;abonner
                    </button>
                  </div>
                </div>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    marginBottom: 0,
                    paddingLeft: "10px",
                  }}
                >
                  * Votre adresse email est entierement securisee.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Phone mockup overlapping — hidden on mobile */}
      <div
        className="ei-newslatter-mockup"
        style={{
          position: "absolute",
          top: "-35%",
          right: "18%",
          zIndex: 10,
          pointerEvents: "none",
          display: "none",
        }}
      >
        <div
          style={{
            width: "160px",
            height: "300px",
            borderRadius: "28px",
            border: "6px solid rgba(255,255,255,0.8)",
            background: "linear-gradient(180deg, #750cf8, #ff00a2)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "70px", height: "18px", borderRadius: "0 0 12px 12px", background: "rgba(0,0,0,0.3)" }} />
          <div style={{ padding: "35px 12px 12px", textAlign: "center" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.2)", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 800 }}>M</span>
            </div>
            <p style={{ color: "#fff", fontSize: "7px", fontWeight: 600, marginBottom: "12px" }}>My-DTM</p>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px", marginBottom: "6px" }}>
              <div style={{ height: "4px", width: "80%", borderRadius: "2px", background: "rgba(255,255,255,0.3)", marginBottom: "4px" }} />
              <div style={{ height: "4px", width: "60%", borderRadius: "2px", background: "rgba(255,255,255,0.2)" }} />
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px", marginBottom: "6px" }}>
              <div style={{ height: "4px", width: "70%", borderRadius: "2px", background: "rgba(255,255,255,0.3)", marginBottom: "4px" }} />
              <div style={{ height: "4px", width: "50%", borderRadius: "2px", background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale {
          from { transform: scale(0.9); }
          to { transform: scale(1.08); }
        }
        @media (min-width: 1200px) {
          .ei-newslatter-mockup {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .nws-button {
            position: static !important;
            top: auto !important;
            right: auto !important;
            margin-top: 10px;
            text-align: center;
          }
          .ei-newslatter-form input {
            padding-right: 30px !important;
          }
        }
      `}</style>
    </section>
  );
}
