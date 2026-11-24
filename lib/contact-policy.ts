import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";

import {
  CONTACT_ERRORS,
  CONTACT_LIMITS,
  INQUIRY_IDS,
  type InquiryId,
} from "./contact-fields";

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const EMAIL =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const blockedAddresses = new BlockList();
blockedAddresses.addSubnet("0.0.0.0", 8, "ipv4");
blockedAddresses.addSubnet("10.0.0.0", 8, "ipv4");
blockedAddresses.addSubnet("100.64.0.0", 10, "ipv4");
blockedAddresses.addSubnet("127.0.0.0", 8, "ipv4");
blockedAddresses.addSubnet("169.254.0.0", 16, "ipv4");
blockedAddresses.addSubnet("172.16.0.0", 12, "ipv4");
blockedAddresses.addSubnet("192.0.0.0", 24, "ipv4");
blockedAddresses.addSubnet("192.0.2.0", 24, "ipv4");
blockedAddresses.addSubnet("192.168.0.0", 16, "ipv4");
blockedAddresses.addSubnet("198.18.0.0", 15, "ipv4");
blockedAddresses.addSubnet("198.51.100.0", 24, "ipv4");
blockedAddresses.addSubnet("203.0.113.0", 24, "ipv4");
blockedAddresses.addSubnet("224.0.0.0", 4, "ipv4");
blockedAddresses.addSubnet("240.0.0.0", 4, "ipv4");
blockedAddresses.addAddress("::", "ipv6");
blockedAddresses.addAddress("::1", "ipv6");
blockedAddresses.addSubnet("fc00::", 7, "ipv6");
blockedAddresses.addSubnet("fe80::", 10, "ipv6");
blockedAddresses.addSubnet("ff00::", 8, "ipv6");
blockedAddresses.addSubnet("2001:db8::", 32, "ipv6");

const BLOCKED_HOSTS = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata",
  "metadata.google.internal",
]);

export class RequestRejected extends Error {
  readonly status: number;
  readonly clientError: string;
  readonly retryAfter?: number;

  constructor(status: number, clientError: string, retryAfter?: number) {
    super(clientError);
    this.name = "RequestRejected";
    this.status = status;
    this.clientError = clientError;
    this.retryAfter = retryAfter;
  }
}

export type ContactValue = {
  inquiry: InquiryId;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; honeypotTripped: true }
  | { ok: true; honeypotTripped: false; value: ContactValue }
  | { ok: false };

type RateDecision = { ok: true } | { ok: false; retryAfterSeconds: number };

export class SlidingWindowLimiter {
  private readonly hits = new Map<string, number[]>();
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly now: () => number;

  constructor(limit: number, windowMs: number, now: () => number = Date.now) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.now = now;
  }

  check(key: string): RateDecision {
    const current = this.now();
    const windowStart = current - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((stamp) => stamp > windowStart);
    if (recent.length >= this.limit) {
      const oldest = recent[0] ?? current;
      const retryAfterSeconds = Math.max(1, Math.ceil((oldest + this.windowMs - current) / 1000));
      this.hits.set(key, recent);
      return { ok: false, retryAfterSeconds };
    }
    recent.push(current);
    this.hits.set(key, recent);
    this.prune(windowStart);
    return { ok: true };
  }

  private prune(windowStart: number) {
    if (this.hits.size < 5000) return;
    for (const key of Array.from(this.hits.keys())) {
      const stamps = this.hits.get(key) ?? [];
      if (stamps.every((stamp) => stamp <= windowStart)) this.hits.delete(key);
    }
  }
}

export function isNonPublicIp(address: string): boolean {
  const normalized = address.trim().toLowerCase().split("%")[0] ?? "";
  const mapped = normalized.startsWith("::ffff:") ? normalized.slice("::ffff:".length) : normalized;
  const family = isIP(mapped);
  if (family === 4) return blockedAddresses.check(mapped, "ipv4");
  if (isIP(normalized) === 6) return blockedAddresses.check(normalized, "ipv6");
  return true;
}

export function webhookUrlProblem(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return "unparseable";
  }
  if (url.protocol !== "https:") return "protocol";
  if (url.username || url.password) return "credentials";
  if (url.port && url.port !== "443") return "port";
  const hostname = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (!hostname || BLOCKED_HOSTS.has(hostname)) return "host";
  if (
    hostname.endsWith(".local") ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".localdomain")
  ) {
    return "host";
  }
  if (isIP(hostname) !== 0 && isNonPublicIp(hostname)) return "address";
  return null;
}

export async function webhookResolvesPublicly(raw: string): Promise<boolean> {
  if (webhookUrlProblem(raw)) return false;
  const hostname = new URL(raw).hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (isIP(hostname) !== 0) return !isNonPublicIp(hostname);
  let records: { address: string }[];
  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    return false;
  }
  if (records.length === 0) return false;
  return records.every((record) => !isNonPublicIp(record.address));
}

export function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;
  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

export function clientAddress(headers: Headers): string {
  const candidates = [
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
  ];
  for (const raw of candidates) {
    if (!raw) continue;
    const parts = raw
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const choice = parts[parts.length - 1];
    if (choice && choice.length <= 200 && !CONTROL_CHARS.test(choice)) return choice;
  }
  return "unknown";
}

export async function readJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().replace(/\s/g, "").startsWith("application/json")) {
    throw new RequestRejected(415, CONTACT_ERRORS.unsupported);
  }

  const declared = request.headers.get("content-length");
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new RequestRejected(413, CONTACT_ERRORS.tooLarge);
  }
  if (!request.body) throw new RequestRejected(400, CONTACT_ERRORS.invalid);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxBytes) throw new RequestRejected(413, CONTACT_ERRORS.tooLarge);
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof RequestRejected) throw error;
    throw new RequestRejected(400, CONTACT_ERRORS.invalid);
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new RequestRejected(400, CONTACT_ERRORS.invalid);
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new RequestRejected(400, CONTACT_ERRORS.invalid);
  }
}

function requiredText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max || CONTROL_CHARS.test(trimmed)) return null;
  return trimmed;
}

export function validateContact(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false };
  const record = body as Record<string, unknown>;

  const honeypot = record.cl_hp;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { ok: true, honeypotTripped: true };
  }
  if (honeypot !== undefined && honeypot !== null && honeypot !== "") {
    return { ok: false };
  }

  const inquiry = record.inquiry;
  if (typeof inquiry !== "string" || !INQUIRY_IDS.includes(inquiry as InquiryId)) {
    return { ok: false };
  }

  const firstName = requiredText(record.firstName, CONTACT_LIMITS.firstName);
  const lastName = requiredText(record.lastName, CONTACT_LIMITS.lastName);
  const email = requiredText(record.email, CONTACT_LIMITS.email);
  const organization = requiredText(record.organization, CONTACT_LIMITS.organization);
  const message = requiredText(record.message, CONTACT_LIMITS.message);
  const role =
    record.role === undefined || record.role === null || record.role === ""
      ? ""
      : requiredText(record.role, CONTACT_LIMITS.role);

  if (!firstName || !lastName || !email || !organization || !message || role === null) {
    return { ok: false };
  }
  if (!EMAIL.test(email) || email.includes("..")) return { ok: false };

  return {
    ok: true,
    honeypotTripped: false,
    value: {
      inquiry: inquiry as InquiryId,
      firstName,
      lastName,
      email,
      organization,
      role,
      message,
    },
  };
}
