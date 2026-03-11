"use client";

import { useId } from "react";
import { Shield, Code2, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Zero Bug",
    desc: "Sites performants, testes et optimises pour une experience sans accroc.",
  },
  {
    icon: Code2,
    title: "Code Propre",
    desc: "Architecture modulaire, maintenable et scalable.",
  },
  {
    icon: Headphones,
    title: "Support Reactif",
    desc: "Accompagnement continu et reponse sous 24h.",
  },
];

function ServiceIcon({ icon: Icon }: { icon: typeof Shield }) {
  const id = useId();
  return (
    <div className="ei-service-icon" style={{ float: "right", textAlign: "center" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={`svc-grad-${id}`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="30%" stopColor="#ff00d7" />
            <stop offset="67%" stopColor="#50c7f5" />
            <stop offset="99%" stopColor="#72aaff" />
          </linearGradient>
        </defs>
      </svg>
      <Icon size={55} strokeWidth={1.5} stroke={`url(#svc-grad-${id})`} />
    </div>
  );
}

export default function WhatsAppShowcase() {
  return (
    <section id="eight-service" className="eight-service-section position-relative">
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div className="eight-service-slide clearfix">
          <div className="ei-service-slide-btn ul-li-block clearfix">
            <div className="banner-pager clearfix">
              {FEATURES.map((f, i) => (
                <a key={i} className="pager">
                  <div className="ei-service-icon-text appeight-headline pera-content" style={{ textAlign: "right" }}>
                    <ServiceIcon icon={f.icon} />
                    <div className="ei-service-text">
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="eight-service-text position-relative appeight-headline">
          {/* Phone mockup with background frame */}
          <div
            className="ei-service-slide-mbl"
            style={{
              backgroundImage: "url(/img/smu1.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "549px",
              width: "268px",
              position: "relative",
              margin: "0 auto",
            }}
          >
            <div className="slide-inner" style={{
              position: "absolute",
              top: "62px",
              left: "18px",
              right: "18px",
              bottom: "62px",
              overflow: "hidden",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #7c0dbe 0%, #a855f7 50%, #7c0dbe 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "30px 15px",
            }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0 }}>My-DTM</p>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", marginTop: "4px", marginBottom: "16px" }}>Dashboard Client</p>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(255,0,214,0.4))", marginBottom: "16px" }} />
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ borderRadius: "8px", backgroundColor: "rgba(124,13,190,0.5)", padding: "10px", fontSize: "9px", fontWeight: 600, color: "#fff" }}>Trafic SEO +256%</div>
                <div style={{ borderRadius: "8px", backgroundColor: "rgba(255,0,214,0.4)", padding: "10px", fontSize: "9px", fontWeight: 600, color: "#fff" }}>342 leads ce mois</div>
                <div style={{ borderRadius: "8px", backgroundColor: "rgba(76,231,243,0.3)", padding: "10px", fontSize: "9px", fontWeight: 600, color: "#fff" }}>99% uptime garanti</div>
              </div>
            </div>
          </div>
          <h2>
            Pourquoi choisir{" "}
            <span style={{ display: "block" }}>notre app ?</span>
          </h2>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="s-shape-bg1" style={{ position: "absolute", left: "-95px", bottom: "-15px", zIndex: -1 }}>
        <img src="/img/s-shape3.png" alt="" />
      </div>
      <div className="s-shape-bg2" style={{ position: "absolute", top: "50%", left: 0, right: 0, zIndex: -2, transform: "translateY(-50%)", textAlign: "center" }}>
        <img src="/img/s-shape4.png" alt="" />
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 991px) {
          .eight-service-section .eight-service-slide {
            width: 100% !important;
            float: none !important;
          }
          .eight-service-section .eight-service-text {
            width: 100% !important;
            float: none !important;
            padding: 40px 0 0 !important;
          }
          .eight-service-section .eight-service-text h2 {
            margin: 0 auto;
            color: #000;
            max-width: 400px;
            text-align: center;
          }
          .eight-service-section .eight-service-slide .ei-service-slide-btn {
            max-width: 475px;
            margin: 0 auto;
          }
          .eight-service-section .eight-service-slide a:nth-child(3) {
            transform: translateX(0);
          }
          .eight-service-section:after,
          .eight-service-section:before,
          .eight-service-section .s-shape-bg2 {
            display: none;
          }
        }
        @media (max-width: 420px) {
          .eight-service-section .eight-service-slide a:nth-child(1) {
            margin-bottom: 30px;
          }
          .eight-service-section .eight-service-slide a:nth-child(2) {
            margin-bottom: 30px;
            transform: translateX(0);
          }
          .eight-service-section .eight-service-text {
            padding-top: 40px;
          }
          .eight-service-section .eight-service-text h2 {
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  );
}
