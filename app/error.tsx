"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { primaryButton, shell } from "@/lib/chrome";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="bg-clWhite font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section className={`${shell} py-20 min-[1180px]:py-32`}>
          <div className="flex max-w-[640px] flex-col items-start gap-6">
            <h1 className="font-lora text-[36px] font-bold leading-[42px] tracking-[-0.015em] min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
              Something went wrong
            </h1>
            <p className="font-inter text-[17px] leading-7">
              Please try again. If this keeps happening, email hello@commonlife.ai.
            </p>
            <button type="button" className={primaryButton} onClick={() => reset()}>
              Try again
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
