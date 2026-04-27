import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
  Gamepad2,
  Clock,
  Headset,
} from "lucide-react";
import { fetchGames } from "@/lib/topup-data";
import HomePopularGames from "./HomePopularGames";

export const dynamic = "force-dynamic";

function formatRupiah(n) {
  return Number(n || 0).toLocaleString("id-ID");
}

export default async function HomePage() {
  const { curated, mock } = await fetchGames();

  const popular = curated
    .filter((c) => c.available)
    .map(({ game, products }) => ({
      slug: game.slug,
      name: game.name,
      publisher: game.publisher,
      image: game.image,
      badge: game.badge ?? null,
      minPrice: products.length ? Math.min(...products.map((p) => p.price)) : null,
    }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-visible">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffc7d1]/10 text-[#ffc7d1] rounded-full text-xs font-bold tracking-wide mb-6 border border-[#ffc7d1]/20 animate-fade-in-up">
              <Sparkles size={14} className="animate-pulse" /> Top Up Game Tercepat
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Diamond, UC, &<br />
              <span className="bg-gradient-to-r from-[#ffc7d1] to-[#e6d8ff] bg-clip-text text-transparent">
                Voucher Game
              </span>{" "}
              instan.
            </h1>

            <p
              className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg animate-fade-in-up text-center md:text-left"
              style={{ animationDelay: "200ms" }}
            >
              Top up Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant, dan ratusan game
              lainnya — proses langsung lewat sistem Digiflazz, masuk ke akunmu dalam hitungan detik.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link
                href="/topup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0f0f12] rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-white/20"
              >
                Mulai Top Up <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/6281266002147"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-full font-bold text-sm border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Hubungi Admin
              </a>
            </div>

            <div className="flex gap-10 mt-16 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              {[
                { val: `${popular.length}+`, label: "Games" },
                { val: "Instan", label: "Proses" },
                { val: "24/7", label: "Online" },
              ].map((s) => (
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
              { icon: Zap, title: "Proses Instan", desc: "Diamond / UC masuk dalam hitungan detik via API Digiflazz.", color: "text-[#ffd9c7]", bg: "bg-[#ffd9c7]/10" },
              { icon: ShieldCheck, title: "100% Aman", desc: "Transaksi resmi, anti-banned, garansi penuh.", color: "text-[#e6d8ff]", bg: "bg-[#e6d8ff]/10" },
              { icon: Star, title: "Harga Terbaik", desc: "Diskon harian dan promo eksklusif untuk member.", color: "text-[#ffc7d1]", bg: "bg-[#ffc7d1]/10" },
            ].map((p) => (
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

      {/* Popular Games */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e6d8ff]/10 text-[#e6d8ff] rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 border border-[#e6d8ff]/20">
                <Gamepad2 size={12} /> Game Populer
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Pilih game favoritmu
              </h2>
              {mock ? (
                <p className="text-xs text-amber-300 mt-2">Mode demo aktif — data dummy.</p>
              ) : null}
            </div>
            <Link href="/topup" className="text-sm text-[#ffc7d1] hover:text-white inline-flex items-center gap-1.5 font-semibold whitespace-nowrap">
              Lihat semua <ArrowRight size={14} />
            </Link>
          </div>

          <HomePopularGames items={popular.slice(0, 8)} formatRupiah={formatRupiah} />
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-[#1a1a1f]/30 border-y border-white/5 relative z-10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10">
            3 langkah, pesananmu jadi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Pilih Game", desc: "Klik game favorit, pilih nominal diamond / UC.", icon: Gamepad2 },
              { n: "02", title: "Isi Data", desc: "Masukkan ID akun + Server, konfirmasi.", icon: Headset },
              { n: "03", title: "Bayar & Top Up", desc: "Konfirmasi via WhatsApp, diamond langsung masuk.", icon: Clock },
            ].map((s) => (
              <div key={s.n} className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-2 -right-2 text-[80px] font-extrabold text-white/[0.03] leading-none select-none">{s.n}</div>
                <div className="w-12 h-12 rounded-full bg-[#ffc7d1]/10 flex items-center justify-center mb-4 relative">
                  <s.icon size={20} className="text-[#ffc7d1]" />
                </div>
                <h3 className="text-white font-bold mb-2 relative">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Siap top up sekarang?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Browse semua game di katalog kami atau langsung chat admin untuk request game/produk yang belum ada.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/topup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] font-bold text-sm hover:scale-105 active:scale-95 transition-all"
            >
              Lihat Semua Game <ArrowRight size={14} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 text-white font-semibold text-sm border border-white/10 hover:bg-white/10 transition-all"
            >
              Layanan Lainnya
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
