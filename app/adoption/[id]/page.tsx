import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 임시 데이터 (실제로는 ID를 기반으로 데이터를 가져와야 합니다)
const adoptionPost = {
  id: 1,
  name: "멍이",
  breed: "골든 리트리버",
  age: "2살",
  gender: "수컷",
  description:
    "활발하고 친근한 성격의 골든 리트리버입니다. 아이들과 잘 지내며 산책을 매우 좋아합니다. 기본적인 훈련을 받았으며, 집 안에서도 조용히 지낼 줄 압니다. 새로운 가족을 만나 행복한 생활을 하고 싶어 합니다.",
  image: "/placeholder.svg?height=400&width=600",
  applications: 5,
  shelter: "행복한 동물 보호소",
  health: "예방접종 완료, 중성화 수술 완료",
  personality: "활발함, 친근함, 충성심 강함",
}

export default function AdoptionPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{adoptionPost.name} 입양 신청</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <div className="relative h-64 w-full">
            <Image
              src={adoptionPost.image || "/placeholder.svg"}
              alt={adoptionPost.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{adoptionPost.name}</CardTitle>
              <Badge variant="secondary">{adoptionPost.breed}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>나이: {adoptionPost.age}</span>
                <span>성별: {adoptionPost.gender}</span>
              </div>
              <p>{adoptionPost.description}</p>
              <div>
                <h3 className="font-semibold mb-1">건강 상태</h3>
                <p className="text-sm">{adoptionPost.health}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">성격</h3>
                <p className="text-sm">{adoptionPost.personality}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">보호소</h3>
                <p className="text-sm">{adoptionPost.shelter}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">현재 신청자 수: {adoptionPost.applications}</span>
            <Button>입양 신청하기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>입양 신청 절차</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>입양 신청서 작성 및 제출</li>
              <li>보호소 담당자의 검토</li>
              <li>전화 인터뷰</li>
              <li>가정 방문 및 대면 인터뷰</li>
              <li>입양 승인 및 입양 계약서 작성</li>
              <li>입양 후 사후 관리</li>
            </ol>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              입양 과정에 대해 궁금한 점이 있으시면 보호소로 직접 문의해 주세요.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

