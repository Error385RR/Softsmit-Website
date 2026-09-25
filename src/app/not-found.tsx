import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

// Handles any URL that matches no route. Renders inside the root layout
// (so it gets the theme and fonts) but outside the (site) header/footer,
// since a genuinely unmatched path isn't part of that route group.
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-medium text-accent-text">404</p>
      <h1 className="font-display mt-4 text-3xl font-medium">Page not found</h1>
      <p className="mt-3 max-w-sm text-muted">The page you're looking for doesn't exist, or may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-strong">
          Go to homepage
        </Link>
        <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong px-5 py-2.5 font-medium transition-colors hover:bg-surface">
          Contact {site.name}
        </Link>
      </div>
    </div>
  );
}
