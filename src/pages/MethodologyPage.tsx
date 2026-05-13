import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChambaNavbar, Logo, WhatsAppIcon } from "../App";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Target, Palette, Code2, Zap,
  Headphones, BarChart3, Shield, Clock, Repeat, MessageCircle,
  FileSearch, Rocket, Users, Instagram, Linkedin,
  ChevronDown,
} from "lucide-react";

const steps = [
  {
    step: "01", title: "Briefing & Estrategia", icon: Target,
    duration: "Día 1-2",
    desc: "Analizamos tu negocio a fondo: modelo, competencia, audiencia y objetivos. Definimos un plan de acción con entregables claros y deadlines reales.",
    details: [
      "Reunión de kickoff por videollamada (45 min).",
      "Análisis competitivo de tu nicho.",
      "Definición de KPIs y métricas de éxito.",
      "Entrega de documento de Estrategia + Wireframes.",
    ],
  },
  {
    step: "02", title: "Diseño UX/UI", icon: Palette,
    duration: "Día 3-5",
    desc: "Prototipamos la experiencia visual completa. Diseño mobile-first con sistema Liquid Glass para que apruebes antes de tocar una línea de código.",
    details: [
      "Moodboard de diseño y paleta de colores.",
      "Prototipo interactivo en Figma.",
      "Diseño responsive: mobile, tablet y desktop.",
      "1 ronda de ajustes de diseño incluida.",
    ],
  },
  {
    step: "03", title: "Desarrollo & Integración", icon: Code2,
    duration: "Día 6-14",
    desc: "Código propio, sin plantillas. Integramos pasarelas de pago, PMS, Pixel de Meta, Google Analytics y tu CRM. Todo optimizado para velocidad.",
    details: [
      "Stack: React/Vite + Node.js + Cloud AWS.",
      "Integración de APIs externas y webhooks.",
      "Implementación de tracking (Pixel, GA4, GTM).",
      "Optimización de imágenes y Core Web Vitals.",
    ],
  },
  {
    step: "04", title: "Revisión & QA", icon: CheckCircle2,
    duration: "Día 15-16",
    desc: "Dos rondas de ajustes incluidas. Verificamos en múltiples dispositivos y navegadores. Nada sale a producción sin tu aprobación.",
    details: [
      "Testing en Chrome, Safari, Firefox y Edge.",
      "Verificación en móvil real (iOS + Android).",
      "Test de velocidad con Lighthouse (+90 score).",
      "Corrección de bugs y ajustes finales.",
    ],
  },
  {
    step: "05", title: "Lanzamiento", icon: Rocket,
    duration: "Día 17",
    desc: "Desplegamos en producción con dominio configurado, SSL activo, SEO técnico y campañas encendidas. Tu proyecto sale al mundo.",
    details: [
      "Deploy en servidor cloud con CDN global.",
      "Configuración de dominio y certificado SSL.",
      "Indexación en Google Search Console.",
      "Activación de campañas de tráfico.",
    ],
  },
  {
    step: "06", title: "Soporte 30 Días", icon: Headphones,
    duration: "Día 18-48",
    desc: "Cualquier ajuste técnico post-lanzamiento se resuelve sin costo adicional. Monitoreamos rendimiento y optimizamos en base a datos reales.",
    details: [
      "Soporte técnico vía WhatsApp directo.",
      "Monitoreo de uptime y performance.",
      "Ajustes menores sin costo adicional.",
      "Reporte mensual de métricas clave.",
    ],
  },
];

const guarantees = [
  {
    icon: Clock, title: "Entrega en plazo o devolvemos",
    desc: "Si no cumplimos el deadline acordado, devolvemos el 20% del pago final. Sin letras chicas.",
  },
  {
    icon: Repeat, title: "2 rondas de revisiones",
    desc: "Tienes dos oportunidades formales para solicitar cambios sin costo adicional.",
  },
  {
    icon: Code2, title: "Código propio, no plantillas",
    desc: "Tu proyecto se desarrolla a mano. Carga más rápido, rankea mejor y no depende de suscripciones.",
  },
  {
    icon: Shield, title: "Transparencia total",
    desc: "Sabes exactamente qué incluye y qué NO incluye. Sin costos ocultos ni sorpresas.",
  },
  {
    icon: Headphones, title: "Soporte post-lanzamiento",
    desc: "30 días de soporte técnico incluido después de la entrega para resolver cualquier detalle.",
  },
  {
    icon: BarChart3, title: "Resultados medibles",
    desc: "Analytics, Pixel y tracking configurados. Cada centavo invertido se mide desde el día 1.",
  },
];

export default function MethodologyPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[70px]">

        {/* Hero */}
        <section className="relative py-24 md:py-32 px-6 md:px-10 text-center max-w-[1024px] mx-auto overflow-hidden">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-radial-[circle,rgba(59,130,246,0.08)_0%,transparent_70%] blur-[60px] -z-10" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="label-editorial mx-auto">Nuestro Método</span>
            <h1 className="text-[36px] md:text-[72px] font-black tracking-tighter leading-[0.95] mb-6">
              No vendemos humo, vendemos{" "}
              <span className="text-accent">Ingeniería</span>.
            </h1>
            <p className="text-muted text-[16px] md:text-[19px] max-w-[650px] mx-auto leading-relaxed">
              Un proceso <strong className="text-fg">transparente y predecible</strong>. Siempre sabes en qué
              etapa estamos, qué se entregó y qué falta. Sin sorpresas.
            </p>
          </motion.div>

          {/* Timeline summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-12 inline-flex items-center gap-3 bg-accent/10 text-accent px-6 py-3 rounded-full border border-accent/20"
          >
            <Clock className="w-4 h-4" />
            <span className="text-[13px] font-bold">De la idea al lanzamiento en <strong>2-3 semanas</strong></span>
          </motion.div>
        </section>

        {/* Interactive Process Steps */}
        <section className="py-20 px-6 md:px-10 max-w-[900px] mx-auto">
          <div className="space-y-4">
            {steps.map((item, i) => {
              const isOpen = expandedStep === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass rounded-[20px] overflow-hidden transition-all duration-500 ${
                    isOpen ? "border-accent/30 shadow-[0_10px_40px_rgba(59,130,246,0.08)]" : "border-white/5"
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedStep(isOpen ? null : i)}
                    className="w-full p-6 md:p-8 flex items-center gap-5 text-left hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-accent text-white" : "bg-accent/10 text-accent group-hover:bg-accent/20"
                    }`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[11px] font-black text-accent/40 uppercase tracking-widest">{item.step}</span>
                        <span className="text-[10px] font-bold text-muted bg-white/5 px-2.5 py-0.5 rounded-full">{item.duration}</span>
                      </div>
                      <h3 className={`text-[18px] font-black tracking-tight transition-colors ${isOpen ? "text-accent" : "text-fg"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`} />
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0">
                          <div className="pl-[76px]">
                            <p className="text-[14px] text-muted leading-relaxed mb-6">{item.desc}</p>
                            <div className="bg-white/[0.02] rounded-[16px] p-5 border border-white/5">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent block mb-4">Entregables</span>
                              <ul className="space-y-3">
                                {item.details.map((d, j) => (
                                  <motion.li
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.08 }}
                                    className="flex items-start gap-3 text-[13px] text-fg/80"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                                    {d}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-14">
              <span className="label-editorial mx-auto">Línea del Tiempo</span>
              <h2 className="text-[28px] md:text-[40px] font-black tracking-tight">
                Tu proyecto en <span className="text-accent">17 días</span>
              </h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2" />
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center relative"
                  >
                    <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-3 border-2 border-accent/20 relative z-10">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-[12px] font-bold text-fg mb-1">{s.title}</p>
                    <p className="text-[10px] text-accent font-bold">{s.duration}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
          <div className="text-center mb-14">
            <span className="label-editorial mx-auto">Compromisos Reales</span>
            <h2 className="text-[28px] md:text-[48px] font-black tracking-tight mb-4">
              Garantías que <span className="text-accent">respaldan</span> nuestra palabra.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-[20px] p-6 border-white/5 hover:border-accent/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <g.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-[15px] font-bold mb-2">{g.title}</h4>
                <p className="text-[13px] text-muted leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 md:px-10 max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">Preguntas Frecuentes</h2>
          </div>
          <FAQSection />
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-10 text-center max-w-[800px] mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-black tracking-tight mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted text-[15px] mb-10">
            Hablemos sobre tu proyecto. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="https://wa.me/51904060670?text=Hola%2C%20quiero%20iniciar%20un%20proyecto%20con%20Chamba%20Digital."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white px-10 py-5 rounded-[14px] font-black text-[15px] shadow-[0_15px_40px_rgba(255,107,53,0.3)] flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-5 h-5" /> Empezar Proyecto
            </motion.a>
            <Link to="/#servicios"
              className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-accent/30 text-fg px-10 py-5 rounded-[14px] font-bold text-[15px] transition-colors text-center">
              Ver Planes
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          <p className="text-[12px] text-muted">© {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" className="text-muted hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://linkedin.com" target="_blank" className="text-muted hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "¿En cuánto tiempo veré resultados?", a: "Las campañas de Meta Ads pueden generar leads en las primeras 48-72 horas. Proyectos web y de IA suelen tomar entre 2 a 4 semanas según complejidad." },
    { q: "¿Trabajan con clientes fuera de Perú?", a: "Sí, operamos de forma remota para clientes en México, España, Estados Unidos y toda Latinoamérica." },
    { q: "¿Necesito una inversión mínima en publicidad?", a: "Recomendamos iniciar con al menos $10-$15 USD diarios para que el algoritmo de Meta tenga datos suficientes para optimizar." },
    { q: "¿Qué pasa si no me gusta el diseño?", a: "Incluimos 2 rondas de revisiones en todos nuestros planes. El diseño se aprueba en mockup antes de desarrollar." },
    { q: "¿Puedo ver avances del proyecto?", a: "Sí, compartimos acceso a un entorno de staging donde puedes ver el progreso en tiempo real." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="glass rounded-[12px] border-white/5 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-5 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-[14px] font-bold">{faq.q}</span>
            <ArrowRight className={`w-4 h-4 text-accent transition-transform ${openIndex === i ? "rotate-90" : ""}`} />
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
  );
}
