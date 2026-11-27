import type { Metadata } from "next";

import PilotForm from "@/components/PilotForm";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Apply to Become a Pilot Church",
  description:
    "We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.",
};

export default async function PilotApplicationPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string | string[] }>;
}) {
  const params = await searchParams;
  const state = Array.isArray(params.state) ? params.state[0] : params.state;
  const preview = state === "error" || state === "submitted" ? state : undefined;

  return (
    <SiteShell>
      <PilotForm preview={preview} />
    </SiteShell>
  );
}
