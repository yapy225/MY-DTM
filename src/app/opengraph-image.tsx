import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "My DTM Paris — Agence digitale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Badge « M » signal (barres montantes) reconstruit en flexbox pour Satori.
function BrandBadge({ s = 150 }: { s?: number }) {
  const bar = (h: number) => (
    <div
      style={{
        width: Math.round(s * 0.075),
        height: h,
        borderRadius: 4,
        background: "linear-gradient(to top, #4ce7f3, #ff00d6)",
      }}
    />
  );
  return (
    <div
      style={{
        display: "flex",
        width: s,
        height: s,
        borderRadius: s * 0.24,
        padding: 5,
        background: "linear-gradient(135deg, #29f5eb, #4d71ee, #e511e6)",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          flex: 1,
          borderRadius: s * 0.2,
          background: "#0e0a1a",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: s * 0.28,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: s * 0.045 }}>
          {bar(s * 0.2)}
          {bar(s * 0.34)}
          {bar(s * 0.34)}
          {bar(s * 0.2)}
        </div>
        <div
          style={{
            position: "absolute",
            top: s * 0.28,
            right: s * 0.26,
            width: s * 0.09,
            height: s * 0.09,
            borderRadius: 999,
            background: "#29f5eb",
          }}
        />
      </div>
    </div>
  );
}

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(1000px 500px at 50% 8%, #2a1145 0%, #1a1330 45%, #0e0a1a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Lockup : badge + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <BrandBadge s={150} />
          <div style={{ display: "flex", alignItems: "center", fontSize: 92, fontWeight: 800, letterSpacing: -2 }}>
            <div style={{ display: "flex", color: "#ffffff" }}>My</div>
            <div
              style={{
                width: 44,
                height: 16,
                borderRadius: 8,
                marginLeft: 16,
                marginRight: 16,
                background: "linear-gradient(135deg, #ff00d6, #9c00e2)",
              }}
            />
            <div
              style={{
                display: "flex",
                background: "linear-gradient(120deg, #29f5eb, #4d71ee, #e511e6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              DTM
            </div>
            <div style={{ display: "flex", color: "#9c6fdd", fontWeight: 500, marginLeft: 26 }}>
              Paris
            </div>
          </div>
        </div>

        {/* Filet dégradé */}
        <div
          style={{
            width: 160,
            height: 4,
            borderRadius: 4,
            marginTop: 40,
            marginBottom: 30,
            background: "linear-gradient(90deg, #29f5eb, #4d71ee, #e511e6)",
          }}
        />

        {/* Accroche */}
        <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,0.9)" }}>
          Agence digitale à Paris
        </div>

        {/* Services */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 30,
            fontSize: 22,
            color: "#9c6fdd",
          }}
        >
          <div style={{ display: "flex" }}>Création web</div>
          <div style={{ display: "flex", color: "#4ce7f3" }}>•</div>
          <div style={{ display: "flex" }}>SEO</div>
          <div style={{ display: "flex", color: "#4ce7f3" }}>•</div>
          <div style={{ display: "flex" }}>Marketing digital</div>
          <div style={{ display: "flex", color: "#4ce7f3" }}>•</div>
          <div style={{ display: "flex" }}>Automatisation</div>
        </div>

        {/* Pied */}
        <div
          style={{
            position: "absolute",
            bottom: 34,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: 60,
            paddingRight: 60,
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ display: "flex" }}>my-dtm.fr</div>
          <div style={{ display: "flex" }}>Audit gratuit sous 48h</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
