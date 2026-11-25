import { CONTACT_ERRORS } from "@/lib/contact-fields";
import { acceptForm } from "@/lib/form-post";
import { pilotFormSchema } from "@/lib/form-schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return acceptForm(request, pilotFormSchema, CONTACT_ERRORS.invalid);
}
