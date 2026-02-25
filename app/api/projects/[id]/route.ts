import { NextResponse } from "next/server";
import { getProject } from "@/lib/db-helpers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await getProject(id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: project.id,
    rawIdea: project.rawIdea,
    status: project.status,
    interviewData: project.interviewData,
    designSystem: project.designSystem,
    validationReport: project.validationReport,
    researchData: project.researchData,
  });
}
