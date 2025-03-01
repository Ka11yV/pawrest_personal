import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award } from "lucide-react"

// 임시 데이터
const donors = [
  { rank: 1, name: "김선한", amount: 1000000 },
  { rank: 2, name: "이도움", amount: 800000 },
  { rank: 3, name: "박나눔", amount: 700000 },
  { rank: 4, name: "최기부", amount: 600000 },
  { rank: 5, name: "정사랑", amount: 500000 },
  { rank: 6, name: "강행복", amount: 400000 },
  { rank: 7, name: "윤희망", amount: 300000 },
  { rank: 8, name: "서기쁨", amount: 200000 },
  { rank: 9, name: "임축복", amount: 150000 },
  { rank: 10, name: "한감사", amount: 100000 },
]

export default function DonorListPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">보호소 후원자 명단</h1>
      <p className="text-center text-gray-600 mb-8">소중한 후원으로 유기동물들에게 따뜻한 희망을 선물해 주셔서 진심으로 감사드립니다. 💙</p>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">상위 10명의 후원자</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {donors.map((donor) => (
              <li key={donor.rank} className="flex justify-between items-center border-b py-3 last:border-b-0">
                <div className="flex items-center space-x-4">
                  {donor.rank <= 3 ? (
                    <Trophy
                      className={`h-6 w-6 ${donor.rank === 1 ? "text-yellow-400" : donor.rank === 2 ? "text-gray-400" : "text-yellow-700"}`}
                    />
                  ) : (
                    <span className="text-gray-500 font-semibold w-6 text-center">{donor.rank}</span>
                  )}
                  <span className="font-semibold text-lg">{donor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">{donor.amount.toLocaleString()}원</span>
                  {donor.rank <= 3 && (
                    <Badge variant="outline" className="ml-2">
                      <Award className="h-4 w-4 mr-1" />
                      Top {donor.rank}
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-8">모든 후원금은 유기동물 보호와 관리에 소중히 사용됩니다.</p>
    </div>
  )
}

