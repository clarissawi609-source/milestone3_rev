"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // if (!auth) return null;

  // const { login } = auth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email & Password required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1 Login
      const loginRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!loginRes.ok) {
        throw new Error("Invalid credentials");
      }

      const { access_token } = await loginRes.json();

      // 2 Get profile
      const profileRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const user: User = await profileRes.json();

      // 3 Save to Zustand
      // setelah dapat user dari profile API

      login(user);
      localStorage.setItem("token", access_token);

      // 4
      document.cookie = `auth=true; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `role=${user.role}; path=/; max-age=86400; SameSite=Lax`;

      // 5
      setTimeout(() => {
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/checkout");
        }
      }, 100);
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px] border border-gray-200 ">
        <CardHeader>
          <CardTitle className="text-2xl ">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="p-2">Email</Label>
              <Input
                className=" border border-gray-200 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label className="p-2">Password</Label>
              <Input
                type="password"
                className=" border border-gray-200 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full border border-black bg-white text-black hover:bg-gray-100 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className=" border-t border-white/20 text-xs pt-4 text-gray-400 text-center">
            <p className="p-2">Example credentials </p>
            <p>User: john@mail.com / changeme </p>
            <p>Admin: admin@mail.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}