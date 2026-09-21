import { AppLink as Link } from "@/components/ui/AppLink";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-[0.95rem] font-medium transition-[background-color,border-color,transform] duration-150 active:translate-y-px";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  secondary: "border border-line-strong text-fg hover:border-accent-text hover:bg-surface",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & { variant?: Variant; className?: string };

export function Button({ variant = "primary", className = "", href, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const isExternal = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={cls} {...rest} />;
}
