"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/(admin)/admin/actions";
import { Field, inputClass } from "./Field";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-6" noValidate>
      {state.error ? (
        <p role="alert" className="rounded-md border border-red-600 p-3 text-sm font-medium text-red-700 dark:text-red-400">
          {state.error}
        </p>
      ) : null}
      <Field id="email" label="Email">
        {(a) => <input {...a} name="email" type="email" autoComplete="username" required className={inputClass} />}
      </Field>
      <Field id="password" label="Password">
        {(a) => <input {...a} name="password" type="password" autoComplete="current-password" required className={inputClass} />}
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
