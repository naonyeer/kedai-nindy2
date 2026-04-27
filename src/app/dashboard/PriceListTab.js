"use client";
import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

export default function PriceListTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchList = useCallback(async (refresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/digiflazz/price-list${refresh ? "?refresh=1" : ""}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || `HTTP ${res.status}`);
        setItems([]);
      } else {
        setItems(Array.isArray(json.data) ? json.data : []);
        setMeta({ cached: json.cached });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList(false);
  }, [fetchList]);

  const filtered = items.filter((it) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      it.product_name?.toLowerCase().includes(q) ||
      it.brand?.toLowerCase().includes(q) ||
      it.buyer_sku_code?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#1a1a1f] border border-white/5 rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffd9c7]/10 flex items-center justify-center">
            <RefreshCw className="text-[#ffd9c7]" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Price List Digiflazz</h2>
            <p className="text-xs text-gray-500">
              Cache 30 menit. Tekan refresh untuk paksa ambil data terbaru.
              {meta?.cached === true ? " Sumber: cache." : meta?.cached === false ? " Sumber: live." : ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => fetchList(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold disabled:opacity-50 self-start"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name / brand / sku..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0f0f12] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-[#ffd9c7]/40 focus:ring-2 focus:ring-[#ffd9c7]/10 text-sm"
        />
      </div>

      {error ? (
        <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="text-xs text-gray-500 mb-3">
          Menampilkan {filtered.length} dari {items.length} produk.
        </div>
      ) : null}

      <div className="bg-[#0f0f12] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-[11px] uppercase tracking-widest text-gray-500">
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3 text-right">Harga</th>
                <th className="px-4 py-3 text-center">Aktif</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map((it, i) => (
                <tr key={`${it.buyer_sku_code}-${i}`} className="border-t border-white/5">
                  <td className="px-4 py-2.5 text-gray-300 truncate max-w-[140px]">{it.brand}</td>
                  <td className="px-4 py-2.5 text-white">{it.product_name}</td>
                  <td className="px-4 py-2.5 text-gray-400 font-mono text-xs">{it.buyer_sku_code}</td>
                  <td className="px-4 py-2.5 text-right text-white font-semibold">
                    Rp {Number(it.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {it.buyer_product_status && it.seller_product_status ? (
                      <span className="text-emerald-400 text-xs">●</span>
                    ) : (
                      <span className="text-rose-400 text-xs">●</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">
                    Tidak ada produk.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      {filtered.length > 200 ? (
        <div className="text-xs text-gray-500 mt-2 text-right">
          Menampilkan 200 baris pertama. Filter untuk mempersempit hasil.
        </div>
      ) : null}
    </div>
  );
}
