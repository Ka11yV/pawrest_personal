"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateAdoptionPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    health: "",
    personality: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 실제 데이터 제출 로직을 구현합니다.
    console.log("입양 동물 등록:", formData)
    // 제출 후 입양 신청 메인 페이지로 이동
    router.push("/adoption-application")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">입양 동물 등록</h1>
      <Card>
        <CardHeader>
          <CardTitle>동물 정보 입력</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="breed">품종</Label>
                <Input id="breed" name="breed" value={formData.breed} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">나이</Label>
                <Input id="age" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="gender">성별</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">수컷</SelectItem>
                    <SelectItem value="female">암컷</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="health">건강 상태</Label>
              <Input id="health" name="health" value={formData.health} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="personality">성격</Label>
              <Input
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">사진 업로드</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            등록하기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

