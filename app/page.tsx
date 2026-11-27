import type { Metadata } from "next";

import HomeStory from "@/components/home/HomeStory";
import StoryMotion from "@/components/home/StoryMotion";

export const metadata: Metadata = {
  title: "Where Faith and Understanding meet Clarity.",
  description:
    "Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.",
};

export default function HomePage() {
  return (
    <>
      <HomeStory />
      <StoryMotion />
    </>
  );
}
