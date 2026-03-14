import data from "./products.json";

// All products with grouped variant schema
export const PRODUCTS = data;

export function getProductsByCategory(categorySlug) {
  return PRODUCTS.filter(p => p.category === categorySlug);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getMinPrice(product) {
  return Math.min(...product.variants.map(v => v.price));
}

export function formatPrice(n) {
  return n.toLocaleString("id-ID");
}
