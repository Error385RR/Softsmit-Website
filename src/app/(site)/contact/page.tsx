import type { Metadata } from "next";
import { ContactCards } from "@/components/contact/ContactCards";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { PageIntro } from "@/components/ui/PageIntro";
import { getServices } from "@/lib/content";
import { getContactMethods } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote or contact Softsmith by WhatsApp, email or phone.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [services, contactMethods] = await Promise.all([getServices(), getContactMethods()]);
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
          <p className="mt-3 max-w-xl text-muted">Fields marked * are required. We&apos;ll get back to you based on what you tell us here.</p>
          <div className="mt-8 max-w-2xl">
            <QuoteForm services={services} contactMethods={contactMethods} />
          </div>
        </div>
      </section>
    </>
  );
}
