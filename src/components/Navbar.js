"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { Package, Grid3X3, Headphones, Menu, X, ShoppingBag, Heart, User, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Heart },
  { href: "/topup", label: "Top Up", icon: Gamepad2 },
  { href: "/products", label: "Shop", icon: Package },
  { href: "https://wa.me/6281266002147", label: "Support", icon: Headphones, external: true },
];

export default function Navbar() {
  const { cartCount, hasHydrated } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    
    // Initial check
    setCurrentHash(window.location.hash);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    // Update hash on pathname change as well
    setCurrentHash(window.location.hash);
  }, [pathname]);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1a1a1f]/80 backdrop-blur-xl shadow-lg shadow-black/20 border border-white/5" : "bg-transparent"
      } max-w-5xl mx-auto rounded-full`}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#ffc7d1] to-[#ffd9c7] rounded-full flex items-center justify-center shadow-md shadow-[#ffc7d1]/20 group-hover:scale-105 transition-transform overflow-hidden">
            <img 
              src="https://png.pngtree.com/png-clipart/20241102/original/pngtree-illustration-of-a-coloring-page-cat-with-headphones-png-image_16627387.png" 
              alt="Logo" 
              className="w-full h-full object-cover scale-125"
            />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Kedai <span className="text-[#ffc7d1]">Game</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1a1a1f]/40 p-1.5 rounded-full border border-white/5">
          {NAV_LINKS.map((link) => {
            const isActive = link.href.startsWith("/#") 
              ? currentHash === link.href.replace("/", "")
              : pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#ffc7d1]/10 text-[#ffc7d1]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon size={16} className={isActive ? "text-[#ffc7d1]" : "text-gray-400"} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden md:flex w-10 h-10 rounded-full bg-[#1a1a1f] border border-white/5 items-center justify-center text-gray-400 hover:text-[#e6d8ff] hover:border-[#e6d8ff]/30 transition-colors"
          >
            <User size={18} />
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] rounded-full hover:scale-110 active:scale-95 transition-all shadow-md shadow-[#ffc7d1]/20"
          >
            <ShoppingBag size={18} />
            {hasHydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#0f0f12] text-white text-[10px] font-bold rounded-full border border-[#ffc7d1]">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-20 left-0 right-0 p-4 md:hidden">
          <div className="bg-[#1a1a1f]/95 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-2xl flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-white font-medium"
              >
                <link.icon size={18} className="text-[#ffc7d1]" />
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-white/5 hover:text-white font-medium"
            >
              <User size={18} className="text-[#e6d8ff]" />
              Account / Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
