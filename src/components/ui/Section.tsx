import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "plain" | "tinted";
};

/** Consistent section shell: heading, optional intro, content. */
export function Section({ id, title, intro, children, tone = "plain" }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={tone === "tinted" ? "border-y border-line bg-surface" : ""}>
      <div className="container-page py-16 sm:py-20">
        <h2 id={headingId} className="font-display max-w-2xl text-3xl font-medium sm:text-4xl">
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
