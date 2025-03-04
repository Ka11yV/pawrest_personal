import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdoptionPost {
  id: number
  name: string
  breed: string
  age: string
  gender: string
  description: string
  image: string
  applications: number
}

interface AdoptionPostCardProps {
  post: AdoptionPost
}

export default function AdoptionPostCard({ post }: AdoptionPostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={post.image || "/placeholder.svg"} alt={post.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{post.name}</CardTitle>
          <Badge variant="secondary">{post.breed}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2 text-sm text-muted-foreground">
          <span>{post.age}</span>
          <span>{post.gender}</span>
        </div>
        <p className="text-sm line-clamp-3">{post.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">신청자 수: {post.applications}</span>
        <Link href={`/adoption-application/${post.id}`}>
          <Button>자세히 보기</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

