import { NextResponse } from "next/server";

import { corsHeaders } from "./cors";
import type { ParseResult } from "./forms";
import { FORM_BODY_LIMIT, RequestRejected, SlidingWindowLimiter, gateRequest, readJsonBody } from "./http";

export function jsonError(request: Request, status: number, error: string, fields?: string[], retryAfter?: number) {
  const headers = corsHeaders(request);
  headers.set("cache-control", "no-store");
  if (retryAfter) headers.set("retry-after", String(retryAfter));
  const body = fields && fields.length > 0 ? { error, fields } : { error };
  return NextResponse.json(body, { status, headers });
}

export function jsonOk(request: Request) {
  const headers = corsHeaders(request);
  headers.set("cache-control", "no-store");
  return NextResponse.json({ ok: true }, { status: 200, headers });
}

export function optionsResponse(request: Request) {
  const headers = corsHeaders(request);
  headers.set("cache-control", "no-store");
  return new NextResponse(null, { status: 204, headers });
}

export async function acceptForm<T>(
  request: Request,
  ipLimiter: SlidingWindowLimiter,
  globalLimiter: SlidingWindowLimiter,
  parse: (body: unknown) => ParseResult<T>,
  invalidMessage: string,
) {
  try {
    const gate = gateRequest(request, ipLimiter, globalLimiter);
    if (!gate.ok) return jsonError(request, gate.status, gate.error, undefined, gate.retryAfter);

    const body = await readJsonBody(request, FORM_BODY_LIMIT);
    const parsed = parse(body);
    if (!parsed.ok) return jsonError(request, 400, invalidMessage, parsed.fields);
    if (parsed.honeypot) return jsonOk(request);

    // TODO: delivery pending Keven
    return jsonOk(request);
  } catch (error) {
    if (error instanceof RequestRejected) {
      return jsonError(request, error.status, error.clientError, undefined, error.retryAfter);
    }
    return jsonError(request, 400, invalidMessage);
  }
}
