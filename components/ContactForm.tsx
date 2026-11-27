"use client";

import { useState, type FormEvent } from "react";

import { ButtonButton, ButtonLink } from "@/components/Button";
import { FormAlert, Honeypot, SelectField, TextAreaField, TextField } from "@/components/Fields";
import { CONTACT_TIMELINES } from "@/lib/form-options";
import { DELIVERY_ALERT, FORM_ALERT } from "@/lib/forms";

type Phase = "form" | "validation" | "delivery" | "sent";

function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export default function ContactForm({ preview }: { preview?: "invalid" | "error" | "sent" }) {
  const [phase, setPhase] = useState<Phase>(preview === "sent" ? "sent" : preview === "error" ? "delivery" : preview === "invalid" ? "validation" : "form");
  const [fields, setFields] = useState<string[]>(preview === "invalid" ? ["firstName", "lastName", "email"] : []);
  const [pending, setPending] = useState(false);
  const invalid = phase === "validation";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    const data = new FormData(event.currentTarget);
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
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-5 py-14 md:px-6 md:py-16 desktop:flex-row desktop:items-start desktop:gap-16 desktop:px-12 desktop:py-20">
      <div className="flex flex-col items-start gap-6 desktop:w-[340px] desktop:shrink-0 desktop:pt-4">
        <h1 className="f-h1-form">Connect With Us!</h1>
        <ButtonLink href="/commonlife-pilot" variant="secondary-light">
          CommonLife Pilot
        </ButtonLink>
      </div>
      <div className="min-w-0 flex-1 rounded-[28px] bg-cl-white px-5 py-7 md:p-10">
        {phase === "sent" ? (
          <h2 className="font-lora text-[28px] font-medium leading-9 desktop:text-[32px] desktop:leading-10">Thank you!</h2>
        ) : (
          <form className="relative flex flex-col gap-5" noValidate onSubmit={onSubmit}>
            <Honeypot />
            {phase === "delivery" ? <FormAlert>{DELIVERY_ALERT}</FormAlert> : null}
            {invalid ? <FormAlert>{FORM_ALERT}</FormAlert> : null}
            <div className="grid gap-4 md:grid-cols-2">
              <TextField name="firstName" label="First Name" required autoComplete="given-name" error={invalid && fields.includes("firstName")} />
              <TextField name="lastName" label="Last Name" required autoComplete="family-name" error={invalid && fields.includes("lastName")} />
            </div>
            <TextField name="email" label="Email" type="email" required autoComplete="email" error={invalid && fields.includes("email")} />
            <TextAreaField name="organization" label="Please describe your Church, Institution, or Business" error={invalid && fields.includes("organization")} />
            <TextAreaField name="message" label="Message" error={invalid && fields.includes("message")} />
            <SelectField name="timeline" label="What is your desired project timeline?" options={CONTACT_TIMELINES} error={invalid && fields.includes("timeline")} />
            <ButtonButton type="submit" variant="primary" disabled={pending} className="self-start">
              Send
            </ButtonButton>
          </form>
        )}
      </div>
    </div>
  );
}
