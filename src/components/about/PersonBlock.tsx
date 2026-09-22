import type { AboutPerson } from "@/content/types";

/** Shows the person behind Softsmith. Until filled in, shows the generic fallback (plus a dev-only reminder). */
export function PersonBlock({ person, fallback }: { person: AboutPerson; fallback: string }) {
  const hasBio = Boolean(person.bio);
  return (
    <div className="max-w-2xl">
      {hasBio ? (
        <>
          {person.name ? <p className="text-xl font-semibold">{person.name}</p> : null}
          {person.role ? <p className="text-muted">{person.role}</p> : null}
          <p className="mt-4 text-lg">{person.bio}</p>
        </>
      ) : (
        <p className="text-lg">{fallback}</p>
      )}
      {!hasBio && process.env.NODE_ENV !== "production" ? (
        <p className="mt-6 rounded-md border border-dashed border-amber p-4 text-sm text-muted">
          <strong className="text-fg">Placeholder (development only):</strong> add your name, role and a short bio in the dashboard under About. This note is hidden in production.
        </p>
      ) : null}
    </div>
  );
}
