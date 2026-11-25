import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The CommonLife Solution",
  description: "CommonLife helps churches extend pastoral care without increasing staff or workload.",
};

const managing = [
  "Weekly sermon preparation",
  "Counseling and care",
  "Staff leadership and operations",
  "Congregational needs throughout the week",
];

const support = [
  "Respond to common faith and life questions",
  "Reinforce sermon content throughout the week",
  "Capture prayer requests and needs",
  "Provide consistent, accessible engagement",
];

const bios = [
  "Russ Olmon is the founding President of Ministry Advantage, a nonprofit organization focused on equipping churches and pastors to reach their full ministry potential. He founded the organization in 1998 and has worked with over 1,000 churches across the U.S., Canada, and Australia.",
  "Previously, Russ served as a founding and senior pastor in the Dallas area for over a decade before joining Lake Pointe Church, where he helped lead the development of its multi-campus strategy and oversaw multiple campuses and staff teams.",
  "He has spent decades working directly with church leaders on growth, leadership development, and operational effectiveness, with a particular focus on helping pastors navigate the increasing demands of modern ministry.",
];

function DashList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] font-medium leading-[26px] text-clWhite min-[1180px]:text-[17px]">
          <span aria-hidden="true">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CommonLifePilotPage() {
  return (
    <main className="bg-clDeepOcean text-clWhite">
      <section className="px-6 pb-8 pt-10 text-center min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pt-16">
        <div className="relative mx-auto h-[460px] w-[230px] min-[1180px]:h-[560px] min-[1180px]:w-[280px]">
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clOcean blur-3xl" aria-hidden="true" />
          <figure className="relative h-full overflow-hidden rounded-[36px] ring-8 ring-clOceanCard">
            <Image src="/homepage-c/app-screen-grace.jpg" alt="CommonLife conversation about grace" fill className="object-cover" sizes="280px" priority />
          </figure>
        </div>
        <h1 className="mx-auto mt-10 max-w-[920px] font-lora text-[40px] font-medium leading-[46px] tracking-[-0.01em] min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
          The CommonLife Solution
        </h1>
        <p className="mx-auto mt-6 max-w-[640px] text-[16px] leading-[26px] text-clSky min-[1180px]:text-[19px] min-[1180px]:leading-[30px]">
          Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
        </p>
        <Link className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite" href="/pilot-application">
          Apply to the Pilot
        </Link>
      </section>

      <section className="mx-auto max-w-[980px] px-6 py-16 text-center min-[768px]:px-10 min-[1180px]:py-24">
        <p className="font-lora text-[30px] leading-[38px] tracking-[-0.01em] min-[768px]:text-[44px] min-[768px]:leading-[54px] min-[1180px]:text-[56px] min-[1180px]:leading-[68px]">
          Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.
        </p>
        <p className="mx-auto mt-8 max-w-[720px] text-[16px] leading-[26px] text-clSky min-[1180px]:text-[20px] min-[1180px]:leading-8">
          At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 min-[768px]:px-10">
        <p className="border-t border-clSky pt-6 text-[16px] font-medium leading-[26px] min-[1180px]:text-[17px] min-[1180px]:leading-7">
          The result is a growing gap:
        </p>
        <p className="mt-8 border-y border-clSky py-4 font-lora text-[34px] font-medium leading-10 tracking-[-0.015em] min-[768px]:text-[48px] min-[768px]:leading-[56px] min-[1180px]:py-6 min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
          More demand for guidance
        </p>
        <p className="border-b border-clSky py-4 font-lora text-[34px] font-medium leading-10 tracking-[-0.015em] text-clSky min-[768px]:text-[48px] min-[768px]:leading-[56px] min-[1180px]:py-6 min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
          Less available pastoral capacity
        </p>
        <div className="mt-8 grid gap-6 min-[1180px]:grid-cols-2 min-[1180px]:items-start">
          <p className="max-w-[360px] text-[16px] leading-[26px] text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
            Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.
          </p>
          <p className="font-lora text-[22px] font-medium leading-[30px] min-[1180px]:text-[28px] min-[1180px]:leading-9">
            CommonLife solves this problem.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-6 px-6 py-16 min-[768px]:px-10 min-[1180px]:grid-cols-2 min-[1180px]:py-20">
        <article className="border border-clSky p-6 min-[1180px]:p-10">
          <h2 className="font-lora text-[24px] font-medium leading-[30px] min-[1180px]:text-[30px] min-[1180px]:leading-[38px]">
            At the same time, most senior and executive pastors are already managing:
          </h2>
          <DashList items={managing} />
        </article>
        <article className="border border-clSky p-6 min-[1180px]:p-10">
          <h2 className="font-lora text-[24px] font-medium leading-[30px] min-[1180px]:text-[30px] min-[1180px]:leading-[38px]">
            CommonLife helps churches address this challenge by introducing a new layer of support.
          </h2>
          <p className="mt-6 text-[16px] leading-[26px] text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
            It provides your congregation with access to a guided system that can:
          </p>
          <DashList items={support} />
          <div className="my-6 h-px bg-clSky" />
          <p className="text-[16px] leading-[26px] min-[1180px]:text-[17px] min-[1180px]:leading-7">
            This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 min-[768px]:px-10 min-[1180px]:pb-24">
        <h2 className="font-lora text-[34px] font-medium leading-10 tracking-[-0.005em] min-[1180px]:text-[48px] min-[1180px]:leading-[56px]">
          Trusted by Church Leaders
        </h2>
        <blockquote className="mt-8 font-lora text-[26px] leading-9 tracking-[-0.005em] min-[1180px]:text-[40px] min-[1180px]:leading-[54px]">
          “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
        </blockquote>
        <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.2em]">Russ Olmon</p>
        <div className="mt-6 grid gap-6 text-[15px] leading-6 text-clSky min-[1180px]:grid-cols-3 min-[1180px]:text-[16px] min-[1180px]:leading-[26px]">
          {bios.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pb-28">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border border-clSky p-6 min-[768px]:p-10 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-16 min-[1180px]:p-16">
          <p className="font-lora text-[32px] leading-[38px] min-[1180px]:w-[460px] min-[1180px]:shrink-0 min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
            Extend Pastoral Care Beyond Sunday
          </p>
          <div>
            <h2 className="font-lora text-[26px] font-medium leading-8 min-[1180px]:text-[36px] min-[1180px]:leading-[44px]">
              Apply to Become a Pilot Church
            </h2>
            <p className="mt-4 text-[16px] leading-[26px] text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
              This short application helps us understand your church, your current challenges, and which level of support would be the best fit. No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
            </p>
            <Link className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite" href="/pilot-application">
              Apply to the Pilot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
