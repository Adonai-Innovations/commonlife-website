import { z } from "zod";

/** Frame copy for a validation failure. Not a per-field sentence. */
export const FORM_CHECK = "Please check the form and try again.";

/** Frame copy for a contact delivery failure. Not returned while delivery is unwired. */
export const DELIVERY_ERROR = "We could not send your message. Please email hello@commonlife.ai.";

const CONTROL = /[\u0000-\u001F\u007F]/;
const EMAIL =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export const CHURCH_SIZES = ["Under 100", "100–300", "300–1,000", "1,000+"] as const;
export const CHALLENGES = [
  "Limited pastoral time / capacity",
  "Increasing demand for guidance during the week",
  "Difficulty maintaining engagement beyond Sunday",
  "Staffing constraints / cost concerns",
  "Not sure how to approach AI in the church",
] as const;
export const SERVICES = [
  "Basic onboarding and setup",
  "Guided rollout with structured support",
  "Ongoing partnership and optimization",
] as const;
/** Live options, minus “Immediately (May pilot)”. */
export const START_OPTIONS = ["Within 1–3 months", "Just exploring"] as const;
export const TIMELINE_OPTIONS = [
  "Immediate (within 1 month)",
  "Short-term (1-3 months)",
  "Long-term (3+ months)",
  "Flexible",
] as const;

const requiredText = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((value) => !CONTROL.test(value));

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((value) => !CONTROL.test(value))
    .optional()
    .or(z.literal(""));

const email = z
  .string()
  .trim()
  .min(1)
  .max(254)
  .refine((value) => EMAIL.test(value) && !value.includes("..") && !CONTROL.test(value));

export const pilotSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email,
  phone: optionalText(40),
  role: requiredText(120),
  churchName: requiredText(200),
  churchSize: z.union([z.literal(""), z.enum(CHURCH_SIZES)]).optional(),
  challenges: z.array(z.enum(CHALLENGES)).min(1).max(CHALLENGES.length),
  improve: optionalText(2000),
  services: z.array(z.enum(SERVICES)).min(1).max(SERVICES.length),
  startWhen: z.enum(START_OPTIONS),
  anythingElse: optionalText(4000),
});

export const contactSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email,
  organization: optionalText(200),
  message: optionalText(4000),
  timeline: z.union([z.literal(""), z.enum(TIMELINE_OPTIONS)]).optional(),
});

export type PilotValue = z.infer<typeof pilotSchema>;
export type ContactValue = z.infer<typeof contactSchema>;

export type ParseResult<T> =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; value: T }
  | { ok: false; fields: string[] };

function fieldsOf(error: z.ZodError): string[] {
  const names = new Set<string>();
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string") names.add(key);
  }
  return [...names];
}

function honeypot(record: Record<string, unknown>): "trip" | "bad" | "clear" {
  const value = record.cl_hp;
  if (value === undefined || value === null || value === "") return "clear";
  if (typeof value === "string" && value.trim() === "") return "clear";
  if (typeof value === "string") return "trip";
  return "bad";
}

export function parsePilot(input: unknown): ParseResult<PilotValue> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, fields: [] };
  const record = input as Record<string, unknown>;
  const trap = honeypot(record);
  if (trap === "trip") return { ok: true, honeypot: true };
  if (trap === "bad") return { ok: false, fields: [] };
  const parsed = pilotSchema.safeParse(record);
  if (!parsed.success) return { ok: false, fields: fieldsOf(parsed.error) };
  return { ok: true, honeypot: false, value: parsed.data };
}

export function parseContact(input: unknown): ParseResult<ContactValue> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, fields: [] };
  const record = input as Record<string, unknown>;
  const trap = honeypot(record);
  if (trap === "trip") return { ok: true, honeypot: true };
  if (trap === "bad") return { ok: false, fields: [] };
  const parsed = contactSchema.safeParse(record);
  if (!parsed.success) return { ok: false, fields: fieldsOf(parsed.error) };
  return { ok: true, honeypot: false, value: parsed.data };
}
