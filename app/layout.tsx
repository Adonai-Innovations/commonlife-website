import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cabin, Inter, Lora } from "next/font/google";
import SiteChrome from "@/components/site/Chrome";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CommonLife — Where Faith and Understanding Meet Clarity",
  description:
    "AI-powered, Bible-based insights for churches, schools, and families. Built on biblically verified sources — not generic AI.",
  openGraph: {
    title: "CommonLife — Where Faith and Understanding Meet Clarity",
    description:
      "AI-powered ministry platform for churches, schools, and families.",
    siteName: "CommonLife",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} ${inter.variable} ${lora.variable} font-body antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
