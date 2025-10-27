"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCategories, getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import SearchIcon from "../ui/SearchIcon";

const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="text-green-100">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};

export default function SearchWithSuggestions({
  onSearch,
  initialQuery = "",
}: {
  onSearch: (query: string) => void;
  initialQuery?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<
    {
      type: "category" | "product";
      value: string;
      category?: { slug: string; name: string };
      id?: number;
    }[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);
  const [categories, setCategories] = useState<
    Array<{ slug: string; name: string }>
  >([]);
  const [productsCache, setProductsCache] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch {
        setError("Не удалось загрузить категории:");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(200, 0);
        setProductsCache(data.products);
      } catch {
        setError("Не удалось загрузить товары для подсказок");
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();

    const catMatches = categories
      .filter((cat) => cat.name.toLowerCase().includes(q))
      .map((cat) => ({
        type: "category" as const,
        value: cat.name,
        category: cat,
      }));

    const prodMatches = productsCache
      .filter((p) => p.title.toLowerCase().includes(q))
      .map((p) => ({ type: "product" as const, value: p.title, id: p.id }))
      .slice(0, 3);

    const all = [...catMatches, ...prodMatches].slice(0, 4);
    setSuggestions(all);
  }, [query, categories, productsCache]);

  const handleSelect = (item: {
    type: "category" | "product";
    value: string;
    category?: { slug: string; name: string };
    id?: number;
  }) => {
    if (item.type === "product" && item.id) {
      router.push(`/products/${item.id}`);
    } else if (item.type === "category" && item.category) {
      onSearch(item.category.slug);
    }
    setQuery("");
    setIsFocused(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (error) {
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
    <div
      ref={containerRef}
      className={`w-full max-w-[1240px] border-green-100 rounded border  transition-all duration-300 ease-in-out hover:shadow-search-shadow ${
        isFocused ? "border-green-100 shadow-search-shadow" : "border-gray-300"
      } mb-6 sm:mb-12`}
      onClick={() => setIsFocused(true)}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Найти товар"
          className="w-full px-4 py-2 rounded focus:outline-none focus:ring-0 focus:shadow-none"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <SearchIcon />
        </div>
      </div>

      {isFocused && suggestions.length > 0 && (
        <div className="">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 break-words"
            >
              <HighlightMatch text={item.value} query={query} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
