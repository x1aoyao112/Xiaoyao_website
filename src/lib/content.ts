import type { JournalEntry, PortfolioProject } from "@/types/content";

export function safeExternalUrl(value: string): string | undefined {
  try {
    if (
      !value ||
      value !== value.trim() ||
      /[\s\u0000-\u001f\u007f]/.test(value)
    )
      return;
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      !url.hostname.includes(".")
    )
      return;
    const host = url.hostname.toLowerCase();
    if (
      /^\d+(?:\.\d+){3}$/.test(host) ||
      ["invalid", "test", "local", "localhost", "example"].some((suffix) =>
        host.endsWith(`.${suffix}`),
      ) ||
      host
        .split(".")
        .some((label) => !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label))
    )
      return;
    if (
      ["example.com", "example.org", "example.net", "localhost"].some(
        (h) => host === h || host.endsWith(`.${h}`),
      )
    )
      return;
    return url.href;
  } catch {
    return;
  }
}
export function emailUrl(value: string): string | undefined {
  if (
    !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9.-]*[A-Z0-9])?\.[A-Z]{2,}$/i.test(
      value,
    ) ||
    /[\s\r\n]/.test(value)
  )
    return;
  const [local, originalDomain] = value.split("@");
  const domain = originalDomain.toLowerCase();
  if (
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !domain
      .split(".")
      .every((label) => /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label))
  )
    return;
  if (
    ["example.com", "example.org", "example.net"].some(
      (h) => domain === h || domain.endsWith(`.${h}`),
    )
  )
    return;
  if (!safeExternalUrl(`https://${domain}`)) return;
  return `mailto:${encodeURIComponent(value).replace("%40", "@")}`;
}
export function socialDestinations(
  values: { email: string; linkedin: string; github: string },
  other: readonly { label: string; url: string }[] = [],
) {
  const links: { label: string; href: string; external: boolean }[] = [];
  const email = emailUrl(values.email);
  if (email) links.push({ label: "Email", href: email, external: false });
  for (const [key, label, host] of [
    ["linkedin", "LinkedIn", "linkedin.com"],
    ["github", "GitHub", "github.com"],
  ] as const) {
    const href = safeExternalUrl(values[key]);
    if (href) {
      const url = new URL(href);
      if (
        (url.hostname === host || url.hostname === `www.${host}`) &&
        url.pathname !== "/"
      )
        links.push({ label, href, external: true });
    }
  }
  for (const link of other) {
    const href = safeExternalUrl(link.url);
    if (link.label.trim() && href)
      links.push({ label: link.label, href, external: true });
  }
  return links;
}
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export function publishedProjects(items: readonly PortfolioProject[]) {
  const counts = new Map<string, number>();
  items.forEach((item) =>
    counts.set(item.slug, (counts.get(item.slug) ?? 0) + 1),
  );
  return items.filter(
    (item) =>
      item.published === true &&
      slugPattern.test(item.slug) &&
      counts.get(item.slug) === 1 &&
      item.title.trim() &&
      item.category.trim() &&
      item.summary.trim(),
  );
}
export function publishedJournal(items: readonly JournalEntry[]) {
  const counts = new Map<string, number>();
  items.forEach((item) =>
    counts.set(item.slug, (counts.get(item.slug) ?? 0) + 1),
  );
  return items
    .filter(
      (item) =>
        item.published === true &&
        slugPattern.test(item.slug) &&
        counts.get(item.slug) === 1 &&
        item.title.trim() &&
        item.category.trim() &&
        item.excerpt.trim() &&
        validDate(item.date) &&
        item.sections.some((section) =>
          section.paragraphs.some((p) => p.trim()),
        ),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function categories<T extends { category: string }>(
  items: readonly T[],
) {
  return Array.from(new Set(items.map((item) => item.category))).sort();
}
export function filterCategory<T extends { category: string }>(
  items: readonly T[],
  selected?: string,
) {
  return selected && categories(items).includes(selected)
    ? items.filter((item) => item.category === selected)
    : [...items];
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
export function publicContentPaths(
  projects: readonly PortfolioProject[],
  entries: readonly JournalEntry[],
) {
  return [
    "/",
    "/about",
    "/work",
    "/journey",
    "/journal",
    "/contact",
    "/recruiter",
    ...publishedProjects(projects).map((p) => `/work/${p.slug}`),
    ...publishedJournal(entries).map((p) => `/journal/${p.slug}`),
  ];
}
