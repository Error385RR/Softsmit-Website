import type { ContactMethod } from "@/lib/contact";

const hints = { whatsapp: "Message us directly", email: "Send us the details", phone: "Speak to us" } as const;

/**
 * Pure presentational list of contact methods. Takes already-fetched data as
 * a prop so it can be rendered from either a Server Component (ContactCards)
 * or a Client Component (QuoteForm's success state) without either one
 * needing to import/await server-only data fetching itself.
 */
export function ContactMethodsList({ methods }: { methods: ContactMethod[] }) {
  if (methods.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {methods.map((m) => (
        <li key={m.id}>
          <a
            href={m.href}
            {...(m.id === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="block h-full rounded-lg border border-line-strong p-5 transition-colors hover:border-accent-text hover:bg-surface"
          >
            <span className="block text-sm text-muted">{hints[m.id]}</span>
            <span className="mt-1 block text-lg font-semibold">{m.label}</span>
            <span className="mt-2 block break-words text-accent-text" dir="ltr">{m.value}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
