import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, getMinPrice, formatPrice } from "@/data/products";
import { ArrowRight, ShoppingBag, Joystick, Pill, Sparkles, Heart, Crown, ArrowLeftRight, Star, Truck, ShieldCheck } from "lucide-react";

// Swap out some aggressive icons for softer versions if possible
const ICONS = { groceries: ShoppingBag, poultry: Heart, health: Pill, services: Sparkles, topup: Joystick, digital: Crown, transfer: ArrowLeftRight };

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.category === "topup" || p.category === "digital").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-visible">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
            
            {/* Cute mini badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffc7d1]/10 text-[#ffc7d1] rounded-full text-xs font-bold tracking-wide mb-6 border border-[#ffc7d1]/20 animate-fade-in-up">
              <Sparkles size={14} className="animate-pulse" /> Welcome to Kedai Nindy
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up" style={{animationDelay: '100ms'}}>
              Aesthetics &<br />
              <span className="bg-gradient-to-r from-[#ffc7d1] to-[#e6d8ff] bg-clip-text text-transparent">Cozy Shopping.</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg animate-fade-in-up text-center md:text-left" style={{animationDelay: '200ms'}}>
              Temukan kebutuhan sehari-harimu mulai dari bahan masak, layanan digital, hingga game top up favoritmu dengan suasana belanja yang santai.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0f0f12] rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-white/20">
                Mulai Belanja <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/6281266002147" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-full font-bold text-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
                Hubungi Kami
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              {[
                { val: "100+", label: "Products" },
                { val: "4.9", label: "Rating" },
                { val: "24/7", label: "Support" },
              ].map(s => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="text-2xl font-extrabold tracking-tight text-white mb-1">{s.val}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-[#1a1a1f]/30 border-y border-white/5 relative z-10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Layanan Cepat", desc: "Order instan, tidak perlu menunggu lama.", color: "text-[#ffd9c7]", bg: "bg-[#ffd9c7]/10" },
              { icon: ShieldCheck, title: "100% Aman", desc: "Transaksi terpercaya dan bergaransi penuh.", color: "text-[#e6d8ff]", bg: "bg-[#e6d8ff]/10" },
              { icon: Star, title: "Super Best Deal", desc: "Promo hemat untukmu setiap harinya.", color: "text-[#ffc7d1]", bg: "bg-[#ffc7d1]/10" },
            ].map((p, i) => (
              <div key={p.title} className="flex gap-5 items-start bg-[#1a1a1f] p-6 rounded-[2rem] border border-white/5 hover:-translate-y-1 hover:border-white/10 transition-all">
                <div className={`w-12 h-12 rounded-full ${p.bg} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  <p.icon size={20} className={p.color} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 relative z-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white mb-3">Shop by Category</h2>
            <p className="text-gray-400 text-sm">Pilih kategori kesayanganmu di bawah ini.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.filter(c => c.slug !== "transfer").map(cat => {
              const Icon = ICONS[cat.slug] || ShoppingBag;
              const count = PRODUCTS.filter(p => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="group bg-[#1a1a1f] rounded-[2rem] border border-white/5 p-6 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#ffc7d1]/5 hover:border-[#ffc7d1]/20 transition-all duration-300 relative overflow-hidden text-center flex flex-col items-center"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-[#0f0f12] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-black/40 border border-white/5">
                    <Icon size={24} className="text-[#e6d8ff] group-hover:text-[#ffc7d1] transition-colors" />
                  </div>
                  <h3 className="font-bold text-white text-[15px] mb-1">{cat.label}</h3>
                  <p className="text-xs font-medium text-gray-500">{count} Items</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-[#1a1a1f]/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-3 justify-center md:justify-start">
                Produk Pilihan <Heart size={24} className="text-[#ffc7d1] fill-[#ffc7d1]" />
              </h2>
              <p className="text-gray-400 text-sm">Produk hits yang paling sering dipesan.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
              Lihat Semuanya
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(product => {
              const min = getMinPrice(product);
              return (
                <Link key={product.id} href="/products" className="group bg-[#1a1a1f] rounded-3xl overflow-hidden border border-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#ffc7d1]/5 hover:border-[#ffc7d1]/20 transition-all duration-300 flex flex-col h-full">
                  <div className="p-2.5">
                    <div className="aspect-square bg-[#0f0f12] relative overflow-hidden flex items-center justify-center rounded-[1.5rem] shadow-inner shadow-black/40">
                      {product.badge && (
                        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gradient-to-r from-[#e6d8ff] to-[#ffc7d1] text-[#0f0f12] text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md">
                          {product.badge}
                        </span>
                      )}
                      <img src={product.image || "https://placehold.co/400x400?text=No+Image"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[14px] text-white line-clamp-2 mb-2 group-hover:text-[#ffc7d1] transition-colors">{product.name}</h3>
                    <div className="mt-auto">
                      <p className="text-[#ffd9c7] font-extrabold text-lg"><span className="text-xs font-medium text-gray-500 mr-1">Rp</span>{formatPrice(min)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#1a1a1f] rounded-[3rem] p-12 md:p-20 text-center border border-white/5 relative overflow-hidden shadow-2xl shadow-black/50">
            {/* Soft background glow inside card */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffc7d110,_transparent_60%)] pointer-events-none" />
            
            <Heart size={40} className="text-[#ffc7d1] mb-6 mx-auto opacity-80" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Cari yang lain?</h2>
            <p className="text-gray-400 mb-10 text-sm md:text-base max-w-lg mx-auto leading-relaxed">Jangan khawatir, kami punya banyak koleksi barang yang selalu update setiap minggunya.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#0f0f12] rounded-full font-bold hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-white/20">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
