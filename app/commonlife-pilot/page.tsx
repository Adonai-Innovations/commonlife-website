import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CommonLife Pilot",
  description: "CommonLife helps churches extend pastoral care without increasing staff or workload.",
};

const guidance = [
  "More demand for guidance",
  "Less available pastoral capacity",
];

const pastorLoad = [
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

export default function CommonLifePilotPage() {
  return (
    <main className="bg-clDeepOcean text-clWhite">
      <section className="px-6 py-16 min-[768px]:px-10 min-[1180px]:grid min-[1180px]:grid-cols-2 min-[1180px]:items-center min-[1180px]:gap-16 min-[1180px]:px-[120px] min-[1180px]:py-28">
        <div className="mx-auto max-w-[1200px] min-[1180px]:mx-0">
          <h1 className="font-lora text-[40px] font-medium leading-[46px] tracking-[-0.01em] min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
            The CommonLife Solution
          </h1>
          <p className="mt-6 text-[17px] leading-7 text-clSky">
            Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
          </p>
          <Link className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite" href="/pilot-application">
            Apply to the Pilot
          </Link>
        </div>
        <figure className="relative mx-auto mt-10 h-[420px] w-[220px] overflow-hidden rounded-[34px] ring-8 ring-clOceanCard min-[1180px]:mt-0 min-[1180px]:h-[560px] min-[1180px]:w-[280px]">
          <Image src="/homepage-c/app-screen-grace.jpg" alt="CommonLife conversation about grace" fill className="object-cover" sizes="280px" priority />
        </figure>
      </section>
      <section className="mx-auto flex max-w-[800px] flex-col gap-6 px-6 pb-16 text-[17px] leading-7 text-clSky min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pb-24">
        <p>Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.</p>
        <p>At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.</p>
        <p className="text-clWhite">The result is a growing gap:</p>
        <ul className="list-disc space-y-2 pl-6">
          {guidance.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.</p>
        <p className="font-lora text-[28px] leading-9 text-clWhite">CommonLife solves this problem.</p>
        <p>At the same time, most senior and executive pastors are already managing:</p>
        <ul className="list-disc space-y-2 pl-6">
          {pastorLoad.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>CommonLife helps churches address this challenge by introducing a new layer of support.</p>
        <p>It provides your congregation with access to a guided system that can:</p>
        <ul className="list-disc space-y-2 pl-6">
          {support.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.</p>
      </section>
      <section className="px-6 pb-16 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pb-28">
        <div className="mx-auto max-w-[800px]">
          <h2 className="font-lora text-[32px] font-medium leading-10 min-[1180px]:text-[48px] min-[1180px]:leading-[56px]">Trusted by Church Leaders</h2>
          <blockquote className="mt-8 font-lora text-[24px] leading-9 text-clWhite min-[1180px]:text-[32px] min-[1180px]:leading-[42px]">
            “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
          </blockquote>
          <p className="mt-6 text-[17px] font-semibold text-clWhite">Russ Olmon</p>
          <div className="mt-4 flex flex-col gap-4 text-[17px] leading-7 text-clSky">
            <p>Russ Olmon is the founding President of Ministry Advantage, a nonprofit organization focused on equipping churches and pastors to reach their full ministry potential. He founded the organization in 1998 and has worked with over 1,000 churches across the U.S., Canada, and Australia.</p>
            <p>Previously, Russ served as a founding and senior pastor in the Dallas area for over a decade before joining Lake Pointe Church, where he helped lead the development of its multi-campus strategy and oversaw multiple campuses and staff teams.</p>
            <p>He has spent decades working directly with church leaders on growth, leadership development, and operational effectiveness, with a particular focus on helping pastors navigate the increasing demands of modern ministry.</p>
          </div>
        </div>
      </section>
      <section className="px-6 pb-20 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pb-28">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border border-clSky/30 p-6 min-[768px]:p-10 min-[1280px]:flex-row min-[1280px]:items-center min-[1280px]:gap-16">
          <p className="font-lora text-[32px] leading-10 min-[768px]:text-[44px] min-[768px]:leading-[54px] min-[1280px]:w-[420px] min-[1280px]:text-[56px] min-[1280px]:leading-[64px]">
            Extend Pastoral Care Beyond Sunday
          </p>
          <div>
            <h2 className="font-lora text-[26px] font-medium leading-8 min-[1180px]:text-[36px] min-[1180px]:leading-[44px]">Apply to Become a Pilot Church</h2>
            <p className="mt-4 text-[17px] leading-7 text-clSky">This short application helps us understand your church, your current challenges, and which level of support would be the best fit. No obligation, and no strings attached! Most applications take less than 2 minutes to complete.</p>
            <Link className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite" href="/pilot-application">Apply to the Pilot</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
