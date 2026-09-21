import { getSettings } from "@/lib/settings";

export type ContactMethod = { id: "email" | "phone" | "whatsapp"; label: string; value: string; href: string };

/** Builds the contact methods that are currently configured (dashboard settings, else env defaults). */
export async function getContactMethods(): Promise<ContactMethod[]> {
  const { email, phone, whatsapp } = await getSettings();
  const methods: ContactMethod[] = [];
  if (whatsapp) {
    const digits = whatsapp.replace(/\D/g, "");
    methods.push({ id: "whatsapp", label: "WhatsApp", value: `+${digits}`, href: `https://wa.me/${digits}` });
  }
  if (email) methods.push({ id: "email", label: "Email", value: email, href: `mailto:${email}` });
  if (phone) methods.push({ id: "phone", label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  return methods;
}
