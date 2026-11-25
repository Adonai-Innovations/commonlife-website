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
      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <div className="flex flex-col gap-7 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-20">
          <div className="flex flex-col gap-7 min-[1180px]:w-[560px] min-[1180px]:shrink-0">
            <h1 className="font-lora text-[42px] leading-[48px] tracking-[-0.02em] md:text-[60px] md:leading-[68px] md:tracking-[-1.2px] min-[1180px]:text-[80px] min-[1180px]:leading-[88px] min-[1180px]:tracking-[-1.6px]">
              Our Story
            </h1>
            <p className="font-inter text-[17px] leading-7 md:text-[19px] md:leading-[30px] min-[1180px]:text-[20px] min-[1180px]:leading-8">
              CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
            </p>
          </div>
          <Photo
            src="/d/group-bibles.jpg"
            alt="Bibles open in a group study"
            className="h-[240px] rounded-2xl md:h-[400px] md:rounded-[20px] min-[1180px]:h-[520px] min-[1180px]:min-w-0 min-[1180px]:flex-1 min-[1180px]:rounded-3xl"
          />
        </div>
      </section>

      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <div className="flex flex-col gap-7 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-20">
          <Photo
            src="/d/open-bible.jpg"
            alt="Open Bible"
            className="h-[220px] rounded-2xl md:h-[340px] md:rounded-[20px] min-[1180px]:h-[560px] min-[1180px]:w-[460px] min-[1180px]:shrink-0 min-[1180px]:rounded-3xl"
          />
          <div className="flex flex-col gap-5 font-inter text-[18px] leading-[30px] min-[1180px]:gap-6 min-[1180px]:text-[19px] min-[1180px]:leading-8">
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

      <section className="flex flex-col gap-7 rounded-3xl bg-cl-deep-ocean p-6 text-cl-white md:gap-7 md:rounded-[28px] md:p-12 min-[1180px]:gap-8 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <h2 className="font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] md:tracking-[-0.42px] min-[1180px]:text-[52px] min-[1180px]:leading-[60px] min-[1180px]:tracking-[-0.52px]">
          Our Mission
        </h2>
        <p className="max-w-[1000px] font-lora text-[26px] italic leading-9 md:text-[30px] md:leading-[42px] min-[1180px]:text-[36px] min-[1180px]:leading-[50px]">
          To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
        </p>
        <p className="max-w-[760px] font-inter text-base leading-[26px] text-cl-sky min-[1180px]:text-[17px] min-[1180px]:leading-7">
          Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
        </p>
      </section>

      <PilotBand href="/commonlife-pilot" />
    </SiteShell>
  );
}
