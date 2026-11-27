import type { ReactNode } from "react";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink } from "@/components/Button";
import { SCHEDULE_DEMO_URL } from "@/lib/links";

const QUESTIONS = [
  "How do I forgive someone?",
  "What does the Bible say about anxiety?",
  "How can I teach kids about prayer?",
  "What does the Bible say about generosity?",
  "How can I strengthen my marriage?",
] as const;

const CAPABILITIES = [
  {
    title: "Biblically Sound Answers.",
    body: "Every answer is based on Scripture and verified by scholars and trusted biblical commentaries.",
  },
  {
    title: "Accessible to All.",
    body: "From kids learning their first Bible stories to adults wrestling with faith’s toughest questions, CommonLife meets each person where they are.",
  },
  {
    title: "Seamless Integration.",
    body: "CommonLife can plug directly into your church or Christian school’s existing tech, or operate as a standalone tool for small groups, ministries, or individual users.",
  },
] as const;

function Progress({ index, fraction }: { index: string; fraction: string }) {
  return (
    <div className="flex items-center gap-4 desktop:w-[61px] desktop:flex-col desktop:gap-3">
      <p className="font-inter text-[12px] font-semibold leading-4 tracking-[0.08em] text-cl-sky desktop:text-[13px]">{index}</p>
      <div className="progress-track">
        <div data-fill className="progress-fill" style={{ ["--fill" as string]: fraction }} />
      </div>
    </div>
  );
}

function Hairline() {
  return (
    <div className="px-5 md:px-6 desktop:px-12">
      <div className="h-0.5">
        <div data-hairline className="h-0.5 origin-left bg-cl-white" />
      </div>
    </div>
  );
}

function Photo({ src, alt, tall = false }: { src: string; alt: string; tall?: boolean }) {
  return (
    <div className={`relative mt-6 h-[220px] overflow-hidden bg-cl-ocean-card desktop:mt-0 desktop:h-auto desktop:w-[34%] desktop:max-w-[420px] desktop:shrink-0 ${tall ? "desktop:aspect-[420/620]" : "desktop:aspect-[420/560]"}`}>
      <div data-parallax className="absolute inset-[-4%]">
        <Image src={src} alt={alt} fill priority={tall} sizes="(min-width: 1180px) 420px, 100vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgb(6 47 69 / 0.45)" }} />
    </div>
  );
}

function Chapter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-chapter className={`flex min-h-[100svh] flex-col bg-cl-deep-ocean pt-16 text-cl-white desktop:pt-20 ${className}`}>
      <Hairline />
      <div className="flex flex-1 flex-col justify-center px-5 py-8 md:px-6 desktop:flex-row desktop:items-center desktop:gap-12 desktop:px-12 desktop:py-10">
        {children}
      </div>
    </section>
  );
}

export default function HomeStory() {
  return (
    <>
      <Header tone="dark" fixed />
      <main id="main">
        <Chapter>
          <Progress index="01  /  06" fraction="16.666%" />
          <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[680px] desktop:gap-7">
            <h1 data-story-in data-beat="0" className="f-home-h1">
              Where Faith and Understanding meet Clarity.
            </h1>
            <p data-story-in data-beat="0.10" className="f-home-lead text-cl-sky">
              Whether you’re studying the Bible, preparing a sermon, teaching a class, or just looking for guidance in daily life, CommonLife provides instant, trustworthy, Bible-based insight—all in plain, understandable language.
            </p>
            <div data-story-in data-beat="0.25" className="flex flex-col items-start gap-3 desktop:flex-row desktop:gap-4">
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary">
                Schedule a Demo
              </ButtonLink>
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="secondary-dark">
                CommonLife App
              </ButtonLink>
            </div>
            <a data-story-in data-beat="0.35" href="#chapter-02" className="inline-flex size-6 text-cl-white" aria-label="Next chapter">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <Photo src="/f/hero.jpg" alt="Light breaking through a cave opening" tall />
        </Chapter>

        <Chapter>
          <div id="chapter-02" className="flex w-full flex-col desktop:contents">
            <Progress index="02  /  06" fraction="33.333%" />
            <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[840px] desktop:gap-7">
              <h2 data-story-in data-beat="0" className="f-home-h2">
                What is CommonLife?
              </h2>
              <p data-story-in data-beat="0.10" className="f-home-body">
                CommonLife is a Christian AI resource that helps people explore and live Scripture confidently. Built on biblically verified sources, it ensures all responses align with the Word.
              </p>
              <div data-story-in data-beat="0.25">
                <ButtonLink href="/about" variant="primary">
                  About CommonLife
                </ButtonLink>
              </div>
            </div>
          </div>
        </Chapter>

        <Chapter>
          <Progress index="03  /  06" fraction="50%" />
          <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[680px] desktop:gap-7">
            <h2 data-story-in data-beat="0" className="f-home-h2">
              A Safe, Faithful Resource for a Digital World
            </h2>
            <blockquote data-story-in data-beat="0.12" data-verse className="f-scripture">
              “Do not conform to the pattern of this world, but be transformed by the renewing of your mind.”
            </blockquote>
            <p data-story-in data-beat="0.22" data-verse className="font-inter text-[12px] font-semibold leading-4 tracking-[0.12em] text-cl-sky desktop:text-[13px]">
              Romans 12:2
            </p>
            <p data-story-in data-beat="0.32" className="f-home-body">
              Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources, ensuring every response is truth-based for your community’s confidence.
            </p>
          </div>
          <Photo src="/f/coffee-bible.jpg" alt="Coffee and an open Bible" />
        </Chapter>

        <Chapter>
          <Progress index="04  /  06" fraction="66.666%" />
          <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[840px] desktop:gap-7">
            <h2 data-story-in data-beat="0" className="f-home-h2">
              Built for Real Life.
            </h2>
            <ul className="flex flex-col gap-2.5 desktop:flex-row desktop:flex-wrap desktop:gap-3">
              {QUESTIONS.map((question, index) => (
                <li
                  key={question}
                  data-story-in
                  data-chip
                  data-beat={String(0.2 + index * 0.08)}
                  className="rounded-full border border-cl-sky px-4 py-2.5 text-center font-inter text-[15px] font-medium leading-[22px] text-cl-white desktop:text-left"
                >
                  {question}
                </li>
              ))}
            </ul>
            <div data-story-in data-beat="0.62">
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary">
                CommonLife App
              </ButtonLink>
            </div>
          </div>
        </Chapter>

        <Chapter>
          <Progress index="05  /  06" fraction="83.333%" />
          <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[680px] desktop:gap-7">
            <h2 data-story-in data-beat="0" className="f-home-h2">
              The CommonLife Platform
            </h2>
            <p data-story-in data-beat="0.10" className="f-home-lead text-cl-sky">
              Faith meets technology—built for the Church, powered by truth.
            </p>
            <p data-story-in data-beat="0.18" className="f-home-body">
              CommonLife is a Christian AI platform that brings Scripture to life through intelligent, biblically grounded conversation and study tools. It’s more than just a chatbot—it’s a discipleship companion, a Bible study helper, and a teaching resource for modern Christian communities.
            </p>
            <div className="flex flex-col gap-4 desktop:gap-5">
              {CAPABILITIES.map((item, index) => (
                <div key={item.title} data-story-in data-beat={String(0.28 + index * 0.08)}>
                  <h3 className="f-cap-title">{item.title}</h3>
                  <p className="mt-1.5 font-inter text-[16px] leading-[26px] text-cl-sky">{item.body}</p>
                </div>
              ))}
            </div>
            <Image
              src="/f/app-answers.jpg"
              alt="Biblically Sound Answers."
              width={180}
              height={381}
              className="h-[381px] w-[180px] rounded-[28px] border-[6px] border-cl-ocean object-cover object-top desktop:hidden"
            />
            <div data-story-in data-beat="0.55">
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary">
                CommonLife App
              </ButtonLink>
            </div>
          </div>
          <div className="hidden desktop:flex desktop:w-[280px] desktop:shrink-0 desktop:justify-center">
            <Image
              src="/f/app-answers.jpg"
              alt="Biblically Sound Answers."
              width={220}
              height={466}
              className="h-[466px] w-[220px] rounded-[32px] border-8 border-cl-ocean object-cover object-top"
            />
          </div>
        </Chapter>

        <Chapter>
          <Progress index="06  /  06" fraction="100%" />
          <div className="mt-6 flex min-w-0 flex-1 flex-col gap-6 desktop:mt-0 desktop:max-w-[840px] desktop:gap-7">
            <h2 data-story-in data-beat="0" className="f-home-h2">
              Ready to Bring CommonLife to Your Congregation?
            </h2>
            <p data-story-in data-beat="0.10" className="f-home-body">
              CommonLife is fully customizable for church networks, multi-campus ministries, and denominations. Integrate it into your digital ecosystem to empower your community’s growth anytime, anywhere.
            </p>
            <div data-story-in data-beat="0.25" className="flex flex-col items-start gap-3 desktop:flex-row desktop:gap-4">
              <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary">
                Schedule a Demo
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary-dark">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Chapter>
      </main>
      <Footer tone="dark" />
    </>
  );
}
