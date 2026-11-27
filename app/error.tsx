"use client";

import { useEffect } from "react";

import SiteFrame from "@/components/horizon/SiteFrame";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    document.title = "Something went wrong";
  }, []);

  return (
    <SiteFrame>
      <section className="error-section">
        <div className="form-copy" style={{ maxWidth: 820 }}>
          <h1 className="t-error">Something went wrong</h1>
          <p className="t-sky">Please try again. If this keeps happening, email hello@commonlife.ai.</p>
          <div className="actions">
            <button className="btn btn-solid" type="button" onClick={() => reset()}>
              Try again
            </button>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
