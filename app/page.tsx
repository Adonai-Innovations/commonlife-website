import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import IndexRow from "@/components/IndexRow";
import Navbar from "@/components/Navbar";
import PilotForm from "@/components/PilotForm";
import { marketingRoutes } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Extend Pastoral Care Beyond Sunday — CommonLife",
  description:
    "Church leaders are facing increasing demand for guidance without additional staff or time. The CommonLife Pilot Program helps extend pastoral care, reduce repetitive workload, and support your congregation throughout the week.",
  openGraph: {
    title: "Extend Pastoral Care Beyond Sunday — CommonLife",
    description:
      "The CommonLife Pilot Program helps extend pastoral care, reduce repetitive workload, and support your congregation throughout the week.",
  },
};

const challengeRows = [
  {
    title: "Questions Are Happening Daily, Not Weekly",
    body: "Your congregation is no longer waiting for Sunday. Questions about faith, life, and scripture are happening throughout the week — in real time.",
  },
  {
    title: "Pastoral Capacity Is Already Maxed",
    body: "Senior and executive pastors are operating at full capacity. There is limited time to respond to every question, need, or conversation.",
  },
  {
    title: "People Expect Immediate Guidance",
    body: "When questions arise, people look for answers immediately. If the church is not accessible in that moment, they will look elsewhere.",
  },
  {
    title: "Scaling Through Hiring Is Not Sustainable",
    body: "Adding staff to meet demand is costly and slow. Most churches need a way to extend care and guidance without increasing headcount.",
  },
];

const capabilityRows = [
  {
    title: "Support Pastoral Care Without Adding Workload",
    body: "CommonLife is designed to reduce friction, not create it—supporting pastoral care in a way that fits into existing workflows rather than adding new responsibilities.",
  },
  {
    title: "Reduce Repetitive Pastoral Questions",
    body: "CommonLife handles first-level, recurring questions, allowing pastors to focus on more complex, high-impact conversations that require personal care and discernment.",
  },
  {
    title: "Extend Sermon Impact Beyond Sunday",
    body: "CommonLife allows members to revisit themes, ask follow-up questions, and engage with the message throughout the week—turning a single moment into ongoing discipleship.",
  },
  {
    title: "Provide Immediate Guidance During the Week",
    body: "CommonLife provides a way for members to receive thoughtful, accessible responses when they need them, rather than waiting days to connect with someone at the church.",
  },
  {
    title: "Increase Engagement Without Increasing Staff",
    body: "CommonLife creates a consistent layer of interaction throughout the week, allowing more people to stay connected without requiring additional hires or administrative burden.",
  },
  {
    title: "Gain Visibility Into Real Congregational Needs",
    body: "CommonLife helps surface patterns in prayer requests and questions, giving leadership better insight into the real needs of the church and where to focus attention.",
  },
];

const shell = "mx-auto w-full max-w-[1440px] px-6 min-[1100px]:px-10 min-[1440px]:px-[120px]";

const linkFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue";

export default function HomePage() {
  return (
    <div className="cl-home bg-clWhite font-inter text-clDeepOcean">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-clWhite focus:px-4 focus:py-3 focus:font-inter focus:text-base focus:font-semibold focus:text-clDeepOcean focus:outline-2 focus:outline-offset-2 focus:outline-clBlue"
      >
        Skip to content
      </a>
      <Navbar />

      <main id="main">
        <section className="bg-clWhite" aria-labelledby="hero-heading">
          <div className={`${shell} flex flex-col gap-6 pb-14 pt-6 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-12 min-[1100px]:pb-28 min-[1100px]:pt-24 min-[1280px]:gap-20`}>
            <div className="order-2 flex flex-col gap-6 min-[1100px]:order-1 min-[1100px]:w-[600px] min-[1100px]:shrink-0 min-[1100px]:gap-8">
              <h1
                id="hero-heading"
                className="font-lora text-[40px] font-bold leading-[46px] tracking-[-0.015em] text-clDeepOcean min-[1100px]:text-[76px] min-[1100px]:leading-[84px]"
              >
                Extend Pastoral Care Beyond Sunday
              </h1>
              <p className="font-lora text-[18px] font-normal leading-[28px] text-clDeepOcean min-[1100px]:text-[22px] min-[1100px]:leading-[34px]">
                Church leaders are facing increasing demand for guidance without additional staff or
                time. The CommonLife Pilot Program helps extend pastoral care, reduce repetitive
                workload, and support your congregation throughout the week.
              </p>
              <Link
                href={marketingRoutes.about}
                className={`inline-flex w-fit items-center gap-2 py-[17px] font-inter text-base font-semibold text-clBlue hover:underline hover:underline-offset-4 ${linkFocus}`}
              >
                About CommonLife
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative arrow icon */}
                <img src="/homepage/icon-arrow-right.svg" alt="" width={18} height={18} />
              </Link>
            </div>
            <div className="relative order-1 h-[340px] w-full min-[1100px]:order-2 min-[1100px]:h-[640px] min-[1100px]:min-w-0 min-[1100px]:flex-1">
              <Image
                src="/homepage/photo-mother-and-son-church-pew.jpeg"
                alt="Mother and son in a church pew"
                fill
                priority
                sizes="(min-width: 1100px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-clPaper">
          <div className={`${shell} flex flex-col gap-10 pb-24 pt-[72px] min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:gap-16 min-[1100px]:py-20 min-[1280px]:gap-20 min-[1440px]:py-[120px]`}>
            <p className="font-inter text-base leading-[26px] text-clDeepOcean min-[1100px]:w-[520px] min-[1100px]:shrink-0 min-[1100px]:text-[18px] min-[1100px]:leading-[30px]">
              CommonLife helps churches address this challenge by introducing a new layer of
              support. This is not about replacing pastoral leadership. It is about extending it
              without increasing staff or workload.
            </p>
            <div className="min-w-0 flex-1">
              {challengeRows.map((row) => (
                <IndexRow key={row.title} title={row.title} body={row.body} heading="h2" />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-clWhite">
          <div className={`${shell} py-16 min-[1100px]:py-20 min-[1440px]:py-[120px]`}>
            <div className="grid grid-cols-[4px_minmax(0,1fr)] gap-x-6 gap-y-8 min-[1100px]:max-w-[900px] min-[1100px]:gap-x-10 min-[1100px]:gap-y-6">
              <div
                className="col-start-1 row-start-1 h-[136px] w-1 bg-clAmber min-[1100px]:h-[210px]"
                aria-hidden="true"
              />
              <div className="col-start-2 row-start-1 flex flex-col gap-6">
                <blockquote className="font-lora text-[24px] italic leading-[34px] text-clDeepOcean min-[1100px]:text-[40px] min-[1100px]:leading-[54px]">
                  <p>
                    “Do not conform to the pattern of this world, but be transformed by the renewing
                    of your mind.”
                  </p>
                </blockquote>
                <p className="font-inter text-sm font-semibold text-clAmber min-[1100px]:text-[15px]">
                  Romans 12:2
                </p>
              </div>
              <p className="col-span-2 col-start-1 row-start-2 font-inter text-base leading-[26px] text-clDeepOcean min-[1100px]:col-span-1 min-[1100px]:col-start-2 min-[1100px]:text-[18px] min-[1100px]:leading-[30px]">
                Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian
                sources, ensuring every response is truth-based for your community’s confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-clDeepOcean bg-clWhite" aria-labelledby="product-heading">
          <div className={`${shell} py-16 min-[1100px]:py-20 min-[1440px]:py-[120px]`}>
            <h2
              id="product-heading"
              className="max-w-[760px] font-lora text-[30px] font-bold leading-[38px] tracking-[-0.01em] text-clDeepOcean min-[1100px]:text-[48px] min-[1100px]:leading-[58px]"
            >
              What can CommonLife do for your Church?
            </h2>
            <div className="mt-10 flex flex-col gap-10 min-[1100px]:mt-16 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:gap-16 min-[1280px]:gap-24">
              <div className="flex h-[460px] w-full shrink-0 items-center justify-center rounded-[4px] bg-clDeepOcean min-[1100px]:h-[760px] min-[1100px]:w-[420px]">
                <div className="relative h-[400px] w-[190px] overflow-hidden rounded-[28px] border-8 border-clOceanCard min-[1100px]:h-[634px] min-[1100px]:w-[300px] min-[1100px]:rounded-[36px]">
                  <Image
                    src="/homepage/app-screen-sermon-on-forgiveness.jpeg"
                    alt="Sermon on forgiveness"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                {capabilityRows.map((row) => (
                  <IndexRow key={row.title} title={row.title} body={row.body} heading="h3" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-clDeepOcean text-clWhite">
          <figure className={`${shell} flex flex-col gap-8 py-20 min-[1100px]:gap-10 min-[1100px]:py-32`}>
            <blockquote className="max-w-[1040px] font-lora text-[26px] font-normal leading-[36px] text-clWhite min-[1100px]:text-[44px] min-[1100px]:leading-[60px] min-[1100px]:tracking-[-0.22px]">
              <p>
                “Most pastors don’t need more tools — they need ways to lead and care at scale.
                CommonLife helps address that in a way that’s actually usable.”
              </p>
            </blockquote>
            <figcaption className="flex flex-col gap-1.5">
              <p className="font-inter text-base font-semibold text-clWhite min-[1100px]:text-[17px]">
                Russ Olmon
              </p>
              <p className="font-inter text-[15px] leading-6 text-clSky min-[1100px]:text-base min-[1100px]:leading-[26px]">
                Founding President, Ministry Advantage · worked with over 1,000 churches across the
                U.S., Canada, and Australia
              </p>
            </figcaption>
          </figure>
        </section>

        <section className="bg-clPaper" aria-labelledby="pilot-heading">
          <div className={`${shell} flex flex-col gap-8 pb-[68px] pt-[72px] min-[1100px]:grid min-[1100px]:grid-cols-[480px_minmax(0,1fr)] min-[1100px]:gap-x-16 min-[1100px]:gap-y-6 min-[1100px]:py-20 min-[1280px]:gap-x-24 min-[1440px]:py-[120px]`}>
            <h2
              id="pilot-heading"
              className="font-lora text-[30px] font-bold leading-[38px] tracking-[-0.01em] text-clDeepOcean min-[1100px]:col-start-1 min-[1100px]:text-[48px] min-[1100px]:leading-[58px]"
            >
              Apply to Become a Pilot Church
            </h2>
            <p className="font-inter text-base leading-[26px] text-clDeepOcean min-[1100px]:col-start-1 min-[1100px]:text-[18px] min-[1100px]:leading-[30px]">
              We’re working with a limited number of churches for the pilot. This short application
              helps us understand your church, your current challenges, and which level of support
              would be the best fit.
            </p>
            <p className="order-last font-inter text-[15px] font-semibold leading-6 text-clDeepOcean min-[1100px]:order-none min-[1100px]:col-start-1 min-[1100px]:text-base min-[1100px]:leading-[26px]">
              No obligation, and no strings attached! Most applications take less than 2 minutes to
              complete.
            </p>
            <div className="min-[1100px]:col-start-2 min-[1100px]:row-span-3 min-[1100px]:row-start-1">
              <PilotForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
