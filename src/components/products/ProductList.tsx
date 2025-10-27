"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadMoreButton from "../ui/LoadMoreButton";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import SearchWithSuggestions from "./SearchWithSuggestions";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [initialLimit, setInitialLimit] = useState(16);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);

  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;
      setInitialLimit(w < 768 ? 8 : w < 1440 ? 12 : 16);
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    if (initialLimit <= 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (selectedCategorySlug) {
          data = await getProducts(initialLimit, 0, selectedCategorySlug);
        } else {
          data = await getProducts(initialLimit, 0, searchQuery || undefined);
        }
        setProducts(data.products);
        setTotal(data.total || data.products.length);
        setSkip(data.products.length);
        setHasMore(data.products.length < (data.total || data.products.length));
      } catch {
        setError("Не удалось загрузить товары.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [initialLimit, searchQuery, selectedCategorySlug]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let data;
      if (selectedCategorySlug) {
        data = await getProducts(initialLimit, skip, selectedCategorySlug);
      } else {
        data = await getProducts(initialLimit, skip, searchQuery || undefined);
      }
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + initialLimit);
      setHasMore(products.length + data.products.length < total);
    } catch {
      setError("Не удалось загрузить дополнительные товары.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrCategory = (queryOrSlug: string) => {
    const isSlug = /^[a-z0-9-]+$/.test(queryOrSlug);

    if (isSlug) {
      setSelectedCategorySlug(queryOrSlug);
      setSearchQuery("");
    } else {
      setSearchQuery(queryOrSlug);
      setSelectedCategorySlug(null);
    }
  };

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
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

  return (
    <div className="mb-20 w-full">
      <SearchWithSuggestions
        onSearch={handleSearchOrCategory}
        initialQuery={searchQuery}
      />

      {(searchQuery || selectedCategorySlug) && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategorySlug(null);
            }}
            className="mb-4 text-sm self-end transition-all duration-300 ease-in-out hover:text-orange-100"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {loading && products.length === 0 ? (
        <div className="flex items-center justify-center p-10">Загрузка...</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
