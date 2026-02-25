import type { FoundationDoc } from "@/lib/types";

/** Generate Tavily queries from Foundation Doc (context2 style) */
export function generateTavilyQueries(
  foundationDoc: FoundationDoc | null,
  rawIdea: string
): { painPoints: string; competitors: string; marketTrends: string } {
  const idea = foundationDoc?.idea_raw?.trim() || rawIdea;
  const pain = foundationDoc?.pain_point || "";
  const comps = foundationDoc?.competitors?.join(" ") || "";

  return {
    painPoints: pain
      ? `${idea} ${pain} problems site:reddit.com`
      : `${idea} user pain points`,
    competitors: comps
      ? `${comps} alternatives complaints Product Hunt`
      : `${idea} best alternatives competitors`,
    marketTrends: `${idea} market size trends 2025`,
  };
}
