"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const animals = [
  {
    id: 1,
    title: "사랑이 필요한 친구들이 기다리고 있어요",
    description: "구매가 아닌 입양으로 사랑을 나누세요",
    image: "/assets/stray_cat.png",
    link: "/adoption/2",
  },
  {
    id: 2,
    title: "함께 지키는 펫티켓, 모두가 행복한 산책길",
    description: "반려견과 외출 시 배변봉투·목줄·입식표 꼭 준비해주세요!",
    image: "/assets/peticket.png",
    link: "/adoption/1",
  },
  {
    id: 3,
    title: "여러분의 따뜻한 손길이 필요합니다!",
    description: "봉사활동에 참여하여 함께 더 나은 세상을 만들어 주세요",
    image: "/assets/volunteer.png",
    link: "/adoption/3",
  },
  {
    id: 4,
    title: "구조된 강아지 '달콤이'를 소개합니다",
    description: "사랑스러운 강아지 달콤이에게 따뜻한 보금자리를 찾아주세요",
    image: "/assets/dalcom.png",
    link: "/adoption/4",
  },
  {
    id: 5,
    title: "구조된 토끼 '토비'를 소개합니다",
    description: "집을 잃은 토끼 토비에게 따뜻한 보금자리를 찾아주세요",
    image: "/assets/rabbit.png",
    link: "/info/registration",
  },
];

export default function AnimalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % animals.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden rounded-b-xl">
      <div className="relative h-[550px] overflow-hidden">
        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent z-10"></div>
            <Image
              src={animal.image || "/placeholder.svg"}
              alt={animal.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="max-w-2xl text-white">
                <h2 className="text-3xl font-bold mb-4">{animal.title}</h2>
                <p className="mb-6">{animal.description}</p>
                <Link
                  href={animal.link}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-green-600 shadow transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/30 rounded-full px-3 py-1 text-white z-30">
        <span className="text-sm">
          {currentSlide + 1} / {animals.length}
        </span>
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-black/20"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-black/20"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-black/20"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
