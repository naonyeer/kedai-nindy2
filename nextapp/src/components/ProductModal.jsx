"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Minus, Plus, ShoppingCart, CheckCircle2, Shield, Heart } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "./CartProvider";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [added, setAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQty(1);
      setAgreed(false);
      setAdded(false);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant || !agreed) return;
    addToCart(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => onClose(), 1200);
  }, [product, selectedVariant, qty, agreed, addToCart, onClose]);

  const handleWhatsApp = useCallback(() => {
    if (!selectedVariant || !agreed) return;
    const total = selectedVariant.price * qty;
    const msg = `*Pesanan Kedai Nindy*\n\n${product.name} (${selectedVariant.label})\n${qty} × Rp${formatPrice(selectedVariant.price)} = *Rp${formatPrice(total)}*\n\nTerima kasih!`;
    window.open(`https://wa.me/6281266002147?text=${encodeURIComponent(msg)}`, "_blank");
  }, [product, selectedVariant, qty, agreed]);

  if (!product || !selectedVariant) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0f0f12]/80 backdrop-blur-md" onClick={onClose} />

      {/* Content */}
      <div
        className="relative bg-[#1a1a1f] border border-white/5 rounded-[2rem] w-full max-w-[820px] max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-[#ffc7d1]/20 text-gray-400 hover:text-[#ffc7d1] flex items-center justify-center transition-all">
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="p-8 md:border-r border-white/5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-full aspect-square md:w-full md:h-auto rounded-3xl bg-[#0f0f12] flex items-center justify-center mb-6 overflow-hidden relative shadow-inner shadow-black/20 group">
              <img src={product.image || "https://placehold.co/400x400?text=No+Image"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all border border-white/5"
              >
                <Heart size={14} className={isLiked ? "fill-[#ffc7d1] text-[#ffc7d1]" : "text-white"} />
              </button>
            </div>
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#e6d8ff] mb-2 px-3 py-1 bg-white/5 rounded-full inline-block">
              {product.category === "digital" ? "Akun Premium" : product.category === "topup" ? "Game Top Up" : product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {added ? product.name : (selectedVariant ? `${product.name} (${selectedVariant.label})` : product.name)}
            </h2>
            
            <p className="text-3xl font-extrabold text-[#ffd9c7] mb-4">
              <span className="text-sm font-medium text-gray-500 mr-1">Rp</span>
              {formatPrice(selectedVariant.price)}
            </p>
            
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex gap-3 p-4 bg-[#ffc7d1]/5 rounded-2xl border border-[#ffc7d1]/10 mt-auto w-full text-left">
              <Shield size={20} className="text-[#ffc7d1] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Garansi Produk</p>
                <p className="text-xs text-gray-400 leading-relaxed">Garansi penuh selama masa aktif. Hubungi support jika ada kendala.</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="p-8 flex flex-col gap-6">
            {/* Variants */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                Pilih Opsi <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-white/5 rounded-full">Wajib</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                      selectedVariant.id === v.id
                        ? "border-[#ffc7d1] bg-[#ffc7d1]/10 shadow-sm shadow-[#ffc7d1]/5 -translate-y-0.5"
                        : "border-white/5 bg-[#0f0f12] hover:border-white/20"
                    }`}
                  >
                    <span className={`block text-sm font-semibold mb-1 ${selectedVariant.id === v.id ? "text-[#ffc7d1]" : "text-white"}`}>{v.label}</span>
                    <span className={`text-xs ${selectedVariant.id === v.id ? "text-[#ffd9c7]" : "text-gray-500"}`}>Rp {formatPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Jumlah</h3>
              <div className="flex items-center w-full max-w-[160px] border border-white/10 bg-[#0f0f12] rounded-2xl overflow-hidden p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-bold text-white">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Agreement */}
            <label className="flex items-start gap-3 cursor-pointer select-none mt-2 p-3 rounded-2xl hover:bg-white/5 transition-colors -mx-3">
              <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-600 checked:border-[#ffc7d1] checked:bg-[#ffc7d1] transition-all cursor-pointer" />
                <CheckCircle2 size={12} className="absolute text-[#0f0f12] opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={4} />
              </div>
              <span className="text-sm text-gray-400 leading-relaxed">Saya menyetujui syarat dan ketentuan layanan & garansi Kedai Nindy.</span>
            </label>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-auto pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!agreed || added}
                className={`w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? "bg-[#e6d8ff] text-[#0f0f12]"
                    : "bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] hover:shadow-lg hover:shadow-[#ffc7d1]/20 hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                }`}
              >
                {added ? <><CheckCircle2 size={18} /> Dimasukkan ke Keranjang!</> : <><ShoppingCart size={18} /> Masukkan ke Keranjang</>}
              </button>
              <button
                onClick={handleWhatsApp}
                disabled={!agreed}
                className="w-full py-3.5 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-[#0f0f12] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#25D366]/10 disabled:hover:text-[#25D366]"
              >
                Langsung Beli via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
