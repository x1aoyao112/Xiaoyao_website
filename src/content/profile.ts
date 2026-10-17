import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Xiaoyao",
  introduction:
    "I'm a Bachelor of Business student at Nanyang Technological University. My interests include business, finance, technology, and personal projects.",
  about: [
    "I'm a Bachelor of Business student at Nanyang Technological University, and this is where I keep a little bit of everything — projects I've worked on, things I'm learning, and thoughts I might want to revisit someday.",
    "A lot of my interests revolve around business, finance, and technology, but I don't really want this website to be limited to just those things.",
    "It's still a work in progress. So am I.",
  ],
  education: {
    institution: "Nanyang Technological University",
    degree: "Bachelor of Business",
    startYear: 2026,
    endYear: 2030,
    expected: true,
  },
  interests: [
    {
      title: "Business & Finance",
      description: "An interest in how business and finance connect.",
    },
    {
      title: "Technology",
      description:
        "Another area I'd like to explore through learning and projects.",
    },
    {
      title: "Ideas & Projects",
      description: "A space to collect ideas and share personal projects.",
    },
    { title: "Life Beyond School", description: "" }, // TODO: Add confirmed interests only.
  ],
  // TODO: Add a real local portrait with descriptive alt text when supplied.
  beyondAcademics: [],
  resume: { url: "", label: "Download resume" },
};
