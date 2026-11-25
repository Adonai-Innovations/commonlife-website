"use client";

import { useState } from "react";
import { CONTACT_ERRORS } from "@/lib/contact-fields";
import { TIMELINE_OPTIONS } from "@/lib/form-schemas";
import { primaryButton } from "@/lib/chrome";
import { FormAlert, SelectField, TextAreaField, TextField } from "@/components/forms/Fields";

export default function ContactForm() {
  const [status, setStatus] = useState<"form" | "error" | "sent">("form");
  const [fields, setFields] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          organization: data.get("organization") ?? "",
          message: data.get("message") ?? "",
          timeline: data.get("timeline") ?? "",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; fields?: string[] };
      if (payload.ok) {
        setStatus("sent");
        setFields([]);
        return;
      }
      setFields(payload.fields ?? []);
      setStatus("error");
    } catch {
      setFields([]);
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[4px] border border-clDeepOcean bg-clWhite p-8 min-[1180px]:p-12">
        <p className="font-lora text-[40px] font-bold leading-[48px] text-clDeepOcean min-[1180px]:text-[48px] min-[1180px]:leading-[58px]">
          Thank you!
        </p>
      </div>
    );
  }

  const invalid = (name: string) => fields.includes(name);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-[4px] border border-clDeepOcean bg-clWhite p-6 min-[768px]:p-8 min-[1180px]:p-12">
      {status === "error" ? <FormAlert>{CONTACT_ERRORS.delivery}</FormAlert> : null}
      <div className="flex flex-col gap-5 min-[768px]:flex-row">
        <TextField id="contact-first" name="firstName" label="First Name" required autoComplete="given-name" error={invalid("firstName")} />
        <TextField id="contact-last" name="lastName" label="Last Name" required autoComplete="family-name" error={invalid("lastName")} />
      </div>
      <TextField id="contact-email" name="email" label="Email" type="email" required autoComplete="email" error={invalid("email")} />
      <TextField id="contact-org" name="organization" label="Please describe your Church, Institution, or Business" autoComplete="organization" />
      <TextAreaField id="contact-message" name="message" label="Message" />
      <SelectField id="contact-timeline" name="timeline" label="What is your desired project timeline?" options={TIMELINE_OPTIONS} />
      <button type="submit" className={`${primaryButton} w-fit`} disabled={pending}>
        Send
      </button>
    </form>
  );
}
