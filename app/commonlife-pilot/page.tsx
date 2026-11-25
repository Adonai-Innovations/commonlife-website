import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { focusRing, h1Class, h2Class, primaryButton, shell } from "@/lib/chrome";
import { marketingRoutes } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "The CommonLife Solution — CommonLife",
  description:
    "Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.",
};

const managing = [
  "Weekly sermon preparation",
  "Counseling and care",
  "Staff leadership and operations",
  "Congregational needs throughout the week",
];

const canDo = [
  "Respond to common faith and life questions",
  "Reinforce sermon content throughout the week",
  "Capture prayer requests and needs",
  "Provide consistent, accessible engagement",
];

export default function CommonLifePilotPage() {
  return (
    <div className="bg-clWhite font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section>
          <div className={`${shell} flex flex-col gap-10 py-16 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="flex max-w-[640px] flex-col gap-8">
              <h1 className={h1Class}>The CommonLife Solution</h1>
              <p className="font-lora text-[18px] leading-7 min-[1180px]:text-[22px] min-[1180px]:leading-[34px]">
                Members of your congregation are increasingly asking AI systems questions that historically would have been directed toward pastors, mentors, or church leadership.
              </p>
              <div className="flex flex-col items-start gap-4 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-7">
                <Link href={marketingRoutes.pilotApplication} className={primaryButton}>
                  Apply to the Pilot
                </Link>
                <Link href={marketingRoutes.about} className={`inline-flex items-center gap-2 font-inter text-base font-semibold text-clBlue ${focusRing}`}>
                  About CommonLife
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/homepage/icon-arrow-right.svg" alt="" width={18} height={18} />
                </Link>
              </div>
            </div>
            <div className="flex h-[480px] w-full items-center justify-center rounded-[4px] border border-clOceanCard bg-clDeepOcean min-[768px]:h-[560px] min-[1180px]:h-[680px] min-[1180px]:flex-1">
              <div className="relative h-[400px] w-[200px] overflow-hidden rounded-[28px] border-8 border-clOceanCard min-[1180px]:h-[592px] min-[1180px]:w-[280px] min-[1180px]:rounded-[34px]">
                <Image src="/homepage/app-screen-grace-0e947b7d.jpg" alt="Grace" fill className="object-cover" sizes="280px" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-clPaper">
          <div className={`${shell} flex flex-col gap-10 py-16 min-[1180px]:flex-row min-[1180px]:items-start min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="flex max-w-[560px] flex-col gap-6">
              <h2 className="font-lora text-[32px] font-bold leading-[42px] tracking-[-0.01em] min-[1180px]:text-[40px] min-[1180px]:leading-[50px]">
                Artificial intelligence is already shaping how people seek answers about faith, morality, relationships, and suffering.
              </h2>
              <p className="text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
                At the same time, members are asking more questions than ever — and increasingly turning to external tools to get answers.
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-inter text-[17px] font-semibold leading-[26px]">
                At the same time, most senior and executive pastors are already managing:
              </p>
              <ul className="mt-5 flex flex-col gap-4">
                {managing.map((item) => (
                  <li key={item} className="font-lora text-[22px] font-semibold leading-[30px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-clDeepOcean/14 bg-clWhite">
          <div className={`${shell} flex flex-col gap-10 py-16 min-[1180px]:py-[120px]`}>
            <p className="font-inter text-[17px] font-semibold leading-[26px]">The result is a growing gap:</p>
            <div className="flex flex-col gap-6 min-[1180px]:flex-row min-[1180px]:gap-24">
              <p className="max-w-[560px] text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
                Hiring additional staff is expensive and time consuming, and scaling pastoral care manually may not be sustainable.
              </p>
              <div className="flex flex-col gap-3">
                <p className="font-lora text-[26px] font-semibold leading-[34px]">More demand for guidance</p>
                <p className="font-lora text-[26px] font-semibold leading-[34px]">Less available pastoral capacity</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-clWhite">
          <div className={`${shell} flex flex-col gap-8 py-16 min-[1180px]:py-[120px]`}>
            <h2 className={h2Class}>CommonLife solves this problem.</h2>
            <p className="max-w-[760px] text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
              CommonLife helps churches address this challenge by introducing a new layer of support.
            </p>
            <p className="max-w-[760px] text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
              This is not about replacing pastoral leadership. It is about extending it without increasing staff or workload.
            </p>
            <p className="font-inter text-[17px] font-semibold leading-[26px]">
              It provides your congregation with access to a guided system that can:
            </p>
            <ul className="flex flex-col gap-3">
              {canDo.map((item) => (
                <li key={item} className="font-lora text-[22px] font-semibold leading-[30px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-clDeepOcean text-clWhite">
          <figure className={`${shell} flex flex-col gap-8 py-20 min-[1180px]:py-32`}>
            <p className="font-inter text-[17px] font-semibold text-clSky">Trusted by Church Leaders</p>
            <blockquote className="max-w-[1040px] font-lora text-[26px] leading-9 min-[1180px]:text-[40px] min-[1180px]:leading-[52px]">
              “Most pastors don’t need more tools — they need ways to lead and care at scale. CommonLife helps address that in a way that’s actually usable.”
            </blockquote>
            <figcaption className="flex flex-col gap-4">
              <p className="font-inter text-[17px] font-semibold">Russ Olmon</p>
              <p className="max-w-[760px] text-[16px] leading-7 text-clSky">
                Russ Olmon is the founding President of Ministry Advantage, a nonprofit organization focused on equipping churches and pastors to reach their full ministry potential. He founded the organization in 1998 and has worked with over 1,000 churches across the U.S., Canada, and Australia.
              </p>
              <p className="max-w-[760px] text-[16px] leading-7 text-clSky">
                Previously, Russ served as a founding and senior pastor in the Dallas area for over a decade before joining Lake Pointe Church, where he helped lead the development of its multi-campus strategy and oversaw multiple campuses and staff teams.
              </p>
              <p className="max-w-[760px] text-[16px] leading-7 text-clSky">
                He has spent decades working directly with church leaders on growth, leadership development, and operational effectiveness, with a particular focus on helping pastors navigate the increasing demands of modern ministry.
              </p>
            </figcaption>
          </figure>
        </section>

        <section className="bg-clPaper">
          <div className={`${shell} py-16 min-[1180px]:py-[120px]`}>
            <div className="flex max-w-[760px] flex-col gap-6">
              <h2 className={h2Class}>Apply to Become a Pilot Church</h2>
              <p className="text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
                This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
              </p>
              <div className="flex flex-col items-start gap-4 min-[768px]:flex-row min-[768px]:items-center">
                <Link href={marketingRoutes.pilotApplication} className={primaryButton}>
                  Apply to the Pilot
                </Link>
                <p className="max-w-[400px] font-semibold leading-[26px]">
                  No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
