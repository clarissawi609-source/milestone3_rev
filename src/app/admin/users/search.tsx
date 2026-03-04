"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      router.push(`/admin/users?search=${value}&page=1`);
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <input
      placeholder="Search user..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border px-3 py-2 rounded mb-4"
    />
  );
}