"use client";
import { useMemo, useState } from "react";
import { ShoppingCart, Send, AlertCircle, CheckCircle2 } from "lucide-react";

const WA_NUMBER = "6281266002147";

function formatRupiah(n) {
  return Number(n || 0).toLocaleString("id-ID");
}

export default function TopupForm({ gameSlug, gameName, fields, products }) {
  const [selectedSku, setSelectedSku] = useState(products[0]?.sku ?? "");
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ""])));
  const [whatsapp, setWhatsapp] = useState("");
  const [agreed, setAgreed] = useState(false);

  const selected = useMemo(() => products.find((p) => p.sku === selectedSku) ?? products[0], [products, selectedSku]);

  const missing = fields.filter((f) => f.required && !values[f.name]?.trim());
  const ready = selected && missing.length === 0 && agreed;

  function setField(name, v) {
    setValues((prev) => ({ ...prev, [name]: v }));
  }

  function buildOrderText() {
    const lines = [`*Order Top Up — Kedai Game*`, ``, `Game: ${gameName}`];
    for (const f of fields) {
      lines.push(`${f.label}: ${values[f.name] || "-"}`);
    }
    lines.push(``, `Nominal: ${selected?.name}`, `SKU: ${selected?.sku}`, `Harga: Rp ${formatRupiah(selected?.price)}`);
    if (whatsapp) lines.push(`WA: ${whatsapp}`);
    lines.push(``, `Mohon proses ya, thanks!`);
    return lines.join("\n");
  }

  function handleWhatsapp() {
    if (!ready) return;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildOrderText())}`;
    window.open(url, "_blank");
  }

  if (!products.length) {
    return (
      <div className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-8 text-center text-gray-500">
        Belum ada produk untuk {gameName}.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-6">
        <Section title="1. Data Akun">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <label key={f.name} className="flex flex-col gap-2 text-sm">
                <span className="text-gray-400 font-medium">
                  {f.label} {f.required ? <span className="text-[#ffc7d1]">*</span> : null}
                </span>
                <input
                  value={values[f.name] || ""}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-[#ffc7d1]/50 focus:ring-2 focus:ring-[#ffc7d1]/10 transition-all"
                />
              </label>
            ))}
          </div>
        </Section>

        <Section title="2. Pilih Nominal">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {products.map((p) => {
              const active = p.sku === selectedSku;
              return (
                <button
                  type="button"
                  key={p.sku}
                  onClick={() => setSelectedSku(p.sku)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    active
                      ? "bg-[#ffc7d1]/10 border-[#ffc7d1]/40 ring-2 ring-[#ffc7d1]/20"
                      : "bg-[#0f0f12] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className={`text-xs font-bold mb-1 ${active ? "text-[#ffc7d1]" : "text-white"}`}>
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2 truncate">{p.sku}</div>
                  <div className="text-sm text-white font-semibold">Rp {formatRupiah(p.price)}</div>
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="3. Kontak">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-gray-400 font-medium">No. WhatsApp (opsional)</span>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-[#ffc7d1]/50 focus:ring-2 focus:ring-[#ffc7d1]/10 transition-all"
            />
          </label>
        </Section>
      </div>

      <aside className="md:sticky md:top-24 self-start bg-[#1a1a1f] border border-white/5 rounded-2xl p-6 space-y-4 h-fit">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Ringkasan</div>
          <div className="text-white font-bold text-lg">{gameName}</div>
        </div>
        <div className="space-y-1 text-sm">
          {fields.map((f) => (
            <Row key={f.name} k={f.label} v={values[f.name] || "—"} />
          ))}
          <Row k="Nominal" v={selected?.name || "—"} />
          <Row k="SKU" v={selected?.sku || "—"} mono />
        </div>
        <div className="border-t border-white/5 pt-4 flex items-center justify-between">
          <span className="text-gray-400 text-sm">Total</span>
          <span className="text-white font-extrabold text-xl">Rp {formatRupiah(selected?.price)}</span>
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5"
          />
          <span>Saya konfirmasi data ID/Server di atas sudah benar. Kesalahan input bukan tanggung jawab penjual.</span>
        </label>

        {!ready && missing.length ? (
          <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/10 text-amber-300 text-xs">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>Lengkapi: {missing.map((m) => m.label).join(", ")}</span>
          </div>
        ) : null}
        {ready ? (
          <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs">
            <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
            <span>Siap dikirim ke admin via WhatsApp.</span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleWhatsapp}
          disabled={!ready}
          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm transition-all ${
            ready
              ? "bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#ffc7d1]/20"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <Send size={16} /> Pesan via WhatsApp
        </button>
        <p className="text-[11px] text-gray-500 leading-relaxed text-center">
          Setelah pesan terkirim, admin akan kasih tau cara bayar. Diamond/UC otomatis nyala via sistem Digiflazz.
        </p>
      </aside>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ k, v, mono }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-500">{k}</span>
      <span className={`text-white text-right truncate ${mono ? "font-mono text-xs" : ""}`}>{v}</span>
    </div>
  );
}
