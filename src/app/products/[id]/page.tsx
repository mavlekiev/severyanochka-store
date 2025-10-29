import { getProducts, getProductById, getAllCategories } from "@/lib/api";
import Link from "next/link";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import RatingStars from "@/components/products/RatingStars";
import { formatPrice } from "@/utils/formatPrice";
import ReviewFormSection from "@/components/products/ReviewFormSection";
import { Product, Review } from "@/types/product";
import HeartIcon from "@/components/ui/HeartIcon";
import InfoIcon from "@/components/ui/InfoIcon";
import HalfCircleIcon from "@/components/ui/HalfCyrcleIcon";
import BellIcon from "@/components/ui/BellIcon";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import BasketIcon from "@/components/ui/BasketIcon";
import UserIcon from "@/components/ui/UserIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import ProductSlider from "@/components/products/ProductSlider";
import ShareButton from "@/components/ui/ShareButton";

const HOVER = "transition-all duration-300 ease-in-out hover:text-orange-100";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(params.id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const categories = await getAllCategories();
  const categoryObj = categories.find(
    (c: { slug: string }) => c.slug === product.category,
  );

  const sameCategoryData = await getProducts(20, 0, product.category);
  const relatedProducts = sameCategoryData.products
    .filter((p: Product) => p.id !== product.id)
    .slice(0, 12);

  const allProductsData = await getProducts(50, 0);
  const discountedProducts = allProductsData.products
    .filter((p: Product) => p.discountPercentage > 0 && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    {
      label: categoryObj?.name || product.category,
      href: `/catalog/${product.category}`,
    },
    { label: product.title },
  ];

  const ratingStats = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count:
      product.reviews?.filter((r: { rating: number }) => r.rating === star)
        .length || 0,
  }));

  return (
    <div className="container max-w-[1240px] mx-auto px-4 max-lg:px-[14px] max-sm:px-4">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-5 py-2">
        <span className="font-medium text-[10px] md:text-xs leading-[1.5]">
          apт.{product.sku}
        </span>
        <div className="flex gap-2">
          <RatingStars rating={product.rating} />
          <span
            className={`font-medium text-xs leading-[1.5] border-b border-gray-100 ${HOVER} cursor-pointer`}
          >
            {product.reviews.length} отзыва
          </span>
        </div>
        <ShareButton />
        {/* <button
          className={`flex items-center gap-2 font-medium text-[10px] md:text-xs leading-[1.5] ${HOVER}`}
        >
          <ShareIcon />
          Поделиться
        </button> */}
        <button
          className={`flex items-center gap-2 font-medium text-[10px] md:text-xs leading-[1.5] ${HOVER}`}
        >
          <HeartIcon />В избранное
        </button>
      </div>

      <div className="flex flex-wrap justify-between gap-4 lg:gap-12 lg:flex-row mb-14">
        <ProductImageGallery
          images={product.images || []}
          thumbnail={product.thumbnail}
          title={product.title}
          discountPercentage={product.discountPercentage}
        />

        <div className="w-[100%] md:w-[46.4%] lg:w-[35%]">
          <div className="mb-3.5">
            {product.discountPercentage > 0 ? (
              <div className="flex justify-between flex-shrink-0">
                <div className="flex flex-col gap-3 justify-end">
                  <span className="text-black-100 font-normal md:font-medium text-xl lg:text-2xl md:text-[18px] leading-[1.5]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-medium text-[10px] sm:text-xs leading-normal text-grey-100">
                    Обычная цена
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-black-100 font-bold lg:text-4xl text-2xl leading-normal">
                    {formatPrice(discountedPrice)}
                  </span>
                  <div
                    className={`flex items-center gap-2 ${HOVER} cursor-pointer`}
                  >
                    <span className="font-medium text-[10px] sm:text-xs leading-normal text-grey-100">
                      С картой Ceверяночки
                    </span>
                    <InfoIcon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-600 text-xl font-bold">
                {formatPrice(product.price)}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 mb-8">
            <button className="flex items-center justify-between w-full max-md:max-w-[360px] bg-orange-100 text-white-100 px-1 md:px-4 py-2 md:py-4 rounded mb-1">
              <BasketIcon />
              <span className="text-base md:text-2xl mr-[30%] max-sm:mr-[35%]">
                В корзину
              </span>
            </button>
            <div className="flex items-center justify-center gap-2 mb-1 py-1 text-[10px] md:text-xs text-green-100">
              <HalfCircleIcon />
              Вы получаете 10 бонусов
            </div>
            <button
              className={`flex gap-2 items-center text-[10px] md:text-xs ${HOVER}`}
            >
              <BellIcon />
              Уведомить о снижении цены
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex px-2 py-1 bg-gray-100">
              <div className="flex w-[60%] text-[10px] md:text-xs">Бренд</div>
              <div className="flex items-center font-bold text-[10px] md:text-xs">
                {product.brand}
              </div>
            </div>
            <div className="flex px-2 py-1">
              <div className="flex w-[60%] text-[10px] md:text-xs">
                Страна производителя
              </div>
              <div className="flex items-center font-bold text-[10px] md:text-xs">
                Россия
              </div>
            </div>
            <div className="flex px-2 py-1 bg-gray-100">
              <div className="flex w-[60%] text-[10px] md:text-xs">
                Упаковка
              </div>
              <div className="flex items-center font-bold text-[10px] md:text-xs">
                {product.weight} г
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductSlider
          products={relatedProducts}
          title="С этим товаром покупают"
        />
      )}

      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Отзывы</h2>

        <div className="flex flex-wrap gap-20">
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <RatingStars rating={product.rating} />
              <span className="text-lg">{product.rating.toFixed(1)} из 5</span>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              {ratingStats.map(({ star, count }, index) => (
                <div key={star} className="flex items-center gap-6">
                  <span className="text-sm"> {5 - index}</span>
                  <RatingStars rating={star} />
                  <span className="text-sm">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {product.reviews?.map((review: Review, index: number) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-[10px] border border-solid border-gray-300 rounded-full">
                    <UserIcon />
                  </div>
                  <span className="font-medium">{review.reviewerName}</span>
                </div>
                <div className="flex gap-4">
                  <RatingStars rating={review.rating} />
                  <div className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString("ru-RU")}
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))}
            <ReviewFormSection />
          </div>
        </div>
      </div>

      {discountedProducts.length > 0 && (
        <div className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold">Акции</h2>
            <Link
              href="/promotions"
              className={`flex gap-2 text-base ${HOVER}`}
            >
              Все акции
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountedProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
