import type { Metadata } from "next";
import { AppLink as Link } from "@/components/ui/AppLink";
import { PrincipleList } from "@/components/home/PrincipleList";
import { ServiceList } from "@/components/home/ServiceList";
import { Button } from "@/components/ui/Button";
import { CtaSection } from "@/components/ui/CtaSection";
import { FaqList } from "@/components/ui/FaqList";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Section } from "@/components/ui/Section";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { HeroVisual } from "@/components/visual/HeroVisual";
import { homeContent as c } from "@/content/home";
import { site } from "@/content/site";
import { getFeaturedFaqs, getProcessSteps, getServices } from "@/lib/content";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { tagline } = await getSettings();
  return {
    title: { absolute: `${site.name}: ${tagline}` },
    description: site.description,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [services, steps, faqs, settings] = await Promise.all([getServices(), getProcessSteps(), getFeaturedFaqs(), getSettings()]);

  return (
    <>
      <section className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.06] font-medium">{c.hero.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{c.hero.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={site.cta.primary.href}>{settings.ctaPrimaryLabel}</Button>
            <Button href={site.cta.secondary.href} variant="secondary">
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>
        <HeroVisual className="settle mx-auto w-full max-w-md lg:max-w-none" />
      </section>

      <Section id="who-we-help" title={c.audience.title} intro={c.audience.intro} tone="tinted">
        <ul className="grid max-w-4xl gap-4 sm:grid-cols-2">
          {c.audience.problems.map((p) => (
            <li key={p} className="border-s-2 border-accent ps-4 text-lg">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="services" title={c.servicesTitle}>
        <ServiceList services={services} />
        <p className="mt-8">
          <Link href="/services" className="font-medium text-accent-text underline underline-offset-4 hover:no-underline">
            See all services
          </Link>
        </p>
      </Section>

      <Section id="why" title={c.whyTitle} tone="tinted">
        <PrincipleList items={c.principles} />
      </Section>

      <Section id="process" title={c.processTitle}>
        <ProcessSteps steps={steps} />
        <p className="mt-8">
          <Link href="/process" className="font-medium text-accent-text underline underline-offset-4 hover:no-underline">
            Read more about the process
          </Link>
        </p>
      </Section>

      {faqs.length > 0 ? (
        <Section id="faq" title={c.faqTitle} tone="tinted">
          <FaqList items={faqs} />
          <p className="mt-8">
            <Link href="/faq" className="font-medium text-accent-text underline underline-offset-4 hover:no-underline">
              See all questions
            </Link>
          </p>
        </Section>
      ) : null}

      <TestimonialsSection />

      <CtaSection title={c.finalCta.title} body={c.finalCta.body} />
    </>
  );
}
