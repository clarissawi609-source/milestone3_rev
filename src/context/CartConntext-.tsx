///CONTOH PEMBELAJARAN CONTEXT API - CART CONTEXT
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem } from "@/types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];

      const exist = safePrev.find((item) => item.id === product.id);

      if (exist) {
        return safePrev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...safePrev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}