import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject, JournalEntry } from "@/types/content";
import { PortfolioImage } from "@/components/portfolio/content-image";
import { formatDate } from "@/lib/content";

export function ProjectCard({
  project,
  heading = "h2",
}: {
  project: PortfolioProject;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <article className="min-w-0 border-b border-border pb-7">
      <PortfolioImage image={project.coverImage} />
      <p className="mt-5 text-sm text-muted-foreground">{project.category}</p>
      <Heading className="mt-3 font-serif text-2xl leading-snug text-editorial [overflow-wrap:anywhere]">
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-baseline gap-2 underline-offset-4 hover:underline"
        >
          {project.title}
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </Heading>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {project.summary}
      </p>
      {project.tools.some((t) => t.trim()) && (
        <p className="mt-4 text-xs text-muted-foreground">
          {project.tools.filter((t) => t.trim()).join(" · ")}
        </p>
      )}
    </article>
  );
}
export function ArticleCard({
  entry,
  heading = "h2",
}: {
  entry: JournalEntry;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <article className="min-w-0 border-b border-border pb-7">
      <PortfolioImage image={entry.coverImage} />
      <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span>{entry.category}</span>
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
      </p>
      <Heading className="mt-3 font-serif text-2xl leading-snug text-editorial [overflow-wrap:anywhere]">
        <Link
          href={`/journal/${entry.slug}`}
          className="underline-offset-4 hover:underline"
        >
          {entry.title}
        </Link>
      </Heading>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {entry.excerpt}
      </p>
    </article>
  );
}
