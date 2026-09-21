import type { Metadata } from "next";
import { CtaSection } from "@/components/ui/CtaSection";
import { FaqList } from "@/components/ui/FaqList";
import { PageIntro } from "@/components/ui/PageIntro";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about what Softsmith builds, how quotes work, and working with small businesses.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <PageIntro title="Frequently asked questions" intro="Answers to common questions. If yours isn't here, just ask." />
      <div className="container-page pb-4">
        <FaqList items={faqs} />
      </div>
      <CtaSection title="Still have a question?" body="Send us a message and we'll get back to you." />
    </>
  );
}
