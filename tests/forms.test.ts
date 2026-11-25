import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { CHURCH_SIZES, CONTACT_TIMELINES, START_OPTIONS } from "@/lib/form-options";
import { API_ERRORS, DELIVERY_ALERT, FORM_ALERT, parseContact, parsePilot } from "@/lib/forms";
import { FOOTER_LEGAL, SCHEDULE_DEMO_URL } from "@/lib/links";

const contact = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  organization: "Grace Church",
  message: "We would like to talk.",
  timeline: "Flexible",
};

const pilot = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "555-0100",
  role: "Pastor",
  churchName: "Grace Church",
  churchSize: "100–300",
  challenges: ["Limited pastoral time / capacity"],
  improve: "Care during the week",
  services: ["Basic onboarding and setup"],
  timeline: "Just exploring",
  notes: "Sunday evening service.",
};

describe("form validation", () => {
  it("accepts a contact payload and drops unknown fields", () => {
    const result = parseContact({ ...contact, extra: "<script>alert(1)</script>" });
    expect(result.ok).toBe(true);
    if (!result.ok || result.honeypot) return;
    expect(result.value.email).toBe("ada@example.com");
    expect("extra" in result.value).toBe(false);
  });

  it("rejects a contact payload that misses a required field or breaks the email", () => {
    expect(parseContact({ ...contact, firstName: "  " }).ok).toBe(false);
    expect(parseContact({ ...contact, email: "not-an-email" }).ok).toBe(false);
    expect(parseContact({ ...contact, email: "ada@example.com\r\nBcc: evil@example.com" }).ok).toBe(false);
    expect(parseContact({ ...contact, message: "x".repeat(4001) }).ok).toBe(false);
    const missing = parseContact({ ...contact, lastName: "" });
    expect(missing.ok).toBe(false);
    if (!missing.ok) expect(missing.fields).toContain("lastName");
  });

  it("accepts a pilot application and requires one challenge, one service, and a start option", () => {
    const result = parsePilot(pilot);
    expect(result.ok).toBe(true);
    expect(parsePilot({ ...pilot, challenges: [] }).ok).toBe(false);
    expect(parsePilot({ ...pilot, services: [] }).ok).toBe(false);
    expect(parsePilot({ ...pilot, timeline: "" }).ok).toBe(false);
    expect(parsePilot({ ...pilot, timeline: "Immediately (May pilot)" }).ok).toBe(false);
  });

  it("treats a filled honeypot as a non-error and does not return the payload", () => {
    expect(parseContact({ ...contact, cl_hp: "https://spam.example" })).toEqual({ ok: true, honeypot: true });
    expect(parsePilot({ ...pilot, cl_hp: "bot" })).toEqual({ ok: true, honeypot: true });
  });

  it("keeps the drawn alert copy and never uses the forbidden field messages", () => {
    const messages = Object.values(API_ERRORS).join("\n");
    expect(FORM_ALERT).toBe("Please check the form and try again.");
    expect(DELIVERY_ALERT).toBe("We could not send your message. Please email hello@commonlife.ai.");
    expect(messages).not.toContain("This field is required.");
    expect(messages).not.toContain("Choose at least one option.");
    expect([...CHURCH_SIZES, ...START_OPTIONS, ...CONTACT_TIMELINES].join("\n")).not.toMatch(/May/);
  });
});

describe("site constants", () => {
  it("keeps Schedule a Demo on one constant and the footer line without a year", () => {
    expect(SCHEDULE_DEMO_URL).toBe("https://app.commonlife.ai");
    expect(FOOTER_LEGAL).toBe("© CommonLife, Inc. All rights reserved.");
    expect(FOOTER_LEGAL).not.toMatch(/\d{4}/);
  });

  it("does not link the draft privacy page from the footer", () => {
    const footer = readFileSync(new URL("../components/Footer.tsx", import.meta.url), "utf8");
    const header = readFileSync(new URL("../components/Header.tsx", import.meta.url), "utf8");
    expect(footer).not.toContain("/privacy");
    expect(footer).not.toContain("Privacy Policy");
    expect(header).not.toContain("/how-it-works");
    expect(header).not.toContain("/pricing");
    const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
    expect(privacy).toContain("index: false");
    expect(privacy).toContain("follow: false");
  });
});
