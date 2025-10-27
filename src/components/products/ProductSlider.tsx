"use client";

import { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { Product } from "@/types/product";

interface ProductSliderProps {
  products: Product[];
  title: string;
}

export default function ProductSlider({ products, title }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth =
        window.innerWidth > 1280 ? 280 : window.innerWidth > 768 ? 224 : 160;
      const scrollAmount = cardWidth * 2;
      const newScrollLeft =
        sliderRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold mb-6">{title}</h2>

      <div className="relative">
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[160px] sm:w-[224px] lg:w-[272px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border rounded transition-all duration-300 ease-in-out ${
              canScrollLeft
                ? "text-black-100 border-green-100 hover:bg-orange-100 hover:text-white hover:border-orange-100 cursor-pointer"
                : "text-gray-200 border-green-100 cursor-not-allowed"
            }`}
          >
            <ArrowLeftIcon />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border rounded transition-all duration-300 ease-in-out ${
              canScrollRight
                ? "text-black-100 border-green-100 hover:bg-orange-100 hover:text-white hover:border-orange-100 cursor-pointer"
                : "text-gray-200 border-green-100 cursor-not-allowed"
            }`}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
