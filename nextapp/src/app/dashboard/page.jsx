"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Trash2, Save, Search, Settings, Lock } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(CATEGORIES.filter(c => c.slug !== 'transfer'));
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // tracking by index for easier update
  const [formData, setFormData] = useState({
    id: "", name: "", slug: "", category: "digital", image: "", description: "", badge: "", variants: []
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "171202") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPassword("");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      alert("Error loading products: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const syncToServer = async (newProducts) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProducts),
      });
      if (!res.ok) throw new Error("Failed to save");
      setProducts(newProducts);
    } catch (e) {
      alert("Error saving: " + e.message);
    }
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({
      id: "prod-" + Date.now(),
      name: "",
      slug: "slug-" + Date.now(),
      category: "digital",
      image: "",
      description: "",
      badge: "",
      variants: [{ id: Date.now(), label: "Varian 1", price: 0 }]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    const idx = products.findIndex(x => x.id === product.id);
    setEditingIndex(idx);
    setFormData(JSON.parse(JSON.stringify(product))); // deep copy
    setIsModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (!confirm("Hapus produk ini?")) return;
    const newList = products.filter(p => p.id !== id);
    syncToServer(newList);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveModal = () => {
    if (!formData.name) return alert("Nama produk wajib diisi!");
    if (formData.variants.length === 0) return alert("Minimal 1 variasi produk!");
    
    // Auto generate nice slug if it's generic
    if (formData.slug.startsWith("slug-")) {
      formData.slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      formData.id = formData.slug;
    }

    const newDoc = { ...formData };
    // Numeric transform
    newDoc.variants = newDoc.variants.map(v => ({ ...v, price: Number(v.price) || 0 }));

    const newList = [...products];
    if (editingIndex !== null) {
      // Overwrite
      newList[editingIndex] = newDoc;
    } else {
      // Create new
      newList.unshift(newDoc);
    }

    syncToServer(newList);
    closeModal();
  };

  // Variants management
  const updateVariant = (idx, field, val) => {
    const v = [...formData.variants];
    v[idx][field] = val;
    setFormData({ ...formData, variants: v });
  };
  const removeVariant = (idx) => {
    const v = [...formData.variants];
    v.splice(idx, 1);
    setFormData({ ...formData, variants: v });
  };
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { id: Date.now(), label: "", price: 0 }]
    });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f0f12]">
        <div className="w-full max-w-sm p-8 bg-[#1a1a1f] border border-white/5 rounded-[2.5rem] shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#ffc7d1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#ffc7d1]" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400 text-sm mb-8">Silakan masukkan kata sandi untuk mengakses Dashboard.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
                autoFocus
                className={`w-full px-6 py-4 bg-[#0f0f12] border ${authError ? 'border-red-500/50' : 'border-white/5'} rounded-2xl text-white text-center text-xl tracking-[0.5em] focus:outline-none focus:border-[#ffc7d1] transition-all`}
              />
              {authError && <p className="text-red-400 text-xs mt-2 animate-bounce">Sandi salah, coba lagi!</p>}
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] font-bold rounded-2xl hover:shadow-lg hover:shadow-[#ffc7d1]/20 transition-all active:scale-95">
              Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[transparent] text-gray-200 p-6 pt-28 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="text-[#ffc7d1]" /> Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Kelola data produk Kedai Nindy secara langsung</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Cari produk..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#1a1a1f] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors"
              />
            </div>
            <button onClick={openAddModal} className="px-4 py-2 bg-[#ffc7d1] text-[#0f0f12] text-sm font-bold rounded-xl hover:bg-[#ffb3c1] transition-colors flex items-center gap-2 shadow-md shadow-[#ffc7d1]/10">
              <Plus size={16} /> Tambah Produk
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-gray-500 text-center py-20 animate-pulse font-medium">Memuat data produk...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((p, idx) => (
              <div key={idx} className="bg-[#1a1a1f] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-[#ffc7d1]/30 hover:shadow-xl hover:shadow-[#ffc7d1]/5 transition-all">
                <div className="w-full aspect-square bg-[#0f0f12] rounded-xl flex items-center justify-center p-2 mb-3 relative overflow-hidden shadow-inner translate-z-0">
                   <img src={p.image || "https://placehold.co/400x400?text=No+Image"} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[13px] font-bold text-white line-clamp-1 mb-1 group-hover:text-[#ffc7d1] transition-colors">{p.name}</h3>
                <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-semibold">{p.variants.length} Varian</p>
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                  <button onClick={() => openEditModal(p)} className="flex-1 py-2 bg-white/5 text-[11px] font-bold text-gray-300 rounded-lg hover:bg-[#ffc7d1]/10 hover:text-[#ffc7d1] transition-all">EDIT</button>
                  <button onClick={() => deleteProduct(p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Modal (Dark Theme similar to screenshot) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
          
          <div className="relative bg-[#1a1a1f] border border-white/10 rounded-[2.5rem] w-full max-w-[640px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-[0.98] duration-200">
            <div className="p-7 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Edit Data Produk</h2>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Kedai Nindy Management</p>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Nama Produk</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors" placeholder="Contoh: Beras Premium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Kategori</label>
                  <div className="relative">
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors appearance-none">
                      {categories.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">URL Gambar Produk</label>
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-5 py-3 bg-[#0f0f12]/50 border border-[#ffc7d1]/20 text-[#ffc7d1] rounded-2xl text-xs font-mono focus:outline-none focus:border-[#ffc7d1] transition-colors" placeholder="https://image-url.com/..." />
                <p className="text-[10px] text-gray-500 mt-2 font-medium bg-white/5 px-2 py-1 rounded inline-block italic">💡 Tip: Gunakan URL dari internet agar gambar tetap rapi.</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Deskripsi Produk</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors resize-none" placeholder="Masukkan detail produk disini..."></textarea>
              </div>

              <div className="opacity-60">
                <label className="block text-[11px] font-bold text-[#ffc7d1] mb-2 uppercase tracking-widest">Info Garansi</label>
                <div className="w-full px-5 py-3 bg-[#ffc7d1]/5 border border-[#ffc7d1]/10 rounded-2xl text-xs text-gray-400 leading-relaxed italic">
                  Produk dilindungi garansi selama masa aktif berlaku.
                </div>
              </div>

              {/* Variants */}
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Varian & Harga (Wajib)</label>
                  <button onClick={addVariant} className="text-[11px] font-bold text-[#ffc7d1] hover:underline transition-all">+ TAMBAH VARIAN</button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {formData.variants.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-3 animate-fade-in-up">
                      <input type="text" value={v.label} onChange={e => updateVariant(i, 'label', e.target.value)} placeholder="Misal: 1kg" className="flex-1 px-4 py-2.5 bg-[#0f0f12] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1]" />
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">Rp</span>
                        <input type="number" value={v.price || ''} onChange={e => updateVariant(i, 'price', e.target.value)} placeholder="0" className="w-full pl-10 pr-4 py-2.5 bg-[#0f0f12] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1]" />
                      </div>
                      <button onClick={() => removeVariant(i)} className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg border border-red-500/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="p-8 border-t border-white/5 flex gap-3 bg-gradient-to-b from-transparent to-black/20">
              <button onClick={closeModal} className="px-6 py-3 bg-white/5 text-gray-400 font-bold text-xs rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest">Batal</button>
              <button onClick={handleSaveModal} className="flex-1 py-3 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] font-bold text-sm rounded-2xl hover:shadow-lg hover:shadow-[#ffc7d1]/20 transition-all flex items-center justify-center gap-2">
                <Save size={18} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
