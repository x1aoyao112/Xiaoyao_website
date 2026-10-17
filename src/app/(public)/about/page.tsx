import { profile } from "@/content/profile";
import { publicSkills } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/portfolio/page-intro";
import {
  ContentSections,
  hasContent,
} from "@/components/portfolio/content-sections";
import { PortfolioImage } from "@/components/portfolio/content-image";
import {
  EducationBlock,
  SkillsList,
} from "@/components/portfolio/profile-sections";
import { TextLink } from "@/components/portfolio/text-link";

export const metadata = pageMetadata(
  "About",
  `Meet ${profile.name}, a ${profile.education.degree} student at ${profile.education.institution}, and the person behind XY's Side Notes.`,
  "/about",
);
export default function AboutPage() {
  const interests = profile.interests.filter((interest) =>
    interest.description.trim(),
  );
  return (
    <main id="main-content" className="page-shell">
      <PageIntro title={`Hi, I'm ${profile.name}.`} label="About" />
      <div className="max-w-2xl">
        <PortfolioImage image={profile.portrait} cover />
        <ContentSections sections={[{ paragraphs: profile.about }]} />
      </div>
      {interests.length > 0 && (
        <section className="portfolio-section">
          <h2 className="section-title text-editorial">A few interests</h2>
          <dl className="mt-8 grid max-w-4xl gap-8 sm:grid-cols-2">
            {interests.map((interest) => (
              <div key={interest.title}>
                <dt className="font-medium">{interest.title}</dt>
                <dd className="mt-3 text-sm leading-7 text-muted-foreground">
                  {interest.description}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      <section className="portfolio-section space-y-8">
        <h2 className="section-title text-editorial">Education</h2>
        <EducationBlock education={profile.education} />
        <TextLink href="/journey">Follow the journey</TextLink>
      </section>
      {publicSkills.length > 0 && (
        <section className="portfolio-section space-y-8">
          <h2 className="section-title text-editorial">Skills & tools</h2>
          <SkillsList groups={publicSkills} />
        </section>
      )}
      {profile.beyondAcademics.some(hasContent) && (
        <section className="portfolio-section space-y-8">
          <h2 className="section-title text-editorial">Beyond academics</h2>
          <ContentSections sections={profile.beyondAcademics} />
        </section>
      )}
    </main>
  );
}
