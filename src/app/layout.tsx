import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/components/common/ToastProvider";
import AuthContext from "@/providers/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "김민중 | 프론트엔드 개발자 포트폴리오",
  description:
    "퍼블리싱의 견고함에 데이터 로직을 더해, 사용자 경험을 완성하는 프론트엔드 개발자 김민중의 포트폴리오입니다. 경력, 프로젝트, 기술 블로그, 백로그를 한곳에서 확인하세요.",
  keywords: [
    "프론트엔드 개발자",
    "김민중",
    "포트폴리오",
    "Next.js",
    "React",
    "TypeScript",
    "웹 퍼블리셔",
    "기술 블로그",
    "프론트엔드",
  ],
  authors: [{ name: "김민중" }],
  creator: "김민중",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "김민중 | 프론트엔드 개발자 포트폴리오",
    description:
      "퍼블리싱의 견고함에 데이터 로직을 더해, 사용자 경험을 완성하는 프론트엔드 개발자",
    siteName: "김민중 포트폴리오",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} antialiased border-[20px] border-black`}
      >
        <AuthContext>
          {children}
          <ToasterProvider />
        </AuthContext>
      </body>
    </html>
  );
}
