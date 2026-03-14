"use client";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative h-full flex flex-col w-full bg-[#1a1a1f] rounded-3xl border border-white/5 overflow-hidden text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc7d1]/30 hover:shadow-xl hover:shadow-[#ffc7d1]/5"
    >
      {/* Top badges & heart */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5 flex-col">
        {product.badge && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] text-[9px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#0f0f12]/50 backdrop-blur-md flex items-center justify-center border border-white/5 hover:scale-110 active:scale-95 transition-all"
      >
        <Heart size={14} className={isLiked ? "fill-[#ffc7d1] text-[#ffc7d1]" : "text-gray-300"} />
      </button>

      {/* Image Area */}
      <div className="p-2.5">
        <div className="relative aspect-square bg-[#0f0f12] overflow-hidden rounded-[1.5rem] shadow-inner shadow-black/40">
          <img
            src={product.image || "https://placehold.co/400x400?text=No+Image"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-[#e6d8ff] border border-white/5 uppercase tracking-wide">
            {product.variants.length} Varian
          </span>
        </div>
        <h3 className="font-semibold text-[15px] text-white leading-snug mb-1 group-hover:text-[#ffc7d1] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price pushed to bottom */}
        <div className="mt-auto flex items-end justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-[10px] text-gray-500 block mb-0.5">Mulai dari</span>
            <p className="text-[#ffd9c7] font-bold text-lg leading-none">
              <span className="text-xs mr-0.5">Rp</span>
              {formatPrice(minPrice)}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#ffc7d1] group-hover:text-[#0f0f12] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
