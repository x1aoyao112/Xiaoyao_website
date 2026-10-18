import { profile } from "@/content/profile";
import { publicSkills } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { Eyebrow } from "@/components/ui/typography";
import { moments } from "@/content/about-photos";
import { validImage } from "@/lib/public-files";
import {
  LittleMoments,
  PersonalPhoto,
} from "@/components/portfolio/personal-photos";
import {
  ContentSections,
  hasContent,
} from "@/components/portfolio/content-sections";
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
    interest.title.trim(),
  );
  const portrait = validImage(profile.portrait);
  return (
    <main id="main-content" className="page-shell pb-16 sm:pb-24">
      <section
        className={`grid items-start gap-12 pt-16 sm:pt-24 ${portrait ? "md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-20" : "max-w-4xl"}`}
      >
        <div>
          <Eyebrow className="mb-6 text-muted-foreground">About</Eyebrow>
          <h1 className="display text-4xl text-editorial sm:text-6xl lg:text-7xl [overflow-wrap:anywhere]">
            {"Hi, I'm "}
            {profile.name}.
          </h1>
          <div className="mt-9 max-w-2xl space-y-6">
            {profile.about
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-lg leading-8 text-editorial sm:text-xl sm:leading-9"
                      : "body-copy text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
        {portrait && (
          <div className="max-w-lg md:pt-12">
            <PersonalPhoto image={portrait} portrait />
          </div>
        )}
      </section>
      {interests.length > 0 && (
        <section className="mt-16 sm:mt-24" aria-labelledby="interests-heading">
          <h2 id="interests-heading" className="section-title text-editorial">
            A few things about me
          </h2>
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-8 sm:mt-10 lg:gap-x-16">
            {interests.map((interest) => (
              <div
                key={interest.title}
                className="min-w-0 basis-60 grow border-t-2 border-powder pt-5 dark:border-powder/40"
              >
                <dt className="font-serif text-xl leading-snug text-editorial sm:text-2xl">
                  <span className="bg-butter/60 box-decoration-clone px-1 text-navy">
                    {interest.title}
                  </span>
                </dt>
                {interest.description.trim() && (
                  <dd className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
                    {interest.description}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>
      )}
      <section className="mt-16 grid gap-8 border-y border-border py-10 sm:mt-24 sm:py-12 md:grid-cols-[1fr_1.5fr] md:gap-14">
        <h2 className="section-title text-editorial">Education & journey</h2>
        <div className="space-y-7">
          <EducationBlock education={profile.education} />
          <TextLink href="/journey">Follow the journey</TextLink>
        </div>
      </section>
      <LittleMoments photos={moments} />
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
