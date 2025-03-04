"use client"

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Grid2X2 } from "lucide-react";
import "./globals.css";
import { Header } from "@/components/header"
import { CookiesProvider } from 'react-cookie';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
    </CookiesProvider>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200 py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">PAWREST</h3>
            <p className="text-sm text-slate-400">
              유기동물 보호와 입양을 위한 공식 웹사이트입니다. 모든 생명은
              소중합니다.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/animals" className="hover:text-white">
                  동물들목록
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/lost-found" className="hover:text-white">
                  실종동물 찾기
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">고객지원</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/faq" className="hover:text-white">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">연락처</h3>
            <address className="text-sm text-slate-400 not-italic">
              <p>전화: 010-8370-1347</p>
              <p>이메일: pawrest2025@gmail.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} PAWREST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
