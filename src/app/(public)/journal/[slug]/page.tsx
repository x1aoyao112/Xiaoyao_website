import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { publicJournal } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/content";
import { PageIntro } from "@/components/portfolio/page-intro";
import { PortfolioImage } from "@/components/portfolio/content-image";
import { ContentSections } from "@/components/portfolio/content-sections";
import { TextLink } from "@/components/portfolio/text-link";

const findEntry = (slug: string) =>
  publicJournal.find((entry) => entry.slug === slug) ?? notFound();
export function generateStaticParams() {
  return publicJournal.map((entry) => ({ slug: entry.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = findEntry((await params).slug);
  return pageMetadata(entry.title, entry.excerpt, `/journal/${entry.slug}`, {
    date: entry.date,
    tags: entry.tags,
  });
}
export default async function JournalArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = findEntry((await params).slug);
  return (
    <main id="main-content" className="page-shell">
      <article className="max-w-4xl">
        <PageIntro
          title={entry.title}
          description={entry.excerpt}
          label={entry.category}
        />
        <p className="mb-10 text-sm text-muted-foreground">
          {profile.name} ·{" "}
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        </p>
        <div className="space-y-12">
          <PortfolioImage image={entry.coverImage} cover />
          <ContentSections sections={entry.sections} />
        </div>
        {entry.tags.some((tag) => tag.trim()) && (
          <ul
            aria-label="Article tags"
            className="mt-12 flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            {entry.tags
              .filter((tag) => tag.trim())
              .map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
          </ul>
        )}
      </article>
      <div className="mt-12 border-t border-border pt-6">
        <TextLink href="/journal">Back to the Journal</TextLink>
      </div>
    </main>
  );
}
