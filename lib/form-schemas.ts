import { z } from "zod";

const trimmed = (max: number) => z.string().trim().max(max);
const requiredText = (max: number) => trimmed(max).min(1);

export const CHURCH_SIZES = ["Under 100", "100–300", "300–1,000", "1,000+"] as const;

/** Live start-date options, with “Immediately (May pilot)” left out. */
export const START_OPTIONS = ["Within 1–3 months", "Just exploring"] as const;

export const TIMELINE_OPTIONS = [
  "Immediate (within 1 month)",
  "Short-term (1-3 months)",
  "Long-term (3+ months)",
  "Flexible",
] as const;

export const CHALLENGE_OPTIONS = [
  "Limited pastoral time / capacity",
  "Increasing demand for guidance during the week",
  "Difficulty maintaining engagement beyond Sunday",
  "Staffing constraints / cost concerns",
  "Not sure how to approach AI in the church",
] as const;

export const SERVICE_OPTIONS = [
  "Basic onboarding and setup",
  "Guided rollout with structured support",
  "Ongoing partnership and optimization",
] as const;

const email = z.string().trim().email().max(254);

export const contactFormSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email,
  organization: trimmed(400),
  message: trimmed(4000),
  timeline: z.union([z.literal(""), z.enum(TIMELINE_OPTIONS)]),
});

export const pilotFormSchema = z.object({
  firstName: requiredText(80),
  lastName: requiredText(80),
  email,
  phone: trimmed(40),
  role: requiredText(120),
  churchName: requiredText(200),
  churchSize: z.union([z.literal(""), z.enum(CHURCH_SIZES)]),
  challenges: z.array(z.enum(CHALLENGE_OPTIONS)).min(1),
  improve: trimmed(4000),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1),
  start: z.enum(START_OPTIONS),
  anything: trimmed(4000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PilotFormInput = z.infer<typeof pilotFormSchema>;

export function fieldNames(error: z.ZodError): string[] {
  const names = new Set<string>();
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string") names.add(key);
  }
  return [...names];
}
