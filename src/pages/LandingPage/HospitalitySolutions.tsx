import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from '../../App';
import { 
  BarChart3, 
  Code2, 
  Bot, 
  Zap, 
  Target, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Sparkles,
  MessageSquare,
  Hotel,
  TrendingUp,
  Database,
  Cpu,
  Wallet,
  UserCheck,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Globe
} from 'lucide-react';

const HospitalitySolutions: React.FC = () => {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 md:px-10 max-w-[1200px] mx-auto overflow-hidden">
          <div className="absolute top-[-100px] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="z-10"
          >
            <span className="label-editorial mx-auto">Hospitality Growth Engine</span>
            <h1 className="text-[42px] md:text-[80px] font-black tracking-tight leading-[1.05] mb-8">
              Ingeniería Digital para <span className="text-accent">Hoteles</span> de Alto Nivel.
            </h1>
            <p className="text-[18px] md:text-[22px] text-muted max-w-[800px] mx-auto mb-12 leading-relaxed font-medium">
              Especialistas en Marketing Hotelero, Implementación de Sirvoy PMS, Desarrollo Web Premium y Automatización con Inteligencia Artificial.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670?text=Hola,%20quiero%20potenciar%20mi%20hotel%20con%20vuestra%20tecnolog%C3%ADa."
                target="_blank"
                className="w-full sm:w-auto bg-accent text-white px-10 py-6 rounded-[16px] font-black text-[16px] shadow-[0_20px_40px_rgba(59,130,246,0.3)] uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Auditoría Gratuita <ArrowRight className="w-5 h-5" />
              </motion.a>
              <a href="#servicios" className="text-[14px] font-black uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center gap-2">
                Ver Ecosistema <Zap className="w-4 h-4 fill-accent/20" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Pillars Section */}
        <section id="servicios" className="py-32 px-6 md:px-10 max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="label-editorial mx-auto">Nuestros Pilares</span>
            <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none">
              Soluciones <span className="text-accent">360°</span> para tu Hotel.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Marketing */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-[22px] font-black mb-4">Marketing <br/><span className="text-accent">Estratégico</span></h3>
              <p className="text-muted text-[14px] leading-relaxed mb-6">
                Captación directa de huéspedes mediante campañas de performance en Meta y Google Ads.
              </p>
              <ul className="space-y-3">
                {["Ads de Conversión", "SEO Hospitality", "Retargeting"].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] font-bold text-fg/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {li}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pillar 2: PMS Sirvoy */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-[22px] font-black mb-4">Sirvoy <br/><span className="text-accent">Expertise</span></h3>
              <p className="text-muted text-[14px] leading-relaxed mb-6">
                Configuración y optimización de tu Property Management System para una gestión impecable.
              </p>
              <ul className="space-y-3">
                {["Configuración PMS", "Channel Manager", "Motor de Reservas"].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] font-bold text-fg/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {li}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pillar 3: Web Dev */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-[22px] font-black mb-4">Desarrollo <br/><span className="text-accent">Web Pro</span></h3>
              <p className="text-muted text-[14px] leading-relaxed mb-6">
                Sitios web ultra-rápidos que integran tu motor de reservas y maximizan la venta directa.
              </p>
              <ul className="space-y-3">
                {["Mobile First", "High Performance", "UX de Lujo"].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] font-bold text-fg/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {li}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pillar 4: AI & Automation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-[22px] font-black mb-4">IA & <br/><span className="text-accent">Automation</span></h3>
              <p className="text-muted text-[14px] leading-relaxed mb-6">
                Agentes virtuales que atienden huéspedes, automatizan cobros y gestionan contactos 24/7.
              </p>
              <ul className="space-y-3">
                {["Chatbots IA", "Cobros Automáticos", "Gestión de Leads"].map((li, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] font-bold text-fg/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {li}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Deep Dive: AI Agents & Chatbots */}
        <section className="py-24 px-6 md:px-10 bg-accent/[0.03] border-y border-white/5">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="label-editorial">Inteligencia Artificial</span>
                <h2 className="text-[36px] md:text-[52px] font-black leading-tight mb-8">
                  Agentes que <span className="text-accent">Venden</span> mientras duermes.
                </h2>
                <p className="text-[17px] text-muted leading-relaxed mb-10">
                  Implementamos agentes entrenados específicamente con la data de tu hotel. No son simples bots de opciones; son asistentes capaces de entender lenguaje natural y guiar al huésped hasta el pago.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Atención 24/7", desc: "Respuestas instantáneas a preguntas frecuentes vía WhatsApp.", icon: MessageSquare },
                    { title: "Venta Asistida", desc: "El bot sugiere tipos de habitación según necesidades del huésped.", icon: Sparkles },
                    { title: "Cierre de Venta", desc: "Envío automático de links de pago y confirmación.", icon: Wallet },
                    { title: "Calificación de Lead", desc: "Detecta huéspedes premium y los escala a un humano.", icon: UserCheck }
                  ].map((feat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                        <feat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="text-[15px] font-black uppercase tracking-tight">{feat.title}</h4>
                      <p className="text-[13px] text-muted leading-snug">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative glass p-2 rounded-[40px] border-white/10"
              >
                <div className="bg-bg/40 rounded-[38px] p-8 md:p-12 aspect-[4/5] md:aspect-auto flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-[13px] font-medium max-w-[80%]">
                        ¡Hola! He visto que buscas habitación para el próximo fin de semana. Tengo disponible el Bungalow Vista Mar. ¿Te gustaría reservarlo ahora?
                      </div>
                    </div>
                    <div className="flex gap-4 items-start justify-end">
                      <div className="bg-accent/10 border border-accent/30 p-4 rounded-2xl rounded-tr-none text-[13px] font-bold max-w-[80%]">
                        Sí, me encanta. ¿Cómo puedo pagar?
                      </div>
                      <div className="w-8 h-8 bg-fg rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <Users className="w-5 h-5 text-bg" />
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none space-y-3 max-w-[85%]">
                        <p className="text-[13px] font-medium">Genial. Haz clic en el botón de abajo para completar el pago de forma segura. ¡Te esperamos!</p>
                        <button className="w-full bg-accent text-white py-3 rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2">
                          Pagar Reserva <Wallet className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">IA Activa: Sirvoy Connect</span>
                    </div>
                    <Layers className="w-4 h-4 text-muted/30" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PMS Integration: Sirvoy */}
        <section className="py-32 px-6 md:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, order: 2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Database, t: "Sincronización Total", d: "Adiós al Overbooking." },
                  { icon: Globe, t: "Channel Manager", d: "Booking, Airbnb, Expedia..." },
                  { icon: Wallet, t: "Pasarelas de Pago", d: "Stripe, PayPal, Culqi." },
                  { icon: BarChart3, t: "Reportes en Vivo", d: "Mide tu ocupación real." }
                ].map((item, i) => (
                  <div key={i} className="p-6 glass rounded-3xl border-white/5 space-y-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="text-[14px] font-black uppercase tracking-tight leading-none">{item.t}</h4>
                    <p className="text-[12px] text-muted leading-tight">{item.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <span className="label-editorial">PMS Specialists</span>
              <h2 className="text-[36px] md:text-[52px] font-black leading-tight mb-8">
                Especialistas en <span className="text-accent underline decoration-accent/20 underline-offset-8">Sirvoy PMS</span>.
              </h2>
              <p className="text-[17px] text-muted leading-relaxed mb-8">
                No solo instalamos el software. Configuramos toda la lógica comercial: tipos de habitación, ofertas, restricciones y la conexión perfecta con OTAs y tu motor de reservas propio.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold">Configuración Estratégica</h4>
                    <p className="text-[13px] text-muted">Optimizamos tu inventario para maximizar ingresos.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold">App de Housekeeping</h4>
                    <p className="text-[13px] text-muted">Tu equipo de limpieza conectado en tiempo real.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio / Trust */}
        <section className="py-24 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="label-editorial mx-auto">Experiencia Comprobada</span>
            <h2 className="text-[32px] md:text-[48px] font-black mb-16">Hoteles que ya están <span className="text-accent">creciendo</span>.</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Peña Linda Bungalows", detail: "Marketing + PMS + IA" },
                { name: "Fundo Achamaqui", detail: "Web + Estrategia" },
                { name: "Punta Negritos", detail: "Lanzamiento 360°" },
                { name: "Sauce Hotel Boutique", detail: "Optimización PMS" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 glass rounded-[24px] border-white/5 flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Hotel className="w-6 h-6" />
                  </div>
                  <span className="text-[14px] font-black text-fg uppercase tracking-tighter leading-tight mb-1">{item.name}</span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-32 px-6 md:px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -z-10" />
          
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[40px] md:text-[64px] font-black leading-tight mb-8">
              ¿Listo para convertir tu hotel en un <span className="text-accent underline decoration-accent/20 underline-offset-4">Referente Digital</span>?
            </h2>
            <p className="text-[18px] md:text-[22px] text-muted mb-12 font-medium">
              Agenda una auditoría gratuita. Analizamos tu web, tu PMS y tus procesos de venta para detectar fugas de dinero.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670?text=Hola,%20quisiera%20agendar%20una%20auditor%C3%ADa%20digital%20para%20mi%20hotel."
                target="_blank"
                className="bg-accent text-white px-12 py-7 rounded-[20px] font-black text-[18px] shadow-[0_25px_50px_rgba(59,130,246,0.4)] uppercase tracking-[0.2em] flex items-center gap-4 group"
              >
                Solicitar Auditoría Gratis
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
              <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-muted/60">
                <span>Sirvoy Certified</span>
                <span className="w-1.5 h-1.5 bg-accent/30 rounded-full" />
                <span>AI Implementation</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ChambaFooter />
    </div>
  );
};

export default HospitalitySolutions;
