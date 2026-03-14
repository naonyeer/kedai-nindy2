import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kedai Nindy — Toko Online Terlengkap",
  description: "Kedai Nindy menyediakan sembako, ayam potong, obat kesehatan, service HP & elektronik, top up game, dan akun premium digital. Pesan via WhatsApp!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.className} dark`}>
      <body className="bg-[#050505] text-white antialiased min-h-screen flex flex-col relative selection:bg-orange-500/30">
        <Background />
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
