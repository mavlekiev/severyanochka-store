"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "../ui/CartIcon";
import BoxIcon from "../ui/BoxIcon";
import HeartIcon from "../ui/HeartIcon";
import BurgerIcon from "../ui/BurgerIcon";

const styleForLink =
  "flex flex-col items-center gap-1 text-black-100 font-medium text-[10px] leading-[1.5] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer";

export default function MobileMenu() {
  return (
    <section className="sm:hidden bg-white-100 sticky z-50">
      <div className="container mx-auto px-4 py-[3px]">
        <div className="flex justify-center">
          <div className="flex gap-[23px]">
            <nav className="flex items-center gap-[23px]">
              <Link href="/favorites" className={styleForLink}>
                <BurgerIcon />
                Каталог
              </Link>
              <Link href="/favorites" className={styleForLink}>
                <HeartIcon />
                Избранное
              </Link>
              <Link href="/orders" className={styleForLink}>
                <BoxIcon />
                Заказы
              </Link>
              <Link href="/cart" className={`relative ${styleForLink}`}>
                <CartIcon />
                <div className="absolute -top-[5] -right-[-12] bg-orange-100 text-white-100 text-[10px] rounded-[40%] w-3 h-3 flex items-center justify-center">
                  1
                </div>
                Корзина
              </Link>
            </nav>
            <div className="p-[5px]">
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
    </section>
  );
}
