import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", async () => {
  const { createElement } = await import("react");
  return {
    default: ({ href, children, ...props }: { href: string; children?: import("react").ReactNode }) =>
      createElement("a", { ...props, href }, children),
  };
});

vi.mock("next/image", async () => {
  const { createElement } = await import("react");
  return {
    default: ({ alt, ...props }: { alt: string; src: string }) => createElement("img", { alt, ...props }),
  };
});

import HomeStory from "@/components/home/HomeStory";

const REQUIRED = [
  "Where Faith and Understanding meet Clarity.",
  "Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.",
  "What is CommonLife?",
  "CommonLife is a Christian AI resource that helps people explore and live Scripture confidently. Built on biblically verified sources, it ensures all responses align with the Word.",
  "A Safe, Faithful Resource for a Digital World",
  "“Do not conform to the pattern of this world, but be transformed by the renewing of your mind.”",
  "Romans 12:2",
  "Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources, ensuring every response is truth-based for your community’s confidence.",
  "Built for Real Life.",
  "How do I forgive someone?",
  "What does the Bible say about anxiety?",
  "How can I teach kids about prayer?",
  "What does the Bible say about generosity?",
  "How can I strengthen my marriage?",
  "The CommonLife Platform",
  "Faith meets technology—built for the Church, powered by truth.",
  "Biblically Sound Answers.",
  "Accessible to All.",
  "Seamless Integration.",
  "Ready to Bring CommonLife to Your Congregation?",
  "Schedule a Demo",
  "Contact Us",
  "About CommonLife",
  "© CommonLife, Inc. All rights reserved.",
  "01  /  06",
  "06  /  06",
];

describe("homepage first HTML", () => {
  it("renders the chapter copy in the server markup", () => {
    const html = renderToStaticMarkup(createElement(HomeStory));
    for (const line of REQUIRED) {
      expect(html).toContain(line);
    }
    expect(html).not.toContain("This field is required.");
    expect(html).not.toContain("Choose at least one option.");
    expect(html).not.toContain("Verse of the Day");
    expect(html).not.toContain("Immediately (May pilot)");
    expect(html).not.toMatch(/© CommonLife, Inc\. All rights reserved\.\s*\d{4}/);
  });
});
