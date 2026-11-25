import { CONTACT_ERRORS } from "@/lib/contact-fields";
import { acceptForm } from "@/lib/form-post";
import { contactFormSchema } from "@/lib/form-schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return acceptForm(request, contactFormSchema, CONTACT_ERRORS.delivery);
}
