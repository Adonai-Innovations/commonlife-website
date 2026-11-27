"use client";

import { useState, type FormEvent } from "react";

import { ButtonButton, ButtonLink } from "@/components/Button";
import { CheckGroup, FormAlert, Honeypot, SelectField, TextAreaField, TextField } from "@/components/Fields";
import { CHALLENGES, CHURCH_SIZES, SERVICES, START_OPTIONS } from "@/lib/form-options";
import { FORM_ALERT } from "@/lib/forms";

const REQUIRED = ["firstName", "lastName", "email", "role", "churchName", "challenges", "services", "timeline"];

type Phase = "form" | "validation" | "submitted";

function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

export default function PilotForm({ preview }: { preview?: "error" | "submitted" }) {
  const [phase, setPhase] = useState<Phase>(preview === "submitted" ? "submitted" : preview === "error" ? "validation" : "form");
  const [fields, setFields] = useState<string[]>(preview === "error" ? REQUIRED : []);
  const [pending, setPending] = useState(false);
  const invalid = phase === "validation";
  const failed = (name: string) => invalid && fields.includes(name);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/pilot-application", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          firstName: text(data, "firstName"),
          lastName: text(data, "lastName"),
          email: text(data, "email"),
          phone: text(data, "phone"),
          role: text(data, "role"),
          churchName: text(data, "churchName"),
          churchSize: text(data, "churchSize"),
          challenges: data.getAll("challenges").filter((value): value is string => typeof value === "string"),
          improve: text(data, "improve"),
          services: data.getAll("services").filter((value): value is string => typeof value === "string"),
          timeline: text(data, "timeline"),
          notes: text(data, "notes"),
          cl_hp: text(data, "cl_hp"),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { fields?: unknown } | null;
      if (response.ok) {
        setPhase("submitted");
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
      <div className="flex flex-col gap-5 desktop:w-[380px] desktop:shrink-0 desktop:pt-2">
        <h1 className="f-h1-form">Apply to Become a Pilot Church</h1>
        <p className="f-body">
          We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
        </p>
        <p className="f-body">No obligation, and no strings attached! Most applications take less than 2 minutes to complete.</p>
      </div>
      <div className="min-w-0 flex-1 rounded-[28px] bg-cl-white px-5 py-7 md:p-10">
        {phase === "submitted" ? (
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-lora text-[28px] font-medium leading-9 desktop:text-[32px] desktop:leading-10">
              Thanks — we’ve received your application.
            </h2>
            <p className="f-body">
              A member of the CommonLife team will review your submission and reach out shortly to discuss next steps and confirm fit for the pilot.
            </p>
            <ButtonLink href="/about" variant="secondary-light">
              About CommonLife
            </ButtonLink>
          </div>
        ) : (
          <form className="relative flex flex-col gap-5" noValidate onSubmit={onSubmit}>
            <Honeypot />
            {invalid ? <FormAlert>{FORM_ALERT}</FormAlert> : null}
            <div className="grid gap-4 md:grid-cols-2">
              <TextField name="firstName" label="First Name" required autoComplete="given-name" error={failed("firstName")} />
              <TextField name="lastName" label="Last Name" required autoComplete="family-name" error={failed("lastName")} />
            </div>
            <TextField name="email" label="Email" type="email" required autoComplete="email" error={failed("email")} />
            <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={failed("phone")} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField name="role" label="Your Role" required autoComplete="organization-title" error={failed("role")} />
              <TextField name="churchName" label="Church Name" required autoComplete="organization" error={failed("churchName")} />
            </div>
            <SelectField name="churchSize" label="Church Size" options={CHURCH_SIZES} error={failed("churchSize")} />
            <CheckGroup
              legend="Which of these challenges are most relevant right now?"
              hint="Check all that apply"
              name="challenges"
              required
              error={failed("challenges")}
              options={CHALLENGES}
            />
            <TextAreaField name="improve" label="What are you hoping to improve most?" error={failed("improve")} />
            <CheckGroup legend="What services are you interested in?" name="services" required error={failed("services")} options={SERVICES} />
            <SelectField
              name="timeline"
              label="When are you looking to get started?"
              required
              options={START_OPTIONS}
              error={failed("timeline")}
            />
            <TextAreaField name="notes" label="Anything else we should know about your church or situation?" error={failed("notes")} />
            <ButtonButton type="submit" variant="primary" disabled={pending} className="self-start">
              Apply for the Pilot
            </ButtonButton>
          </form>
        )}
      </div>
    </div>
  );
}
