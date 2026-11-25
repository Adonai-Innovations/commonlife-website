"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_ERRORS } from "@/lib/contact-fields";
import { CHALLENGE_OPTIONS, CHURCH_SIZES, SERVICE_OPTIONS, START_OPTIONS } from "@/lib/form-schemas";
import { primaryButton } from "@/lib/chrome";
import { CheckGroup, FormAlert, SelectField, TextAreaField, TextField } from "@/components/forms/Fields";

export default function PilotApplicationForm() {
  const [status, setStatus] = useState<"form" | "error" | "sent">("form");
  const [fields, setFields] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    try {
      const response = await fetch("/api/forms/pilot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone") ?? "",
          role: data.get("role"),
          churchName: data.get("churchName"),
          churchSize: data.get("churchSize") ?? "",
          challenges: data.getAll("challenges"),
          improve: data.get("improve") ?? "",
          services: data.getAll("services"),
          start: data.get("start"),
          anything: data.get("anything") ?? "",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; fields?: string[] };
      if (payload.ok) {
        setStatus("sent");
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
      <div className="flex flex-col gap-4 rounded-[4px] border border-clDeepOcean bg-clWhite p-8 min-[1180px]:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element -- success icon */}
        <img src="/homepage/icon-circle-check.svg" alt="" width={28} height={28} />
        <p className="font-lora text-[30px] font-bold leading-[38px] text-clDeepOcean min-[1180px]:text-[40px] min-[1180px]:leading-[48px]">
          Thanks — we’ve received your application.
        </p>
        <p className="font-inter text-[17px] leading-7 text-clDeepOcean">
          A member of the CommonLife team will review your submission and reach out shortly to discuss next steps and confirm fit for the pilot.
        </p>
        <Link
          href="/about"
          className="inline-flex w-fit items-center gap-2 py-2 font-inter text-base font-semibold text-clBlue hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue"
        >
          About CommonLife
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative arrow */}
          <img src="/homepage/icon-arrow-right.svg" alt="" width={18} height={18} />
        </Link>
      </div>
    );
  }

  const invalid = (name: string) => fields.includes(name);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-[4px] border border-clDeepOcean bg-clWhite p-6 min-[768px]:p-8 min-[1180px]:p-12">
      {status === "error" ? <FormAlert>{CONTACT_ERRORS.invalid}</FormAlert> : null}
      <div className="flex flex-col gap-5 min-[768px]:flex-row">
        <TextField id="pilot-first" name="firstName" label="First Name" required autoComplete="given-name" error={invalid("firstName")} />
        <TextField id="pilot-last" name="lastName" label="Last Name" required autoComplete="family-name" error={invalid("lastName")} />
      </div>
      <TextField id="pilot-email" name="email" label="Email" type="email" required autoComplete="email" error={invalid("email")} />
      <TextField id="pilot-phone" name="phone" label="Phone" type="tel" autoComplete="tel" />
      <div className="flex flex-col gap-5 min-[768px]:flex-row">
        <TextField id="pilot-role" name="role" label="Your Role" required error={invalid("role")} />
        <TextField id="pilot-church" name="churchName" label="Church Name" required error={invalid("churchName")} />
      </div>
      <SelectField id="pilot-size" name="churchSize" label="Church Size" options={CHURCH_SIZES} />
      <CheckGroup
        legend="Which of these challenges are most relevant right now?"
        hint="Check all that apply"
        name="challenges"
        options={CHALLENGE_OPTIONS}
        required
        error={invalid("challenges")}
      />
      <TextAreaField id="pilot-improve" name="improve" label="What are you hoping to improve most?" />
      <CheckGroup
        legend="What services are you interested in?"
        name="services"
        options={SERVICE_OPTIONS}
        required
        error={invalid("services")}
      />
      <SelectField id="pilot-start" name="start" label="When are you looking to get started?" required options={START_OPTIONS} error={invalid("start")} />
      <TextAreaField id="pilot-anything" name="anything" label="Anything else we should know about your church or situation?" />
      <button type="submit" className={`${primaryButton} w-fit`} disabled={pending}>
        Apply for the Pilot
      </button>
    </form>
  );
}
