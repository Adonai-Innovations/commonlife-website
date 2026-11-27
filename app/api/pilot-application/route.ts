import { NextResponse } from "next/server";

import { API_ERRORS, parsePilot } from "@/lib/forms";
import { FORM_BODY_LIMIT, RequestRejected, SlidingWindowLimiter, gateRequest, readJsonBody } from "@/lib/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

function jsonError(status: number, error: string, fields?: string[], retryAfter?: number) {
  const headers = new Headers({ "cache-control": "no-store" });
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  const body = fields && fields.length > 0 ? { error, fields } : { error };
  return NextResponse.json(body, { status, headers });
}

function jsonOk() {
  return NextResponse.json({ ok: true }, { status: 200, headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const gate = gateRequest(request, ipLimiter, globalLimiter);
    if (!gate.ok) return jsonError(gate.status, gate.error, undefined, gate.retryAfter);

    const body = await readJsonBody(request, FORM_BODY_LIMIT);
    const parsed = parsePilot(body);
    if (!parsed.ok) return jsonError(400, API_ERRORS.invalid, parsed.fields);
    if (parsed.honeypot) return jsonOk();

    // TODO: delivery pending Keven's OK
    return jsonOk();
  } catch (error) {
    if (error instanceof RequestRejected) {
      return jsonError(error.status, error.clientError, undefined, error.retryAfter);
    }
    return jsonError(400, API_ERRORS.invalid);
  }
}
