import { site } from "@/content/site";

export type ContactMethod = { id: "email" | "phone" | "whatsapp"; label: string; value: string; href: string };

/** Builds the contact methods that have actually been configured. */
export function getContactMethods(): ContactMethod[] {
  const { email, phone, whatsapp } = site.contact;
  const methods: ContactMethod[] = [];
  if (whatsapp) {
    methods.push({ id: "whatsapp", label: "WhatsApp", value: `+${whatsapp.replace(/\D/g, "")}`, href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` });
  }
  if (email) methods.push({ id: "email", label: "Email", value: email, href: `mailto:${email}` });
  if (phone) methods.push({ id: "phone", label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  return methods;
}
