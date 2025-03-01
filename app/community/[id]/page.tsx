"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, ThumbsUp, MessageSquare } from "lucide-react"

// 임시 데이터
const post = {
  id: 1,
  title: "길에서 강아지를 발견했어요",
  content:
    "오늘 퇴근길에 길 잃은 것 같은 강아지를 발견했습니다. 주인을 찾아주고 싶어요. 발견 장소는 서울시 강남구 테헤란로 부근이며, 갈색 푸들로 보입니다. 목줄은 없었고 매우 겁에 질려 보였습니다. 현재 근처 동물병원에 임시 보호 중입니다. 혹시 주인이신 분이나 정보를 아시는 분은 연락 부탁드립니다.",
  author: "김동물",
  date: "2025-03-01",
  comments: 5,
  likes: 12,
  image: "/assets/placeholder.png",
}

const comments = [
  {
    id: 1,
    author: "이웃주민",
    content: "제가 어제 그 근처에서 강아지를 찾는 전단지를 봤어요. 혹시 그 강아지일까요?",
    date: "2025-03-01 14:30",
    likes: 3,
  },
  {
    id: 2,
    author: "동물사랑",
    content: "친절하게 보호해주셔서 감사합니다. 주인이 빨리 나타나길 바랍니다.",
    date: "2025-03-01 15:45",
    likes: 5,
  },
]

export default function CommunityPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="게시글 이미지"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  좋아요 {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  댓글 {post.comments}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                수정
              </Button>
            </CardFooter>
          </Card>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">댓글</h2>
            {comments.map((comment) => (
              <Card key={comment.id} className="mb-4">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${comment.author}`} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm">{comment.author}</CardTitle>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    좋아요 {comment.likes}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">댓글 작성</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="댓글을 입력하세요" />
            </CardContent>
            <CardFooter>
              <Button>댓글 등록</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

