/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import HotelsLandingPage from './pages/LandingPage/Hotels.tsx';
import EcommerceLandingPage from './pages/LandingPage/ECommerce.tsx';
import ServiceBusinessesLandingPage from './pages/LandingPage/ServiceBusinesses.tsx';
import { motion, AnimatePresence } from "motion/react";
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
} from "lucide-react";

// --- Components for Conversion & Lead Flow (Phase 3) ---

const ExitIntentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the intent before redirecting
    trackEvent('lead_magnet_whatsapp_intent', { 
      email: formData.email,
      whatsapp: formData.whatsapp 
    });

    const message = encodeURIComponent(
      `¡Hola Chamba Digital! 👋 Acabo de ver el Checklist 2026. \n\n` +
      `Mis datos son:\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 WhatsApp: ${formData.whatsapp}\n\n` +
      `¿Me podrían enviar la guía y contarme más sobre sus sistemas de adquisición?`
    );

    // Opening WhatsApp in a new tab
    window.open(`https://wa.me/51904060670?text=${message}`, '_blank');
    setStatus("success");
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
                  Acceso <span className="text-accent underline decoration-accent/30 underline-offset-8">Exclusivo</span>
                </h3>
                <p className="text-muted text-[16px] mb-10 leading-relaxed px-4">
                  Recibe el <span className="text-fg font-bold">Checklist 2026</span> al instante vía WhatsApp y asegura tu ventaja competitiva.
                </p>
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4 text-left"
                >
                  <div className="space-y-1.5 px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted/60 ml-1">Email Corporativo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="juan@empresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-[18px] py-4 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted/60 ml-1">Número WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                      <input
                        required
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+51 900 000 000"
                        className="w-full bg-white/5 border border-white/10 rounded-[18px] py-4 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-white py-5 rounded-[20px] font-black text-[15px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all mt-6 uppercase tracking-widest"
                  >
                    Obtener Guía por WhatsApp
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                  </motion.button>
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
                <h3 className="text-[30px] font-black tracking-tighter mb-4 leading-none">¡Felicidades!</h3>
                <p className="text-muted text-[15px] mb-10 leading-relaxed">
                  Hemos generado tu enlace de acceso. Si el chat no se abrió automáticamente, usa el botón de abajo:
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href={`https://wa.me/51904060670?text=${encodeURIComponent(`Hola Chamba Digital! Solicito el Checklist 2026. Email: ${formData.email}`)}`}
                    target="_blank"
                    className="bg-accent text-white py-4 px-8 rounded-2xl font-black text-[14px] shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    Abrir WhatsApp <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="text-[12px] font-bold text-muted/60 py-2 hover:text-fg transition-colors"
                  >
                    Ya lo recibí, cerrar
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
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-[10px] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] shrink-0">
        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
      </div>
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
      tag: "🚀 Arquitectura de Crecimiento 2026",
      title: (
        <>
          No solo construimos Webs. Creamos <span className="text-accent">Sistemas de Adquisición</span> Masiva.
        </>
      ),
      sub: "Transformamos tu presencia digital en una máquina de ventas automatizada, diseñada con ingeniería de performance para maximizar tu retorno de inversión."
    },
    B: {
      tag: "⚡ Ingeniería de Conversión 10x",
      title: (
        <>
          Domina tu Mercado con <span className="text-accent">Ingeniería Técnica</span> de Elite.
        </>
      ),
      sub: "Implementamos la infraestructura que convierte tu marca en un motor de captación de clientes ininterrumpido y escalable."
    }
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
        <span className="label-editorial mx-auto">
          {headlines?.tag}
        </span>
        <h1 className="text-[40px] md:text-[72px] font-black max-w-[900px] leading-tight md:leading-[1.1] mb-6">
          {headlines?.title}
        </h1>
        <h2 className="text-[18px] md:text-[20px] text-muted font-normal leading-relaxed max-w-[600px] mb-10">
          {headlines?.sub}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a
            onClick={() => trackEvent('cta_click', { section: 'hero', variant: headlineVariant, label: 'Auditoría' })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#contacto"
            className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[16px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
          >
            Solicitar Auditoría de Conversión
          </motion.a>
          <motion.a
            onClick={() => trackEvent('cta_click', { section: 'hero', variant: headlineVariant, label: 'Ver Sistemas' })}
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
    id="oportunidad"
    className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto"
  >
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">La Sinergia Estratégica</span>
      <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-8">
        Tu Agencia, <span className="text-accent">Sin Límites Técnicos</span>.
      </h2>
      <p className="text-muted text-[17px] md:text-[19px] max-w-3xl mx-auto leading-relaxed">
        Guido, Mothographics es el corazón creativo en{" "}
        <strong className="text-fg underline decoration-accent/30 underline-offset-4">México</strong>. Chamba Digital es tu{" "}
        <strong className="text-fg">brazo de ingeniería de élite</strong>{" "}
        desde Perú. Juntos, entregamos soluciones que no solo se ven increíbles, sino que funcionan con una precisión militar.
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
          <Palette className="w-24 h-24" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Palette className="w-5 h-5 text-accent" />
          El Arte (Mothographics)
        </h3>
        <ul className="space-y-3">
          {[
            "Storytelling visual de alto impacto.",
            "Branding que trasciende industrias.",
            "Excelencia estética y emocional.",
            "25 años de autoridad creativa.",
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
          <Zap className="w-24 h-24 text-accent" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Zap className="w-5 h-5 text-accent" />
          La Ciencia (Chamba Digital)
        </h3>
        <ul className="space-y-3">
          {[
            "Sistemas de tráfico y Meta Ads.",
            "Webs de alta conversión (UX/UI).",
            "Automatización con Agentes IA.",
            "Escalabilidad técnica y datos.",
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
          title: "Agencia 360",
          desc: "Posicionamiento Full-Stack inmediato.",
          icon: Globe,
        },
        {
          title: "Nuevos Ingresos",
          desc: "Venta de Web y Sistemas IA.",
          icon: TrendingUp,
        },
        {
          title: "Cero Fricción",
          desc: "Nosotros manejamos la técnica.",
          icon: CheckCircle2,
        },
        {
          title: "Datos Reales",
          desc: "Reportes de ROI para tus clientes.",
          icon: MessageSquare,
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

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PricingCard
        title="Adquisición Masiva (Meta Ads)"
        description="Escala tu facturación con tráfico hiper-optimizado y tracking avanzado."
        delay={0.1}
        onOpenDetails={() =>
          onOpenModal("Meta Ads: Motor de Tráfico", {
            description:
              "Nuestro sistema de Meta Ads no se limita a 'poner anuncios'. Realizamos un estudio profundo de audiencias, instalamos la API de conversiones para saltar las limitaciones de iOS, y creamos embudos de retargeting que persiguen a los interesados hasta que compran.",
            caseStudies: [
              "Galería de Arte: Incremento del 300% en leads calificados en 30 días.",
              "E-commerce de Moda: ROAS (Retorno de Inversión Publicitaria) de 4.5x constante.",
              "Sector Inmobiliario: Reducción del 40% en el costo por lead mediante segmentación avanzada.",
            ],
            testimonials: [
              "Chamba Digital transformó nuestra inversión en un activo real. Pasamos de gastar dinero a generar ventas predecibles. - Cliente Sector Retail",
              "La precisión técnica con la que manejan las audiencias es algo que no habíamos visto en otras agencias. - Director de Marketing",
            ],
          })
        }
        items={[
          {
            name: "Setup Inicial",
            price: "$150 USD",
            details:
              "Pago único. Incluye configuración de Business Manager, Pixel, eventos, públicos y campañas.",
          },
          {
            name: "Gestión Mensual",
            price: "Desde $150 USD/mes",
            details: "Optimización y escalado continuo.",
          },
        ]}
      />
      <PricingCard
        title="Arquitectura Web & Verticales"
        description="Ecosistemas digitales de alta velocidad para conversión y hospitalidad."
        delay={0.2}
        onOpenDetails={() =>
          onOpenModal("Desarrollo Web & Tech", {
            description:
              "Somos tu brazo de desarrollo. Construimos desde webs corporativas de alto impacto hasta sistemas especializados para hoteles. Nos encargamos de toda la complejidad técnica (hosting, seguridad, integraciones API) para que tú te enfoques en la estrategia creativa.",
            caseStudies: [
              "Hotel Boutique: Recuperación del 25% de reservas directas eliminando comisiones de OTAs.",
              "Plataforma E-learning: Escalado de 0 a 5,000 alumnos con infraestructura serverless.",
              "Inmobiliaria: Sistema de gestión de inventario en tiempo real con sincronización automática.",
            ],
            testimonials: [
              "La integración del motor de reservas fue un antes y un después para nuestra rentabilidad. - Gerente de Operaciones Hoteleras",
              "Entienden el negocio, no solo el código. Eso es lo que los hace diferentes. - CEO Startup Tech",
            ],
          })
        }
        items={[
          { name: "Web Corporativa / Landing", price: "Desde $450 USD" },
          { name: "Motor de Reservas Directas", price: "Desde $650 USD" },
          {
            name: "Integración PMS / Channel Manager",
            price: "Desde $800 USD",
          },
          { name: "E-commerce / Web App a medida", price: "Personalizado" },
        ]}
      />
      <PricingCard
        title="Optimización de Operaciones"
        description="Automatización con IA para ventas y atención al cliente 24/7."
        delay={0.3}
        onOpenDetails={() =>
          onOpenModal("Automatización con IA", {
            description:
              "Liberamos a tu equipo de tareas repetitivas. Implementamos agentes de IA que atienden clientes 24/7, califican leads en tiempo real y agendan citas automáticamente en tu calendario.",
            caseStudies: [
              "Agencia de Viajes: Automatización del 80% de consultas frecuentes vía WhatsApp.",
              "Clínica Dental: Reducción del 50% en inasistencias mediante recordatorios inteligentes.",
              "SaaS B2B: Calificación automática de leads que incrementó la eficiencia del equipo de ventas en un 30%.",
            ],
            testimonials: [
              "El agente de IA atiende mejor que muchos humanos. Es impresionante la precisión. - Dueño de Negocio Local",
              "Ahorramos más de 20 horas semanales en tareas administrativas gracias a sus automatizaciones. - Director Operativo",
            ],
          })
        }
        items={[
          { name: "Chatbots de Ventas con IA", price: "Desde $300 USD" },
          { name: "Integraciones a medida", price: "Desde $400 USD" },
          { name: "Plataformas E-learning", price: "Desde $600 USD" },
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
      <h4 className="text-[20px] font-bold mb-4">¿Listo para activar tu brazo tecnológico?</h4>
      <p className="text-muted text-[15px] mb-8 max-w-xl mx-auto">
        Integramos tus ideas creativas con nuestra ejecución técnica para dominar mercados digitales de alta competencia.
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

  const clients = [
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
        "+10 años consolidando resultados."
      ],
      focus: "Operación integral: marketing + ventas + tecnología + automatización."
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
        "Automatización de atención y conversión."
      ],
      focus: "Transformación de alojamiento en producto turístico premium escalable."
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
        "Construcción de presencia digital desde cero."
      ],
      focus: "Implementación total desde cero: infraestructura digital + canales de venta."
    },
    {
      emoji: "🌴",
      name: "Hacienda Don Vicente",
      location: "Tarapoto – Perú",
      tasks: [
        "Creación de copys estratégicos para redes sociales.",
        "Desarrollo de promociones estacionales.",
        "Diseño de ofertas con valor agregado.",
        "Optimización de mensajes de venta y conversión."
      ],
      focus: "Incremento de reservas mediante comunicación efectiva y ofertas atractivas."
    },
    {
      emoji: "🏔️",
      name: "Sauce Hotel Boutique",
      location: "Ollantaytambo – Perú",
      tasks: [
        "Implementación y optimización del PMS.",
        "Configuración de tarifas, disponibilidad y restricciones.",
        "Sincronización con OTAs.",
        "Mejora continua de la operación de reservas."
      ],
      focus: "Optimización operativa para lograr eficiencia y control en la gestión."
    },
    {
      emoji: "🏡",
      name: "Casa QX | Hotel Boutique",
      location: "Pachacamac – Perú",
      tasks: [
        "Desarrollo de concepto de marca boutique.",
        "Creación de comunicación aspiracional y premium.",
        "Estrategia de posicionamiento digital.",
        "Apoyo en narrativa de marca."
      ],
      focus: "Construcción de una marca enfocada en exclusividad y diseño."
    }
  ];

  const webs = [
    {
      url: "www.dupla.work",
      label: "Dupla Work",
      thumb: "https://s.wordpress.com/mshots/v1/https://www.dupla.work?w=600",
    },
    {
      url: "kabsa.pe",
      label: "Kabsa",
      thumb: "https://s.wordpress.com/mshots/v1/https://kabsa.pe?w=600",
    },
    {
      url: "olivosdelperu.com",
      label: "Olivos del Perú",
      thumb:
        "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600",
    },
    {
      url: "clasedesurf.com",
      label: "Clase de Surf",
      thumb: "https://s.wordpress.com/mshots/v1/https://clasedesurf.com?w=600",
    },
    {
      url: "jahsurfperu.com",
      label: "Jah Surf Perú",
      thumb: "https://s.wordpress.com/mshots/v1/https://jahsurfperu.com?w=600",
    },
    {
      url: "penalindamancora.com",
      label: "Peña Linda",
      thumb:
        "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600",
    },
    {
      url: "puntanegritos.com",
      label: "Punta Negritos",
      thumb:
        "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600",
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
          Resultados <span className="text-accent">Reales</span>.
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-[15px] md:text-[17px]">
          No solo entregamos pixeles. Entregamos <strong className="text-fg italic">rentabilidad</strong> mediante sistemas complejos de reserva, e-commerce de alto tráfico y automatización avanzada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.2fr] gap-12 items-start">
        {/* Hoteles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-[18px] font-bold flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-accent" />
            Sector Hotelero
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {clients.map((client, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5, borderColor: "rgba(59, 130, 246, 0.4)" }}
                onClick={() => setSelectedHotel(client)}
                className="p-4 glass rounded-[10px] border-white/5 flex flex-col gap-1 cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-bold text-fg group-hover:text-accent transition-colors">
                    {client.name}
                  </span>
                  <Info className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <span className="text-[11px] text-muted uppercase tracking-wider">
                  {client.location}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-full bg-white/5" />

        {/* Webs & AI */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[18px] font-bold flex items-center gap-2 mb-6">
              <ExternalLink className="w-5 h-5 text-accent" />
              Desarrollo Web
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {webs.map((web, i) => (
                <motion.a
                  key={i}
                  href={`https://${web.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group flex flex-col glass rounded-[12px] border-white/5 overflow-hidden transition-all hover:border-accent/30"
                >
                  <div className="aspect-video w-full overflow-hidden bg-white/5 relative">
                    <img
                      src={web.thumb}
                      alt={web.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-3 text-center border-t border-white/5">
                    <span className="text-[11px] font-bold text-muted group-hover:text-accent transition-colors uppercase tracking-wider">
                      {web.label}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 glass rounded-[12px] border-accent/20 bg-accent/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-[18px] font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-accent" />
              Proyecto Personal IA
            </h3>
            <p className="text-[13px] text-muted mb-6 leading-relaxed">
              Desarrollo de agentes inteligentes especializados en el sector
              hospitalidad.
            </p>
            <motion.a
              href="https://hothelia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link block relative aspect-video w-full rounded-[8px] overflow-hidden border border-white/5 mb-4"
            >
              <img
                src="https://s.wordpress.com/mshots/v1/https://hothelia.com?w=600"
                alt="Hothelia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover/link:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover/link:bg-transparent transition-colors flex items-center justify-center">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover/link:opacity-100 transition-opacity flex items-center gap-2">
                  <span className="text-[12px] font-bold text-white">
                    Visitar hothelia.com
                  </span>
                  <ArrowRight className="w-3 h-3 text-accent" />
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Global Conclusion Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 glass rounded-[24px] border-white/5 bg-white/[0.01]"
        >
          <h4 className="text-[18px] font-black mb-6 flex items-center gap-3">
            <span className="text-xl">📊</span> Resumen Estratégico
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-[13px] font-black text-accent uppercase tracking-tighter">1. Implementación</p>
              <p className="text-[12px] text-muted italic">Punta Negritos → Infraestructura digital + canales de venta</p>
            </div>
            <div className="space-y-2">
              <p className="text-[13px] font-black text-accent uppercase tracking-tighter">2. Operación Integral</p>
              <p className="text-[12px] text-muted italic">Peña Linda → Marketing + ventas + gestión completa</p>
            </div>
            <div className="space-y-2">
              <p className="text-[13px] font-black text-accent uppercase tracking-tighter">3. Optimización</p>
              <p className="text-[12px] text-muted italic">Sauce, Casa QX, etc. → Estrategia y rentabilidad</p>
            </div>
          </div>
        </motion.div>
      </div>

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
                  <h3 className="text-[24px] font-black tracking-tighter leading-none mb-1">{selectedHotel.name}</h3>
                  <p className="text-[14px] text-accent font-bold uppercase tracking-widest">{selectedHotel.location}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[1px] flex-grow bg-white/5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Implementación Estratégica</span>
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
                  <span className="text-[10px] font-black uppercase text-accent tracking-[0.4em] block mb-2">🔑 Enfoque Estratégico</span>
                  <p className="text-[14px] font-bold italic leading-tight text-fg">{selectedHotel.focus}</p>
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
    { name: "E-commerce", path: "/ecommerce" },
    { name: "Hoteles", path: "/hotels" },
    { name: "Servicios B2B", path: "/servicebusinesses" },
    { name: "Metodología", path: "/#metodologia" },
    { name: "Alianza", path: "/mothographicsxchambadigital" },
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
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-[30px] flex flex-col p-8 pt-24 lg:hidden h-[100dvh] w-screen overflow-y-auto"
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
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-4">Menú de Navegación</span>
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
                <span className="text-[13px] text-muted italic">¿Listo para escalar tus operaciones?</span>
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
                title: "Auditoría & Estrategia",
                desc: "Analizamos tus datos actuales para encontrar las fugas de dinero.",
              },
              {
                step: "02",
                title: "Implementación Técnica",
                desc: "Construimos la infraestructura (Web, Ads, IA) optimizada para conversión.",
              },
              {
                step: "03",
                title: "Escalado Basado en Datos",
                desc: "No adivinamos. Optimizamos cada dólar invertido según el ROI real.",
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
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(30px)'
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
      trackEvent('lead_form_success', { 
        objective: formData.objective,
        email: formData.email 
      });
      setFormData({ name: "", email: "", objective: "Escalar Ventas", message: "" });
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
                className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 hover:bg-accent/20 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-accent" />
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
                      onClick={() => setFormData({ ...formData, objective: obj })}
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
                {
                  name: "Alianza Mothographics",
                  id: "mothographicsxchambadigital",
                  isRoute: true,
                },
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

  const openModal = (title: string, content: any) => { // Changed type to 'any' to match usage in the component structure
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: "", content: "" }); // Resetting state on close for clean slate
  };

  return (
    <BrowserRouter>
      <AnimatePresence> {/* Removed 'mode="wait"' as it might conflict with other lifecycle hooks */}
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
        <Route path="/servicebusinesses" element={<ServiceBusinessesLandingPage />} />
        <Route
          path="/alianza"
          element={<AllianceContent onOpenModal={openModal} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
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
    </BrowserRouter>
  );
}
