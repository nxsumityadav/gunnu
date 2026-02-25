export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

export async function tavilySearch(
  query: string,
  apiKey: string
): Promise<TavilyResult[]> {
  const trimmed = String(query || "").trim().slice(0, 400);
  if (trimmed.length < 4) {
    return [];
  }

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query: trimmed,
      search_depth: "basic",
      include_answer: false,
      include_raw_content: false,
      max_results: 5,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    let msg = `Tavily API error: ${res.status}`;
    try {
      const err = JSON.parse(body);
      if (err.detail) msg += ` - ${typeof err.detail === "string" ? err.detail : JSON.stringify(err.detail)}`;
      else if (err.error) msg += ` - ${err.error}`;
    } catch {
      if (body) msg += ` - ${body.slice(0, 200)}`;
    }
    throw new Error(msg);
  }

  const data = (await res.json()) as { results?: TavilyResult[] };
  return data.results ?? [];
}
