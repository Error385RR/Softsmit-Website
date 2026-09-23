export type ContactPreference = "email" | "whatsapp" | "phone";

export type QuoteRequest = {
  name: string;
  business: string;
  email: string;
  phone: string;
  serviceId: string;
  description: string;
  budget: string;
  preferredContact: ContactPreference | "";
  message: string;
};

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: Partial<Record<keyof QuoteRequest, string>> };
