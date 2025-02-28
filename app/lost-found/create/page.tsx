"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, MapPin, Calendar, AlertCircle } from "lucide-react"

export default function CreateLostFoundPage() {
  const router = useRouter()
  const [postType, setPostType] = useState<"lost" | "found">("lost")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 여기서 실제 데이터 제출 로직이 들어갈 것입니다
    // API 호출 등을 수행한 후 성공 시 리다이렉트

    setTimeout(() => {
      setLoading(false)
      router.push("/lost-found")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Links */}
      <div className="w-full bg-white border-b">
        <div className="container flex justify-between items-center py-1 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary flex items-center gap-1">
              동물보호법안내 <span className="text-[10px]">↗</span>
            </Link>
            <Link href="#" className="hover:text-primary flex items-center gap-1">
              동물사랑시민 <span className="text-[10px]">↗</span>
            </Link>
            <Link href="#" className="hover:text-primary flex items-center gap-1">
              관리시스템(시군구, 대형업체) <span className="text-[10px]">↗</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-primary">
              로그인
            </Link>
            <Link href="/register" className="hover:text-primary">
              회원가입
            </Link>
            <Link href="/mypage" className="hover:text-primary">
              마이페이지
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white border-b sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/placeholder.png"
              alt="로고"
              width={40}
              height={40}
              className="text-green-600"
            />
            <span className="font-bold text-xl text-green-600">유기동물보호센터</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Link href="/animals" className="font-medium hover:text-green-600 py-2">
                동물들목록
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-40">
                <Link href="/animals/dogs" className="block px-4 py-2 hover:bg-muted rounded-sm">
                  강아지
                </Link>
                <Link href="/animals/cats" className="block px-4 py-2 hover:bg-muted rounded-sm">
                  고양이
                </Link>
                <Link href="/animals/others" className="block px-4 py-2 hover:bg-muted rounded-sm">
                  기타동물
                </Link>
              </div>
            </div>
            <Link href="/community" className="font-medium hover:text-green-600 py-2">
              커뮤니티
            </Link>
            <Link href="/lost-found" className="font-medium text-green-600 border-b-2 border-green-600 py-2">
              실종동물 찾기
            </Link>
            <Link href="/information" className="font-medium hover:text-green-600 py-2">
              정보제공
            </Link>
            <Link href="/adoption-guide" className="font-medium hover:text-green-600 py-2">
              입양자관리
            </Link>
            <Link href="/donation" className="font-medium hover:text-green-600 py-2">
              보호소 기부
            </Link>
            <Link href="/adoption-stories" className="font-medium hover:text-green-600 py-2">
              입양관리
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50 py-8">
        <div className="container max-w-4xl">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">실종/발견 동물 등록</h1>
              <p className="text-muted-foreground">잃어버린 반려동물이나 발견한 동물에 대한 정보를 등록해주세요.</p>
            </div>
            <Link href="/lost-found">
              <Button variant="outline">목록으로 돌아가기</Button>
            </Link>
          </div>

          {/* Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <Tabs
                defaultValue="lost"
                className="mb-6"
                onValueChange={(value) => setPostType(value as "lost" | "found")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="lost" className="text-base py-3">
                    실종된 동물 등록
                  </TabsTrigger>
                  <TabsTrigger value="found" className="text-base py-3">
                    발견한 동물 등록
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">기본 정보</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">제목</Label>
                      <Input
                        id="title"
                        placeholder={postType === "lost" ? "잃어버린 동물에 대한 제목" : "발견한 동물에 대한 제목"}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="species">동물 종류</Label>
                      <Select defaultValue="dog">
                        <SelectTrigger id="species">
                          <SelectValue placeholder="동물 종류 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">개</SelectItem>
                          <SelectItem value="cat">고양이</SelectItem>
                          <SelectItem value="rabbit">토끼</SelectItem>
                          <SelectItem value="bird">새</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="breed">품종</Label>
                      <Input id="breed" placeholder="품종을 입력하세요" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">성별</Label>
                      <Select defaultValue="unknown">
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="성별 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">수컷</SelectItem>
                          <SelectItem value="female">암컷</SelectItem>
                          <SelectItem value="unknown">미상</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">나이</Label>
                      <Input id="age" placeholder="나이를 입력하세요 (추정 가능)" />
                    </div>
                  </div>
                </div>

                {/* 위치 및 시간 정보 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{postType === "lost" ? "실종 정보" : "발견 정보"}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">{postType === "lost" ? "실종 장소" : "발견 장소"}</Label>
                      <Input id="location" placeholder="상세 주소를 입력하세요" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">{postType === "lost" ? "실종 날짜" : "발견 날짜"}</Label>
                      <Input id="date" type="date" required />
                    </div>
                  </div>

                  {postType === "lost" && (
                    <div className="space-y-2">
                      <Label htmlFor="reward">사례금 (선택사항)</Label>
                      <Input id="reward" placeholder="사례금 금액을 입력하세요" />
                    </div>
                  )}
                </div>

                {/* 상세 정보 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">상세 정보</h2>

                  <div className="space-y-2">
                    <Label htmlFor="description">상세 설명</Label>
                    <Textarea
                      id="description"
                      placeholder={
                        postType === "lost"
                          ? "잃어버린 동물의 특징, 상황 등을 자세히 설명해주세요."
                          : "발견한 동물의 특징, 상황 등을 자세히 설명해주세요."
                      }
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">연락처</Label>
                    <Input id="contact" placeholder="연락 가능한 전화번호를 입력하세요" required />
                    <p className="text-xs text-muted-foreground mt-1">* 개인정보 보호를 위해 일부만 공개됩니다.</p>
                  </div>
                </div>

                {/* 이미지 업로드 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">이미지 업로드</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="image">동물 사진</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                          required
                        />
                        <Label
                          htmlFor="image"
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm font-medium">클릭하여 이미지 업로드</span>
                          <span className="text-xs text-muted-foreground">JPG, PNG, GIF 파일 (최대 5MB)</span>
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>미리보기</Label>
                      <div className="border rounded-lg h-40 flex items-center justify-center bg-slate-50">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={imagePreview || "/assets/placeholder.png"}
                              alt="미리보기"
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            이미지를 업로드하면 미리보기가 표시됩니다
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 동의 사항 */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start gap-2">
                    <RadioGroup defaultValue="agree" className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="agree" id="agree" />
                        <Label htmlFor="agree" className="font-normal">
                          개인정보 수집 및 이용에 동의합니다.
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <p>허위 정보 등록 시 서비스 이용이 제한될 수 있습니다.</p>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 min-w-32" disabled={loading}>
                    {loading ? "등록 중..." : "등록하기"}
                  </Button>
                </div>
              </form>
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

