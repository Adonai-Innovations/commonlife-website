"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { CONTACT_ERRORS } from "@/lib/contact-fields";

const control =
  "w-full bg-clOceanCard px-4 text-[15px] text-clWhite outline-none placeholder:text-clSky";

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2.5">
      <span className="flex flex-wrap gap-x-1.5 text-[15px] leading-[22px] text-clWhite">
        <span className="font-medium">{label}</span>
        {required ? (
          <span className={error ? "font-semibold" : "font-normal text-clSky"}>(required)</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

export function textClass(error?: boolean) {
  return `${control} h-[52px] ${error ? "border-2 border-clWhite" : "border border-clSky"}`;
}

export function TextInput({
  name,
  error,
  type = "text",
}: {
  name: string;
  error?: boolean;
  type?: string;
}) {
  return <input className={textClass(error)} name={name} type={type} autoComplete="on" />;
}

export function TextArea({ name }: { name: string }) {
  return <textarea className={`${control} min-h-[140px] border border-clSky py-3`} name={name} />;
}

export function SelectField({
  name,
  options,
  error,
}: {
  name: string;
  options: readonly string[];
  error?: boolean;
}) {
  return (
    <span className="relative block">
      <select className={`${textClass(error)} appearance-none pr-10`} name={name} defaultValue="">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    </span>
  );
}

export function CheckOption({ label, name, error }: { label: string; name: string; error?: boolean }) {
  return (
    <label className="flex items-start gap-3 text-[16px] leading-6 text-clWhite">
      <input className="peer sr-only" type="checkbox" name={name} value={label} />
      <span
        className={`mt-0.5 inline-flex size-5 shrink-0 bg-clOceanCard peer-checked:bg-clWhite ${error ? "border-2 border-clWhite" : "border border-clSky"}`}
      />
      {label}
    </label>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-2 border-clWhite bg-clOceanCard p-4" role="alert">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
        <circle cx="11" cy="11" r="9" stroke="white" strokeWidth="2" />
        <path d="M11 7.3V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 14.7H11.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-[16px] font-medium leading-6 text-clWhite">{children}</p>
    </div>
  );
}

export function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-full bg-clBlue px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-clWhite disabled:opacity-60"
    >
      {label}
    </button>
  );
}

export function useFormPost(url: string) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [alert, setAlert] = useState("");
  const [fields, setFields] = useState<Record<string, true>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value !== "string") continue;
      if (key.endsWith("[]")) {
        const name = key.slice(0, -2);
        const list = Array.isArray(payload[name]) ? (payload[name] as string[]) : [];
        list.push(value);
        payload[name] = list;
      } else {
        payload[key] = value;
      }
    }
    setPending(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as { error?: string; fields?: Record<string, true> } | null;
      if (!response.ok) {
        setDone(false);
        setFields(body?.fields ?? {});
        setAlert(body?.error || CONTACT_ERRORS.invalid);
        return;
      }
      setFields({});
      setAlert("");
      setDone(true);
    } catch {
      setAlert(CONTACT_ERRORS.invalid);
    } finally {
      setPending(false);
    }
  }

  return { pending, done, alert, fields, onSubmit };
}
