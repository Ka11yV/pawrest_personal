"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 임시 사용자 데이터
const userData = {
  userId: "user123",
  name: "홍길동",
  email: "user123@example.com",
  phone: "010-1234-5678",
  address: "서울시 강남구 테헤란로 123",
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState(userData)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedInfo((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!editedInfo.name) newErrors.name = "이름을 입력해주세요."
    if (!editedInfo.email) newErrors.email = "이메일을 입력해주세요."
    if (!editedInfo.phone) newErrors.phone = "전화번호를 입력해주세요."
    if (!editedInfo.address) newErrors.address = "주소를 입력해주세요."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // 여기에 실제 정보 업데이트 로직을 구현합니다.
      setUserInfo(editedInfo)
      setIsEditing(false)
      console.log("정보 업데이트:", editedInfo)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">마이페이지</CardTitle>
              <CardDescription>회원 정보를 확인하고 수정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">프로필 정보</TabsTrigger>
                  <TabsTrigger value="activities">활동 내역</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="userId">아이디</Label>
                      <Input id="userId" name="userId" value={userInfo.userId} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        name="name"
                        value={isEditing ? editedInfo.name : userInfo.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={isEditing ? editedInfo.email : userInfo.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={isEditing ? editedInfo.phone : userInfo.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">주소</Label>
                      <Input
                        id="address"
                        name="address"
                        value={isEditing ? editedInfo.address : userInfo.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    {isEditing ? (
                      <div className="flex justify-end space-x-2">
                        <Button type="submit">저장</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          취소
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Button type="button" onClick={() => setIsEditing(true)}>
                          정보 수정
                        </Button>
                      </div>
                    )}
                  </form>
                </TabsContent>
                <TabsContent value="activities">
                  <div className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">최근 활동</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>실종동물 등록</span>
                        <span className="text-sm text-muted-foreground">2025-02-28</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>입양 신청</span>
                        <span className="text-sm text-muted-foreground">2025-02-25</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>커뮤니티 게시글 작성</span>
                        <span className="text-sm text-muted-foreground">2025-02-20</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-slate-800 text-slate-200 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">유기동물보호센터</h3>
              <p className="text-sm text-slate-400">
                유기동물 보호와 입양을 위한 공식 웹사이트입니다. 모든 생명은 소중합니다.
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
                <p>서울특별시 강남구 테헤란로 123</p>
                <p>유기동물보호센터 빌딩 5층</p>
                <p>전화: 02-123-4567</p>
                <p>이메일: info@animalshelter.kr</p>
              </address>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} 유기동물보호센터. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

