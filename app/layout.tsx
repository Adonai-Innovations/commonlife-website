import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const MOTION_BOOT = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-motion","on");}}catch(e){}})();`;

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
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <Script id="motion-boot" strategy="beforeInteractive">
          {MOTION_BOOT}
        </Script>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
