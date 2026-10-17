import type { ContentSection } from "@/types/content";
import { PortfolioImage } from "@/components/portfolio/content-image";
import { validImage } from "@/lib/public-files";

export function hasContent(section: ContentSection) {
  return (
    section.paragraphs.some((p) => p.trim()) ||
    Boolean(validImage(section.image))
  );
}

export function ContentSections({
  sections,
}: {
  sections: readonly ContentSection[];
}) {
  return (
    <div className="max-w-2xl space-y-10">
      {sections.filter(hasContent).map((section, index) => (
        <section key={index} className="space-y-5">
          {section.heading?.trim() && (
            <h2 className="section-title text-2xl sm:text-3xl">
              {section.heading}
            </h2>
          )}
          {section.paragraphs
            .filter((p) => p.trim())
            .map((paragraph, i) => (
              <p key={i} className="body-copy [overflow-wrap:anywhere]">
                {paragraph}
              </p>
            ))}
          <PortfolioImage image={section.image} cover />
        </section>
      ))}
    </div>
  );
}
