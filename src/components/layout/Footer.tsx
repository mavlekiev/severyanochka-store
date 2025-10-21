"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-beige-100">
      <div className="container container max-w-[1248px] mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Ссылки */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            <Link href="/about" className="hover:text-red-600">О компании</Link>
            <Link href="/contacts" className="hover:text-red-600">Контакты</Link>
            <Link href="/vacancies" className="hover:text-red-600">Вакансии</Link>
            <Link href="/articles" className="hover:text-red-600">Статьи</Link>
            <Link href="/privacy" className="hover:text-red-600">Политика обработки персональных данных</Link>
          </div>

          {/* СОЦСЕТИ */}

          {/* Телефон */}
          <div className="text-lg font-bold text-red-600 whitespace-nowrap">
            8 800 777 33 33
          </div>
        </div>

        {/* Мелкий текст (если нужно) */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Северяночка. Все права защищены.
        </div>
      </div>
    </footer>
  );
}