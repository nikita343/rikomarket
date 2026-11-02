import type { Faq } from "@/lib/landing";
import { Container, SectionHead } from "@/components/ui";

// Visible Q&A block. Rendered with <details> so it works without JavaScript and
// the answers stay in the HTML that search and answer engines read. The same
// items go into FAQPage JSON-LD on the page that renders this.
export function FaqSection({
  title,
  eyebrow,
  items,
  className = "bg-bg py-16",
}: {
  title: string;
  eyebrow?: string;
  items: Faq[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <section className={className}>
      <Container>
        <SectionHead eyebrow={eyebrow} title={title} className="mb-7" />
        <div className="grid max-w-[900px] gap-3">
          {items.map((f) => (
            <details
              key={f.q}
              className="group rounded-[4px] border border-line bg-white px-5 py-4 open:border-navy"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-bold text-navy [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <span aria-hidden className="text-xl leading-none text-red transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
