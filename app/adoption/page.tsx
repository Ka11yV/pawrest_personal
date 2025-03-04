import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdoptionPostCard from "@/components/adoption-post-card"

// 임시 데이터
const adoptionPosts = [
  {
    id: 1,
    name: "멍이",
    breed: "골든 리트리버",
    age: "2살",
    gender: "수컷",
    description: "활발하고 친근한 성격의 골든 리트리버입니다. 아이들과 잘 지내며 산책을 매우 좋아합니다.",
    image: "/placeholder.svg?height=300&width=400",
    applications: 5,
  },
  {
    id: 2,
    name: "나비",
    breed: "코리안 숏헤어",
    age: "1살",
    gender: "암컷",
    description: "조용하고 애교 많은 고양이입니다. 실내에서 키우기 적합하며 혼자 있는 것을 좋아합니다.",
    image: "/placeholder.svg?height=300&width=400",
    applications: 3,
  },
  {
    id: 3,
    name: "해피",
    breed: "비글",
    age: "3살",
    gender: "수컷",
    description: "장난기 많고 활발한 비글입니다. 산책과 놀이를 매우 좋아하며 다른 강아지들과도 잘 어울립니다.",
    image: "/placeholder.svg?height=300&width=400",
    applications: 7,
  },
]

export default function AdoptionApplicationPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">입양 신청</h1>
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Input placeholder="동물 이름 또는 품종 검색" className="max-w-sm" />
          <Button variant="outline">검색</Button>
        </div>
        <Link href="/adoption-application/create">
          <Button>입양 동물 등록</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adoptionPosts.map((post) => (
          <AdoptionPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

