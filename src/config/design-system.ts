export const sectionThemes = {
  personal: { label: "Personal & academic", tone: "butter" },
  lifestyle: { label: "Everyday life", tone: "powder" },
  career: { label: "Career Studio", tone: "default" },
  finance: { label: "Money Lab & analytics", tone: "terminal" },
  recruiter: { label: "Recruiter & résumé", tone: "default" },
} as const;

export type SurfaceTone = "default" | "butter" | "powder" | "terminal";
export type StatusTone = "neutral" | "info" | "highlight";
