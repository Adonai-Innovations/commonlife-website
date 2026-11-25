import { z } from "zod";

/**
 * TODO: Delivery is pending Keven's OK. These schemas validate submissions only.
 * Do not add a webhook, email transport, or environment variable until that is confirmed.
 */

const text = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const CHURCH_SIZES = ["Under 100", "100–300", "300–1,000", "1,000+"] as const;
export const START_OPTIONS = ["Within 1–3 months", "Just exploring"] as const;
export const TIMELINE_OPTIONS = [
  "Immediate (within 1 month)",
  "Short-term (1-3 months)",
  "Long-term (3+ months)",
  "Flexible",
] as const;

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

const checked = <T extends readonly [string, ...string[]]>(values: T) =>
  z.array(z.enum(values)).max(values.length);

export const contactSchema = z
  .object({
    firstName: text(80),
    lastName: text(80),
    email: z.email().max(254),
    organization: optionalText(200),
    message: optionalText(4000),
    timeline: z.union([z.literal(""), z.enum(TIMELINE_OPTIONS)]).optional().default(""),
    companyWebsite: z.string().max(0).optional().default(""),
  })
  .strict();

export const pilotApplicationSchema = z
  .object({
    firstName: text(80),
    lastName: text(80),
    email: z.email().max(254),
    phone: optionalText(40),
    role: text(120),
    churchName: text(200),
    churchSize: z.union([z.literal(""), z.enum(CHURCH_SIZES)]).optional().default(""),
    challenges: checked(CHALLENGES).min(1),
    improve: optionalText(4000),
    services: checked(SERVICES).min(1),
    start: z.enum(START_OPTIONS),
    notes: optionalText(4000),
    companyWebsite: z.string().max(0).optional().default(""),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
export type PilotApplicationInput = z.infer<typeof pilotApplicationSchema>;

const contactFields = ["firstName", "lastName", "email", "organization", "message", "timeline"] as const;
const pilotFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "churchName",
  "churchSize",
  "challenges",
  "improve",
  "services",
  "start",
  "notes",
] as const;

export function fieldErrors(
  error: z.ZodError,
  allowed: readonly string[],
): Record<string, true> {
  const fields: Record<string, true> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (allowed.includes(key)) fields[key] = true;
  }
  return fields;
}

export function parseContact(body: unknown) {
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return { ok: false as const, fields: fieldErrors(parsed.error, contactFields) };
  if (parsed.data.companyWebsite) return { ok: true as const, ignored: true as const };
  return { ok: true as const, ignored: false as const, value: parsed.data };
}

export function parsePilotApplication(body: unknown) {
  const parsed = pilotApplicationSchema.safeParse(body);
  if (!parsed.success) return { ok: false as const, fields: fieldErrors(parsed.error, pilotFields) };
  if (parsed.data.companyWebsite) return { ok: true as const, ignored: true as const };
  return { ok: true as const, ignored: false as const, value: parsed.data };
}
