"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#062F45",
          color: "#FFFFFF",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <main>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
          <p style={{ marginBottom: "1.5rem", color: "#8EB5DB" }}>
            Please try again. If this keeps happening, email hello@commonlife.ai.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#FFFFFF",
              color: "#062F45",
              border: "1.5px solid #FFFFFF",
              borderRadius: 0,
              padding: "12px 24px",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
