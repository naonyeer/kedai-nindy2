"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check, Info, Moon, Zap, AlertTriangle } from "lucide-react";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session or local storage
    const hasSeenPopup = sessionStorage.getItem("promoPopupSeen");
    if (!hasSeenPopup) {
      // Delay popup slightly for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("promoPopupSeen", "true");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("LEBARANDY10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div 
        className="relative w-full max-w-md bg-[#1a1a1f] border border-[#ffc7d1]/20 rounded-3xl shadow-2xl p-6 text-center transform transition-all"
        style={{
          background: "linear-gradient(180deg, #241a1c 0%, #1a1a1f 100%)"
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center mt-4">
          {/* Moon Icon */}
          <div className="text-5xl mb-4 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            🌙
          </div>

          {/* Subtitle */}
          <div className="flex items-center gap-2 text-[#a8a8b3] text-sm font-medium mb-3">
            <span className="text-lg">✨</span> Marhaban ya Ramadhan 1447 H
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
            PUASA GASPOL, <br className="hidden md:block"/> DISKON JEBOL! <span className="text-yellow-400">⚡</span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 leading-relaxed px-2">
            Sikat Diskon <strong className="text-white">10%</strong> untuk Semua Produk Digital Premium.<br/>
            Minimal order cuma <strong className="text-white">10rb!</strong>
          </p>

          {/* Voucher Code Box */}
          <div className="relative w-full border-2 border-dashed border-[#ffc7d1]/50 bg-[#ffc7d1]/5 rounded-xl p-4 mb-6 group hover:border-[#ffc7d1] transition-colors">
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-400 text-sm font-semibold">KODE:</span>
              <span className="text-2xl font-black tracking-wider text-white">LEBARANDY10</span>
              <button 
                onClick={handleCopy}
                className="ml-2 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Copy Code"
              >
                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Warning text */}
          <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold mb-6">
            <AlertTriangle size={14} /> Kuota Sangat Terbatas Setiap Harinya!
          </div>

          {/* Action Button */}
          <button 
            onClick={handleClose}
            className="w-full py-3.5 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] hover:shadow-lg hover:shadow-[#ffc7d1]/20 text-[#0f0f12] font-extrabold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            TUTUP & MULAI BELANJA
          </button>
        </div>
      </div>
    </div>
  );
}
