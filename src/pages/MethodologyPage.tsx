import { motion } from "motion/react";
import { ChambaNavbar, Logo, WhatsAppIcon, ChambaFooter } from "../App";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Target, Palette, Code2, Zap,
  Clock, Repeat, Briefcase, Rocket, ShieldCheck, TrendingUp,
  Sparkles, MousePointer2
} from "lucide-react";

const steps = [
  {
    step: "01", title: "Estrategia de Ventas", icon: Target,
    desc: "Wireframes orientados a conversión.",
    accent: "bg-blue-500/10 text-blue-500"
  },
  {
    step: "02", title: "Diseño Liquid Glass", icon: Palette,
    desc: "Prototipos premium aprobados por ti.",
    accent: "bg-purple-500/10 text-purple-500"
  },
  {
    step: "03", title: "Ingeniería de Performance", icon: Code2,
    desc: "Código rápido, sin plantillas. Integrado a ventas.",
    accent: "bg-orange-500/10 text-orange-500"
  },
  {
    step: "04", title: "Optimización Crítica", icon: CheckCircle2,
    desc: "Ajustes semanales hasta la perfección.",
    accent: "bg-green-500/10 text-green-500"
  },
  {
    step: "05", title: "Escala & Lanzamiento", icon: Rocket,
    desc: "Deploy escalable para cerrar ventas 24/7.",
    accent: "bg-red-500/10 text-red-500"
  },
];

export default function MethodologyPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[70px]">

        {/* High-Conversion Hero */}
        <section className="relative py-20 md:py-28 px-6 text-center max-w-[1000px] mx-auto overflow-hidden">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-[circle,rgba(255,107,53,0.1)_0%,transparent_70%] blur-[80px] -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black uppercase tracking-widest">Sistema de Alto Rendimiento</span>
            </div>
            <h1 className="text-[40px] md:text-[72px] font-black tracking-tighter leading-[0.9] mb-6">
              Tu visión, construida con <span className="text-accent">Ingeniería de Élite</span>.
            </h1>
            <p className="text-muted text-[17px] md:text-[20px] max-w-[650px] mx-auto leading-relaxed mb-10">
              Transformamos ideas complejas en <strong className="text-fg">máquinas de conversión</strong> en tiempo récord. Enfócate en vender.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670?text=Hola!%20Vi%20vuestra%20metodología%20y%20quiero%20empezar."
                className="w-full sm:w-auto bg-gradient-to-r from-cta to-cta-hover text-white px-6 py-3.5 rounded-xl font-black text-[13px] shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-5 h-5" /> Iniciar Proyecto
              </motion.a>
              <div className="flex items-center gap-2 text-muted text-[12px] font-bold">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Garantía de Satisfacción Total
              </div>
            </div>
          </motion.div>
        </section>

        {/* Dynamic Process Grid */}
        <section className="py-20 px-6 max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[40px] font-black tracking-tight mb-4">El camino al <span className="text-accent">éxito digital</span></h2>
            <p className="text-muted text-[15px]">Pasos claros, entregas rápidas, resultados medibles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="glass p-8 rounded-[32px] border-white/5 hover:border-accent/30 transition-all duration-500 h-full flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${item.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-black opacity-30 mb-2">{item.step}</span>
                  <h3 className="text-[16px] font-black mb-4 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-[13px] text-muted leading-relaxed">{item.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Persuasive Payment Section */}
        <section className="py-24 px-6 bg-accent/[0.02] border-y border-white/5 relative overflow-hidden">
          <div className="max-w-[1000px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[32px] md:text-[48px] font-black tracking-tighter leading-none mb-6">
                  Financiamiento <br />
                  <span className="text-accent">A Tu Medida</span>.
                </h2>
                <p className="text-muted text-[16px] leading-relaxed mb-8">
                  Cronograma de pagos diseñado para proteger tu inversión. <strong className="text-fg">Pagas por resultados entregados.</strong>
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[14px] font-bold">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Flujo de caja optimizado
                  </div>
                  <div className="flex items-center gap-3 text-[14px] font-bold">
                    <Lock className="w-5 h-5 text-accent" />
                    Propiedad total del código al finalizar
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* ≥ $500 */}
                <div className="glass p-8 rounded-[32px] border-accent/20 bg-accent/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Recomendado</div>
                  <div className="flex items-center gap-4 mb-6">
                    <Briefcase className="w-6 h-6 text-accent" />
                    <h3 className="text-[18px] font-black">Proyectos Business / IA</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                      <span className="text-[13px] font-bold">Reserva & Inicio</span>
                      <span className="text-[20px] font-black text-accent">40%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-dashed border-white/10">
                      <span className="text-[13px] font-bold text-muted">4 Pagos Semanales</span>
                      <span className="text-[18px] font-black">15% c/u</span>
                    </div>
                  </div>
                </div>

                {/* < $500 */}
                <div className="glass p-6 rounded-[28px] border-white/10 opacity-70">
                  <div className="flex items-center gap-4 mb-4">
                    <Zap className="w-5 h-5 text-fg" />
                    <h3 className="text-[15px] font-black">Servicios Express</h3>
                  </div>
                  <div className="flex justify-between text-[13px] mb-2 px-2">
                    <span className="text-muted">Inicio Directo</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="flex justify-between text-[13px] px-2">
                    <span className="text-muted">Entrega Final</span>
                    <span className="font-bold">40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-28 px-6 text-center max-w-[800px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-black tracking-tight mb-6">
            ¿Listo para construir el futuro de tu negocio?
          </h2>
          <p className="text-muted text-[17px] mb-12">
            No pierdas más tiempo con soluciones mediocres. Implementemos ingeniería que de verdad funciona.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="https://wa.me/51904060670?text=Hola!%20Quiero%20una%20reunión%20estratégica."
              className="w-full sm:w-auto bg-fg text-bg px-12 py-5 rounded-2xl font-black text-[15px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
            >
              Agendar Consultoría <MousePointer2 className="w-5 h-5" />
            </motion.a>
            <Link to="/portafolio" className="text-[14px] font-black text-muted hover:text-accent transition-colors underline decoration-2 underline-offset-8 uppercase tracking-widest">
              Ver Resultados Reales
            </Link>
          </div>
        </section>
      </main>


      <ChambaFooter />
    </div>
  );
}

// Re-using some icons from Lucide that might be needed
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  )
}
