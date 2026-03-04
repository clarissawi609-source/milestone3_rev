import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export function useproduct() {
  const [product, setproduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data: Product[]) => setproduct(data));
  }, []);

  return product;
}