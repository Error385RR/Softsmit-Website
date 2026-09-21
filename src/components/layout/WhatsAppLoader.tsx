"use client";

import dynamic from "next/dynamic";

// Loaded after the page is interactive, and only in the browser, so it never delays first render.
const Bubble = dynamic(() => import("./WhatsAppBubble").then((m) => m.WhatsAppBubble), { ssr: false });

export function WhatsAppLoader({ href }: { href: string }) {
  return <Bubble href={href} />;
}
