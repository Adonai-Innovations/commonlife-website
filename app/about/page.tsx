import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide",
};

const story = [
  "We saw a growing problem — people searching for answers online and being met with confusing, misleading, or worldly interpretations of God’s Word. Our team, made up of believers, technologists, educators, and ministry leaders, knew there had to be a better way.",
  "So, we built CommonLife — a Christian AI platform that draws exclusively from verified, Scripture-based sources to help believers grow in knowledge, faith, and wisdom without the noise of the internet.",
  "From pastors preparing sermons, to teachers crafting lessons, to parents guiding their children, CommonLife was created to equip the modern Church with digital tools rooted in biblical truth.",
];

export default function AboutPage() {
  return (
    <main className="bg-clDeepOcean text-clWhite">
      <section className="px-6 py-14 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 min-[1180px]:grid-cols-2 min-[1180px]:gap-16">
          <div>
            <h1 className="font-lora text-[40px] font-medium leading-[46px] tracking-[-0.01em] min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
              Our Story
            </h1>
            <p className="mt-6 max-w-[420px] font-lora text-[22px] leading-[30px] text-clWhite min-[1180px]:text-[28px] min-[1180px]:leading-[38px]">
              CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
            </p>
          </div>
          <figure className="relative h-[280px] overflow-hidden min-[768px]:h-[380px] min-[1180px]:h-[460px]">
            <Image
              src="/homepage-c/photo-group-study.jpg"
              alt="Bibles open in a group study"
              fill
              className="object-cover"
              sizes="(min-width: 1180px) 560px, 100vw"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="px-6 pb-16 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:pb-24">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 min-[1180px]:grid-cols-2 min-[1180px]:gap-10">
          <figure className="relative h-[260px] overflow-hidden min-[768px]:h-[360px] min-[1180px]:h-auto min-[1180px]:min-h-[480px]">
            <Image
              src="/homepage-c/photo-morning-devotion.jpeg"
              alt="An open Bible and a green mug in morning light"
              fill
              className="object-cover object-[center_62%]"
              sizes="(min-width: 1180px) 560px, 100vw"
            />
          </figure>
          <div className="flex flex-col justify-center gap-6 border border-clSky p-6 text-[16px] leading-[26px] text-clSky min-[768px]:p-8 min-[1180px]:p-10 min-[1180px]:text-[19px] min-[1180px]:leading-8">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-16">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="font-lora text-[34px] font-medium leading-10 tracking-[-0.005em] min-[768px]:text-[40px] min-[768px]:leading-[48px] min-[1180px]:text-[48px] min-[1180px]:leading-[56px]">
            Our Mission
          </h2>
          <p className="mt-6 font-lora text-[30px] leading-[38px] tracking-[-0.01em] text-clWhite min-[768px]:text-[44px] min-[768px]:leading-[54px] min-[1180px]:text-[56px] min-[1180px]:leading-[68px]">
            To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
          </p>
          <p className="mx-auto mt-8 max-w-[760px] text-[16px] leading-[26px] text-clSky min-[1180px]:text-[19px] min-[1180px]:leading-8">
            Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border border-clSky p-6 min-[768px]:p-10 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-16 min-[1180px]:p-16">
          <p className="font-lora text-[32px] leading-[38px] tracking-[-0.01em] min-[768px]:text-[40px] min-[768px]:leading-[48px] min-[1180px]:w-[460px] min-[1180px]:shrink-0 min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
            Extend Pastoral Care Beyond Sunday
          </p>
          <div>
            <h2 className="font-lora text-[26px] font-medium leading-8 min-[1180px]:text-[36px] min-[1180px]:leading-[44px]">
              Apply to Become a Pilot Church
            </h2>
            <p className="mt-4 text-[16px] leading-[26px] text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
              This short application helps us understand your church, your current challenges, and which level of support would be the best fit. No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
            </p>
            <Link
              className="mt-8 inline-flex rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite"
              href="/pilot-application"
            >
              Apply to the Pilot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
