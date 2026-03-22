"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/products";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Heart } from "lucide-react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, sendWhatsApp, clearCart } = useCart();
  const [voucherInput, setVoucherInput] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");

  const handleApplyVoucher = () => {
    if (!voucherInput.trim()) return;
    if (voucherInput.trim().toUpperCase() === "LEBARANDY10") {
      setIsVoucherApplied(true);
      setVoucherMessage("Voucher berhasil digunakan! Diskon 10% diterapkan.");
    } else {
      setIsVoucherApplied(false);
      setVoucherMessage("Kode voucher tidak valid.");
    }
  };

  const cTotal = isNaN(cartTotal) ? 0 : cartTotal;
  const discountAmount = isVoucherApplied ? cTotal * 0.1 : 0;
  const finalTotal = cTotal - discountAmount;
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffc7d1]/20 to-transparent flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/20">
          <ShoppingBag size={40} className="text-[#ffc7d1]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Keranjangmu Kosong</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">Yuk cari barang-barang lucu dan tambahkan ke keranjangmu sekarang juga!</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] rounded-full font-bold text-[15px] hover:shadow-lg hover:shadow-[#ffc7d1]/20 hover:scale-105 active:scale-95 transition-all">
          Belanja Sekarang <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Keranjang Belanja <Heart size={24} className="text-[#ffc7d1] fill-[#ffc7d1]/50" />
          </h1>
          <p className="text-gray-400 text-sm mt-1">{cart.length} item menunggumu</p>
        </div>
        <button onClick={clearCart} className="px-4 py-2 rounded-full text-sm text-red-400 hover:text-white hover:bg-red-500/20 font-medium transition-colors border border-red-500/20">
          Kosongkan
        </button>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4 mb-8">
        {cart.map((item, i) => (
          <div key={item.variantId} className="bg-[#1a1a1f] rounded-[2rem] border border-white/5 p-4 md:p-5 flex flex-wrap md:flex-nowrap items-center gap-4 shadow-sm hover:border-white/10 hover:shadow-xl hover:shadow-[#ffc7d1]/5 transition-all animate-fade-in-up" style={{animationDelay: `${i*0.05}s`}}>
            <div className="w-20 h-20 rounded-2xl bg-[#0f0f12] flex-shrink-0 relative overflow-hidden shadow-inner flex items-center justify-center">
              <img src={item.productImage || "https://placehold.co/100x100"} alt={item.productName} className="object-contain p-3 w-full h-full" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="font-bold text-[15px] text-white truncate mb-1">{item.productName}</h3>
              <p className="text-[11px] font-medium text-[#ffd9c7] bg-[#ffd9c7]/10 px-2 py-0.5 rounded-full inline-block mb-1">{item.variantLabel}</p>
              <div className="text-sm font-bold text-gray-400 mt-1">Rp{formatPrice(item.price)}</div>
            </div>
            
            <div className="flex items-center w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-end gap-4 md:gap-6 border-t border-white/5 md:border-0 pt-3 md:pt-0">
              <div className="flex items-center bg-[#0f0f12] rounded-full p-1 border border-white/5">
                <button onClick={() => updateQty(item.variantId, -1)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-white">{item.qty}</span>
                <button onClick={() => updateQty(item.variantId, 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              
              <div className="text-right min-w-[80px]">
                <p className="text-[15px] font-extrabold text-[#ffd9c7]">Rp{formatPrice(item.price * item.qty)}</p>
              </div>
              
              <button onClick={() => removeFromCart(item.variantId)} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#1a1a1f] rounded-[2rem] border border-[#ffc7d1]/20 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ffc7d1]/10 to-transparent rounded-bl-full pointer-events-none" />
        
        {/* Voucher Input */}
        <div className="mb-8 relative z-10 bg-[#0f0f12]/50 p-4 rounded-2xl border border-white/5 disabled:opacity-50">
          <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
            Punya kode promo? <span className="text-xs font-normal text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">Opsional</span>
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={voucherInput}
              onChange={(e) => {
                setVoucherInput(e.target.value.toUpperCase());
                if (voucherMessage) setVoucherMessage("");
              }}
              placeholder="Cth: LEBARANDY10"
              className="px-4 py-3 bg-[#1a1a1f] border border-white/10 rounded-xl text-white outline-none focus:border-[#ffc7d1]/50 flex-1 uppercase font-mono text-sm shadow-inner transition-colors"
              disabled={isVoucherApplied}
            />
            {!isVoucherApplied ? (
               <button onClick={handleApplyVoucher} className="px-5 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors">
                 Klaim
               </button>
            ) : (
               <button onClick={() => { setIsVoucherApplied(false); setVoucherInput(""); setVoucherMessage(""); }} className="px-5 py-3 bg-red-500/10 text-red-400 rounded-xl font-bold hover:bg-red-500/20 transition-colors">
                 Batal
               </button>
            )}
          </div>
          {voucherMessage && <p className={`text-xs mt-3 font-medium ${isVoucherApplied ? 'text-[#25D366]' : 'text-red-400'}`}>{voucherMessage}</p>}
        </div>

        <div className="flex flex-col gap-3 mb-8 relative z-10 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>Subtotal</span>
            <span>Rp{formatPrice(cTotal)}</span>
          </div>
          {isVoucherApplied && (
            <div className="flex items-center justify-between text-[#25D366] text-sm font-bold">
              <span>Diskon (10%)</span>
              <span>-Rp{formatPrice(discountAmount)}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
            <span className="text-gray-300 font-bold">Total Bayar</span>
            <span className="text-3xl font-extrabold text-[#ffc7d1]">
              <span className="text-lg font-semibold text-[#ffc7d1]/60 mr-1.5">Rp</span>
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 relative z-10">
          <button
            onClick={() => sendWhatsApp(isVoucherApplied ? 0.1 : 0, isVoucherApplied ? "LEBARANDY10" : "")}
            className="flex-1 py-4 rounded-full bg-[#25D366] text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#1da851] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all hover:-translate-y-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Checkout via WhatsApp
          </button>
          <Link href="/products" className="flex-1 py-4 rounded-full border border-white/10 text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            Lanjut Belanja Dulu
          </Link>
        </div>
      </div>
    </div>
  );
}
