import { NextResponse } from "next/server";

import { CONTACT_ERRORS, CONTACT_MAX_BODY_BYTES } from "./contact-fields";
import {
  RequestRejected,
  SlidingWindowLimiter,
  clientAddress,
  isSameOrigin,
  readJsonBody,
} from "./contact-policy";

/**
 * TODO: Delivery is pending Keven's OK.
 * Do not send email, call a webhook, or read a delivery environment variable here.
 */

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

function jsonError(status: number, error: string, extra?: Record<string, unknown>, retryAfter?: number) {
  const headers = new Headers({ "cache-control": "no-store" });
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  return NextResponse.json({ error, ...extra }, { status, headers });
}

export async function acceptForm(
  request: Request,
  parse: (body: unknown) =>
    | { ok: false; fields: Record<string, true> }
    | { ok: true; ignored: true }
    | { ok: true; ignored: false },
  invalidMessage: string,
) {
  try {
    const globalHit = globalLimiter.check("global");
    if (!globalHit.ok) return jsonError(429, CONTACT_ERRORS.rateLimited, undefined, globalHit.retryAfterSeconds);
    const ipHit = ipLimiter.check(clientAddress(request.headers));
    if (!ipHit.ok) return jsonError(429, CONTACT_ERRORS.rateLimited, undefined, ipHit.retryAfterSeconds);
    if (!isSameOrigin(request)) return jsonError(403, CONTACT_ERRORS.blocked);

    const body = await readJsonBody(request, CONTACT_MAX_BODY_BYTES);
    const parsed = parse(body);
    if (!parsed.ok) return jsonError(400, invalidMessage, { fields: parsed.fields });
    return NextResponse.json({ ok: true }, { status: 200, headers: { "cache-control": "no-store" } });
  } catch (error) {
    if (error instanceof RequestRejected) {
      return jsonError(error.status, error.clientError, undefined, error.retryAfter);
    }
    return jsonError(400, invalidMessage);
  }
}
