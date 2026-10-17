import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("eyebrow", className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  ...props
}: ComponentProps<"div"> & {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)} {...props}>
      {eyebrow && (
        <Eyebrow className="text-muted-foreground">{eyebrow}</Eyebrow>
      )}
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="body-copy text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
