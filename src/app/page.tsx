import ProductList from "@/components/products/ProductList";
import Breadcrumbs from "@/components/products/Breadcrumbs";

export default async function Home() {
  return (
    <div className="container max-w-[1240px] mx-auto px-4 max-lg:px-[14px] max-sm:px-4">
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Поиск" }]}
      />

      <h1 className="font-bold text-xl leading-normal md:text-[24px] mb-4 lg:mb-6">
        Поиск
      </h1>
      <ProductList />
    </div>
  );
}
