import type React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Grid2X2 } from "lucide-react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "포레스트",
  description: "유기동물들에게 새로운 희망을, 새로운 가족을 찾아주세요.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
