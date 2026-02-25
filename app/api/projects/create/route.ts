import { NextResponse } from "next/server";
import { createProject } from "@/lib/db-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawIdea = body.rawIdea as string;

    if (!rawIdea || typeof rawIdea !== "string" || rawIdea.trim().length === 0) {
      return NextResponse.json(
        { error: "rawIdea is required" },
        { status: 400 }
      );
    }

    const { id } = await createProject(rawIdea.trim());

    return NextResponse.json({ projectId: id });
  } catch (error) {
    console.error("Create project error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json(
      { error: "Failed to create project", details: message },
      { status: 500 }
    );
  }
}
