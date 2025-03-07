import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimalSlider from "@/components/animal-slider";
import { RescuedAnimalsSlider } from "@/components/rescued-animals-slider";


export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <div className="relative bg-slate-50">
        <div className="absolute inset-0 bg-[url('/assets/placeholder.png')] bg-no-repeat bg-center opacity-10"></div>
        <div className="container relative">
          <AnimalSlider />
        </div>
      </div>

      {/* Rescued Animals Slider */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-7 text-center">
            최근 구조된 동물들
          </h2>
          <RescuedAnimalsSlider />
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">공지사항</h2>
            <Button variant="ghost" size="sm">
              더보기 +
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                  중요
                </span>
                <span className="text-sm text-muted-foreground">
                  2025.02.24
                </span>
              </div>
              <h3 className="font-medium mb-2">동물보호법 안내</h3>
              <p className="text-sm text-muted-foreground">
                동물보호법에 관한 중요 안내사항입니다.
              </p>
              <Link href="#" className="text-xs text-blue-500 mt-4 block">
                https://www.law.go.kr
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                  중요
                </span>

                <span className="text-sm text-muted-foreground">
                  2025.02.04
                </span>
              </div>
              <h3 className="font-medium mb-2">
                시스템 점검 안내 [2.4(화) 18:00 ~ 22:00]
              </h3>
              <p className="text-sm text-muted-foreground">
                PAWREST의 안정적 운영을 위해 시스템 점검을 실시합니다.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                  중요
                </span>
                <span className="text-sm text-muted-foreground">
                  2025.01.03
                </span>
              </div>
              <h3 className="font-medium mb-2">
                개인정보 취급 방법에 관한 공지
              </h3>
              <p className="text-sm text-muted-foreground">
                개인정보 처리 방법에 관한 공지, 제2조에 따라 홈페이지에 게시한
                이용 동의 안내를 확인해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-green-600 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <h2 className="text-3xl font-bold text-gray-800">
                    동물들목록 살펴보기
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  새로운 가족을 찾고 있는 다양한 동물들을 만나보세요. 각 동물의
                  특성, 나이, 건강 상태 등 자세한 정보를 제공하고 있습니다.
                  당신의 사랑과 보살핌을 기다리는 특별한 친구를 발견할 수 있을
                  거예요.
                </p>
                <Link
                  href="/animals"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out"
                >
                  동물들 목록 보기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/assets/placeholder.png"
                  alt="다양한 동물들"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
