import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChambaNavbar } from '../../App';
import { 
  Building2, 
  Users, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Mail,
  Instagram,
  Linkedin,
  MapPin,
  Zap,
  X,
  Info,
  Clock,
  Code2,
  Headphones,
  Shield,
  Repeat,
  Palette,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../../App';

const HotelsLandingPage: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);

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
        "Gestión de cobranza y atención vía WhatsApp.",
        "Ejecución de estrategias de marketing digital y IA.",
        "+10 años consolidando resultados."
      ],
      focus: "Operación integral del negocio: marketing + ventas + tecnología + automatización."
    },
    {
      emoji: "🌿",
      name: "Fundo Achamaqui",
      location: "Chachapoyas – Perú",
      tasks: [
        "Implementación del PMS y estructura de reservas.",
        "Desarrollo de oferta comercial premium (paquetes).",
        "Diseño de experiencias completas (hospedaje + tours).",
        "Estrategias de pricing y rentabilidad.",
        "Contenido emocional y narrativo (misticismo).",
        "Automatización de atención y conversión."
      ],
      focus: "Transformación de alojamiento en producto turístico premium estructurado y escalable."
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
        "Registro y optimización en Google Business Profile.",
        "Construcción de presencia digital desde cero."
      ],
      focus: "Implementación total desde cero: infraestructura digital + canales de venta + posicionamiento inicial."
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
        "Apoyo en estrategia de contenido visual."
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
        "Mejora continua de la operación de reservas.",
        "Soporte técnico y ajustes estratégicos."
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
        "Generación de contenido para redes sociales.",
        "Apoyo en narrativa de marca."
      ],
      focus: "Construcción de una marca enfocada en exclusividad, diseño y experiencia privada."
    }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center text-center justify-center px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
          <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial mx-auto">Hospitality Performance</span>
            <h1 className="text-[36px] md:text-[64px] font-black tracking-tight leading-[1.1] mb-6">
              Recupera tus <span className="text-accent">Reservas Directas</span> y elimina comisiones.
            </h1>
            <p className="text-[16px] md:text-[18px] text-muted max-w-[700px] mx-auto mb-10 leading-relaxed">
              Sistema integral diseñado específicamente para hoteles: captación de huéspedes, reducción de dependencia de OTAs y automatización operativa 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670"
                target="_blank"
                className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
              >
                Auditar mi Motor de Reservas
              </motion.a>
              <a href="#soluciones" className="text-[14px] font-bold hover:text-accent transition-colors">
                Ver Soluciones Técnicas
              </a>
            </div>
          </motion.div>
        </section>

        {/* Solutions Grid */}
        <section id="soluciones" className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Optimización PMS",
                desc: "Conectamos tu inventario en tiempo real con canales de venta directos para evitar overbooking.",
                icon: Building2
              },
              {
                title: "Motor de Reservas",
                desc: "Experiencia de reserva fluida en móviles que reduce el abandono y aumenta el ticket promedio.",
                icon: Smartphone
              },
              {
                title: "Anuncios de Tráfico",
                desc: "Campañas de Meta Ads hiper-segmentadas para viajeros que ya están buscando tu destino.",
                icon: BarChart3
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-[20px] border-white/5 hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-[18px] font-bold mb-3">{item.title}</h4>
                <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="clientes" className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <span className="label-editorial mx-auto">Nuestros Casos de Éxito</span>
            <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter leading-none mb-4">
              Clientes que ya <span className="text-accent">Escalan</span>.
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-[15px] md:text-[17px]">
              Toca cada proyecto para ver el detalle de la implementación estratégica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.4)" }}
                onClick={() => setSelectedClient(client)}
                className="p-6 glass rounded-[24px] border-white/5 flex flex-col items-center text-center cursor-pointer group transition-all smooth-gpu"
              >
                <span className="text-5xl mb-6 group-hover:scale-110 transition-transform">{client.emoji}</span>
                <h3 className="text-[18px] font-black leading-tight mb-1 group-hover:text-accent transition-colors">{client.name}</h3>
                <p className="text-[12px] text-muted font-bold uppercase tracking-[0.2em] mb-6">{client.location}</p>
                <button className="mt-auto flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all">
                  Ver Estrategia <Info className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Conclusion Global */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-10 glass rounded-[32px] border-accent/30 bg-accent/5 relative overflow-hidden smooth-gpu"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 className="w-24 h-24 text-accent" />
            </div>
            <div className="relative z-10 max-w-[800px]">
              <h3 className="text-[24px] font-black mb-6 flex items-center gap-3">
                <span className="text-2xl">📊</span> Conclusión Global
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { level: "1. Implementación", clients: "(Punta Negritos)", desc: "Infraestructura digital + canales de venta" },
                  { level: "2. Operación", clients: "(Peña Linda)", desc: "Marketing + ventas + automatización + gestión completa" },
                  { level: "3. Escalada", clients: "(F. Achamaqui, Sauce, etc.)", desc: "Estrategia, conversión y rentabilidad" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[14px] font-black text-accent uppercase tracking-tighter">{item.level}</p>
                    <p className="text-[11px] font-bold text-fg">{item.clients}</p>
                    <p className="text-[13px] text-muted italic">→ {item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Process */}
        <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1024px] mx-auto">
            <div className="text-center mb-16">
              <span className="label-editorial mx-auto">Cómo Trabajamos</span>
              <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight">De la auditoría al <span className="text-accent">lanzamiento</span>.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { s: "01", t: "Auditoría", d: "Analizamos tu PMS, web y canales actuales.", icon: Target },
                { s: "02", t: "Estrategia", d: "Plan de captación directa para reducir OTAs.", icon: BarChart3 },
                { s: "03", t: "Desarrollo", d: "Web + motor de reservas optimizado.", icon: Code2 },
                { s: "04", t: "Revisión", d: "2 rondas de ajustes incluidas.", icon: CheckCircle2 },
                { s: "05", t: "Lanzamiento", d: "SEO, campañas y tracking activos.", icon: Zap },
                { s: "06", t: "Soporte 30 días", d: "Post-lanzamiento sin costo extra.", icon: Headphones },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-[16px] p-6 border-white/5 hover:border-accent/20 transition-colors group relative overflow-hidden">
                  <span className="absolute top-3 right-4 text-[36px] font-black text-accent/5">{item.s}</span>
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><item.icon className="w-5 h-5 text-accent" /></div>
                  <h4 className="text-[14px] font-bold mb-1">{item.t}</h4>
                  <p className="text-[12px] text-muted leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">Garantías que <span className="text-accent">respaldan</span> nuestro trabajo.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Clock, t: "Entrega en plazo", d: "Si no cumplimos, devolvemos el 20% del pago final." },
              { icon: Code2, t: "Código propio", d: "Sin plantillas. Carga rápido y rankea mejor." },
              { icon: Headphones, t: "Soporte 30 días", d: "Ajustes técnicos post-lanzamiento incluidos." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-[16px] p-6 border-white/5 group">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><item.icon className="w-5 h-5 text-accent" /></div>
                <h4 className="text-[14px] font-bold mb-1">{item.t}</h4>
                <p className="text-[12px] text-muted leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dual CTA */}
        <section className="py-24 px-6 md:px-10 text-center max-w-[800px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-black mb-6">¿Listo para llenar tu hotel?</h2>
          <p className="text-muted mb-10 text-[16px]">Analizamos tu sistema actual sin compromiso.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/51904060670?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20mi%20motor%20de%20reservas." target="_blank" className="w-full sm:w-auto bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)]">
              Auditar mi Motor de Reservas →
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/51904060670?text=Hola%2C%20tengo%20preguntas%20sobre%20el%20servicio%20de%20hoteles." target="_blank" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-accent/30 text-fg px-10 py-5 rounded-[12px] font-bold text-[15px] transition-colors">
              Tengo Preguntas
            </motion.a>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <Logo />
              <p className="text-[14px] text-muted leading-relaxed">
                Ingeniería Digital de alto nivel para el sector Hospitality. Transformamos hoteles con tecnología y datos.
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-muted hover:text-accent transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted hover:text-accent transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Explorar</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-[14px] text-muted hover:text-accent transition-colors">Inicio</Link></li>
                <li><Link to="/ecommerce" className="text-[14px] text-muted hover:text-accent transition-colors">E-commerce</Link></li>
                <li><Link to="/servicebusinesses" className="text-[14px] text-muted hover:text-accent transition-colors">Servicios B2B</Link></li>
                <li><Link to="/alianza" className="text-[14px] text-muted hover:text-accent transition-colors">Alianza</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-muted text-[13px]">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <p>Lima, Perú</p>
                </div>
                <div className="flex items-center gap-3 text-muted text-[13px]">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <p>hola@chamba.digital</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6">
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">¿Nueva Alianza?</h4>
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-[11px] text-accent font-bold uppercase tracking-wider mb-2">Próxima Parada</p>
                <p className="text-[13px] font-medium">Expansión México × Perú</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-muted">
              © {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[600px] glass rounded-[32px] border-accent/20 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-6 right-6 p-2 text-muted hover:text-accent transition-colors"
                title="Cerrar detalles"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{selectedClient.emoji}</span>
                <div>
                  <h3 className="text-[24px] font-black tracking-tighter leading-none mb-1">{selectedClient.name}</h3>
                  <p className="text-[14px] text-accent font-bold uppercase tracking-widest">{selectedClient.location}</p>
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
                    {selectedClient.tasks.map((task: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-4 text-[14px] leading-relaxed text-muted"
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
                  <p className="text-[15px] font-bold italic leading-tight text-fg">{selectedClient.focus}</p>
                </div>

                <div className="flex flex-col gap-4">
                   <a
                    href="https://wa.me/51904060670"
                    target="_blank"
                    className="bg-accent text-white py-5 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] text-[12px] shadow-lg hover:shadow-accent/40 transition-all"
                  >
                    Consultar Proyecto Similar <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="text-[11px] font-bold text-muted/50 uppercase tracking-widest hover:text-fg transition-colors"
                  >
                    Volver al portafolio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelsLandingPage;
