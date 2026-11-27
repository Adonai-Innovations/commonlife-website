"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function SiteFrame({ overlay = false, children }: { overlay?: boolean; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="horizon">
      <SiteHeader key={pathname} overlay={overlay} />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
