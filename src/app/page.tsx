import ProductList from "@/components/products/ProductList";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

export default async function Home() {
  return (
    <div className="container max-w-[1240px] mx-auto px-4">
      <nav className="flex items-center gap-4">
        <span>Главная</span>
        <ArrowRightIcon />
        <span className="text-grey-300">Поиск</span>
      </nav>
      <h1 className="font-bold text-2xl leading-relaxed">Поиск</h1>
      <ProductList />
    </div>
  );
}
