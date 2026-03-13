import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI圣斗士 - 黄金十二宫军团",
  description: "雅典娜转世的AI助手团队，12黄金圣斗士为您服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
