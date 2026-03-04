// SSR Page

import type { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ProductDetailPage from "@/components/ProductDetail";

export const dynamic = "force-dynamic"; //SSR menggunakan force-dynamic

///////////////////////
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

////////////////////////
async function getProduct(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store", // or "force-cache"
    next: { revalidate: 60 }, // ISR-style
  });

  if (!res.ok) return null;
  return (await res.json()) as Product;
}
export default async function SsrProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  ///Salah satu Contoh Pembuatan Handle Eror
  if (!product) {
    return (
      <>
        <Navbar />
        <main className="font-mono w-full min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-light ">Product Not Found</h1>
            <p className="text-red-400">Unable to load the product details.</p>
            <p className="text-gray-600 text-lg">Try again Leter.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="font-mono w-full">
        <Navbar />
        <section className=" ">
          <ProductDetailPage product={product} />
        </section>
        <Footer />
      </main>
    </>
  );
}
//////////////////////////////