import { NextRequest, NextResponse } from "next/server";
import { getProject } from "@/lib/db-helpers";
import type { FoundationDoc } from "@/lib/types";
import type { ValidationReport } from "@/lib/ai/synthesis";
import type { TavilyResult } from "@/lib/research/tavily";

export const dynamic = "force-dynamic";

function buildJsonBundle(project: {
  rawIdea: string;
  interviewData: unknown;
  validationReport: unknown;
  researchData: unknown;
  designSystem: unknown;
}) {
  const fd = project.interviewData as FoundationDoc | null;
  const report = project.validationReport as ValidationReport | null;
  const research = project.researchData as {
    painPoints?: TavilyResult[];
    competitors?: TavilyResult[];
    marketTrends?: TavilyResult[];
  } | null;

  return JSON.stringify(
    {
      idea: project.rawIdea,
      questionsAndAnswers: fd
        ? {
            idea_raw: fd.idea_raw,
            pain_point: fd.pain_point,
            primary_user: fd.primary_user,
            core_action: fd.core_action,
            platform: fd.platform,
            features_needed: fd.features_needed,
            competitors: fd.competitors,
            desired_feel: fd.desired_feel,
            visual_inspiration: fd.visual_inspiration,
          }
        : null,
      designSystem: project.designSystem,
      techStack: report?.suggestedStack ?? null,
      validationReport: report
        ? {
            painPointScore: report.painPointScore,
            marketInterest: report.marketInterest,
            keyEvidence: report.keyEvidence,
            competitorGaps: report.competitorGaps,
            differentiators: report.differentiators,
            suggestedStack: report.suggestedStack,
            mvpSteps: report.mvpSteps,
          }
        : null,
      researchData: research ?? null,
    },
    null,
    2
  );
}

function buildMdBundle(project: {
  rawIdea: string;
  interviewData: unknown;
  validationReport: unknown;
  designSystem: unknown;
}) {
  const fd = project.interviewData as FoundationDoc | null;
  const report = project.validationReport as ValidationReport | null;

  const sections: string[] = [];

  sections.push(`# Gunnu.ai — Product Bundle\n`);
  sections.push(`## Idea\n${project.rawIdea}\n`);

  if (fd) {
    sections.push(`## Foundation (Q&A)\n`);
    sections.push(`| Field | Answer |`);
    sections.push(`|-------|--------|`);
    sections.push(`| Idea | ${fd.idea_raw ?? project.rawIdea} |`);
    sections.push(`| Pain point | ${fd.pain_point} |`);
    sections.push(`| Primary user | ${fd.primary_user} |`);
    sections.push(`| Core action | ${fd.core_action} |`);
    sections.push(`| Platform | ${fd.platform} |`);
    sections.push(`| Competitors | ${fd.competitors?.join(", ") ?? "-"} |`);
    sections.push(`| Desired feel | ${fd.desired_feel} |`);
    sections.push("");
  }

  if (report?.suggestedStack) {
    sections.push(`## Tech Stack\n`);
    sections.push(`- **Frontend:** ${report.suggestedStack.frontend}`);
    sections.push(`- **Backend:** ${report.suggestedStack.backend}`);
    sections.push(`- **Database:** ${report.suggestedStack.database}`);
    sections.push("");
  }

  sections.push(`## Design System\n`);
  sections.push("```json");
  sections.push(JSON.stringify(project.designSystem ?? {}, null, 2));
  sections.push("```\n");

  if (report) {
    sections.push(`## Validation Report\n`);
    sections.push(`- Pain Point Score: ${report.painPointScore}/10`);
    sections.push(`- Market Interest: ${report.marketInterest}\n`);
    if (report.mvpSteps && report.mvpSteps.length > 0) {
      sections.push(`### MVP Steps\n`);
      report.mvpSteps.forEach((s, i) => sections.push(`${i + 1}. ${s}`));
      sections.push("");
    }
    if (report.competitorGaps?.length) {
      sections.push(`### Competitor Gaps\n`);
      report.competitorGaps.forEach((g) => sections.push(`- ${g}`));
      sections.push("");
    }
    if (report.differentiators?.length) {
      sections.push(`### Differentiators\n`);
      report.differentiators.forEach((d) => sections.push(`- ${d}`));
    }
  }

  sections.push(`\n## Skills & Roles\n`);
  sections.push(`- Design: Design system, UI/UX`);
  sections.push(`- Frontend: ${report?.suggestedStack?.frontend ?? "TBD"}`);
  sections.push(`- Backend: ${report?.suggestedStack?.backend ?? "TBD"}`);
  sections.push(`- DevOps: Deployment, CI/CD`);
  sections.push(`- Security: Auth, data protection`);

  return sections.join("\n");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const format = request.nextUrl.searchParams.get("format") ?? "json";

  const project = await getProject(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (format === "md") {
    const md = buildMdBundle(project);
    return new Response(md, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="gunnu-bundle-${id}.md"`,
      },
    });
  }

  const json = buildJsonBundle(project);
  return new Response(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="gunnu-bundle-${id}.json"`,
    },
  });
}
