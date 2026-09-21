import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { getTestimonials } from "@/lib/content";

/** Renders nothing until real testimonials exist AND the feature switch in site.ts is on. */
export async function TestimonialsSection() {
  if (!site.features.testimonials) return null;
  const items = await getTestimonials();
  if (items.length === 0) return null;
  return (
    <Section id="testimonials" title="What clients say">
      <ul className="grid gap-8 md:grid-cols-2">
        {items.map((t) => (
          <li key={t.id}>
            <blockquote className="text-lg">“{t.quote}”</blockquote>
            <p className="mt-3 text-sm text-muted">
              {t.author}
              {t.role ? `, ${t.role}` : ""}
              {t.business ? `, ${t.business}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
