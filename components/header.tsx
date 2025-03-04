    "use client"

    import Link from "next/link";
    import { Button } from "./ui/button";
    import { cookies } from 'next/headers'
    import { useEffect } from "react";
    import { useCookies } from "react-cookie";



    export function Header() {

        
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
                <Link href="/adoption" className="font-medium hover:text-green-600 py-2">
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