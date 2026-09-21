import type { Metadata } from "next";
import { PersonBlock } from "@/components/about/PersonBlock";
import { AppLink as Link } from "@/components/ui/AppLink";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { aboutContent as c } from "@/content/about";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Softsmith is an independent software studio building practical, affordable digital solutions for small businesses.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const services = await getServices();
  return (
    <>
      <PageIntro title={c.title} intro={c.intro} />

      <section aria-labelledby="philosophy-heading" className="container-page pb-16">
        <h2 id="philosophy-heading" className="font-display text-3xl font-medium">
          {c.philosophy.title}
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-lg">
          {c.philosophy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="border-y border-line bg-surface">
        <div className="container-page py-16">
          <h2 id="approach-heading" className="font-display text-3xl font-medium">
            {c.approach.title}
          </h2>
          <ul className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {c.approach.items.map((item) => (
              <li key={item.title}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="behind-heading" className="container-page py-16">
        <h2 id="behind-heading" className="font-display text-3xl font-medium">
          {c.behind.title}
        </h2>
        <div className="mt-5">
          <PersonBlock person={c.behind.person} fallback={c.behind.fallback} />
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="border-t border-line">
        <div className="container-page py-16">
          <h2 id="capabilities-heading" className="font-display text-3xl font-medium">
            {c.capabilitiesTitle}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="font-medium text-accent-text underline underline-offset-4 hover:no-underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection title="Have something in mind?" body="Tell us what you need and we will let you know honestly whether and how we can help." />
    </>
  );
}
