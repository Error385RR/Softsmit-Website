import type { Principle } from "@/content/types";

export function PrincipleList({ items }: { items: readonly Principle[] }) {
  return (
    <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <li key={p.title}>
          <h3 className="font-semibold">{p.title}</h3>
          <p className="mt-1.5 text-muted">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
