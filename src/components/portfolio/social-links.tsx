import { ArrowUpRight } from "lucide-react";
import { publicSocialLinks } from "@/content/public";

export function SocialLinks({
  links = publicSocialLinks,
}: {
  links?: readonly { label: string; href: string; external: boolean }[];
}) {
  if (!links.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <a
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex min-h-11 items-center gap-1 text-sm underline decoration-border underline-offset-4 hover:decoration-current"
          >
            {link.label}
            {link.external && (
              <>
                <ArrowUpRight aria-hidden="true" className="size-3" />
                <span className="sr-only"> (opens in a new tab)</span>
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
