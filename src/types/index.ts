export type AccessMode = "owner-only";
export type NavigationItem = Readonly<{ label: string; href: string }>;
export type SiteConfig = Readonly<{
  name: string;
  description: string;
  locale: "en";
  access: AccessMode;
}>;
