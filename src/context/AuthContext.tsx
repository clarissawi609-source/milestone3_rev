///CONTOH PEMBELAJARAN CONTEXT API - AUTH CONTEXT

"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types/user";
// import { CartProvider } from "./CartContext";

/////////////////////////////////

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

//////////////////////////////////

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    document.cookie = "user=true; path=/";
    document.cookie = `role=${userData.role}; path=/`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "user=; Max-Age=0";
    document.cookie = "role=; Max-Age=0";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* <CartProvider>{children}</CartProvider> */}
    </AuthContext.Provider>
  );
}