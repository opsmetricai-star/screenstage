import { z } from "zod";

/** Calls Gemini with JSON output and validates the result with a zod schema. Server-only. */
export async function geminiJson<T>(prompt: string, schema: z.ZodType<T>, responseSchema: object): Promise<T> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiError("not_configured", "GEMINI_API_KEY is not set on the server.");
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", responseSchema, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) {
      if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 1500 * (attempt + 1))); continue; }
      const detail = await res.text().catch(() => "");
      throw new GeminiError("upstream", `Gemini returned ${res.status}. ${detail.slice(0, 200)}`);
    }
    const json = await res.json();
    const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) continue;
    try {
      const parsed = schema.safeParse(JSON.parse(text));
      if (parsed.success) return parsed.data;
    } catch { /* retry */ }
  }
  throw new GeminiError("invalid_output", "The AI did not return a valid structured response. Please try again.");
}

export class GeminiError extends Error {
  constructor(public code: "not_configured" | "upstream" | "invalid_output", message: string) { super(message); }
}

// ---- Schemas ----
export const scriptSchema = z.object({
  intro: z.string().min(1),
  questions: z.array(z.object({
    text: z.string().min(1),
    competency: z.string().min(1),
    rubric: z.array(z.string()).min(2).max(6),
  })).min(3).max(10),
});
export type Script = z.infer<typeof scriptSchema>;

export const evaluationSchema = z.object({
  scores: z.array(z.object({
    competency: z.string(),
    score: z.number().min(1).max(5),
    evidence: z.string(),
  })),
  summary: z.string(),
  recommendation: z.enum(["advance", "review", "decline"]),
});
export type Evaluation = z.infer<typeof evaluationSchema>;

export const assessmentSchema = z.object({
  items: z.array(z.object({
    prompt: z.string().min(1),
    competency: z.string().min(1),
    options: z.array(z.string()).length(4),
    answer_index: z.number().int().min(0).max(3),
  })).min(3).max(15),
});

// Gemini responseSchema (OpenAPI subset)
const S = (type: string, extra: object = {}) => ({ type, ...extra });
export const scriptResponseSchema = S("OBJECT", { properties: { intro: S("STRING"), questions: S("ARRAY", { items: S("OBJECT", { properties: { text: S("STRING"), competency: S("STRING"), rubric: S("ARRAY", { items: S("STRING") }) }, required: ["text", "competency", "rubric"] }) }) }, required: ["intro", "questions"] });
export const evaluationResponseSchema = S("OBJECT", { properties: { scores: S("ARRAY", { items: S("OBJECT", { properties: { competency: S("STRING"), score: S("NUMBER"), evidence: S("STRING") }, required: ["competency", "score", "evidence"] }) }), summary: S("STRING"), recommendation: S("STRING", { enum: ["advance", "review", "decline"] }) }, required: ["scores", "summary", "recommendation"] });
export const assessmentResponseSchema = S("OBJECT", { properties: { items: S("ARRAY", { items: S("OBJECT", { properties: { prompt: S("STRING"), competency: S("STRING"), options: S("ARRAY", { items: S("STRING") }), answer_index: S("INTEGER") }, required: ["prompt", "competency", "options", "answer_index"] }) }) }, required: ["items"] });

/** Strip prompt-injection-prone control text and cap length of user-supplied content. */
export const clean = (s: string, max = 6000) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max);
