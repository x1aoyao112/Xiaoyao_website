import type { NavigationItem } from "@/types";

export const publicNavigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];
export const recruiterNavigation = {
  label: "Recruiter Mode",
  href: "/recruiter",
} as const;
export function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
