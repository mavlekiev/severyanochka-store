import { Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export async function getAllCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json() as Promise<Array<{ slug: string; name: string }>>;
}

export async function getProducts(
  limit: number,
  skip: number,
  categorySlug?: string,
  q?: string,
) {
  if (categorySlug) {
    const res = await fetch(
      `${BASE_URL}/products/category/${categorySlug}?limit=${limit}&skip=${skip}`,
    );
    if (!res.ok) throw new Error("Failed to fetch products by category");
    return res.json();
  }

  if (q) {
    const res = await fetch(
      `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,
    );
    if (!res.ok) throw new Error("Failed to search products");
    return res.json();
  }

  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getProductsByCategory(category: string, limit = 10) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function getAllDiscountedProducts(limit = 4) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit * 3}`);
  if (!res.ok) throw new Error("Failed to fetch discounted products");
  const data = await res.json();
  const discounted = data.products
    .filter((p: Product) => p.discountPercentage > 0)
    .slice(0, limit);
  return { products: discounted, total: discounted.length };
}
