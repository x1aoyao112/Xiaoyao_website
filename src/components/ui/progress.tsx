import { cn } from "@/lib/utils";

export function Progress({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  const safeValue = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between gap-4 text-sm">
        <span>{label}</span>
        <span className="font-sans tabular-nums">{safeValue}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        className="h-1.5 overflow-hidden rounded-full bg-current/15"
      >
        <div
          className="ui-transition h-full rounded-full bg-current"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
