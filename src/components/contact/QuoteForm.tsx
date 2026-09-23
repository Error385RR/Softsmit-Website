"use client";

import { useId, useRef, useState } from "react";
import { ContactMethodsList } from "@/components/contact/ContactMethodsList";
import type { ContactMethod } from "@/lib/contact";
import type { Service } from "@/content/types";
import type { ContactPreference, QuoteRequest, SubmitState } from "@/lib/quote/types";
import { validateQuote, type Errors } from "@/lib/quote/validate";

const inputClass =
  "block min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2 text-fg placeholder:text-muted aria-[invalid=true]:border-red-600";

const empty: QuoteRequest = {
  name: "",
  business: "",
  email: "",
  phone: "",
  serviceId: "",
  description: "",
  budget: "",
  preferredContact: "",
  message: "",
};

function Field({ id, label, hint, error, required, children }: { id: string; label: string; hint?: string; error?: string; required?: boolean; children: (aria: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string; required?: boolean }) => React.ReactNode }) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className="ms-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, required })}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function QuoteForm({ services, contactMethods }: { services: Service[]; contactMethods: ContactMethod[] }) {
  const formId = useId();
  const [values, setValues] = useState<QuoteRequest>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const liveRegionRef = useRef<HTMLParagraphElement>(null);

  const set = <K extends keyof QuoteRequest>(key: K, v: QuoteRequest[K]) => setValues((p) => ({ ...p, [key]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.status === "submitting") return;

    const serviceIds = services.map((s) => s.id);
    const check = validateQuote({ ...values, service: values.serviceId }, serviceIds);
    if (!check.ok) {
      setErrors(check.errors);
      setState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setErrors({});
    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, service: values.serviceId, company: honeypotRef.current?.value ?? "" }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; errors?: Record<string, string> };
      if (data.ok) {
        setState({ status: "success" });
        // Values are intentionally kept in state (not cleared) in case the
        // visitor wants to review what they sent before leaving the page.
      } else {
        setErrors((data.errors as Errors) ?? {});
        setState({ status: "error", message: data.message ?? "Could not send your request. Please try again." });
      }
    } catch {
      setState({ status: "error", message: "Could not send your request — check your connection and try again." });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-accent bg-surface p-6">
        <p className="font-display text-2xl font-medium">Thanks — your request is in.</p>
        <p className="mt-2 text-muted">We&apos;ll get back to you soon. If it&apos;s urgent, you can also reach us directly below.</p>
        <div className="mt-6">
          <ContactMethodsList methods={contactMethods} />
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setValues(empty);
              setState({ status: "idle" });
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 py-2.5 font-medium transition-colors hover:bg-bg"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot: hidden from sighted and keyboard/screen-reader users, left open for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input ref={honeypotRef} id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p ref={liveRegionRef} aria-live="polite" className="sr-only">
        {state.status === "submitting" ? "Sending your request…" : ""}
      </p>

      {state.status === "error" ? (
        <p role="alert" className="rounded-md border border-red-600 p-3 font-medium text-red-700 dark:text-red-400">
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          {(a) => <input {...a} type="text" autoComplete="name" maxLength={100} value={values.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="business" label="Business name" error={errors.business}>
          {(a) => <input {...a} type="text" autoComplete="organization" maxLength={100} value={values.business} onChange={(e) => set("business", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          {(a) => <input {...a} type="email" inputMode="email" autoComplete="email" maxLength={254} value={values.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
          {(a) => <input {...a} type="tel" autoComplete="tel" maxLength={30} value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />}
        </Field>
      </div>

      <Field id="service" label="Service needed" required error={errors.serviceId}>
        {(a) => (
          <select {...a} value={values.serviceId} onChange={(e) => set("serviceId", e.target.value)} className={inputClass}>
            <option value="">Choose one…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="description" label="Brief description" required hint="What do you need, and what problem is it solving?" error={errors.description}>
        {(a) => <textarea {...a} rows={5} maxLength={2000} value={values.description} onChange={(e) => set("description", e.target.value)} className={`${inputClass} resize-y leading-normal`} />}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="budget" label="Budget" hint="A rough number or range is fine." error={errors.budget}>
          {(a) => <input {...a} type="text" maxLength={100} value={values.budget} onChange={(e) => set("budget", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="preferredContact" label="Preferred contact method" error={errors.preferredContact}>
          {(a) => (
            <select {...a} value={values.preferredContact} onChange={(e) => set("preferredContact", e.target.value as ContactPreference | "")} className={inputClass}>
              <option value="">No preference</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
            </select>
          )}
        </Field>
      </div>

      <Field id="message" label="Additional message" error={errors.message}>
        {(a) => <textarea {...a} rows={3} maxLength={2000} value={values.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass} resize-y leading-normal`} />}
      </Field>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {state.status === "submitting" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
