import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
      <body className={`${lora.variable} ${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
