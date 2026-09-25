import type { Metadata } from "next";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: "Websites and e-commerce, web applications, automation and integrations, and custom solutions for small businesses.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageIntro
        title="What we build"
        intro="Four broad areas, each covering a range of practical work. If your need doesn't fit neatly into one of them, that's what Custom Solutions is for."
      />
      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-heading`}
          className={i % 2 === 0 ? "border-t border-line" : "border-y border-line bg-surface"}
        >
          <div className="container-page grid gap-8 py-14 md:grid-cols-[1fr_1.1fr] md:gap-16">
            <div>
              <h2 id={`${s.id}-heading`} className="font-display text-3xl font-medium">
                {s.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{s.summary}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">What this can include</h3>
              <ul className="mt-3 space-y-2">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-s-2 border-accent ps-4">
                <p className="text-sm font-semibold">Example situation</p>
                <p className="mt-1 text-muted">{s.example}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
      <CtaSection title="Not sure which service you need?" body="Describe your situation in plain language and we will tell you what makes sense." />
    </>
  );
}
