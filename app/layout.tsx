import type { Metadata } from "next";
import { Cabin, Inter } from "next/font/google";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} ${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
