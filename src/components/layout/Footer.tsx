import { AppLink as Link } from "@/components/ui/AppLink";
import { ContactMethods } from "@/components/ui/ContactMethods";
import { site } from "@/content/site";
import { getSettings } from "@/lib/settings";
import { Logo } from "./Logo";

export async function Footer() {
  const { tagline } = await getSettings();
  return (
    <footer className="mt-8 border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted">{tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-accent-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <div className="mt-3">
            <ContactMethods fallbackHref="/contact" />
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 pe-20 text-sm text-muted">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
