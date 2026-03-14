"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { ArrowLeft, HeartCrack } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const category = getCategoryBySlug(params.slug);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = useMemo(() => {
    if (!category) return [];
    return getProductsByCategory(category.slug);
  }, [category]);

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-32 text-center relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffc7d1]/20 to-transparent flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/20">
          <HeartCrack size={40} className="text-[#ffc7d1]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Kategori tidak ditemukan</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">Kategori yang kamu cari mungkin sudah pindah atau tidak ada.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] rounded-full font-bold text-[15px] hover:shadow-lg hover:shadow-[#ffc7d1]/20 hover:scale-105 active:scale-95 transition-all">
          <ArrowLeft size={18} /> Kembali ke Toko
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
      <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1f] text-gray-400 hover:text-white border border-white/5 hover:border-white/20 rounded-full text-sm font-bold mb-8 transition-all hover:shadow-md">
        <ArrowLeft size={16} /> Semua Kategori
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{category.label}</h1>
        <p className="text-gray-400 text-sm md:text-base">{category.description || "Temukan berbagai macam produk menarik di kategori ini."}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-32 bg-[#1a1a1f] rounded-[3rem] border border-white/5 mt-8 shadow-inner shadow-black/20">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#ffc7d1]/20 to-transparent rounded-full flex items-center justify-center mb-6">
            <HeartCrack size={40} className="text-[#ffc7d1]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Produk belum tersedia</h2>
          <p className="text-gray-400 max-w-sm mx-auto text-sm">Produk di kategori ini sedang kosong. Sedang kami restock ya, ditunggu!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
