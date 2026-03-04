//ISR PAGE

import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export const revalidate = 60; // ISR 60 detik

async function getproduct(): Promise<Product[]> {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function productPage() {
  const product = await getproduct();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg md:max-w-3xl lg:max-w-7xl m-auto flex flex-col items-center">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-8">product</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {product.slice(0, 20).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}