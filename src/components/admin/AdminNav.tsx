"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Settings" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/process", label: "Process" },
  { href: "/admin/about", label: "About" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="mt-4 border-b border-line">
      <ul className="-mb-px flex flex-wrap gap-x-1">
        {links.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className="inline-flex min-h-11 items-center border-b-2 border-transparent px-3 text-[0.95rem] font-medium text-muted transition-colors hover:text-fg aria-[current=page]:border-accent aria-[current=page]:text-accent-text"
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
