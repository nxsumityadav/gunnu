import { NextResponse } from "next/server";
import { getProject, updateProjectInterview } from "@/lib/db-helpers";
import type { FoundationDoc } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const foundationDoc = body.foundationDoc as FoundationDoc;

    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const docWithIdea: FoundationDoc = {
      ...foundationDoc,
      idea_raw: project.rawIdea,
    };

    await updateProjectInterview(id, docWithIdea, "RESEARCHING");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Interview save error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save interview";
    return NextResponse.json(
      { error: "Failed to save interview", details: message },
      { status: 500 }
    );
  }
}
