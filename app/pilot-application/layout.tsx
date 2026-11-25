import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Apply to Become a Pilot Church",
};

export default function PilotApplicationLayout({ children }: { children: ReactNode }) {
  return children;
}
