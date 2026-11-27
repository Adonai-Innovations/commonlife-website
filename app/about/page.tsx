import type { Metadata } from "next";

import PilotBand from "@/components/PilotBand";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Our Story",
  description: "CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article>
        <section data-reveal className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
          <h1 data-reveal-item className="f-h1 text-cl-deep-ocean">
            Our Story
          </h1>
          <p data-reveal-item className="f-lede text-cl-ocean">
            CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
          </p>
          <p data-reveal-item className="f-body">
            We saw a growing problem — people searching for answers online and being met with confusing, misleading, or worldly interpretations of God’s Word. Our team, made up of believers, technologists, educators, and ministry leaders, knew there had to be a better way.
          </p>
          <p data-reveal-item className="f-body">
            So, we built CommonLife — a Christian AI platform that draws exclusively from verified, Scripture-based sources to help believers grow in knowledge, faith, and wisdom without the noise of the internet.
          </p>
          <p data-reveal-item className="f-body">
            From pastors preparing sermons, to teachers crafting lessons, to parents guiding their children, CommonLife was created to equip the modern Church with digital tools rooted in biblical truth.
          </p>
        </section>
        <section data-reveal className="bg-cl-deep-ocean text-cl-white">
          <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
            <h2 data-reveal-item className="f-h2">
              Our Mission
            </h2>
            <p data-reveal-item className="f-mission">
              To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
            </p>
            <p data-reveal-item className="f-body text-cl-sky">
              Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
            </p>
          </div>
        </section>
        <PilotBand href="/commonlife-pilot" />
      </article>
    </SiteShell>
  );
}
