import { profile } from "@/content/profile";
import { publicJournal } from "@/content/public";
import { categories, filterCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/portfolio/page-intro";
import { ArticleCard } from "@/components/portfolio/content-cards";
import { CategoryFilter } from "@/components/portfolio/category-filter";

export const metadata = pageMetadata(
  "Journal",
  `Ideas, reflections, and things ${profile.name} is learning, collected in XY's Side Notes.`,
  "/journal",
);
export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const query = await searchParams;
  const selected =
    typeof query.category === "string" ? query.category : undefined;
  const entries = filterCategory(publicJournal, selected);
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        title="Thoughts, notes, and other things."
        description="A collection of ideas, reflections, and things I'm learning along the way."
        label="Journal"
      />
      <CategoryFilter
        base="/journal"
        label="Journal categories"
        categories={categories(publicJournal)}
        selected={selected}
      />
      {entries.length ? (
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <ArticleCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="max-w-xl border-t border-border pt-8 text-muted-foreground">
          No published notes yet. There’s room here for the next thought worth
          keeping.
        </p>
      )}
    </main>
  );
}
