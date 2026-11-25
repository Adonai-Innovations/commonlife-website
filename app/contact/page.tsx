import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { focusRing, shell } from "@/lib/chrome";
import { marketingRoutes } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Connect With Us! — CommonLife",
  description: "Connect With Us!",
};

export default function ContactPage() {
  return (
    <div className="bg-clPaper font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section>
          <div className={`${shell} flex flex-col items-start gap-10 py-16 min-[1180px]:flex-row min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="flex w-full max-w-[440px] shrink-0 flex-col gap-6">
              <h1 className="font-lora text-[40px] font-bold leading-[46px] tracking-[-0.015em] min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1180px]:text-[64px] min-[1180px]:leading-[72px]">
                Connect With Us!
              </h1>
              <Link
                href={marketingRoutes.pilot}
                className={`inline-flex w-fit items-center gap-2 py-[17px] font-inter text-base font-semibold text-clBlue hover:underline hover:underline-offset-4 ${focusRing}`}
              >
                CommonLife Pilot
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative arrow */}
                <img src="/homepage/icon-arrow-right.svg" alt="" width={18} height={18} />
              </Link>
            </div>
            <div className="w-full min-w-0 min-[1180px]:flex-1">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
