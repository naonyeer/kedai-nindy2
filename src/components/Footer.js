import Link from "next/link";
import { Phone, MapPin, Clock, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f12]/80 backdrop-blur-xl border-t border-white/5 text-gray-500 mt-auto relative z-10">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ffc7d1] to-[#ffd9c7] rounded-full flex items-center justify-center shadow-md shadow-[#ffc7d1]/20 overflow-hidden">
                <img 
                  src="https://png.pngtree.com/png-clipart/20241102/original/pngtree-illustration-of-a-coloring-page-cat-with-headphones-png-image_16627387.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Kedai <span className="text-[#ffc7d1]">Game</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Toko top up game kesayanganmu. Diamond, UC, Genesis Crystal, dan voucher game langsung masuk via sistem Digiflazz — instan, aman, 24 jam.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigasi</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="hover:text-[#ffc7d1] transition-colors flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#ffc7d1] transition-colors" /> Beranda
              </Link>
              <Link href="/topup" className="hover:text-[#ffc7d1] transition-colors flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#ffc7d1] transition-colors" /> Top Up Game
              </Link>
              <Link href="/products" className="hover:text-[#ffc7d1] transition-colors flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#ffc7d1] transition-colors" /> Layanan Lainnya
              </Link>
              <Link href="/cart" className="hover:text-[#ffc7d1] transition-colors flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#ffc7d1] transition-colors" /> Keranjang Belanja
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Kontak & Lokasi</h4>
            <div className="flex flex-col gap-4 text-sm">
              <a href="https://wa.me/6281266002147" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#ffc7d1] transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ffc7d1]/10 transition-colors">
                  <Phone size={14} className="text-[#ffc7d1]" />
                </div> 
                0812-6600-2147
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={14} className="text-[#e6d8ff]" />
                </div> 
                Jalan Baru
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Clock size={14} className="text-[#ffd9c7]" />
                </div> 
                Buka Tiap Hari (24 Jam)
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Kedai Game. Powered by <span className="text-[#ffc7d1] font-semibold">Digiflazz</span>.</p>
          <div className="flex gap-6">
            <span className="text-white/20">Privacy Policy</span>
            <span className="text-white/20">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
