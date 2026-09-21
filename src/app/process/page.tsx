import type { Metadata } from "next";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { getProcessSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process",
  description: "How working with Softsmith goes, from telling us what you need to launch. No technical knowledge required.",
  alternates: { canonical: "/process" },
};

const goodToKnow = [
  { title: "You don't need to understand software", body: "You describe the business problem. Choosing the right approach is our job, and we explain each decision in plain language." },
  { title: "Prices come from your requirements", body: "We don't publish fixed prices because every project is different. You receive a quote based on what will actually be built." },
  { title: "Timing is agreed, not guessed", body: "We don't promise delivery times in advance. Once we understand your requirements, we tell you what is realistic for your project." },
];

export default async function ProcessPage() {
  const steps = await getProcessSteps();
  return (
    <>
      <PageIntro
        title="How working together goes"
        intro="Six simple steps, from your first message to a working solution. You stay in control and never have to deal with technical jargon."
      />
      <section aria-labelledby="steps-heading" className="container-page pb-16">
        <h2 id="steps-heading" className="sr-only">
          The steps
        </h2>
        <ol className="max-w-3xl divide-y divide-line border-y border-line">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-2 py-7 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-3xl font-medium text-accent-text tabular-nums" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="know-heading" className="border-y border-line bg-surface">
        <div className="container-page py-16">
          <h2 id="know-heading" className="font-display text-3xl font-medium">
            Good to know
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {goodToKnow.map((g) => (
              <li key={g.title}>
                <h3 className="font-semibold">{g.title}</h3>
                <p className="mt-2 text-muted">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection title="Ready to start?" body="Tell us what you need. It doesn't have to be well defined; we'll work it out together." />
    </>
  );
}
