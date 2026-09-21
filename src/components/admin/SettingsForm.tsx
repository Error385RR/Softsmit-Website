"use client";

import { useActionState, useState } from "react";
import { saveSettingsAction, type SaveState } from "@/app/(admin)/admin/actions";
import type { SiteSettings } from "@/lib/settings/types";
import { Field, inputClass } from "./Field";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveSettingsAction, { status: "idle" });
  const [v, setV] = useState<SiteSettings>(initial);
  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setV((prev) => ({ ...prev, [key]: value }));
  const errors = state.errors ?? {};

  return (
    <form action={action} className="space-y-8" noValidate>
      <div aria-live="polite">
        {state.status === "saved" ? (
          <p role="status" className="rounded-md border border-accent p-3 font-medium text-accent-text">
            {state.message}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p role="alert" className="rounded-md border border-red-600 p-3 font-medium text-red-700 dark:text-red-400">
            {state.message}
          </p>
        ) : null}
      </div>

      <fieldset className="space-y-6">
        <legend className="font-display text-2xl font-medium">Contact details</legend>
        <p className="-mt-2 text-sm text-muted">Shown across the public site. Leave a field empty to hide that contact method.</p>
        <Field id="email" label="Email" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" inputMode="email" autoComplete="off" value={v.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="phone" label="Phone" hint="Include the country code, for example +971 50 123 4567." error={errors.phone}>
          {(a) => <input {...a} name="phone" type="tel" autoComplete="off" value={v.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="whatsapp" label="WhatsApp number" hint="Full international number, digits only, for example 971501234567." error={errors.whatsapp}>
          {(a) => <input {...a} name="whatsapp" type="text" inputMode="numeric" autoComplete="off" value={v.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className={inputClass} />}
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-2xl font-medium">WhatsApp button</legend>
        <div className="flex items-start gap-3">
          <input id="whatsappBubbleEnabled" name="whatsappBubbleEnabled" type="checkbox" checked={v.whatsappBubbleEnabled} onChange={(e) => set("whatsappBubbleEnabled", e.target.checked)} className="mt-1 size-5 accent-[var(--accent)]" />
          <label htmlFor="whatsappBubbleEnabled" className="font-medium">
            Show the floating WhatsApp button
          </label>
        </div>
        <Field id="whatsappMessage" label="Pre-filled message" hint="The text visitors start with when they open WhatsApp." error={errors.whatsappMessage}>
          {(a) => <input {...a} name="whatsappMessage" type="text" value={v.whatsappMessage} onChange={(e) => set("whatsappMessage", e.target.value)} className={inputClass} />}
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-2xl font-medium">Wording</legend>
        <Field id="tagline" label="Tagline" hint="Shown in the footer and the browser title." error={errors.tagline}>
          {(a) => <input {...a} name="tagline" type="text" value={v.tagline} onChange={(e) => set("tagline", e.target.value)} className={inputClass} />}
        </Field>
        <Field id="ctaPrimaryLabel" label="Main button text" hint="The main call-to-action button, for example “Request a Quote”." error={errors.ctaPrimaryLabel}>
          {(a) => <input {...a} name="ctaPrimaryLabel" type="text" value={v.ctaPrimaryLabel} onChange={(e) => set("ctaPrimaryLabel", e.target.value)} className={inputClass} />}
        </Field>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
