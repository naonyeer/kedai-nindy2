"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Search, X, HeartCrack } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "all") {
      list = list.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Katalog Produk</h1>
        <p className="text-gray-400 text-sm md:text-base">Temukan produk favoritmu dan nikmati belanjamu.</p>
      </div>

      {/* Search Bar - Cute Pill */}
      <div className="relative mb-8 max-w-2xl mx-auto md:mx-0">
        <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#ffc7d1]" />
        <input
          type="text"
          placeholder="Cari sesuatu yang lucu hari ini?"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-12 py-4 bg-[#1a1a1f] border border-white/5 rounded-full text-[15px] text-white focus:outline-none focus:border-[#ffc7d1]/50 focus:ring-4 focus:ring-[#ffc7d1]/10 transition-all shadow-inner shadow-black/20 placeholder-gray-500"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Tabs - Soft Pills */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-6 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${
            activeCategory === "all" ? "bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] shadow-md shadow-[#ffc7d1]/20 scale-105" : "bg-[#1a1a1f] text-gray-400 border border-white/5 hover:text-white hover:border-white/20"
          }`}
        >
          Semuanya
        </button>
        {CATEGORIES.filter(c => c.slug !== "transfer").map(cat => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat.slug ? "bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] shadow-md shadow-[#ffc7d1]/20 scale-105" : "bg-[#1a1a1f] text-gray-400 border border-white/5 hover:text-white hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32 bg-[#1a1a1f] rounded-[3rem] border border-white/5 mt-8 shadow-inner shadow-black/20">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#ffc7d1]/20 to-transparent rounded-full flex items-center justify-center mb-6">
            <HeartCrack size={40} className="text-[#ffc7d1]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Produk belum tersedia</h2>
          <p className="text-gray-400 max-w-sm mx-auto text-sm">Yah, produk yang kamu cari belum ada. Coba gunakan kata kunci lain ya!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#ffc7d1] font-bold">Memuat...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
