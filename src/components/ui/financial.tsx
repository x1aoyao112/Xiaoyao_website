import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SurfaceTone } from "@/config/design-system";

export function MetricCard({
  label,
  value,
  note,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: SurfaceTone;
  className?: string;
}) {
  return (
    <Card tone={tone} className={className}>
      <p
        className={cn(
          "eyebrow text-muted-foreground",
          tone === "terminal" && "text-financial-emphasis",
        )}
      >
        {label}
      </p>
      <p className="mt-5 font-sans text-4xl tracking-tight tabular-nums">
        {value}
      </p>
      {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
    </Card>
  );
}

export type FinancialRow = Readonly<{
  id: string;
  label: string;
  category: string;
  amount: number;
  status: ReactNode;
}>;

export function FinancialTable({
  caption,
  rows,
  currency = "USD",
  className,
}: {
  caption: string;
  rows: readonly FinancialRow[];
  currency?: string;
  className?: string;
}) {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className={cn(
        "overflow-x-auto rounded-card border border-border bg-surface",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <caption className="px-6 py-5 text-left font-medium">{caption}</caption>
        <thead className="border-y border-border bg-muted">
          <tr>
            {["Item", "Category", "Amount", "Status"].map((heading) => (
              <th
                key={heading}
                scope="col"
                className={cn(
                  "px-6 py-3 font-sans text-[11px] font-medium",
                  heading === "Amount" && "text-right",
                )}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-0">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium"
              >
                {row.label}
              </th>
              <td className="px-6 py-4 text-muted-foreground">
                {row.category}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right font-sans tabular-nums">
                {format.format(row.amount)}
              </td>
              <td className="px-6 py-4">{row.status}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-8 text-center text-muted-foreground"
              >
                No entries to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
