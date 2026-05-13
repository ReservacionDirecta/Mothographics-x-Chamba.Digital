import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChambaNavbar, Logo, WhatsAppIcon } from "../App";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Target, Palette, Code2, Zap,
  Headphones, BarChart3, Shield, Clock, Repeat,
  ChevronDown, Briefcase, Rocket
} from "lucide-react";

const steps = [
  {
    step: "01", title: "Estrategia", icon: Target, duration: "Día 1-2",
    desc: "Análisis de negocio, competencia y definición de KPIs. Entrega de Wireframes.",
  },
  {
    step: "02", title: "Diseño UX/UI", icon: Palette, duration: "Día 3-5",
    desc: "Prototipo interactivo en Figma mobile-first. 1 ronda de ajustes incluida.",
  },
  {
    step: "03", title: "Desarrollo", icon: Code2, duration: "Día 6-14",
    desc: "Código propio (React/Vite). Integración de APIs, Tracking y CRM.",
  },
  {
    step: "04", title: "Revisión & QA", icon: CheckCircle2, duration: "Día 15-16",
    desc: "4 rondas de ajustes incluidas. Testing en múltiples dispositivos.",
  },
  {
    step: "05", title: "Lanzamiento", icon: Rocket, duration: "Día 17",
    desc: "Deploy en Cloud, SSL activo y configuración de dominio final.",
  },
];

const guarantees = [
  { icon: Clock, title: "Deadline Garantizado", desc: "Entrega en fecha o devolvemos el 20%." },
  { icon: Repeat, title: "4 Revisiones", desc: "Ajustes semanales vinculados a pagos." },
  { icon: Code2, title: "Cero Plantillas", desc: "Código limpio y ultra rápido." },
  { icon: Shield, title: "Transparencia", desc: "Sin costos ocultos ni sorpresas." },
];

export default function MethodologyPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[80px]">

        {/* Compact Hero */}
        <section className="py-16 md:py-24 px-6 text-center max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="label-editorial mx-auto">Método Chamba</span>
            <h1 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-tight mb-4">
              Ingeniería <span className="text-accent">Transparente</span>.
            </h1>
            <p className="text-muted text-[15px] md:text-[17px] max-w-[550px] mx-auto">
              Un proceso predecible y sin sorpresas. De la idea al lanzamiento en 17 días.
            </p>
          </motion.div>
        </section>

        {/* Compact Steps Grid */}
        <section className="pb-20 px-6 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6 rounded-[24px] border-white/5 hover:border-accent/20 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-accent/40 uppercase mb-1">{item.step}</span>
                <h3 className="text-[14px] font-black mb-2">{item.title}</h3>
                <p className="text-[12px] text-muted leading-relaxed line-clamp-3">{item.desc}</p>
                <span className="mt-4 text-[10px] font-bold bg-white/5 px-2 py-1 rounded-full text-muted/60">{item.duration}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Compact Payment Schedule */}
        <section className="py-16 px-6 max-w-[1000px] mx-auto bg-accent/[0.03] rounded-[40px] border border-accent/10">
          <div className="text-center mb-10">
            <h2 className="text-[24px] md:text-[32px] font-black tracking-tight mb-2">Cronograma de Pagos</h2>
            <p className="text-muted text-[14px]">Sincronizado con el avance semanal y revisiones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-[28px] border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-accent" />
                <h3 className="text-[16px] font-black">Proyectos ≥ $500</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px] border-b border-white/5 pb-2">
                  <span className="text-muted">Inicio (Reserva)</span>
                  <span className="font-black text-accent">40%</span>
                </div>
                <div className="flex justify-between text-[13px] border-b border-white/5 pb-2">
                  <span className="text-muted">4 Cuotas Semanales</span>
                  <span className="font-black text-accent">15% c/u</span>
                </div>
                <p className="text-[11px] text-muted italic mt-2">Los pagos se realizan previo a las sesiones de revisión.</p>
              </div>
            </div>

            <div className="glass p-6 rounded-[28px] border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-fg" />
                <h3 className="text-[16px] font-black">Proyectos &lt; $500</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px] border-b border-white/5 pb-2">
                  <span className="text-muted">Inicio</span>
                  <span className="font-black">60%</span>
                </div>
                <div className="flex justify-between text-[13px] border-b border-white/5 pb-2">
                  <span className="text-muted">Pre-Entrega</span>
                  <span className="font-black">40%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Guarantees */}
        <section className="py-20 px-6 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((g, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <g.icon className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-[13px] font-bold mb-1">{g.title}</h4>
                <p className="text-[11px] text-muted">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <Link to="/#servicios" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-2xl font-black text-[14px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
            Empezar Proyecto <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-muted uppercase tracking-widest">
            <Link to="/terminos" className="hover:text-accent transition-colors">Términos</Link>
            <Link to="/privacidad" className="hover:text-accent transition-colors">Privacidad</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
