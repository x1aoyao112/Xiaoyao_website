import { publicSocialLinks } from "@/content/public";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/portfolio/page-intro";
import { SocialLinks } from "@/components/portfolio/social-links";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with Xiaoyao through the contact methods listed on XY's Side Notes.",
  "/contact",
);
export default function ContactPage() {
  return (
    <main id="main-content" className="page-shell min-h-[55vh]">
      <PageIntro
        title="Get in touch."
        description="Have something in mind? Feel free to reach out."
        label="Contact"
      />
      {publicSocialLinks.length ? (
        <SocialLinks />
      ) : (
        <p className="max-w-xl border-t border-border pt-8 text-muted-foreground">
          Contact details aren’t listed here yet.
        </p>
      )}
    </main>
  );
}
