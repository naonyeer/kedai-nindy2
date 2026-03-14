"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);
const WHATSAPP_NUMBER = "6281266002147";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kedaiNindyCartV2");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("kedaiNindyCartV2", JSON.stringify(cart));
  }, [cart, loaded]);

  const addToCart = useCallback((product, variant, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.variantId === variant.id);
      if (existing) {
        return prev.map(c => c.variantId === variant.id ? { ...c, qty: c.qty + qty } : c);
      }
      return [...prev, {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        variantId: variant.id,
        variantLabel: variant.label,
        price: variant.price,
        qty,
      }];
    });
  }, []);

  const removeFromCart = useCallback((variantId) => {
    setCart(prev => prev.filter(c => c.variantId !== variantId));
  }, []);

  const updateQty = useCallback((variantId, delta) => {
    setCart(prev => prev.map(c => {
      if (c.variantId !== variantId) return c;
      const newQty = c.qty + delta;
      return newQty <= 0 ? null : { ...c, qty: newQty };
    }).filter(Boolean));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const sendWhatsApp = useCallback(() => {
    if (cart.length === 0) return;
    const fmt = (n) => n.toLocaleString("id-ID");
    let msg = `*Pesanan dari Kedai Nindy*\n\n`;
    cart.forEach((item, i) => {
      msg += `${i + 1}. ${item.productName} (${item.variantLabel})\n`;
      msg += `   ${item.qty} × Rp${fmt(item.price)} = *Rp${fmt(item.price * item.qty)}*\n`;
    });
    msg += `\n──────────────\n*Total: Rp${fmt(cartTotal)}*\n\nTerima kasih!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }, [cart, cartTotal]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, sendWhatsApp, loaded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
