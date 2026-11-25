import type { ReactNode } from "react";
import { Cabin } from "next/font/google";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cabin",
});

/**
 * Cabin stays on the existing marketing pages. The homepage does not use it.
 */
export default function LegacyLayout({ children }: { children: ReactNode }) {
  return <div className={cabin.variable}>{children}</div>;
}
