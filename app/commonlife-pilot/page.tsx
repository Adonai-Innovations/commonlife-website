import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import PilotBand from "@/components/PilotBand";
import SiteShell from "@/components/SiteShell";

const managing = [
  "Weekly sermon preparation",
  "Counseling and care",
  "Staff leadership and operations",
  "Congregational needs throughout the week",
];

const gap = ["More demand for guidance", "Less available pastoral capacity"];

const can = [
  "Respond to common faith and life questions",
  "Reinforce sermon content throughout the week",
  "Capture prayer requests and needs",
  "Provide consistent, accessible engagement",
];

export const metadata: Metadata = {
  title: "The CommonLife Solution",
  description:
    "Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.",
};

export default function PilotPage() {
  return (
    <SiteShell>
      <article>
        <section data-reveal className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
          <h1 data-reveal-item className="f-h1">
            The CommonLife Solution
          </h1>
          <p data-reveal-item className="f-lede text-cl-ocean">
            Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
          </p>
          <div data-reveal-item className="flex flex-col items-start gap-3 sm:flex-row">
            <ButtonLink href="/pilot-application" variant="primary">
              Apply to the Pilot
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary-light">
              About CommonLife
            </ButtonLink>
          </div>
          <p data-reveal-item className="f-body">
            Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.
          </p>
          <p data-reveal-item className="f-body">
            At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.
          </p>
          <p data-reveal-item className="f-body">
            At the same time, most senior and executive pastors are already managing:
          </p>
          <ul data-reveal-item className="flex flex-col gap-1">
            {managing.map((item) => (
              <li key={item} className="f-body">
                {item}
              </li>
            ))}
          </ul>
          <p data-reveal-item className="f-body">
            The result is a growing gap:
          </p>
          <ul data-reveal-item className="flex flex-col gap-1">
            {gap.map((item) => (
              <li key={item} className="f-body">
                {item}
              </li>
            ))}
          </ul>
          <p data-reveal-item className="f-body">
            Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.
          </p>
        </section>

        <section data-reveal className="bg-cl-deep-ocean text-cl-white">
          <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
            <h2 data-reveal-item className="f-h2">
              CommonLife solves this problem.
            </h2>
            <p data-reveal-item className="f-body text-cl-sky">
              CommonLife helps churches address this challenge by introducing a new layer of support.
            </p>
            <p data-reveal-item className="f-body text-cl-sky">
              This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.
            </p>
            <p data-reveal-item className="f-body text-cl-sky">
              It provides your congregation with access to a guided system that can:
            </p>
            <ul data-reveal-item className="flex flex-col gap-1">
              {can.map((item) => (
                <li key={item} className="f-body text-cl-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section data-reveal className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
          <h2 data-reveal-item className="f-h2">
            Trusted by Church Leaders
          </h2>
          <blockquote data-reveal-item className="f-mission text-cl-deep-ocean">
            “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
          </blockquote>
          <p data-reveal-item className="font-inter text-[16px] font-semibold leading-6">
            Russ Olmon
          </p>
          <p data-reveal-item className="f-body">
            Russ Olmon is the founding President of Ministry Advantage, a nonprofit organization focused on equipping churches and pastors to reach their full ministry potential. He founded the organization in 1998 and has worked with over 1,000 churches across the U.S., Canada, and Australia.
          </p>
          <p data-reveal-item className="f-body">
            Previously, Russ served as a founding and senior pastor in the Dallas area for over a decade before joining Lake Pointe Church, where he helped lead the development of its multi-campus strategy and oversaw multiple campuses and staff teams.
          </p>
          <p data-reveal-item className="f-body">
            He has spent decades working directly with church leaders on growth, leadership development, and operational effectiveness, with a particular focus on helping pastors navigate the increasing demands of modern ministry.
          </p>
        </section>
        <PilotBand href="/pilot-application" />
      </article>
    </SiteShell>
  );
}
