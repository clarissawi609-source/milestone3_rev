"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, ShoppingCart, LogOut, User } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();

  // Mengunakan Context
  // const auth = useContext(AuthContext);
  // const cartContext = useContext(CartContext);
  // if (!auth || !cartContext) return null;
  // const { user, logout } = auth;
  // const { cart } = cartContext;

  //  Zustand
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // langsung ambil totalItems
  const totalItems = useCartStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: "Product", href: "/product" },
    { name: "About", href: "/about" },
  ];
  // SEARCH FUNGSI

  // const searchParams = useSearchParams();
  // const [search, setSearch] = useState(searchParams.get("search") || "");
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     router.push(`/?search=${search}`);
  //   }, 500); // debounce 500ms

  //   return () => clearTimeout(delay);
  // }, [search, router]);

  return (
    <nav className="border-b sticky top-0 z-10 bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* MOBILE LEFT - HAMBURGER */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={22} />
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/">Home</Link>
                  <Link href="/product">product</Link>

                  {!user ? (
                    <Link href="/login">Login</Link>
                  ) : (
                    <>
                      {user.role === "admin" && (
                        <Link href="/admin">Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="text-left">
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* LOGO + PRODUCT (DESKTOP) */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-extrabold">
              RissaStore
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-light px-4 py-2 hover:bg-accent "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-6">
            <Input
              placeholder="Search product..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-1 rounded"
            />

            <Link href="/cart" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>

            {!user ? (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User size={16} className="mr-2" />
                    {user.role}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* MOBILE RIGHT - CART */}
          <div className="md:hidden">
            <Link href="/cart" className="relative">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}