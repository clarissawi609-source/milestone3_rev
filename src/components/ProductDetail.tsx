"use client";

import { Product } from "@/types/product";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/QuantitySelector";
import { useCartStore } from "@/store/cartStore";

//////////////////////////////
interface ProductDetailPageProps {
  product: Product;
}
//////////////////////////////

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  //////////////////////////////
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // toast.success("Product added to cart");
  };

  const handleBack = () => {
    router.back();
  };

  //////////////////////////////
  return (
    <div className="min-h-screen 0 ">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="flex flex-col">
            <div className="aspect-square rounded-lg border border-white-800  overflow-hidden flex items-center justify-center p-8">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "https://via.placeholder.com/150"
                }
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-xs  space-y-1">
              <p>Product Code: {product.id}</p>
              <p>Stock Status: In Stock</p>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between">
            {/* Category Badge */}
            <div>
              <div className="inline-block">
                <span className="inline-block px-3 py-1 text-xs font-medium   border border-white-700 rounded-full">
                  {typeof product.category === "object"
                    ? product.category.name
                    : product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-4xl lg:text-5xl font-light leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mt-8 space-y-2">
                <p className=" text-sm">Price</p>
                <p className="text-3xl lg:text-4xl font-light tracking-tight">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-4 border-t border-white-800 pt-8">
                <p className=" text-sm uppercase tracking-wider">Description</p>
                <p className=" leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="mt-12 space-y-6 border-t border-white-800 pt-8">
              {/* Quantity Selector */}
              <div className="space-y-4">
                <p className=" text-sm uppercase tracking-wider">Quantity</p>
                <QuantitySelector
                  value={quantity}
                  onChange={(nextValue) => {
                    setQuantity(Math.max(1, nextValue));
                  }}
                  unitPrice={product.price}
                  className="gap-4"
                />
              </div>

              {/* Total Price */}
              <div className="space-y-2 border-t border-white-800 pt-6">
                <div className="flex justify-between items-center text-sm ">
                  <span>Subtotal:</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm ">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white-800">
                  <span className="text-base font-medium">Total:</span>
                  <span className="text-2xl font-light">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-6">
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-12 dark:bg-white light:text-black hover:light:text-black hover:bg-gray-700 font-medium text-base rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent border border-white-700  hover:bg-gray-100 hover:border-white-600 font-medium text-base rounded-lg transition-colors"
                >
                  Add to Wishlist
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4  border border-white-800 rounded-lg space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="">Delivery Time</span>
                  <span className="">3-5 Business Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="">Returns</span>
                  <span className="">30 Days Free Returns</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="">Warranty</span>
                  <span className="">1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {/* <div className="mt-16 border-t border-white-800 pt-12">
          <h2 className="text-2xl font-light mb-8">Specifications</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Material", value: "Premium Quality" },
              { label: "Weight", value: "Lightweight" },
              { label: "Dimensions", value: "Compact" },
              { label: "Color", value: "Black" },
              { label: "Certification", value: "Certified" },
              { label: "Care", value: "Easy Maintenance" },
            ].map((spec) => (
              <div key={spec.label} className="space-y-2">
                <p className="text-gray-500 text-sm uppercase tracking-wider">
                  {spec.label}
                </p>
                <p className="text-gray-300">{spec.value}</p>
              </div>
            ))}
          </div>
        </div> */}
      </main>
    </div>
  );
}