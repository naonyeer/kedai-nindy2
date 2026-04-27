import { isConfigured, priceList } from "@/lib/digiflazz";
import { MOCK_PRICE_LIST } from "@/data/mockPriceList";
import { GAMES, getGameByDigiflazzBrand } from "@/data/games";

export async function fetchAllProducts() {
  if (!isConfigured()) {
    return { items: MOCK_PRICE_LIST, mock: true };
  }
  try {
    const json = await priceList();
    const items = Array.isArray(json?.data) ? json.data : [];
    return { items, mock: false };
  } catch (err) {
    console.warn("[topup-data] price-list error, falling back to mock:", err.message);
    return { items: MOCK_PRICE_LIST, mock: true, error: err.message };
  }
}

export function groupByBrand(items) {
  const map = new Map();
  for (const it of items) {
    if (!it?.brand) continue;
    if (!it.buyer_product_status || !it.seller_product_status) continue;
    const key = String(it.brand).toUpperCase().trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(it);
  }
  return map;
}

export async function fetchGames() {
  const { items, mock, error } = await fetchAllProducts();
  const grouped = groupByBrand(items);

  const curated = GAMES.map((game) => {
    const products = grouped.get(game.digiflazzBrand.toUpperCase()) || [];
    products.sort((a, b) => a.price - b.price);
    return { game, products, available: products.length > 0 };
  });

  const curatedBrands = new Set(GAMES.map((g) => g.digiflazzBrand.toUpperCase()));
  const others = [];
  for (const [brand, products] of grouped.entries()) {
    if (curatedBrands.has(brand)) continue;
    products.sort((a, b) => a.price - b.price);
    others.push({ brand, products });
  }
  others.sort((a, b) => a.brand.localeCompare(b.brand));

  return { curated, others, mock, error };
}

export async function fetchGameBySlug(slug) {
  const { curated, mock, error } = await fetchGames();
  const found = curated.find((c) => c.game.slug === slug);
  return { ...found, mock, error };
}

export { getGameByDigiflazzBrand };
