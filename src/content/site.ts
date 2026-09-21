import type { NavItem } from "./types";

/**
 * Central business configuration. Change brand, tagline, navigation, CTA text
 * and feature switches here rather than inside components.
 * Contact details come from environment variables (see .env.example).
 */
export const site = {
  name: "Softsmith",
  tagline: "Practical, affordable digital solutions for small businesses.",
  description:
    "Softsmith is an independent software studio building websites, custom tools and automation for small businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  dir: "ltr" as "ltr" | "rtl",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
  },
  whatsappMessage: "Hello Softsmith, I would like to ask about a project.",
  cta: {
    primary: { label: "Request a Quote", href: "/contact#quote" },
    secondary: { label: "Explore Services", href: "/services" },
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  /** Optional sections. Enable once real content exists; nothing is shown until then. */
  features: {
    testimonials: false,
    projects: false,
  },
} as const;
