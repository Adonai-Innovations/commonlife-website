/**
 * Browser origins allowed to call the form endpoints.
 * CORS_ORIGINS is a comma-separated list. Unset means same-origin only.
 * "*" is never echoed, even if it appears in the list.
 */
export function allowedOrigins(raw: string | undefined = process.env.CORS_ORIGINS): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0 && origin !== "*");
}

export function corsHeaders(request: Request, raw: string | undefined = process.env.CORS_ORIGINS): Headers {
  const headers = new Headers();
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins(raw).includes(origin)) return headers;
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Accept");
  headers.set("Access-Control-Max-Age", "600");
  return headers;
}
