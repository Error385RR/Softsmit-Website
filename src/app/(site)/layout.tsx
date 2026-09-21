import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppLoader } from "@/components/layout/WhatsAppLoader";
import { site } from "@/content/site";
import { getContactMethods } from "@/lib/contact";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, methods] = await Promise.all([getSettings(), getContactMethods()]);
  const whatsapp = methods.find((m) => m.id === "whatsapp");
  const whatsappHref =
    whatsapp && settings.whatsappBubbleEnabled
      ? `${whatsapp.href}?text=${encodeURIComponent(settings.whatsappMessage || site.whatsappMessage)}`
      : null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {whatsappHref ? <WhatsAppLoader href={whatsappHref} /> : null}
    </>
  );
}
