"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import api from "@/app/utils/api";

export default function AuthButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                console.log("로그아웃 성공");
                localStorage.removeItem("user");
                router.push('/'); // 홈페이지로 리다이렉트
                router.refresh(); // 페이지 새로고침하여 상태 업데이트
            }
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <Link href="/mypage">
                <Button className="w-[100px] h-[40px] mt-3" variant="white"> 
                    프로필
                </Button>
            </Link>
            <Button className="w-[100px] h-[40px] mt-3" onClick={handleLogout}>
                로그아웃
            </Button>
        </div>
    );
}