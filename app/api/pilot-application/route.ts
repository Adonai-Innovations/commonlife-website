import { CONTACT_ERRORS } from "@/lib/contact-fields";
import { acceptForm } from "@/lib/form-route";
import { parsePilotApplication } from "@/lib/form-schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// TODO: Delivery is pending Keven's OK. This route validates and rate-limits only.
export async function POST(request: Request) {
  return acceptForm(request, parsePilotApplication, CONTACT_ERRORS.invalid);
}
