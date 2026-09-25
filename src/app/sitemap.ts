import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
