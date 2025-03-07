"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import userStore from "@/app/store/userStore";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Loading from "./loading";
import Image from "next/image";


export function Header() {
  const router = useRouter();
  const { isLogged, setIsLogged, logout, checkSession } = userStore();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await logout(); // 로그아웃 API 호출 
    setIsLogged(false); // 로그아웃 상태로 변경
  };

  const handleCheckSession = async () => {
    const response = await checkSession();
  };

  useEffect(() => {
    handleCheckSession(); // 세션 확인
  }, []); // 빈 의존성 배열을 주어 마운트 시에만 실행되도록 설정

  

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">

        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-green-600">PAWREST</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/lost-found" className="font-medium hover:text-green-600 py-2">
            실종동물 찾기
          </Link>
          <Link href="/community" className="font-medium hover:text-green-600 py-2">
            커뮤니티
          </Link>
          <Link href="petAllowed" className="font-medium hover:text-green-600 py-2">
            산책 지도
          </Link>
          <Link href="/shop" className="font-medium hover:text-green-600 py-2">
            물품 기부
          </Link>
          <Link href="/donation" className="font-medium hover:text-green-600 py-2">
            보호소 후원
          </Link>
          <Link href="/donor-list" className="font-medium hover:text-green-600 py-2">
            후원자 명단
          </Link>
          <Link href="/adoption" className="font-medium hover:text-green-600 py-2">
            입양신청
          </Link>
        </nav>
          <div className="flex items-center gap-3">
          {isLogged ? (
            <>
              <Link className="font-medium hover:text-green-600 py-2" href="/mypage">
              <Button className="w-full mt-3" variant="white">
                  프로필
                </Button>
              </Link>
              <Button
                className="w-full mt-3"
                onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link className="font-medium hover:text-green-600 py-2" href="/login">
                <Button className="w-full mt-3" variant="white">
                  로그인
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full mt-3">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
