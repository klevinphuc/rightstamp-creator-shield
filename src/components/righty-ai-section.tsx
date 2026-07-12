import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, FileText, MessageSquareWarning, Send, Sparkles, Tags, X } from "lucide-react";
import { readRightStampCurrentWork, type RightStampWorkContext } from "@/lib/rightstamp-auth";
import { generateRightyLocalReply, type RightyChatMessage } from "@/lib/righty-engine";

const RIGHTY_SESSION_KEY = "righty_chat_session_v1";

const INITIAL_MESSAGES: RightyChatMessage[] = [
  {
    role: "assistant",
    content:
      "Chào bạn, mình là Righty. Mình có thể phân loại quyền SHTT, gợi ý metadata, hướng dẫn xử lý vi phạm và soạn nháp email/takedown dựa trên Evidence Pack.",
  },
];

const RIGHTY_TOOLS = [
  {
    icon: Tags,
    title: "Smart Classifier",
    desc: "Phân loại quyền SHTT.",
    prompt: "ảnh tôi vẽ được bảo hộ gì",
  },
  {
    icon: Sparkles,
    title: "Metadata",
    desc: "Gợi ý mô tả, từ khóa.",
    prompt: "gợi ý metadata cho tác phẩm của tôi",
  },
  {
    icon: MessageSquareWarning,
    title: "Vi phạm",
    desc: "Các bước xử lý sao chép.",
    prompt: "tôi bị người khác đăng lại ảnh không xin phép",
  },
  {
    icon: FileText,
    title: "Legal Writer",
    desc: "Soạn email/takedown.",
    prompt: "soạn email cảnh báo bản quyền giúp tôi",
  },
] as const;

export function RightyAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<RightyChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [workContext, setWorkContext] = useState<RightStampWorkContext | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readSessionMessages();
    if (stored.length > 0) setMessages(stored);
    setWorkContext(readRightStampCurrentWork());
  }, []);

  useEffect(() => {
    sessionStorage.setItem(RIGHTY_SESSION_KEY, JSON.stringify(messages));
    if (!isOpen) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isOpen, messages]);

  const [isSending, setIsSending] = useState(false);

  async function submitQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isSending) return;

    const latestWork = readRightStampCurrentWork();
    setWorkContext(latestWork);
    setIsOpen(true);

    const userMessage: RightyChatMessage = { role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsSending(true);

    let reply: string | null = null;
    try {
      const res = await fetch("/api/righty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, workContext: latestWork }),
      });
      if (res.ok) {
        const data = (await res.json()) as { reply?: string };
        if (data.reply) reply = data.reply;
      } else {
        console.error("Righty API error", res.status, await res.text());
      }
    } catch (error) {
      console.error("Righty API fetch failed", error);
    }

    if (!reply) {
      reply = generateRightyLocalReply({
        input: trimmed,
        history,
        workContext: latestWork,
      });
    }

    setMessages([...history, { role: "assistant", content: reply }]);
    setIsSending(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="righty-widget-pop w-[min(calc(100vw-2rem),410px)] overflow-hidden rounded-2xl border border-white/15 bg-[#08111a]/95 text-white shadow-2xl shadow-black/35 backdrop-blur-xl">
          <div className="relative overflow-hidden border-b border-white/10 p-4">
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <RightyMascot size="sm" />
                <div>
                  <p className="font-display text-lg leading-tight tracking-normal">Righty</p>
                  <p className="text-xs text-white/58">
                    {workContext?.fingerprint?.id
                      ? `Đang tham chiếu ${workContext.fingerprint.id}`
                      : "Tư vấn AI miễn phí"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white transition-colors hover:bg-white/[0.16]"
                aria-label="Đóng Righty"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div ref={listRef} className="max-h-[42vh] space-y-3 overflow-y-auto p-4 pr-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-maroon text-white"
                      : "rounded-tl-sm border border-white/10 bg-white text-ink"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/10 bg-white px-4 py-3 text-ink shadow">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-coral [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-coral [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-coral" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-3">
            {RIGHTY_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  type="button"
                  key={tool.title}
                  onClick={() => submitQuestion(tool.prompt)}
                  className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-left transition-colors hover:border-coral/60 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-coral" />
                    <span className="text-xs font-bold text-white">{tool.title}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/52">{tool.desc}</p>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isSending}
              className="min-w-0 flex-1 rounded-xl border border-white/12 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-coral focus:ring-2 focus:ring-coral/25 disabled:opacity-60"
              placeholder="Hỏi Righty..."
            />
            <button
              type="submit"
              disabled={isSending}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-coral text-white transition-colors hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Gửi câu hỏi"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="group relative flex items-center gap-3 rounded-full border border-white/[0.18] bg-maroon py-2 pl-2 pr-4 text-left text-white shadow-2xl shadow-maroon/45 transition-all hover:-translate-y-1 hover:bg-maroon-deep sm:pr-5"
        aria-label={isOpen ? "Đóng trợ lý Righty" : "Mở trợ lý Righty"}
      >
        <span className="righty-launcher-glow absolute inset-0 rounded-full" />
        <RightyMascot />
        <span className="relative hidden min-w-0 sm:block">
          <span className="block text-sm font-bold leading-tight">Righty</span>
          <span className="block text-xs text-white/72">Tư vấn miễn phí</span>
        </span>
      </button>
    </div>
  );
}

function RightyMascot({ size = "md" }: { size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <span
      className={`righty-blink-wrap righty-mascot-jump relative grid shrink-0 place-items-center overflow-visible rounded-full bg-white/10 ${
        isSmall ? "h-12 w-12" : "h-16 w-16"
      }`}
    >
      <span className="righty-digital-ring absolute -inset-1 rounded-full" />
      <span className="righty-data-particle absolute -left-1 top-1 scale-75" />
      <img
        src="/images/righty-mascot.png"
        alt="Mascot Righty"
        className="relative z-10 h-full w-full rounded-full border border-white/30 object-cover object-[50%_26%] shadow-lg"
      />
      <span className="righty-eye righty-eye-left" />
      <span className="righty-eye righty-eye-right" />
      {isSmall && (
        <span className="absolute -right-0.5 -top-0.5 z-20 h-3 w-3 rounded-full border-2 border-[#08111a] bg-green-400" />
      )}
    </span>
  );
}

function readSessionMessages() {
  if (typeof window === "undefined") return [];
  try {
    const value = sessionStorage.getItem(RIGHTY_SESSION_KEY);
    const parsed = value ? (JSON.parse(value) as RightyChatMessage[]) : [];
    return parsed.filter((message) => message.role === "user" || message.role === "assistant");
  } catch {
    return [];
  }
}
