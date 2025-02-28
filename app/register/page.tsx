"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.userId) newErrors.userId = "아이디를 입력해주세요."
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요."
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    if (!formData.email) newErrors.email = "이메일을 입력해주세요."
    if (!formData.name) newErrors.name = "이름을 입력해주세요."
    if (!isIdAvailable) newErrors.userId = "아이디 중복확인이 필요합니다."
    if (!isEmailVerified) newErrors.email = "이메일 인증이 필요합니다."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("회원가입 시도:", formData)
    }
  }

  const checkIdAvailability = async () => {
    const isAvailable = Math.random() < 0.5
    setIsIdAvailable(isAvailable)
    if (!isAvailable) {
      setErrors((prev) => ({ ...prev, userId: "이미 사용 중인 아이디입니다." }))
    } else {
      setErrors((prev) => ({ ...prev, userId: "" }))
    }
  }

  const sendVerificationEmail = async () => {
    console.log("인증 이메일 발송:", formData.email)
  }

  const verifyEmail = async () => {
    const isVerified = verificationCode === "123456"
    setIsEmailVerified(isVerified)
    if (!isVerified) {
      setErrors((prev) => ({ ...prev, email: "인증번호가 일치하지 않습니다." }))
    } else {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  return (
    <div className="container max-w-md my-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">회원가입</CardTitle>
          <CardDescription className="text-center">PAWREST 서비스 이용을 위해 회원가입해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">아이디</Label>
              <div className="flex gap-2">
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
                <Button type="button" onClick={checkIdAvailability}>
                  중복확인
                </Button>
              </div>
              {isIdAvailable === true && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 사용 가능한 아이디입니다.
                </p>
              )}
              {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Button type="button" onClick={sendVerificationEmail} disabled={isEmailVerified}>
                  인증하기
                </Button>
              </div>
              {!isEmailVerified && (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    placeholder="인증번호 입력"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button type="button" onClick={verifyEmail}>
                    확인
                  </Button>
                </div>
              )}
              {isEmailVerified && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 이메일이 인증되었습니다.
                </p>
              )}
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <Button className="w-full" type="submit">
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

