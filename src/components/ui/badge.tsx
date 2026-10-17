import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import type { StatusTone } from "@/config/design-system";

const tones: Record<StatusTone, string> = {
  neutral: "bg-muted text-foreground",
  info: "bg-powder text-navy",
  highlight: "bg-butter text-navy",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: StatusTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
