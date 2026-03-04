import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types/product";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity) => {
        const { cart } = get();
        const exist = cart.find((i) => i.id === product.id);

        if (exist) {
          set({
            cart: cart.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity }],
          });
        }
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, qty) => {
        if (qty < 1) return;

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item,
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // localStorage key
    },
  ),
);