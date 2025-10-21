// import { fetchProducts, fetchCategories } from '@/lib/api';
// import ProductList from '@/components/features/ProductList';
// import CategoryFilter from '@/components/features/CategoryFilter';
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export const dynamic = "force-static"; // или 'auto' — по умолчанию

export default async function Home() {
  // Загружаем первые 20 товаров и список категорий параллельно
  // const [productsData, categoriesData] = await Promise.all([
  //   fetchProducts(16, 0),
  //   fetchCategories(),
  // ]);

  return (
   <main className="flex-100">
       <div className="container max-w-[1240px] mx-auto px-4">
      <nav className="flex items-center gap-4">
        <span>Главная</span>
        <ArrowRightIcon />
        <span className="text-grey-300">Поиск</span>
      </nav>
      <h1 className="font-bold text-2xl leading-relaxed">Поиск</h1>

      {/* Фильтрация по категориям */}
      {/* <CategoryFilter categories={categoriesData} /> */}

      {/* Список товаров с поддержкой "Загрузить ещё" */}
      {/* <ProductList
        initialProducts={productsData.products}
        total={productsData.total}
      /> */}
    </div>
   </main>
  );
}
