"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KEY = "softsmith:wa-dismissed";

/**
 * Small floating WhatsApp link. Appears after a short delay, can be dismissed,
 * stays dismissed for the browser session, and is hidden on /contact where
 * WhatsApp is already prominent (and the quote form lives).
 */
export function WhatsAppBubble({ href }: { href: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
    } catch {
      /* storage unavailable: just show it */
    }
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!visible || pathname === "/contact") return null;

  function dismiss() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
    document.getElementById("main")?.focus();
  }

  return (
    <div className="settle fixed end-4 z-30 bottom-[max(1rem,env(safe-area-inset-bottom))]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
        className="flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-[#1a7f4b] px-3 text-[0.95rem] font-medium text-white shadow-md transition-colors hover:bg-[#146b3e] sm:px-5"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M9.5 9.2c.3 2.6 2.6 4.9 5.3 5.3l1-1.3-2-1-.9.7c-.9-.4-1.6-1.1-2-2l.7-.9-1-2Z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide WhatsApp button"
        className="absolute -end-2 -top-2 flex size-7 items-center justify-center rounded-full border border-line-strong bg-bg text-fg shadow-sm transition-colors hover:bg-surface"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
