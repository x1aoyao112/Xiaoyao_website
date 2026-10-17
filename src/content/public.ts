import { projects } from "@/content/projects";
import { journal } from "@/content/journal";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { currently } from "@/content/currently";
import { socialLinks, otherSocialLinks } from "@/content/social-links";
import {
  publishedProjects,
  publishedJournal,
  socialDestinations,
} from "@/lib/content";

// All public consumers, detail lookups, and metadata use these publication gates.
export const publicProjects = publishedProjects(projects);
export const publicJournal = publishedJournal(journal);
export const publicSkills = skills
  .map((group) => ({ ...group, skills: group.skills.filter((s) => s.trim()) }))
  .filter((group) => group.title.trim() && group.skills.length);
export const publicExperience = experience
  .filter((entry) => entry.title.trim() && entry.period.trim())
  .toSorted((a, b) => b.sortYear - a.sortYear);
export const publicCurrently = currently.filter(
  (note) => note.label.trim() && note.text.trim(),
);
export const publicSocialLinks = socialDestinations(
  socialLinks,
  otherSocialLinks,
);
export const journey = [
  {
    id: "ntu-education",
    category: "Education" as const,
    title: profile.education.degree,
    organization: profile.education.institution,
    period: `${profile.education.startYear}–${profile.education.endYear}${profile.education.expected ? " (Expected)" : ""}`,
    sortYear: profile.education.startYear,
    description: [],
  },
  ...publicExperience,
].toSorted((a, b) => b.sortYear - a.sortYear);
