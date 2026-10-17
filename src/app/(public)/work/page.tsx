import { profile } from "@/content/profile";
import { publicProjects } from "@/content/public";
import { categories, filterCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/portfolio/page-intro";
import { CategoryFilter } from "@/components/portfolio/category-filter";
import { ProjectCard } from "@/components/portfolio/content-cards";

export const metadata = pageMetadata(
  "Work",
  `Projects and case studies by ${profile.name}, collected as they are ready to share.`,
  "/work",
);
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const query = await searchParams;
  const selected =
    typeof query.category === "string" ? query.category : undefined;
  const filtered = filterCategory(publicProjects, selected);
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        title="Projects and case studies."
        description="A collection of things I've worked on and ideas I've explored."
        label="Work"
      />
      <CategoryFilter
        base="/work"
        label="Project categories"
        categories={categories(publicProjects)}
        selected={selected}
      />
      {filtered.length ? (
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="max-w-xl border-t border-border pt-8 text-muted-foreground">
          No published projects yet. This space will grow as there’s work to
          share.
        </p>
      )}
    </main>
  );
}
