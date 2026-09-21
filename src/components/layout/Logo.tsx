import { AppLink as Link } from "@/components/ui/AppLink";
import { site } from "@/content/site";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight" aria-label={`${site.name} home`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="text-accent-text">
        <rect x="1.5" y="1.5" width="23" height="23" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 9 6.5 13l3 4M16.5 9l3 4-3 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{site.name}</span>
    </Link>
  );
}
