import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="page-shell mt-20 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7 text-muted-foreground">
        <p className="eyebrow">Xiaoyao</p>
        <Link
          className="inline-flex items-center gap-2 text-xs underline-offset-4 hover:underline"
          href="/design-system"
        >
          Explore the design language{" "}
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </footer>
  );
}
