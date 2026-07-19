"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Campaign } from "@/lib/regie/worker";

const CARD: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  padding: 20,
  marginBottom: 20,
};
const LABEL: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "var(--color-muted)", marginBottom: 4, marginTop: 12 };
const INPUT: React.CSSProperties = { width: "100%", padding: "9px 11px", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 14, outline: "none" };
const BTN: React.CSSProperties = { padding: "9px 14px", background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" };
const BTN_GHOST: React.CSSProperties = { ...BTN, background: "transparent", color: "var(--color-primary)", border: "1px solid var(--color-primary)" };

const EMPTY = {
  id: "",
  type: "event" as "event" | "affiliation",
  title: "",
  body: "",
  image_url: "",
  cta_label: "Découvrir",
  dest_url: "",
  target_sites: "lafropeen",
  slots: "article-inline",
  weight: "1",
  status: "draft",
};

export default function RegieClient({
  initialCampaigns,
  stats,
  configured,
}: {
  initialCampaigns: Campaign[];
  stats: { byCampaign: any[]; byArticle: any[] };
  configured: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const payload = {
      id: form.id || undefined,
      type: form.type,
      title: form.title,
      body: form.body || null,
      image_url: form.image_url || null,
      cta_label: form.cta_label || "Découvrir",
      dest_url: form.dest_url,
      target_sites: form.target_sites.split(",").map((s) => s.trim()).filter(Boolean),
      slots: form.slots.split(",").map((s) => s.trim()).filter(Boolean),
      weight: Number(form.weight) || 1,
      status: form.status,
    };
    const r = await fetch("/api/regie/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (r.ok) {
      setForm({ ...EMPTY });
      setMsg("✅ Campagne enregistrée. Pense à publier pour la diffuser.");
      router.refresh();
    } else {
      const d = await r.json().catch(() => ({}));
      setMsg("❌ " + (d.error || "Échec"));
    }
  }

  async function patch(id: string, status: string) {
    await fetch(`/api/regie/campaigns/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette campagne ?")) return;
    await fetch(`/api/regie/campaigns/${encodeURIComponent(id)}`, { method: "DELETE" });
    router.refresh();
  }

  async function doPublish() {
    setBusy(true);
    const r = await fetch("/api/regie/publish", { method: "POST" });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    setMsg(r.ok ? `📡 Publié : ${d.published ?? 0} campagne(s) active(s) en diffusion.` : "❌ Échec de publication");
    router.refresh();
  }

  return (
    <>
      {/* Formulaire de création */}
      <div style={CARD}>
        <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Nouvelle campagne</h2>
        <p style={{ fontSize: 13, color: "var(--color-muted)", margin: 0 }}>
          Promo d'événement ou lien d'affiliation. Après enregistrement, clique <b>Publier</b> pour diffuser.
        </p>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={LABEL}>Type</label>
              <select style={INPUT} value={form.type} onChange={(e) => set("type", e.target.value)}>
                <option value="event">Événement (billetterie)</option>
                <option value="affiliation">Affiliation (produit)</option>
              </select>
            </div>
            <div>
              <label style={LABEL}>Statut</label>
              <select style={INPUT} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="draft">Brouillon</option>
                <option value="active">Actif</option>
                <option value="paused">En pause</option>
              </select>
            </div>
          </div>
          <label style={LABEL}>Titre *</label>
          <input style={INPUT} value={form.title} onChange={(e) => set("title", e.target.value)} required />
          <label style={LABEL}>Accroche (optionnel)</label>
          <input style={INPUT} value={form.body} onChange={(e) => set("body", e.target.value)} />
          <label style={LABEL}>URL destination *</label>
          <input style={INPUT} value={form.dest_url} onChange={(e) => set("dest_url", e.target.value)} placeholder="https://eburnia.fr/eburnia/mon-evenement" required />
          <label style={LABEL}>Image (URL, optionnel)</label>
          <input style={INPUT} value={form.image_url} onChange={(e) => set("image_url", e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={LABEL}>Libellé du bouton</label>
              <input style={INPUT} value={form.cta_label} onChange={(e) => set("cta_label", e.target.value)} />
            </div>
            <div>
              <label style={LABEL}>Poids (rotation)</label>
              <input style={INPUT} type="number" min="1" value={form.weight} onChange={(e) => set("weight", e.target.value)} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={LABEL}>Sites cibles (séparés par ,)</label>
              <input style={INPUT} value={form.target_sites} onChange={(e) => set("target_sites", e.target.value)} placeholder="lafropeen  ou  *" />
            </div>
            <div>
              <label style={LABEL}>Emplacements (slots)</label>
              <input style={INPUT} value={form.slots} onChange={(e) => set("slots", e.target.value)} placeholder="article-inline,sidebar" />
            </div>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center" }}>
            <button type="submit" style={BTN} disabled={busy || !configured}>
              {busy ? "…" : "Enregistrer"}
            </button>
            {msg && <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{msg}</span>}
          </div>
        </form>
      </div>

      {/* Liste des campagnes */}
      <div style={CARD}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>Campagnes ({initialCampaigns.length})</h2>
          <button style={BTN_GHOST} onClick={doPublish} disabled={busy || !configured}>
            📡 Publier la diffusion
          </button>
        </div>
        {initialCampaigns.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Aucune campagne pour l'instant.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {initialCampaigns.map((c) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 12px", border: "1px solid var(--color-border)", borderRadius: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {c.title}{" "}
                    <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(c.status), textTransform: "uppercase" }}>· {c.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.type} → {c.dest_url} · {(c.target_sites || []).join(",")} · [{(c.slots || []).join(",")}]
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {c.status !== "active" ? (
                    <button style={miniBtn("#16a34a")} onClick={() => patch(c.id, "active")}>Activer</button>
                  ) : (
                    <button style={miniBtn("#b45309")} onClick={() => patch(c.id, "paused")}>Pause</button>
                  )}
                  <button style={miniBtn("#dc2626")} onClick={() => remove(c.id)}>Suppr.</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reporting */}
      <div style={CARD}>
        <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 12 }}>Leads par campagne</h2>
        <StatTable rows={stats.byCampaign} cols={[["title", "Campagne"], ["clicks", "Clics"], ["conversions", "Conv."], ["revenue_eur", "CA €"]]} />
      </div>
      <div style={CARD}>
        <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Leads par article L'Afropéen</h2>
        <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 0, marginBottom: 12 }}>
          Le chiffre nord : quels articles envoient des leads convertis.
        </p>
        <StatTable rows={stats.byArticle} cols={[["article", "Article"], ["clicks", "Clics"], ["conversions", "Conv."], ["revenue_eur", "CA €"]]} />
      </div>
    </>
  );
}

function statusColor(s: string) {
  return s === "active" ? "#16a34a" : s === "paused" ? "#b45309" : "var(--color-muted)";
}
function miniBtn(color: string): React.CSSProperties {
  return { padding: "5px 9px", background: "transparent", color, border: `1px solid ${color}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" };
}

function StatTable({ rows, cols }: { rows: any[]; cols: [string, string][] }) {
  if (!rows || rows.length === 0) {
    return <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Aucune donnée pour l'instant.</p>;
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {cols.map(([, label]) => (
              <th key={label} style={{ textAlign: "left", padding: "6px 8px", borderBottom: "2px solid var(--color-border)", color: "var(--color-muted)", fontSize: 12 }}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {cols.map(([key]) => (
                <td key={key} style={{ padding: "6px 8px", borderBottom: "1px solid var(--color-border)", maxWidth: 340, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {formatCell(key, row[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCell(key: string, val: any) {
  if (val == null) return "—";
  if (key === "revenue_eur") return `${Number(val).toFixed(2)} €`;
  if (key === "article") return String(val).replace(/^https?:\/\/[^/]+/, "");
  return String(val);
}
