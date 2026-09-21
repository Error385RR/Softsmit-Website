import type { ReactNode } from "react";

type Props = { id: string; label: string; hint?: string; error?: string; children: (aria: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode };

/** Label + hint + error wrapper so every admin field is announced properly. */
export function Field({ id, label, hint, error, children }: Props) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "block min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2 text-fg placeholder:text-muted aria-[invalid=true]:border-red-600";
