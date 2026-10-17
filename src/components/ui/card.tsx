import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import type { SurfaceTone } from "@/config/design-system";

const tones: Record<SurfaceTone, string> = {
  default: "border border-border bg-surface text-foreground",
  butter:
    "bg-butter text-navy [--muted-foreground:var(--navy)] [--ring:var(--navy)]",
  powder:
    "bg-powder text-navy [--muted-foreground:var(--navy)] [--ring:var(--navy)]",
  terminal:
    "bg-terminal text-terminal-foreground [--muted-foreground:var(--terminal-muted)] [--ring:var(--gold)]",
};

export function Card({
  tone = "default",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: SurfaceTone }) {
  return (
    <div
      className={cn("rounded-card p-6 sm:p-8", tones[tone], className)}
      {...props}
    />
  );
}

export function BentoGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    />
  );
}

export function DashboardWidget({
  title,
  label,
  children,
  ...props
}: ComponentProps<typeof Card> & { title: string; label?: string }) {
  return (
    <Card {...props}>
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        {label && (
          <span className="eyebrow text-muted-foreground">{label}</span>
        )}
      </header>
      {children}
    </Card>
  );
}
