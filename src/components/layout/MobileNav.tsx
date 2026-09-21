"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { NavLink } from "./NavLink";
import type { NavItem } from "@/content/types";

type Props = { items: readonly NavItem[]; cta: { label: string; href: string } };

/**
 * Disclosure-style menu built on <details>, so it opens and closes without JavaScript.
 * JS adds: Escape to close (focus returns to the button), close on outside click,
 * and close after navigating.
 */
export function MobileNav({ items, cta }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className="group md:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-fg transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" />
          <path className="hidden group-open:block" d="M6 6l12 12M18 6 6 18" />
        </svg>
      </summary>
      <nav aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-sm">
        <ul className="container-page flex flex-col py-3">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <NavLink href={item.href} label={item.label} className="block py-3.5 text-lg" />
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Button href={cta.href} className="w-full">
              {cta.label}
            </Button>
          </li>
        </ul>
      </nav>
    </details>
  );
}
