import { createFileRoute } from "@tanstack/react-router";
import { RIGHTY_SYSTEM_PROMPT } from "@/lib/righty-knowledge";
import type { RightStampWorkContext } from "@/lib/rightstamp-auth";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

type ReqBody = {
  messages?: ChatMessage[];
  workContext?: RightStampWorkContext | null;
};

const GEMINI_MODEL = "gemini-2.5-flash";

export const Route = createFileRoute("/api/righty")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
          return Response.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
        }

        let body: ReqBody;
        try {
          body = (await request.json()) as ReqBody;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return Response.json({ error: "messages required" }, { status: 400 });
        }

        const contextText = body.workContext
          ? `\n\nDữ liệu tác phẩm hiện tại từ RightStamp:\n${JSON.stringify(body.workContext, null, 2)}`
          : "\n\nHiện chưa có dữ liệu tác phẩm nào từ Module 1-2.";

        const systemInstruction = `${RIGHTY_SYSTEM_PROMPT}${contextText}`;

        const contents = messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }));

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents,
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 1024,
              },
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error(`Gemini error [${res.status}]: ${errText}`);
            return Response.json(
              { error: `Gemini request failed: ${res.status}`, detail: errText },
              { status: 502 },
            );
          }

          const data = (await res.json()) as {
            candidates?: Array<{
              content?: { parts?: Array<{ text?: string }> };
            }>;
            promptFeedback?: { blockReason?: string };
          };

          const text =
            data.candidates?.[0]?.content?.parts
              ?.map((p) => p.text ?? "")
              .join("")
              .trim() ?? "";

          if (!text) {
            return Response.json(
              {
                reply:
                  "Righty chưa tạo được câu trả lời. Bạn thử diễn đạt lại câu hỏi cụ thể hơn nhé.",
              },
              { status: 200 },
            );
          }

          return Response.json({ reply: text });
        } catch (error) {
          console.error("Righty Gemini call failed", error);
          return Response.json({ error: "Righty service unavailable" }, { status: 500 });
        }
      },
    },
  },
});
