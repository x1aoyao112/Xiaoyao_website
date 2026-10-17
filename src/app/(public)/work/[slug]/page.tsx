import { notFound } from "next/navigation";
import { publicProjects } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { safeExternalUrl } from "@/lib/content";
import { PageIntro } from "@/components/portfolio/page-intro";
import { PortfolioImage } from "@/components/portfolio/content-image";
import { ContentSections } from "@/components/portfolio/content-sections";
import { TextLink } from "@/components/portfolio/text-link";

const findProject = (slug: string) =>
  publicProjects.find((project) => project.slug === slug) ?? notFound();
export function generateStaticParams() {
  return publicProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = findProject((await params).slug);
  return pageMetadata(project.title, project.summary, `/work/${project.slug}`);
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = findProject((await params).slug);
  const sections = [
    { heading: "Overview", paragraphs: project.overview ?? [] },
    { heading: "Problem or objective", paragraphs: project.objective ?? [] },
    { heading: "My contribution", paragraphs: project.myRole ?? [] },
    { heading: "Approach", paragraphs: project.approach ?? [] },
    { heading: "Results", paragraphs: project.results ?? [] },
    { heading: "What I learned", paragraphs: project.learned ?? [] },
  ];
  const tools = project.tools.filter((tool) => tool.trim());
  const links = (project.links ?? []).filter(
    (link) => link.label.trim() && safeExternalUrl(link.url),
  );
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        title={project.title}
        description={project.summary}
        label={project.category}
      />
      <div className="max-w-4xl space-y-12">
        <PortfolioImage image={project.coverImage} cover />
        <ContentSections sections={sections} />
        {tools.length > 0 && (
          <section>
            <h2 className="section-title text-2xl">Tools used</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              {tools.join(" · ")}
            </p>
          </section>
        )}
        {(project.artifacts ?? []).map((image) => (
          <PortfolioImage key={image.src} image={image} cover />
        ))}
        {links.length > 0 && (
          <section>
            <h2 className="section-title text-2xl">Links & artifacts</h2>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={safeExternalUrl(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="border-t border-border pt-6">
          <TextLink href="/work">Back to all work</TextLink>
        </div>
      </div>
    </main>
  );
}
