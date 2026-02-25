import type { FoundationDoc } from "@/lib/types";

const MIN_QUERY_LENGTH = 4;
const MAX_QUERY_LENGTH = 400;

/** Ensure query meets Tavily min (4+) and max (400) chars */
function ensureLength(q: string, fallback: string): string {
  const s = String(q || "").trim();
  if (s.length < MIN_QUERY_LENGTH) return fallback;
  return s.length > MAX_QUERY_LENGTH ? s.slice(0, MAX_QUERY_LENGTH) : s;
}

/** Generate Tavily queries from Foundation Doc (context2 style) */
export function generateTavilyQueries(
  foundationDoc: FoundationDoc | null,
  rawIdea: string
): { painPoints: string; competitors: string; marketTrends: string } {
  const idea = ensureLength(
    foundationDoc?.idea_raw?.trim() || rawIdea,
    "product idea validation"
  ).slice(0, 150);
  const pain = (foundationDoc?.pain_point || "").slice(0, 100);
  const comps = (foundationDoc?.competitors?.join(" ") || "").slice(0, 100);

  return {
    painPoints: ensureLength(
      pain ? `${idea} ${pain} problems` : `${idea} user pain points`,
      `${idea} pain points`
    ),
    competitors: ensureLength(
      comps ? `${comps} alternatives` : `${idea} competitors`,
      `${idea} alternatives`
    ),
    marketTrends: ensureLength(
      `${idea} market trends 2025`,
      "market trends 2025"
    ),
  };
}
