import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, MessageCircle, Calendar } from "lucide-react";
import { FreeConsultationModal } from "../FreeConsultationModal";

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: "¡Hola! Soy Chamba AI. Estoy aquí para resolver tus dudas sobre nuestros planes WaaS, Desarrollo Web y Automatización con IA. ¿En qué puedo ayudarte hoy?" }
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

    // Si el usuario pide agendar directamente, sugerir abrir el modal
    const lower = text.toLowerCase();
    const isBookingIntent = lower.includes("agendar") || lower.includes("cita") || lower.includes("consulta") || lower.includes("15 min");

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
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "¡Con gusto te ayudamos! Puedes agendar tu **Consulta Gratuita de 15 Minutos** directamente o escribirnos a WhatsApp: https://wa.me/51904060670" 
      }]);
    } finally {
      setIsTyping(false);
      if (isBookingIntent) {
        // Sugerir visualmente abrir el modal
      }
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
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-none shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none shadow-inner'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px] font-medium">{msg.content}</p>
                    
                    {/* Action buttons inside message */}
                    {(msg.content.includes("15 Minutos") || msg.content.includes("consulta") || msg.content.includes("agendar") || msg.content.includes("wa.me")) && msg.role === 'model' && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                        <button
                          onClick={() => setIsConsultationModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/80 text-white text-[11px] font-extrabold rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" /> Agenda Cita 15 min
                        </button>
                        {msg.content.includes("wa.me") && (
                          <a
                            href="https://wa.me/51904060670"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-extrabold rounded-lg transition-colors shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                        )}
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
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-slate-950 border-t border-white/10 flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu consulta o pide tu cita..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors min-w-0"
              />
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

      {/* Free Consultation Modal */}
      <FreeConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultTopic="Consulta Técnica y Asesoría WaaS (15 min)"
      />
    </>
  );
};

