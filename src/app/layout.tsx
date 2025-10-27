"use client";

import { Montserrat, Inter, Rubik } from "next/font/google";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-inter",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

const GlobalFallback = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-grow flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Что-то пошло не так
        </h2>

        <p className="text-gray-600 mb-6">
          Произошла критическая ошибка в приложении. Пожалуйста, обновите
          страницу.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-100 text-white rounded-lg hover:bg-orange-200 transition-colors font-medium"
          >
            Обновить страницу
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <html
        lang="ru"
        className={`${montserrat.variable} ${inter.variable} ${rubik.variable}`}
      >
        <body className="font-sans">
          <ErrorBoundary fallback={<GlobalFallback />}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <ErrorBoundary>
                <main className="flex-grow">{children}</main>
              </ErrorBoundary>
              <Footer />
              <MobileMenu />
            </div>
          </ErrorBoundary>
        </body>
      </html>
    </>
  );
}
