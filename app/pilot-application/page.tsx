import type { Metadata } from "next";
import PilotApplicationForm from "@/components/forms/PilotApplicationForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { h2Class, shell } from "@/lib/chrome";

export const metadata: Metadata = {
  title: "Apply to Become a Pilot Church — CommonLife",
  description:
    "We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.",
};

export default function PilotApplicationPage() {
  return (
    <div className="bg-clPaper font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section>
          <div className={`${shell} flex flex-col items-start gap-10 py-16 min-[1180px]:flex-row min-[1180px]:gap-24 min-[1180px]:py-[120px]`}>
            <div className="flex w-full max-w-[480px] shrink-0 flex-col gap-6">
              <h1 className={h2Class}>Apply to Become a Pilot Church</h1>
              <p className="font-inter text-[17px] leading-7 min-[1180px]:text-[18px] min-[1180px]:leading-[30px]">
                We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
              </p>
              <p className="font-inter text-base font-semibold leading-[26px]">
                No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
              </p>
            </div>
            <div className="w-full min-w-0 min-[1180px]:flex-1">
              <PilotApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
