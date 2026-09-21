import { getContactMethods } from "@/lib/contact";

const hints = { whatsapp: "Message us directly", email: "Send us the details", phone: "Speak to us" } as const;

export async function ContactCards() {
  const methods = await getContactMethods();
  if (methods.length === 0) {
    return process.env.NODE_ENV !== "production" ? (
      <p className="rounded-md border border-dashed border-amber p-4 text-sm text-muted">
        <strong className="text-fg">Development only:</strong> no contact details configured. Add them to <code>.env.local</code> (see <code>.env.example</code>).
      </p>
    ) : null;
  }
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
