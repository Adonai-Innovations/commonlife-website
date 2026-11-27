import { z } from "zod";

import {
  CHALLENGES,
  CHURCH_SIZES,
  CONTACT_TIMELINES,
  SERVICES,
  START_OPTIONS,
} from "./form-options";

export const FORM_ALERT = "Please check the form and try again.";
export const DELIVERY_ALERT = "We could not send your message. Please email hello@commonlife.ai.";

export const API_ERRORS = {
  invalid: FORM_ALERT,
  blocked: "Request blocked.",
  tooLarge: "Message is too large.",
  unsupported: "Unsupported content type.",
  rateLimited: "Too many requests. Please try again later.",
} as const;

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const EMAIL =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

function line(max: number, required: boolean) {
  const schema = z
    .string()
    .trim()
    .max(max)
    .refine((value) => !CONTROL_CHARS.test(value));
  return required ? schema.refine((value) => value.length > 0) : schema;
}

function emailField() {
  return line(254, true).refine((value) => EMAIL.test(value) && !value.includes(".."));
}

const contactSchema = z
  .object({
    firstName: line(80, true),
    lastName: line(80, true),
    email: emailField(),
    organization: line(2000, false),
    message: line(4000, false),
    timeline: z.union([z.literal(""), z.enum(CONTACT_TIMELINES)]),
  })
  .strip();

const pilotSchema = z
  .object({
    firstName: line(80, true),
    lastName: line(80, true),
    email: emailField(),
    phone: line(40, false),
    role: line(120, true),
    churchName: line(200, true),
    churchSize: z.union([z.literal(""), z.enum(CHURCH_SIZES)]),
    challenges: z.array(z.enum(CHALLENGES)).min(1).max(CHALLENGES.length),
    improve: line(2000, false),
    services: z.array(z.enum(SERVICES)).min(1).max(SERVICES.length),
    timeline: z.enum(START_OPTIONS),
    notes: line(4000, false),
  })
  .strip();

export type ContactValue = z.infer<typeof contactSchema>;
export type PilotValue = z.infer<typeof pilotSchema>;

export type ParseResult<T> =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; value: T }
  | { ok: false; fields: string[] };

function fieldNames(error: z.ZodError): string[] {
  const names = new Set<string>();
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key.length > 0) names.add(key);
  }
  return [...names];
}

function parseWith<T>(schema: z.ZodType<T>, body: unknown): ParseResult<T> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, fields: [] };
  const record = body as Record<string, unknown>;
  const honeypot = record.cl_hp;
  if (typeof honeypot === "string" && honeypot.trim() !== "") return { ok: true, honeypot: true };
  if (honeypot !== undefined && honeypot !== null && honeypot !== "") return { ok: false, fields: [] };

  const parsed = schema.safeParse(record);
  if (!parsed.success) return { ok: false, fields: fieldNames(parsed.error) };
  return { ok: true, honeypot: false, value: parsed.data };
}

export function parseContact(body: unknown): ParseResult<ContactValue> {
  return parseWith(contactSchema, body);
}

export function parsePilot(body: unknown): ParseResult<PilotValue> {
  return parseWith(pilotSchema, body);
}
