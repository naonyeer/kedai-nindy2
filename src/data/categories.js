export const CATEGORIES = [
  { slug: "groceries", label: "Sembako & Jajanan", description: "Beras, rokok, snack, dan minuman dingin", mainCat: "jualan", subcategories: ["beras", "rokok", "jajanan", "minuman"] },
  { slug: "poultry", label: "Ayam Potong", description: "Ayam segar potong harian berkualitas", mainCat: "ayam" },
  { slug: "health", label: "Herbalife", description: "Produk nutrisi dan suplemen kesehatan", mainCat: "herbalife" },
  { slug: "services", label: "Service & Repair", description: "Perbaikan HP, elektronik, dan aksesoris", mainCat: "service" },
  { slug: "topup", label: "Game Top Up", description: "Top up diamond, UC, dan voucher game", mainCat: "topup" },
  { slug: "digital", label: "Akun Premium", description: "Akun streaming, produktivitas, dan tools", mainCat: "akun" },
  { slug: "transfer", label: "Transfer Uang", description: "Jasa transfer antar bank dan e-wallet", mainCat: "transfer" },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryByMainCat(mainCat) {
  return CATEGORIES.find(c => c.mainCat === mainCat);
}
