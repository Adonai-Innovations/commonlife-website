"use client";

import { Inter, Lora } from "next/font/google";

import { ButtonButton } from "@/components/Button";
import SiteShell from "@/components/SiteShell";
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

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  void _error;
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <SiteShell>
          <section className="rounded-3xl bg-cl-white px-6 pb-16 pt-16 md:rounded-[28px] md:px-12 md:pb-24 md:pt-24 desktop:rounded-[32px] desktop:px-[72px] desktop:pb-[140px] desktop:pt-[120px]">
            <div className="flex max-w-[820px] flex-col gap-7">
              <h1 className="font-lora text-[40px] leading-[48px] tracking-[-0.8px] md:text-[48px] md:leading-[56px] desktop:text-[56px] desktop:leading-[64px] desktop:tracking-[-1.12px]">
                Something went wrong
              </h1>
              <p className="font-inter text-[17px] leading-7">Please try again. If this keeps happening, email hello@commonlife.ai.</p>
              <ButtonButton variant="primary" onClick={() => reset()} className="max-md:w-full md:self-start">
                Try again
              </ButtonButton>
            </div>
          </section>
        </SiteShell>
      </body>
    </html>
  );
}
