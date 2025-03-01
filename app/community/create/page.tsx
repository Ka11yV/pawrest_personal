"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Search, Filter, Upload } from "lucide-react"

export default function CreatePostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 실제 게시글 등록 로직을 구현합니다.
    console.log("게시글 등록:", { title, content, image })
    // 등록 후 커뮤니티 메인 페이지로 이동
    router.push("/community")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Links */}
      <div className="w-full bg-white border-b">
        <div className="container flex justify-end items-center py-1 text-xs text-muted-foreground">
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
            <span className="font-bold text-xl text-green-600">PAWREST</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/animals" className="font-medium hover:text-green-600 py-2">
              동물들목록
            </Link>
            <Link href="/community" className="font-medium text-green-600 border-b-2 border-green-600 py-2">
              커뮤니티
            </Link>
            <Link href="/lost-found" className="font-medium hover:text-green-600 py-2">
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
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-50 py-8">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">새 게시글 작성</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="내용을 입력하세요"
                      rows={10}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">이미지 업로드</Label>
                    <div className="mt-1 flex items-center">
                      <Input id="image" type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                      <Label
                        htmlFor="image"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        이미지 선택
                      </Label>
                    </div>
                    {imagePreview && (
                      <div className="mt-2">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={300}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.push("/community")}>
                취소
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                게시하기
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-slate-800 text-slate-200 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">PAWREST</h3>
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
                <p>PAWREST 빌딩 5층</p>
                <p>전화: 02-123-4567</p>
                <p>이메일: info@pawrest.kr</p>
              </address>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} PAWREST. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

