"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/app/utils/api";

interface RescuedAnimal {
  id: number;
  breed: string;
  location: string;
  characteristics: string;
  image: string;
  age: string; // "2022(년생)"
  careAddr: string; // "경상남도 창원시 성산구 공단로474번길 117 (상복동) 동물보호센터"
  careNm: string; // "창원유기동물보호소"
  careTel: string; // "055-225-5701"
  chargeNm: string; // "손상익"
  colorCd: string; // "갈색&검정"
  desertionNo: string; // "448567202500107"
  filename: string; // "http://www.animal.go.kr/files/shelter/2025/02/202503011803309_s.jpg"
  happenDt: string; // "20250301"
  happenPlace: string; // "의창구 대산면 모산리 262-4"
  kindCd: string; // "[개] 믹스견"
  neuterYn: string; // "N"
  noticeEdt: string; // "20250311"
  noticeNo: string; // "경남-창원1-2025-00107"
  noticeSdt: string; // "20250301"
  officetel: string; // "055-225-5701"
  orgNm: string; // "경상남도 창원시 의창성산구"
  popfile: string; // "http://www.animal.go.kr/files/shelter/2025/02/202503011803309.jpg"
  processState: string; // "보호중"
  sexCd: string; // "M"
  specialMark: string; // "119포획.목줄착용.다리쪽 피부 조금 안좋음.브라벡토,구충제투여.살짝 겁먹은상태."
  weight: string; // "12(Kg)"
}

export function RescuedAnimalsSlider() {
  const [rescuedAnimals, setRescuedAnimals] = useState<RescuedAnimal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (rescuedAnimals.length - 3)
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (rescuedAnimals.length - 3)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (rescuedAnimals.length - 3)) %
        (rescuedAnimals.length - 3)
    );
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/rescued-animals");

      const newImage = convertUrl(
        response.data.response.body.items.item[0].filename
      );

      if (response.status !== 200)
        throw new Error(
          response.data || "구조된 동물 목록을 불러오는 중 오류가 발생했습니다."
        );

      setRescuedAnimals(response.data.response.body.items.item);
    } catch (err: any) {
      console.error("구조된 동물 목록 오류:", err?.response);
    }
  };

  function convertUrl(url: string) {
    // '_s.jpg'를 포함한 경우
    if (url.includes("_s.jpg")) {
      // '_s.jpg'를 제거하고, 두 번째 URL 형식으로 변환
      const newUrl = url.replace("_s.jpg", ".jpg");
      // 'http://www.animal.go.kr'을 빼고 두 번째 URL 형식에 맞게 변환
      return `https://www.animal.go.kr/front/fileMng/imageView.do?f=${newUrl.replace(
        "http://www.animal.go.kr",
        ""
      )}`;
    }

    // '_s'가 없는 경우 원본 URL을 그대로 반환
    return url;
  }
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {rescuedAnimals.map((animal, index) => (
          <div key={index} className="w-1/4 flex-shrink-0 px-2">
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="relative h-80 mb-4">
                  <Image
                    src={
                      convertUrl(animal.filename) || "/assets/placeholder.png"
                    }
                    alt={"구조된 동물 이미지"}
                    fill
                    style={{ objectFit: "cover" }} // objectFit을 스타일로 적용
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{animal.breed}</h3>
                <p className="text-sm mb-1">
                  <strong>발견 장소:</strong> {animal.happenPlace}
                </p>
                <p className="text-sm">
                  <strong>특징:</strong> {animal.specialMark}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
