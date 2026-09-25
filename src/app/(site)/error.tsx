"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";

// Wrapped by (site)/layout.tsx, so the header/footer stay visible even when
// a page below this crashes. Never shows the raw error to the visitor.
export default function SiteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("[site error]", error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <h1 className="font-display text-3xl font-medium">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted">
        Sorry about that — this page ran into a problem. You can try again, or reach us directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong"
        >
          Try again
        </button>
        <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 py-2.5 font-medium transition-colors hover:bg-surface">
          Contact {site.name}
        </Link>
      </div>
      {error.digest ? <p className="mt-6 text-xs text-muted">Reference: {error.digest}</p> : null}
    </div>
  );
}
