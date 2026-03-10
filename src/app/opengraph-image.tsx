import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "My-DTM — Agence Digitale Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: "linear-gradient(90deg, #7C3AED, #C9A84C)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            My-DTM
          </span>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
            Agency
          </span>
        </div>

        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, #7C3AED, #C9A84C)",
            borderRadius: 4,
            marginTop: 20,
            marginBottom: 24,
          }}
        />

        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Agence de Marketing Digital à Paris
        </p>

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>Développement Web</span>
          <span>•</span>
          <span>SEO Technique</span>
          <span>•</span>
          <span>Automatisation</span>
          <span>•</span>
          <span>Marketing Digital</span>
        </div>

        <p
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          my-dtm.fr
        </p>
      </div>
    ),
    { ...size },
  );
}
