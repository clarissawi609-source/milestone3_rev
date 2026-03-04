"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Users, LogOut, Home } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((s) => s.logout);

  const navItems = [
    {
      name: "Home",
      href: "../",
      icon: Home,
    },
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Product",
      href: "/admin/product",
      icon: Package,
    },
    {
      name: "User",
      href: "/admin/users",
      icon: Users,
    },
  ];

  const handleLogout = () => {
    logout();

    // Hapus cookie biar proxy tidak anggap login
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 flex flex-col sticky top-0 h-screen">
        {/* Top Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "" : "hover:bg-muted",
                  )}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section (Logout) */}
        <div className="mt-auto p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm w-full hover:opacity-80 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
        {/* Footer Profile */}
        <div className="border-t p-4 text-sm text-muted-foreground">
          <p>Logged in as</p>
          <p className="font-medium text-foreground">Admin</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}