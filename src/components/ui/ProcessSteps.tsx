import type { ProcessStep } from "@/content/types";

/** The process is a true sequence, so an ordered list with step numbers is appropriate. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="border-t border-line-strong pt-5">
          <span className="text-sm font-semibold tabular-nums text-accent-text" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-semibold">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-1.5 text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
