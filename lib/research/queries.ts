import type { FoundationDoc } from "@/lib/types";

const MIN_QUERY_LENGTH = 4;

/** Ensure query meets Tavily minimum (4+ chars) */
function ensureMinLength(q: string, fallback: string): string {
  const s = String(q || "").trim();
  return s.length >= MIN_QUERY_LENGTH ? s : fallback;
}

/** Generate Tavily queries from Foundation Doc (context2 style) */
export function generateTavilyQueries(
  foundationDoc: FoundationDoc | null,
  rawIdea: string
): { painPoints: string; competitors: string; marketTrends: string } {
  const idea = ensureMinLength(
    foundationDoc?.idea_raw?.trim() || rawIdea,
    "product idea validation"
  );
  const pain = foundationDoc?.pain_point || "";
  const comps = foundationDoc?.competitors?.join(" ") || "";

  return {
    painPoints: ensureMinLength(
      pain ? `${idea} ${pain} problems` : `${idea} user pain points`,
      `${idea} pain points`
    ),
    competitors: ensureMinLength(
      comps ? `${comps} alternatives` : `${idea} competitors`,
      `${idea} alternatives`
    ),
    marketTrends: ensureMinLength(
      `${idea} market trends 2025`,
      "market trends 2025"
    ),
  };
}
