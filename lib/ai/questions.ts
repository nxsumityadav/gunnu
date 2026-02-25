import type { FoundationDoc } from "@/lib/types";

const QUESTION_IDS: (keyof Omit<FoundationDoc, "idea_raw">)[] = [
  "pain_point",
  "primary_user",
  "core_action",
  "platform",
  "features_needed",
  "competitors",
  "desired_feel",
  "visual_inspiration",
];

export interface DynamicQuestion {
  id: keyof Omit<FoundationDoc, "idea_raw">;
  label: string;
  options: [string, string, string];
  otherPlaceholder: string;
}

const PROMPT = `Product discovery expert. Generate ONE interview question. Return ONLY valid JSON, no markdown.

Rules: 3 MCQ options (5-15 words each), specific to idea. Option text must be PLAIN—no "A)", "B)", "C)" prefixes. Users may select MULTIPLE. Use previous answers to tailor next question.

{"id":"pain_point|primary_user|core_action|platform|features_needed|competitors|desired_feel|visual_inspiration","label":"Question?","options":["plain text only","no A)B)C)","5-15 words"],"otherPlaceholder":"Type..."}`;

export async function generateQuestion(
  rawIdea: string,
  step: number,
  previousAnswers: Partial<FoundationDoc>,
  apiKey: string,
  baseUrl: string
): Promise<DynamicQuestion> {
  const id = QUESTION_IDS[step];
  const prevText = Object.entries(previousAnswers)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v).trim()}`)
    .filter((s) => s.split(": ")[1]?.length)
    .join("\n");

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: baseUrl.includes("groq") ? "llama-3.1-8b-instant" : "gpt-4o-mini",
      messages: [
        { role: "system", content: PROMPT },
        {
          role: "user",
          content: `Idea: ${rawIdea.slice(0, 200)}. Slot: ${id} (Q${step + 1}/8).${prevText ? `\nPrev: ${prevText.slice(0, 300)}` : ""}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Question generation error: ${res.status} ${err}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  let raw = content.trim();
  const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) raw = m[1].trim();
  const parsed = JSON.parse(raw) as DynamicQuestion;
  parsed.id = id;
  if (!Array.isArray(parsed.options) || parsed.options.length !== 3) {
    throw new Error("Invalid options format");
  }
  // Strip any A), B), C) prefix AI might add
  parsed.options = parsed.options.map((o: string) =>
    String(o).replace(/^[A-C][\.\)]\s*/i, "").trim()
  ) as [string, string, string];
  return parsed;
}
