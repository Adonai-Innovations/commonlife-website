import { API_ERRORS } from "./forms";

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;

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

type RateDecision = { ok: true } | { ok: false; retryAfterSeconds: number };

export class SlidingWindowLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

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

export function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientAddress(headers: Headers): string {
  const candidates = [headers.get("x-real-ip"), headers.get("x-vercel-forwarded-for"), headers.get("x-forwarded-for")];
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
    throw new RequestRejected(415, API_ERRORS.unsupported);
  }

  const declared = request.headers.get("content-length");
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new RequestRejected(413, API_ERRORS.tooLarge);
  }
  if (!request.body) throw new RequestRejected(400, API_ERRORS.invalid);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > maxBytes) throw new RequestRejected(413, API_ERRORS.tooLarge);
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof RequestRejected) throw error;
    throw new RequestRejected(400, API_ERRORS.invalid);
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
    throw new RequestRejected(400, API_ERRORS.invalid);
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new RequestRejected(400, API_ERRORS.invalid);
  }
}

export const FORM_BODY_LIMIT = 32 * 1024;

export type GateResult =
  | { ok: true }
  | { ok: false; status: number; error: string; retryAfter?: number };

export function gateRequest(request: Request, ipLimiter: SlidingWindowLimiter, globalLimiter: SlidingWindowLimiter): GateResult {
  const globalHit = globalLimiter.check("global");
  if (!globalHit.ok) {
    return { ok: false, status: 429, error: API_ERRORS.rateLimited, retryAfter: globalHit.retryAfterSeconds };
  }
  const ipHit = ipLimiter.check(clientAddress(request.headers));
  if (!ipHit.ok) {
    return { ok: false, status: 429, error: API_ERRORS.rateLimited, retryAfter: ipHit.retryAfterSeconds };
  }
  if (!isSameOrigin(request)) return { ok: false, status: 403, error: API_ERRORS.blocked };
  return { ok: true };
}
