"use client";

import { useState, type FormEvent } from "react";

import { ButtonButton, ButtonLink } from "@/components/Button";
import { DoneBadge, FormAlert, Honeypot, SelectField, TextAreaField, TextField } from "@/components/Fields";
import { CONTACT_TIMELINES } from "@/lib/form-options";
import { DELIVERY_ALERT, FORM_ALERT } from "@/lib/forms";

type Phase = "form" | "validation" | "delivery" | "sent";

function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export default function ContactForm({ preview }: { preview?: "error" | "sent" }) {
  const [phase, setPhase] = useState<Phase>(preview === "sent" ? "sent" : preview === "error" ? "delivery" : "form");
  const [fields, setFields] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const invalid = phase === "validation";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          firstName: text(data, "firstName"),
          lastName: text(data, "lastName"),
          email: text(data, "email"),
          organization: text(data, "organization"),
          message: text(data, "message"),
          timeline: text(data, "timeline"),
          cl_hp: text(data, "cl_hp"),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string; fields?: unknown } | null;
      if (response.ok) {
        setPhase("sent");
        setFields([]);
        return;
      }
      if (payload?.error === DELIVERY_ALERT) {
        setPhase("delivery");
        setFields([]);
        return;
      }
      setPhase("validation");
      setFields(Array.isArray(payload?.fields) ? payload.fields.filter((field) => typeof field === "string") : []);
    } catch {
      setPhase("validation");
      setFields([]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-7 desktop:flex-row desktop:items-start desktop:gap-12">
      <div className="flex flex-col gap-6 px-2 pt-5 desktop:w-[440px] desktop:shrink-0 desktop:pl-6 desktop:pt-14">
        <h1 className="font-lora text-[40px] leading-[46px] tracking-[-0.8px] md:text-[52px] md:leading-[60px] desktop:text-[64px] desktop:leading-[72px] desktop:tracking-[-1.28px]">
          Connect With Us!
        </h1>
        <ButtonLink href="/commonlife-pilot" variant="secondary" className="max-md:w-full md:self-start">
          CommonLife Pilot
        </ButtonLink>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-3xl bg-cl-white px-5 py-7 md:rounded-[28px] md:p-12 desktop:rounded-[32px]">
        {phase === "sent" ? (
          <>
            <DoneBadge />
            <p className="font-lora text-[36px] leading-[44px] tracking-[-0.18px]">Thank you!</p>
          </>
        ) : (
          <form className="relative flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <Honeypot />
            {phase === "delivery" ? <FormAlert>{DELIVERY_ALERT}</FormAlert> : null}
            {invalid ? <FormAlert>{FORM_ALERT}</FormAlert> : null}
            <div className="flex flex-col gap-4 md:flex-row">
              <TextField name="firstName" label="First Name" required autoComplete="given-name" error={invalid && fields.includes("firstName")} />
              <TextField name="lastName" label="Last Name" required autoComplete="family-name" error={invalid && fields.includes("lastName")} />
            </div>
            <TextField name="email" label="Email" type="email" required autoComplete="email" error={invalid && fields.includes("email")} />
            <TextField
              name="organization"
              label="Please describe your Church, Institution, or Business"
              autoComplete="organization"
              error={invalid && fields.includes("organization")}
            />
            <TextAreaField name="message" label="Message" error={invalid && fields.includes("message")} />
            <SelectField
              name="timeline"
              label="What is your desired project timeline?"
              options={CONTACT_TIMELINES}
              error={invalid && fields.includes("timeline")}
            />
            <ButtonButton type="submit" variant="primary" disabled={pending} className="max-md:w-full md:self-start">
              Send
            </ButtonButton>
          </form>
        )}
      </div>
    </div>
  );
}
