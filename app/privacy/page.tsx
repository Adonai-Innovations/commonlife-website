import type { Metadata } from "next";

import SiteShell from "@/components/SiteShell";
import { privacyBlocks, type PrivacyBlock } from "@/lib/privacy-blocks";

export const metadata: Metadata = {
  title: "Adonai Innovations, LLC — CommonLife Privacy Policy",
  robots: { index: false, follow: false },
};

function Block({ block }: { block: PrivacyBlock }) {
  if (block.kind === "h2") {
    return <h2 className="pt-2 font-lora text-[24px] font-semibold leading-8 desktop:text-[28px] desktop:leading-9">{block.text}</h2>;
  }
  if (block.kind === "h3") {
    return <h3 className="font-lora text-[18px] font-semibold leading-7 desktop:text-[21px] desktop:leading-[30px]">{block.text}</h3>;
  }
  if (block.kind === "ul") {
    return (
      <ul className="flex flex-col gap-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[10px] size-[7px] shrink-0 rounded-full bg-cl-blue" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.kind === "lead") {
    return (
      <p>
        <strong className="font-semibold">{block.strong}</strong>
        {block.rest}
      </p>
    );
  }
  if (block.kind === "p") {
    if (block.text.includes("\n")) {
      return (
        <p>
          {block.text.split("\n").map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
      );
    }
    return <p>{block.text}</p>;
  }
  return null;
}

export default function PrivacyPage() {
  const [badge, title, effective, ...rest] = privacyBlocks;
  if (!badge || badge.kind !== "badge" || !title || title.kind !== "title" || !effective || effective.kind !== "effective") {
    return null;
  }

  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-[920px] px-5 py-12 md:px-6 md:py-16 desktop:py-20">
        <div className="flex flex-col gap-5 rounded-[28px] bg-cl-white px-6 py-8 font-inter text-[16px] leading-[27px] text-cl-deep-ocean md:px-10 md:py-12 desktop:px-16 desktop:py-16">
          <p className="w-fit rounded-full bg-cl-paper px-3.5 py-1.5 font-inter text-[13px] font-semibold leading-none">{badge.text}</p>
          <h1 className="font-lora text-[32px] font-normal leading-10 tracking-[-0.01em] desktop:text-[48px] desktop:leading-[58px]">
            {title.text}
          </h1>
          <p className="font-inter text-[15px] leading-[22px] text-cl-ocean">{effective.text}</p>
          {rest.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
