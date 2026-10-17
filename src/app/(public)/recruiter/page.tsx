import { profile } from "@/content/profile";
import {
  publicSkills,
  publicExperience,
  publicProjects,
  publicSocialLinks,
} from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/card";
import {
  EducationBlock,
  SkillsList,
  Timeline,
} from "@/components/portfolio/profile-sections";
import { ProjectCard } from "@/components/portfolio/content-cards";
import { ResumeLink } from "@/components/portfolio/resume-link";
import { SocialLinks } from "@/components/portfolio/social-links";
import { TextLink } from "@/components/portfolio/text-link";

export const metadata = pageMetadata(
  "Recruiter Mode",
  `Professional profile: ${profile.education.degree} at ${profile.education.institution}, ${profile.education.expected ? "expected graduation" : "graduated"} ${profile.education.endYear}.`,
  "/recruiter",
);
export default function RecruiterPage() {
  const selected = publicProjects
    .filter((project) => project.recruiterRelevant)
    .slice(0, 3);
  return (
    <main id="main-content" className="page-shell pt-12 sm:pt-16">
      <Card tone="terminal" className="p-8 sm:p-12">
        <p className="text-sm text-terminal-muted">Recruiter Mode</p>
        <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7">
          {profile.education.degree} · {profile.education.institution}
        </p>
        <p className="mt-2 text-sm text-terminal-muted">
          {profile.education.expected ? "Expected graduation" : "Graduated"}:{" "}
          {profile.education.endYear}
        </p>
        <div aria-hidden="true" className="mt-8 h-0.5 w-12 bg-gold" />
      </Card>
      <section className="portfolio-section space-y-8">
        <h2 className="section-title text-editorial">Education</h2>
        <EducationBlock education={profile.education} />
        <TextLink href="/journey">View the full journey</TextLink>
      </section>
      {publicExperience.length > 0 && (
        <section className="portfolio-section space-y-8">
          <h2 className="section-title text-editorial">
            Experience & milestones
          </h2>
          <Timeline entries={publicExperience} />
        </section>
      )}
      {publicSkills.length > 0 && (
        <section className="portfolio-section space-y-8">
          <h2 className="section-title text-editorial">Skills</h2>
          <SkillsList groups={publicSkills} />
        </section>
      )}
      {selected.length > 0 && (
        <section className="portfolio-section space-y-8">
          <h2 className="section-title text-editorial">Selected projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selected.map((project) => (
              <ProjectCard key={project.slug} project={project} heading="h3" />
            ))}
          </div>
        </section>
      )}
      <ResumeLink />
      {publicSocialLinks.length > 0 && (
        <section className="portfolio-section space-y-6">
          <h2 className="section-title text-editorial">Contact</h2>
          <SocialLinks />
        </section>
      )}
    </main>
  );
}
