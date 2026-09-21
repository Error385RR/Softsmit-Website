import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppLoader } from "@/components/layout/WhatsAppLoader";
import { site } from "@/content/site";
import { getContactMethods } from "@/lib/contact";

const fraunces = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-fraunces", weight: "500", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en" },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
};

// Runs before first paint so the saved (or system) theme is applied with no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const whatsapp = getContactMethods().find((m) => m.id === "whatsapp");
  const whatsappHref = whatsapp ? `${whatsapp.href}?text=${encodeURIComponent(site.whatsappMessage)}` : null;
  return (
    <html lang={site.locale} dir={site.dir} suppressHydrationWarning className={`${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
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
      </body>
    </html>
  );
}
