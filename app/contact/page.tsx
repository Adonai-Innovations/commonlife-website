import type { Metadata } from "next";

import { ContactForm } from "@/components/horizon/Forms";
import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "Connect With Us!",
  description: "Connect With Us!",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string | string[] }>;
}) {
  const params = await searchParams;
  const state = Array.isArray(params.state) ? params.state[0] : params.state;
  const initial = state === "delivery-error" ? "delivery-error" : state === "sent" ? "sent" : "form";

  return (
    <SiteFrame>
      <section className="form-section">
        <ContactForm initial={initial} />
      </section>
    </SiteFrame>
  );
}
