"use client";

import Link from "next/link";
import Logo from "../ui/Logo";
import PhoneIcon from "../ui/PhoneIcon";
import InstagramIcon from "../ui/InstagramIcon";
import VkontakteIcon from "../ui/VkontakteIcon";
import FacebookIcon from "../ui/FacebookIcon";
import OkIcon from "../ui/OkIcon";
import LogoForFooter from "../ui/LogoForFooter";

const styleForHover =
  "transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer";

const styleForIcon =
  "transition-all duration-300 ease-in-out hover:scale-110 group cursor-pointer";

export default function Footer() {
  return (
    <footer className="bg-beige-100">
      <div className="container max-w-[1440px] mx-auto pl-[105px] pr-[53px] py-6 max-lg:px-4 max-lg:py-8 max-md:px-[28px] max-md:py-[32px]">
        <div className="flex flex-row max-md:flex-col flex-wrap xl:justify-between max-xl:justify-center max-lg:justify-between gap-4 max-lg:gap-5 max-md:gap-2 sm:items-center max-sm:items-start max-md:gap-6">
          <div className="md:hidden flex items-center gap-[59px]">
            <Link className={`${styleForHover}`} href="/">
              <LogoForFooter />
            </Link>

            <a
              href="tel:88007773333"
              className={`flex flex-nowrap flex-row items-center gap-2 text-nowrap font-medium text-base leading-snug ${styleForHover}`}
            >
              <PhoneIcon />
              <span>8 800 777 33 33</span>
            </a>
          </div>
          <div className="flex items-center max-lg:items-start gap-10">
            <Link className={`max-md:hidden ${styleForHover}`} href="/">
              <LogoForFooter />
            </Link>

            <div className="flex flex-wrap items-center max-lg:max-w-[400px] max-sm:max-w-[320px] font-medium text-[12px] max-sm:text-[10px] leading-[1.5] lg:gap-10 md:gap-x-4 md:gap-y-2 gap-x-4 gap-y-2 max-sm:gap-4 md:items-center">
              <a href="/about" className={styleForHover}>
                О компании
              </a>
              <a href="/contacts" className={styleForHover}>
                Контакты
              </a>
              <a href="/vacancies" className={`max-lg:mr-28 max-md:mr-0 ${styleForHover}`}>
                Вакансии
              </a>
              <a href="/articles" className={styleForHover}>
                Статьи
              </a>
              <a href="/privacy" className={`${styleForHover}`}>
                Политика обработки персональных данных
              </a>
            </div>
          </div>

          <div className="flex max-lg:items-end max-lg:flex-col-reverse gap-10 max-lg:gap-2">
            <div className="flex gap-4 max-lg:gap-2 max-sm:gap-4">
              <Link
                className={styleForIcon}
                href="https://www.instagram.com"
                target="_blank"
              >
                <InstagramIcon />
              </Link>
              <Link
                className={styleForIcon}
                href="https://www.vk.com"
                target="_blank"
              >
                <VkontakteIcon />
              </Link>
              <Link
                className={styleForIcon}
                href="https://www.facebook.com"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
              <Link
                className={styleForIcon}
                href="https://www.ok.ru"
                target="_blank"
              >
                <OkIcon />
              </Link>
            </div>

            <a
              href="tel:88007773333"
              className={`max-md:hidden flex flex-nowrap flex-row items-center gap-2 text-nowrap font-medium text-base leading-snug ${styleForHover}`}
            >
              <PhoneIcon />
              <span>8 800 777 33 33</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
