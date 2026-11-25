import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connect With Us!",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
