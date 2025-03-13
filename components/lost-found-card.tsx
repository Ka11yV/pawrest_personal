"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import MissingAnimalPost from "@/app/Interface/post";

interface LostFoundCardProps {
  pet: MissingAnimalPost;
}

export default function LostFoundCard({ pet }: LostFoundCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={pet.image || "/placeholder.svg"}
            alt={pet.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge
              className={pet.postType === "lost" ? "bg-red-500" : "bg-blue-500"}
            >
              {pet.postType === "lost" ? "실종" : "발견"}
            </Badge>
          </div>
          {pet.reward && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 border-yellow-200"
              >
                사례금: {pet.reward}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-1">{pet.title}</h3>
            <Badge variant="outline" className="ml-2 whitespace-nowrap">
              {pet.status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{pet.species}</Badge>
            <Badge variant="secondary">{pet.breed}</Badge>
            <Badge variant="secondary">{pet.gender}</Badge>
            <Badge variant="secondary">{pet.age}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground line-clamp-1">
              {pet.location}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{pet.date}</span>
          </div>
          <p className="text-sm line-clamp-2 mt-2">{pet.body}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{pet.contact}</span>
          </div>
          <Button
            variant="link"
            className="text-sm font-medium text-primary hover:underline"
            onClick={() => setIsOpen(true)}
          >
            상세보기
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{pet.title}</DialogTitle>
            <DialogDescription>
              {pet.postType === "lost" ? "실종" : "발견"} 날짜: {pet.date}

              nb
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={pet.image || "/placeholder.svg"}
                alt={pet.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={
                    pet.postType === "lost" ? "bg-red-500" : "bg-blue-500"
                  }
                >
                  {pet.postType === "lost" ? "실종" : "발견"}
                </Badge>
                <Badge variant="outline">{pet.status}</Badge>
                {pet.reward && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-200"
                  >
                    사례금: {pet.reward}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">동물 종류:</span>
                  <span>{pet.species}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">품종:</span>
                  <span>{pet.breed}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">성별:</span>
                  <span>{pet.gender}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">나이:</span>
                  <span>{pet.age}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">위치:</span>
                  <span>{pet.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold min-w-20">연락처:</span>
                  <span>{pet.contact}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">상세 설명</h4>
            <p className="text-muted-foreground whitespace-pre-line">
              {pet.body}
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button onClick={() => setIsOpen(false)}>닫기</Button>
            {pet.postType === "lost" && (
              <Button variant="outline">제보하기</Button>
            )}
            {pet.postType === "found" && (
              <Button variant="outline">내 반려동물인 것 같아요</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
