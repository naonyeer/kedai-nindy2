"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

function formatRupiah(n) {
  return Number(n || 0).toLocaleString("id-ID");
}

export default function TopupBrowser({ curated, others }) {
  const [q, setQ] = useState("");

  const filteredCurated = useMemo(() => {
    if (!q) return curated;
    const needle = q.toLowerCase();
    return curated.filter(
      (g) => g.name.toLowerCase().includes(needle) || g.publisher.toLowerCase().includes(needle),
    );
  }, [curated, q]);

  const filteredOthers = useMemo(() => {
    if (!q) return others;
    const needle = q.toLowerCase();
    return others.filter((o) => o.brand.toLowerCase().includes(needle));
  }, [others, q]);

  return (
    <>
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari game (Mobile Legends, Free Fire, ...)"
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1a1a1f] border border-white/5 text-white placeholder-gray-500 outline-none focus:border-[#ffc7d1]/40 focus:ring-2 focus:ring-[#ffc7d1]/10 transition-all text-sm"
        />
      </div>

      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Game Populer</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {filteredCurated.map((g) => (
          <GameCard key={g.slug} g={g} />
        ))}
        {filteredCurated.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-sm py-8">Tidak ada game cocok dengan &quot;{q}&quot;.</div>
        ) : null}
      </div>

      {filteredOthers.length ? (
        <>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Brand Lainnya</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredOthers.slice(0, 24).map((o) => (
              <div
                key={o.brand}
                className="bg-[#1a1a1f] border border-white/5 rounded-xl p-4 flex flex-col gap-1"
              >
                <div className="font-semibold text-white text-sm truncate">{o.brand}</div>
                <div className="text-gray-500 text-xs">
                  {o.variantCount} varian · mulai Rp {formatRupiah(o.minPrice)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}

function GameCard({ g }) {
  const inner = (
    <div
      className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-[#1a1a1f] transition-all ${
        g.available ? "hover:-translate-y-1 hover:border-white/20 cursor-pointer" : "opacity-60"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g.image} alt={g.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      {g.badge ? (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#ffc7d1] text-[#0f0f12] text-[10px] font-bold uppercase tracking-wider">
          {g.badge}
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-white font-bold text-sm leading-tight mb-1 truncate">{g.name}</div>
        <div className="text-gray-400 text-[11px] mb-2 truncate">{g.publisher}</div>
        {g.available ? (
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ffc7d1] font-semibold">
              dari Rp {formatRupiah(g.minPrice)}
            </span>
            <ArrowRight size={14} className="text-white/60 group-hover:translate-x-1 transition-transform" />
          </div>
        ) : (
          <div className="text-[11px] text-gray-500">Coming soon</div>
        )}
      </div>
    </div>
  );

  if (g.available) {
    return <Link href={`/topup/${g.slug}`}>{inner}</Link>;
  }
  return inner;
}
