"use client";
import { useCallback, useEffect, useState } from "react";
import { Wallet, RefreshCw } from "lucide-react";

export default function SaldoTab({ adminPassword }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/digiflazz/cek-saldo", {
        headers: { "x-admin-password": adminPassword },
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || `HTTP ${res.status}`);
        setData(null);
      } else {
        setData(json);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="bg-[#1a1a1f] border border-white/5 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffc7d1]/10 flex items-center justify-center">
            <Wallet className="text-[#ffc7d1]" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Saldo Digiflazz</h2>
            <p className="text-xs text-gray-500">Cek saldo deposit akun Digiflazz Anda.</p>
          </div>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {error ? (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {error}
        </div>
      ) : data ? (
        <div className="bg-[#0f0f12] border border-white/5 rounded-2xl p-6 text-center">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Deposit</div>
          <div className="text-4xl font-extrabold text-white">
            Rp {Number(data.deposit ?? 0).toLocaleString("id-ID")}
          </div>
        </div>
      ) : loading ? (
        <div className="text-gray-500 text-sm">Loading...</div>
      ) : null}
    </div>
  );
}
