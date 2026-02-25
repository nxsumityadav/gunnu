import { NextResponse } from "next/server";
import { getProject } from "@/lib/db-helpers";
import { generateQuestion } from "@/lib/ai/questions";
import type { FoundationDoc } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const step = body.step as number;
    const previousAnswers = (body.previousAnswers || {}) as Partial<FoundationDoc>;

    if (typeof step !== "number" || step < 0 || step > 7) {
      return NextResponse.json(
        { error: "step must be 0-7" },
        { status: 400 }
      );
    }

    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const routewayKey = process.env.ROUTEWAY_API_KEY;
    const routewayBase = process.env.ROUTEWAY_BASE_URL;

    const aiKey = routewayKey && routewayBase ? routewayKey : groqKey;
    const aiBase =
      routewayKey && routewayBase ? routewayBase : "https://api.groq.com/openai/v1";

    if (!aiKey) {
      return NextResponse.json(
        { error: "Missing ROUTEWAY_API_KEY or GROQ_API_KEY" },
        { status: 500 }
      );
    }

    let question;
    try {
      question = await generateQuestion(
        project.rawIdea,
        step,
        previousAnswers,
        aiKey,
        aiBase
      );
    } catch (err) {
      if (groqKey && routewayKey) {
        question = await generateQuestion(
          project.rawIdea,
          step,
          previousAnswers,
          groqKey,
          "https://api.groq.com/openai/v1"
        );
      } else {
        throw err;
      }
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Questions API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate question";
    return NextResponse.json(
      { error: "Failed to generate question", details: message },
      { status: 500 }
    );
  }
}
