"use client";

import { Montserrat, Inter, Rubik } from "next/font/google";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";

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
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
            <MobileMenu />
          </div>
        </body>
      </html>
    </>
  );
}
