"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowDownIcon from "../ui/ArrowDownIcon";
import CartIcon from "../ui/CartIcon";
import BoxIcon from "../ui/BoxIcon";
import HeartIcon from "../ui/HeartIcon";
import BurgerIcon from "../ui/BurgerIcon";
import Logo from "../ui/Logo";

const styleForLink = "flex flex-col items-center gap-2 text-black-100 font-medium text-xs leading-[1.5] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer";

export default function Header() {
  return (
    <header className="bg-white-100  sticky top-0 z-50 shadow-custom-shadow">
      <div className="container max-w-[1248px] mx-auto px-4 py-2 sm:px-5 sm:py-[11px] lg:pr-[44px]">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center justify-between max-lg:gap-5 gap-10">
            <Link
              className="transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer"
              href="/"
            >
              <Logo />
            </Link>
            <Link
              className="flex gap-2 items-center bg-green-100 rounded px-3 py-2 w-[123px] h-[40px] text-white-100 transition-all duration-300 ease-in-out hover:bg-orange-100"
              href="/catalog"
            >
              <BurgerIcon />
              Каталог
            </Link>
          </div>

          <div className="hidden sm:flex items-center max-lg:gap-4 lg:gap-[35px]">
            <nav className="flex items-center max-lg:gap-4 lg:gap-6">
              <Link
                href="/favorites"
                className={styleForLink}
              >
                <HeartIcon />
                Избранное
              </Link>
              <Link
                href="/orders"
                className={styleForLink}
              >
                <BoxIcon />
                Заказы
              </Link>
              <Link
                href="/cart"
                className={styleForLink}
              >
                <CartIcon />
                <span className="absolute -top-1 -right-[-16] bg-orange-100 text-white-100 text-[10px] rounded-[40%] w-3 h-3 flex items-center justify-center">
                  1
                </span>
                Корзина
              </Link>
            </nav>
            <div className="hidden sm:flex items-center gap-[26px] transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer">
              <div className="flex items-center gap-[10px]  p-[5px]">
                <Image
                  className="rounded-full"
                  src="/avatar.jpg"
                  alt="avatar"
                  width={40}
                  height={40}
                  priority
                />
                <span className="max-lg:hidden text-base font-medium leading-normal">
                  Алексей
                </span>
              </div>
              <div className="max-lg:hidden">
                <ArrowDownIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
