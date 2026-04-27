import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import PromoPopup from "@/components/PromoPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kedai Game — Top Up Diamond, UC & Voucher Game",
  description: "Kedai Game: top up Mobile Legends, Free Fire, PUBG, Genshin Impact, Valorant, dan ratusan game lain. Proses instan via Digiflazz, harga termurah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.className} dark`}>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col relative selection:bg-orange-500/30">
        <Background />
        <PromoPopup />
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          </CartProvider>
      </body>
    </html>
  );
}
