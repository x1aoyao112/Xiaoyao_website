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
  // Confirmed topics only. Add personal explanations when ready; empty descriptions stay hidden.
  interests: [
    { title: "Business & Finance", description: "" },
    { title: "Technology", description: "" },
    { title: "Ideas & Projects", description: "" },
  ],
  // Add a real portrait here: { src, alt, width, height, caption? }.
  // Store the file in public/images/ and use its original pixel dimensions.
  portrait: undefined,
  beyondAcademics: [],
  resume: { url: "", label: "Download resume" },
};
