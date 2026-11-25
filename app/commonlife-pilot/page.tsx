import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { IconCheck } from "@/components/icons";
import { PhoneFrame } from "@/components/media";
import PilotBand from "@/components/PilotBand";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "The CommonLife Solution",
  description:
    "Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.",
};

const managing = [
  "Weekly sermon preparation",
  "Counseling and care",
  "Staff leadership and operations",
  "Congregational needs throughout the week",
];

const abilities = [
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
    <SiteShell>
      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <div className="flex flex-col gap-8 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-20">
          <div className="flex flex-col gap-8 min-[1180px]:w-[620px] min-[1180px]:shrink-0">
            <h1 className="font-lora text-[42px] leading-[48px] tracking-[-0.02em] md:text-[60px] md:leading-[68px] min-[1180px]:text-[80px] min-[1180px]:leading-[88px]">
              The CommonLife <em className="italic">Solution</em>
            </h1>
            <p className="font-inter text-[17px] leading-7 md:text-[19px] md:leading-[30px] min-[1180px]:text-[20px] min-[1180px]:leading-8">
              Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <ButtonLink href="/pilot-application" variant="primary" className="max-md:w-full md:self-start">
                Apply to the Pilot
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" className="max-md:w-full md:self-start">
                About CommonLife
              </ButtonLink>
            </div>
          </div>
          <div className="flex h-[360px] flex-1 items-end justify-center overflow-hidden rounded-2xl bg-cl-paper pt-8 md:h-[440px] md:rounded-[20px] min-[1180px]:h-[560px] min-[1180px]:rounded-3xl min-[1180px]:pt-12">
            <PhoneFrame
              src="/d/app-grace.jpg"
              alt="CommonLife app"
              className="h-[420px] w-[200px] rounded-[28px] border-[6px] min-[1180px]:h-[550px] min-[1180px]:w-[260px] min-[1180px]:rounded-[34px] min-[1180px]:border-[7px]"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 md:gap-4 min-[1180px]:flex-row min-[1180px]:gap-6">
        <article className="flex flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-6 py-8 md:gap-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
          <h2 className="font-lora text-2xl font-semibold leading-8 tracking-[-0.12px] md:text-[28px] md:leading-9 min-[1180px]:text-[30px] min-[1180px]:leading-[38px] min-[1180px]:tracking-[-0.15px]">
            Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.
          </h2>
          <p className="font-inter text-base leading-[26px] min-[1180px]:text-[17px] min-[1180px]:leading-7">
            At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.
          </p>
        </article>
        <article className="flex flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-6 py-8 md:gap-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
          <p className="font-inter text-[17px] font-semibold leading-[26px]">
            At the same time, most senior and executive pastors are already managing:
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {managing.map((item) => (
              <li key={item} className="rounded-full bg-cl-paper px-5 py-[11px] font-inter text-base font-medium text-cl-deep-ocean">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <section className="flex flex-col gap-6 rounded-3xl bg-cl-deep-ocean px-6 py-8 md:gap-7 md:rounded-[28px] md:p-12 min-[1180px]:gap-8 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <p className="font-inter text-[17px] font-semibold leading-[26px] text-cl-sky">The result is a growing gap:</p>
        <p className="font-lora text-[40px] leading-[48px] tracking-[-0.6px] text-cl-white md:text-[52px] md:leading-[60px] min-[1180px]:text-[64px] min-[1180px]:leading-[72px] min-[1180px]:tracking-[-0.96px]">
          More demand for guidance
        </p>
        <p className="font-lora text-[40px] leading-[48px] tracking-[-0.6px] text-cl-white md:text-[52px] md:leading-[60px] min-[1180px]:text-[64px] min-[1180px]:leading-[72px] min-[1180px]:tracking-[-0.96px]">
          Less available pastoral capacity
        </p>
        <div className="flex flex-col gap-6 min-[1180px]:flex-row min-[1180px]:gap-20">
          <p className="font-inter text-base leading-[26px] text-cl-sky min-[1180px]:w-[560px] min-[1180px]:shrink-0 min-[1180px]:text-[17px] min-[1180px]:leading-7">
            Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.
          </p>
          <p className="font-lora text-[24px] italic leading-8 text-cl-white min-[1180px]:text-[28px] min-[1180px]:leading-9">
            CommonLife solves this problem.
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <div className="flex flex-col gap-8 min-[1180px]:flex-row min-[1180px]:gap-20">
          <div className="flex flex-col gap-6 min-[1180px]:w-[520px] min-[1180px]:shrink-0">
            <h2 className="font-lora text-2xl font-semibold leading-8 tracking-[-0.12px] md:text-[28px] md:leading-9 min-[1180px]:text-[30px] min-[1180px]:leading-[38px] min-[1180px]:tracking-[-0.15px]">
              CommonLife helps churches address this challenge by introducing a new layer of support.
            </h2>
            <p className="font-inter text-[17px] leading-7 md:text-[19px] md:leading-8 min-[1180px]:text-xl min-[1180px]:leading-8">
              This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="font-inter text-[17px] font-semibold leading-[26px]">
              It provides your congregation with access to a guided system that can:
            </p>
            {abilities.map((item) => (
              <div key={item} className="flex items-start gap-3.5 rounded-2xl bg-cl-paper px-5 py-4">
                <IconCheck className="size-[22px] shrink-0 text-cl-blue" />
                <p className="font-inter text-[17px] font-medium leading-[26px]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl bg-cl-deep-ocean px-6 py-8 md:gap-8 md:rounded-[28px] md:p-12 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
        <h2 className="font-lora text-2xl font-semibold leading-8 tracking-[-0.12px] text-cl-white md:text-[28px] md:leading-9 min-[1180px]:text-[30px] min-[1180px]:leading-[38px]">
          Trusted by Church Leaders
        </h2>
        <blockquote className="max-w-[1040px] font-lora text-[26px] italic leading-9 text-cl-white md:text-[28px] md:leading-10 min-[1180px]:text-[32px] min-[1180px]:leading-[46px]">
          “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
        </blockquote>
        <p className="font-inter text-[17px] font-semibold text-cl-white">Russ Olmon</p>
        <div className="flex flex-col gap-4 min-[1180px]:flex-row min-[1180px]:gap-6">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="flex-1 rounded-[20px] bg-cl-ocean-card p-6 font-inter text-[15px] leading-6 text-cl-white">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PilotBand href="/pilot-application" />
    </SiteShell>
  );
}
