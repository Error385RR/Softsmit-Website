import type { FaqEntry } from "@/content/types";

/** Native <details> disclosures: keyboard accessible and working without JavaScript. */
export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <div className="max-w-3xl divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.id} className="faq group">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-start text-lg font-medium transition-colors hover:text-accent-text">
            <span>{item.question}</span>
            <svg className="faq-icon shrink-0 text-accent-text transition-transform duration-200" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="pb-5 pe-8 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
