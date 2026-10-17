import { profile } from "@/content/profile";
import { journey } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/portfolio/page-intro";
import { Timeline } from "@/components/portfolio/profile-sections";
import { TextLink } from "@/components/portfolio/text-link";

export const metadata = pageMetadata(
  "Journey",
  `Education and the chapters that follow, starting with ${profile.education.degree} at ${profile.education.institution}.`,
  "/journey",
);
export default function JourneyPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        title="The chapters so far."
        description="Education, experience, and milestones — collected over time."
        label="Journey"
      />
      <Timeline entries={journey} />
      <div className="mt-12">
        <TextLink href="/about">Back to About</TextLink>
      </div>
    </main>
  );
}
