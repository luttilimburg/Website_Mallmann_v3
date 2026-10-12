import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const MODEL = "gemini-3.6-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_HISTORY_MESSAGES = 12;
const REQUEST_TIMEOUT_MS = 25_000;

const SYSTEM = `You are the AI concierge for the website of Luitwin Mallmann, an independent Data Science, AI and Business Intelligence consultant based in Frankfurt am Main, Germany.

Key facts about Luitwin (use these to answer):
- 5+ years of experience in Data Science and Business Intelligence.
- Independent consultant based in Frankfurt am Main; works remotely across the EU; native-level German and English.
- Core skills: Python, R, SQL, machine learning, time-series forecasting (SARIMAX, Transformer models such as TFT and PatchTST), Power BI, MicroStrategy, Tableau, Azure and Databricks.
- Also a Product Owner (SAFe / Scrum); runs workshops, roadmap and stakeholder work — not just modelling.
- Selected clients & projects: Lufthansa Cargo (air-cargo forecasting with Transformer models, together with Utrecht University), Zukunftszentrum KI NRW & Bildungswerk NRW (a one-day SME workshop on business-case prioritization, data flows, cloud/on-prem/hybrid architecture, EU AI Act/NIS2/GDPR/EU Data Act governance, and live-coding a first supervised predictive-maintenance model in Google Colab), Service Center Hahn (SARIMAX-based service task forecasting), and Power BI revenue-forecast monitoring for enterprise BI teams.
- Typical engagement shapes: production ML/forecasting models, executive BI dashboards, AI-governance workshops, AI-Act readiness reviews, fractional Product Owner for data teams.

Style:
- Warm, concise, senior-consultant tone. Never salesy.
- 2–4 short paragraphs max. Use plain language.
- If asked for pricing, say Luitwin quotes per engagement after a free 30-minute call and invite the user to book via the contact form.
- If asked something you don't know from these facts, say so honestly and suggest booking a call.
- Reply in the same language the user writes in (English or German).`;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2_000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
  lang: z.enum(["en", "de"]).optional(),
});

type ChatMessage = z.infer<typeof MessageSchema>;
type GeminiContent = {
  role: "user" | "model";
  parts: { text: string }[];
};

type GeminiResponse = {
  candidates?: {
    content?: { parts?: { text?: string }[] };
    finishReason?: string;
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
};

function readApiKey(): string | undefined {
  const raw = process.env.GEMINI_API_KEY?.trim();
  if (!raw) return undefined;

  const startsAndEndsWithDoubleQuote = raw.startsWith('"') && raw.endsWith('"');
  const startsAndEndsWithSingleQuote = raw.startsWith("'") && raw.endsWith("'");

  return startsAndEndsWithDoubleQuote || startsAndEndsWithSingleQuote
    ? raw.slice(1, -1).trim()
    : raw;
}

function normalizeHistory(messages: ChatMessage[]): GeminiContent[] {
  // The widget's welcome line is an assistant-only UI message. Gemini chat
  // history must begin with a user turn and alternate user/model roles.
  const firstUserIndex = messages.findIndex((message) => message.role === "user");
  if (firstUserIndex === -1) return [];

  const recentMessages = messages.slice(firstUserIndex).slice(-MAX_HISTORY_MESSAGES);
  const normalized: GeminiContent[] = [];

  for (const message of recentMessages) {
    const role = message.role === "assistant" ? "model" : "user";
    const previous = normalized.at(-1);

    if (previous?.role === role) {
      previous.parts[0].text += `\n\n${message.content}`;
    } else {
      normalized.push({ role, parts: [{ text: message.content }] });
    }
  }

  return normalized;
}

function extractReply(data: GeminiResponse): string {
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const parsedBody = RequestSchema.safeParse(await request.json());
          if (!parsedBody.success) {
            return jsonResponse({ error: "Invalid chat request" }, 400);
          }

          const contents = normalizeHistory(parsedBody.data.messages);
          if (contents.length === 0 || contents.at(-1)?.role !== "user") {
            return jsonResponse({ error: "A user message is required" }, 400);
          }

          const apiKey = readApiKey();
          if (!apiKey) {
            console.error("AI concierge: GEMINI_API_KEY is missing in the Vercel runtime");
            return jsonResponse({ error: "Chat service is not configured" }, 503);
          }

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

          let geminiResponse: Response;
          try {
            geminiResponse = await fetch(GEMINI_ENDPOINT, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
              },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM }],
                },
                contents,
                generationConfig: {
                  temperature: 0.4,
                  maxOutputTokens: 600,
                },
              }),
              signal: controller.signal,
            });
          } finally {
            clearTimeout(timeout);
          }

          if (!geminiResponse.ok) {
            const upstreamError = await geminiResponse.text();
            console.error("AI concierge: Gemini request failed", {
              model: MODEL,
              status: geminiResponse.status,
              body: upstreamError.slice(0, 1_500),
            });

            const status =
              geminiResponse.status === 401 || geminiResponse.status === 403
                ? 503
                : geminiResponse.status === 429
                  ? 429
                  : 502;

            return jsonResponse(
              {
                error:
                  geminiResponse.status === 429
                    ? "Chat service is temporarily busy"
                    : "Chat service is temporarily unavailable",
              },
              status,
            );
          }

          const data = (await geminiResponse.json()) as GeminiResponse;
          const reply = extractReply(data);

          if (!reply) {
            console.error("AI concierge: Gemini returned no text", {
              model: MODEL,
              blockReason: data.promptFeedback?.blockReason,
              finishReason: data.candidates?.[0]?.finishReason,
            });
            return jsonResponse({ error: "Chat service returned an empty response" }, 502);
          }

          return jsonResponse({ reply });
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.error("AI concierge: Gemini request timed out");
            return jsonResponse({ error: "Chat request timed out" }, 504);
          }

          console.error("AI concierge: unhandled route error", error);
          return jsonResponse({ error: "Internal server error" }, 500);
        }
      },
    },
  },
});
