"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";

export function NavLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`transition-colors hover:text-accent-text aria-[current=page]:text-accent-text ${className}`}
    >
      {label}
    </Link>
  );
}
