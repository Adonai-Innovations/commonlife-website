import { API_ERRORS, parsePilot } from "@/lib/forms";
import { acceptForm, optionsResponse } from "@/lib/form-route";
import { SlidingWindowLimiter } from "@/lib/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export function POST(request: Request) {
  return acceptForm(request, ipLimiter, globalLimiter, parsePilot, API_ERRORS.invalid);
}
