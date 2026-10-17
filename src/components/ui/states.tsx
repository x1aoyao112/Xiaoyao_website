import type { ComponentProps, ReactNode } from "react";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
}
export function LoadingState({
  label = "Loading content",
}: {
  label?: string;
}) {
  return (
    <div role="status" className="space-y-4">
      <span className="sr-only">{label}</span>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-dashed border-input p-8 text-center">
      <CircleDashed
        aria-hidden="true"
        className="size-7 text-muted-foreground"
      />
      <h3 className="font-medium">{title}</h3>
      <p className="max-w-xs text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action}
    </div>
  );
}
