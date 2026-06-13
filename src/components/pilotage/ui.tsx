import type { ReactNode } from "react";

// Composants de presentation du dashboard /pilotage. Tout est server-side et
// stylise en inline pour rester independant des classes Tailwind du site.

const PURPLE = "#7c0dbe";
const MUTED = "#6b7280";
const BORDER = "#eef0f6";
const HEADING = "#1a1a2e";

// --- Formatters -----------------------------------------------------------

export function fmtEur(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

export function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1).replace(".", ",")} %`;
}

export function fmtPos(n: number): string {
  return n ? n.toFixed(1).replace(".", ",") : "—";
}

// --- Layout primitives ----------------------------------------------------

export function Card({
  title,
  right,
  children,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        background: "#fff",
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 4px 24px rgba(17,12,46,0.04)",
      }}
    >
      {title && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: HEADING, margin: 0 }}>{title}</h2>
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

export function Kpi({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  const toneColor =
    tone === "good" ? "#10B981" : tone === "warn" ? "#D97706" : tone === "bad" ? "#DC2626" : PURPLE;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        padding: "16px 18px",
        boxShadow: "0 4px 24px rgba(17,12,46,0.04)",
      }}
    >
      <div style={{ fontSize: 12, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.3 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: toneColor, marginTop: 4, lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// --- Bar chart (CA / jour) ------------------------------------------------

export function BarChart({ data }: { data: { label: string; value: number; count?: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  // N'affiche pas tous les labels si la periode est longue.
  const step = data.length > 31 ? Math.ceil(data.length / 15) : data.length > 14 ? 2 : 1;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140 }}>
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.label} · ${fmtEur(d.value)}${d.count ? ` · ${d.count} vente(s)` : ""}`}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}
          >
            <div
              style={{
                height: `${(d.value / max) * 100}%`,
                minHeight: d.value > 0 ? 3 : 0,
                background: `linear-gradient(180deg, ${PURPLE}, #9c6fdd)`,
                borderRadius: "4px 4px 0 0",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
        {data.map((d, i) => (
          <div
            key={i}
            style={{ flex: 1, fontSize: 9, color: MUTED, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {i % step === 0 ? d.label : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Sparkline (clics SEO) ------------------------------------------------

export function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return <div style={{ color: MUTED, fontSize: 13 }}>Pas assez de données.</div>;
  const max = Math.max(1, ...points);
  const w = 100;
  const h = 36;
  const path = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 44 }}>
      <polyline points={path} fill="none" stroke={PURPLE} strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// --- Table generique ------------------------------------------------------

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: (ReactNode[])[];
}) {
  if (rows.length === 0) {
    return <div style={{ color: MUTED, fontSize: 13, padding: "8px 0" }}>Aucune donnée sur la période.</div>;
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: i === 0 ? "left" : "right",
                  color: MUTED,
                  fontWeight: 600,
                  padding: "6px 8px",
                  borderBottom: `1px solid ${BORDER}`,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    textAlign: ci === 0 ? "left" : "right",
                    padding: "8px",
                    borderBottom: `1px solid ${BORDER}`,
                    color: ci === 0 ? HEADING : MUTED,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ tone, children }: { tone: "good" | "warn" | "bad" | "muted"; children: ReactNode }) {
  const map = {
    good: { bg: "#DCFCE7", fg: "#166534" },
    warn: { bg: "#FEF3C7", fg: "#92400E" },
    bad: { bg: "#FEE2E2", fg: "#991B1B" },
    muted: { bg: "#F1F5F9", fg: "#475569" },
  }[tone];
  return (
    <span
      style={{
        background: map.bg,
        color: map.fg,
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div style={{ color: "#92400E", background: "#FEF3C7", fontSize: 13, padding: "10px 12px", borderRadius: 8 }}>
      {children}
    </div>
  );
}
