import Link from "next/link";
import AuthButtonGroup from "./authButtonGroup";
import { createClient } from "@/utils/supabase/server";
export async function Header() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">

        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-green-600">PAWREST</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/lost-found" className="font-medium hover:text-green-600 py-2">
            실종동물 찾기
          </Link>
          <Link href="/community" className="font-medium hover:text-green-600 py-2">
            커뮤니티
          </Link>
          <Link href="petAllowed" className="font-medium hover:text-green-600 py-2">
            산책 지도
          </Link>
          <Link href="/shop" className="font-medium hover:text-green-600 py-2">
            물품 기부
          </Link>
          <Link href="/donation" className="font-medium hover:text-green-600 py-2">
            보호소 후원
          </Link>
          <Link href="/donor-list" className="font-medium hover:text-green-600 py-2">
            후원자 명단
          </Link>
          <Link href="/adoption" className="font-medium hover:text-green-600 py-2">
            입양신청
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <AuthButtonGroup />
        </div>
      </div>
    </header>
  );
}
