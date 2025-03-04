import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Grid2X2 } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PAWREST - 모든 생명은 소중합니다",
  description:
    "유기동물 보호와 입양을 위한 공식 웹사이트입니다. 실종동물 찾기, 입양 정보, 보호소 기부 등 다양한 서비스를 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-green-600">PAWREST</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/lost-found"
            className="font-medium hover:text-green-600 py-2"
          >
            실종동물 찾기
          </Link>
          <Link
            href="/community"
            className="font-medium hover:text-green-600 py-2"
          >
            커뮤니티
          </Link>
          <Link
            href="petAllowed"
            className="font-medium hover:text-green-600 py-2"
          >
            산책 지도
          </Link>
          <Link href="/shop" className="font-medium hover:text-green-600 py-2">
            물품 기부
          </Link>
          <Link
            href="/donation"
            className="font-medium hover:text-green-600 py-2"
          >
            보호소 후원
          </Link>
          <Link
            href="/donor-list"
            className="font-medium hover:text-green-600 py-2"
          >
            후원자 명단
          </Link>
          <Link href="/adopt" className="font-medium hover:text-green-600 py-2">
            입양신청
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button className="w-full mt-3" variant="white">
              로그인
            </Button>
          </Link>
          <Link href="/register">
            <Button className="w-full mt-3">회원가입</Button>
          </Link>
        </div>
      </div>
    </header>
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
