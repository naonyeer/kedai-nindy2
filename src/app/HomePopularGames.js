"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePopularGames({ items, formatRupiah }) {
  if (!items.length) {
    return (
      <div className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-8 text-center text-gray-500">
        Belum ada game tersedia.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((g) => (
        <Link
          key={g.slug}
          href={`/topup/${g.slug}`}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-[#1a1a1f] hover:-translate-y-1 hover:border-white/20 transition-all"
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
            <div className="text-white font-bold text-sm mb-1 truncate">{g.name}</div>
            <div className="text-gray-400 text-[11px] mb-2 truncate">{g.publisher}</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#ffc7d1] font-semibold">dari Rp {formatRupiah(g.minPrice)}</span>
              <ArrowRight size={14} className="text-white/60 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
