import { ImageResponse } from "next/og";
import { getAllGuides, getGuide } from "@/lib/guides/guides";

export const alt = "My DTM — Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const title = guide?.title ?? "My DTM — Agence Digitale";
  const category = guide?.category ?? "Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              background: "linear-gradient(90deg, #7C3AED, #C9A84C)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            My DTM
          </span>
          <span style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
            Agency
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: 20,
            }}
          >
            Guide · {category}
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 80,
              height: 3,
              background: "linear-gradient(90deg, #7C3AED, #C9A84C)",
              borderRadius: 4,
            }}
          />
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>
            my-dtm.fr
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
