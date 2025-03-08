"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, MapPin, Calendar, AlertCircle } from "lucide-react";
import missingAnimalStore from "@/app/store/postStore";
import {
  extractAndValidateUUIDFromURL,
  rewardFormatting,
} from "@/app/utils/Formmating";
import MissingAnimalPost from "@/app/Interface/post";
import { useImageStore } from "@/app/store/imageStore";

export default function CreateLostFoundPage() {
  const router = useRouter();
  const [postType, setPostType] = useState<"lost" | "found">("lost");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createPost } = missingAnimalStore();
  const { checkImage, saveImage } = useImageStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const clearImage = () => {
    setImagePreview(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하로 업로드해주세요.");
      return;
    }

    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
      const response = await checkImage(file);
      setImageUrl(response.imageUrl);
      setFileName(response.fileName);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const postData: MissingAnimalPost = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        image: imageUrl || "",
        species: formData.get("species") as
          | "dog"
          | "cat"
          | "rabbit"
          | "bird"
          | "other",
        age: formData.get("age") as string,
        breed: formData.get("breed") as string,
        location: formData.get("location") as string,
        date: formData.get("date") as string,
        reward: formData.get("reward") ? Number(formData.get("reward")) : 0,
        contact: formData.get("contact") as string,
        postType: postType,
        gender: formData.get("gender") as "male" | "female" | "unknown",
      };

      const response = await createPost(postData);

      if (response.statusCode === 200) {
        const response = await saveImage(file, fileName);
        console.log(response);
        router.push("/lost-found");
      }
    } catch (error) {
      console.error("게시물 생성 중 오류가 발생했습니다:", error);
      alert("게시물을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container max-w-4xl">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">실종/발견 동물 등록</h1>
              <p className="text-muted-foreground">
                잃어버린 반려동물이나 발견한 동물에 대한 정보를 등록해주세요.
              </p>
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
                onValueChange={(value) =>
                  setPostType(value as "lost" | "found")
                }
              >
                <TabsList className="grid w-full h-full grid-cols-2 mb-6">
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
                        name="title"
                        id="title"
                        placeholder={
                          postType === "lost"
                            ? "잃어버린 동물에 대한 제목"
                            : "발견한 동물에 대한 제목"
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="species">동물 종류</Label>
                      <Select name="species" defaultValue="dog">
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
                      <Input
                        id="breed"
                        name="breed"
                        placeholder="품종을 입력하세요"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">성별</Label>
                      <Select defaultValue="unknown">
                        <SelectTrigger id="gender" name="gender">
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
                      <Input
                        id="age"
                        name="age"
                        placeholder="나이를 입력하세요 (추정 가능)"
                      />
                    </div>
                  </div>
                </div>

                {/* 위치 및 시간 정보 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    {postType === "lost" ? "실종 정보" : "발견 정보"}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        {postType === "lost" ? "실종 장소" : "발견 장소"}
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="상세 주소를 입력하세요"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">
                        {postType === "lost" ? "실종 날짜" : "발견 날짜"}
                      </Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                  </div>

                  {postType === "lost" && (
                    <div className="space-y-2">
                      <Label htmlFor="reward">사례금 (선택사항)</Label>
                      <Input
                        type="number"
                        id="reward"
                        name="reward"
                        placeholder="사례금 금액을 입력하세요 (만원 단위)"
                        step={10000}
                        min={0}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        * 만원 단위로만 입력 가능합니다. (예: 10000, 20000)
                      </p>
                    </div>
                  )}
                </div>

                {/* 상세 정보 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">상세 정보</h2>

                  <div className="space-y-2">
                    <Label htmlFor="body">상세 설명</Label>
                    <Textarea
                      id="body"
                      name="body"
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
                    <Input
                      id="contact"
                      name="contact"
                      placeholder="연락 가능한 전화번호를 입력하세요"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      * 개인정보 보호를 위해 일부만 공개됩니다.
                    </p>
                  </div>
                </div>

                {/* 이미지 업로드 */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">이미지 업로드</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="image">실종동물 사진</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Input
                          id="image"
                          type="file"
                          name="image"
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
                          <span className="text-sm font-medium">
                            클릭하여 이미지 업로드
                          </span>
                          <span className="text-xs text-muted-foreground">
                            JPG, JPEG, PNG 파일 (최대 5MB)
                          </span>
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
                      <button
                        type="button"
                        className="text-sm text-red-500 font-bold"
                        onClick={() => clearImage()}
                      >
                        이미지 삭제
                      </button>
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
                    <p>
                      허위 정보 등록이나 게시물과 관련없는 사진업로드 시 서비스
                      이용이 제한될 수 있습니다.
                    </p>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 min-w-32"
                    disabled={loading}
                  >
                    {loading ? "등록 중..." : "등록하기"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
