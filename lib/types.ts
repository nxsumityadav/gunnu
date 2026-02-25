/** Foundation Doc — output of Phase 1 (PM interrogation) */
export interface FoundationDoc {
  idea_raw: string;
  pain_point: string;
  primary_user: string;
  core_action: string;
  platform: string;
  features_needed: string; // accounts / real-time / payments
  competitors: string[];
  desired_feel: string;
  visual_inspiration: string[];
}

export const FOUNDATION_QUESTIONS: {
  id: keyof FoundationDoc;
  label: string;
  placeholder: string;
}[] = [
  {
    id: "pain_point",
    label: "What's the single biggest pain point your product solves?",
    placeholder: "e.g. No shared annotation layer across readers",
  },
  {
    id: "primary_user",
    label: "Who is your primary user? (one sentence)",
    placeholder: "e.g. Book club members aged 25–40",
  },
  {
    id: "core_action",
    label: "What is the ONE action a user must do on Day 1?",
    placeholder: "e.g. Highlight a passage and share with club",
  },
  {
    id: "platform",
    label: "Web app, mobile app, or both?",
    placeholder: "e.g. Web app",
  },
  {
    id: "features_needed",
    label: "Do you need accounts / real-time features / payments?",
    placeholder: "e.g. Accounts and real-time collaboration",
  },
  {
    id: "competitors",
    label: "Who are 2–3 indirect competitors you've noticed?",
    placeholder: "e.g. Kindle highlights, Readwise, Goodreads (comma-separated)",
  },
  {
    id: "desired_feel",
    label: "What should the user FEEL when using this?",
    placeholder: "e.g. warm, literary, calm",
  },
  {
    id: "visual_inspiration",
    label: "Any visual brands or apps you admire aesthetically?",
    placeholder: "e.g. Notion, Readwise (comma-separated)",
  },
];
