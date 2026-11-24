import { CONTACT_ERRORS } from "./contact-fields";
import { webhookResolvesPublicly, type ContactValue } from "./contact-policy";

const WEBHOOK_TIMEOUT_MS = 5000;

/**
 * CONTACT_WEBHOOK_URL is optional. When it is unset, a validated message is
 * accepted and neither stored nor forwarded. When it is set, it must be an
 * https URL on port 443 that resolves only to public addresses. Redirects are
 * not followed. CONTACT_WEBHOOK_TOKEN, when set, is sent as a bearer token and
 * is never returned to the browser.
 */
export async function deliverContact(
  value: ContactValue,
  env: NodeJS.ProcessEnv = process.env
): Promise<{ ok: true } | { ok: false; clientError: string }> {
  const destination = env.CONTACT_WEBHOOK_URL?.trim();
  if (!destination) return { ok: true };

  const allowed = await webhookResolvesPublicly(destination);
  if (!allowed) return { ok: false, clientError: CONTACT_ERRORS.delivery };

  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  const token = env.CONTACT_WEBHOOK_TOKEN?.trim();
  if (token) headers.authorization = `Bearer ${token}`;

  try {
    const response = await fetch(destination, {
      method: "POST",
      redirect: "error",
      headers,
      body: JSON.stringify(value),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    await response.body?.cancel().catch(() => undefined);
    if (!response.ok) return { ok: false, clientError: CONTACT_ERRORS.delivery };
    return { ok: true };
  } catch {
    return { ok: false, clientError: CONTACT_ERRORS.delivery };
  }
}
