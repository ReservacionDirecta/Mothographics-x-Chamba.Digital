/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import HotelsLandingPage from "./pages/LandingPage/Hotels.tsx";
import EcommerceLandingPage from "./pages/LandingPage/ECommerce.tsx";
import ServiceBusinessesLandingPage from "./pages/LandingPage/ServiceBusinesses.tsx";
import ProposalPage from "./pages/LandingPage/Proposal.tsx";
import { motion, AnimatePresence } from "motion/react";
import RafflePage from "./pages/RaffleLandingPage/RafflePage";
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
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Logo className="scale-150" />
    </motion.div>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 200 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-[2px] bg-accent mt-12 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    />
  </motion.div>
);

// --- Performance & Data Infrastructure (Phase 4) ---

const trackEvent = (eventName: string, params = {}) => {
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

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full mt-10 bg-accent text-white py-4 rounded-[12px] font-bold text-[15px] shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
            >
              Cerrar Detalle
            </motion.button>
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
      tag: "🚀 Ingeniería IA & Cloud Infrastructure",
      title: (
        <>
          Automatización, APIs y{" "}
          <span className="text-accent">Agentes Inteligentes</span>.
        </>
      ),
      sub: "Ecosistemas técnicos inquebrantables. Despliegues en VPS de alto rendimiento, integración nativa de modelos fundacionales (Gemini, ChatGPT, Claude) y flujos automatizados.",
    },
    B: {
      tag: "⚡ Laboratorio de Innovación Técnica",
      title: (
        <>
          Integración Cloud, VPS &{" "}
          <span className="text-accent">Modelos de IA</span>.
        </>
      ),
      sub: "Llevamos tu infraestructura al siguiente nivel. Automatización con Ollama, OpenClaw, Google Flow y generación dinámica de medios (Imagen/Video) con Inteligencia Artificial.",
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
      <span className="label-editorial mx-auto">Nuestro Arsenal Técnico</span>
      <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-8">
        Infraestructura <span className="text-accent">Sin Límites</span>.
      </h2>
      <p className="text-muted text-[17px] md:text-[19px] max-w-3xl mx-auto leading-relaxed">
        No usamos plantillas; construimos <strong className="text-fg">arquitecturas a medida</strong>. 
        Dominamos el despliegue en servidores privados (VPS), la orquestación de APIs complejas y la implementación de 
        los modelos de Inteligencia Artificial más potentes del mercado.
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
          <Terminal className="w-24 h-24" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-accent" />
          Cloud & API Integration
        </h3>
        <ul className="space-y-3">
          {[
            "Despliegues seguros en VPS Linux (Ubuntu/Debian).",
            "Orquestación con Docker, Nginx y PM2.",
            "Integraciones RESTful, GraphQL y Webhooks.",
            "Automatización avanzada con Google Flow (Workflows).",
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
          <Cpu className="w-24 h-24 text-accent" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Cpu className="w-5 h-5 text-accent" />
          Inteligencia Artificial (LLMs)
        </h3>
        <ul className="space-y-3">
          {[
            "Integración de Gemini, ChatGPT, Claude y OpenClaw.",
            "Despliegue local y seguro con Ollama.",
            "Generación dinámica de Imágenes y Videos con IA.",
            "Agentes autónomos para automatización de flujos.",
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
          title: "APIs Conectadas",
          desc: "Sincronización de datos en tiempo real.",
          icon: Globe,
        },
        {
          title: "Servidores VPS",
          desc: "Control total, seguridad y performance.",
          icon: Database,
        },
        {
          title: "Generación Media",
          desc: "Audio, Imagen y Video automatizado.",
          icon: MonitorPlay,
        },
        {
          title: "Agentes IA",
          desc: "Soporte y ventas 24/7 sin descanso.",
          icon: Bot,
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
  items,
  delay = 0,
  onOpenDetails,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.4)" }}
    className="glass p-6 rounded-[12px] flex flex-col h-full transition-colors group"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-[16px] font-bold flex items-center gap-2 group-hover:text-accent transition-colors">
        <Zap className="w-4 h-4 text-accent" />
        {title}
      </h3>
      <motion.button
        whileHover={{ scale: 1.1, color: "#3B82F6" }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenDetails}
        className="text-muted hover:text-accent transition-colors"
        title="Ver detalles"
      >
        <Info className="w-4 h-4" />
      </motion.button>
    </div>

    <ul className="space-y-4 flex-grow mb-6">
      {items.map((item: any, idx: number) => (
        <li key={idx} className="border-b border-white/5 pb-3 last:border-0">
          <div className="flex justify-between items-start gap-4 mb-1">
            <span className="text-[13px] font-medium text-fg">{item.name}</span>
            <span className="text-[14px] font-bold text-accent whitespace-nowrap">
              {item.price}
            </span>
          </div>
          {item.details && (
            <p className="text-[11px] text-muted leading-relaxed">
              {item.details}
            </p>
          )}
        </li>
      ))}
    </ul>

    <div className="mt-auto border-t border-white/5 pt-4 flex flex-col gap-4">
      <p className="text-[11px] text-muted italic">{description}</p>
      <motion.button
        whileHover={{ x: 5 }}
        onClick={onOpenDetails}
        className="text-[11px] font-bold text-accent uppercase tracking-wider flex items-center gap-2"
      >
        Saber más <ArrowRight className="w-3 h-3" />
      </motion.button>
    </div>
  </motion.div>
);

const Services = ({
  onOpenModal,
  title = "Nuestros Servicios",
  subtitle = "Infraestructura de alto impacto diseñada para optimizar tu CPA y maximizar ingresos.",
  label = "Ingeniería de Venta",
}: any) => (
  <section
    id="servicios"
    className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
  >
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">{label}</span>
      <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">
        {title}
      </h2>
      <p className="text-muted max-w-xl mx-auto text-[14px]">{subtitle}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <PricingCard
        title="Despliegue Cloud & Infraestructura"
        description="Servidores VPS seguros y orquestación de datos de alto rendimiento."
        delay={0.1}
        onOpenDetails={() =>
          onOpenModal("Cloud & VPS", {
            description:
              "Nos encargamos de toda la ingeniería base. Configuramos servidores VPS privados (Linux/Ubuntu), orquestamos tus aplicaciones con Docker y PM2, y gestionamos proxys inversos con Nginx para garantizar un uptime del 99.9%.",
            caseStudies: [
              "Migración a VPS: Reducción del 60% en costos de hosting tradicional.",
              "Infraestructura E-commerce: Carga ultra-rápida y soporte para picos de tráfico masivo.",
              "Seguridad: Implementación de firewalls, SSL automático y respaldos programados.",
            ],
            testimonials: [
              "Tener nuestro propio servidor configurado por expertos nos dio el control total que necesitábamos. - CTO",
              "La velocidad de respuesta de nuestras APIs mejoró drásticamente al pasar a un VPS dedicado. - Lead Developer",
            ],
          })
        }
        items={[
          {
            name: "Setup VPS (Linux/Ubuntu)",
            price: "Desde $200 USD",
            details:
              "Pago único. Configuración inicial, seguridad y optimización.",
          },
          {
            name: "Mantenimiento Cloud",
            price: "Desde $50 USD/mes",
            details: "Monitoreo, backups y actualizaciones.",
          },
        ]}
      />
      <PricingCard
        title="Integración de APIs & Datos"
        description="Conecta tus sistemas y automatiza flujos con Google Flow."
        delay={0.2}
        onOpenDetails={() =>
          onOpenModal("APIs & Google Flow", {
            description:
              "Construimos el puente entre tus herramientas. Desarrollamos integraciones RESTful y GraphQL, webhooks para comunicación en tiempo real, y utilizamos Google Workflows y Dialogflow para orquestar la lógica de tu negocio.",
            caseStudies: [
              "Sincronización ERP/CRM: Datos actualizados en milisegundos entre 3 plataformas.",
              "Google Dialogflow: Chatbot inteligente que consulta bases de datos privadas.",
              "Webhooks Personalizados: Notificaciones automáticas de pago integradas a Slack.",
            ],
            testimonials: [
              "Nuestros sistemas finalmente hablan el mismo idioma. La automatización nos ahorra horas. - Ops Manager",
              "La integración de las APIs fue impecable, sin pérdida de datos. - Data Analyst",
            ],
          })
        }
        items={[
          { name: "Desarrollo de API REST", price: "Desde $500 USD" },
          { name: "Google Flow / Dialogflow", price: "Desde $350 USD" },
          {
            name: "Webhooks e Integraciones",
            price: "Desde $250 USD",
          },
          { name: "Arquitectura Microservicios", price: "Personalizado" },
        ]}
      />
      <PricingCard
        title="Laboratorio de IA & Generación"
        description="LLMs (Gemini, Claude, Ollama) y Generación de Medios."
        delay={0.3}
        onOpenDetails={() =>
          onOpenModal("Modelos de IA & Medios", {
            description:
              "Implementamos inteligencia artificial de vanguardia. Desde modelos fundacionales (ChatGPT, Gemini, Claude, OpenClaw) hasta despliegues locales seguros con Ollama. Además, generamos imágenes, audio y video dinámico con IA para marketing y operaciones.",
            caseStudies: [
              "Generación de Video: Automatización de anuncios en video reduciendo costos de producción en un 80%.",
              "Agentes Autónomos (Ollama): Análisis de documentos internos sin comprometer la privacidad.",
              "Asistentes Claude/Gemini: Redacción y análisis de contratos legales en segundos.",
            ],
            testimonials: [
              "La capacidad de generar imágenes y videos con IA ha transformado nuestro marketing. - Director Creativo",
              "Tener Ollama corriendo en nuestro VPS nos da IA privada y segura. - CEO",
            ],
          })
        }
        items={[
          { name: "Agentes LLM (OpenAI/Claude)", price: "Desde $400 USD" },
          { name: "Deploy Ollama / Modelos Locales", price: "Desde $500 USD" },
          { name: "Generación Imagen/Video IA", price: "Desde $300 USD" },
        ]}
      />
      <PricingCard
        title="Ecosistema Todo Incluido"
        description="Automatización + Ads + SEO + Web en una solución integral."
        delay={0.4}
        onOpenDetails={() =>
          onOpenModal("Ecosistema Integral", {
            description:
              "El paquete definitivo para dominar tu mercado. Integramos nuestra arquitectura de tráfico (Ads), automatización con inteligencia artificial, optimización técnica (SEO) y despliegue web de alto rendimiento en un solo servicio unificado.",
            caseStudies: [
              "Escalabilidad Total: De 0 a facturación predecible en 90 días.",
              "Infraestructura Centralizada: Un solo proveedor para tecnología, tráfico y ventas.",
            ],
            testimonials: [
              "Delegar todo el ecosistema digital a un solo equipo fue la mejor decisión operativa del año. - CEO SaaS",
            ],
          })
        }
        items={[
          { name: "Plan Inicial (Fase 1)", price: "$650 USD" },
          { name: "Plan Growth (Fase 2)", price: "$1000 USD" },
          { name: "Plan Escala (Fase 3)", price: "$1500 USD" },
        ]}
      />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 p-8 glass rounded-[24px] border-accent/20 bg-accent/5 overflow-hidden relative group text-center"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      <h4 className="text-[20px] font-bold mb-4">
        ¿Listo para activar tu brazo tecnológico?
      </h4>
      <p className="text-muted text-[15px] mb-8 max-w-xl mx-auto">
        Integramos tus ideas creativas con nuestra ejecución técnica para
        dominar mercados digitales de alta competencia.
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#contacto"
        className="inline-block bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
      >
        Iniciar Colaboración Ahora
      </motion.a>
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
      focus: "Modernización de arquitectura para escalabilidad global y automatización de captación de leads legales.",
    },
    {
      emoji: "🤖",
      name: "Sistema Autónomo B2B",
      location: "Despliegue VPS (Linux/Ubuntu)",
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
      name: "E-Commerce AI Agent",
      location: "Arquitectura Cloud",
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
      label: "Legal Tech + APIs",
      thumb: "https://s.wordpress.com/mshots/v1/https://latamabogados.com?w=600",
    },
    {
      url: "penalindamancora.com",
      label: "Reserva Directa Hotelera",
      thumb: "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600",
    },
    {
      url: "www.dupla.work",
      label: "Headless E-Learning",
      thumb: "https://s.wordpress.com/mshots/v1/https://www.dupla.work?w=600",
    },
    {
      url: "kabsa.pe",
      label: "E-Commerce + Webhooks",
      thumb: "https://s.wordpress.com/mshots/v1/https://kabsa.pe?w=600",
    },
  ];

  return (
    <section
      id="portafolio"
      className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
    >
      <div className="text-center mb-16">
        <span className="label-editorial mx-auto">Experiencia Comprobada</span>
        <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-4">
          Nuestra <span className="text-accent">Trayectoria</span>.
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-[15px] md:text-[17px]">
          Desde la consolidación de la industria hotelera hasta la vanguardia en
          infraestructura de <strong className="text-fg">IA & Cloud</strong>.
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
    { name: "Servicios", path: "/#servicios" },
    { name: "Portafolio", path: "/#portafolio" },
    { name: "Metodología", path: "/#metodologia" },
    { name: "Sorteo", path: "/raffle" },
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
          href="#servicios"
          className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] w-full sm:w-auto shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] transition-all"
        >
          Impulsar mi Negocio
        </motion.a>
        <motion.a
          whileHover={{ x: 5 }}
          href="#portafolio"
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-fg hover:text-accent transition-colors py-3"
        >
          Ver Casos de Éxito
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
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
  </section>
);

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
          <div className="aspect-square glass rounded-[24px] border-accent/20 flex items-center justify-center p-12 overflow-hidden smooth-gpu">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <Zap className="w-32 h-32 text-accent animate-pulse" />
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
  <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
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
  <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
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

const ChambaContent = ({ onOpenModal }: any) => (
  <div className="selection:bg-accent selection:text-white">
    <ChambaNavbar />
    <main className="pt-[70px]">
      <ChambaHero />
      <PainPoints />
      <Methodology />
      <Services
        onOpenModal={onOpenModal}
        title="Ingeniería de Performance"
        label="Nuestros Servicios"
      />
      <Portfolio />
      <ProcessTimeline />
      <Guarantees />
      <FAQ />
      <ContactForm />
    </main>
    <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="text-[14px] text-muted leading-relaxed">
              Ingeniería Digital de alto nivel. Transformamos negocios con
              tecnología, datos y diseño de performance.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -3, color: "#3B82F6" }}
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: "#3B82F6" }}
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">
              Explorar
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Servicios", id: "servicios" },
                { name: "Portafolio", id: "portafolio" },
                { name: "Metodología", id: "metodologia" },
                { name: "FAQ", id: "faq" },
                { name: "Sorteo", id: "raffle", isRoute: true },
              ].map((item) => (
                <li key={item.id}>
                  {item.isRoute ? (
                    <Link
                      to={`/${item.id}`}
                      className="text-[14px] text-muted hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      className="text-[14px] text-muted hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-muted">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <p className="text-[13px] leading-relaxed">
                  Alameda del premio Real 736, La Encantada de Villa,
                  Chorrillos, Lima, Perú
                </p>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <p className="text-[13px]">hola@chamba.digital</p>
              </div>
            </div>
          </div>

          {/* CTA Column */}
          <div className="flex flex-col items-start gap-6">
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">
              ¿Listo para empezar?
            </h4>
            <motion.a
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/51904060670"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px] transition-all w-full text-center shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
            >
              Solicitar Auditoría
            </motion.a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} Chamba Digital. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[11px] text-muted hover:text-fg transition-colors uppercase tracking-widest"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-[11px] text-muted hover:text-fg transition-colors uppercase tracking-widest"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const AllianceContent = ({ onOpenModal }: any) => {
  useEffect(() => {
    console.log("AllianceContent mounted");
  }, []);

  return (
    <div className="selection:bg-accent selection:text-white">
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
      <Footer />
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
        <Route path="/ecommerce" element={<EcommerceLandingPage />} />
        <Route path="/hotels" element={<HotelsLandingPage />} />
        <Route
          path="/servicebusinesses"
          element={<ServiceBusinessesLandingPage />}
        />
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
