"use client";

import Link from "next/link";

import { CheckOption, Field, FormAlert, SelectField, SubmitButton, TextArea, TextInput, useFormPost } from "@/components/site/Fields";
import { CHALLENGES, CHURCH_SIZES, SERVICES, START_OPTIONS } from "@/lib/form-schemas";

export default function PilotApplicationPage() {
  const form = useFormPost("/api/pilot-application");
  return (
    <main className="bg-clDeepOcean px-6 py-16 text-clWhite min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 min-[1180px]:grid-cols-[minmax(0,1fr)_664px] min-[1180px]:items-start min-[1180px]:gap-16">
        <div>
          <h1 className="font-lora text-[36px] font-medium leading-[42px] tracking-[-0.01em] min-[768px]:max-w-[16ch] min-[768px]:text-[48px] min-[768px]:leading-[56px] min-[1180px]:max-w-none min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
            Apply to Become
            <br className="hidden min-[1440px]:block" /> a Pilot Church
          </h1>
          <p className="mt-6 text-[15px] leading-6 text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
            We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
          </p>
          <p className="mt-4 text-[15px] leading-6 text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
            No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
          </p>
        </div>
        {form.done ? (
          <div className="border border-clSky p-8 min-[1180px]:p-12">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="12" stroke="white" strokeWidth="1.5" />
              <path d="M9 14.5L12.5 18L19 11" stroke="white" strokeWidth="1.5" />
            </svg>
            <p className="mt-6 font-lora text-[32px] leading-10 text-clWhite min-[1180px]:text-[40px] min-[1180px]:leading-[48px]">
              Thanks — we’ve received your application.
            </p>
            <p className="mt-6 text-[17px] leading-7 text-clSky">
              A member of the CommonLife team will review your submission and reach out shortly to discuss next steps and confirm fit for the pilot.
            </p>
            <Link
              className="mt-8 inline-flex rounded-full border border-clWhite px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite"
              href="/about"
            >
              About CommonLife
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-6 border border-clSky p-6 min-[768px]:p-8 min-[1180px]:p-10" onSubmit={form.onSubmit} noValidate>
            {form.alert ? <FormAlert>{form.alert}</FormAlert> : null}
            <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
              <Field label="First Name" required error={form.fields.firstName}>
                <TextInput name="firstName" error={form.fields.firstName} />
              </Field>
              <Field label="Last Name" required error={form.fields.lastName}>
                <TextInput name="lastName" error={form.fields.lastName} />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
              <Field label="Email" required error={form.fields.email}>
                <TextInput name="email" type="email" error={form.fields.email} />
              </Field>
              <Field label="Phone">
                <TextInput name="phone" />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-6 min-[768px]:grid-cols-2">
              <Field label="Your Role" required error={form.fields.role}>
                <TextInput name="role" error={form.fields.role} />
              </Field>
              <Field label="Church Name" required error={form.fields.churchName}>
                <TextInput name="churchName" error={form.fields.churchName} />
              </Field>
            </div>
            <Field label="Church Size">
              <SelectField name="churchSize" options={CHURCH_SIZES} />
            </Field>
            <fieldset className="flex flex-col gap-4">
              <legend className="flex flex-wrap gap-x-1.5 text-[15px] leading-[22px] text-clWhite">
                <span className="font-medium">Which of these challenges are most relevant right now?</span>
                <span className={form.fields.challenges ? "font-semibold" : "font-normal text-clSky"}>(required)</span>
              </legend>
              <p className="text-[15px] text-clSky">Check all that apply</p>
              {CHALLENGES.map((label) => (
                <CheckOption key={label} label={label} name="challenges[]" error={form.fields.challenges} />
              ))}
            </fieldset>
            <Field label="What are you hoping to improve most?">
              <TextArea name="improve" />
            </Field>
            <fieldset className="flex flex-col gap-4">
              <legend className="flex flex-wrap gap-x-1.5 text-[15px] leading-[22px] text-clWhite">
                <span className="font-medium">What services are you interested in?</span>
                <span className={form.fields.services ? "font-semibold" : "font-normal text-clSky"}>(required)</span>
              </legend>
              {SERVICES.map((label) => (
                <CheckOption key={label} label={label} name="services[]" error={form.fields.services} />
              ))}
            </fieldset>
            <Field label="When are you looking to get started?" required error={form.fields.start}>
              <SelectField name="start" options={START_OPTIONS} error={form.fields.start} />
            </Field>
            <Field label="Anything else we should know about your church or situation?">
              <TextArea name="notes" />
            </Field>
            <input className="hidden" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <SubmitButton label="Apply for the Pilot" pending={form.pending} />
          </form>
        )}
      </div>
    </main>
  );
}
