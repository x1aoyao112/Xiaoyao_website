import Link from "next/link";
import { cn } from "@/lib/utils";

export function CategoryFilter({
  categories,
  selected,
  base,
  label,
}: {
  categories: readonly string[];
  selected?: string;
  base: string;
  label: string;
}) {
  if (!categories.length) return null;
  const active = categories.includes(selected ?? "") ? selected : undefined;
  return (
    <nav aria-label={label} className="mb-10 flex flex-wrap gap-2">
      {[
        { label: "All", value: undefined },
        ...categories.map((c) => ({ label: c, value: c })),
      ].map((item) => (
        <Link
          key={item.label}
          href={
            item.value
              ? `${base}?category=${encodeURIComponent(item.value)}`
              : base
          }
          aria-current={active === item.value ? "page" : undefined}
          className={cn(
            "ui-transition inline-flex min-h-11 items-center rounded-full px-4 text-sm",
            active === item.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
