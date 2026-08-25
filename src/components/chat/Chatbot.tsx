import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, MessageCircle, Calendar, Trash2 } from "lucide-react";
import { FreeConsultationModal } from "../FreeConsultationModal";

const STORAGE_KEY = "chamba_ai_history_v2";
const MAX_INPUT = 500;

const renderMessageParts = (text: string) => {
  // Split by **bold** first, then handle links inside each part
  const boldSplit = text.split(/(\*\*.*?\*\*)/g);
  return boldSplit.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      const linkParts = inner.split(/(https:\/\/\S+)/g);
      return (
        <strong key={idx} className="font-bold text-white">
          {linkParts.map((lp, j) =>
            /^https:\/\//.test(lp) ? (
              <a key={`${idx}-${j}`} href={lp} target="_blank" rel="noreferrer" className="underline underline-offset-2 decoration-white/40 hover:decoration-white">
                {lp}
              </a>
            ) : (
              <React.Fragment key={`${idx}-${j}`}>{lp}</React.Fragment>
            )
          )}
        </strong>
      );
    }
    // Non-bold: handle links and preserve text
    const linkParts = part.split(/(https:\/\/\S+)/g);
    return (
      <React.Fragment key={idx}>
        {linkParts.map((lp, j) =>
          /^https:\/\//.test(lp) ? (
            <a key={`${idx}-${j}`} href={lp} target="_blank" rel="noreferrer" className="text-sky-300 underline underline-offset-2 decoration-sky-300/40 hover:text-white hover:decoration-white">
              {lp}
            </a>
          ) : (
            <React.Fragment key={`${idx}-${j}`}>{lp}</React.Fragment>
          )
        )}
      </React.Fragment>
    );
  });
};

const MessageContent: React.FC<{ text: string; isUser: boolean }> = ({ text, isUser }) => {
  if (isUser) {
    return <p className="whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px] font-medium">{text}</p>;
  }
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 leading-relaxed text-[12px] sm:text-[13px] font-medium">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isBullet = /^(\u2022|\-|\*)\s+/.test(trimmed);
        if (isBullet) {
          const content = trimmed.replace(/^(\u2022|\-|\*)\s+/, "");
          return (
            <div key={i} className="flex gap-2">
              <span className="text-white/40 mt-[1px]">•</span>
              <span className="flex-1">{renderMessageParts(content)}</span>
            </div>
          );
        }
        if (trimmed === "") return <div key={i} className="h-1" />;
        return (
          <p key={i} className="whitespace-pre-wrap">
            {renderMessageParts(line)}
          </p>
        );
      })}
    </div>
  );
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([
    { role: "model", content: "¡Hola! Soy **Chamba AI** de **chamba.digital**. Resuelvo dudas sobre planes WaaS, hoteles, IA y sorteos. ¿En qué te ayudo hoy?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 1) {
          // Validate shape
          const valid = parsed.filter((m: any) => m.role && m.content && typeof m.content === "string").slice(-20);
          if (valid.length >= 2) setMessages(valid);
        }
      }
    } catch {}
  }, []);

  // Persist history (keep last 20)
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
      }
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const clearHistory = () => {
    const initial = [{ role: "model" as const, content: "¡Hola! Soy **Chamba AI** de **chamba.digital**. Resuelvo dudas sobre planes WaaS, hoteles, IA y sorteos. ¿En qué te ayudo hoy?" }];
    setMessages(initial);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    if (text.length > MAX_INPUT) text = text.slice(0, MAX_INPUT);

    const userMessage = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setRateLimited(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.content !== messages[0].content).slice(-6),
        }),
      });

      if (response.status === 429) {
        setRateLimited(true);
        throw new Error("rate_limited");
      }

      const data = await response.json();

      if (data.content) {
        setMessages((prev) => [...prev, { role: "model", content: data.content }]);
      } else {
        throw new Error(data.error || "Error de conexión");
      }
    } catch (err: any) {
      if (err?.message === "rate_limited" || rateLimited) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "Has enviado muchos mensajes seguidos. Espera 30 segundos y vuelve a intentar. O escríbenos directo a **WhatsApp https://wa.me/51904060670**",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "¡Con gusto te ayudamos! Puedes agendar tu **Consulta Gratuita de 15 Minutos** o escribirnos a **WhatsApp https://wa.me/51904060670**",
          },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08, rotate: 4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-[140] w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(59,130,246,0.35)] border border-white/10 cursor-pointer"
          aria-label="Abrir asistente de IA"
        >
          <Bot className="w-7 h-7 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-[200] w-[calc(100vw-32px)] sm:w-[390px] glass rounded-2xl border border-accent/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col h-[530px] max-h-[82vh]"
          >
            {/* Header */}
            <div className="bg-accent p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm leading-none">Chamba AI</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/80 text-[9px] font-bold uppercase tracking-widest">Asistente WaaS Activo</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearHistory}
                  title="Limpiar historial"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Limpiar historial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Cerrar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-none shadow-md"
                        : "bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none shadow-inner"
                    }`}
                  >
                    <MessageContent text={msg.content} isUser={msg.role === "user"} />

                    {(msg.content.includes("15 Minutos") ||
                      msg.content.includes("consulta") ||
                      msg.content.includes("agendar") ||
                      msg.content.includes("wa.me") ||
                      msg.content.includes("WhatsApp")) &&
                      msg.role === "model" && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                          <button
                            onClick={() => setIsConsultationModalOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/80 text-white text-[11px] font-extrabold rounded-lg transition-colors shadow-sm cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" /> Agenda Cita 15 min
                          </button>
                          <a
                            href="https://wa.me/51904060670"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-extrabold rounded-lg transition-colors shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                        </div>
                      )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 border-t border-white/5 bg-slate-950/80">
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="text-[10px] font-black bg-accent/20 hover:bg-accent/30 border border-accent/40 text-blue-300 px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
              >
                ⚡ Consulta Gratis 15 min
              </button>
              <button
                onClick={() => handleSend("¿Cuáles son los planes WaaS y qué incluyen?")}
                className="text-[10px] font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                💡 Ver Planes WaaS
              </button>
              <button
                onClick={() => handleSend("¿Cómo funciona el motor de reservas hoteleras y Sirvoy?")}
                className="text-[10px] font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                🏨 Hoteles & Reservas
              </button>
              <button
                onClick={() => handleSend("¿Cuánto cuesta el paquete de videos con IA con Google Flow?")}
                className="text-[10px] font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
              >
                🎬 Videos IA
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-slate-950 border-t border-white/10 flex gap-2 shrink-0"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.slice(0, MAX_INPUT))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder="Escribe tu consulta o pide tu cita..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 pr-12 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors min-w-0"
                />
                <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold ${inputValue.length > 450 ? "text-amber-400" : "text-white/20"}`}>
                  {inputValue.length}/{MAX_INPUT}
                </span>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-accent disabled:opacity-50 hover:bg-accent/80 text-white p-2.5 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <FreeConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultTopic="Consulta Técnica y Asesoría WaaS (15 min)"
      />
    </>
  );
};
