"use client";
import { useCallback, useEffect, useState } from "react";
import { Lock, ShoppingBag, Wallet, Send, RefreshCw } from "lucide-react";
import ProductsTab from "./ProductsTab";
import SaldoTab from "./SaldoTab";
import TembakTab from "./TembakTab";
import PriceListTab from "./PriceListTab";

const STORAGE_KEY = "kedaigame_admin_pw";

async function verifyPassword(pw) {
  try {
    const res = await fetch("/api/admin/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authPassword, setAuthPassword] = useState(null);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("products");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      verifyPassword(saved).then((ok) => {
        if (ok) setAuthPassword(saved);
        else sessionStorage.removeItem(STORAGE_KEY);
      });
    }
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthPassword(null);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    const ok = await verifyPassword(password);
    setLoading(false);
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, password);
      setAuthPassword(password);
      setPassword("");
    } else {
      setAuthError("Password salah");
      setPassword("");
    }
  }

  if (!authPassword) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full max-w-sm p-8 bg-[#1a1a1f] border border-white/5 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#ffc7d1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#ffc7d1]" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400 text-sm mb-8">
            Masukkan password admin untuk akses dashboard Kedai Game.
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="px-4 py-3 rounded-2xl bg-[#0f0f12] border border-white/10 text-white placeholder-gray-600 outline-none focus:border-[#ffc7d1]/40 focus:ring-2 focus:ring-[#ffc7d1]/10"
            />
            {authError ? <div className="text-rose-400 text-xs">{authError}</div> : null}
            <button
              type="submit"
              disabled={loading || !password}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] font-bold text-sm disabled:opacity-50"
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
          <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
            Default password <code className="font-mono px-1 bg-white/5 rounded">171202</code>. Override
            dengan env <code className="font-mono px-1 bg-white/5 rounded">ADMIN_PASSWORD</code>.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "products", label: "Produk Lokal", icon: ShoppingBag },
    { id: "saldo", label: "Saldo Digiflazz", icon: Wallet },
    { id: "tembak", label: "Tembak Manual", icon: Send },
    { id: "pricelist", label: "Sync Price List", icon: RefreshCw },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm">Kelola produk lokal dan integrasi Digiflazz.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 self-start"
        >
          Keluar
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              tab === t.id
                ? "bg-[#ffc7d1]/15 text-[#ffc7d1] border border-[#ffc7d1]/40"
                : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "products" ? <ProductsTab /> : null}
      {tab === "saldo" ? <SaldoTab adminPassword={authPassword} /> : null}
      {tab === "tembak" ? <TembakTab adminPassword={authPassword} /> : null}
      {tab === "pricelist" ? <PriceListTab /> : null}
    </div>
  );
}
