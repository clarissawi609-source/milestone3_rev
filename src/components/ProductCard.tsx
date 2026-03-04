"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer">

        <Image
          src={product.images?.[0]}
          alt={product.title}
          width={300}
          height={200}
          className="rounded-lg"
        />

        <h2 className="font-semibold mt-3 text-lg">
          {product.title}
        </h2>

        <p className="text-gray-500">
          ${product.price}
        </p>

      </div>
    </Link>
  );
}