import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import LostFoundCard from "@/components/lost-found-card"

// 샘플 데이터
const lostPets = [
  {
    id: 1,
    type: "lost",
    title: "골든 리트리버 '초코' 찾습니다",
    species: "개",
    breed: "골든 리트리버",
    gender: "수컷",
    age: "3살",
    location: "서울시 강남구 역삼동",
    date: "2025-02-20",
    description:
      "갈색 털의 골든 리트리버입니다. 목에 파란색 목줄을 하고 있으며, 사람을 잘 따릅니다. 발견하시면 연락 부탁드립니다.",
    contact: "010-1234-5678",
    image: "/placeholder.svg?height=300&width=400",
    reward: "50만원",
    status: "찾는 중",
  },
  {
    id: 2,
    type: "lost",
    title: "하얀색 말티즈 '뽀미' 실종",
    species: "개",
    breed: "말티즈",
    gender: "암컷",
    age: "2살",
    location: "서울시 서초구 반포동",
    date: "2025-02-22",
    description: "하얀색 말티즈로 오른쪽 눈 위에 작은 갈색 점이 있습니다. 발견하시면 연락 부탁드립니다.",
    contact: "010-2345-6789",
    image: "/placeholder.svg?height=300&width=400",
    reward: "30만원",
    status: "찾는 중",
  },
  {
    id: 3,
    type: "lost",
    title: "검은 고양이 '나비' 찾아요",
    species: "고양이",
    breed: "코리안 숏헤어",
    gender: "암컷",
    age: "1살",
    location: "경기도 성남시 분당구",
    date: "2025-02-18",
    description: "검은색 털에 노란 눈을 가진 고양이입니다. 목에 빨간색 목걸이를 하고 있습니다.",
    contact: "010-3456-7890",
    image: "/placeholder.svg?height=300&width=400",
    reward: "20만원",
    status: "찾는 중",
  },
  {
    id: 4,
    type: "lost",
    title: "시베리안 허스키 '루나' 실종",
    species: "개",
    breed: "시베리안 허스키",
    gender: "암컷",
    age: "4살",
    location: "인천시 연수구",
    date: "2025-02-24",
    description: "회색과 흰색 털을 가진 시베리안 허스키입니다. 파란 눈을 가지고 있으며 사람을 잘 따릅니다.",
    contact: "010-4567-8901",
    image: "/placeholder.svg?height=300&width=400",
    reward: "40만원",
    status: "찾는 중",
  },
]

const foundPets = [
  {
    id: 101,
    type: "found",
    title: "갈색 푸들 발견했습니다",
    species: "개",
    breed: "토이 푸들",
    gender: "미상",
    age: "추정 2-3살",
    location: "서울시 마포구 합정동",
    date: "2025-02-23",
    description: "갈색 토이 푸들로 보이는 강아지를 발견했습니다. 목줄은 없었고 사람을 잘 따릅니다. 주인 분을 찾습니다.",
    contact: "010-5678-9012",
    image: "/placeholder.svg?height=300&width=400",
    status: "임시보호 중",
  },
  {
    id: 102,
    type: "found",
    title: "치와와 발견",
    species: "개",
    breed: "치와와",
    gender: "수컷",
    age: "추정 5살 이상",
    location: "경기도 고양시 일산동구",
    date: "2025-02-21",
    description: "갈색 치와와를 발견했습니다. 나이가 좀 있어 보이며 검은색 목줄을 하고 있었습니다.",
    contact: "010-6789-0123",
    image: "/placeholder.svg?height=300&width=400",
    status: "임시보호 중",
  },
  {
    id: 103,
    type: "found",
    title: "회색 고양이 발견",
    species: "고양이",
    breed: "러시안 블루 추정",
    gender: "암컷",
    age: "추정 1-2살",
    location: "서울시 송파구 잠실동",
    date: "2025-02-19",
    description: "회색 털의 고양이를 발견했습니다. 목걸이는 없었고 사람을 경계하는 편입니다.",
    contact: "010-7890-1234",
    image: "/placeholder.svg?height=300&width=400",
    status: "보호소 인계",
  },
]

export default function LostFoundPage() {
  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">실종동물 찾기</h1>
          <p className="text-muted-foreground">잃어버린 반려동물을 찾거나 발견한 동물의 주인을 찾는 공간입니다.</p>
        </div>
        <Link href="/lost-found/create">
          <Button className="bg-green-600 hover:bg-green-700">실종/발견 동물 등록하기</Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="검색어를 입력하세요 (품종, 지역, 특징 등)" className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              지역
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              날짜
            </Button>
            <Button variant="outline">상세 필터</Button>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs defaultValue="lost" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="lost" className="text-base py-3">
            실종된 동물
          </TabsTrigger>
          <TabsTrigger value="found" className="text-base py-3">
            발견된 동물
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lost" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostPets.map((pet) => (
              <LostFoundCard key={pet.id} pet={pet} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="w-9 h-9">
                <span className="sr-only">이전 페이지</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9 bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9">
                2
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9">
                3
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9">
                <span className="sr-only">다음 페이지</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </nav>
          </div>
        </TabsContent>

        <TabsContent value="found" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundPets.map((pet) => (
              <LostFoundCard key={pet.id} pet={pet} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="w-9 h-9">
                <span className="sr-only">이전 페이지</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9 bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9">
                <span className="sr-only">다음 페이지</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </nav>
          </div>
        </TabsContent>
      </Tabs>

      {/* Information Box */}
      <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-600 mb-8">
        <h3 className="text-lg font-bold mb-2">실종동물 등록 안내</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>실종/발견 동물 등록은 로그인 후 가능합니다.</li>
          <li>허위 정보 등록 시 서비스 이용이 제한될 수 있습니다.</li>
          <li>동물 사진은 최대한 선명하고 특징이 잘 드러나는 사진으로 등록해주세요.</li>
          <li>발견 장소는 최대한 상세하게 기재해주세요.</li>
          <li>연락처 정보는 개인정보 보호를 위해 일부만 공개됩니다.</li>
        </ul>
      </div>
    </div>
  )
}

