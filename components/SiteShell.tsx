"use client";

import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InnerMotion from "@/components/InnerMotion";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header tone="light" />
      <main id="main">{children}</main>
      <Footer tone="light" />
      <InnerMotion />
    </>
  );
}
