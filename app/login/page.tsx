"use client";

import { CardDescription } from "@/components/ui/card";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KakaoLoginButton } from "@/components/kakao-login-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleLoginButton } from "@/components/google-login-button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import Image from "next/image";
import { useCookies } from "react-cookie";
import userStore from "../store/userStore";
import errorStore from "../store/errorStore";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login, setUser, isLogged } = userStore();
  const { error, setError } = errorStore();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await login(userId, password);

    if (response.statusCode === 200) {
      router.push("/");
    } else {
      setError(response.response.data.message);
    }
  };

  if (isLogged) {
    router.push("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container max-w-xl">
          <Card>
            <CardHeader className="space-y-3 px-8 pt-8">
              <CardTitle className="text-3xl font-bold text-center">
                {showLoginForm ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-1/2 -translate-y-1/2 p-0 h-8 w-8"
                      onClick={() => setShowLoginForm(false)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span>아이디로 로그인</span>
                  </div>
                ) : (
                  "로그인"
                )}
              </CardTitle>
              <CardDescription className="text-center text-base">
                {showLoginForm
                  ? "아이디와 비밀번호를 입력해주세요."
                  : "PAWREST 서비스 이용을 위해 로그인해주세요."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {showLoginForm ? (
                // 아이디 로그인 폼
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="userId">아이디</Label>
                    <Input
                      id="userId"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>오류</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button className="w-full mt-6" type="submit">
                    로그인
                  </Button>
                </form>
              ) : (
                // 로그인 옵션 선택
                <div className="space-y-4">
                  <GoogleLoginButton />
                  <KakaoLoginButton />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowLoginForm(true)}
                  >
                    아이디로 로그인
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mt-2">
                아직 계정이 없으신가요?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  회원가입
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
