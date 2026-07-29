/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UserPortal from "./pages/UserPortal";
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
  Layers,
  LogOut,
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
              {messages.map((msg, i) => {
                const hasWhatsApp = msg.role === 'model' && msg.content.includes('wa.me/51904060670');
                let displayContent = msg.content;
                if (hasWhatsApp) {
                  displayContent = displayContent.replace(/\[https?:\/\/wa\.me\/51904060670\]\(https?:\/\/wa\.me\/51904060670\)/g, "nuestro canal de WhatsApp");
                  displayContent = displayContent.replace(/\[[^\]]+\]\(https?:\/\/wa\.me\/51904060670\)/g, "nuestro canal de WhatsApp");
                  displayContent = displayContent.replace(/https?:\/\/wa\.me\/51904060670/g, "nuestro canal de WhatsApp");
                }

                const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || "";
                const whatsappUrl = `https://wa.me/51904060670?text=${encodeURIComponent(
                  lastUserMsg 
                    ? `Hola Chamba Digital, tengo una consulta sobre mi negocio:\n\n"${lastUserMsg}"\n\nQuisiera recibir asesoría y un presupuesto exacto.`
                    : `Hola Chamba Digital, quiero potenciar mi negocio con vuestra tecnología y agendar una auditoría.`
                )}`;

                return (
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
                      {displayContent.split('\n').map((line, idx) => {
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

                      {hasWhatsApp && (
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 w-full bg-[#25D366] text-white py-3 px-4 rounded-xl font-black text-[13px] uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba5c] transition-all group border border-white/20"
                        >
                          <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Conectar por WhatsApp
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              
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

            {status !== "success" ? (
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

export const Logo = ({
  className = "",
  textColor = "text-slate-900",
}: {
  className?: string;
  textColor?: string;
}) => (
  <Link to="/">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center leading-[0.9] sm:leading-none">
        <span className={`text-[16px] sm:text-[22px] font-black tracking-tighter transition-colors duration-300 ${textColor}`}>
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
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
      <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center smooth-gpu"
      >
        <span className="label-editorial mx-auto">Web as a Service (WaaS)</span>
        <h1 className="text-[40px] md:text-[56px] font-black max-w-[900px] leading-tight md:leading-[1.1] mb-6">
          Tu web a medida <br />
          <span className="text-accent">$49 al mes</span>.
        </h1>
        <h2 className="text-[16px] md:text-[18px] text-muted font-normal leading-relaxed max-w-[650px] mb-10">
          Cambios e iteraciones ilimitadas. Arquitectura moderna en Railway, SSL, mantenimiento y soporte continuo por WhatsApp.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a
            onClick={() =>
              trackEvent("cta_click", {
                section: "hero",
                label: "Hablar con un Asesor",
              })
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-10 py-5 rounded-xl font-bold text-[16px] shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all"
          >
            Hablar con un Asesor
          </motion.a>
          <motion.a
            whileHover={{ x: 5 }}
            href="#servicios"
            className="group inline-flex items-center gap-2 text-[14px] font-bold text-muted hover:text-fg transition-colors"
          >
            Ver Planes WaaS
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
      <span className="label-editorial mx-auto">Por qué WaaS</span>
      <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-8">
        Tu web lista sin <span className="text-accent">dolores de cabeza</span>.
      </h2>
      <p className="text-muted text-[17px] md:text-[19px] max-w-3xl mx-auto leading-relaxed">
        Olvídate de pagar miles por adelantado a una agencia para luego quedarte solo. Con nuestro modelo WaaS, <strong className="text-fg">nosotros nos encargamos de todo</strong> por una tarifa mensual fija.
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
          Web a Medida
        </h3>
        <ul className="space-y-3">
          {[
            "Diseño y código 100% personalizado.",
            "Despliegue rápido en Railway (desde $5/mes).",
            "Optimizada para móviles y motores de búsqueda.",
            "Certificado SSL y dominio propio configurado.",
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
          Soporte Continuo
        </h3>
        <ul className="space-y-3">
          {[
            "Cambios ilimitados de contenido.",
            "Soporte directo por WhatsApp.",
            "Actualizaciones de seguridad.",
            "Respaldos periódicos automáticos.",
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
          title: "Sin Pago Inicial Masivo",
          desc: "Empiezas con solo tu primera mensualidad.",
          icon: Clock,
        },
        {
          title: "Cambios Ilimitados",
          desc: "Pides un ajuste y lo hacemos en horas.",
          icon: Target,
        },
        {
          title: "Cero Preocupaciones",
          desc: "Mantenimiento y seguridad a nuestro cargo.",
          icon: BarChart3,
        },
        {
          title: "Atención Rápida",
          desc: "Respuesta directa por WhatsApp sin tickets.",
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

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  badge?: string;
  description: string;
  items: Array<{ name: string; details?: string }>;
  isPopular?: boolean;
  savings?: string;
  whatsappText?: string;
  productId?: string;
  delay?: number;
  onOpenDetails?: () => void;
  icon?: any;
}

const PricingCard = ({
  title,
  price,
  period,
  badge,
  description,
  items,
  isPopular = false,
  savings,
  whatsappText,
  productId,
  delay = 0,
  onOpenDetails,
  icon: Icon = Zap,
}: PricingCardProps) => {
  const [loading, setLoading] = useState(false);
  const encodedMsg = encodeURIComponent(whatsappText || `Hola! Me interesa el plan WaaS ${title}`);
  const waUrl = `https://wa.me/51904060670?text=${encodedMsg}`;

  const handleCheckout = async (e: React.MouseEvent) => {
    if (!productId) return; // fallback to WhatsApp link if no product ID
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.open(waUrl, "_blank");
      }
    } catch (err) {
      console.error("Polar Checkout error:", err);
      window.open(waUrl, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={`relative p-8 rounded-[28px] flex flex-col h-full transition-all duration-500 group overflow-hidden ${
        isPopular
          ? "bg-slate-900 text-white border-2 border-cta shadow-2xl scale-[1.02] lg:scale-[1.04] z-10"
          : "bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Popular background highlight */}
      {isPopular && (
        <div className="absolute inset-0 -z-0 overflow-hidden rounded-[28px]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at top right, rgba(234,88,12,0.2) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className={`absolute top-0 right-0 z-20 ${isPopular ? "bg-cta text-white font-black" : "bg-slate-100 text-slate-700 border-l border-b border-slate-200 font-bold"} text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-bl-2xl shadow-sm flex items-center gap-1.5`}>
          {isPopular && <Flame className="w-3.5 h-3.5 text-amber-300" />}
          {badge}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isPopular ? "bg-cta/20 text-cta" : "bg-blue-50 text-accent"}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className={`text-[22px] font-black tracking-tight mb-2 ${isPopular ? "text-white" : "text-slate-900"}`}>
            {title}
          </h3>
          <p className={`text-[13px] leading-relaxed ${isPopular ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
        </div>

        {/* Price */}
        <div className={`mb-8 pb-6 border-b ${isPopular ? "border-slate-800" : "border-slate-100"}`}>
          <div className="flex items-baseline gap-2">
            <span className={`text-[46px] font-black tracking-tighter ${isPopular ? "text-amber-400" : "text-slate-900"}`}>{price}</span>
            {period && <span className={`text-[14px] font-semibold ${isPopular ? "text-slate-400" : "text-slate-500"}`}>{period}</span>}
          </div>
          {savings && (
            <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isPopular ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
              <Sparkles className="w-3 h-3" />
              <span className="text-[11px] font-extrabold">{savings}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 flex-grow mb-8">
          {items.map((item: any, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <CheckCircle2 className={`w-[18px] h-[18px] ${isPopular ? "text-amber-400" : "text-emerald-600"}`} />
              </div>
              <div>
                <span className={`text-[13px] font-bold block leading-tight ${isPopular ? "text-white" : "text-slate-800"}`}>{item.name}</span>
                {item.details && <p className={`text-[11px] leading-relaxed mt-0.5 ${isPopular ? "text-slate-400" : "text-slate-500"}`}>{item.details}</p>}
              </div>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="mt-auto space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-black text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer text-center leading-tight ${
              isPopular
                ? "bg-cta hover:bg-cta-hover text-white shadow-[0_10px_25px_rgba(234,88,12,0.4)] cta-pulse"
                : "bg-accent hover:bg-accent/90 text-white shadow-md"
            }`}
          >
            {loading ? (
              <span className="inline-block animate-pulse">Cargando Checkout...</span>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Suscripción Instantánea Polar
              </>
            )}
          </motion.button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-2.5 rounded-xl font-bold text-[12px] transition-colors flex items-center justify-center gap-2 ${
              isPopular ? "text-slate-300 hover:text-white bg-slate-800/60" : "text-slate-700 hover:text-slate-900 bg-slate-100"
            }`}
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
            O consulta por WhatsApp
          </a>

          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className={`w-full text-[11px] font-bold transition-colors flex items-center justify-center gap-2 py-1.5 ${
                isPopular ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-accent"
              }`}
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
  subtitle = "Ingeniería diseñada para escalar tu facturación.",
  label = "Alto Rendimiento",
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
      {/* Plan $49/mes - Web Tradicional */}
      <PricingCard
        title="Web Tradicional"
        icon={Zap}
        badge="Suscripción Básica"
        description="Para profesionales, marcas personales, tiendas, clínicas y negocios locales."
        price="$49.99"
        period="/ mes"
        savings="Sin inversión inicial"
        productId="70f62d4c-2cd9-49ad-9628-24a04d462cc0"
        whatsappText="Hola! Me interesa la suscripción WaaS Web Tradicional ($49/mes). Quisiera más información."
        items={[
          { name: "Sitio Web Profesional 100% a medida", details: "Sin plantillas genéricas. Código propio." },
          { name: "Cambios ilimitados de contenido", details: "Actualizamos tu web cuando lo necesites." },
          { name: "Despliegue Cloud en Railway", details: "Hosting ultra rápido en Railway (coste directo del cliente desde $5/mes)." },
          { name: "Integración con WhatsApp y Google", details: "Optimizada para recibir clientes de inmediato." },
          { name: "Soporte técnico continuo", details: "Atención rápida directa por WhatsApp." },
        ]}
        onOpenDetails={() => onOpenModal("Web Tradicional WaaS", "Con nuestro plan de $49/mes obtienes tu sitio web totalmente profesional sin hacer un desembolso inicial de miles de dólares. Nos encargamos de todo: diseño, desarrollo, hosting cloud, certificado de seguridad SSL y soporte continuo con cambios ilimitados.")}
      />

      {/* Plan $99/mes - Web App Advanced */}
      <PricingCard
        isPopular={true}
        icon={Crown}
        badge="Más Popular"
        title="Web App Advanced"
        description="Para empresas que requieren panel de administración, catálogo o API REST."
        price="$99.99"
        period="/ mes"
        savings="Incluye Panel Admin + API"
        productId="b78ef21a-1fdc-4fb6-b411-f4eb46f3fe96"
        whatsappText="Hola! Me interesa el plan WaaS Web App Advanced ($99/mes). Necesito panel de administración y funciones avanzadas."
        items={[
          { name: "Web App interactiva y dinámica", details: "Base de datos y panel de control personalizado." },
          { name: "Rest API e Integración de Sistemas", details: "Conexión con pasarelas de pago o software externo." },
          { name: "Cambios e iteraciones ilimitadas", details: "Evolución constante de la plataforma." },
          { name: "Arquitectura Cloud en Railway + Backups", details: "Infraestructura en Railway (desde $5/mes a cuenta del cliente) y 99.9% uptime." },
          { name: "Soporte prioritario directo", details: "Contacto directo con el equipo de desarrollo." },
        ]}
        onOpenDetails={() => onOpenModal("Web App Advanced WaaS", "Diseñado para negocios que necesitan gestionar contenido dinámico, usuarios, reservas o inventario. Incluye un panel administrativo simple e intutitivo, arquitectura escalable y soporte activo para mantener tu plataforma en constante evolución.")}
      />

      {/* Plan $599/mes - Web App con IA */}
      <PricingCard
        title="Web App con IA"
        icon={Sparkles}
        badge="Empresarial & IA"
        description="Para empresas con flujos de trabajo automatizables e integración profunda de IA."
        price="$599.99"
        period="/ mes"
        savings="Automatización Operativa Total"
        productId="ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de"
        whatsappText="Hola! Me interesa el plan WaaS Web App con IA ($599/mes). Deseo automatizar la gestión y flujos de mi empresa con IA."
        items={[
          { name: "Integración de Inteligencia Artificial", details: "Modelos de IA aplicados a la gestión de tu empresa." },
          { name: "Agentes y Asistentes Automatizados", details: "Atención, calificación y procesamiento 24/7." },
          { name: "Automatización de Flujos de Trabajo", details: "Eliminación de procesos manuales y repetitivos." },
          { name: "Infraestructura Cloud Dedicada", details: "Servidores preparados para alta concurrencia." },
          { name: "Consultoría y Evolución Mensual", details: "Optimización continua de tus sistemas con IA." },
        ]}
        onOpenDetails={() => onOpenModal("Web App con IA WaaS", "Nuestra solución de máximo nivel para empresas que buscan transformar sus operaciones. Integramos IA en tus flujos de trabajo, automatizamos la atención de clientes y reducimos costos operativos significativamente por una tarifa mensual fija.")}
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
            Hablemos por 15 minutos. Analizaremos tu negocio para decirte qué necesitas para escalar. <strong>Sin compromiso.</strong>
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
      url: "pacificsurfschool.com.pe",
      label: "Escuela & Clases de Surf",
      thumb: "https://s.wordpress.com/mshots/v1/https://pacificsurfschool.com.pe?w=600",
    },
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
          De la industria hotelera al E-Commerce e infraestructura IA & Cloud.
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
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group block interactive-card p-2 rounded-[22px] hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-300"
            >
              <div className="relative aspect-video rounded-[18px] overflow-hidden border border-slate-200/80 mb-3.5 shadow-md group-hover:shadow-xl transition-all duration-500">
                <img
                  src={web.thumb}
                  alt={web.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="p-3 bg-accent text-white rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <h4 className="text-[14px] font-extrabold text-slate-900 mb-0.5 group-hover:text-accent transition-colors">
                {web.label}
              </h4>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400 group-hover:text-accent transition-colors" />
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("chamba_user_token");
    if (token) {
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => { if (data.user) setLoggedUser(data.user); else setLoggedUser(null); })
        .catch(() => setLoggedUser(null));
    } else {
      setLoggedUser(null);
    }
  };

  // Re-check auth on route change + on mount
  useEffect(() => { checkAuth(); }, [location.pathname]);

  // Listen for auth change events (fired after login/logout in UserPortal)
  useEffect(() => {
    const handler = () => checkAuth();
    window.addEventListener("chamba-auth-change", handler);
    return () => window.removeEventListener("chamba-auth-change", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("chamba_user_token");
    setLoggedUser(null);
    setUserDropdownOpen(false);
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Portafolio", path: "/portafolio" },
    { name: "Metodología", path: "/metodologia" },
    { name: "Hotelería", path: "/hospitality" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-10 flex items-center justify-between smooth-gpu ${
        scrolled
          ? "h-[70px] bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.4)]"
          : "h-[90px] bg-transparent"
      }`}
    >
      <div className="flex items-center gap-12">
        <Logo textColor={scrolled ? "text-white" : "text-slate-900"} />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all relative group py-2 ${
                scrolled ? "text-white hover:text-amber-400" : "text-slate-700 hover:text-accent"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled ? "bg-amber-400" : "bg-accent"}`} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {loggedUser ? (
          /* Logged in: Profile dropdown */
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-[0.15em] transition-all border cursor-pointer ${
                scrolled
                  ? "text-white hover:text-amber-400 border-slate-700 bg-slate-800/80 hover:bg-slate-800"
                  : "text-slate-800 hover:text-accent border-slate-200 bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-[11px] font-black">
                {loggedUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="hidden sm:inline">{loggedUser.name?.split(" ")[0]}</span>
              <svg className={`w-3 h-3 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[110]">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-[13px] font-black text-slate-900">{loggedUser.name}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{loggedUser.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/perfil"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-100 hover:text-accent transition-colors"
                  >
                    <User className="w-4 h-4" /> Ver Perfil
                  </Link>
                  <Link
                    to="/portal"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-100 hover:text-accent transition-colors"
                  >
                    <Layers className="w-4 h-4" /> Mi Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Login Button */}
            <Link
              to="/login"
              className={`text-[12px] font-black uppercase tracking-[0.15em] transition-all px-4 py-2 rounded-xl flex items-center gap-1.5 border ${
                scrolled
                  ? "text-white hover:text-amber-400 border-slate-700 bg-slate-800/80 hover:bg-slate-800"
                  : "text-slate-800 hover:text-accent border-slate-200 bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/51904060670"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-accent text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.5)] border border-white/10 smooth-gpu shrink-0"
            >
              Iniciar Proyecto
            </motion.a>
          </>
        )}

        {/* Mobile / Tablet Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
          className={`lg:hidden p-2.5 md:p-3 rounded-xl border transition-colors flex items-center gap-2 ${
            scrolled
              ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              : "bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200"
          }`}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <>
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline-block md:hidden">Menu</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile & Tablet Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-slate-950/98 backdrop-blur-[30px] flex flex-col p-6 sm:p-10 pt-20 lg:hidden h-[100dvh] w-full overflow-y-auto"
          >
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-accent/15 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-5%] left-[-10%] w-[60vw] h-[60vw] bg-accent/10 blur-[100px] rounded-full -z-10" />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-2xl border border-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-5 my-auto py-6">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-2">
                Menu de Navegacion
              </span>
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={link.path}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[28px] sm:text-[36px] font-black tracking-tight text-white hover:text-amber-400 transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {loggedUser ? (
                <>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.08 }}>
                    <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)} className="text-[28px] sm:text-[36px] font-black tracking-tight text-amber-400 hover:text-white transition-colors flex items-center gap-3 pt-2 border-t border-white/10">
                      <Layers className="w-8 h-8" /> Mi Portal
                    </Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + 1) * 0.08 }}>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-[28px] sm:text-[36px] font-black tracking-tight text-red-400 hover:text-white transition-colors flex items-center gap-3 cursor-pointer">
                      <LogOut className="w-8 h-8" /> Cerrar Sesion
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.08 }}>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[28px] sm:text-[36px] font-black tracking-tight text-amber-400 hover:text-white transition-colors flex items-center gap-3 pt-2 border-t border-white/10"
                  >
                    <User className="w-8 h-8" /> Login Cliente
                  </Link>
                </motion.div>
              )}
            </div>

            <div className="mt-auto space-y-6 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-3">
                <span className="text-[13px] text-slate-400 font-medium">
                  Web as a Service desde <strong className="text-amber-400">$49/mes</strong>
                </span>
                <a
                  href="https://wa.me/51904060670"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/90 text-white py-4 rounded-xl text-center font-black uppercase tracking-wider text-[13px] shadow-lg"
                >
                  Hablar por WhatsApp
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
  <section className="relative min-h-[85vh] flex flex-col items-center text-center justify-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
    <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />

    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="z-10 smooth-gpu"
    >
      <span className="label-editorial mx-auto">
        Web as a Service (WaaS)
      </span>
      <h1 className="text-[36px] sm:text-[48px] md:text-[56px] max-w-[850px] leading-[1.1] md:leading-[1] mb-6 font-black tracking-tight text-slate-900">
        Tu web a medida <br />
        <span className="text-accent">$49 al mes</span>.
      </h1>
      <p className="text-[16px] md:text-[18px] text-slate-600 font-medium leading-[1.6] max-w-[650px] mb-10 mx-auto px-4">
        Cambios e iteraciones ilimitadas. Mantenimiento y soporte continuo. Despliegue en Railway (hosting desde $5/mes y dominio a cuenta del cliente).
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-cta to-cta-hover text-white px-10 py-5 rounded-[14px] font-black text-[15px] w-full sm:w-auto shadow-[0_15px_40px_rgba(255,107,53,0.3)] hover:shadow-[0_20px_50px_rgba(255,107,53,0.4)] transition-all flex items-center justify-center gap-3 cta-pulse uppercase tracking-wider"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Hablar con un Asesor
        </motion.a>
        <Link
          to="/servicios"
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-fg hover:text-accent transition-colors py-3"
        >
          Ver Planes WaaS
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
      <span className="label-editorial mx-auto">El problema</span>
      <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">
        Esto le pasa a la mayoría
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Pagaste y no funcionó",
          desc: "Te cobraron miles por una web que no genera clientes. Quedó bonita pero no vende.",
          icon: TrendingUp,
        },
        {
          title: "Tu web está abandonada",
          desc: "Necesitas un cambio y tu desarrollador no responde. O te cobra de nuevo por cada ajuste.",
          icon: Globe,
        },
        {
          title: "Todo es manual",
          desc: "Respondes lo mismo 20 veces al día. Copias datos a mano. Pierdes ventas por lento.",
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
          Te suena, ¿verdad?
        </h3>
        <p className="text-muted text-[15px] mb-8 max-w-[500px] mx-auto">
          Cuéntanos qué necesitas en 2 minutos por WhatsApp. <strong className="text-fg">Te respondemos hoy.</strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-cta to-cta-hover text-white px-8 py-4 rounded-2xl font-black text-[14px] shadow-[0_15px_30px_rgba(255,107,53,0.3)] flex items-center gap-3 uppercase tracking-wider"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Hablar con un Asesor
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
          className="fixed bottom-0 left-0 right-0 z-[90] bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 py-3.5 px-6 flex items-center justify-center gap-4 sm:gap-6 shadow-[0_-10px_30px_rgba(15,23,42,0.3)]"
        >
          <span className="text-white font-extrabold text-[13px] sm:text-[14px] hidden sm:block tracking-wide">
            Tu web desde <span className="text-amber-400 font-black">$49/mes</span> · Cambios ilimitados · Hosting Railway desde $5/mes
          </span>
          <a
            href="https://wa.me/51904060670?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cta hover:bg-cta-hover text-white px-5 sm:px-6 py-2.5 rounded-xl font-black text-[11px] sm:text-[12px] uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            Hablar por WhatsApp
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
    <div className="max-w-[1024px] mx-auto text-center mb-16">
      <span className="label-editorial mx-auto">Así funciona</span>
      <h2 className="text-[32px] md:text-[48px] font-black tracking-tight leading-tight mb-4">
        Tres pasos. <span className="text-accent">Sin vueltas.</span>
      </h2>
    </div>
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Nos cuentas qué necesitas",
                desc: "Hablamos por WhatsApp o llamada. Entendemos tu negocio y definimos qué tipo de web necesitas.",
              },
              {
                step: "02",
                title: "Diseñamos y desarrollamos",
                desc: "Creamos tu web a medida con código propio. Tú apruebas cada etapa antes de avanzar.",
              },
              {
                step: "03",
                title: "Lanzamos y mantenemos",
                desc: "Publicamos, configuramos hosting y SSL. A partir de ahí, cualquier cambio está incluido en tu plan.",
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
      q: "¿Cómo funciona el servicio WaaS y la infraestructura?",
      a: "Tu suscripción WaaS cubre el diseño, desarrollo a medida, cambios ilimitados de contenido, actualizaciones de seguridad y soporte por WhatsApp. La infraestructura y hosting se despliegan en Railway (con un costo directo desde $5 USD/mes) y el dominio es de tu propiedad.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Sí. No hay contratos de permanencia. Si cancelas, tu web sigue online el mes que ya pagaste y te entregamos todo el código.",
    },
    {
      q: "¿Cuánto tarda en estar lista mi web?",
      a: "Entre 2 y 4 semanas dependiendo de la complejidad. Webs corporativas simples pueden estar listas en 10 días.",
    },
    {
      q: "¿Trabajan con clientes fuera de Perú?",
      a: "Sí. Tenemos clientes en México, España, Estados Unidos y toda Latinoamérica. Todo el proceso es remoto.",
    },
    {
      q: "¿El código es mío?",
      a: "100%. No usamos plantillas ni WordPress. Tu web se desarrolla a medida y al finalizar el proyecto recibes todo el código fuente.",
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
    objective: "Web Tradicional ($50/mes)",
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
        objective: "Web Tradicional ($49/mes)",
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
            Cuéntanos qué <span className="text-accent">necesitas</span>
          </h2>
          <p className="text-muted text-[16px] mb-8 leading-relaxed">
            Escríbenos y te respondemos en menos de 2 horas con una propuesta concreta para tu negocio.
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
      <span className="label-editorial mx-auto">Nuestro compromiso</span>
      <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4">
        Lo que <span className="text-accent">garantizamos</span> por escrito.
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
          title: "Tracking desde el día 1",
          desc: "Google Analytics, Meta Pixel y medición de conversiones configurados desde el lanzamiento.",
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
        ¿Empezamos?
      </h3>
      <p className="text-muted text-[15px] mb-8">
        Escríbenos por WhatsApp y te respondemos hoy.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
          target="_blank"
          className="w-full sm:w-auto bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
        >
          Hablar con un Asesor
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
  <footer className="pt-16 pb-36 md:pt-20 md:pb-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Logo textColor="text-white" />
          <p className="text-[14px] text-muted leading-relaxed">
            Hacemos webs que venden. Desde Lima, Perú para el mundo.
          </p>
          <div className="flex gap-4">
            <motion.a whileHover={{ y: -3, color: "#3B82F6" }} href="https://instagram.com/chamba.digital" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors">
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: "#3B82F6" }} href="https://linkedin.com/company/chamba-digital" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors">
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
          <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Empecemos</h4>
          <motion.a whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }} whileTap={{ scale: 0.95 }} href="https://wa.me/51904060670" target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px] transition-all w-full text-center shadow-[0_10px_30px_rgba(59,130,246,0.2)]">
            Hablar con un Asesor
          </motion.a>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[12px] text-muted text-center md:text-left leading-relaxed">
          © {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-2 md:mt-0">
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
      <Services onOpenModal={onOpenModal} title="Planes WaaS" label="Suscripción Mensual" />
      <Portfolio />
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
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const path = location.pathname;
  const isPortalRoute = path.startsWith("/admin") || path.startsWith("/dashboard") || path.startsWith("/login") || path.startsWith("/registro") || path.startsWith("/portal") || path.startsWith("/perfil") || path.startsWith("/superadmin");

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const openModal = (title: string, content: any) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: "", content: "" });
  };

  return (
    <>
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
        <Route path="/alianza" element={<AllianceContent onOpenModal={openModal} />} />
        <Route path="/admin" element={<SuperAdminDashboard />} />
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/login" element={<UserPortal />} />
        <Route path="/registro" element={<UserPortal />} />
        <Route path="/portal" element={<UserPortal />} />
        <Route path="/perfil" element={<UserPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sorteo" element={<RafflePage />} />
        <Route path="/raffle" element={<RafflePage />} />
      </Routes>
      {!isPortalRoute && (
        <>
          <Modal
            isOpen={modalData.isOpen}
            onClose={closeModal}
            title={modalData.title}
            content={modalData.content}
          />
          <Chatbot />
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/51904060670?text=Hola,%20vengo%20de%20la%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[150] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border border-white/20 p-3.5"
          >
            <WhatsAppIcon className="w-full h-full text-white" />
          </motion.a>
        </>
      )}
    </>
  );
}
