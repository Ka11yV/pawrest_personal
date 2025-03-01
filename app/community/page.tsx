import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 임시 데이터
const posts = [
  {
    id: 1,
    title: "길에서 강아지를 발견했어요",
    content: "오늘 퇴근길에 길 잃은 것 같은 강아지를 발견했습니다. 주인을 찾아주고 싶어요.",
    author: "김동물",
    date: "2025-03-01",
    comments: 5,
    likes: 12,
    image: "/assets/placeholder.png",
  },
  {
    id: 2,
    title: "잃어버린 고양이를 찾았습니다!",
    content: "3일 전에 잃어버린 제 고양이를 드디어 찾았어요. 정말 다행입니다.",
    author: "이냥이",
    date: "2025-02-28",
    comments: 8,
    likes: 20,
    image: "/assets/placeholder.png",

  },
  {
    id: 3,
    title: "유기동물 봉사활동 후기",
    content: "지난 주말 유기동물 보호소에서 봉사활동을 다녀왔습니다. 정말 보람찼어요.",
    author: "박봉사",
    date: "2025-02-25",
    comments: 3,
    likes: 15,
    image: "/assets/placeholder.png",
  },
]

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">커뮤니티</h1>
            <Link href="/community/create">
              <Button>글쓰기</Button>
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <Input placeholder="검색어를 입력하세요" className="max-w-sm" />
              <Button variant="outline">검색</Button>
            </div>
          </div>

          <div className="grid gap-6">
            {posts.map((post) => (
              <Link href={`/community/${post.id}`} key={post.id} className="block hover:no-underline">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1 hover:text-green-600">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.image && (
                      <div className="mb-4">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover w-24 h-24"
                        />
                      </div>
                    )}
                    <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-1">
              이전
            </Button>
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              다음
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

