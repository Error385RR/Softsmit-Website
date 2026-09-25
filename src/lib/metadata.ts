import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Builds a page's metadata with Open Graph and Twitter fields set explicitly
 * (Next.js does not reliably inherit these from the base title/description),
 * so link previews on social platforms and messaging apps show correctly.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = path === "" ? "/" : path;
  const ogTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: ogTitle, description, url, type: "website", images: ["/opengraph-image"] },
    twitter: { title: ogTitle, description, images: ["/opengraph-image"] },
  };
}
