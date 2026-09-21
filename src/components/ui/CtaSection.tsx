import { Button } from "@/components/ui/Button";
import { ContactMethods } from "@/components/ui/ContactMethods";
import { site } from "@/content/site";

export function CtaSection({ title, body }: { title: string; body: string }) {
  return (
    <section aria-labelledby="cta-heading" className="container-page py-16 sm:py-20">
      <div className="rounded-xl border border-line-strong bg-surface px-6 py-12 sm:px-12">
        <h2 id="cta-heading" className="font-display max-w-xl text-3xl font-medium sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">{body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Button href={site.cta.primary.href}>{site.cta.primary.label}</Button>
          <div className="text-[0.95rem]">
            <ContactMethods fallbackHref="/contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
