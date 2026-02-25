import { NextResponse } from "next/server";
import { getProject, updateProjectDesign } from "@/lib/db-helpers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as object;

    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await updateProjectDesign(id, body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Design save error:", error);
    return NextResponse.json(
      { error: "Failed to save design" },
      { status: 500 }
    );
  }
}
