"use client";

import { ButtonButton } from "@/components/Button";
import SiteShell from "@/components/SiteShell";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-[820px] flex-col items-start gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-28">
        <h1 className="f-h1">Something went wrong</h1>
        <p className="f-body">Please try again. If this keeps happening, email hello@commonlife.ai.</p>
        <ButtonButton variant="primary" onClick={() => reset()}>
          Try again
        </ButtonButton>
      </section>
    </SiteShell>
  );
}
