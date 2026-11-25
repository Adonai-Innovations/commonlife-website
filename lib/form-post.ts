import { NextResponse } from "next/server";
import type { ZodType } from "zod";

import { CONTACT_ERRORS, CONTACT_MAX_BODY_BYTES } from "@/lib/contact-fields";
import {
  RequestRejected,
  SlidingWindowLimiter,
  clientAddress,
  isSameOrigin,
  readJsonBody,
} from "@/lib/contact-policy";
import { fieldNames } from "@/lib/form-schemas";

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

function json(body: unknown, status: number, retryAfter?: number) {
  const headers = new Headers({ "cache-control": "no-store" });
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  return NextResponse.json(body, { status, headers });
}

/**
 * TODO: Delivery is pending Keven's OK. Do not send email, call a webhook, or
 * read CONTACT_WEBHOOK_URL / CONTACT_WEBHOOK_TOKEN until that destination is approved.
 */
export async function acceptForm(request: Request, schema: ZodType, alert: string) {
  try {
    const globalHit = globalLimiter.check("global");
    if (!globalHit.ok) {
      return json({ ok: false, error: alert, fields: [] }, 429, globalHit.retryAfterSeconds);
    }
    const ipHit = ipLimiter.check(clientAddress(request.headers));
    if (!ipHit.ok) {
      return json({ ok: false, error: alert, fields: [] }, 429, ipHit.retryAfterSeconds);
    }
    if (!isSameOrigin(request)) {
      return json({ ok: false, error: CONTACT_ERRORS.blocked, fields: [] }, 403);
    }

    const body = await readJsonBody(request, CONTACT_MAX_BODY_BYTES);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return json({ ok: false, error: alert, fields: fieldNames(parsed.error) }, 400);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    if (error instanceof RequestRejected) {
      return json({ ok: false, error: alert, fields: [] }, error.status, error.retryAfter);
    }
    return json({ ok: false, error: alert, fields: [] }, 400);
  }
}
