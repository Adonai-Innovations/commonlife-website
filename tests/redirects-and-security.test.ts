import { describe, expect, it } from "vitest";

import { allowedOrigins, corsHeaders } from "@/lib/cors";
import { RequestRejected, SlidingWindowLimiter, clientAddress, isSameOrigin, readJsonBody } from "@/lib/http";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";
import nextConfig from "../next.config.mjs";

function channel(hex: string) {
  const value = parseInt(hex, 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground: string, background: string) {
  const lum = (hex: string) => {
    const raw = hex.replace("#", "");
    return 0.2126 * channel(raw.slice(0, 2)) + 0.7152 * channel(raw.slice(2, 4)) + 0.0722 * channel(raw.slice(4, 6));
  };
  const lighter = Math.max(lum(foreground), lum(background));
  const darker = Math.min(lum(foreground), lum(background));
  return (lighter + 0.05) / (darker + 0.05);
}

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

describe("cors allowlist", () => {
  it("echoes only an origin from CORS_ORIGINS and never a wildcard", () => {
    const env = "https://www.commonlife.ai, *, https://preview.example";
    expect(allowedOrigins(env)).toEqual(["https://www.commonlife.ai", "https://preview.example"]);
    const allowed = new Request("https://commonlife.example/api/contact", {
      headers: { origin: "https://www.commonlife.ai" },
    });
    expect(corsHeaders(allowed, env).get("access-control-allow-origin")).toBe("https://www.commonlife.ai");
    const star = new Request("https://commonlife.example/api/contact", { headers: { origin: "*" } });
    expect(corsHeaders(star, env).get("access-control-allow-origin")).toBeNull();
    const stranger = new Request("https://commonlife.example/api/contact", {
      headers: { origin: "https://evil.example" },
    });
    expect(corsHeaders(stranger, env).get("access-control-allow-origin")).toBeNull();
    expect(corsHeaders(allowed, "").get("access-control-allow-origin")).toBeNull();
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

describe("text contrast", () => {
  it("keeps the painted pairs at or above 4.5:1", () => {
    const pairs = [
      ["#FFFFFF", "#062F45"],
      ["#8EB5DB", "#062F45"],
      ["#FFFFFF", "#1370AF"],
      ["#062F45", "#FFFFFF"],
      ["#062F45", "#F5F7F9"],
      ["#0B4A6B", "#F5F7F9"],
      ["#0B4A6B", "#FFFFFF"],
      ["#9E5A10", "#FFFFFF"],
      ["#9E5A10", "#F5F7F9"],
    ];
    for (const [foreground, background] of pairs) {
      expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast("#8EB5DB", "#0B4A6B")).toBeLessThan(4.5);
    expect(contrast("#8EB5DB", "#1370AF")).toBeLessThan(4.5);
    expect(contrast("#9E5A10", "#062F45")).toBeLessThan(4.5);
  });
});
