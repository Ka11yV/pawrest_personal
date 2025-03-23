"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserButton() {
    return (
        <div className="flex items-center gap-3">
            <Link href="/login">
                <Button className="w-[100px] h-[40px] mt-3" variant="white">
                    로그인
                </Button>
            </Link>
            <Link href="/register">
                <Button className="w-[100px] h-[40px] mt-3">
                    회원가입
                </Button>
            </Link>
        </div>
    );
}