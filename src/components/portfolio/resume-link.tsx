import { profile } from "@/content/profile";
import { validResume } from "@/lib/public-files";
import { buttonVariants } from "@/components/ui/button";

export function ResumeLink() {
  const href = validResume(profile.resume.url);
  if (!href) return null;
  return (
    <a href={href} download className={buttonVariants({ variant: "outline" })}>
      {profile.resume.label.trim() || "Download resume"}
    </a>
  );
}
