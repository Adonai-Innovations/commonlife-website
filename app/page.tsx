import type { Metadata } from "next";

import HomeC from "@/components/home-c/HomeC";

export const metadata: Metadata = {
  title: "CommonLife — Faith meets technology",
  description:
    "Built for the Church, powered by truth. Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources.",
  openGraph: {
    title: "CommonLife — Faith meets technology",
    description:
      "Built for the Church, powered by truth. Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources.",
    siteName: "CommonLife",
  },
};

export default function HomePage() {
  return (
    <>
      <style>{`
        body { background: #062F45; color: #ffffff; }
        html:has(.home-c) { background: #062F45; scrollbar-color: #093A56 #062F45; }
      `}</style>
      <HomeC />
    </>
  );
}
