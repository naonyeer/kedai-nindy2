import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { fetchGameBySlug } from "@/lib/topup-data";
import TopupForm from "./TopupForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await fetchGameBySlug(slug);
  if (!found?.game) return { title: "Top Up — Kedai Game" };
  return {
    title: `Top Up ${found.game.name} — Kedai Game`,
    description: `Top up ${found.game.name} cepat dan murah via Digiflazz. Mulai dari Rp ${
      found.products.length ? Math.min(...found.products.map((p) => p.price)).toLocaleString("id-ID") : "-"
    }`,
  };
}

export default async function TopupDetailPage({ params }) {
  const { slug } = await params;
  const found = await fetchGameBySlug(slug);
  if (!found?.game) notFound();
  const { game, products, mock } = found;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
      <Link href="/topup" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={14} /> Semua game
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 mb-10">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{game.publisher}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{game.name}</h1>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-xl">
            Pilih nominal di bawah, masukkan ID akunmu, lalu pesan via WhatsApp. Diamond / UC akan masuk dalam hitungan detik setelah pembayaran terkonfirmasi.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
              <Zap size={12} /> Proses Instan
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-300 text-xs font-semibold border border-sky-500/20">
              <ShieldCheck size={12} /> 100% Aman
            </span>
            {mock ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
                Mode Demo
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <TopupForm
        gameSlug={game.slug}
        gameName={game.name}
        fields={game.fields}
        products={products.map((p) => ({
          sku: p.buyer_sku_code,
          name: p.product_name,
          price: p.price,
          desc: p.desc,
        }))}
      />
    </div>
  );
}
