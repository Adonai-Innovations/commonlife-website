import { describe, expect, it } from "vitest";

import { RequestRejected, SlidingWindowLimiter, clientAddress, isSameOrigin, readJsonBody } from "@/lib/http";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";
import nextConfig from "../next.config.mjs";

describe("301 redirect", () => {
  it("sends /about-commonlife to /about with status 301", async () => {
    expect(nextConfig.redirects).toBeTypeOf("function");
    const redirects = await nextConfig.redirects!();
    expect(redirects).toContainEqual({
      source: "/about-commonlife",
      destination: "/about",
      statusCode: 301,
    });
  });
});

describe("security headers", () => {
  it("closes framing, sniffing, and remote script hosts in production", () => {
    const headers = securityHeaders("production");
    const csp = contentSecurityPolicy("production");
    const byName = Object.fromEntries(headers.map((header: { key: string; value: string }) => [header.key, header.value]));
    expect(byName["X-Content-Type-Options"]).toBe("nosniff");
    expect(byName["X-Frame-Options"]).toBe("DENY");
    expect(byName["Strict-Transport-Security"]).toMatch(/max-age=31536000/);
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toContain("*");
    expect(csp).not.toContain("unsafe-eval");
    expect(headers.some((header: { key: string }) => header.key.toLowerCase() === "access-control-allow-origin")).toBe(false);
  });
});

describe("request gate", () => {
  it("blocks the next request after the window fills", () => {
    let now = 1_000_000;
    const limiter = new SlidingWindowLimiter(5, 60_000, () => now);
    for (let i = 0; i < 5; i += 1) expect(limiter.check("198.51.100.10").ok).toBe(true);
    const blocked = limiter.check("198.51.100.10");
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
    now += 61_000;
    expect(limiter.check("198.51.100.10").ok).toBe(true);
  });

  it("rejects a cross-site browser request and a declared oversized body", async () => {
    const cross = new Request("https://commonlife.example/api/contact", {
      headers: { origin: "https://evil.example", host: "commonlife.example", "sec-fetch-site": "cross-site" },
    });
    expect(isSameOrigin(cross)).toBe(false);
    const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 198.51.100.8" });
    expect(clientAddress(headers)).toBe("198.51.100.8");
    const request = new Request("https://commonlife.example/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": "999999" },
      body: "{}",
    });
    await expect(readJsonBody(request, 1024)).rejects.toBeInstanceOf(RequestRejected);
  });
});
