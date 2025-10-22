"use client";

import Link from "next/link";
import Logo from "../ui/Logo";
import PhoneIcon from "../ui/PhoneIcon";
import InstagramIcon from "../ui/InstagramIcon";
import VkontakteIcon from "../ui/VkontakteIcon";
import FacebookIcon from "../ui/FacebookIcon";
import OkIcon from "../ui/OkIcon";

const styleForHover =
  "transition-all duration-300 ease-in-out hover:text-orange-100 group cursor-pointer";

const styleForIcon =
  "transition-all duration-300 ease-in-out hover:scale-110 group cursor-pointer";

export default function Footer() {
  return (
    <footer className="bg-beige-100">
      <div className="container max-w-[1248px] mx-auto px-4 py-8 md:py-6">
        <div className="flex flex-row justify-between items-start md:items-center gap-6">
        
             <Link className={`flex items-start ${styleForHover}`} href="/">
            <Logo />
          </Link>
      
         

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className={styleForHover}>
              О компании
            </Link>
            <Link href="/contacts" className={styleForHover}>
              Контакты
            </Link>
            <Link href="/vacancies" className={styleForHover}>
              Вакансии
            </Link>
            <Link href="/articles" className={styleForHover}>
              Статьи
            </Link>
            <Link href="/privacy" className={styleForHover}>
              Политика обработки персональных данных
            </Link>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-10">
            <div className="flex gap-4">
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
              className={`flex flex-nowrap flex-row items-center gap-2 text-nowrap font-medium text-base leading-snug ${styleForHover}`}
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
