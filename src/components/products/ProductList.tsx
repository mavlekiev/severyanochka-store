"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadMoreButton from "../ui/LoadMoreButton";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [initialLimit, setInitialLimit] = useState(16);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateInitialLimit = () => {
      const width = window.innerWidth;
      let newLimit;
      if (width < 768) newLimit = 8;
      else if (width < 1440) newLimit = 12;
      else newLimit = 16;

      setInitialLimit((prev) => (prev !== newLimit ? newLimit : prev));
    };

    updateInitialLimit();
    window.addEventListener("resize", updateInitialLimit);
    return () => window.removeEventListener("resize", updateInitialLimit);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(initialLimit, 0);
        setProducts(data.products);
        setTotal(data.total);
        setSkip(data.products.length);
        setHasMore(data.products.length < data.total);
      } catch (err) {
        setError("Не удалось загрузить товары. Попробуйте обновить страницу.");
      } finally {
        setLoading(false);
      }
    };

    if (initialLimit > 0) {
      loadProducts();
    }
  }, [initialLimit]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const data = await getProducts(initialLimit, skip);
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + initialLimit);
      setHasMore(products.length + data.products.length < total);
    } catch (err) {
      setError("Не удалось загрузить дополнительные товары.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="text-black-100 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="border border-solid border-gray-200 rounded p-2 px-6 font-medium text-base leading-normal transition-all duration-300 ease-in-out hover:border-orange-100"
        >
          Обновить страницу
        </button>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center p-10">Загрузка...</div>
    );
  }

  return (
    <div className="mb-20">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 justify-items-center mb-6 sm:mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-[160px] sm:max-w-[224px] lg:max-w-[272px] max-sm:h-[337px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {hasMore && <LoadMoreButton onClick={loadMore} loading={loading} />}
    </div>
  );
}
