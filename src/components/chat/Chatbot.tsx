import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, MessageCircle } from "lucide-react";

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: "¡Hola! Soy Chamba AI. Estoy aquí para resolver tus dudas sobre nuestros servicios de Marketing, Desarrollo Web y Automatización. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: messages.filter(m => m.content !== messages[0].content)
        })
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'model', content: data.content }]);
      } else {
        throw new Error(data.error || "Error de conexión");
      }
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: "Lo siento, tuve un problema técnico. ¿Podrías contactarnos directamente por WhatsApp? https://wa.me/51904060670" }]);
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
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-[140] w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(59,130,246,0.3)] border border-white/10 cursor-pointer"
          aria-label="Abrir asistente de IA"
        >
          <Bot className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-bg animate-pulse" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-[200] w-[calc(100vw-32px)] sm:w-[380px] glass rounded-2xl border-accent/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col h-[520px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-accent p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black text-[15px] leading-none">Chamba AI</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">IA Activa</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-none shadow-md'
                        : 'bg-surface/80 border border-white/10 text-white/90 rounded-bl-none shadow-inner'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    {msg.content.includes("wa.me") && (
                      <a
                        href="https://wa.me/51904060670"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> Abrir WhatsApp Directo
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface/80 border border-white/10 p-4 rounded-2xl rounded-bl-none text-white/50 flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0 border-t border-white/5 bg-black/20">
              <button
                onClick={() => handleSend("¿Cuáles son sus planes WaaS?")}
                className="text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-3 py-1.5 rounded-full shrink-0 transition-colors"
              >
                💡 Ver Planes WaaS
              </button>
              <button
                onClick={() => handleSend("Quiero agendar una asesoría técnica")}
                className="text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 px-3 py-1.5 rounded-full shrink-0 transition-colors"
              >
                📅 Agendar Asesoría
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-4 bg-black/40 border-t border-white/10 flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-accent disabled:opacity-50 hover:bg-accent/80 text-white p-3 rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
