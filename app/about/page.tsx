import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { LinkButton } from "@/components/horizon/Button";
import { FullSection } from "@/components/horizon/Sections";
import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "Our Story",
  description: "CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide",
};

export default function AboutPage() {
  return (
    <SiteFrame overlay>
      <FullSection image="bibles-group" copyWidth={900} priority hero>
        <h1 className="t-display" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          Our Story
        </h1>
        <p className="t-about-lede" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
        </p>
      </FullSection>

      <section className="solid">
        <div className="story">
          <div className="story-lede">
            <p className="t-story" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              We saw a growing problem — people searching for answers online and being met with confusing, misleading, or worldly interpretations of God’s Word. Our team, made up of believers, technologists, educators, and ministry leaders, knew there had to be a better way.
            </p>
          </div>
          <div className="story-body">
            <p className="t-body" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              So, we built CommonLife — a Christian AI platform that draws exclusively from verified, Scripture-based sources to help believers grow in knowledge, faith, and wisdom without the noise of the internet.
            </p>
            <p className="t-body" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
              From pastors preparing sermons, to teachers crafting lessons, to parents guiding their children, CommonLife was created to equip the modern Church with digital tools rooted in biblical truth.
            </p>
          </div>
        </div>
      </section>

      <FullSection image="light-rays" copyWidth={900}>
        <h2 className="t-h2" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          Our Mission
        </h2>
        <p className="t-mission" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
        </p>
        <p className="t-sky" data-reveal="" data-contrast="sky" style={{ "--stagger": 2 } as CSSProperties}>
          Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
        </p>
      </FullSection>

      <section className="solid band">
        <h2 className="t-h2">Apply to Become a Pilot Church</h2>
        <p className="t-body">This short application helps us understand your church, your current challenges, and which level of support would be the best fit.</p>
        <LinkButton href="/pilot-application" variant="solid">
          Apply to the Pilot
        </LinkButton>
        <p className="t-note">No obligation, and no strings attached! Most applications take less than 2 minutes to complete.</p>
      </section>
    </SiteFrame>
  );
}
