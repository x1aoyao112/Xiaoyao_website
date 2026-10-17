import { Eyebrow } from "@/components/ui/typography";

export function PageIntro({
  title,
  description,
  label,
}: {
  title: string;
  description?: string;
  label?: string;
}) {
  return (
    <header className="max-w-4xl pt-16 pb-12 sm:pt-24 sm:pb-16">
      {label && (
        <Eyebrow className="mb-6 text-muted-foreground">{label}</Eyebrow>
      )}
      <h1 className="display text-4xl text-editorial sm:text-6xl lg:text-7xl [overflow-wrap:anywhere]">
        {title}
      </h1>
      {description && (
        <p className="body-copy mt-7 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
