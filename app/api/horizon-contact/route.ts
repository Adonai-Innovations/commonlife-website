import { SlidingWindowLimiter } from "@/lib/contact-policy";
import { parseContact } from "@/lib/horizon-forms";
import { handleFormPost } from "@/lib/horizon-submit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ipLimiter = new SlidingWindowLimiter(5, 10 * 60 * 1000);
const globalLimiter = new SlidingWindowLimiter(30, 60 * 1000);

export async function POST(request: Request) {
  return handleFormPost(request, parseContact, ipLimiter, globalLimiter);
}
