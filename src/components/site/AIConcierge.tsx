import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

type ChatResponse = {
  reply?: string;
  error?: string;
};

export function AIConcierge() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          lang === "de"
            ? "Hi, ich bin Luitwins KI-Assistent. Frag mich, wie Luitwin bei Data Science, KI oder BI helfen kann."
            : "Hi — I'm Luitwin's AI concierge. Ask me how Luitwin can help with your data, AI or BI challenge.",
      },
    ]);
  }, [lang]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // The first assistant message is only a UI greeting. The API removes it so
      // Gemini receives a valid conversation beginning with a user turn.
      const response = await fetch("/api/public/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: next, lang }),
      });

      const data = (await response.json().catch(() => null)) as ChatResponse | null;

      if (!response.ok || !data?.reply) {
        console.error("AI concierge request failed", {
          status: response.status,
          error: data?.error ?? "Invalid server response",
        });
        throw new Error(data?.error ?? `Chat request failed (${response.status})`);
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch (error) {
      console.error("AI concierge is unavailable", error);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            lang === "de"
              ? "Sorry, gerade nicht erreichbar. Schreiben Sie Luitwin direkt über das Kontaktformular."
              : "Sorry — I'm offline right now. Please use the contact form to reach Luitwin directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition"
        aria-label="Open AI concierge"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span className="text-sm font-medium hidden sm:inline">
          {open
            ? lang === "de"
              ? "Schließen"
              : "Close"
            : lang === "de"
              ? "KI-Assistent"
              : "Ask the AI"}
        </span>
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(92vw,380px)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
            <Sparkles className="h-4 w-4 text-brand" />
            <div>
              <div className="text-sm font-semibold">
                {lang === "de" ? "Luitwins KI-Assistent" : "Luitwin's AI concierge"}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {lang === "de"
                  ? "Antwortet auf Basis von Luitwins Profil"
                  : "Answers grounded in Luitwin's profile"}
              </div>
            </div>
          </div>
          <div
            ref={listRef}
            className="max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3 text-sm"
          >
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "text-right" : ""}>
                {message.role === "user" ? (
                  <div className="inline-block rounded-2xl bg-primary text-primary-foreground px-3 py-2 max-w-[85%] text-left">
                    {message.content}
                  </div>
                ) : (
                  <div className="text-foreground whitespace-pre-wrap">{message.content}</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-muted-foreground text-xs">
                {lang === "de" ? "Denkt nach…" : "Thinking…"}
              </div>
            )}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
            className="border-t border-border p-2 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={lang === "de" ? "Nachricht schreiben…" : "Type a message…"}
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              maxLength={2_000}
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
