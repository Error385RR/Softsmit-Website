import { faqs } from "@/content/faq";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";

/**
 * Data-access boundary for content. Today it reads local modules; later these
 * functions can fetch from Supabase, a CMS or an API without touching the UI.
 */
export async function getServices() {
  return services;
}
export async function getProcessSteps() {
  return processSteps;
}
export async function getFaqs() {
  return faqs;
}
export async function getFeaturedFaqs() {
  return faqs.filter((f) => f.featured);
}
import { projects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";

export async function getTestimonials() {
  return testimonials;
}
export async function getProjects() {
  return projects;
}
