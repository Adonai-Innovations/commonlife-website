import type { Metadata } from "next";

import { PilotForm } from "@/components/horizon/Forms";
import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "Apply to Become a Pilot Church",
  description:
    "We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.",
};

export default function PilotApplicationPage() {
  return (
    <SiteFrame>
      <section className="form-section">
        <PilotForm />
      </section>
    </SiteFrame>
  );
}
