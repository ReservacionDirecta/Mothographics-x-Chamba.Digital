/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import HotelsLandingPage from "./pages/LandingPage/Hotels.tsx";
import EcommerceLandingPage from "./pages/LandingPage/ECommerce.tsx";
import ServiceBusinessesLandingPage from "./pages/LandingPage/ServiceBusinesses.tsx";
import HospitalitySolutions from "./pages/LandingPage/HospitalitySolutions.tsx";
import ProposalPage from "./pages/LandingPage/Proposal.tsx";
import PortfolioPage from "./pages/PortfolioPage";
import MethodologyPage from "./pages/MethodologyPage";
import ServicesPage from "./pages/ServicesPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import { motion, AnimatePresence } from "motion/react";
import RafflePage from "./pages/RaffleLandingPage/RafflePage";
import { HeroAnimation } from "./components/animations/HeroAnimation";
import {
  ArrowRight,
  Palette,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle2,
  MessageSquare,
  Calendar,
  ExternalLink,
  X,
  Info,
  User,
  Mail,
  Send,
  MapPin,
  Instagram,
  Linkedin,
  Download,
  Gift,
  Phone,
  MessageCircle,
  Menu,
  Shield,
  Clock,
  Code2,
  Headphones,
  Repeat,
  BarChart3,
  Target,
  Terminal,
  Cpu,
  Database,
  MonitorPlay,
  Bot,
  Crown,
  Flame,
  Star,
  Sparkles,
} from "lucide-react";

// --- Components for Conversion & Lead Flow (Phase 3) ---

const Chatbot = () => {
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
    } catch (error) {
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
          className="fixed bottom-24 right-6 z-[140] w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(59,130,246,0.4)] border border-white/20"
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
            className="fixed bottom-6 right-6 z-[200] w-[calc(100vw-48px)] sm:w-[420px] glass rounded-[32px] border-accent/20 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col h-[600px] max-h-[85vh]"
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
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-bg/20"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-[20px] text-[14px] leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-fg rounded-tl-none'
                  }`}>
                    {msg.content.split('\n').map((line, idx) => {
                      if (!line.trim()) {
                        return <span key={idx} className="block h-2" />;
                      }
                      const parts = line.split(/(\*\*.*?\*\*|https?:\/\/[^\s)]+)/g);
                      return (
                        <span key={idx} className="block mb-2 last:mb-0 leading-relaxed">
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className="font-extrabold text-white">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            if (part.startsWith('http://') || part.startsWith('https://')) {
                              return (
                                <a 
                                  key={pIdx} 
                                  href={part} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="underline decoration-accent/50 text-accent hover:text-accent/80 transition-colors font-bold"
                                >
                                  {part}
                                </a>
                              );
                            }
                            return part;
                          })}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-[20px] rounded-tl-none">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Hazme una pregunta..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-[14px] focus:outline-none focus:border-accent/50 transition-all placeholder:text-muted/50"
                />
                <button 
                  disabled={!inputValue.trim() || isTyping}
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center shadow-lg disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-[9px] text-center text-muted/40 mt-3 uppercase tracking-widest font-black">
                Powered by Gemini 1.5 Flash · Chamba Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ExitIntentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track the intent before fetching
    if (typeof trackEvent === "function") {
      trackEvent("lead_magnet_email_intent", {
        email: formData.email,
        whatsapp: formData.whatsapp,
      });
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/send-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || "Ocurrió un error al enviar el correo.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Error de conexión. Intenta nuevamente.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-[500px] glass p-8 md:p-12 rounded-[40px] border-accent/30 text-center overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />

            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_rgba(59,130,246,0.2)]">
              <Gift className="w-10 h-10 text-accent" />
            </div>

            {status === "idle" ? (
              <>
                <h3 className="text-[32px] md:text-[38px] font-black tracking-tighter leading-none mb-4">
                  Acceso{" "}
                  <span className="text-accent underline decoration-accent/30 underline-offset-8">
                    Exclusivo
                  </span>
                </h3>
                <p className="text-muted text-[16px] mb-10 leading-relaxed px-4">
                  Recibe el{" "}
                  <span className="text-fg font-bold">Checklist 2026</span> al
                  instante vía WhatsApp y asegura tu ventaja competitiva.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="space-y-1.5 px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted/60 ml-1">
                      Email Corporativo
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="juan@empresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-[18px] py-4 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted/60 ml-1">
                      Número WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                      <input
                        required
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        placeholder="+51 900 000 000"
                        className="w-full bg-white/5 border border-white/10 rounded-[18px] py-4 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <motion.button
                    disabled={status === "loading"}
                    whileHover={{
                      scale: status === "loading" ? 1 : 1.02,
                      y: status === "loading" ? 0 : -2,
                    }}
                    whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                    className={`w-full text-white py-5 rounded-[20px] font-black text-[15px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all mt-6 uppercase tracking-widest ${status === "loading" ? "bg-accent/50 cursor-not-allowed" : "bg-accent"}`}
                  >
                    {status === "loading"
                      ? "Procesando..."
                      : "Enviar a mi Correo"}
                    {status !== "loading" && (
                      <Send className="w-5 h-5 fill-white/20" />
                    )}
                  </motion.button>

                  {status === "error" && (
                    <p className="text-red-400 text-[12px] text-center mt-2 font-bold">
                      {errorMessage}
                    </p>
                  )}
                </form>

                <button
                  onClick={onClose}
                  className="mt-8 text-[11px] text-muted/40 hover:text-muted transition-colors uppercase font-black tracking-[0.3em]"
                >
                  Cerrar Ventana
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-[30px] font-black tracking-tighter mb-4 leading-none">
                  ¡Enviado con Éxito!
                </h3>
                <p className="text-muted text-[15px] mb-10 leading-relaxed">
                  Revisa la bandeja de <strong>{formData.email}</strong>. Si no
                  lo ves en 2 minutos, busca en tu carpeta de Spam.
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="/assets/docs/Guia_Transformacion_Digital_2026.pdf"
                    download
                    className="bg-accent text-white py-4 px-8 rounded-2xl font-black text-[14px] shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    Descarga Directa <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="text-[12px] font-bold text-muted/60 py-2 hover:text-fg transition-colors mt-2"
                  >
                    Cerrar ventana
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${className}`}
    >
      
      <div className="flex flex-col sm:flex-row sm:items-center leading-[0.9] sm:leading-none">
        <span className="text-[16px] sm:text-[22px] font-black tracking-tighter">
          Chamba
        </span>
        <span className="text-[14px] sm:text-[22px] font-bold sm:font-black tracking-tighter text-accent">
          .Digital
        </span>
      </div>
    </motion.div>
  </Link>
);

export const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SplashScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center"
  >
    <div className="relative">
      <motion.div
        animate={{ 
          scale: [1, 1.4, 1, 1.6, 1, 1],
          opacity: [0.05, 0.15, 0.05, 0.2, 0.05, 0.05]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.35, 0.5, 1],
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-accent rounded-full blur-[60px] -z-10"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.08, 1, 1.12, 1, 1],
          opacity: [0.9, 1, 0.9, 1, 0.9, 0.9]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.35, 0.5, 1],
          ease: "easeInOut"
        }}
      >
        <Logo className="scale-150" />
      </motion.div>
    </div>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 200 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-[2px] bg-accent mt-12 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    />
  </motion.div>
);

// --- Performance & Data Infrastructure (Phase 4) ---

export const trackEvent = (eventName: string, params: any) => {
  // Placeholder for Meta Pixel / GA4 / GTM
  console.log(`[Analytics] Event: ${eventName}`, params);

  // Example for real integration:
  // if (window.fbq) window.fbq('track', eventName, params);
  // if (window.gtag) window.gtag('event', eventName, params);
};

const getABVariant = (experimentName: string, variants: string[]) => {
  const storageKey = `ab_variant_${experimentName}`;
  const savedVariant = localStorage.getItem(storageKey);

  if (savedVariant && variants.includes(savedVariant)) {
    return savedVariant;
  }

  const randomVariant = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(storageKey, randomVariant);
  return randomVariant;
};

const Modal = ({ isOpen, onClose, title, content }: any) => {
  const renderContent = () => {
    if (typeof content === "string") {
      return (
        <div className="space-y-4 text-[14px] text-muted leading-relaxed">
          {content.split("\n\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <p className="text-[14px] text-muted leading-relaxed">
          {content.description}
        </p>

        {content.caseStudies && content.caseStudies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] flex-grow bg-white/5" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent shrink-0">
                📈 Casos de Éxito
              </h4>
              <div className="h-[1px] flex-grow bg-white/5" />
            </div>
            <div className="grid gap-3">
              {content.caseStudies.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-white/[0.02] border border-white/5 rounded-[12px] flex gap-3 items-start group hover:border-accent/30 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span className="text-[13px] leading-relaxed text-fg/90">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {content.testimonials && content.testimonials.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] flex-grow bg-white/5" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent shrink-0">
                ⭐ Testimonios
              </h4>
              <div className="h-[1px] flex-grow bg-white/5" />
            </div>
            <div className="space-y-4">
              {content.testimonials.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative p-5 rounded-[16px] bg-accent/[0.03] border-l-4 border-accent/40"
                >
                  <p className="text-[13px] italic leading-relaxed text-muted mb-2">
                    "{item.split(" - ")[0]}"
                  </p>
                  {item.includes(" - ") && (
                    <p className="text-[11px] font-bold text-accent uppercase tracking-wider">
                      — {item.split(" - ")[1]}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[550px] glass p-6 sm:p-10 rounded-[24px] border-accent/20 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-accent/10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Info className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-black tracking-tight leading-none">
                {title}
              </h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {renderContent()}
            </div>

            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/51904060670?text=Hola,%20quisiera%20más%20información%20sobre%20el%20plan:%20${encodeURIComponent(title)}`}
              target="_blank"
              className="w-full mt-10 bg-accent text-white py-4 rounded-[12px] font-bold text-[15px] shadow-[0_10px_20px_rgba(59,130,246,0.2)] flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Hablar con un Asesor
            </motion.a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const headlineVariant = getABVariant("hero_headline", ["A", "B"]);

  const headlines = {
    A: {
      tag: "🚀 Agencia de Ingeniería e Inteligencia Artificial",
      title: (
        <>
          Hacemos que tu negocio funcione en <span className="text-accent">Piloto Automático</span>.
        </>
      ),
      sub: "Implementamos Inteligencia Artificial y sistemas de software a medida para reducir tus costos operativos, automatizar tus ventas y escalar tu empresa sin contratar más personal.",
    },
    B: {
      tag: "⚡ Tecnología para Escalar Ventas",
      title: (
        <>
          Multiplica tus resultados con <span className="text-accent">Inteligencia Artificial</span>.
        </>
      ),
      sub: "Olvídate de las tareas repetitivas. Creamos asistentes virtuales, automatizamos tus procesos y construimos páginas ultra rápidas que convierten visitantes en clientes las 24 horas del día.",
    },
  }[headlineVariant as "A" | "B"];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
      <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center smooth-gpu"
      >
        <span className="label-editorial mx-auto">{headlines?.tag}</span>
        <h1 className="text-[40px] md:text-[72px] font-black max-w-[900px] leading-tight md:leading-[1.1] mb-6">
          {headlines?.title}
        </h1>
        <h2 className="text-[18px] md:text-[20px] text-muted font-normal leading-relaxed max-w-[600px] mb-10">
          {headlines?.sub}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a
            onClick={() =>
              trackEvent("cta_click", {
                section: "hero",
                variant: headlineVariant,
                label: "Auditoría",
              })
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#contacto"
            className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[16px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
          >
            Solicitar Auditoría de Conversión
          </motion.a>
          <motion.a
            onClick={() =>
              trackEvent("cta_click", {
                section: "hero",
                variant: headlineVariant,
                label: "Ver Sistemas",
              })
            }
            whileHover={{ x: 5 }}
            href="#servicios"
            className="group inline-flex items-center gap-2 text-[14px] font-bold text-muted hover:text-fg transition-colors"
          >
            Ver Sistemas de Venta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full"
        >
          <HeroAnimation />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Opportunity = () => (
  <section
    id="tech-stack"
    className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
  >
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">Nuestro Enfoque</span>
      <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-8">
        Tecnología orientada a <span className="text-accent">Resultados</span>.
      </h2>
      <p className="text-muted text-[17px] md:text-[19px] max-w-3xl mx-auto leading-relaxed">
        No hablamos en código complejo, hablamos de <strong className="text-fg">rentabilidad</strong>. 
        Implementamos las herramientas exactas que tu empresa necesita para dejar de perder tiempo en procesos manuales y enfocarse en crecer.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-8 rounded-[16px] border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Globe className="w-24 h-24" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Globe className="w-5 h-5 text-accent" />
          Automatización de Negocios
        </h3>
        <ul className="space-y-3">
          {[
            "Conectamos tus sistemas para que hablen entre sí.",
            "Eliminamos el ingreso manual de datos y errores.",
            "Webs ultrarrápidas que nunca se caen.",
            "Notificaciones y alertas de ventas en tiempo real.",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-[14px] text-muted"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-8 rounded-[16px] border-accent/10 relative overflow-hidden bg-accent/[0.02]"
      >
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Bot className="w-24 h-24 text-accent" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Bot className="w-5 h-5 text-accent" />
          Implementación de IA
        </h3>
        <ul className="space-y-3">
          {[
            "Asistentes virtuales que venden por ti 24/7.",
            "Creación automática de contenido para redes.",
            "Análisis inteligente de los datos de tus clientes.",
            "Ahorro drástico en costos de atención al cliente.",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-[14px] text-muted"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {[
        {
          title: "Más Tiempo Libre",
          desc: "Delega lo aburrido a los sistemas.",
          icon: Clock,
        },
        {
          title: "Ventas Seguras",
          desc: "Tu web siempre lista para cobrar.",
          icon: Target,
        },
        {
          title: "Ahorro Real",
          desc: "Menos personal para tareas rutinarias.",
          icon: BarChart3,
        },
        {
          title: "Atención 24/7",
          desc: "Clientes respondidos al instante.",
          icon: MessageCircle,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-5 glass rounded-[12px] border-white/5 hover:border-accent/20 transition-colors"
        >
          <item.icon className="w-6 h-6 text-accent mb-3" />
          <h4 className="text-[14px] font-bold mb-1">{item.title}</h4>
          <p className="text-[12px] text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </motion.div>
  </section>
);

const PricingCard = ({
  title,
  description,
  items = [],
  price,
  period,
  isPopular = false,
  delay = 0,
  onOpenDetails,
  badge,
  icon: Icon = Zap,
  whatsappText,
  savings,
}: any) => {
  const waUrl = `https://wa.me/51904060670?text=${encodeURIComponent(whatsappText || `Hola, me interesa el plan: ${title}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={`relative p-8 rounded-[28px] flex flex-col h-full transition-all duration-500 group overflow-hidden ${
        isPopular
          ? "pricing-popular-glow bg-gradient-to-b from-[#1a1207] via-[#0d0d0d] to-[#0d0d0d] border-2 border-cta/40 scale-[1.02] lg:scale-[1.04] z-10"
          : "glass border-white/10 hover:border-white/20"
      }`}
    >
      {/* Popular shimmer effect */}
      {isPopular && (
        <div className="absolute inset-0 -z-0 overflow-hidden rounded-[28px]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,53,0.15) 0%, transparent 50%, rgba(245,158,11,0.1) 100%)",
            }}
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className={`absolute top-0 right-0 z-20 ${isPopular ? "bg-gradient-to-r from-cta to-gold" : "bg-white/10"} text-white text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2 rounded-bl-2xl shadow-lg flex items-center gap-1.5`}>
          {isPopular && <Flame className="w-3 h-3" />}
          {badge}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isPopular ? "bg-cta/15" : "bg-accent/10"}`}>
            <Icon className={`w-6 h-6 ${isPopular ? "text-cta" : "text-accent"}`} />
          </div>
          <h3 className={`text-[20px] font-black tracking-tight mb-2 ${isPopular ? "text-cta" : "text-fg"}`}>
            {title}
          </h3>
          <p className="text-[13px] text-muted leading-relaxed">{description}</p>
        </div>

        {/* Price */}
        <div className="mb-8 pb-6 border-b border-white/5">
          <div className="flex items-baseline gap-2">
            <span className={`text-[42px] font-black tracking-tighter ${isPopular ? "text-fg" : "text-fg"}`}>{price}</span>
            {period && <span className="text-[13px] text-muted font-medium">{period}</span>}
          </div>
          {savings && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald/10 text-emerald px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span className="text-[11px] font-bold">{savings}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 flex-grow mb-8">
          {items.map((item: any, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <CheckCircle2 className={`w-[18px] h-[18px] ${isPopular ? "text-cta" : "text-emerald"}`} />
              </div>
              <div>
                <span className="text-[13px] font-bold text-fg block leading-tight">{item.name}</span>
                {item.details && <p className="text-[11px] text-muted leading-relaxed mt-0.5">{item.details}</p>}
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto space-y-3">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-2xl font-black text-[14px] uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 ${
              isPopular
                ? "bg-gradient-to-r from-cta to-cta-hover text-white shadow-[0_15px_40px_rgba(255,107,53,0.3)] cta-pulse"
                : "bg-white/5 text-fg hover:bg-white/10 border border-white/10 hover:border-cta/30"
            }`}
          >
            <WhatsAppIcon className="w-5 h-5" />
            {isPopular ? "Empezar Ahora" : "Consultar Plan"}
          </motion.a>

          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className="w-full text-[11px] font-bold text-muted hover:text-accent transition-colors flex items-center justify-center gap-2 py-2"
            >
              Ver detalles técnicos <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};


const Services = ({
  onOpenModal,
  title = "Planes y Soluciones",
  subtitle = "Ingeniería de performance diseñada para escalar tu facturación y optimizar cada dólar invertido.",
  label = "Inversión Inteligente",
}: any) => (
  <section
    id="servicios"
    className="py-24 px-6 md:px-10 max-w-[1200px] mx-auto relative overflow-hidden"
  >
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{ 
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)", 
          filter: "blur(30px)" 
        }} 
      />
    </div>

    <div className="text-center mb-16 relative">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-video -z-10 opacity-20 blur-[100px] bg-accent/30 rounded-full" />
      
      <span className="label-editorial mx-auto">{label}</span>
      <h2 className="text-[36px] md:text-[64px] font-black tracking-tighter mb-4 leading-[0.9]">
        {title}
      </h2>
      <p className="text-muted max-w-2xl mx-auto text-[16px] md:text-[18px] leading-relaxed mb-10">
        {subtitle}
      </p>

      {/* Trust & Conversion Signals */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg">Sin costos ocultos</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg">Garantía de Entrega</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Últimos 2 cupos de este mes</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch mb-24 px-4 lg:px-0">
      {/* Starter Plan */}
      <PricingCard
        title="Lanzamiento OnePage"
        icon={Zap}
        badge="Ideal para empezar"
        description="Valida tu modelo de negocio con una landing de alta conversión."
        price="$150"
        period="USD / Pago Único"
        savings="Entrega en 7 días"
        whatsappText="Hola! Me interesa el Plan Lanzamiento OnePage ($150 USD). Quisiera más información."
        items={[
          { name: "Landing Page Ultra Rápida", details: "Diseño UX enfocado 100% en ventas." },
          { name: "SEO + Google My Business", details: "Aparece en búsquedas desde el día 1." },
          { name: "Dominio + SSL + Hosting", details: "Todo configurado por nosotros." },
          { name: "WhatsApp Integrado", details: "Botón directo para recibir clientes." },
        ]}
        onOpenDetails={() => onOpenModal("Plan Lanzamiento", "Diseñamos una landing page de alto impacto centrada en un solo objetivo: convertir visitantes en clientes. Incluye integración con WhatsApp, formularios de contacto y optimización móvil total. La forma más rápida de profesionalizar tu presencia digital.")}
      />

      {/* Featured Business Plan */}
      <PricingCard
        isPopular={true}
        icon={Flame}
        badge="Más Vendido"
        title="Crecimiento Business"
        description="Ecosistema digital completo. Automatiza tu captación de clientes."
        price="$500"
        period="USD / Pago Único"
        savings="Ahorra +$2,000 vs agencia tradicional"
        whatsappText="Hola! Me interesa el Plan Crecimiento Business ($500 USD). Quiero automatizar mi captación de clientes."
        items={[
          { name: "Web Multipágina (5 secciones)", details: "Inicio, Servicios, Nosotros, Blog, Contacto." },
          { name: "Automatización de Leads con IA", details: "Filtros inteligentes y seguimiento automático." },
          { name: "Meta Pixel + GA4 + Tracking", details: "Mide cada centavo invertido en publicidad." },
          { name: "Soporte VIP 30 días", details: "Acompañamiento técnico post-entrega." },
          { name: "4 Rondas de Revisión", details: "Ajustes semanales sincronizados con pagos." },
        ]}
        onOpenDetails={() => onOpenModal("Plan Business", "Nuestra solución más equilibrada. No solo es una web, es una máquina de captación. Construimos un sistema que captura, califica y procesa leads automáticamente. Incluye análisis de datos avanzado para optimizar cada dólar en publicidad.")}
      />

      {/* Elite Plan */}
      <PricingCard
        title="Dominio Elite & IA"
        icon={Crown}
        badge="Premium"
        description="Software y agentes de IA para dominar mercados competitivos."
        price="$1,200+"
        period="USD / Proyecto"
        whatsappText="Hola! Me interesa el Plan Elite & IA (desde $1,200 USD). Necesito una solución avanzada para mi negocio."
        items={[
          { name: "Agentes de IA 24/7", details: "Vendedores inteligentes en tu web o WhatsApp." },
          { name: "E-Commerce de Escala", details: "Plataformas de venta masiva personalizadas." },
          { name: "Automatización Total", details: "Software a medida para tu operación." },
          { name: "Consultoría de Escala", details: "Estrategia de crecimiento de facturación." },
          { name: "4 Rondas de Revisión", details: "Ajustes semanales sincronizados con pagos." },
        ]}
        onOpenDetails={() => onOpenModal("Plan Elite", "Para proyectos de alta complejidad. Implementamos los últimos avances en IA y desarrollo de software para dominar mercados competitivos. Desde CRMs personalizados hasta agentes de IA que cierran ventas por ti.")}
      />
    </div>

    {/* Strategy CTA Row */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative glass rounded-[40px] border-accent/20 p-8 md:p-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 blur-[100px] rounded-full" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
        <div className="flex-1">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
            <Zap className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-[28px] md:text-[36px] font-black tracking-tighter mb-4">
            ¿No sabes cuál elegir?
          </h3>
          <p className="text-muted text-[16px] md:text-[18px] max-w-xl leading-relaxed">
            Hablemos por 15 minutos. Analizaremos tu negocio y te diremos exactamente qué estructura necesitas para dejar de perder clientes. <strong>Sin compromiso.</strong>
          </p>
        </div>
        
        <div className="flex flex-col gap-4 min-w-[280px]">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670?text=Hola,%20quisiera%20agendar%20una%20auditoría%20gratuita."
            target="_blank"
            className="bg-gradient-to-r from-cta to-cta-hover text-white py-5 px-10 rounded-2xl font-black text-[15px] uppercase tracking-widest shadow-[0_20px_40px_rgba(255,107,53,0.3)] flex items-center justify-center gap-3 cta-pulse"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Agendar Auditoría Gratis
          </motion.a>
          <span className="text-[11px] font-bold text-muted/60 uppercase tracking-[0.3em] text-center">Cupos limitados por semana</span>
        </div>
      </div>
    </motion.div>
  </section>
);

const Portfolio = () => {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const hotelClients = [
    {
      emoji: "🏝️",
      name: "Peña Linda Bungalows",
      location: "Máncora – Perú",
      tasks: [
        "Implementación y gestión integral del PMS.",
        "Desarrollo y optimización continua de la web oficial.",
        "Integración de motor de reservas para ventas directas.",
        "Administración completa del flujo de reservas.",
        "Atención vía WhatsApp y Automatización con IA.",
        "+10 años consolidando resultados.",
      ],
      focus: "Operación integral: marketing + ventas + tecnología + automatización.",
    },
    {
      emoji: "🌿",
      name: "Fundo Achamaqui",
      location: "Chachapoyas – Perú",
      tasks: [
        "Implementación del PMS y estructura de reservas.",
        "Desarrollo de paquetes turísticos premium.",
        "Diseño de experiencias completas y pricing.",
        "Contenido emocional y narrativo.",
        "Automatización de atención y conversión.",
      ],
      focus: "Transformación de alojamiento en producto turístico premium escalable.",
    },
    {
      emoji: "🌊",
      name: "Punta Negritos | Wind & Surf",
      location: "Talara – Perú",
      tasks: [
        "Implementación completa del PMS.",
        "Desarrollo y publicación de la web oficial.",
        "Integración del motor de reservas.",
        "Configuración en OTAs (Booking, Airbnb).",
        "Construcción de presencia digital desde cero.",
      ],
      focus: "Implementación total desde cero: infraestructura digital + canales de venta.",
    },
    {
      emoji: "🌴",
      name: "Hacienda Don Vicente",
      location: "Tarapoto – Perú",
      tasks: [
        "Creación de copys estratégicos para redes sociales.",
        "Desarrollo de promociones estacionales.",
        "Diseño de ofertas con valor agregado.",
        "Optimización de mensajes de venta y conversión.",
      ],
      focus: "Incremento de reservas mediante comunicación efectiva y ofertas atractivas.",
    },
  ];

  const techClients = [
    {
      emoji: "⚖️",
      name: "Latam Abogados",
      location: "Headless Web App (React)",
      tasks: [
        "Migración pixel-perfect de WordPress a React/Vite.",
        "Integración nativa de API MailerLite / Mailchimp.",
        "Automatización de sistema de reservas B2B.",
        "Optimización de assets para SEO internacional.",
      ],
      focus: "Plataforma líder en Inglés Jurídico y Consultoría Legal especializada en U.S., con automatización avanzada de leads.",
    },
    {
      emoji: "🤖",
      name: "Hothelia SaaS",
      location: "Software Hotelero B2B",
      tasks: [
        "Orquestación de API RESTful escalable.",
        "Integración de Agente Ollama para análisis de datos privados.",
        "Automatización de flujos con Google Workflows.",
        "Monitoreo 24/7 con PM2 y Docker.",
      ],
      focus: "Reducción del 70% en tiempo de procesamiento de datos confidenciales.",
    },
    {
      emoji: "🛍️",
      name: "Olivos del Perú",
      location: "E-Commerce & Exportación",
      tasks: [
        "Implementación de ChatGPT/Claude para atención 24/7.",
        "Conexión en tiempo real con inventario vía GraphQL.",
        "Webhooks conectados a WhatsApp Business API.",
        "Calificación predictiva de leads.",
      ],
      focus: "Atención hiper-personalizada y aumento del 35% en tasa de conversión.",
    },
  ];

  const webs = [
    {
      url: "latamabogados.com",
      label: "Inglés Legal & Consultoría U.S.",
      thumb: "https://s.wordpress.com/mshots/v1/https://latamabogados.com?w=600",
    },
    {
      url: "penalindamancora.com",
      label: "Reserva Directa Hotelera",
      thumb: "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600",
    },
    {
      url: "www.dupla.work",
      label: "Producción Visual & Fotografía",
      thumb: "https://s.wordpress.com/mshots/v1/https://www.dupla.work?w=600",
    },
    {
      url: "kabsa.pe",
      label: "Constructora Alcance Nacional",
      thumb: "https://s.wordpress.com/mshots/v1/https://kabsa.pe?w=600",
    },
    {
      url: "puntanegritos.com",
      label: "Wind & Surf Hotel",
      thumb: "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600",
    },
    {
      url: "haciendadonvicente.com",
      label: "Hacienda Don Vicente",
      thumb: "https://s.wordpress.com/mshots/v1/https://haciendadonvicente.com?w=600",
    },
    {
      url: "sauce.pe",
      label: "Sauce Hotel Boutique",
      thumb: "https://s.wordpress.com/mshots/v1/https://sauce.pe?w=600",
    },
    {
      url: "jahsurfperu.com",
      label: "Jah Surf San Bartolo",
      thumb: "https://s.wordpress.com/mshots/v1/https://jahsurfperu.com?w=600",
    },
    {
      url: "olivosdelperu.com",
      label: "Exportación & E-Commerce",
      thumb: "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600",
    },
    {
      url: "hothelia.com",
      label: "Software SaaS (In-house)",
      thumb: "https://s.wordpress.com/mshots/v1/https://hothelia.com?w=600",
    },
  ];

  return (
    <section
      id="portafolio"
      className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden"
    >
      <div className="text-center mb-16">
        <span className="label-editorial mx-auto">Experiencia Comprobada</span>
        <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-4">
          Nuestra <span className="text-accent">Trayectoria</span>.
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-[15px] md:text-[17px]">
          Desde la consolidación de la industria hotelera con <strong className="text-fg">Hothelia</strong> hasta el éxito comercial de <strong className="text-fg">Olivos del Perú</strong> e infraestructura de <strong className="text-fg">IA & Cloud</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
        {/* Vertical Hotelero */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h3 className="text-[20px] font-bold flex items-center gap-3">
              <Globe className="w-6 h-6 text-accent" />
              Vertical Hotelero
            </h3>
            <span className="text-[12px] font-bold text-accent uppercase tracking-[0.2em] bg-accent/10 px-3 py-1 rounded-full">
              Core Expertise
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {hotelClients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
                onClick={() => setSelectedHotel(client)}
                className="p-5 glass rounded-[16px] border-white/5 flex flex-col gap-2 cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{client.emoji}</span>
                    <span className="text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-muted" />
                  <span className="text-[12px] text-muted uppercase tracking-wider">
                    {client.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vertical IA & Cloud */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h3 className="text-[20px] font-bold flex items-center gap-3">
              <Zap className="w-6 h-6 text-accent" />
              Ingeniería IA & Cloud
            </h3>
            <span className="text-[12px] font-bold text-accent uppercase tracking-[0.2em] bg-accent/10 px-3 py-1 rounded-full">
              Innovación
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {techClients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
                onClick={() => setSelectedHotel(client)}
                className="p-5 glass rounded-[16px] border-white/5 flex flex-col gap-2 cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{client.emoji}</span>
                    <span className="text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-muted" />
                  <span className="text-[12px] text-muted uppercase tracking-wider">
                    {client.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Galería de Interfaces */}
      <div className="mt-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] flex-1 bg-white/5" />
          <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-muted">
            Galería de Proyectos
          </h3>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {webs.map((web, i) => (
            <motion.a
              key={i}
              href={`https://${web.url}`}
              target="_blank"
              whileHover={{ y: -5 }}
              className="group block"
            >
              <div className="relative aspect-video rounded-[20px] overflow-hidden border border-white/5 mb-4 shadow-2xl">
                <img
                  src={web.thumb}
                  alt={web.label}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-[13px] font-bold text-fg mb-1">
                {web.label}
              </h4>
              <p className="text-[11px] text-muted uppercase tracking-widest">
                {web.url}
              </p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Hothelia Full Width Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 w-full glass rounded-[32px] border-accent/20 bg-accent/[0.02] overflow-hidden group shadow-[0_10px_30px_rgba(59,130,246,0.05)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 lg:p-16 relative z-10">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-4 block">
              Software Corporativo in-house
            </span>
            <h3 className="text-[28px] md:text-[36px] font-black tracking-tight mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-accent" />
              Ingeniería Propia: Hothelia SaaS
            </h3>
            <p className="text-[15px] md:text-[17px] text-muted leading-relaxed mb-8">
              Una demostración palpable de nuestra capacidad técnica.
              Desarrollamos y operamos nuestra propia plataforma. Hothelia
              resuelve problemas operativos reales en el sector hospitalidad
              mediante automatización nativa y arquitectura cloud, validando
              nuestra tecnología en escenarios de alta exigencia comercial.
            </p>

            <motion.a
              href="https://hothelia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-accent/40 px-6 py-4 rounded-[12px] font-bold text-fg text-[14px] transition-all hover:bg-white/10 group/btn"
            >
              <span>Explorar Plataforma SaaS</span>
              <ArrowRight className="w-4 h-4 text-accent transform group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </div>
          <div className="relative h-[300px] lg:h-full lg:min-h-[450px] w-full bg-black/20 border-t lg:border-t-0 lg:border-l border-white/5 overflow-hidden">
            <img
              src="https://s.wordpress.com/mshots/v1/https://hothelia.com?w=1000"
              alt="Hothelia Dashboard"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/20 lg:to-bg" />
          </div>
        </div>
      </motion.div>

      {/* Hotel Home Modal Detail */}
      <AnimatePresence>
        {selectedHotel && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHotel(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[550px] glass rounded-[32px] border-accent/20 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute top-6 right-6 p-2 text-muted hover:text-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{selectedHotel.emoji}</span>
                <div>
                  <h3 className="text-[24px] font-black tracking-tighter leading-none mb-1">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-[14px] text-accent font-bold uppercase tracking-widest">
                    {selectedHotel.location}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[1px] flex-grow bg-white/5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                      Implementación Estratégica
                    </span>
                    <div className="h-[1px] flex-grow bg-white/5" />
                  </div>
                  <ul className="space-y-4">
                    {selectedHotel.tasks.map((task: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-4 text-[13px] leading-relaxed text-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                        {task}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-accent/10 rounded-[20px] border border-accent/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-12 h-12 text-accent" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-accent tracking-[0.4em] block mb-2">
                    🔑 Enfoque Estratégico
                  </span>
                  <p className="text-[14px] font-bold italic leading-tight text-fg">
                    {selectedHotel.focus}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    to="/hotels"
                    className="bg-accent text-white py-5 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] text-[12px] shadow-lg hover:shadow-accent/40 transition-all"
                  >
                    Ver Sector Completo <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setSelectedHotel(null)}
                    className="text-[11px] font-bold text-muted/50 uppercase tracking-widest"
                  >
                    Volver al portafolio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BusinessModel = () => (
  <section id="modelo" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01 }}
      className="glass p-6 md:p-10 rounded-[12px] transition-transform border-accent/10"
    >
      <h2 className="text-[24px] font-bold mb-6 tracking-[-0.5px]">
        ¿Cómo ganamos todos? (Alianza de Valor)
      </h2>
      <p className="text-[14px] text-muted leading-[1.6] mb-8 max-w-[700px]">
        Guido, tú ya tienes la agencia y la confianza de tus clientes. Chamba
        Digital entra como tu{" "}
        <strong className="text-fg">brazo técnico estratégico</strong> para que
        puedas escalar resultados sin aumentar tu carga operativa. Nuestro
        modelo se basa en la{" "}
        <strong className="text-accent">
          justicia financiera y la equidad:
        </strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Presencia en México</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Mothographics es la cara local en México, gestionando la relación
            directa y el branding. Chamba Digital es el motor remoto que
            garantiza que la ejecución técnica sea impecable y escalable.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Repartición Equitativa</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Si un proyecto requiere que nuestra labor sea el mayor porcentaje
            del producto entregable, la estructura de ingresos se ajustará
            proporcionalmente al nivel de esfuerzo y complejidad técnica
            invertida.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Sin Injusticias</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Cada cliente representa un reto distinto. No creemos en "tarifas
            únicas" que castiguen a una de las partes. Evaluamos cada caso para
            que la alianza sea siempre rentable, transparente y motivadora.
          </p>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <p className="text-[12px] text-accent font-medium text-center italic">
          "El objetivo es que Mothographics crezca en facturación y servicios,
          mientras Chamba Digital garantiza la excelencia técnica detrás de cada
          entrega."
        </p>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
    <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="text-[16px] font-black tracking-tight">
          Próximo Paso:{" "}
          <span className="text-accent">Piloto Galería Arte Urbano</span>
        </p>
        <span className="text-[13px] text-muted">
          Validemos la maquinaria en 2 semanas antes de escalar la alianza.
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="text-[12px] text-muted italic text-center md:text-right leading-relaxed">
          <span className="text-fg font-bold not-italic">México × Perú</span>{" "}
          <br />
          Por Yosward Ríos - Chamba Digital
        </div>
        <motion.a
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-white px-8 py-4 rounded-[10px] font-bold text-[14px] transition-all shadow-[0_5px_15px_rgba(59,130,246,0.1)]"
        >
          Agendar Llamada de Inicio
        </motion.a>
      </div>
    </div>
  </footer>
);

export const ChambaNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Portafolio", path: "/portafolio" },
    { name: "Metodología", path: "/metodologia" },
    { name: "Sorteo", path: "/raffle" },
    { name: "Hotelería", path: "/hospitality" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-10 flex items-center justify-between smooth-gpu ${
        scrolled
          ? "h-[70px] bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "h-[90px] bg-transparent"
      }`}
    >
      <div className="flex items-center gap-12">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path.startsWith("/") ? link.path : link.path}
              className="text-[12px] font-black uppercase tracking-[0.2em] text-muted hover:text-accent transition-all relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex bg-accent text-white px-8 py-3.5 rounded-[14px] text-[12px] font-black uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.5)] border border-white/10 smooth-gpu"
        >
          Iniciar Proyecto
        </motion.a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-[30px] flex flex-col p-8 pt-24 lg:hidden h-[100dvh] w-full overflow-y-auto"
          >
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-accent/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-5%] left-[-10%] w-[60vw] h-[60vw] bg-accent/5 blur-[100px] rounded-full -z-10" />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-6 mb-12">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-4">
                Menú de Navegación
              </span>
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.path}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[32px] font-black tracking-tight hover:text-accent transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <div className="h-[1px] w-full bg-white/10" />
              <div className="flex flex-col gap-4">
                <span className="text-[13px] text-muted italic">
                  ¿Listo para escalar tus operaciones?
                </span>
                <a
                  href="https://wa.me/51904060670"
                  target="_blank"
                  className="bg-accent text-white py-5 rounded-2xl text-center font-black uppercase tracking-widest text-[14px]"
                >
                  Agendar Auditoría Gratuita
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChambaHero = () => (
  <section className="relative min-h-[80vh] flex flex-col items-center text-center justify-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
    <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />

    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="z-10 smooth-gpu"
    >
      <span className="label-editorial mx-auto">
        🚀 Ingeniería de Performance
      </span>
      <h1 className="text-[36px] sm:text-[48px] md:text-[64px] max-w-[800px] leading-[1.1] md:leading-[1] mb-6 font-black tracking-tight">
        Transformamos tu negocio con{" "}
        <span className="text-accent">Tecnología de Alto Nivel</span>.
      </h1>
      <p className="text-[15px] md:text-[18px] text-muted font-normal leading-[1.6] max-w-[600px] mb-10 mx-auto px-4">
        Desarrollo web, Meta Ads y Automatización con IA. Operamos desde Perú
        para el mundo, entregando resultados medibles y escalables.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20una%20auditoría%20gratuita%20para%20mi%20negocio."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-cta to-cta-hover text-white px-10 py-5 rounded-[14px] font-black text-[15px] w-full sm:w-auto shadow-[0_15px_40px_rgba(255,107,53,0.3)] hover:shadow-[0_20px_50px_rgba(255,107,53,0.4)] transition-all flex items-center justify-center gap-3 cta-pulse uppercase tracking-wider"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Auditoría Gratis
        </motion.a>
        <Link
          to="/servicios"
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-fg hover:text-accent transition-colors py-3"
        >
          Explorar Servicios
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Social Proof Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10"
      >
        {[
          { value: "+50", label: "Proyectos Entregados" },
          { value: "+10", label: "Años de Experiencia" },
          { value: "24/7", label: "Soporte Activo" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[28px] md:text-[36px] font-black text-accent tracking-tight">{stat.value}</span>
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

const PainPoints = () => (
  <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">¿Te suena familiar?</span>
      <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">
        El problema de la mayoría de negocios digitales
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Inversión sin Retorno",
          desc: "Gastas en anuncios pero no ves ventas reales. El tráfico llega, pero no convierte.",
          icon: TrendingUp,
        },
        {
          title: "Webs 'Fantasma'",
          desc: "Tienes una web bonita que nadie visita o que es tan lenta que espanta a los clientes.",
          icon: Globe,
        },
        {
          title: "Procesos Manuales",
          desc: "Pierdes tiempo respondiendo lo mismo una y otra vez en lugar de cerrar ventas.",
          icon: MessageSquare,
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 glass rounded-[16px] border-white/5 hover:border-red-500/20 transition-colors group smooth-gpu"
        >
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <item.icon className="w-6 h-6 text-red-500" />
          </div>
          <h4 className="text-[18px] font-bold mb-3">{item.title}</h4>
          <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Inline Lead Capture after Pain Points */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 text-center glass rounded-[32px] p-8 md:p-12 border-cta/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cta/5 via-transparent to-gold/5 -z-0" />
      <div className="relative z-10">
        <h3 className="text-[24px] md:text-[32px] font-black tracking-tight mb-3">
          ¿Te identificas con alguno?
        </h3>
        <p className="text-muted text-[15px] mb-8 max-w-[500px] mx-auto">
          Hablemos 15 minutos. <strong className="text-fg">Sin costo, sin compromiso.</strong> Te diremos exactamente qué necesitas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670?text=Hola%2C%20tengo%20un%20problema%20con%20mi%20negocio%20digital%20y%20necesito%20ayuda."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cta to-cta-hover text-white px-8 py-4 rounded-2xl font-black text-[14px] shadow-[0_15px_30px_rgba(255,107,53,0.3)] flex items-center gap-3 uppercase tracking-wider"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Diagnóstico Gratis por WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.div>
  </section>
);

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[90] sticky-cta-bar py-3 px-6 flex items-center justify-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
        >
          <span className="text-white font-bold text-[13px] hidden sm:block">
            🚀 Transforma tu negocio hoy
          </span>
          <a
            href="https://wa.me/51904060670?text=Hola%2C%20quiero%20una%20auditoría%20gratuita%20para%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-cta px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Auditoría Gratis
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Methodology = () => (
  <section
    id="metodologia"
    className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5"
  >
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="label-editorial">Nuestro Método</span>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-tight mb-6">
            No vendemos humo, <br /> vendemos{" "}
            <span className="text-accent">Ingeniería</span>.
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Captación Estratégica",
                desc: "Tráfico calificado (Meta Ads) enviado directo a landing pages de alta conversión.",
              },
              {
                step: "02",
                title: "Conversión Optimizada",
                desc: "UX premium (Liquid Glass), modales activos y triggers diseñados para cerrar ventas.",
              },
              {
                step: "03",
                title: "Automatización Continua",
                desc: "Agentes de IA y flujos de remarketing que venden y atienden clientes 24/7.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-[24px] font-black text-accent/20">
                  {item.step}
                </span>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">{item.title}</h4>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square glass rounded-[24px] border-accent/20 flex items-center justify-center overflow-hidden smooth-gpu">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover relative z-10"
            >
              <source src="/assets/methodology.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "¿En cuánto tiempo veré resultados?",
      a: "Las campañas de Meta Ads pueden generar leads en las primeras 48-72 horas. Proyectos web y de IA suelen tomar entre 2 a 4 semanas según complejidad.",
    },
    {
      q: "¿Trabajan con clientes fuera de Perú?",
      a: "Sí, operamos de forma remota para clientes en México, España, Estados Unidos y toda Latinoamérica.",
    },
    {
      q: "¿Necesito una inversión mínima en publicidad?",
      a: "Recomendamos iniciar con al menos $10-$15 USD diarios para que el algoritmo de Meta tenga datos suficientes para optimizar.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 md:px-10 max-w-[800px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">
          Preguntas Frecuentes
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass rounded-[12px] border-white/5 overflow-hidden smooth-gpu"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-5 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[14px] font-bold">{faq.q}</span>
              <ArrowRight
                className={`w-4 h-4 text-accent transition-transform ${openIndex === i ? "rotate-90" : ""}`}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-[13px] text-muted leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    objective: "Escalar Ventas",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      trackEvent("lead_form_success", {
        objective: formData.objective,
        email: formData.email,
      });
      setFormData({
        name: "",
        email: "",
        objective: "Escalar Ventas",
        message: "",
      });
    }, 1500);
  };

  return (
    <section
      id="contacto"
      className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="label-editorial">Contacto</span>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-tight mb-6">
            ¿Listo para <span className="text-accent">escalar</span>?
          </h2>
          <p className="text-muted text-[16px] mb-8 leading-relaxed">
            Cuéntanos sobre tu proyecto. Analizaremos tu situación actual y te
            propondremos una estrategia técnica a medida.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">
                  Email
                </p>
                <p className="text-[14px] font-medium">
                  contacto@chamba.digital
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://wa.me/51904060670?text=Hola,%20busco%20asesoría%20para%20un%20proyecto%20con%20Chamba%20Digital."
                target="_blank"
                className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 hover:bg-accent/20 transition-colors p-2.5"
              >
                <WhatsAppIcon className="w-full h-full text-accent" />
              </motion.a>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">
                  WhatsApp Directo
                </p>
                <p className="text-[14px] font-medium">+51 904 060 670</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">
                  Ubicación
                </p>
                <p className="text-[14px] font-medium leading-relaxed">
                  Alameda del premio Real 736, La Encantada de Villa,
                  Chorrillos, Lima, Perú
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-[24px] border-white/5 relative overflow-hidden">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-[20px] font-bold mb-2">¡Mensaje Enviado!</h3>
              <p className="text-muted text-[14px]">
                Nos pondremos en contacto contigo en menos de 24 horas.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-accent text-[14px] font-bold hover:underline"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">
                  Email Corporativo
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="juan@empresa.com"
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">
                  Objetivo Principal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Escalar Ventas",
                    "Automatizar Operaciones",
                    "Nueva Web / App",
                    "Auditoría Ads",
                  ].map((obj) => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, objective: obj })
                      }
                      className={`py-2 px-3 rounded-[8px] text-[11px] font-bold border transition-all ${
                        formData.objective === obj
                          ? "bg-accent border-accent text-white shadow-[0_5px_15px_rgba(59,130,246,0.3)]"
                          : "bg-white/5 border-white/10 text-muted hover:border-white/20"
                      }`}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Cuéntanos brevemente sobre tu negocio y objetivos..."
                  className="w-full bg-white/5 border border-white/10 rounded-[12px] p-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "sending"}
                className="w-full bg-accent text-white py-4 rounded-[12px] font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Consulta
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ProcessTimeline = () => (
  <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5 overflow-hidden">
    <div className="max-w-[1024px] mx-auto">
      <div className="text-center mb-16">
        <span className="label-editorial mx-auto">Cómo Trabajamos</span>
        <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4">
          De la idea al <span className="text-accent">lanzamiento</span> en
          semanas.
        </h2>
        <p className="text-muted text-[15px] max-w-[600px] mx-auto">
          Proceso transparente. Siempre sabes en qué etapa estamos.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            step: "01",
            title: "Briefing & Estrategia",
            desc: "Analizamos tu negocio, definimos objetivos y trazamos el plan de acción con entregables claros.",
            icon: Target,
          },
          {
            step: "02",
            title: "Diseño UX/UI",
            desc: "Prototipamos la experiencia visual en modo Liquid Glass para que apruebes antes de programar.",
            icon: Palette,
          },
          {
            step: "03",
            title: "Desarrollo & Integración",
            desc: "Código propio optimizado. Integramos PMS, pasarelas de pago, Pixel, Analytics y tu CRM.",
            icon: Code2,
          },
          {
            step: "04",
            title: "Revisión & QA",
            desc: "2 rondas de ajustes incluidas. Verificamos en móvil, tablet y desktop. Nada sale sin tu OK.",
            icon: CheckCircle2,
          },
          {
            step: "05",
            title: "Lanzamiento",
            desc: "Desplegamos en producción, configuramos SEO, activamos campañas y encendemos el tracking.",
            icon: Zap,
          },
          {
            step: "06",
            title: "Soporte 30 días",
            desc: "Post-lanzamiento incluido. Cualquier ajuste técnico se resuelve sin costo adicional.",
            icon: Headphones,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-[20px] p-8 border-white/5 hover:border-accent/20 transition-colors group relative overflow-hidden"
          >
            <span className="absolute top-4 right-6 text-[48px] font-black text-accent/5 select-none">
              {item.step}
            </span>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-accent" />
            </div>
            <h4 className="text-[16px] font-bold mb-2">{item.title}</h4>
            <p className="text-[13px] text-muted leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Guarantees = () => (
  <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden">
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">Compromisos Reales</span>
      <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4">
        Garantías que <span className="text-accent">respaldan</span> nuestra
        palabra.
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          icon: Clock,
          title: "Entrega en plazo o devolvemos",
          desc: "Si no cumplimos el deadline acordado, devolvemos el 20% del pago final. Sin letras chicas.",
        },
        {
          icon: Repeat,
          title: "2 rondas de revisiones",
          desc: "No es 'lo que venga quedó'. Tienes dos oportunidades formales para cambios sin costo adicional.",
        },
        {
          icon: Code2,
          title: "Código propio, no plantillas",
          desc: "Tu proyecto se desarrolla a mano. Carga más rápido, rankea mejor en Google y no depende de suscripciones.",
        },
        {
          icon: Shield,
          title: "Transparencia total",
          desc: "Sabes exactamente qué incluye y qué NO incluye cada proyecto. Sin costos ocultos ni sorpresas.",
        },
        {
          icon: Headphones,
          title: "Soporte post-lanzamiento",
          desc: "30 días de soporte técnico incluido después de la entrega para resolver cualquier detalle.",
        },
        {
          icon: BarChart3,
          title: "Resultados medibles desde el día 1",
          desc: "Analytics, Pixel y tracking configurados desde el lanzamiento. Cada centavo se mide.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-[20px] p-6 border-white/5 hover:border-accent/20 transition-colors group"
        >
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <item.icon className="w-6 h-6 text-accent" />
          </div>
          <h4 className="text-[15px] font-bold mb-2">{item.title}</h4>
          <p className="text-[13px] text-muted leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Dual CTA */}
    <div className="mt-16 text-center">
      <h3 className="text-[24px] md:text-[32px] font-black mb-4">
        ¿Listo para empezar?
      </h3>
      <p className="text-muted text-[15px] mb-8">
        Hablemos sobre tu proyecto. Sin compromiso.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20con%20Chamba%20Digital."
          target="_blank"
          className="w-full sm:w-auto bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
        >
          Empezar Proyecto →
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670?text=Hola%2C%20tengo%20preguntas%20sobre%20los%20servicios%20de%20Chamba%20Digital."
          target="_blank"
          className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-accent/30 text-fg px-10 py-5 rounded-[12px] font-bold text-[15px] transition-colors"
        >
          Tengo Preguntas
        </motion.a>
      </div>
    </div>
  </section>
);


export const ChambaFooter = () => (
  <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="text-[14px] text-muted leading-relaxed">
            Ingeniería Digital de alto nivel. Transformamos negocios con tecnología, datos y diseño de performance.
          </p>
          <div className="flex gap-4">
            <motion.a whileHover={{ y: -3, color: "#3B82F6" }} href="https://instagram.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors">
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: "#3B82F6" }} href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors">
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Explorar</h4>
          <ul className="space-y-4">
            {[
              { name: "Inicio", path: "/" },
              { name: "Servicios", path: "/servicios" },
              { name: "Portafolio", path: "/portafolio" },
              { name: "Metodología", path: "/metodologia" },
              { name: "FAQ", id: "faq", isHomeAnchor: true },
              { name: "Sorteo", path: "/raffle" },
              { name: "Hotelería Premium", path: "/hospitality" },
            ].map((item) => (
              <li key={item.name}>
                {item.isHomeAnchor ? (
                  <a href={`/#${item.id}`} className="text-[14px] text-muted hover:text-accent transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.path!} className="text-[14px] text-muted hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Contacto</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-muted">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
              <p className="text-[13px] leading-relaxed">Lima, Perú</p>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <p className="text-[13px]">hola@chamba.digital</p>
            </div>
          </div>
        </div>

        {/* CTA Column */}
        <div className="flex flex-col items-start gap-6">
          <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">¿Listo para empezar?</h4>
          <motion.a whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }} whileTap={{ scale: 0.95 }} href="https://wa.me/51904060670" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px] transition-all w-full text-center shadow-[0_10px_30px_rgba(59,130,246,0.2)]">
            Solicitar Auditoría
          </motion.a>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-muted text-center md:text-left">
          © {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/portafolio" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">Portafolio</Link>
          <Link to="/metodologia" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">Metodología</Link>
          <Link to="/servicios" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">Servicios</Link>
          <Link to="/terminos" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">Términos</Link>
          <Link to="/privacidad" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors">Privacidad</Link>
        </div>
      </div>
    </div>
  </footer>
);

const ChambaContent = ({ onOpenModal }: any) => (
  <div className="selection:bg-accent selection:text-white overflow-x-hidden w-full relative">
    <ChambaNavbar />
    <main className="pt-[70px]">
      <ChambaHero />
      <PainPoints />
      <Methodology />
      <Services onOpenModal={onOpenModal} title="Ingeniería de Performance" label="Nuestros Servicios" />
      <Portfolio />
      <ProcessTimeline />
      <Guarantees />
      <FAQ />
      <ContactForm />
    </main>
    <StickyCtaBar />
    <ChambaFooter />
  </div>
);

const AllianceContent = ({ onOpenModal }: any) => {
  useEffect(() => {
    console.log("AllianceContent mounted");
  }, []);

  return (
    <div className="selection:bg-accent selection:text-white overflow-x-hidden w-full relative">
      <ChambaNavbar />
      <main className="pt-[70px]">
        <Hero />
        <Opportunity />
        <Services
          onOpenModal={onOpenModal}
          title="Upsells para tus clientes"
          label="Menú de Servicios"
        />
        <Portfolio />
        <BusinessModel />
      </main>
      <ChambaFooter />
    </div>
  );
};

export default function App() {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [hasShownExit, setHasShownExit] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExit) {
        setExitIntentOpen(true);
        setHasShownExit(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExit]);

  // Simulate initial load
  useEffect(() => {
    console.log("App loaded. Path:", window.location.pathname);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (title: string, content: any) => {
    // Changed type to 'any' to match usage in the component structure
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: "", content: "" }); // Resetting state on close for clean slate
  };

  return (
    <BrowserRouter>
      <AnimatePresence>
        {" "}
        {/* Removed 'mode="wait"' as it might conflict with other lifecycle hooks */}
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<ChambaContent onOpenModal={openModal} />} />
        <Route
          path="/mothographicsxchambadigital"
          element={<AllianceContent onOpenModal={openModal} />}
        />
        <Route
          path="/MothographicsxChambaDigital"
          element={<AllianceContent onOpenModal={openModal} />}
        />
        <Route
          path="/mothographics-chamba-digital"
          element={<AllianceContent onOpenModal={openModal} />}
        />
        <Route path="/portafolio" element={<PortfolioPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/terminos" element={<TermsPage />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/ecommerce" element={<EcommerceLandingPage />} />
        <Route path="/hotels" element={<HotelsLandingPage />} />
        <Route
          path="/servicebusinesses"
          element={<ServiceBusinessesLandingPage />}
        />
        <Route path="/hospitality" element={<HospitalitySolutions />} />
        <Route path="/propuesta/:slug" element={<ProposalPage />} />
        <Route
          path="/alianza"
          element={<AllianceContent onOpenModal={openModal} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sorteo" element={<RafflePage />} />
        <Route path="/raffle" element={<RafflePage />} />
      </Routes>
      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
      />
      <Chatbot />
      
      <ExitIntentModal
        isOpen={exitIntentOpen}
        onClose={() => setExitIntentOpen(false)}
      />
      
      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/51904060670?text=Hola,%20vengo%20de%20la%20web%20y%20quisiera%20más%20información."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border border-white/20 p-3.5"
      >
        <WhatsAppIcon className="w-full h-full text-white" />
      </motion.a>
    </BrowserRouter>
  );
}
