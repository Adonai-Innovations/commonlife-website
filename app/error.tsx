"use client";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-navy flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-heading font-bold text-3xl mb-4">Something went wrong</h1>
        <p className="mb-8 text-brand-navy/70">
          Please try again. If this keeps happening, email hello@commonlife.ai.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 rounded bg-brand-berry text-white font-heading font-semibold"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
