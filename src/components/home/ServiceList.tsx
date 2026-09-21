import { AppLink as Link } from "@/components/ui/AppLink";
import type { Service } from "@/content/types";

export function ServiceList({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
      {services.map((s) => (
        <li key={s.id} className="border-t border-line-strong py-6">
          <h3 className="font-display text-2xl font-medium">
            <Link href={`/services#${s.id}`} className="hover:text-accent-text">
              {s.title}
            </Link>
          </h3>
          <p className="mt-3 text-muted">{s.summary}</p>
        </li>
      ))}
    </ul>
  );
}
