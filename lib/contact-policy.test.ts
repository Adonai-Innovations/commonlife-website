import assert from "node:assert/strict";
import test from "node:test";

import { CONTACT_ERRORS } from "./contact-fields";
import {
  RequestRejected,
  SlidingWindowLimiter,
  clientAddress,
  isNonPublicIp,
  isSameOrigin,
  readJsonBody,
  validateContact,
  webhookUrlProblem,
} from "./contact-policy";
import { contentSecurityPolicy, securityHeaders } from "./security-headers.mjs";

const valid = {
  inquiry: "demo",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  organization: "Grace Church",
  role: "Pastor",
  message: "We would like a demo.",
};

test("accepts a bounded contact payload and drops unknown fields", () => {
  const result = validateContact({ ...valid, extra: "<script>alert(1)</script>" });
  assert.equal(result.ok, true);
  if (!result.ok || result.honeypotTripped) return;
  assert.equal(result.value.email, "ada@example.com");
  assert.equal("extra" in result.value, false);
});

test("rejects oversized, malformed, and header-injection input", () => {
  assert.equal(validateContact({ ...valid, message: "x".repeat(4001) }).ok, false);
  assert.equal(validateContact({ ...valid, email: "ada@example.com\r\nBcc: evil@example.com" }).ok, false);
  assert.equal(validateContact({ ...valid, inquiry: "delete-everything" }).ok, false);
  assert.equal(validateContact({ ...valid, email: "not-an-email" }).ok, false);
  assert.equal(validateContact(["not", "an", "object"]).ok, false);
});

test("honeypot trips without treating the body as a real message", () => {
  const result = validateContact({ ...valid, cl_hp: "https://spam.example" });
  assert.deepEqual(result, { ok: true, honeypotTripped: true });
});

test("rate limiter blocks the request past the window", () => {
  let now = 1_000_000;
  const limiter = new SlidingWindowLimiter(5, 60_000, () => now);
  for (let i = 0; i < 5; i += 1) assert.equal(limiter.check("198.51.100.10").ok, true);
  const blocked = limiter.check("198.51.100.10");
  assert.equal(blocked.ok, false);
  if (!blocked.ok) assert.ok(blocked.retryAfterSeconds >= 1);
  now += 61_000;
  assert.equal(limiter.check("198.51.100.10").ok, true);
});

test("blocks private, loopback, and metadata addresses", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "192.168.1.1", "169.254.169.254", "::1", "fd00::1"]) {
    assert.equal(isNonPublicIp(ip), true, ip);
  }
  assert.equal(isNonPublicIp("8.8.8.8"), false);
  assert.equal(isNonPublicIp("2001:4860:4860::8888"), false);
});

test("webhook URL must be public https on port 443", () => {
  assert.equal(webhookUrlProblem("https://hooks.example.com/contact"), null);
  assert.equal(webhookUrlProblem("http://hooks.example.com/contact"), "protocol");
  assert.equal(webhookUrlProblem("https://user:pass@hooks.example.com/contact"), "credentials");
  assert.equal(webhookUrlProblem("https://hooks.example.com:8443/contact"), "port");
  assert.equal(webhookUrlProblem("https://169.254.169.254/latest/meta-data"), "address");
  assert.equal(webhookUrlProblem("https://localhost/hook"), "host");
  assert.equal(webhookUrlProblem("https://metadata.google.internal/hook"), "host");
});

test("same-origin check rejects cross-site browser requests", () => {
  const same = new Request("https://commonlife.example/api/contact", {
    headers: { origin: "https://commonlife.example", host: "commonlife.example", "sec-fetch-site": "same-origin" },
  });
  const cross = new Request("https://commonlife.example/api/contact", {
    headers: { origin: "https://evil.example", host: "commonlife.example", "sec-fetch-site": "cross-site" },
  });
  assert.equal(isSameOrigin(same), true);
  assert.equal(isSameOrigin(cross), false);
});

test("client address uses the last forwarded hop and ignores control characters", () => {
  const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.8" });
  assert.equal(clientAddress(headers), "10.0.0.8");
  const injected = {
    get(name: string) {
      return name === "x-real-ip" ? "bad\r\ninjected" : null;
    },
  } as Headers;
  assert.equal(clientAddress(injected), "unknown");
});

test("json reader rejects a declared oversized body before reading it", async () => {
  const request = new Request("https://commonlife.example/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "999999" },
    body: "{}",
  });
  await assert.rejects(readJsonBody(request, 1024), (error: unknown) => {
    assert.ok(error instanceof RequestRejected);
    assert.equal(error.status, 413);
    return true;
  });
});

test("production security headers close framing, sniffing, and remote script hosts", () => {
  const headers = securityHeaders("production");
  const csp = contentSecurityPolicy("production");
  const byName = Object.fromEntries(headers.map((header) => [header.key, header.value]));
  assert.equal(byName["X-Content-Type-Options"], "nosniff");
  assert.equal(byName["X-Frame-Options"], "DENY");
  assert.equal(byName["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.match(byName["Strict-Transport-Security"], /max-age=31536000/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.doesNotMatch(csp, /\*/);
  assert.doesNotMatch(csp, /unsafe-eval/);
  assert.equal(headers.some((header) => header.key.toLowerCase() === "access-control-allow-origin"), false);
  assert.equal(CONTACT_ERRORS.invalid.includes("stack"), false);
});
