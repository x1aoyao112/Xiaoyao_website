import Link from "next/link";
import { siteConfig } from "@/config/site";
import { publicNavigation } from "@/config/navigation";
import { SocialLinks } from "@/components/portfolio/social-links";

export function SiteFooter() {
  return (
    <footer className="page-shell mt-24 pb-8">
      <div className="space-y-7 border-t border-border pt-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-base font-medium"
          >
            {siteConfig.name}
          </Link>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5"
          >
            {publicNavigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-muted-foreground">
          <p className="text-xs">
            © {new Date().getUTCFullYear()} {siteConfig.name}
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
