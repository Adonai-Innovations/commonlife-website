"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#F5F7F9",
          color: "#062F45",
          fontFamily: "Georgia, serif",
          padding: "48px 20px",
        }}
      >
        <main style={{ maxWidth: 820, margin: "0 auto" }}>
          <h1 style={{ fontSize: 40, lineHeight: "48px", fontWeight: 500, letterSpacing: "-0.01em" }}>Something went wrong</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, lineHeight: "28px", marginTop: 24 }}>
            Please try again. If this keeps happening, email hello@commonlife.ai.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              background: "#1370AF",
              color: "#FFFFFF",
              border: 0,
              borderRadius: 999,
              height: 48,
              padding: "0 24px",
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
