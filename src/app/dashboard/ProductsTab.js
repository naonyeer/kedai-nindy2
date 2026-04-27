"use client";
import { useEffect, useState } from "react";
import { X, Plus, Trash2, Save, Search } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const categories = CATEGORIES.filter((c) => c.slug !== "transfer");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    category: "topup",
    image: "",
    description: "",
    badge: "",
    variants: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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
      category: "topup",
      image: "",
      description: "",
      badge: "",
      variants: [{ id: Date.now(), label: "Varian 1", price: 0 }],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    const idx = products.findIndex((x) => x.id === product.id);
    setEditingIndex(idx);
    setFormData(JSON.parse(JSON.stringify(product)));
    setIsModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (!confirm("Hapus produk ini?")) return;
    const newList = products.filter((p) => p.id !== id);
    syncToServer(newList);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveModal = () => {
    if (!formData.name) return alert("Nama produk wajib diisi!");
    if (formData.variants.length === 0) return alert("Minimal 1 variasi produk!");

    if (formData.slug.startsWith("slug-")) {
      formData.slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      formData.id = formData.slug;
    }

    const newDoc = { ...formData };
    newDoc.variants = newDoc.variants.map((v) => ({ ...v, price: Number(v.price) || 0 }));

    const newList = [...products];
    if (editingIndex !== null) {
      newList[editingIndex] = newDoc;
    } else {
      newList.unshift(newDoc);
    }
    syncToServer(newList);
    closeModal();
  };

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
      variants: [...formData.variants, { id: Date.now(), label: "", price: 0 }],
    });
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[#1a1a1f] border border-white/5 rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-white">Produk Lokal</h2>
          <p className="text-gray-500 text-xs mt-1">Sembako, layanan service, akun premium, dll. Diluar Digiflazz.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#0f0f12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors"
            />
          </div>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-[#ffc7d1] text-[#0f0f12] text-sm font-bold rounded-xl hover:bg-[#ffb3c1] transition-colors flex items-center gap-2 shadow-md shadow-[#ffc7d1]/10"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-20 animate-pulse font-medium">Memuat data produk...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#0f0f12] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-[#ffc7d1]/30 hover:shadow-xl hover:shadow-[#ffc7d1]/5 transition-all"
            >
              <div className="w-full aspect-square bg-[#1a1a1f] rounded-xl flex items-center justify-center p-2 mb-3 relative overflow-hidden shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image || "https://placehold.co/400x400?text=No+Image"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-[13px] font-bold text-white line-clamp-1 mb-1 group-hover:text-[#ffc7d1] transition-colors">{p.name}</h3>
              <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-semibold">
                {p.variants.length} Varian
              </p>
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                <button
                  onClick={() => openEditModal(p)}
                  className="flex-1 py-2 bg-white/5 text-[11px] font-bold text-gray-300 rounded-lg hover:bg-[#ffc7d1]/10 hover:text-[#ffc7d1] transition-all"
                >
                  EDIT
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
          <div className="relative bg-[#1a1a1f] border border-white/10 rounded-[2.5rem] w-full max-w-[640px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-7 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Edit Data Produk</h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">Kedai Game Management</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Nama Produk</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors"
                    placeholder="Contoh: Beras Premium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">URL Gambar</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-5 py-3 bg-[#0f0f12] border border-[#ffc7d1]/20 text-[#ffc7d1] rounded-2xl text-xs font-mono focus:outline-none focus:border-[#ffc7d1] transition-colors"
                  placeholder="https://image-url.com/..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-5 py-3 bg-[#0f0f12] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-[#ffc7d1] transition-colors resize-none"
                />
              </div>

              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Varian & Harga</label>
                  <button onClick={addVariant} className="text-[11px] font-bold text-[#ffc7d1] hover:underline">
                    + TAMBAH VARIAN
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {formData.variants.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={v.label}
                        onChange={(e) => updateVariant(i, "label", e.target.value)}
                        placeholder="Misal: 1kg"
                        className="flex-1 px-4 py-2.5 bg-[#0f0f12] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1]"
                      />
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">Rp</span>
                        <input
                          type="number"
                          value={v.price || ""}
                          onChange={(e) => updateVariant(i, "price", e.target.value)}
                          placeholder="0"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#0f0f12] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#ffc7d1]"
                        />
                      </div>
                      <button
                        onClick={() => removeVariant(i)}
                        className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-white/5 text-gray-400 font-bold text-xs rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest"
              >
                Batal
              </button>
              <button
                onClick={handleSaveModal}
                className="flex-1 py-3 bg-gradient-to-r from-[#ffc7d1] to-[#ffd9c7] text-[#0f0f12] font-bold text-sm rounded-2xl hover:shadow-lg hover:shadow-[#ffc7d1]/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} /> SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
