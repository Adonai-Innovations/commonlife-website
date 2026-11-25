import assert from "node:assert/strict";
import test from "node:test";

import { parseContact, parsePilotApplication } from "./form-schemas";

const contact = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  organization: "Grace Church",
  message: "Hello",
  timeline: "Flexible",
};

test("contact accepts the live fields and rejects a missing name", () => {
  const ok = parseContact(contact);
  assert.equal(ok.ok, true);
  const missing = parseContact({ ...contact, firstName: "  " });
  assert.equal(missing.ok, false);
  if (!missing.ok) assert.equal(missing.fields.firstName, true);
});

test("pilot application drops the excluded start option and requires a challenge", () => {
  const base = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "",
    role: "Pastor",
    churchName: "Grace",
    churchSize: "Under 100",
    challenges: ["Limited pastoral time / capacity"],
    improve: "",
    services: ["Basic onboarding and setup"],
    start: "Just exploring",
    notes: "",
  };
  assert.equal(parsePilotApplication(base).ok, true);
  const none = parsePilotApplication({ ...base, challenges: [] });
  assert.equal(none.ok, false);
  const dated = parsePilotApplication({ ...base, start: "Immediately (May pilot)" });
  assert.equal(dated.ok, false);
});
