import type { TavilyResult } from "@/lib/research/tavily";
import type { FoundationDoc } from "@/lib/types";

export interface ValidationReport {
  painPointScore: number;
  marketInterest: "Low" | "Medium" | "High";
  keyEvidence: { finding: string; source: string }[];
  competitorGaps: string[];
  differentiators: string[];
  suggestedStack: {
    frontend: string;
    backend: string;
    database: string;
  };
  mvpSteps: string[];
}

const SYNTHESIS_PROMPT = `You are a senior product strategist. Generate a validation report using ONLY the real market research data provided below.

CRITICAL: Use ONLY findings from the actual search results. Do NOT invent or assume data.
- keyEvidence: Extract specific facts, quotes, or statistics from the search results. Each MUST cite the exact source URL from the data.
- competitorGaps: Identify gaps mentioned in the search results (Reddit, Product Hunt, reviews).
- differentiators: Based on what users complain about or request in the research data.

Return ONLY valid JSON (no markdown, no code blocks):
{
  "painPointScore": number (1-10),
  "marketInterest": "Low" | "Medium" | "High",
  "keyEvidence": [{"finding": "exact quote or stat from research", "source": "url from the data"}],
  "competitorGaps": ["string from research"],
  "differentiators": ["string"],
  "suggestedStack": {"frontend": "string", "backend": "string", "database": "string"},
  "mvpSteps": ["string"]
}`;

const MAX_RESULTS_PER_CATEGORY = 5;
const MAX_CONTENT_CHARS = 400;
const MAX_FOUNDATION_CHARS = 600;

function truncate(str: string, max: number) {
  const s = String(str || "").trim();
  return s.length <= max ? s : s.slice(0, max) + "...";
}

function formatResults(results: TavilyResult[]) {
  return results
    .slice(0, MAX_RESULTS_PER_CATEGORY)
    .map(
      (r) =>
        `- Title: ${r.title}\n  Content: ${truncate(r.content, MAX_CONTENT_CHARS)}\n  URL: ${r.url}`
    )
    .join("\n\n");
}

export async function synthesizeReport(
  rawIdea: string,
  foundationDoc: FoundationDoc | null,
  tavilyResults: {
    painPoints: TavilyResult[];
    competitors: TavilyResult[];
    marketTrends: TavilyResult[];
  },
  apiKey: string,
  baseUrl: string,
  model = "gpt-4o-mini"
): Promise<ValidationReport> {
  const fd = foundationDoc;
  const foundationSection = fd
    ? truncate(
        `Foundation: Pain point: ${fd.pain_point}. User: ${fd.primary_user}. Core action: ${fd.core_action}. Platform: ${fd.platform}. Competitors: ${fd.competitors?.join(", ") || "none"}. Feel: ${fd.desired_feel}`,
        MAX_FOUNDATION_CHARS
      )
    : "";

  const researchSummary = `
Product idea: ${truncate(rawIdea, 200)}
${foundationSection ? `\n${foundationSection}\n` : ""}

Pain points (REAL DATA):
${formatResults(tavilyResults.painPoints)}

Competitors (REAL DATA):
${formatResults(tavilyResults.competitors)}

Market trends (REAL DATA):
${formatResults(tavilyResults.marketTrends)}
`.trim();

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYNTHESIS_PROMPT },
        { role: "user", content: researchSummary },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI synthesis error: ${res.status} ${err}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  const parsed = JSON.parse(content.trim()) as ValidationReport;
  return parsed;
}
