"use client";

import { ButtonButton } from "@/components/Button";
import SiteShell from "@/components/SiteShell";

export default function AppError({
  error: _error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  void _error;
  return (
    <SiteShell>
      <section className="rounded-3xl bg-cl-white px-6 pb-16 pt-16 md:rounded-[28px] md:px-12 md:pb-24 md:pt-24 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:pb-[140px] min-[1180px]:pt-[120px]">
        <div className="flex max-w-[820px] flex-col gap-7">
          <h1 className="font-lora text-[40px] leading-[48px] tracking-[-0.8px] md:text-[48px] md:leading-[56px] min-[1180px]:text-[56px] min-[1180px]:leading-[64px] min-[1180px]:tracking-[-1.12px]">
            Something went wrong
          </h1>
          <p className="font-inter text-[17px] leading-7">Please try again. If this keeps happening, email hello@commonlife.ai.</p>
          <ButtonButton variant="primary" onClick={() => reset()} className="max-md:w-full md:self-start">
            Try again
          </ButtonButton>
        </div>
      </section>
    </SiteShell>
  );
}
