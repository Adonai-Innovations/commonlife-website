import type { ReactNode } from "react";

import { IconChevron } from "@/components/icons";
import { SELECT_PLACEHOLDER } from "@/lib/form-options";

function Label({
  htmlFor,
  label,
  required,
  error,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-wrap gap-x-1.5 text-[15px] leading-[22px]">
      <span className="font-medium text-cl-deep-ocean">{label}</span>
      {required ? (
        <span className={error ? "font-semibold text-cl-amber" : "font-normal text-cl-ocean"}>(required)</span>
      ) : null}
    </label>
  );
}

function controlClass(error?: boolean) {
  return `w-full rounded-[14px] bg-cl-paper font-inter text-[16px] text-cl-deep-ocean ${
    error ? "border-2 border-cl-amber" : "border border-cl-deep-ocean/60"
  }`;
}

export function TextField({
  name,
  label,
  required,
  error,
  type = "text",
  autoComplete,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <Label htmlFor={name} label={label} required={required} error={error} />
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error || undefined}
        className={`h-[52px] pl-[18px] pr-4 ${controlClass(error)}`}
      />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  required,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} label={label} required={required} error={error} />
      <textarea
        id={name}
        name={name}
        aria-invalid={error || undefined}
        className={`h-[132px] resize-none py-[14px] pl-[18px] pr-4 ${controlClass(error)}`}
      />
    </div>
  );
}

export function SelectField({
  name,
  label,
  required,
  error,
  options,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} label={label} required={required} error={error} />
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue=""
          aria-invalid={error || undefined}
          className={`h-[52px] appearance-none pl-[18px] pr-10 text-cl-ocean ${controlClass(error)}`}
        >
          <option value="">{SELECT_PLACEHOLDER}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-cl-deep-ocean">
              {option}
            </option>
          ))}
        </select>
        <IconChevron className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-cl-deep-ocean" />
      </div>
    </div>
  );
}

export function CheckGroup({
  legend,
  hint,
  name,
  required,
  error,
  options,
}: {
  legend: string;
  hint?: string;
  name: string;
  required?: boolean;
  error?: boolean;
  options: readonly string[];
}) {
  return (
    <fieldset className="flex flex-col gap-3.5">
      <legend className="flex flex-col gap-1">
        <span className="flex flex-wrap gap-x-1.5 text-[15px] leading-[22px]">
          <span className="font-medium text-cl-deep-ocean">{legend}</span>
          {required ? (
            <span className={error ? "font-semibold text-cl-amber" : "font-normal text-cl-ocean"}>(required)</span>
          ) : null}
        </span>
        {hint ? <span className="font-inter text-sm leading-5 text-cl-ocean">{hint}</span> : null}
      </legend>
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3">
          <input
            type="checkbox"
            name={name}
            value={option}
            aria-invalid={error || undefined}
            className={`size-[22px] shrink-0 appearance-none rounded-[7px] bg-cl-paper checked:border-cl-blue checked:bg-cl-blue ${
              error ? "border-2 border-cl-amber" : "border border-cl-deep-ocean/60"
            }`}
          />
          <span className="font-inter text-[16px] leading-6 text-cl-deep-ocean">{option}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border-2 border-cl-amber bg-cl-white px-[18px] py-[14px]">
      <svg viewBox="0 0 22 22" className="size-[22px] shrink-0 text-cl-amber" fill="none" aria-hidden="true">
        <path d="M20.1667 11C20.1667 16.0626 16.0626 20.1667 11 20.1667C5.93739 20.1667 1.83333 16.0626 1.83333 11C1.83333 5.93739 5.93739 1.83333 11 1.83333C16.0626 1.83333 20.1667 5.93739 20.1667 11Z" stroke="currentColor" strokeWidth="2" />
        <path d="M11 7.33333V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 14.6667H11.0092" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="font-inter text-[16px] font-medium leading-6 text-cl-deep-ocean">{children}</p>
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <input tabIndex={-1} autoComplete="off" type="text" name="cl_hp" defaultValue="" />
    </div>
  );
}

export function DoneBadge() {
  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-cl-paper text-cl-blue">
      <svg viewBox="0 0 22 22" className="size-8" fill="none" aria-hidden="true">
        <path d="M18.3333 5.5L8.25 15.5833L3.66667 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
