import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { getSettings } from "@/lib/settings";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const { ctaPrimaryLabel } = await getSettings();
  const cta = { label: ctaPrimaryLabel, href: site.cta.primary.href };
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.95rem] font-medium md:flex">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
          <MobileNav items={site.nav} cta={cta} />
        </div>
      </div>
    </header>
  );
}
