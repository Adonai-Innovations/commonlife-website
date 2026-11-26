import type { Metadata } from "next";

import { ButtonLink } from "@/components/Button";
import { PhoneFrame, Photo } from "@/components/media";
import SiteShell from "@/components/SiteShell";
import UseCases from "@/components/UseCases";
import { COMMONLIFE_APP_URL, SCHEDULE_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Where Faith and Understanding meet Clarity.",
  description:
    "Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.",
};

const questions = [
  "How do I forgive someone?",
  "What does the Bible say about anxiety?",
  "How can I teach kids about prayer?",
  "What does the Bible say about generosity?",
  "How can I strengthen my marriage?",
];

const features = [
  {
    title: "Biblically Sound Answers.",
    body: "Every answer is based on Scripture and verified by scholars and trusted biblical commentaries.",
    src: "/d/app-answers.jpg",
    alt: "CommonLife app showing biblically sound answers",
  },
  {
    title: "Accessible to All.",
    body: "From kids learning their first Bible stories to adults wrestling with faith’s toughest questions, CommonLife meets each person where they are.",
    src: "/d/app-grace.jpg",
    alt: "CommonLife app",
  },
  {
    title: "Seamless Integration.",
    body: "CommonLife can plug directly into your church or Christian school’s existing tech, or operate as a standalone tool for small groups, ministries, or individual users.",
    src: "/d/app-integration.jpg",
    alt: "CommonLife app integrated with a church",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:p-[72px]">
        <div className="flex flex-col gap-7 desktop:flex-row desktop:items-center desktop:gap-20">
          <div className="flex flex-col gap-8 desktop:w-[600px] desktop:shrink-0">
            <h1 className="font-lora text-[42px] leading-[48px] tracking-[-0.02em] md:text-[60px] md:leading-[68px] desktop:text-[80px] desktop:leading-[88px]">
              Where Faith and Understanding meet <em className="italic">Clarity.</em>
            </h1>
            <p className="font-inter text-[17px] leading-7 md:text-[19px] md:leading-[30px] desktop:text-[20px] desktop:leading-8">
              Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary" className="max-md:w-full md:self-start">
                Schedule a Demo
              </ButtonLink>
              <ButtonLink href={COMMONLIFE_APP_URL} variant="secondary" className="max-md:w-full md:self-start">
                CommonLife App
              </ButtonLink>
            </div>
          </div>
          <Photo
            src="/d/coffee-bible.jpg"
            alt="Coffee and an open Bible"
            priority
            className="h-[280px] rounded-2xl md:h-[400px] md:rounded-[20px] desktop:h-[600px] desktop:min-w-0 desktop:flex-1 desktop:rounded-3xl"
          />
        </div>
      </section>

      <div className="flex flex-col gap-3 md:gap-4 desktop:flex-row desktop:gap-6">
        <article className="flex flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-6 py-8 md:gap-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
          <h2 className="font-lora text-2xl font-semibold leading-8 tracking-[-0.12px] md:text-[28px] md:leading-9 desktop:text-[30px] desktop:leading-[38px] desktop:tracking-[-0.15px]">
            What is CommonLife?
          </h2>
          <p className="font-inter text-base leading-[26px] desktop:text-[17px] desktop:leading-7">
            CommonLife is a Christian AI resource that helps people explore and live Scripture confidently. Built on biblically verified sources, it ensures all responses align with the Word.
          </p>
          <ButtonLink href="/about" variant="secondary" className="max-md:w-full md:self-start">
            About CommonLife
          </ButtonLink>
        </article>
        <article className="flex flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-6 py-8 md:gap-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
          <h2 className="font-lora text-2xl font-semibold leading-8 tracking-[-0.12px] md:text-[28px] md:leading-9 desktop:text-[30px] desktop:leading-[38px] desktop:tracking-[-0.15px]">
            A Safe, Faithful Resource for a Digital World
          </h2>
          <blockquote className="font-lora text-[22px] italic leading-8 desktop:text-[26px] desktop:leading-[38px]">
            “Do not conform to the pattern of this world, but be transformed by the renewing of your mind.”
          </blockquote>
          <p className="font-inter text-[15px] font-semibold text-cl-ocean">Romans 12:2</p>
          <p className="font-inter text-base leading-[26px] desktop:text-[17px] desktop:leading-7">
            Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources, ensuring every response is truth-based for your community’s confidence.
          </p>
        </article>
      </div>

      <section className="flex flex-col items-center gap-6 rounded-3xl bg-cl-deep-ocean px-6 py-8 text-center md:gap-7 md:rounded-[28px] md:p-12 desktop:gap-8 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <h2 className="font-lora text-[32px] leading-[38px] tracking-[-0.32px] text-cl-white md:text-[42px] md:leading-[50px] desktop:text-[52px] desktop:leading-[60px] desktop:tracking-[-0.52px]">
          Built for Real Life.
        </h2>
        <ul className="flex w-full flex-col gap-2.5 md:flex-row md:flex-wrap md:justify-center md:gap-3">
          {questions.map((question) => (
            <li key={question} className="rounded-full border border-cl-sky px-5 py-[11px] text-center font-inter text-base font-medium text-cl-white">
              {question}
            </li>
          ))}
        </ul>
        <ButtonLink href={COMMONLIFE_APP_URL} variant="onColor">
          CommonLife App
        </ButtonLink>
      </section>

      <UseCases />

      <div className="flex flex-col gap-3 md:gap-4 desktop:flex-row desktop:gap-6">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="flex flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-6 pb-6 pt-7 md:rounded-[28px] md:p-10 desktop:gap-8 desktop:rounded-[32px]"
          >
            <h2 className="font-lora text-[22px] font-semibold leading-[30px] tracking-[-0.11px] desktop:text-[26px] desktop:leading-[34px] desktop:tracking-[-0.13px]">
              {feature.title}
            </h2>
            <p className="font-inter text-base leading-[26px]">{feature.body}</p>
            <div className="flex h-[260px] items-end justify-center overflow-hidden rounded-2xl bg-cl-paper pt-7 desktop:h-[300px] desktop:rounded-3xl desktop:pt-12">
              <PhoneFrame
                src={feature.src}
                alt={feature.alt}
                className="h-[359px] w-[170px] rounded-[22px] border-[5px] desktop:h-[381px] desktop:w-[180px] desktop:rounded-[23px]"
              />
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-3xl bg-cl-white px-6 py-8 md:rounded-[28px] md:p-12 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <div className="flex flex-col gap-8 desktop:flex-row desktop:items-center desktop:gap-20">
          <div className="flex flex-col gap-6 desktop:w-[520px] desktop:shrink-0">
            <h2 className="font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] desktop:text-[52px] desktop:leading-[60px] desktop:tracking-[-0.52px]">
              The CommonLife Platform
            </h2>
            <p className="font-lora text-xl italic leading-8">Faith meets technology—built for the Church, powered by truth.</p>
            <p className="font-inter text-base leading-[26px] desktop:text-[17px] desktop:leading-7">
              CommonLife is a Christian AI platform that brings Scripture to life through intelligent, biblically grounded conversation and study tools. It’s more than just a chatbot—it’s a discipleship companion, a Bible study helper, and a teaching resource for modern Christian communities.
            </p>
            <ButtonLink href={COMMONLIFE_APP_URL} variant="primary" className="max-md:w-full md:self-start">
              CommonLife App
            </ButtonLink>
          </div>
          <div className="flex h-[300px] flex-1 items-end justify-center gap-3 overflow-hidden rounded-2xl bg-cl-paper pt-7 desktop:h-[520px] desktop:gap-6 desktop:rounded-3xl desktop:pt-12">
            <PhoneFrame src="/d/app-youth.jpg" alt="CommonLife app share screen" className="h-[280px] w-[132px] rounded-[22px] border-[5px] desktop:h-[465px] desktop:w-[220px] desktop:rounded-[29px] desktop:border-[6px]" />
            <PhoneFrame src="/d/app-mission.jpg" alt="CommonLife app in Spanish" className="h-[280px] w-[132px] rounded-[22px] border-[5px] desktop:h-[465px] desktop:w-[220px] desktop:rounded-[29px] desktop:border-[6px]" />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 rounded-3xl bg-cl-blue px-6 py-8 text-center text-cl-white md:gap-7 md:rounded-[28px] md:p-12 desktop:gap-8 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
        <h2 className="max-w-[900px] font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] desktop:text-[52px] desktop:leading-[60px] desktop:tracking-[-0.52px]">
          Ready to Bring CommonLife to Your Congregation?
        </h2>
        <p className="max-w-[760px] font-inter text-base leading-[26px] desktop:text-[17px] desktop:leading-7">
          CommonLife is fully customizable for church networks, multi-campus ministries, and denominations. Integrate it into your digital ecosystem to empower your community’s growth anytime, anywhere.
        </p>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <ButtonLink href={SCHEDULE_DEMO_URL} variant="onColor" className="max-md:w-full md:self-start">
            Schedule a Demo
          </ButtonLink>
          <ButtonLink href="/contact" variant="onColor" className="max-md:w-full md:self-start">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
