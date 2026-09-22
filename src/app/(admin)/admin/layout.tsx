import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Softsmith admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="container-page max-w-3xl py-10 sm:py-16">
      {children}
    </main>
  );
}
