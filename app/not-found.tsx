import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "We couldn’t find the page you were looking for.",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-[820px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-28">
        <h1 className="f-h1">We couldn’t find the page you were looking for.</h1>
        <p className="f-body">This is either because:</p>
        <p className="f-body">There is an error in the URL entered into your web browser. Please check the URL and try again.</p>
        <p className="f-body">The page you are looking for has been moved or deleted.</p>
        <p className="f-body">
          You can return to our homepage by{" "}
          <Link href="/" className="text-cl-blue underline">
            clicking here
          </Link>
          .
        </p>
      </section>
    </SiteShell>
  );
}
