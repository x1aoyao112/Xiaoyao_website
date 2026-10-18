export type ContentImage = Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  order?: number;
  kind?: "photo" | "graphic";
}>;
export type PersonalPhoto = ContentImage & Readonly<{ order: number }>;

export type ContentSection = Readonly<{
  heading?: string;
  paragraphs: readonly string[];
  image?: ContentImage;
}>;
export type ContentLink = Readonly<{ label: string; url: string }>;
export type PortfolioProject = Readonly<{
  slug: string;
  title: string;
  category: string;
  summary: string;
  tools: readonly string[];
  published: boolean;
  featured?: boolean;
  recruiterRelevant?: boolean;
  overview?: readonly string[];
  objective?: readonly string[];
  myRole?: readonly string[];
  approach?: readonly string[];
  results?: readonly string[];
  learned?: readonly string[];
  coverImage?: ContentImage;
  artifacts?: readonly ContentImage[];
  links?: readonly ContentLink[];
}>;
export type JournalEntry = Readonly<{
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  tags: readonly string[];
  published: boolean;
  coverImage?: ContentImage;
  sections: readonly ContentSection[];
}>;
export type Education = Readonly<{
  institution: string;
  degree: string;
  startYear: number;
  endYear: number;
  expected: boolean;
}>;
export type Profile = Readonly<{
  name: string;
  introduction: string;
  about: readonly string[];
  education: Education;
  interests: readonly { title: string; description: string }[];
  portrait?: ContentImage;
  beyondAcademics: readonly ContentSection[];
  resume: { url: string; label: string };
}>;
export type ExperienceEntry = Readonly<{
  id: string;
  category:
    | "Education"
    | "Work & internships"
    | "Leadership & activities"
    | "Achievements & milestones";
  title: string;
  organization?: string;
  period: string;
  sortYear: number;
  description: readonly string[];
}>;
export type SkillGroup = Readonly<{ title: string; skills: readonly string[] }>;
export type CurrentNote = Readonly<{
  label: string;
  text: string;
  link?: ContentLink;
}>;
