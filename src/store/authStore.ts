// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./cartStore";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: (user) => set({ user }),

      logout: () => {
        set({ user: null });
        useCartStore.getState().clearCart();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);