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
          background: "#F4F6FB",
          color: "#101832",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <main>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
          <p style={{ marginBottom: "1.5rem" }}>
            Please refresh the page. If this keeps happening, email hello@commonlife.ai.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#4A6CD4",
              color: "#fff",
              border: 0,
              borderRadius: "4px",
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
