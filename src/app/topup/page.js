import Link from "next/link";
import { fetchGames } from "@/lib/topup-data";
import { ArrowRight, Search, Zap, ShieldCheck, Clock } from "lucide-react";
import TopupBrowser from "./TopupBrowser";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Top Up Game — Kedai Game",
  description: "Top up diamond, UC, voucher game tercepat dan termurah. Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant, dan lainnya.",
};

function formatRupiah(n) {
  return Number(n).toLocaleString("id-ID");
}

export default async function TopupPage() {
  const { curated, others, mock } = await fetchGames();

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffc7d1]/10 text-[#ffc7d1] rounded-full text-xs font-bold tracking-wide mb-6 border border-[#ffc7d1]/20">
          <Zap size={14} /> Top Up Game
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Top Up <span className="bg-gradient-to-r from-[#ffc7d1] to-[#e6d8ff] bg-clip-text text-transparent">favoritmu</span>, instan.
        </h1>
        <p className="text-gray-400 max-w-xl">
          Pilih game, masukkan ID, bayar via WhatsApp. Diamond / UC langsung masuk ke akunmu via Digiflazz.
        </p>
        {mock ? (
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            <Clock size={14} /> Mode demo — harga & SKU dummy. Set <code className="font-mono px-1">DIGIFLAZZ_USERNAME</code> dan <code className="font-mono px-1">DIGIFLAZZ_API_KEY</code> di env untuk data live.
          </div>
        ) : null}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {[
          { icon: Zap, title: "Proses Instan", desc: "Diamond / UC masuk dalam hitungan detik." },
          { icon: ShieldCheck, title: "100% Aman", desc: "Transaksi via Digiflazz resmi, anti-banned." },
          { icon: Clock, title: "24/7 Online", desc: "Buka tiap hari, malam pun bisa nembak." },
        ].map((item) => (
          <div key={item.title} className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-[#ffc7d1]/10 flex items-center justify-center flex-shrink-0">
              <item.icon size={18} className="text-[#ffc7d1]" />
            </div>
            <div>
              <div className="text-white font-bold text-sm mb-1">{item.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      <TopupBrowser
        curated={curated.map(({ game, products, available }) => ({
          slug: game.slug,
          name: game.name,
          publisher: game.publisher,
          image: game.image,
          accent: game.accent,
          badge: game.badge ?? null,
          available,
          minPrice: products.length ? Math.min(...products.map((p) => p.price)) : null,
          variantCount: products.length,
        }))}
        others={others.map(({ brand, products }) => ({
          brand,
          slug: null,
          minPrice: products.length ? Math.min(...products.map((p) => p.price)) : null,
          variantCount: products.length,
        }))}
        formatRupiah={formatRupiah}
      />

      <div className="mt-16 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
