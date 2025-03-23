import api from "@/app/utils/api";
import AuthButton from "./authButton";
import UserButton from "./userButton";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Button } from "./ui/button";

// 공통 버튼 스타일 상수 정의
const BUTTON_STYLES = "w-[100px] h-[40px] mt-3";

function LoadingButtons() {
    return (
        <div className="flex items-center gap-3 min-w-[216px] h-[48px]">
            <Button className={BUTTON_STYLES} variant="white" disabled>
                <div className="animate-pulse bg-gray-200 h-4 w-full"></div>
            </Button>
            <Button className={BUTTON_STYLES} disabled>
                <div className="animate-pulse bg-gray-200 h-4 w-full"></div>
            </Button>
        </div>
    );
}

async function checkSession() {
    try {
        const response = await api.get("/auth/session", {
            headers: {
                Cookie: cookies().toString(),
            },
        });
        return response;
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.log(error.response)
            return null;
        }
    }
}

async function SessionCheck() {
    const session = await checkSession();
    return (
        <div className="flex items-center gap-3 min-w-[216px] h-[48px]">
            {session ? <AuthButton /> : <UserButton />}
        </div>
    );
}

export default function AuthButtonGroup() {
    return (
        <div className="flex items-center gap-3">
            <Suspense fallback={<LoadingButtons />}>
                <SessionCheck />
            </Suspense>
        </div>
    );
}