import { ArrowUpRight } from "lucide-react";

export function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
    >
      <span className="font-serif text-2xl leading-none">x</span>
      <ArrowUpRight className="absolute top-1 right-1 size-2.5" />
    </span>
  );
}
