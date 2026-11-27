import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cabin, Inter, Lora } from "next/font/google";
import Motion from "@/components/horizon/Motion";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: {
    default: "Where Faith and Understanding meet Clarity.",
    template: "%s",
  },
  description: "Faith meets technology—built for the Church, powered by truth.",
  openGraph: {
    title: "Where Faith and Understanding meet Clarity.",
    description: "Faith meets technology—built for the Church, powered by truth.",
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
        <Motion />
        {children}
      </body>
    </html>
  );
}
