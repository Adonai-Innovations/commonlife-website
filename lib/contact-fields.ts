export const INQUIRY_IDS = [
  "demo",
  "pricing",
  "pilot",
  "partnership",
  "support",
  "other",
] as const;

export type InquiryId = (typeof INQUIRY_IDS)[number];

export const CONTACT_LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  organization: 200,
  role: 120,
  message: 4000,
} as const;

export const CONTACT_MAX_BODY_BYTES = 16 * 1024;

export const CONTACT_ERRORS = {
  invalid: "Please check the form and try again.",
  blocked: "Request blocked.",
  tooLarge: "Message is too large.",
  unsupported: "Unsupported content type.",
  rateLimited: "Too many requests. Please try again later.",
  delivery: "We could not send your message. Please email hello@commonlife.ai.",
} as const;
