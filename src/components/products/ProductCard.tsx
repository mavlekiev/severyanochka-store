import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import HeartIcon from "../ui/HeartIcon";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }: { product: any }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="bg-white-100 shadow-card-shadow border-none rounded transition-all duration-300 ease-in-out hover:shadow-card-hover-shadow group cursor-pointer flex flex-col h-full w-full max-w-[160px] sm:max-w-[224px] lg:max-w-[272px] h-[337px] md:h-[349px] min-h-0 overflow-hidden">
        <div className="relative flex-shrink-0 w-full h-40">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 360px) 160px, (max-width: 768px) 224px, 272px"
            className="object-contain"
          />
          <div className="absolute top-2 right-2 p-1 bg-grey-100 rounded opacity-50">
            <HeartIcon />
          </div>
          {product.discountPercentage > 0 && (
            <div className="absolute bottom-[10px] left-[10px] bg-orange-100 text-white px-2 py-1 rounded font-medium text-base">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow p-2 gap-2 min-h-0">
          <div className="flex items-end justify-between flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-black-100 font-bold text-sm sm:text-lg leading-normal">
                {formatPrice(discountedPrice)}
              </span>
              <span className="font-medium text-[10px] sm:text-xs leading-normal text-grey-100">
                С картой
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-black-100 font-normal max-lg:font-medium text-[10px] sm:text-base">
                {formatPrice(product.price)}
              </span>
              <span className="font-medium text-[10px] sm:text-xs leading-normal text-grey-100">
                Обычная
              </span>
            </div>
          </div>

          <h3 className="font-medium text-[10px] leading-normal sm:text-base line-clamp-2 flex-grow min-h-0">
            {product.title}
          </h3>

          <div className="flex-shrink-0">
            <RatingStars rating={product.rating} />
          </div>

          <button className="w-full p-2 border border-green-100 text-green-100 font-medium text-base rounded transition-all duration-300 ease-in-out group-hover:bg-orange-100 group-hover:text-white-100 group-hover:border-none mt-auto flex-shrink-0">
            В корзину
          </button>
        </div>
      </div>
    </Link>
  );
}
