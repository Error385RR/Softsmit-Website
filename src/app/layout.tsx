import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { getSettings } from "@/lib/settings";

const fraunces = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-fraunces", weight: "500", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { tagline } = await getSettings();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: { siteName: site.name, type: "website", locale: "en" },
    twitter: { card: "summary" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
};

// Runs before first paint so the saved (or system) theme is applied with no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} dir={site.dir} suppressHydrationWarning className={fraunces.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
