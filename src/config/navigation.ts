import type { NavigationItem } from "@/types";

// Public destinations only. Never advertise a private route before authentication.
export const publicNavigation = [
  { label: "Perspective", href: "/#perspective" },
  { label: "Design language", href: "/design-system" },
] as const satisfies readonly NavigationItem[];
