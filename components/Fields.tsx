import type { ReactNode } from "react";

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
  return `w-full rounded-[14px] bg-cl-paper font-inter text-[15px] leading-[22px] text-cl-deep-ocean outline-none ${
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
    <div className="flex min-w-0 flex-col gap-2">
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
        className={`h-[132px] resize-none py-3.5 pl-[18px] pr-4 ${controlClass(error)}`}
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
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-cl-deep-ocean" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
        {hint ? <span className="font-inter text-[13px] leading-5 text-cl-ocean">{hint}</span> : null}
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
          <span className="font-inter text-[15px] leading-[22px] text-cl-deep-ocean">{option}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border-2 border-cl-amber bg-cl-white px-[18px] py-3.5">
      <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-cl-amber" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 6.2v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="10" cy="13.8" r="0.8" fill="currentColor" />
      </svg>
      <p className="font-inter text-[16px] font-medium leading-6 text-cl-deep-ocean">{children}</p>
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Company website
        <input tabIndex={-1} autoComplete="off" type="text" name="cl_hp" defaultValue="" />
      </label>
    </div>
  );
}
