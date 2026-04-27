"use client";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

const TEST_CASES = [
  { sku: "xld10", customer: "087800001230", label: "xld10 → Sukses" },
  { sku: "xld10", customer: "087800001232", label: "xld10 → Gagal" },
  { sku: "xld10", customer: "087800001233", label: "xld10 → Pending → Sukses" },
  { sku: "xld10", customer: "087800001234", label: "xld10 → Pending → Gagal" },
];

export default function TembakTab({ adminPassword }) {
  const [sku, setSku] = useState("xld10");
  const [customer, setCustomer] = useState("087800001230");
  const [refId, setRefId] = useState("");
  const [testing, setTesting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/digiflazz/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          buyer_sku_code: sku,
          customer_no: customer,
          ref_id: refId || undefined,
          testing,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || `HTTP ${res.status}`);
      } else {
        setResult(json);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#1a1a1f] border border-white/5 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#e6d8ff]/10 flex items-center justify-center">
          <Send className="text-[#e6d8ff]" size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Tembak Manual</h2>
          <p className="text-xs text-gray-500">
            POST ke <code className="font-mono">/v1/transaction</code>. Aktifkan testing untuk dev mode (saldo tidak terpotong).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Buyer SKU Code">
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="xld10"
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white outline-none focus:border-[#e6d8ff]/40 focus:ring-2 focus:ring-[#e6d8ff]/10"
              />
            </Field>
            <Field label="Customer No / Game ID">
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="087800001230"
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white outline-none focus:border-[#e6d8ff]/40 focus:ring-2 focus:ring-[#e6d8ff]/10"
              />
            </Field>
          </div>
          <Field label="Ref ID (kosongkan untuk auto-generate)">
            <input
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              placeholder="kg-1234..."
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white outline-none focus:border-[#e6d8ff]/40 focus:ring-2 focus:ring-[#e6d8ff]/10"
            />
          </Field>
          <label className="inline-flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={testing}
              onChange={(e) => setTesting(e.target.checked)}
            />
            Testing mode (dev — saldo Digiflazz tidak terpotong)
          </label>

          <button
            type="submit"
            disabled={submitting || !sku || !customer}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e6d8ff] to-[#ffc7d1] text-[#0f0f12] font-bold text-sm disabled:opacity-50"
          >
            <Send size={14} /> {submitting ? "Mengirim..." : "Tembak"}
          </button>
        </form>

        <aside className="bg-[#0f0f12] border border-white/5 rounded-2xl p-4 space-y-2">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1.5">
            <Sparkles size={12} /> Test cases
          </div>
          {TEST_CASES.map((tc) => (
            <button
              key={tc.label}
              type="button"
              onClick={() => {
                setSku(tc.sku);
                setCustomer(tc.customer);
                setTesting(true);
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
            >
              {tc.label}
            </button>
          ))}
        </aside>
      </div>

      {error ? (
        <div className="mt-6 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 bg-[#0f0f12] border border-white/5 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Response</div>
          <pre className="text-[11px] text-emerald-300 whitespace-pre-wrap break-words font-mono">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-gray-400 font-medium text-xs uppercase tracking-widest">{label}</span>
      {children}
    </label>
  );
}
