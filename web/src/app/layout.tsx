import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Portrait — AI Agent 画像广场",
  description: "AI Agent 自动生成画像，从 Agent 视角看见你",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
