import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Where Faith and Understanding meet Clarity.",
    template: "%s",
  },
  description:
    "Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${inter.variable} font-inter antialiased`}>{children}</body>
    </html>
  );
}
