"use client";

import { Globe, Search, Zap, MessageCircle, Plus } from "lucide-react";
import { useId, useState } from "react";

const SERVICES = [
  {
    icon: Globe,
    title: "Creation Web",
    desc: "Sites web sur mesure avec Next.js, React et Tailwind CSS. Design responsive et performances optimales.",
  },
  {
    icon: Search,
    title: "SEO Technique",
    desc: "Optimisation du referencement naturel pour plus de visibilite sur Google et les moteurs de recherche.",
  },
  {
    icon: Zap,
    title: "Automatisation",
    desc: "Workflows automatises, APIs et integrations sur mesure pour gagner du temps.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    desc: "Integration WhatsApp Business API pour la relation client et les notifications.",
  },
];

function FeatureCard({ icon: Icon, title, desc }: { icon: typeof Globe; title: string; desc: string }) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        borderRadius: 20,
        padding: "40px 30px 53px",
        backgroundColor: hovered ? "#fff" : "#e9ebf7",
        boxShadow: hovered ? "0px 25px 38px 0px rgba(43, 1, 68, 0.17)" : "none",
        transition: "0.3s all ease-in-out",
        cursor: "pointer",
        textAlign: "center",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon box */}
      <div
        style={{
          width: 98,
          height: 98,
          margin: "0 auto 34px",
          borderRadius: 25,
          backgroundColor: "#fff",
          boxShadow: "-0.707px 0.707px 10px 0px rgba(43, 1, 68, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Animated blob 1 - cyan (behind icon, visible on hover) */}
        <div
          style={{
            position: "absolute",
            zIndex: -2,
            borderRadius: "30%",
            mixBlendMode: "multiply",
            height: 110,
            width: 110,
            left: 0,
            top: 0,
            background: "#33f1ff",
            opacity: hovered ? 1 : 0,
            transition: "0.3s all ease-in-out",
            animation: hovered ? "rotate 1.8s linear infinite" : "none",
          }}
        />
        {/* Animated blob 2 - magenta (behind icon, visible on hover) */}
        <div
          style={{
            position: "absolute",
            zIndex: -2,
            borderRadius: "30%",
            mixBlendMode: "multiply",
            height: 110,
            width: 110,
            left: 0,
            top: 0,
            background: "#e933ff",
            opacity: hovered ? 1 : 0,
            transition: "0.3s all ease-in-out",
            animation: hovered ? "rotate 1.2s linear reverse infinite" : "none",
          }}
        />
        {/* White background to cover blobs inside the box */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: 25,
            zIndex: -1,
          }}
        />
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="30%" stopColor="#ff00d7" />
              <stop offset="67%" stopColor="#50c7f5" />
              <stop offset="99%" stopColor="#72aaff" />
            </linearGradient>
          </defs>
        </svg>
        <Icon size={50} strokeWidth={1.5} stroke={`url(#grad-${id})`} />
      </div>

      {/* Text */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          paddingBottom: 13,
          fontFamily: "var(--font-sans)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          lineHeight: 1.5,
          color: "#6b7280",
          marginBottom: 0,
          fontSize: 15,
        }}
      >
        {desc}
      </p>

      {/* Plus button at bottom */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#4ce7f3",
          width: 50,
          height: 50,
          borderRadius: "100%",
          left: 0,
          right: 0,
          bottom: -25,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "0.3s all ease-in-out",
        }}
      >
        <Plus size={20} color="#fff" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="feature-eight-section" style={{ padding: "165px 0 120px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 15px" }}>
        {/* Section title */}
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <span
            style={{
              color: "#000",
              fontSize: 17,
              fontWeight: 500,
              position: "relative",
              display: "inline-block",
            }}
          >
            {/* Square shape dots */}
            <span
              style={{
                position: "absolute",
                width: 40,
                height: 35,
                left: -52,
                top: 0,
              }}
            >
              <span style={{ position: "absolute", top: -8, left: 20, width: 5, height: 5, backgroundColor: "#4ce7f3", display: "block" }} />
              <span style={{ position: "absolute", top: 0, left: 28, width: 10, height: 10, backgroundColor: "#4ce7f3", display: "block" }} />
              <span style={{ position: "absolute", top: 0, left: 0, width: 17, height: 17, backgroundColor: "#7c0dbe", display: "block" }} />
              <span style={{ position: "absolute", top: 10, left: 10, width: 12, height: 12, backgroundColor: "#ff00d6", display: "block" }} />
            </span>
            Nos services
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              padding: "15px 0 12px",
              lineHeight: 1.306,
              fontFamily: "var(--font-sans)",
              margin: 0,
            }}
          >
            Pourquoi vous allez choisir{" "}
            <span style={{ fontWeight: 400 }}>notre agence ?</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.647, color: "#6b7280", marginBottom: 0 }}>
            En tant qu&apos;experts en marketing digital, nous aidons les entreprises a se developper sur internet.
          </p>
        </div>

        {/* Feature cards */}
        <div
          className="services-grid"
          style={{ paddingTop: 70, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 30 }}
        >
          {SERVICES.map((s, i) => (
            <FeatureCard key={i} icon={s.icon} title={s.title} desc={s.desc} />
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 991px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 575px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Decorative shape - wavy lines */}
      <div className="ei-feature-shape">
        <img src="/img/f-shape1.png" alt="" />
      </div>
    </section>
  );
}
