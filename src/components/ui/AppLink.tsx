import Link from "next/link";
import type { ComponentProps } from "react";

/** next/link wrapper: one place to tune prefetching for the whole site (default = Next.js automatic prefetch). */
export function AppLink({ prefetch, ...props }: ComponentProps<typeof Link>) {
  return <Link {...(prefetch === undefined ? {} : { prefetch })} {...props} />;
}
