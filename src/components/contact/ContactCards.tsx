import { getContactMethods } from "@/lib/contact";
import { ContactMethodsList } from "./ContactMethodsList";

export async function ContactCards() {
  const methods = await getContactMethods();
  if (methods.length === 0) {
    return process.env.NODE_ENV !== "production" ? (
      <p className="rounded-md border border-dashed border-amber p-4 text-sm text-muted">
        <strong className="text-fg">Development only:</strong> no contact details configured. Add them to <code>.env.local</code> (see <code>.env.example</code>).
      </p>
    ) : null;
  }
  return <ContactMethodsList methods={methods} />;
}
