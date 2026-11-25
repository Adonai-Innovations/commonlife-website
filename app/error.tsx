"use client";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="bg-clDeepOcean px-6 py-24 text-clWhite min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-36">
      <div className="mx-auto max-w-[640px] text-center">
        <h1 className="font-lora text-[40px] font-medium leading-[46px] min-[768px]:text-[56px] min-[768px]:leading-[64px]">
          Something went wrong
        </h1>
        <p className="mt-6 text-[17px] leading-7 text-clSky">
          Please try again. If this keeps happening, email hello@commonlife.ai.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
