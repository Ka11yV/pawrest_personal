import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, Calendar, Phone } from "lucide-react";
import MissingAnimalPost from "@/app/Interface/post";

const speciesMap = {
  dog: "개",
  cat: "고양이",
  bird: "새",
  rabbit: "토끼",
  other: "기타",
};

const genderMap = {
  male: "수컷",
  female: "암컷",
  unknown: "미상",
};

interface LostFoundCardProps {
  pet: MissingAnimalPost;
}

export default function LostFoundCard({ pet }: LostFoundCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={pet.image || "/assets/placeholder.png"}
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
          <Badge variant="secondary">
            {speciesMap[pet.species as keyof typeof speciesMap]}
          </Badge>
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
        <p className="text-sm line-clamp-2 mt-2">{pet.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{pet.contact}</span>
        </div>
        <Link
          href={`/lost-found/${pet.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          상세보기
        </Link>
      </CardFooter>
    </Card>
  );
}
