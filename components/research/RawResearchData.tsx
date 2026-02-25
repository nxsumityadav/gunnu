import type { TavilyResult } from "@/lib/research/tavily";

interface RawResearchDataProps {
  painPoints: TavilyResult[];
  competitors: TavilyResult[];
  marketTrends: TavilyResult[];
}

function ResultCard({
  title,
  results,
}: {
  title: string;
  results: TavilyResult[];
}) {
  if (!results?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {results.map((r, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline hover:no-underline"
            >
              {r.title}
            </a>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {r.content || "No preview available"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground truncate">
              {r.url}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RawResearchData({
  painPoints,
  competitors,
  marketTrends,
}: RawResearchDataProps) {
  const hasData =
    (painPoints?.length ?? 0) > 0 ||
    (competitors?.length ?? 0) > 0 ||
    (marketTrends?.length ?? 0) > 0;

  if (!hasData) return null;

  return (
    <div className="flex flex-col gap-8 rounded-xl border border-border p-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Live Market Research (Tavily)
      </h2>
      <p className="text-xs text-muted-foreground">
        Real-time search results from Reddit, Product Hunt, and market reports.
      </p>

      <ResultCard
        title="Pain points & user feedback"
        results={painPoints ?? []}
      />
      <ResultCard
        title="Competitors & alternatives"
        results={competitors ?? []}
      />
      <ResultCard
        title="Market trends & size"
        results={marketTrends ?? []}
      />
    </div>
  );
}
