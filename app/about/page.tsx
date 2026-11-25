import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { h1Class, h2Class, primaryButton, shell } from "@/lib/chrome";
import { marketingRoutes } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Our Story — CommonLife",
  description: "CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide",
};

export default function AboutPage() {
  return (
    <div className="bg-clWhite font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section className="bg-clWhite">
          <div className={`${shell} flex flex-col gap-10 py-16 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="flex max-w-[600px] flex-col gap-7">
              <h1 className={h1Class}>Our Story</h1>
              <p className="font-lora text-[18px] leading-7 min-[768px]:text-[20px] min-[768px]:leading-8 min-[1180px]:text-[22px] min-[1180px]:leading-[34px]">
                CommonLife, founded in 2024, makes biblically accurate wisdom accessible worldwide
              </p>
            </div>
            <div className="relative h-[320px] w-full min-[768px]:h-[420px] min-[1180px]:h-[560px] min-[1180px]:flex-1">
              <Image
                src="/homepage/photo-bibles-open-in-a-group-study-37313b0c.jpg"
                alt="Bibles open in a group study"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1180px) 560px, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="bg-clPaper">
          <div className={`${shell} flex flex-col gap-10 py-16 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="relative h-[360px] w-full min-[768px]:h-[480px] min-[1180px]:h-[600px] min-[1180px]:w-[480px] min-[1180px]:shrink-0">
              <Image
                src="/homepage/photo-open-bible-22617a4f.jpg"
                alt="Open Bible"
                fill
                className="object-cover"
                sizes="(min-width: 1180px) 480px, 100vw"
              />
            </div>
            <div className="flex flex-col gap-7 font-inter text-[17px] leading-7 min-[1180px]:text-[20px] min-[1180px]:leading-[34px]">
              <p>
                We saw a growing problem — people searching for answers online and being met with confusing, misleading, or worldly interpretations of God’s Word. Our team, made up of believers, technologists, educators, and ministry leaders, knew there had to be a better way.
              </p>
              <p>
                So, we built CommonLife — a Christian AI platform that draws exclusively from verified, Scripture-based sources to help believers grow in knowledge, faith, and wisdom without the noise of the internet.
              </p>
              <p>
                From pastors preparing sermons, to teachers crafting lessons, to parents guiding their children, CommonLife was created to equip the modern Church with digital tools rooted in biblical truth.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-clDeepOcean text-clWhite">
          <div className={`${shell} flex max-w-none flex-col gap-9 py-20 min-[1180px]:py-32`}>
            <h2 className="font-lora text-[30px] font-bold leading-[38px] tracking-[-0.01em] min-[768px]:text-[40px] min-[768px]:leading-[48px] min-[1180px]:text-[48px] min-[1180px]:leading-[58px]">
              Our Mission
            </h2>
            <p className="max-w-[1040px] font-lora text-[28px] leading-10 min-[1180px]:text-[40px] min-[1180px]:leading-[56px]">
              To make biblically correct wisdom accessible to every believer through technology that uplifts truth, clarity, and understanding — helping people live a CommonLife rooted in Christ.
            </p>
            <p className="max-w-[760px] font-inter text-[17px] leading-7 text-clSky min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
              Every response our platform gives, every lesson it helps create, and every question it answers is built on that foundation. We believe that technology should serve the Gospel, not the other way around.
            </p>
          </div>
        </section>

        <section className="bg-clPaper">
          <div className={`${shell} py-16 min-[1180px]:py-[120px]`}>
            <div className="flex max-w-[760px] flex-col gap-6">
              <h2 className={h2Class}>Apply to Become a Pilot Church</h2>
              <p className="font-inter text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
                This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
              </p>
              <div className="flex flex-col items-start gap-4 pt-2 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-7">
                <Link href={marketingRoutes.pilotApplication} className={primaryButton}>
                  Apply to the Pilot
                </Link>
                <p className="max-w-[400px] font-inter text-base font-semibold leading-[26px]">
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
