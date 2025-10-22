"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../ui/CartIcon";
import BoxIcon from "../ui/BoxIcon";
import HeartIcon from "../ui/HeartIcon";
import BurgerIcon from "../ui/BurgerIcon";
import Logo from "../ui/Logo";

export default function MobileMenu() {
  return (
    <section className="sm:hidden bg-white-100  sticky bottom-0 z-50">
      <div className="container max-w-[360px] mx-auto px-4 py-[6.5px]">
        <div className="flex items-center justify-between md:pr-6">
          <div className="flex items-center gap-[17px] md:gap-10">
            <nav className="flex items-center gap-4 md:gap-6">
              <Link
                href="/favorites"
                className="flex flex-col items-center gap-2 text-black-100 font-medium text-xs leading-[1.5] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer"
              >
                <BurgerIcon />
                Каталог
              </Link>
              <Link
                href="/favorites"
                className="flex flex-col items-center gap-2 text-black-100 font-medium text-xs leading-[1.5] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer"
              >
                <HeartIcon />
                Избранное
              </Link>
              <Link
                href="/orders"
                className="flex flex-col items-center gap-2 text-black-100 font-medium text-xs leading-[1.5] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer"
              >
                <BoxIcon />
                Заказы
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center gap-2 text-black-100 font-medium text-xs leading-[1.5] relative transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer"
              >
                <CartIcon />
                <span className="absolute -top-1 -right-[-16] bg-orange-100 text-white-100 text-[10px] rounded-[40%] w-3 h-3 flex items-center justify-center">
                  1
                </span>
                Корзина
              </Link>
            </nav>
            <div className="flex items-center gap-8 transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer">
              <div className="flex items-center gap-[10px]  p-1 md:p-0">
                <Image
                  className="rounded-full flex-shrink-0"
                  src="/avatar.jpg"
                  alt="avatar"
                  width={40}
                  height={40}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
