/** Business settings the owner can edit from the dashboard. */
export type SiteSettings = {
  tagline: string;
  email: string;
  phone: string;
  /** Digits only, international format (e.g. 971501234567). */
  whatsapp: string;
  whatsappMessage: string;
  whatsappBubbleEnabled: boolean;
  ctaPrimaryLabel: string;
};
