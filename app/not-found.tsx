import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { FullSection } from "@/components/horizon/Sections";
import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "We couldn’t find the page you were looking for.",
  description: "There is an error in the URL entered into your web browser. Please check the URL and try again.",
};

export default function NotFound() {
  return (
    <SiteFrame overlay>
      <FullSection image="light-rays" copyWidth={820} priority hero>
        <h1 className="t-404" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          We couldn’t find the page you were looking for.
        </h1>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          This is either because:
        </p>
        <div className="reasons" data-reveal="" data-contrast="white" style={{ "--stagger": 2 } as CSSProperties}>
          <p className="reason">There is an error in the URL entered into your web browser. Please check the URL and try again.</p>
          <p className="reason">The page you are looking for has been moved or deleted.</p>
        </div>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 3 } as CSSProperties}>
          You can return to our homepage by <Link className="text-link" href="/">clicking here</Link>.
        </p>
      </FullSection>
    </SiteFrame>
  );
}
