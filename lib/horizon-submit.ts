import { NextResponse } from "next/server";

import { CONTACT_ERRORS, CONTACT_MAX_BODY_BYTES } from "./contact-fields";
import { FORM_CHECK, type ParseResult } from "./horizon-forms";
import {
  RequestRejected,
  SlidingWindowLimiter,
  clientAddress,
  isSameOrigin,
  readJsonBody,
} from "./contact-policy";

function json(status: number, body: unknown, retryAfter?: number) {
  const headers = new Headers({ "cache-control": "no-store" });
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  return NextResponse.json(body, { status, headers });
}

/**
 * Shared form endpoint. Validates with the caller’s zod parser, rate-limits,
 * and never includes a stack trace. Delivery is intentionally not wired.
 */
export async function handleFormPost<T>(
  request: Request,
  parse: (body: unknown) => ParseResult<T>,
  ipLimiter: SlidingWindowLimiter,
  globalLimiter: SlidingWindowLimiter,
) {
  try {
    const globalHit = globalLimiter.check("global");
    if (!globalHit.ok) return json(429, { error: CONTACT_ERRORS.rateLimited }, globalHit.retryAfterSeconds);
    const ipHit = ipLimiter.check(clientAddress(request.headers));
    if (!ipHit.ok) return json(429, { error: CONTACT_ERRORS.rateLimited }, ipHit.retryAfterSeconds);
    if (!isSameOrigin(request)) return json(403, { error: CONTACT_ERRORS.blocked });

    const body = await readJsonBody(request, CONTACT_MAX_BODY_BYTES);
    const parsed = parse(body);
    if (!parsed.ok) return json(400, { error: FORM_CHECK, fields: parsed.fields });

    if (!parsed.honeypot) {
      // TODO(keven): delivery destination pending Keven's OK.
    }

    return json(200, { ok: true });
  } catch (error) {
    if (error instanceof RequestRejected) {
      return json(error.status, { error: error.clientError }, error.retryAfter);
    }
    return json(400, { error: FORM_CHECK });
  }
}
