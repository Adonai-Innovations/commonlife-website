"use client";

import { useRef } from "react";

import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { PhoneFrame, Photo } from "@/components/media";

const cards = [
  {
    title: "Large Churches & Multi-Campus Ministries",
    body: "Large multi-site churches can engage thousands of members with CommonLife, a personalized, biblically accurate assistant available 24/7 via your church app or website.",
    media: "photo" as const,
    src: "/d/church-prayer.jpg",
    alt: "People praying in a church",
  },
  {
    title: "Youth Ministries",
    body: "Create interactive lessons and digital devotionals that keep students engaged.",
    media: "phone" as const,
    src: "/d/app-youth.jpg",
    alt: "CommonLife app, youth ministries",
  },
  {
    title: "Bible Colleges / Seminaries",
    body: "Supplement study with verified contextual insights and theological cross-references.",
    media: "photo" as const,
    src: "/d/open-bible.jpg",
    alt: "Open Bible",
  },
  {
    title: "Mission Teams",
    body: "Generate study materials in multiple languages, ensuring scriptural accuracy across borders.",
    media: "phone" as const,
    src: "/d/app-mission.jpg",
    alt: "CommonLife app in another language",
  },
  {
    title: "Christian Counselors",
    body: "Use AI-supported, Scripture-anchored responses for pastoral care and counseling preparation.",
    media: "photo" as const,
    src: "/d/bible-reader.jpg",
    alt: "CommonLife Bible reader",
  },
  {
    title: "Home Churches & Small Groups",
    body: "Quickly craft discussion guides, prayers, and Scripture-based answers during study sessions.",
    media: "photo" as const,
    src: "/d/group-bibles.jpg",
    alt: "Bibles open in a group study",
  },
];

export default function UseCases() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 280) + 20;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * amount, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-cl-white py-8 pl-6 md:rounded-[28px] md:py-12 md:pl-12 min-[1180px]:rounded-[32px] min-[1180px]:py-16 min-[1180px]:pl-[72px]">
      <div className="mb-6 flex items-center justify-between gap-4 pr-6 md:mb-8 md:pr-12 min-[1180px]:pr-[72px]">
        <h2 className="font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] min-[1180px]:text-[52px] min-[1180px]:leading-[60px] min-[1180px]:tracking-[-0.52px]">
          Common Use Cases
        </h2>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="flex size-12 items-center justify-center rounded-full bg-cl-paper text-cl-deep-ocean"
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="flex size-12 items-center justify-center rounded-full bg-cl-paper text-cl-deep-ocean"
          >
            <IconArrowRight />
          </button>
        </div>
      </div>
      <div ref={scroller} className="carousel flex snap-x snap-mandatory gap-3 overflow-x-auto min-[1180px]:gap-5">
        {cards.map((card) => (
          <article key={card.title} data-card className="w-[264px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-cl-paper min-[1180px]:w-[310px]">
            {card.media === "photo" ? (
              <Photo src={card.src} alt={card.alt} className="h-[200px] w-full" />
            ) : (
              <div className="flex h-[200px] items-start justify-center overflow-hidden bg-cl-deep-ocean pt-6">
                <PhoneFrame src={card.src} alt={card.alt} className="h-[254px] w-[120px] rounded-2xl border-[5px]" />
              </div>
            )}
            <div className="flex flex-col gap-2 px-5 pb-6 pt-5">
              <h3 className="font-lora text-xl font-semibold leading-[26px]">{card.title}</h3>
              <p className="font-inter text-[15px] leading-6">{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
