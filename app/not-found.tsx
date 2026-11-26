import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "We couldn’t find the page you were looking for.",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="rounded-3xl bg-cl-white px-6 pb-16 pt-16 md:rounded-[28px] md:px-12 md:pb-24 md:pt-24 desktop:rounded-[32px] desktop:px-[72px] desktop:pb-[140px] desktop:pt-[120px]">
        <div className="flex max-w-[820px] flex-col gap-6">
          <h1 className="font-lora text-[40px] leading-[48px] tracking-[-0.8px] md:text-[48px] md:leading-[56px] desktop:text-[56px] desktop:leading-[64px] desktop:tracking-[-1.12px]">
            We couldn’t find the page you were looking for.
          </h1>
          <p className="font-inter text-[17px] leading-7">This is either because:</p>
          <p className="rounded-2xl bg-cl-paper px-5 py-4 font-inter text-[17px] leading-7">
            There is an error in the URL entered into your web browser. Please check the URL and try again.
          </p>
          <p className="rounded-2xl bg-cl-paper px-5 py-4 font-inter text-[17px] leading-7">
            The page you are looking for has been moved or deleted.
          </p>
          <p className="font-inter text-[18px] leading-[30px]">
            You can return to our homepage by{" "}
            <Link href="/" className="font-semibold text-cl-blue underline">
              clicking here
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
