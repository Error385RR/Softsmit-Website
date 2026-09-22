import { aboutContent } from "@/content/about";
import type { AboutContent } from "@/content/types";
import { loadAbout, loadFaqs, loadProcess, loadServices } from "@/lib/cms";
import { projects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";

/**
 * Data-access boundary for content. Reads dashboard-edited content from Supabase
 * and falls back to the built-in defaults in src/content/. Hidden items never reach the public site.
 */
export async function getServices() {
  return (await loadServices()).filter((s) => !s.hidden);
}
export async function getProcessSteps() {
  return (await loadProcess()).filter((s) => !s.hidden);
}
export async function getFaqs() {
  return (await loadFaqs()).filter((f) => !f.hidden);
}
/** Homepage FAQ preview: the questions marked as featured, or the first four if none are. */
export async function getFeaturedFaqs() {
  const visible = await getFaqs();
  const featured = visible.filter((f) => f.featured);
  return featured.length ? featured : visible.slice(0, 4);
}
export async function getAbout(): Promise<AboutContent> {
  const edited = await loadAbout();
  return {
    ...aboutContent,
    intro: edited.intro,
    philosophy: { ...aboutContent.philosophy, paragraphs: edited.paragraphs },
    approach: { ...aboutContent.approach, items: edited.approachItems },
    behind: { ...aboutContent.behind, person: edited.person },
  };
}
export async function getTestimonials() {
  return testimonials;
}
export async function getProjects() {
  return projects;
}
