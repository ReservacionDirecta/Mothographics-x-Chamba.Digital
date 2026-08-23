/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent, useRef, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ScrollReveal, ParallaxSection, RevealText } from "./components/ScrollReveal";
import { GlowCard, MagneticElement, SectionDivider } from "./components/MagneticElement";
import { ProjectCardThumbnail } from "./components/common/ProjectCardThumbnail";
import { FreeConsultationModal } from "./components/FreeConsultationModal";

const Chatbot = lazy(() => import("./components/chat/Chatbot").then(m => ({ default: m.Chatbot })));
const HotelsLandingPage = lazy(() => import("./pages/LandingPage/Hotels.tsx"));
const EcommerceLandingPage = lazy(() => import("./pages/LandingPage/ECommerce.tsx"));
const ServiceBusinessesLandingPage = lazy(() => import("./pages/LandingPage/ServiceBusinesses.tsx"));
const HospitalitySolutions = lazy(() => import("./pages/LandingPage/HospitalitySolutions.tsx"));
const ProposalPage = lazy(() => import("./pages/LandingPage/Proposal.tsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const MethodologyPage = lazy(() => import("./pages/MethodologyPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const IntellectualPropertyPage = lazy(() => import("./pages/IntellectualPropertyPage"));
const SuperAdminDashboard = lazy(() => import("./pages/SuperAdminDashboard"));
const UserPortal = lazy(() => import("./pages/UserPortal"));
const RafflePage = lazy(() => import("./pages/RaffleLandingPage/RafflePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
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
  ShieldCheck,
  Building2,
  Clock,
  CreditCard,
  Code2,
  Headphones,
  Repeat,
  BarChart3,
  Target,
  Bot,
  Flame,
  Sparkles,
  Crown,
  Terminal,
  Layers,
  LogOut,
  Activity,
  Lock,
} from "lucide-react";

// --- Components for Conversion & Lead Flow (Phase 3) ---

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
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted ml-1">
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
                        className="w-full bg-white/5 border border-white/10 rounded-[18px] py-4 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                      Número WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
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
                    className="text-[12px] font-bold text-muted py-2 hover:text-fg transition-colors mt-2"
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
  compact = false,
}: {
  className?: string;
  textColor?: string;
  compact?: boolean;
}) => (
  <Link to="/">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center leading-[0.9] sm:leading-none">
        <span className={`font-black tracking-tighter transition-colors duration-300 ${textColor} ${compact ? "text-[14px]" : "text-[16px] sm:text-[22px]"}`}>
          Chamba
        </span>
        <span className={`font-bold sm:font-black tracking-tighter text-accent ${compact ? "text-[14px]" : "text-[14px] sm:text-[22px]"}`}>
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
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center pt-[70px] pb-16 px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
      <div className="z-10 flex flex-col items-center">
        <motion.span
          className="label-editorial mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Web as a Service (WaaS)
        </motion.span>

        <h1 className="text-[36px] sm:text-[44px] md:text-[56px] font-black max-w-[950px] leading-tight md:leading-[1.1] mb-6 tracking-tight text-slate-900">
          Tu Web Profesional a Medida.{" "}
          <br className="hidden sm:inline" />
          <span className="text-accent">
            Sin Pagar Miles por Adelantado.
          </span>
        </h1>

        <p className="text-[16px] md:text-[18px] text-slate-600 font-normal leading-relaxed max-w-[720px] mb-10">
          Olvídate de agencias tradicionales con presupuestos inflados. Diseño con código propio, servidor ultrarrápido y mantenimiento continuo por tarifa plana mensual.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a
            onClick={() =>
              trackEvent("cta_click", {
                section: "hero",
                label: "Ver Planes de Suscripción",
              })
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#servicios"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold text-[14px] shadow-sm transition-colors uppercase tracking-wider flex items-center gap-2"
          >
            Ver Planes de Suscripción
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <a
            href="https://wa.me/51904060670?text=Hola%2C%20quisiera%20agendar%20una%20llamada%20sobre%20sus%20planes%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-6 py-4 rounded-xl transition-colors"
          >
            Agendar Llamada
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Opportunity = () => (
  <section
    id="tech-stack"
    className="py-12 md:py-20 px-4 sm:px-6 md:px-10 max-w-[1024px] mx-auto"
  >
    {/* Sección: Agencia Tradicional vs. WaaS */}
    <div className="text-center mb-8 md:mb-14">
      <span className="label-editorial mx-auto">La Ley del Contraste</span>
      <h2 className="text-[28px] sm:text-[34px] md:text-[46px] font-black tracking-tight leading-tight mb-3 text-slate-900">
        Agencia Tradicional <span className="text-slate-400">vs.</span> Tu Equipo <span className="text-accent">WaaS</span>
      </h2>
      <p className="text-muted text-[14px] sm:text-[16px] md:text-[17px] max-w-2xl mx-auto leading-relaxed">
        ¿Por qué pagar miles por adelantado cuando puedes tener soporte técnico continuo por una fracción del costo?
      </p>
    </div>

    {/* Comparativa 2 columnas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-5 sm:p-7 rounded-2xl border border-red-200/80 bg-red-50/40 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-[14px] shrink-0">✕</div>
          <h3 className="text-[17px] font-black text-slate-900">La Agencia Tradicional</h3>
        </div>
        <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-medium">
          Te cobran entre $1,000 y $2,000 por adelantado por una web de plantilla que queda abandonada. Cualquier cambio posterior tarda semanas o te lo cobran como extra.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-5 sm:p-7 rounded-2xl border border-accent/30 bg-blue-50/40 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-accent font-bold text-[14px] shrink-0">✓</div>
          <h3 className="text-[17px] font-black text-slate-900">Tu Suscripción WaaS Chamba</h3>
        </div>
        <p className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed font-medium">
          Tarifa plana desde $49/mes. Tu web vive en servidores cloud ultrarrápidos, incluye cambios de contenido semanales y un equipo de ingeniería disponible por WhatsApp.
        </p>
      </motion.div>
    </div>

    {/* Sección de Beneficios Clave (3 Pilares) */}
    <div className="text-center mb-8">
      <span className="label-editorial mx-auto">Beneficios Concretos</span>
      <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-black tracking-tight text-slate-900">
        Resultados tangibles para tu negocio
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex sm:block items-start gap-4 sm:gap-0"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center sm:mb-4 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">Tu Marca y Dominio 100% Tuyos</h4>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Sin letras chicas ni retenciones. El dominio, la propiedad intelectual y tu base de datos están a tu nombre desde el primer día.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex sm:block items-start gap-4 sm:gap-0"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center sm:mb-4 shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">Carga en menos de 1 segundo</h4>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Tu web nunca se cae cuando lanzas anuncios en Facebook, Instagram o Google. Máxima velocidad de conversión para no perder clientes.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex sm:block items-start gap-4 sm:gap-0"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center sm:mb-4 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">Actualizaciones Semanales</h4>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            Nos envías tus ofertas, fotos o cambios de precio por WhatsApp y nosotros los publicamos. Cero dolores de cabeza técnicos.
          </p>
        </div>
      </motion.div>
    </div>
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
    if (!productId) return;
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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col h-full ${isPopular ? "relative" : ""}`}
    >
      {/* Popular indicator */}
      {isPopular && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Recomendado</span>
        </div>
      )}

      {/* Badge */}
      {!isPopular && badge && (
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{badge}</span>
        </div>
      )}

      {/* Price */}
      <div className="mb-2">
        <div className="flex items-baseline gap-1">
          <span className={`font-black tracking-tighter ${isPopular ? "text-[52px] sm:text-[60px] text-slate-900" : "text-[42px] sm:text-[48px] text-slate-900"}`}>{price}</span>
          {period && <span className="text-[14px] font-medium text-slate-400 ml-1">{period}</span>}
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="text-[18px] sm:text-[20px] font-black tracking-tight text-slate-900 mb-1.5">{title}</h3>
        <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 mb-6" />

      {/* Features */}
      <ul className="space-y-3 flex-grow mb-8">
        {items.map((item: any, idx: number) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
            <div>
              <span className="text-[13px] font-semibold text-slate-800 block leading-tight">{item.name}</span>
              {item.details && <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{item.details}</p>}
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto space-y-2.5">
        <motion.a
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-[13px] tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer text-center ${
            isPopular
              ? "bg-slate-900 hover:bg-slate-800 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          Contratar por WhatsApp
        </motion.a>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-[11px] text-slate-500 hover:text-slate-800 bg-transparent hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
        >
          {loading ? "Cargando..." : "Pagar con Tarjeta →"}
        </button>
      </div>

      {/* Savings pill */}
      {savings && (
        <div className="mt-4 text-center">
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {savings}
          </span>
        </div>
      )}
    </motion.div>
  );
};


const Services = ({
  onOpenModal,
  title = "Planes y Soluciones WaaS",
  subtitle = "Tu equipo de ingeniería y tecnología por una tarifa fija mensual. Sin sorpresas.",
  label = "Tarifa Plana",
}: any) => (
  <section
    id="servicios"
    className="py-16 md:py-28 px-4 sm:px-6 md:px-10 max-w-[1200px] mx-auto relative overflow-hidden"
  >
    {/* Header */}
    <div className="text-center mb-16 md:mb-20">
      <span className="label-editorial mx-auto">{label}</span>
      <h2 className="text-[36px] sm:text-[48px] md:text-[58px] font-black tracking-tight mb-5 leading-[1.05] text-slate-900">
        {title}
      </h2>
      <p className="text-muted max-w-xl mx-auto text-[15px] sm:text-[17px] leading-relaxed">
        {subtitle}
      </p>
    </div>

    {/* Pricing Grid — 3 columns minimalist */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 items-start mb-16 md:mb-24">
      {/* Plan $49/mes */}
      <div className="lg:border-r lg:border-slate-200 lg:pr-8 xl:pr-10">
        <PricingCard
          title="Web Tradicional"
          icon={Zap}
          badge="Plan Inicial"
          description="Para profesionales, marcas personales, tiendas, clínicas y negocios locales."
          price="$49"
          period="/mes"
          savings="Promo semestral: $245 (6 meses)"
          productId="70f62d4c-2cd9-49ad-9628-24a04d462cc0"
          whatsappText="Hola! Me interesa la suscripción WaaS Web Tradicional ($49/mes). Quisiera iniciar mi proyecto."
          items={[
            { name: "Sitio web profesional 100% a medida", details: "Código propio en React/Vite. Carga en < 1s." },
            { name: "Actualizaciones semanales incluidas", details: "Cambios de fotos, textos y ofertas sin costo." },
            { name: "Infraestructura Cloud en Railway", details: "Hosting ultrarrápido con SSL incluido." },
            { name: "Integración con WhatsApp y Google", details: "Formularios y botones para captar clientes." },
            { name: "Soporte técnico continuo", details: "Atención directa por WhatsApp." },
          ]}
          onOpenDetails={() => onOpenModal("Web Tradicional WaaS", "Sitio web profesional por $49/mes. Sin inversión inicial.")}
        />
      </div>

      {/* Plan $99/mes — Popular */}
      <div className="lg:px-8 xl:px-10 lg:border-r lg:border-slate-200">
        <PricingCard
          isPopular={true}
          icon={Crown}
          title="Web App Advanced"
          description="Para empresas que requieren panel de administración, catálogo o API REST."
          price="$99"
          period="/mes"
          savings="Promo semestral: $495 (6 meses)"
          productId="b78ef21a-1fdc-4fb6-b411-f4eb46f3fe96"
          whatsappText="Hola! Me interesa el plan WaaS Web App Advanced ($99/mes). Necesito panel de administración."
          items={[
            { name: "Panel de administración personalizado", details: "Gestión de productos, pedidos o reservas." },
            { name: "Pasarelas de pago e integraciones", details: "Culqi, Niubiz, MercadoPago o software externo." },
            { name: "Cambios e iteraciones continuas", details: "Evolución constante de módulos comerciales." },
            { name: "Infraestructura Cloud + Backups", details: "Copias diarias y 99.9% uptime." },
            { name: "Soporte prioritario directo", details: "Línea técnica dedicada para resolver dudas." },
          ]}
          onOpenDetails={() => onOpenModal("Web App Advanced WaaS", "Para negocios con contenido dinámico, reservas o inventario.")}
        />
      </div>

      {/* Plan $599.99/mes — IA */}
      <div className="lg:pl-8 xl:pl-10">
        <PricingCard
          title="Web App con IA"
          icon={Sparkles}
          badge="Empresarial"
          description="Para empresas con flujos de trabajo automatizables e integración profunda de IA."
          price="$599.99"
          period="/mes"
          savings="Automatización Operativa Total"
          productId="ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de"
          whatsappText="Hola! Me interesa el plan WaaS Web App con IA ($599.99/mes). Deseo automatizar mi empresa con IA."
          items={[
            { name: "Agentes de IA en WhatsApp 24/7", details: "Cotizan, envían info y atienden automáticamente." },
            { name: "Automatización de procesos operativos", details: "Ahorra horas de trabajo manual." },
            { name: "Servidores Cloud dedicados", details: "Infraestructura privada con alta seguridad." },
            { name: "Monitoreo y respaldos 24/7", details: "Supervisión activa de rendimiento." },
            { name: "Consultoría y evolución mensual", details: "Acompañamiento estratégico continuo." },
          ]}
          onOpenDetails={() => onOpenModal("Web App con IA WaaS", "IA integrada en flujos de trabajo. Automatización y reducción de costos.")}
        />
      </div>
    </div>

    {/* Hotel Pro — Discreet CTA */}
    <div className="text-center mb-16 md:mb-20">
      <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Sector Hotelero</span>
        </div>
        <p className="text-[15px] text-slate-700 font-semibold">
          Plan Desarrollo Web para Hoteles — <span className="text-slate-900 font-black">$999 USD</span> <span className="text-slate-400 font-medium">pago único</span>
        </p>
        <p className="text-[12px] text-slate-500 max-w-md">
          Web premium + integración PMS + motor de reservas + 2,500 créditos IA/mes en Google Flow.
        </p>
        <a
          href="https://wa.me/51904060670?text=Hola,%20quiero%20información%20sobre%20el%20Plan%20Hoteles%20($999)."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-bold text-accent hover:underline mt-1"
        >
          Cotizar por WhatsApp →
        </a>
      </div>
    </div>

    {/* Trust Row */}
    <div className="flex flex-wrap items-center justify-center gap-3 mb-14 md:mb-16">
      {[
        { icon: ShieldCheck, text: "RUC 15609816934 · Factura Electrónica" },
        { icon: CheckCircle2, text: "Garantía 30 días post-lanzamiento" },
        { icon: Clock, text: "Soporte directo por WhatsApp" },
        { icon: CreditCard, text: "Yape · BCP · Interbank · Tarjeta" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-600 text-[11px] font-semibold">
          <item.icon className="w-3.5 h-3.5 text-slate-400" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>

    {/* Strategy CTA */}
    <div className="text-center">
      <h3 className="text-[22px] md:text-[28px] font-black tracking-tight text-slate-900 mb-3">
        ¿Tienes dudas sobre qué plan se adapta a tu negocio?
      </h3>
      <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed max-w-lg mx-auto mb-6">
        Evaluamos tus requerimientos técnicos y te asesoramos para elegir la arquitectura adecuada. Sin compromiso.
      </p>
      <button
        onClick={() => onOpenModal("Consulta Gratuita de 15 Minutos", "15min_consultation")}
        className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-7 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
      >
        <Zap className="w-4 h-4" />
        Agendar Auditoría Gratuita (15 min)
      </button>
    </div>

  </section>
);

const Portfolio = () => {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const hotelClients = [
    {
      name: "Hotel Costa Blanca",
      location: "Vichayito – Perú",
      tasks: [
        "Plataforma Web WaaS de Alta Conversión.",
        "Reserva Directa vía WhatsApp Integrada.",
        "Catálogo Dinámico de Habitaciones & Servicios.",
        "Galería Multimedia & Experiencias de Playa.",
        "Soporte Continuo & Mantenimiento Cloud.",
      ],
      focus: "Refugio resort en Vichayito con reservas directas por WhatsApp y motor de experiencias.",
    },
    {
      name: "Fundo Achamaqui",
      location: "Chachapoyas – Perú",
      tasks: [
        "Implementación del PMS y estructura de reservas.",
        "Desarrollo de paquetes turísticos.",
        "Diseño de experiencias completas y pricing.",
        "Contenido emocional y narrativo.",
        "Automatización de atención y conversión.",
      ],
      focus: "Hospedaje convertido en paquete turístico con venta directa.",
    },
    {
      name: "Punta Negritos | Wind & Surf",
      location: "Talara – Perú",
      tasks: [
        "Implementación completa del PMS.",
        "Desarrollo y publicación de la web oficial.",
        "Integración del motor de reservas.",
        "Configuración en OTAs (Booking, Airbnb).",
        "Construcción de presencia digital desde cero.",
      ],
      focus: "Lanzamiento digital completo: infraestructura + canales de venta.",
    },
    {
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
      name: "Latam Abogados",
      location: "React / Vite con carga en 0.5s",
      tasks: [
        "Desarrollo pixel-perfect en React/Vite.",
        "Integración nativa de API MailerLite / Mailchimp.",
        "Automatización de sistema de reservas B2B.",
        "Optimización de assets para SEO internacional.",
      ],
      focus: "Plataforma líder en Inglés Jurídico y Consultoría Legal especializada en U.S., con captación automatizada de clientes.",
    },
    {
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
      name: "Olivos del Perú",
      location: "E-Commerce & WhatsApp API",
      tasks: [
        "Implementación de Agente IA para atención 24/7.",
        "Conexión en tiempo real con inventario.",
        "Catálogo interactivo con checkout directo.",
        "Flujos de conversión para compradores internacionales.",
      ],
      focus: "E-Commerce optimizado para exportación con calificación y cierre automatizado de ventas.",
    },
  ];

  const webs = [
    {
      url: "costablanca.up.railway.app",
      label: "Hotel Costa Blanca Vichayito",
      thumb: "/thumbs/costablanca.webp",
    },
    {
      url: "pacificsurfschool.com.pe",
      label: "Escuela & Clases de Surf",
      thumb: "/thumbs/pacificsurfschool.webp",
    },
    {
      url: "latamabogados.com",
      label: "Inglés Legal & Consultoría U.S.",
      thumb: "/thumbs/latamabogados.webp",
    },
    {
      url: "www.dupla.work",
      label: "Producción Visual & Fotografía",
      thumb: "/thumbs/dupla.webp",
    },
    {
      url: "kabsa.pe",
      label: "Constructora Alcance Nacional",
      thumb: "/thumbs/kabsa.webp",
    },
    {
      url: "puntanegritos.webflow.io",
      label: "Wind & Surf Hotel",
      thumb: "/thumbs/puntanegritos.webp",
    },
    {
      url: "haciendadonvicente.com",
      label: "Hacienda Don Vicente",
      thumb: "/thumbs/haciendadonvicente.webp",
    },
    {
      url: "fundoachamaqui.com",
      label: "Fundo Achamaqui Resort",
      thumb: "/thumbs/fundoachamaqui.webp",
    },
    {
      url: "sauce.pe",
      label: "Sauce Hotel Boutique",
      thumb: "/thumbs/sauce.webp",
    },
    {
      url: "jahsurfperu.com",
      label: "Jah Surf San Bartolo",
      thumb: "/thumbs/jahsurfperu.webp",
    },
    {
      url: "olivosdelperu.com",
      label: "Exportación & E-Commerce",
      thumb: "/thumbs/olivosdelperu.webp",
    },
    {
      url: "hothelia.com",
      label: "Software SaaS (In-house)",
      thumb: "/thumbs/hothelia.webp",
    },
  ];

  return (
    <section
      id="portafolio"
      className="py-14 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden"
    >
      <div className="text-center mb-10 md:mb-16">
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
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <h3 className="text-[18px] sm:text-[20px] font-black flex items-center gap-2.5 text-slate-900">
              <Building2 className="w-5 h-5 text-accent" />
              Vertical Hotelero
            </h3>
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              Sistemas en Producción
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {hotelClients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedHotel(client)}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 hover:shadow-xs flex flex-col gap-1.5 cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-900 group-hover:text-accent transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-11">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
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
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <h3 className="text-[18px] sm:text-[20px] font-black flex items-center gap-2.5 text-slate-900">
              <Zap className="w-5 h-5 text-accent" />
              Ingeniería IA & Cloud
            </h3>
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              Innovación
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {techClients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedHotel(client)}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 hover:shadow-xs flex flex-col gap-1.5 cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-900 group-hover:text-accent transition-colors">
                      {client.name}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-11">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
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
              <div className="relative aspect-video rounded-[18px] overflow-hidden border border-slate-200/80 mb-3.5 shadow-md group-hover:shadow-xl transition-all duration-500 bg-slate-950">
                <ProjectCardThumbnail
                  thumb={web.thumb}
                  label={web.label}
                  url={web.url}
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
        transition={{ duration: 0.7 }}
        className="mt-20 w-full rounded-[28px] border border-slate-200 bg-slate-900 text-white overflow-hidden shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 lg:p-14 lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Software in-house & IA
            </div>
            
            <h3 className="text-[28px] md:text-[34px] font-black tracking-tight mb-4 text-white leading-tight">
              Ingeniería Propia: Hothelia SaaS
            </h3>
            
            <p className="text-[14px] md:text-[16px] text-slate-300 leading-relaxed mb-6 font-normal">
              Desarrollamos y operamos nuestra propia plataforma tecnológica. Hothelia resuelve la operativa hotelera integrando motor de reservas directas con 0% comisiones, Channel Manager y agentes de IA en WhatsApp.
            </p>

            <div className="space-y-2.5 mb-8 text-[13px] text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Agente de Inteligencia Artificial en WhatsApp 24/7</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PMS & Channel Manager sincronizado con OTAs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Arquitectura Cloud con 99.9% de Uptime</span>
              </div>
            </div>

            <a
              href="https://hothelia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explorar Hothelia.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-6 lg:p-10 lg:col-span-6 bg-slate-950/60 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-800">
            {/* High-Resolution Browser Mockup for Hothelia */}
            <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden group/hothelia">
              {/* Browser bar */}
              <div className="px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                </div>
                <div className="bg-slate-950/80 border border-slate-700/60 rounded-md px-3 py-0.5 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-2xs">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>https://hothelia.com</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="w-3 h-3" />
                  Live
                </span>
              </div>

              {/* Full Color Sharp Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <img
                  src="/thumbs/hothelia.webp"
                  alt="Hothelia SaaS Platform"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform group-hover/hothelia:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Micro tech badge overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md text-white rounded-xl p-3 border border-slate-700/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[11px] font-bold text-slate-200">Ecosistema PMS + IA Hotelera</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    SaaS In-House
                  </span>
                </div>
              </div>
            </div>
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
                <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black tracking-tight leading-none mb-1 text-white">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-[13px] text-amber-400 font-bold uppercase tracking-wider">
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
                    className="text-[11px] font-bold text-muted uppercase tracking-widest"
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
    if (token && token !== "mock_demo_jwt_token") {
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          if (!res.ok) {
            localStorage.removeItem("chamba_user_token");
            setLoggedUser(null);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data?.user) setLoggedUser(data.user);
          else setLoggedUser(null);
        })
        .catch(() => setLoggedUser(null));
    } else if (token === "mock_demo_jwt_token") {
      setLoggedUser({
        id: "demo_user_id_123",
        name: "Demo Cliente",
        email: "demo@chamba.digital",
        company: "Demo Empresa",
        plan: "Web Tradicional",
        subscriptionStatus: "activa",
        projectStatus: "en_produccion",
        role: "client"
      });
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

  const isPortalRoute = location.pathname.startsWith("/portal") || location.pathname.startsWith("/perfil") || location.pathname.startsWith("/login") || location.pathname.startsWith("/registro");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between smooth-gpu ${
        isPortalRoute
          ? "h-[52px] bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-4 md:px-6 shadow-md"
          : scrolled
            ? "h-[70px] bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.4)] px-6 md:px-10"
            : "h-[90px] bg-transparent px-6 md:px-10"
      }`}
    >
      <div className={`flex items-center ${isPortalRoute ? "gap-6" : "gap-12"}`}>
        <Logo textColor={isPortalRoute || scrolled ? "text-white" : "text-slate-900"} compact={isPortalRoute} />

        {/* Desktop Nav - hidden on portal routes */}
        {!isPortalRoute && (
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
        )}
      </div>

      <div className={`flex items-center ${isPortalRoute ? "gap-2" : "gap-3 md:gap-4"}`}>
        {loggedUser ? (
          /* Logged in: Profile dropdown */
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-2 rounded-xl font-black transition-all border cursor-pointer ${
                isPortalRoute
                  ? "text-white/90 hover:text-white border-slate-700/50 bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1.5 text-[11px]"
                  : `px-4 py-2 text-[12px] uppercase tracking-[0.15em] ${
                    scrolled
                      ? "text-white hover:text-amber-400 border-slate-700 bg-slate-800/80 hover:bg-slate-800"
                      : "text-slate-800 hover:text-accent border-slate-200 bg-slate-100 hover:bg-slate-200"
                  }`
              }`}
            >
              <div className={`${isPortalRoute ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-[11px]"} rounded-full bg-accent text-white flex items-center justify-center font-black`}>
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

const showcaseProjects = [
  {
    id: "penalinda",
    category: "Hotelería & PMS",
    name: "Peña Linda Bungalows",
    url: "penalindamancora.com",
    tag: "Motor de Reservas Directo",
    thumb: "/thumbs/penalindamancora.webp",
    lcp: "0.6s",
    score: "100",
  },
  {
    id: "latam",
    category: "Consultoría & Legal B2B",
    name: "LATAM Abogados",
    url: "latamabogados.com",
    tag: "Captación Automática de Leads",
    thumb: "/thumbs/latamabogados.webp",
    lcp: "0.5s",
    score: "100",
  },
  {
    id: "olivos",
    category: "E-Commerce & Exportación",
    name: "Olivos del Perú",
    url: "olivosdelperu.com",
    tag: "Catálogo & WhatsApp API",
    thumb: "/thumbs/olivosdelperu.webp",
    lcp: "0.7s",
    score: "99",
  },
];

const ChambaHero = () => {
  const [activeProject, setActiveProject] = useState(0);
  const current = showcaseProjects[activeProject];

  return (
    <section className="relative pt-12 md:pt-16 pb-20 px-6 md:px-10 overflow-hidden max-w-[1140px] mx-auto">
      {/* Intro Content */}
      <div className="flex flex-col items-center text-center max-w-[900px] mx-auto mb-12">
        {/* Step 1: Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-6 shadow-2xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Partner WaaS e Ingeniería Digital · Planes desde $49/mes
          </span>
        </motion.div>

        {/* Step 2: Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[38px] sm:text-[50px] md:text-[62px] font-black leading-[1.08] md:leading-[1.04] tracking-tight text-slate-900 mb-6"
        >
          Tu Web Profesional a Medida. <br />
          <span className="text-accent">Sin pagar miles por adelantado.</span>
        </motion.h1>

        {/* Step 3: Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] md:text-[19px] text-slate-600 font-normal leading-relaxed max-w-[700px] mb-8"
        >
          Por $49/mes cubrimos tu tecnología, el servidor cloud de alta velocidad y cambios ilimitados. Tú te enfocas en vender, nosotros somos tu equipo de ingeniería.
        </motion.p>

        {/* Step 4: CTAs & Micro-guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-xl font-bold text-[14px] shadow-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Hablar con un Asesor por WhatsApp
            </motion.a>
            <Link
              to="/servicios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[14px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-6 py-4 rounded-xl transition-colors"
            >
              Ver Planes y Precios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] font-medium text-slate-500 mt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Sin permanencia forzosa
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Entrega en 7 días
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Tu dominio y marca son 100% tuyos
            </span>
          </div>
        </motion.div>
      </div>

      {/* Step 5: Interactive Browser Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[960px] mx-auto mb-14"
      >
        {/* Category switcher tabs */}
        <div className="flex items-center justify-center gap-2 mb-3 overflow-x-auto pb-1">
          {showcaseProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeProject === idx
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              <Globe className="w-3.5 h-3.5 opacity-70" />
              {p.name}
              <span className="text-[10px] opacity-60 ml-0.5 hidden sm:inline">({p.category})</span>
            </button>
          ))}
        </div>

        {/* Browser Frame */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          {/* Browser Header Bar */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>

            <div className="flex-1 max-w-sm mx-auto">
              <div className="bg-white border border-slate-200/90 rounded-md px-3 py-1 text-[11px] font-mono text-slate-600 flex items-center justify-center gap-1.5 shadow-2xs">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span className="truncate">https://{current.url}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                <Activity className="w-3 h-3" />
                99.9% Uptime
              </span>
            </div>
          </div>

          {/* Project Preview Image with Overlay Pill */}
          <div className="relative aspect-[16/9] sm:aspect-[16/8.5] bg-slate-950 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.thumb}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            {/* Performance Metric Pill Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-900/90 backdrop-blur-md text-white rounded-xl p-3.5 border border-slate-700/60 shadow-xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  {current.score}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Lighthouse</div>
                  <div className="text-[10px] text-emerald-400 font-medium">100% Performance</div>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-slate-700 hidden sm:block"></div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white">{current.tag}</div>
                <div className="text-[10px] text-slate-400">Carga en {current.lcp} · React 19 + Cloud SSL</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Step 6: Client Trust Logos Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pt-6 border-t border-slate-200/80"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-5">
          Infraestructura web y software desplegado para marcas y empresas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-600 text-[13px] font-bold">
          <span className="hover:text-slate-900 transition-colors">Peña Linda Bungalows</span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="hover:text-slate-900 transition-colors">LATAM Abogados</span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="hover:text-slate-900 transition-colors">Fundo Achamaqui</span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="hover:text-slate-900 transition-colors">Sauce Hotel Boutique</span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="hover:text-slate-900 transition-colors">Olivos del Perú</span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="hover:text-slate-900 transition-colors">Dupla Work</span>
        </div>
      </motion.div>
    </section>
  );
};

const PainPoints = () => (
  <section className="py-12 md:py-20 px-4 sm:px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-100">
    <ScrollReveal>
    <div className="text-center mb-8 md:mb-14">
      <span className="label-editorial mx-auto">El Costo de no tener un buen sistema</span>
      <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-black tracking-tight mb-3 text-slate-900">
        ¿Cuánto dinero te hace perder el modelo tradicional?
      </h2>
      <p className="text-muted text-[14px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
        El 80% de las pymes pagan de más por webs que quedan abandonadas a los pocos meses.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {[
        {
          title: "Pagar $1,500 por adelantado a ciegas",
          desc: "Desembolsar miles de dólares antes de validar resultados es un riesgo enorme que drena tu capital de trabajo.",
          icon: TrendingUp,
        },
        {
          title: "Webs abandonadas y desactualizadas",
          desc: "Cada cambio de texto, foto o precio requiere cotizaciones lentas, programadores caros y demoras de semanas.",
          icon: Globe,
        },
        {
          title: "Pérdida de 3 de cada 5 prospectos",
          desc: "Si tu web tarda en cargar o no conecta directo con WhatsApp, los clientes que pagaste en publicidad se van con la competencia.",
          icon: MessageSquare,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-5 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex sm:block items-start gap-4 sm:gap-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center sm:mb-4 shrink-0">
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">{item.title}</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Inline Lead Capture after Pain Points */}
    <div
      className="mt-10 sm:mt-14 text-center rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 bg-slate-50/80"
    >
      <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-black tracking-tight mb-2 text-slate-900">
        Tu equipo de ingeniería web por solo $49/mes
      </h3>
      <p className="text-slate-600 text-[13px] sm:text-[15px] mb-6 max-w-[540px] mx-auto leading-relaxed">
        Sin contratos forzosos. Mantenimiento, hosting cloud ultrarrápido y soporte directo por WhatsApp incluido.
      </p>
      <div className="flex justify-center">
        <a
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-[13px] shadow-sm flex items-center gap-2 uppercase tracking-wider transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4" />
          Hablar por WhatsApp (Respuesta Rápida)
        </a>
      </div>
    </div>
    </ScrollReveal>
  </section>
);

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const shouldShow = visible && !footerInView;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="fixed bottom-0 left-0 right-0 z-[90] bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3.5 px-6 flex items-center justify-center gap-4 sm:gap-6 shadow-lg"
        >
          <span className="text-white font-medium text-[13px] sm:text-[14px] hidden sm:block tracking-wide">
            Tu web a medida desde <span className="text-accent font-bold">$49/mes</span> · Cambios ilimitados · Hosting Cloud incluido
          </span>
          <a
            href="https://wa.me/51904060670?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold text-[12px] uppercase tracking-wider shadow-xs flex items-center gap-2 transition-colors"
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
    className="py-14 md:py-20 px-6 md:px-10 bg-slate-50/50 border-y border-slate-200/80"
  >
    <ScrollReveal>
    <div className="max-w-[1024px] mx-auto text-center mb-10 md:mb-16">
      <span className="label-editorial mx-auto">Proceso de Trabajo</span>
      <h2 className="text-[32px] md:text-[44px] font-black tracking-tight leading-tight mb-3 text-slate-900">
        De la idea al despliegue en tres etapas
      </h2>
      <p className="text-muted text-[15px] md:text-[16px] max-w-xl mx-auto">
        Metodología ágil para entregar tu plataforma web en producción sin retrasos.
      </p>
    </div>
    </ScrollReveal>
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Definición y Requerimientos",
                desc: "Analizamos tu modelo comercial, estructura de catálogo o servicios y objetivos de captación.",
              },
              {
                step: "02",
                title: "Desarrollo y Optimización",
                desc: "Programamos la web con arquitectura moderna, código a medida y optimización técnica para alta velocidad.",
              },
              {
                step: "03",
                title: "Despliegue y Mantenimiento",
                desc: "Publicamos en infraestructura cloud con SSL y gestionamos las actualizaciones semanales de tu contenido.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start"
              >
                <span className="text-[20px] font-mono font-bold text-accent bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="text-[17px] font-bold text-slate-900 mb-1.5">{item.title}</h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="aspect-square rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden bg-slate-950 shadow-sm">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
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
      q: "¿La web y el dominio son míos?",
      a: "Totalmente. Tu dominio (.pe, .com), tu marca y tu base de datos son 100% tuyos desde el día 1. La suscripción cubre el servidor cloud de alta velocidad y nuestro equipo dedicado a actualizar y mantener tu web cada semana.",
    },
    {
      q: "¿Cómo funciona el pago y emiten factura en Perú?",
      a: "Aceptamos Yape, Plin, Transferencia BCP, Interbank y Tarjetas de Crédito/Débito. Emitimos Factura y Boleta Electrónica formal con RUC 15609816934 para que puedas deducir gastos de tu empresa.",
    },
    {
      q: "¿Qué pasa si el diseño inicial no cumple mis expectativas?",
      a: "Cero Riesgo: Si en los primeros 15 días sientes que el diseño no va con tu marca, te devolvemos el 100% de tu dinero sin peleas ni letra chica.",
    },
    {
      q: "¿Tengo que pagar un hosting o mantenimiento aparte?",
      a: "No. Toda la infraestructura cloud, los certificados SSL y el mantenimiento semanal ya están incluidos en tu tarifa fija mensual. Cero costos sorpresa.",
    },
    {
      q: "¿Hay contratos forzosos de permanencia?",
      a: "No. No creemos en retenciones obligatorias. Puedes pausar o cancelar tu suscripción en cualquier momento avisándonos por WhatsApp.",
    },
    {
      q: "¿Cómo solicito cambios de fotos, textos o promociones?",
      a: "Solo nos envías un mensaje de WhatsApp con lo que deseas actualizar y nuestro equipo lo implementa durante la semana sin ningún costo extra.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-20 px-4 sm:px-6 md:px-10 max-w-[850px] mx-auto">
      <ScrollReveal>
      <div className="text-center mb-8 md:mb-12">
        <span className="label-editorial mx-auto">Respuestas Claras</span>
        <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-black tracking-tight text-slate-900">
          Preguntas Frecuentes
        </h2>
      </div>
      </ScrollReveal>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-colors hover:border-slate-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-4 sm:p-5 text-left flex justify-between items-center hover:bg-slate-50/60 transition-colors group cursor-pointer"
            >
              <span className="text-[14px] sm:text-[15px] font-bold text-slate-900 group-hover:text-accent transition-colors pr-4">{faq.q}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 text-slate-400 group-hover:text-accent"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t border-slate-100"
                >
                  <p className="p-4 sm:p-5 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed bg-slate-50/40">{faq.a}</p>
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
      className="py-14 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
        <ScrollReveal direction="left">
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
        </ScrollReveal>

        <ScrollReveal direction="right">
        <div className="glass p-8 rounded-[24px] border-white/5 relative overflow-hidden">
          {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </motion.div>
            <motion.h3
              className="text-[20px] font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ¡Mensaje Enviado!
            </motion.h3>
            <motion.p
              className="text-muted text-[14px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Nos pondremos en contacto contigo en menos de 24 horas.
            </motion.p>
            <motion.button
              onClick={() => setStatus("idle")}
              className="mt-8 text-accent text-[14px] font-bold hover:underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Enviar otro mensaje
            </motion.button>
          </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
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
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
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
                    <motion.button
                      key={obj}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, objective: obj })
                      }
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 px-3 rounded-[8px] text-[11px] font-bold border transition-all ${
                        formData.objective === obj
                          ? "bg-accent border-accent text-white shadow-[0_5px_15px_rgba(59,130,246,0.3)]"
                          : "bg-white/5 border-white/10 text-muted hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      {obj}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
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
                  className="w-full bg-white/5 border border-white/10 rounded-[12px] p-4 text-[14px] focus:outline-none focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all resize-none"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 30px rgba(59,130,246,0.3)" }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "sending"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full bg-accent text-white py-4 rounded-[12px] font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
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
        </ScrollReveal>
      </div>
    </section>
  );
};

const ProcessTimeline = () => (
  <section className="py-14 md:py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5 overflow-hidden">
    <div className="max-w-[1024px] mx-auto">
      <div className="text-center mb-10 md:mb-16">
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
            desc: "Analizamos tu negocio, definimos objetivos y trazamos la arquitectura de tu web o app.",
            icon: Target,
          },
          {
            step: "02",
            title: "Diseño UX/UI",
            desc: "Prototipamos la experiencia visual y los flujos interactivos para que apruebes antes de programar.",
            icon: Palette,
          },
          {
            step: "03",
            title: "Desarrollo con Código Propio",
            desc: "Arquitectura moderna en React/Vite. Integramos pasarelas de pago, bases de datos y APIs.",
            icon: Code2,
          },
          {
            step: "04",
            title: "Pruebas Técnicas & QA",
            desc: "Auditoría de rendimiento Lighthouse 100/100, SEO estructurado y compatibilidad multidispositivo.",
            icon: CheckCircle2,
          },
          {
            step: "05",
            title: "Lanzamiento Cloud",
            desc: "Desplegamos en infraestructura de alta disponibilidad con certificado SSL y dominio activo.",
            icon: Zap,
          },
          {
            step: "06",
            title: "Evolución & Soporte Continuo",
            desc: "Mantenimiento proactivo, iteraciones de contenido y soporte prioritario directo por WhatsApp.",
            icon: Headphones,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all group relative overflow-hidden flex sm:block items-start gap-4 sm:gap-0"
          >
            <span className="absolute top-3 right-4 text-[32px] sm:text-[40px] font-black text-slate-200/60 select-none">
              {item.step}
            </span>
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-accent/10 text-accent rounded-xl flex items-center justify-center sm:mb-4 shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">{item.title}</h4>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Guarantees = () => (
  <section className="py-14 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden">
    <ScrollReveal>
    <div className="text-center mb-10 md:mb-16">
      <span className="label-editorial mx-auto">Qué garantizamos</span>
      <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-4">
        Lo que <span className="text-accent">garantizamos</span> por escrito.
      </h2>
    </div>
    </ScrollReveal>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[
        {
          icon: ShieldCheck,
          title: "Garantía Cero Riesgo (15 Días)",
          desc: "Si en los primeros 15 días sientes que el diseño no cumple tus expectativas, te devolvemos el 100% de tu dinero. Sin letra chica.",
        },
        {
          icon: Building2,
          title: "Facturación Formal en Perú",
          desc: "Emitimos Factura, Boleta Electrónica y Recibo por Honorarios con RUC 15609816934. Empresa peruana formal.",
        },
        {
          icon: Shield,
          title: "Propiedad Total de tu Marca",
          desc: "Tu dominio (.pe / .com) y tu base de clientes están 100% a tu nombre. Eres el dueño absoluto de tu activo digital.",
        },
        {
          icon: Repeat,
          title: "Evolución Continua",
          desc: "Olvídate de pagar extra por cambios pequeños. Tu suscripción incluye actualizaciones y mejoras semanales.",
        },
        {
          icon: Code2,
          title: "Código Propio, No Plantillas",
          desc: "Desarrollo en React/Vite ultra veloz. Carga en < 1 segundo y está preparado para convertir tráfico en ventas.",
        },
        {
          icon: Headphones,
          title: "Soporte Directo por WhatsApp",
          desc: "Atención rápida y resolución técnica directa por WhatsApp sin tickets lentos ni intermediarios.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex sm:block items-start gap-4 sm:gap-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-accent/10 text-accent rounded-xl flex items-center justify-center sm:mb-4 shrink-0">
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-slate-900 mb-1.5">{item.title}</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Dual CTA */}
    <div className="mt-12 md:mt-16 text-center">
      <h3 className="text-[22px] md:text-[30px] font-black mb-3 text-slate-900">
        ¿Listo para transformar la presencia digital de tu negocio?
      </h3>
      <p className="text-slate-600 text-[14px] md:text-[15px] mb-8 max-w-md mx-auto">
        Escríbenos por WhatsApp y te asesoramos sin costo ni compromiso.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://wa.me/51904060670?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-7 py-3.5 rounded-xl font-bold text-[13px] shadow-sm flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          Hablar por WhatsApp
        </motion.a>
        <a
          href="https://wa.me/51904060670?text=Hola%2C%20tengo%20preguntas%20sobre%20los%20servicios%20de%20Chamba%20Digital."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold text-[13px] transition-colors text-center"
        >
          Tengo Preguntas
        </a>
      </div>
    </div>
  </section>
);


export const ChambaFooter = () => (
  <footer className="pt-10 pb-6 px-6 md:px-10 bg-slate-950 border-t border-slate-800">
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
        <div className="flex flex-col gap-3">
          <Logo textColor="text-white" />
          <p className="text-sm text-slate-400">Hacemos webs que venden. Desde Lima para el mundo.</p>
          <div className="flex gap-2">
            <a href="https://instagram.com/chamba.digital" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-slate-700 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://linkedin.com/company/chamba-digital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-slate-700 transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider mb-3 text-white">Explorar</h4>
          <ul className="space-y-2">
            {["Inicio", "Servicios", "Portafolio", "Metodología", "Hotelería Premium"].map((name) => (
              <li key={name}><Link to={name === "Inicio" ? "/" : "/" + name.toLowerCase().replace("í", "i").replace(" ", "-")} className="text-sm text-slate-400 hover:text-white transition-colors">{name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider mb-3 text-white">Contacto</h4>
          <div className="space-y-2 text-sm">
            <a href="https://wa.me/51904060670" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><MessageSquare className="w-4 h-4 text-green-500" /> WhatsApp</a>
            <div className="flex items-center gap-2 text-slate-400"><Mail className="w-4 h-4 shrink-0" /> hola@chamba.digital</div>
            <div className="flex items-center gap-2 text-slate-400"><MapPin className="w-4 h-4 shrink-0" /> Lima, Perú</div>
            <div className="mt-3 pt-3 border-t border-slate-800 space-y-1">
              <p className="text-[11px] text-slate-500">RUC: 15609816934 · Yosward Edgardy Ríos Casanova</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a href="https://wa.me/51904060670" target="_blank" rel="noopener noreferrer" className="w-full bg-accent text-white px-5 py-3 rounded-lg font-black text-sm text-center hover:bg-accent/90 transition-colors">Hablar con un Asesor <ArrowRight className="w-4 h-4 ml-1 inline" /></a>
          <p className="text-xs text-slate-500 text-center">Respuesta en <span className="font-bold text-white">menos de 1h</span></p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-white transition-colors">
          <Link to="/portafolio">Portafolio</Link>
          <Link to="/metodologia">Metodología</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/terminos">Términos</Link>
          <Link to="/privacidad">Privacidad</Link>
          <Link to="/propiedad-intelectual">Propiedad Intelectual</Link>
        </div>
      </div>
    </div>
  </footer>
);

const ChambaContent = ({ onOpenModal }: any) => (
  <div className="selection:bg-accent selection:text-white overflow-x-hidden w-full relative">
    <ChambaNavbar />
    <main className="pt-[70px] relative z-10">
      <ChambaHero />
      <SectionDivider />
      <PainPoints />
      <SectionDivider variant="line" />
      <Methodology />
      <SectionDivider />
      <Services onOpenModal={onOpenModal} title="Planes WaaS" label="Suscripción Mensual" />
      <SectionDivider variant="line" />
      <Portfolio />
      <SectionDivider />
      <Guarantees />
      <SectionDivider variant="dots" />
      <FAQ />
      <SectionDivider variant="line" />
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
      </main>
      <ChambaFooter />
    </div>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Track SPA pageviews in Meta Pixel on route change
function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("track", "PageView");
      } catch (e) {
        // Suppress if adblocker blocks fbevents.js
      }
    }
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MetaPixelTracker />
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const location = useLocation();
  const path = location.pathname;
  const isPortalRoute = path.startsWith("/admin") || path.startsWith("/dashboard") || path.startsWith("/login") || path.startsWith("/registro") || path.startsWith("/portal") || path.startsWith("/perfil");

  const openModal = (title: string, content: any) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: "", content: "" });
  };

  return (
    <>
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<ChambaContent onOpenModal={openModal} />} />
        <Route path="/portafolio" element={<PortfolioPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/terminos" element={<TermsPage />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/propiedad-intelectual" element={<IntellectualPropertyPage />} />
        <Route path="/ecommerce" element={<EcommerceLandingPage />} />
        <Route path="/hotels" element={<HotelsLandingPage />} />
        <Route
          path="/servicebusinesses"
          element={<ServiceBusinessesLandingPage />}
        />
        <Route path="/hospitality" element={<HospitalitySolutions />} />
        <Route path="/propuesta/:slug" element={<ProposalPage />} />
        <Route path="/admin" element={<SuperAdminDashboard />} />
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/login" element={<UserPortal />} />
        <Route path="/registro" element={<UserPortal />} />
        <Route path="/portal" element={<UserPortal />} />
        <Route path="/perfil" element={<UserPortal />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/sorteo" element={<RafflePage />} />
        <Route path="/raffle" element={<RafflePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isPortalRoute && (
        <>
          <Modal
            isOpen={modalData.isOpen && modalData.content !== "15min_consultation"}
            onClose={closeModal}
            title={modalData.title}
            content={modalData.content}
          />
          <FreeConsultationModal
            isOpen={modalData.isOpen && modalData.content === "15min_consultation"}
            onClose={closeModal}
            defaultTopic={modalData.title || "Auditoría Técnica y Plan WaaS (15 min)"}
          />
          <Suspense fallback={null}><Chatbot /></Suspense>
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/51904060670?text=Hola,%20vengo%20de%20la%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="fixed bottom-4 right-4 z-[150] w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.3)] border border-white/20 p-2.5"
          >
            <WhatsAppIcon className="w-full h-full text-white" />
          </motion.a>
        </>
      )}
      </Suspense>
    </>
  );
}
