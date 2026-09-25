"use client";

import { useEffect } from "react";

// Wrapped by the panel layout, so the "Signed in as..." bar and the
// Settings/FAQs/Services/Process/About nav stay visible and usable.
export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("[admin error]", error);
  }, [error]);

  return (
    <div className="rounded-lg border border-red-600 p-6">
      <h1 className="font-display text-2xl font-medium">Something went wrong</h1>
      <p className="mt-2 text-muted">This section ran into a problem. Your other changes weren&apos;t affected — try again, or come back to it shortly.</p>
      <button
        type="button"
        onClick={retry}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong"
      >
        Try again
      </button>
      {error.digest ? <p className="mt-4 text-xs text-muted">Reference: {error.digest}</p> : null}
    </div>
  );
}
