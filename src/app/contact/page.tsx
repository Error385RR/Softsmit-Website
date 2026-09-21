import type { Metadata } from "next";
import { ContactCards } from "@/components/contact/ContactCards";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote or contact Softsmith by WhatsApp, email or phone.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Get in touch" intro="Tell us what you need, or reach out directly. You don't need to know exactly what you want yet." />
      <section aria-labelledby="direct-heading" className="container-page pb-14">
        <h2 id="direct-heading" className="font-display text-3xl font-medium">
          Contact us directly
        </h2>
        <div className="mt-6">
          <ContactCards />
        </div>
      </section>
      <section id="quote" aria-labelledby="quote-heading" className="border-t border-line bg-surface">
        <div className="container-page py-16">
          <h2 id="quote-heading" className="font-display text-3xl font-medium">
            Request a Quote
          </h2>
          {/* Milestone 3 replaces this notice with the quote form. */}
          <p className="mt-4 max-w-xl text-lg text-muted">The online quote form is being finished. In the meantime, contact us using any of the methods above.</p>
        </div>
      </section>
    </>
  );
}
