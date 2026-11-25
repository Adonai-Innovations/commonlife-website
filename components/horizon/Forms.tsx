"use client";

import { useState, type FormEvent } from "react";

import { LinkButton, SubmitButton } from "@/components/horizon/Button";
import { CheckGroup, SelectField, TextField } from "@/components/horizon/Fields";
import {
  CHALLENGES,
  CHURCH_SIZES,
  DELIVERY_ERROR,
  FORM_CHECK,
  SERVICES,
  START_OPTIONS,
  TIMELINE_OPTIONS,
  parseContact,
  parsePilot,
} from "@/lib/horizon-forms";

function Alert({ message }: { message: string }) {
  return (
    <div className="form-alert" role="alert">
      <span className="alert-icon" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

function Done({ title, body, action }: { title: string; body?: string; action?: { href: string; label: string } }) {
  return (
    <div className="done">
      <div className="done-mark" aria-hidden="true">
        <span />
      </div>
      <h2 className="t-done">{title}</h2>
      {body ? <p className="t-sky">{body}</p> : null}
      {action ? <LinkButton href={action.href}>{action.label}</LinkButton> : null}
    </div>
  );
}

async function postForm(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: string[] } | null;
  return { response, data };
}

const emptyPilot = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  churchName: "",
  churchSize: "",
  challenges: [] as string[],
  improve: "",
  services: [] as string[],
  startWhen: "",
  anythingElse: "",
  cl_hp: "",
};

export function PilotForm() {
  const [values, setValues] = useState(emptyPilot);
  const [fields, setFields] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const bad = (name: string) => fields.includes(name);
  const set = (key: keyof typeof emptyPilot) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    const parsed = parsePilot(values);
    if (!parsed.ok) {
      setFields(parsed.fields);
      setAlert(FORM_CHECK);
      return;
    }
    setPending(true);
    try {
      const { response, data } = await postForm("/api/pilot-application", values);
      if (response.ok && data?.ok) {
        setDone(true);
        setAlert(null);
        setFields([]);
        return;
      }
      setFields(data?.fields ?? []);
      setAlert(data?.error || FORM_CHECK);
    } catch {
      setAlert(FORM_CHECK);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="form-layout">
      <div className="form-copy">
        <h1 className="t-app">Apply to Become a Pilot Church</h1>
        <p className="t-sky">
          We’re working with a limited number of churches for the pilot. This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
        </p>
        <p className="t-intro-note">No obligation, and no strings attached! Most applications take less than 2 minutes to complete.</p>
      </div>
      {done ? (
        <Done
          title="Thanks — we’ve received your application."
          body="A member of the CommonLife team will review your submission and reach out shortly to discuss next steps and confirm fit for the pilot."
          action={{ href: "/about", label: "About CommonLife" }}
        />
      ) : (
        <form className="form-fields" onSubmit={onSubmit} noValidate>
          {alert ? <Alert message={alert} /> : null}
          <div className="field-row">
            <TextField name="firstName" label="First Name" required error={bad("firstName")} value={values.firstName} onChange={set("firstName")} autoComplete="given-name" />
            <TextField name="lastName" label="Last Name" required error={bad("lastName")} value={values.lastName} onChange={set("lastName")} autoComplete="family-name" />
          </div>
          <div className="field-row">
            <TextField name="email" label="Email" required error={bad("email")} value={values.email} onChange={set("email")} autoComplete="email" />
            <TextField name="phone" label="Phone" error={bad("phone")} value={values.phone} onChange={set("phone")} autoComplete="tel" />
          </div>
          <div className="field-row">
            <TextField name="role" label="Your Role" required error={bad("role")} value={values.role} onChange={set("role")} autoComplete="organization-title" />
            <TextField name="churchName" label="Church Name" required error={bad("churchName")} value={values.churchName} onChange={set("churchName")} autoComplete="organization" />
          </div>
          <SelectField name="churchSize" label="Church Size" error={bad("churchSize")} value={values.churchSize} options={CHURCH_SIZES} onChange={set("churchSize")} />
          <CheckGroup
            legend="Which of these challenges are most relevant right now?"
            required
            hint="Check all that apply"
            name="challenges"
            options={CHALLENGES}
            values={values.challenges}
            error={bad("challenges")}
            onChange={(challenges) => setValues((current) => ({ ...current, challenges }))}
          />
          <TextField name="improve" label="What are you hoping to improve most?" error={bad("improve")} value={values.improve} onChange={set("improve")} />
          <CheckGroup
            legend="What services are you interested in?"
            required
            name="services"
            options={SERVICES}
            values={values.services}
            error={bad("services")}
            onChange={(services) => setValues((current) => ({ ...current, services }))}
          />
          <SelectField name="startWhen" label="When are you looking to get started?" required error={bad("startWhen")} value={values.startWhen} options={START_OPTIONS} onChange={set("startWhen")} />
          <TextField name="anythingElse" label="Anything else we should know about your church or situation?" multiline error={bad("anythingElse")} value={values.anythingElse} onChange={set("anythingElse")} />
          <div className="hp" aria-hidden="true">
            <input name="cl_hp" value={values.cl_hp} tabIndex={-1} autoComplete="off" onChange={(event) => set("cl_hp")(event.target.value)} />
          </div>
          <SubmitButton pending={pending}>Apply for the Pilot</SubmitButton>
        </form>
      )}
    </div>
  );
}

const emptyContact = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  message: "",
  timeline: "",
  cl_hp: "",
};

export function ContactForm({ initial = "form" }: { initial?: "form" | "delivery-error" | "sent" }) {
  const [values, setValues] = useState(emptyContact);
  const [fields, setFields] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(initial === "delivery-error" ? DELIVERY_ERROR : null);
  const [done, setDone] = useState(initial === "sent");
  const [pending, setPending] = useState(false);
  const bad = (name: string) => fields.includes(name);
  const set = (key: keyof typeof emptyContact) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    const parsed = parseContact(values);
    if (!parsed.ok) {
      setFields(parsed.fields);
      setAlert(FORM_CHECK);
      setDone(false);
      return;
    }
    setPending(true);
    try {
      const { response, data } = await postForm("/api/horizon-contact", values);
      if (response.ok && data?.ok) {
        setDone(true);
        setAlert(null);
        setFields([]);
        return;
      }
      setDone(false);
      setFields(data?.error === DELIVERY_ERROR ? [] : (data?.fields ?? []));
      setAlert(data?.error || FORM_CHECK);
    } catch {
      setAlert(FORM_CHECK);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="form-layout">
      <div className="form-copy">
        <h1 className="t-contact">Connect With Us!</h1>
        <div className="actions">
          <LinkButton href="/commonlife-pilot">CommonLife Pilot</LinkButton>
        </div>
      </div>
      {done ? (
        <Done title="Thank you!" />
      ) : (
        <form className="form-fields" onSubmit={onSubmit} noValidate>
          {alert ? <Alert message={alert} /> : null}
          <div className="field-row">
            <TextField name="firstName" label="First Name" required error={bad("firstName")} value={values.firstName} onChange={set("firstName")} autoComplete="given-name" />
            <TextField name="lastName" label="Last Name" required error={bad("lastName")} value={values.lastName} onChange={set("lastName")} autoComplete="family-name" />
          </div>
          <TextField name="email" label="Email" required error={bad("email")} value={values.email} onChange={set("email")} autoComplete="email" />
          <TextField
            name="organization"
            label="Please describe your Church, Institution, or Business"
            error={bad("organization")}
            value={values.organization}
            onChange={set("organization")}
            autoComplete="organization"
          />
          <TextField name="message" label="Message" multiline error={bad("message")} value={values.message} onChange={set("message")} />
          <SelectField
            name="timeline"
            label="What is your desired project timeline?"
            error={bad("timeline")}
            value={values.timeline}
            options={TIMELINE_OPTIONS}
            onChange={set("timeline")}
          />
          <div className="hp" aria-hidden="true">
            <input name="cl_hp" value={values.cl_hp} tabIndex={-1} autoComplete="off" onChange={(event) => set("cl_hp")(event.target.value)} />
          </div>
          <SubmitButton pending={pending}>Send</SubmitButton>
        </form>
      )}
    </div>
  );
}
