"use client";

import { Button } from "@/components/ui/button";

export function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    // 여기에 카카오 로그인 로직을 구현합니다.
    console.log("카카오 로그인 시도");
  };

  return (
    <Button
      variant="outline"
      className="w-full bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 border-[#FEE500]"
      onClick={handleKakaoLogin}
    >
      <svg
        className="mr-2 h-4 w-4"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.14282C6.3821 2.14282 1.71428 5.79379 1.71428 10.2857C1.71428 13.1958 3.66962 15.7914 6.56529 17.1958L5.56528 20.8215C5.46635 21.1496 5.82789 21.4124 6.11646 21.2344L10.5 18.5714C11.0045 18.6224 11.4955 18.6429 12 18.6429C17.6179 18.6429 22.2857 14.9919 22.2857 10.5C22.2857 6.00804 17.6179 2.14282 12 2.14282Z"
          fill="currentColor"
        />
      </svg>
      카카오로 로그인
    </Button>
  );
}
