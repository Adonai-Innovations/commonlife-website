import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Connect With Us!",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string | string[] }>;
}) {
  const params = await searchParams;
  const state = Array.isArray(params.state) ? params.state[0] : params.state;
  const preview = state === "error" || state === "sent" ? state : undefined;

  return (
    <SiteShell>
      <ContactForm preview={preview} />
    </SiteShell>
  );
}
