"use client";

import Link from "next/link";

import { Field, FormAlert, SelectField, SubmitButton, TextArea, TextInput, useFormPost } from "@/components/site/Fields";
import { TIMELINE_OPTIONS } from "@/lib/form-schemas";

export default function ContactPage() {
  const form = useFormPost("/api/contact");
  return (
    <main className="bg-clDeepOcean px-6 py-16 text-clWhite min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 min-[1180px]:grid-cols-[minmax(0,420px)_minmax(0,1fr)] min-[1180px]:gap-20">
        <div>
          <h1 className="font-lora text-[40px] font-medium leading-[46px] tracking-[-0.01em] min-[768px]:text-[56px] min-[768px]:leading-[64px] min-[1180px]:text-[72px] min-[1180px]:leading-[80px]">
            Connect With Us!
          </h1>
          <p className="mt-8">
            <Link className="text-[17px] leading-7 text-clSky underline underline-offset-4" href="/commonlife-pilot">
              CommonLife Pilot
            </Link>
          </p>
        </div>
        {form.done ? (
          <div className="border border-clSky/30 bg-clOceanCard p-8 min-[1180px]:p-12">
            <p className="font-lora text-[40px] leading-[48px] text-clWhite min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
              Thank you!
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-6 border border-clSky/30 bg-clDeepOcean p-6 min-[768px]:p-8 min-[1180px]:p-10" onSubmit={form.onSubmit} noValidate>
            {form.alert ? <FormAlert>{form.alert}</FormAlert> : null}
            <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
              <Field label="First Name" required error={form.fields.firstName}>
                <TextInput name="firstName" error={form.fields.firstName} />
              </Field>
              <Field label="Last Name" required error={form.fields.lastName}>
                <TextInput name="lastName" error={form.fields.lastName} />
              </Field>
            </div>
            <Field label="Email" required error={form.fields.email}>
              <TextInput name="email" type="email" error={form.fields.email} />
            </Field>
            <Field label="Please describe your Church, Institution, or Business">
              <TextInput name="organization" />
            </Field>
            <Field label="Message">
              <TextArea name="message" />
            </Field>
            <Field label="What is your desired project timeline?" error={form.fields.timeline}>
              <SelectField name="timeline" options={TIMELINE_OPTIONS} error={form.fields.timeline} />
            </Field>
            <input className="hidden" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <SubmitButton label="Send" pending={form.pending} />
          </form>
        )}
      </div>
    </main>
  );
}
