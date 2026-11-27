import type { Metadata } from "next";

import { Photo } from "@/components/media";
import PilotBand from "@/components/PilotBand";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Our Story",
  description: "CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <div className="flex flex-col gap-7 desktop:flex-row desktop:items-center desktop:gap-20">
          <div className="flex flex-col gap-7 desktop:w-[560px] desktop:shrink-0">
            <h1 className="font-lora text-[42px] leading-[48px] tracking-[-0.02em] md:text-[60px] md:leading-[68px] md:tracking-[-1.2px] desktop:text-[80px] desktop:leading-[88px] desktop:tracking-[-1.6px]">
              Our Story
            </h1>
            <p className="font-inter text-[17px] leading-7 md:text-[19px] md:leading-[30px] desktop:text-[20px] desktop:leading-8">
              CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
            </p>
          </div>
          <Photo
            src="/d/group-bibles.jpg"
            alt="Bibles open in a group study"
            className="h-[240px] rounded-2xl md:h-[400px] md:rounded-[20px] desktop:h-[520px] desktop:min-w-0 desktop:flex-1 desktop:rounded-3xl"
          />
        </div>
      </section>

      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <div className="flex flex-col gap-7 desktop:flex-row desktop:items-center desktop:gap-20">
          <Photo
            src="/d/open-bible.jpg"
            alt="Open Bible"
            className="h-[220px] rounded-2xl md:h-[340px] md:rounded-[20px] desktop:h-[560px] desktop:w-[460px] desktop:shrink-0 desktop:rounded-3xl"
          />
          <div className="flex flex-col gap-5 font-inter text-[18px] leading-[30px] desktop:gap-6 desktop:text-[19px] desktop:leading-8">
            <p>
              We saw a growing problem — people searching for answers online and being met with confusing, misleading, or worldly interpretations of God’s Word. Our team, made up of believers, technologists, educators, and ministry leaders, knew there had to be a better way.
            </p>
            <p>
              So, we built CommonLife — a Christian AI platform that draws exclusively from verified, Scripture-based sources to help believers grow in knowledge, faith, and wisdom without the noise of the internet.
            </p>
            <p>
              From pastors preparing sermons, to teachers crafting lessons, to parents guiding their children, CommonLife was created to equip the modern Church with digital tools rooted in biblical truth.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7 rounded-3xl bg-cl-deep-ocean p-6 text-cl-white md:gap-7 md:rounded-[28px] md:p-12 desktop:gap-8 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <h2 className="font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] md:tracking-[-0.42px] desktop:text-[52px] desktop:leading-[60px] desktop:tracking-[-0.52px]">
          Our Mission
        </h2>
        <p className="max-w-[1000px] font-lora text-[26px] italic leading-9 md:text-[30px] md:leading-[42px] desktop:text-[36px] desktop:leading-[50px]">
          To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
        </p>
        <p className="max-w-[760px] font-inter text-base leading-[26px] text-cl-sky desktop:text-[17px] desktop:leading-7">
          Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
        </p>
      </section>

      <PilotBand href="/commonlife-pilot" />
    </SiteShell>
  );
}
