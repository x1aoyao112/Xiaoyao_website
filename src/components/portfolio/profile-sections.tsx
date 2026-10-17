import type { Education, ExperienceEntry, SkillGroup } from "@/types/content";

export function EducationBlock({ education }: { education: Education }) {
  return (
    <div className="space-y-2 border-l-2 border-editorial pl-6">
      <h3 className="text-lg font-medium">{education.institution}</h3>
      <p>{education.degree}</p>
      <p className="text-sm text-muted-foreground">
        {education.startYear}–{education.endYear}
        {education.expected ? " (Expected)" : ""}
      </p>
    </div>
  );
}
export function SkillsList({ groups }: { groups: readonly SkillGroup[] }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title}>
          <dt className="font-medium">{group.title}</dt>
          <dd className="mt-3 text-sm leading-7 text-muted-foreground">
            {group.skills.join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
export function Timeline({ entries }: { entries: readonly ExperienceEntry[] }) {
  return (
    <ol className="max-w-3xl border-l border-border">
      {entries.map((entry) => (
        <li key={entry.id} className="relative pb-12 pl-7 last:pb-0 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-1.5 size-3 rounded-full border-2 border-background bg-editorial"
          />
          <p className="text-sm text-muted-foreground">
            {entry.category} · {entry.period}
          </p>
          <h2 className="mt-4 font-serif text-2xl text-editorial sm:text-3xl">
            {entry.title}
          </h2>
          {entry.organization && (
            <p className="mt-3 font-medium">{entry.organization}</p>
          )}
          {entry.description
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i} className="body-copy mt-4 text-muted-foreground">
                {p}
              </p>
            ))}
        </li>
      ))}
    </ol>
  );
}
