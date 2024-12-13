import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/Header";


export const metadata: Metadata = {
  title: "Book Store",
  description: "사전과제로 진행한 book store 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="max-w-[1260px] w-full m-auto px-[30px]">{children}</main>
      </body>
    </html>
  );
}
