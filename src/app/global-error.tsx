"use client";

import { useEffect } from "react";
import "./globals.css";

// Only renders if the root layout itself throws — must define its own
// <html>/<body> and import global styles directly, since it replaces the
// root layout entirely rather than being wrapped by it.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            body { background: #0f1419 !important; color: #e8eaed !important; }
            body p { color: #9aa3af !important; }
          }
        `}</style>
      </head>
      <body className="flex min-h-dvh flex-col items-center justify-center px-6 text-center antialiased" style={{ background: "#faf9f6", color: "#14181f" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 500 }}>Something went wrong</h1>
        <p style={{ marginTop: "0.75rem", maxWidth: "28rem", color: "#566070" }}>
          Sorry about that — the site ran into a problem loading. Please try again.
        </p>
        <button
          type="button"
          onClick={retry}
          style={{ marginTop: "2rem", minHeight: "2.75rem", padding: "0.625rem 1.25rem", borderRadius: "0.375rem", background: "#0e7c86", color: "#fff", fontWeight: 500 }}
        >
          Try again
        </button>
        {error.digest ? <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#566070" }}>Reference: {error.digest}</p> : null}
      </body>
    </html>
  );
}
