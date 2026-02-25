import { sql } from "@/lib/db";
import type { ProjectRow } from "@/lib/db";

export async function createProject(rawIdea: string): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const now = new Date();
  await sql`
    INSERT INTO "Project" (
      "id", "rawIdea", "status", "createdAt", "updatedAt"
    ) VALUES (
      ${id}, ${rawIdea}, 'INTERVIEWING', ${now}, ${now}
    )
  `;
  return { id };
}

export async function getProject(id: string): Promise<ProjectRow | null> {
  const rows = await sql`
    SELECT * FROM "Project" WHERE "id" = ${id}
  `;
  return (rows[0] as ProjectRow) ?? null;
}

export async function updateProjectInterview(
  id: string,
  interviewData: object,
  status: string
): Promise<void> {
  const now = new Date();
  const json = JSON.stringify(interviewData);
  await sql`
    UPDATE "Project"
    SET "interviewData" = ${json},
        "status" = ${status},
        "updatedAt" = ${now}
    WHERE "id" = ${id}
  `;
}

export async function updateProjectResearch(
  id: string,
  validationReport: object,
  researchData: object,
  status: string
): Promise<void> {
  const now = new Date();
  await sql`
    UPDATE "Project"
    SET "validationReport" = ${JSON.stringify(validationReport)},
        "researchData" = ${JSON.stringify(researchData)},
        "status" = ${status},
        "updatedAt" = ${now}
    WHERE "id" = ${id}
  `;
}

/** Save design system and set status to COMPLETE */
export async function updateProjectDesign(
  id: string,
  designSystem: object,
  status = "COMPLETE"
): Promise<void> {
  const now = new Date();
  await sql`
    UPDATE "Project"
    SET "designSystem" = ${JSON.stringify(designSystem)},
        "status" = ${status},
        "updatedAt" = ${now}
    WHERE "id" = ${id}
  `;
}

/** Save partial research (Tavily data) when synthesis fails — preserves user data for retry */
export async function savePartialResearch(
  id: string,
  researchData: object
): Promise<void> {
  const now = new Date();
  await sql`
    UPDATE "Project"
    SET "researchData" = ${JSON.stringify(researchData)},
        "updatedAt" = ${now}
    WHERE "id" = ${id}
  `;
}
