import { NextResponse } from "next/server";

import { CONTACT_ERRORS, CONTACT_MAX_BODY_BYTES } from "@/lib/contact-fields";
import {
  RequestRejected,
  SlidingWindowLimiter,
  clientAddress,
  isSameOrigin,
  readJsonBody,
  validateContact,
} from "@/lib/contact-policy";
import { deliverContact } from "@/lib/deliver-contact";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

function jsonError(status: number, error: string, retryAfter?: number) {
  const headers = new Headers({ "cache-control": "no-store" });
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  return NextResponse.json({ error }, { status, headers });
}

export async function POST(request: Request) {
  try {
    const globalHit = globalLimiter.check("global");
    if (!globalHit.ok) {
      return jsonError(429, CONTACT_ERRORS.rateLimited, globalHit.retryAfterSeconds);
    }
    const ipHit = ipLimiter.check(clientAddress(request.headers));
    if (!ipHit.ok) {
      return jsonError(429, CONTACT_ERRORS.rateLimited, ipHit.retryAfterSeconds);
    }
    if (!isSameOrigin(request)) return jsonError(403, CONTACT_ERRORS.blocked);

    const body = await readJsonBody(request, CONTACT_MAX_BODY_BYTES);

    const parsed = validateContact(body);
    if (!parsed.ok) return jsonError(400, CONTACT_ERRORS.invalid);
    if (parsed.honeypotTripped) {
      return NextResponse.json({ ok: true }, { status: 200, headers: { "cache-control": "no-store" } });
    }

    const delivered = await deliverContact(parsed.value);
    if (!delivered.ok) return jsonError(502, delivered.clientError);

    return NextResponse.json({ ok: true }, { status: 200, headers: { "cache-control": "no-store" } });
  } catch (error) {
    if (error instanceof RequestRejected) {
      return jsonError(error.status, error.clientError, error.retryAfter);
    }
    return jsonError(400, CONTACT_ERRORS.invalid);
  }
}
