"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Minus, Plus, ShoppingCart, CheckCircle2, Shield, Heart, Zap, Copy, Search, Clock } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "./CartProvider";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [added, setAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQty(1);
      setAgreed(false);
      setAdded(false);
      setCopiedVoucher(false);
      setSearchQuery("");
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
            
            <div className="flex gap-3 p-4 bg-[#ffc7d1]/5 rounded-2xl border border-[#ffc7d1]/10 mt-auto w-full text-left mb-4">
              <Shield size={20} className="text-[#ffc7d1] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">Garansi Produk</p>
                <p className="text-xs text-gray-400 leading-relaxed">Garansi penuh selama masa aktif. Hubungi support jika ada kendala.</p>
              </div>
            </div>

            {/* Claim Voucher */}
            <div className="flex flex-col gap-2 p-4 bg-[#ffc7d1]/5 border border-[#ffc7d1]/20 rounded-2xl relative group hover:border-[#ffc7d1]/40 transition-colors w-full text-left mt-auto">
              <span className="text-[11px] font-bold text-[#ffc7d1] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-400 fill-yellow-400" /> PROMO RAMADHAN DISKON 10%
              </span>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono font-bold tracking-widest text-lg">LEBARANDY10</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("LEBARANDY10");
                    setCopiedVoucher(true);
                    setTimeout(() => setCopiedVoucher(false), 2000);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] hover:shadow-md hover:shadow-[#ffc7d1]/20 text-[#0f0f12] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  title="Salin Voucher"
                >
                  {copiedVoucher ? <CheckCircle2 size={16} /> : <Copy size={16} />} Salin
                </button>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="p-8 flex flex-col gap-6">
            {/* Variants */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                Pilih Opsi <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-white/5 rounded-full">Wajib</span>
              </h3>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Cari varian produk"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0f0f12] border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#ffc7d1]/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1.5 custom-scrollbar">
                {product.variants.filter(v => v.label.toLowerCase().includes(searchQuery.toLowerCase())).map((v, i) => {
                  const isSelected = selectedVariant.id === v.id;
                  const isReseller = v.label.toUpperCase().includes("RESELLER") || (v.price >= 30000 && i > 0 && product.category === 'digital');
                  
                  // Make delivery realistic based on category
                  const manualCategories = ['groceries', 'poultry', 'health', 'services'];
                  const isManual = manualCategories.includes(product.category) || v.label.toUpperCase().includes('MANUAL') || v.label.toUpperCase().includes('HEAD');
                  const isInstan = !isManual;
                  
                  const delivery = isInstan 
                    ? { text: "Pengiriman INSTAN", color: "text-[#25D366]", Icon: Zap } 
                    : { text: "Pengiriman MANUAL", color: "text-[#4c4cdd]", Icon: ({size, className}) => <span className={`w-2 h-2 rounded-full bg-current ${className || ''}`} style={{width: size-3, height: size-3}} /> };
                  
                  const stockText = i === 0 ? "Stok terakhir" : "Tersedia";
                  const stockColor = i === 0 ? "text-[#ff4c4c]" : "text-[#25D366]";
                  
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`relative p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col gap-3 overflow-hidden shrink-0 ${
                        isSelected
                          ? "border-[#5c5cee] bg-[#4c4cdd]/10 shadow-sm shadow-[#4c4cdd]/20"
                          : "border-[#2a2a35] bg-[#1a1a24] hover:border-white/20 hover:bg-[#1f1f2e]"
                      }`}
                    >
                      {isReseller && (
                        <span className="absolute top-0 right-0 bg-[#ffb700] text-[#0f0f12] text-[8.5px] font-extrabold px-2 py-0.5 rounded-bl-[10px] uppercase tracking-wider z-10 shadow-sm">
                          KHUSUS RESELLER
                        </span>
                      )}
                      
                      <div className="flex justify-between items-start gap-2 w-full mt-1">
                        <div className="flex flex-col gap-1 pr-1.5">
                          <span className={`block text-[13px] leading-snug font-extrabold ${isSelected ? "text-white" : "text-gray-200"}`}>{v.label}</span>
                          <span className={`text-[10px] uppercase font-bold tracking-wide ${stockColor}`}>{stockText}</span>
                        </div>
                        <span className="text-[13px] font-bold text-white whitespace-nowrap mt-0.5">Rp. {formatPrice(v.price)}</span>
                      </div>
                      
                      <hr className="border-white/10 w-full" />
                      
                      <div className="flex justify-end w-full">
                        <span className={`text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-90 ${delivery.color}`}>
                          <delivery.Icon size={11} fill="currentColor" strokeWidth={1} /> {delivery.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
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
