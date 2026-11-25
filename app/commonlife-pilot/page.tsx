import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { LinkButton } from "@/components/horizon/Button";
import { CheckList, FullSection } from "@/components/horizon/Sections";
import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "The CommonLife Solution",
  description:
    "Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.",
};

const workload = [
  "Weekly sermon preparation",
  "Counseling and care",
  "Staff leadership and operations",
  "Congregational needs throughout the week",
];

const guided = [
  "Respond to common faith and life questions",
  "Reinforce sermon content throughout the week",
  "Capture prayer requests and needs",
  "Provide consistent, accessible engagement",
];

const bio = [
  "Russ Olmon is the founding President of Ministry Advantage, a nonprofit organization focused on equipping churches and pastors to reach their full ministry potential. He founded the organization in 1998 and has worked with over 1,000 churches across the U.S., Canada, and Australia.",
  "Previously, Russ served as a founding and senior pastor in the Dallas area for over a decade before joining Lake Pointe Church, where he helped lead the development of its multi-campus strategy and oversaw multiple campuses and staff teams.",
  "He has spent decades working directly with church leaders on growth, leadership development, and operational effectiveness, with a particular focus on helping pastors navigate the increasing demands of modern ministry.",
];

export default function PilotPage() {
  return (
    <SiteFrame overlay>
      <FullSection image="pew" copyWidth={900} priority hero>
        <h1 className="t-display" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          The CommonLife Solution
        </h1>
        <p className="t-hero-lede" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
        </p>
        <div className="actions" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
          <LinkButton href="/pilot-application" variant="solid">
            Apply to the Pilot
          </LinkButton>
          <LinkButton href="/about">About CommonLife</LinkButton>
        </div>
      </FullSection>

      <section className="solid">
        <div className="split">
          <div className="context-copy">
            <p className="t-context" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.
            </p>
            <p className="t-sky" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.
            </p>
          </div>
          <div>
            <p className="kicker" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              At the same time, most senior and executive pastors are already managing:
            </p>
            <div data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              <CheckList items={workload} />
            </div>
          </div>
        </div>
      </section>

      <FullSection image="coffee-bible" copyWidth={900}>
        <p className="eyebrow" data-reveal="" data-contrast="sky" style={{ "--stagger": 0 } as CSSProperties}>
          The result is a growing gap:
        </p>
        <h2 className="t-h2" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          More demand for guidance
        </h2>
        <h2 className="t-h2" data-reveal="" data-contrast="white" style={{ "--stagger": 2 } as CSSProperties}>
          Less available pastoral capacity
        </h2>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 3 } as CSSProperties}>
          Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.
        </p>
        <h3 className="t-h3" data-reveal="" data-contrast="white" style={{ "--stagger": 4 } as CSSProperties}>
          CommonLife solves this problem.
        </h3>
      </FullSection>

      <section className="solid">
        <div className="split">
          <div className="solution-copy">
            <p className="t-context" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              CommonLife helps churches address this challenge by introducing a new layer of support.
            </p>
            <p className="t-sky" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.
            </p>
          </div>
          <div>
            <p className="kicker" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              It provides your congregation with access to a guided system that can:
            </p>
            <div data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              <CheckList items={guided} />
            </div>
          </div>
        </div>
      </section>

      <FullSection image="open-bible" copyWidth={1000}>
        <p className="eyebrow" data-reveal="" data-contrast="sky" style={{ "--stagger": 0 } as CSSProperties}>
          Trusted by Church Leaders
        </p>
        <p className="t-quote" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
        </p>
        <p className="t-name" data-reveal="" data-contrast="white" style={{ "--stagger": 2 } as CSSProperties}>
          Russ Olmon
        </p>
      </FullSection>

      <section className="solid solid-bio">
        <div className="bio">
          {bio.map((paragraph) => (
            <p className="bio-col" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

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
