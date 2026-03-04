"use client";

import Link from "next/link";
import { Category } from "@/types/product";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";
import { Product } from "@/types/product";

function CarouselCat() {
  //1. Buat state untuk API response
  const [categoryList, setCategoryList] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  //2. Buat fetching function
  const fetchCategoryList = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories",
      );
      const data = await response.json();
      setCategoryList(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //3. Run fetching function di dalam useEffect (supaya berjalan saat page load)
  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (!api) return;

    //Fungsi untuk Handle Control Carausel shadCN
    const updateButtonStates = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateButtonStates();
    api.on("select", updateButtonStates);
    api.on("reInit", updateButtonStates);

    return () => {
      api.off("select", updateButtonStates);
      api.off("reInit", updateButtonStates);
    };
  }, [api]);
  /////////////////////////
  return (
    <section className="w-full  md:my-20 mx-4 md:mx-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Kategori Toko
          </h2>

          <p className="text-md  max-w-2xl mx-auto font-light">
            Temukan produk dengan harga terbaik dari koleksi kami
          </p>
        </div>

        {/* Categories Carousel */}

        {categoryList && categoryList.length > 0 && (
          <div className="w-full">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {categoryList.map((category: Category) => (
                  <CarouselItem
                    key={category.id}
                    className="pl-2 md:pl-4 md:basis-1/4"
                  >
                    <Link
                      href={`/product?categoryId=${category.id}`}
                      className="group relative block h-72 rounded-lg overflow-hidden cursor-pointer"
                    >
                      {/* Background Image */}
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {category.name}
                        </h3>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Header with Navigation Buttons */}
            <div className="flex justify-center items-center mb-6 gap-3 mt-5">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                className="relative w-10 h-10 rounded-full   disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center  transition-colors shadow-lg hover:shadow-xl"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                className="relative w-10 h-10 rounded-full  disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center  transition-colors shadow-lg hover:shadow-xl"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <p className="">Loading categories...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-12">
            <p className="text-red-500">Failed to load categories</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CarouselCat;