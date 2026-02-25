import { getProject, updateProjectResearch, savePartialResearch } from "@/lib/db-helpers";
import { tavilySearch, type TavilyResult } from "@/lib/research/tavily";
import { generateTavilyQueries } from "@/lib/research/queries";
import { synthesizeReport } from "@/lib/ai/synthesis";
import type { FoundationDoc } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  const tavilyKey = process.env.TAVILY_API_KEY;
  const routewayKey = process.env.ROUTEWAY_API_KEY;
  const routewayBase = process.env.ROUTEWAY_BASE_URL;
  const groqKey = process.env.GROQ_API_KEY;

  if (!tavilyKey?.trim()) {
    return new Response("Missing TAVILY_API_KEY", { status: 500 });
  }
  // Use Routeway if configured; fall back to Groq on failure (e.g. 402 insufficient credits)
  const aiKey = routewayKey && routewayBase ? routewayKey : groqKey;
  const aiBase = routewayKey && routewayBase ? routewayBase : "https://api.groq.com/openai/v1";
  if (!aiKey) {
    return new Response("Missing ROUTEWAY_API_KEY or GROQ_API_KEY", { status: 500 });
  }

  const encoder = new TextEncoder();
  const idea = project.rawIdea;
  const foundationDoc = project.interviewData as FoundationDoc | null;
  const existingReport = project.validationReport;
  const cachedResearch = project.researchData as
    | { painPoints?: TavilyResult[]; competitors?: TavilyResult[]; marketTrends?: TavilyResult[] }
    | null;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      if (existingReport) {
        send({ step: "synthesis", status: "done", data: existingReport });
        send({ step: "complete", status: "done" });
        controller.close();
        return;
      }

      const queries = generateTavilyQueries(foundationDoc, idea);
      let painPoints: TavilyResult[];
      let competitors: TavilyResult[];
      let marketTrends: TavilyResult[];

      try {
        if (
          cachedResearch?.painPoints?.length &&
          cachedResearch?.competitors?.length &&
          cachedResearch?.marketTrends?.length
        ) {
          send({ step: "tavily_1", status: "done", data: cachedResearch.painPoints });
          send({ step: "tavily_2", status: "done", data: cachedResearch.competitors });
          send({ step: "tavily_3", status: "done", data: cachedResearch.marketTrends });
          painPoints = cachedResearch.painPoints;
          competitors = cachedResearch.competitors;
          marketTrends = cachedResearch.marketTrends;
        } else {
          send({ step: "tavily_1", status: "running" });
          painPoints = await tavilySearch(queries.painPoints, tavilyKey.trim());
          send({ step: "tavily_1", status: "done", data: painPoints });

          send({ step: "tavily_2", status: "running" });
          competitors = await tavilySearch(queries.competitors, tavilyKey.trim());
          send({ step: "tavily_2", status: "done", data: competitors });

          send({ step: "tavily_3", status: "running" });
          marketTrends = await tavilySearch(queries.marketTrends, tavilyKey.trim());
          send({ step: "tavily_3", status: "done", data: marketTrends });
        }

        send({ step: "synthesis", status: "running" });
        let report;
        try {
          report = await synthesizeReport(
            idea,
            foundationDoc,
            { painPoints, competitors, marketTrends },
            aiKey,
            aiBase,
            aiBase.includes("groq") ? "llama-3.1-8b-instant" : "gpt-4o-mini"
          );
        } catch (synthesisErr) {
          await savePartialResearch(id, {
            painPoints,
            competitors,
            marketTrends,
          });
          if (groqKey && routewayKey) {
            try {
              report = await synthesizeReport(
                idea,
                foundationDoc,
                { painPoints, competitors, marketTrends },
                groqKey,
                "https://api.groq.com/openai/v1",
                "llama-3.1-8b-instant"
              );
            } catch {
              throw synthesisErr;
            }
          } else {
            throw synthesisErr;
          }
        }
        send({ step: "synthesis", status: "done", data: report });

        await updateProjectResearch(
          id,
          report as object,
          { painPoints, competitors, marketTrends },
          "DESIGNING"
        );

        send({ step: "complete", status: "done" });
      } catch (err) {
        console.error("Research error:", err);
        send({
          step: "error",
          status: "error",
          error: err instanceof Error ? err.message : "Research failed",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
