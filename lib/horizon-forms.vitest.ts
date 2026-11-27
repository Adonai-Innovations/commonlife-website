import { describe, expect, it } from "vitest";

import {
  CHURCH_SIZES,
  DELIVERY_ERROR,
  FORM_CHECK,
  START_OPTIONS,
  TIMELINE_OPTIONS,
  parseContact,
  parsePilot,
} from "./horizon-forms";

const pilot = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "",
  role: "Pastor",
  churchName: "Grace Church",
  churchSize: "100–300",
  challenges: ["Limited pastoral time / capacity"],
  improve: "",
  services: ["Basic onboarding and setup"],
  startWhen: "Within 1–3 months",
  anythingElse: "",
};

describe("pilot application validation", () => {
  it("accepts a complete application and drops unknown fields", () => {
    const result = parsePilot({ ...pilot, extra: "<script>" });
    expect(result.ok).toBe(true);
    if (!result.ok || result.honeypot) return;
    expect(result.value.email).toBe("ada@example.com");
    expect("extra" in result.value).toBe(false);
  });

  it("names the failing required fields and does not invent error sentences", () => {
    const result = parsePilot({ churchSize: "Under 100" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fields).toEqual(
      expect.arrayContaining(["firstName", "lastName", "email", "role", "churchName", "challenges", "services", "startWhen"]),
    );
    expect(JSON.stringify(result)).not.toContain("This field is required.");
    expect(JSON.stringify(result)).not.toContain("Choose at least one option.");
    expect(FORM_CHECK).toBe("Please check the form and try again.");
  });

  it("rejects the dropped May pilot option and invalid email", () => {
    expect(START_OPTIONS).not.toContain("Immediately (May pilot)");
    expect(parsePilot({ ...pilot, startWhen: "Immediately (May pilot)" }).ok).toBe(false);
    expect(parsePilot({ ...pilot, email: "not-an-email" }).ok).toBe(false);
    expect(parsePilot({ ...pilot, email: "ada@example.com\r\nBcc: evil@example.com" }).ok).toBe(false);
    expect(parsePilot({ ...pilot, challenges: [] }).ok).toBe(false);
  });

  it("treats a honeypot as a quiet success", () => {
    expect(parsePilot({ ...pilot, cl_hp: "https://spam.example" })).toEqual({ ok: true, honeypot: true });
  });
});

describe("contact validation", () => {
  it("requires only name and email and keeps the live timeline options", () => {
    const result = parseContact({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      organization: "",
      message: "",
      timeline: "Flexible",
    });
    expect(result.ok).toBe(true);
    expect(parseContact({ firstName: "", lastName: "Lovelace", email: "ada@example.com" }).ok).toBe(false);
    expect(TIMELINE_OPTIONS).toEqual([
      "Immediate (within 1 month)",
      "Short-term (1-3 months)",
      "Long-term (3+ months)",
      "Flexible",
    ]);
    expect(CHURCH_SIZES).toEqual(["Under 100", "100–300", "300–1,000", "1,000+"]);
    expect(DELIVERY_ERROR).toBe("We could not send your message. Please email hello@commonlife.ai.");
  });
});
