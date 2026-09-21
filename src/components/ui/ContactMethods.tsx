import { AppLink as Link } from "@/components/ui/AppLink";
import { getContactMethods } from "@/lib/contact";

/** Lists configured contact methods; falls back to a link to the contact page if none are set. */
export function ContactMethods({ fallbackHref }: { fallbackHref: string }) {
  const methods = getContactMethods();
  if (methods.length === 0) {
    return (
      <Link href={fallbackHref} className="text-muted transition-colors hover:text-accent-text">
        Contact us
      </Link>
    );
  }
  return (
    <ul className="space-y-2">
      {methods.map((m) => (
        <li key={m.id}>
          <a
            href={m.href}
            {...(m.id === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-muted transition-colors hover:text-accent-text"
          >
            <span className="text-fg">{m.label}:</span> <span dir="ltr">{m.value}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
