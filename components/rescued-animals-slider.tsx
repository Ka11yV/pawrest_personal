"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RescuedAnimal {
  id: number
  breed: string
  location: string
  characteristics: string
  image: string
}

const rescuedAnimals: RescuedAnimal[] = [
  {
    id: 1,
    breed: "골든 리트리버",
    location: "서울시 강남구",
    characteristics: "온순하고 친절한 성격, 3살 추정",
    image: "/assets/placeholder.png",
  },
  {
    id: 2,
    breed: "페르시안 고양이",
    location: "부산시 해운대구",
    characteristics: "장모종, 흰색, 파란 눈",
    image: "/assets/placeholder.png",
  },
  {
    id: 3,
    breed: "웰시 코기",
    location: "대구시 수성구",
    characteristics: "활발하고 장난기 많음, 1살 추정",
    image: "/assets/placeholder.png",
  },
  {
    id: 4,
    breed: "시베리안 허스키",
    location: "인천시 연수구",
    characteristics: "푸른 눈, 회색과 흰색 털, 2살 추정",
    image: "/assets/placeholder.png",
  },
  {
    id: 5,
    breed: "브리티시 숏헤어",
    location: "광주시 서구",
    characteristics: "회색 털, 둥근 얼굴, 4살 추정",
    image: "/assets/placeholder.png",
  },
  {
    id: 6,
    breed: "비글",
    location: "대전시 유성구",
    characteristics: "활발하고 호기심 많음, 2살 추정",
    image: "/assets/placeholder.png",
  },
]

export function RescuedAnimalsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (rescuedAnimals.length - 3))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (rescuedAnimals.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (rescuedAnimals.length - 3)) % (rescuedAnimals.length - 3))
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {rescuedAnimals.map((animal) => (
          <div key={animal.id} className="w-1/4 flex-shrink-0 px-2">
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="relative h-40 mb-4">
                  <Image
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.breed}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{animal.breed}</h3>
                <p className="text-sm mb-1">
                  <strong>발견 장소:</strong> {animal.location}
                </p>
                <p className="text-sm">
                  <strong>특징:</strong> {animal.characteristics}
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
  )
}

