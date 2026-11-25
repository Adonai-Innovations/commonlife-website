/** Live select options. The closed option that names a pilot month is omitted. */
export const CHURCH_SIZES = ["Under 100", "100–300", "300–1,000", "1,000+"] as const;

export const START_OPTIONS = ["Within 1–3 months", "Just exploring"] as const;

export const CONTACT_TIMELINES = [
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

export const SELECT_PLACEHOLDER = "Select an option";
