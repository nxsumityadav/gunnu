import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export type ProjectStatus =
  | "INTERVIEWING"
  | "RESEARCHING"
  | "DESIGNING"
  | "COMPLETE";

export interface ProjectRow {
  id: string;
  rawIdea: string;
  status: ProjectStatus;
  interviewData: unknown;
  researchData: unknown;
  validationReport: unknown;
  designSystem: unknown;
  bundleMarkdown: string | null;
  createdAt: Date;
  updatedAt: Date;
}
