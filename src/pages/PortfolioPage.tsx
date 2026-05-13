import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChambaNavbar, Logo, WhatsAppIcon } from "../App";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, X, Zap, ExternalLink, MapPin,
  Globe, Terminal, BarChart3, Mail, Instagram, Linkedin,
  Filter, Layers, Bot, Building2, ShoppingCart, Briefcase,
} from "lucide-react";

// --- Data ---
const hotelClients = [
  {
    emoji: "🏝️", name: "Peña Linda Bungalows", location: "Máncora – Perú",
    category: "hotel", url: "penalindamancora.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600",
    highlight: "+10 años operando juntos",
    tasks: [
      "Implementación y gestión integral del PMS.",
      "Desarrollo y optimización continua de la web oficial.",
      "Integración de motor de reservas para ventas directas.",
      "Administración completa del flujo de reservas.",
      "Atención vía WhatsApp y Automatización con IA.",
    ],
    focus: "Operación integral: marketing + ventas + tecnología + automatización.",
  },
  {
    emoji: "🌿", name: "Fundo Achamaqui", location: "Chachapoyas – Perú",
    category: "hotel", url: "fundoachamaqui.webflow.io",
    thumb: "https://s.wordpress.com/mshots/v1/https://fundoachamaqui.webflow.io?w=600",
    highlight: "Producto turístico premium",
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
    emoji: "🌊", name: "Punta Negritos | Wind & Surf", location: "Talara – Perú",
    category: "hotel", url: "puntanegritos.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600",
    highlight: "Presencia digital desde cero",
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
    emoji: "🌴", name: "Hacienda Don Vicente", location: "Tarapoto – Perú",
    category: "hotel", url: "haciendadonvicente.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://haciendadonvicente.com?w=600",
    highlight: "Estrategia de contenido",
    tasks: [
      "Creación de copys estratégicos para redes sociales.",
      "Desarrollo de promociones estacionales.",
      "Diseño de ofertas con valor agregado.",
      "Optimización de mensajes de venta y conversión.",
    ],
    focus: "Incremento de reservas mediante comunicación efectiva y ofertas atractivas.",
  },
  {
    emoji: "🏔️", name: "Sauce Hotel Boutique", location: "Ollantaytambo – Perú",
    category: "hotel", url: "sauce.pe",
    thumb: "https://s.wordpress.com/mshots/v1/https://sauce.pe?w=600",
    highlight: "Optimización operativa",
    tasks: [
      "Implementación y optimización del PMS.",
      "Configuración de tarifas y disponibilidad.",
      "Sincronización con OTAs.",
      "Soporte técnico y ajustes estratégicos.",
    ],
    focus: "Eficiencia y control total en la gestión de reservas.",
  },
];

const techClients = [
  {
    emoji: "⚖️", name: "Latam Abogados", location: "React / Headless",
    category: "tech", url: "latamabogados.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://latamabogados.com?w=600",
    highlight: "Migración WordPress → React",
    tasks: [
      "Migración pixel-perfect de WordPress a React/Vite.",
      "Integración nativa de API MailerLite / Mailchimp.",
      "Automatización de sistema de reservas B2B.",
      "Optimización de assets para SEO internacional.",
    ],
    focus: "Plataforma líder en Inglés Jurídico con automatización avanzada de leads.",
  },
  {
    emoji: "🤖", name: "Sistema Autónomo B2B", location: "VPS Linux/Ubuntu",
    category: "tech", url: "hothelia.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://hothelia.com?w=600",
    highlight: "-70% tiempo de procesamiento",
    tasks: [
      "Orquestación de API RESTful escalable.",
      "Integración de Agente Ollama para análisis de datos privados.",
      "Automatización de flujos con Google Workflows.",
      "Monitoreo 24/7 con PM2 y Docker.",
    ],
    focus: "Reducción del 70% en tiempo de procesamiento de datos confidenciales.",
  },
  {
    emoji: "🛍️", name: "E-Commerce AI Agent", location: "Arquitectura Cloud",
    category: "tech", url: "olivosdelperu.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600",
    highlight: "+35% conversión",
    tasks: [
      "Implementación de ChatGPT/Claude para atención 24/7.",
      "Conexión en tiempo real con inventario vía GraphQL.",
      "Webhooks conectados a WhatsApp Business API.",
      "Calificación predictiva de leads.",
    ],
    focus: "Atención hiper-personalizada y aumento del 35% en tasa de conversión.",
  },
];

const webProjects = [
  { url: "latamabogados.com", label: "Inglés Legal & Consultoría U.S.", category: "tech" },
  { url: "penalindamancora.com", label: "Reserva Directa Hotelera", category: "hotel" },
  { url: "www.dupla.work", label: "Producción Visual & Fotografía", category: "tech" },
  { url: "kabsa.pe", label: "Constructora Nacional", category: "tech" },
  { url: "puntanegritos.com", label: "Wind & Surf Hotel", category: "hotel" },
  { url: "haciendadonvicente.com", label: "Hacienda Don Vicente", category: "hotel" },
  { url: "sauce.pe", label: "Sauce Hotel Boutique", category: "hotel" },
  { url: "jahsurfperu.com", label: "Jah Surf San Bartolo", category: "hotel" },
  { url: "olivosdelperu.com", label: "Exportación & E-Commerce", category: "ecommerce" },
  { url: "hothelia.com", label: "Software SaaS (In-house)", category: "tech" },
];

type FilterType = "all" | "hotel" | "tech" | "ecommerce";

const allProjects = [...hotelClients, ...techClients];

// --- Page Component ---
export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string; icon: any }[] = [
    { key: "all", label: "Todos", icon: Layers },
    { key: "hotel", label: "Hoteles", icon: Building2 },
    { key: "tech", label: "IA & Cloud", icon: Bot },
    { key: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  ];

  const filteredProjects = filter === "all" ? allProjects : allProjects.filter(p => p.category === filter);
  const filteredWebs = filter === "all" ? webProjects : webProjects.filter(w => w.category === filter);

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[70px]">

        {/* Hero */}
        <section className="relative py-24 md:py-32 px-6 md:px-10 text-center max-w-[1024px] mx-auto overflow-hidden">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-radial-[circle,rgba(59,130,246,0.08)_0%,transparent_70%] blur-[60px] -z-10" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="label-editorial mx-auto">Experiencia Comprobada</span>
            <h1 className="text-[36px] md:text-[72px] font-black tracking-tighter leading-[0.95] mb-6">
              Nuestro <span className="text-accent">Portafolio</span>.
            </h1>
            <p className="text-muted text-[16px] md:text-[19px] max-w-[650px] mx-auto leading-relaxed">
              Más de <strong className="text-fg">50 proyectos entregados</strong> en hospitality,
              e-commerce, IA y desarrollo de software. Explora cada caso en detalle.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-14"
          >
            {[
              { n: "+50", l: "Proyectos" }, { n: "+10", l: "Años" },
              { n: "6", l: "Países" }, { n: "24/7", l: "Soporte" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[32px] md:text-[40px] font-black text-accent tracking-tight">{s.n}</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Filter Bar */}
        <section className="px-6 md:px-10 max-w-[1024px] mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((f) => (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-wider transition-all border ${
                  filter === f.key
                    ? "bg-accent text-white border-accent shadow-[0_5px_20px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-muted border-white/10 hover:border-accent/30 hover:text-fg"
                }`}
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6 md:px-10 max-w-[1200px] mx-auto mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, borderColor: "rgba(59,130,246,0.4)" }}
                  onClick={() => setSelectedProject(project)}
                  className="glass rounded-[24px] border-white/5 overflow-hidden cursor-pointer group transition-all smooth-gpu"
                >
                  {/* Thumbnail */}
                  {project.thumb ? (
                    <div className="relative h-[180px] overflow-hidden border-b border-white/5">
                      <img
                        src={project.thumb} alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                      {project.highlight && (
                        <div className="absolute bottom-3 left-3 bg-accent/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                          {project.highlight}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-[180px] bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center border-b border-white/5 relative">
                      <span className="text-6xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                      {project.highlight && (
                        <div className="absolute bottom-3 left-3 bg-accent/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                          {project.highlight}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{project.emoji}</span>
                      <h3 className="text-[16px] font-black group-hover:text-accent transition-colors leading-tight">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3 h-3 text-muted" />
                      <span className="text-[11px] text-muted uppercase tracking-wider">{project.location}</span>
                    </div>
                    <p className="text-[12px] text-muted italic leading-relaxed line-clamp-2">{project.focus}</p>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all">
                      Ver Proyecto <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Web Gallery */}
        <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] flex-1 bg-white/5" />
              <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-muted">
                Galería de Interfaces
              </h3>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredWebs.map((web, i) => (
                <motion.a
                  key={i} href={`https://${web.url}`} target="_blank"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -5 }}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-[16px] overflow-hidden border border-white/5 mb-3 shadow-xl">
                    <img
                      src={`https://s.wordpress.com/mshots/v1/https://${web.url}?w=600`}
                      alt={web.label}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h4 className="text-[12px] font-bold text-fg mb-0.5">{web.label}</h4>
                  <p className="text-[10px] text-muted uppercase tracking-widest">{web.url}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Hothelia Showcase */}
        <section className="py-20 px-6 md:px-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-[32px] border-accent/20 bg-accent/[0.02] overflow-hidden group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-14">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-4 block">Software In-House</span>
                <h3 className="text-[28px] md:text-[36px] font-black tracking-tight mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-accent" /> Hothelia SaaS
                </h3>
                <p className="text-[15px] text-muted leading-relaxed mb-8">
                  Nuestra plataforma propia de gestión hotelera. Multi-tenant, con chatbot IA integrado,
                  motor de reservas y dashboard analítico. Prueba viviente de nuestra capacidad técnica.
                </p>
                <a href="https://hothelia.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-accent/40 px-6 py-4 rounded-[12px] font-bold text-fg text-[14px] transition-all hover:bg-white/10">
                  Explorar Plataforma <ArrowRight className="w-4 h-4 text-accent" />
                </a>
              </div>
              <div className="relative h-[280px] lg:h-full lg:min-h-[400px] border-t lg:border-t-0 lg:border-l border-white/5 overflow-hidden">
                <img src="https://s.wordpress.com/mshots/v1/https://hothelia.com?w=1000" alt="Hothelia"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/20 lg:to-bg" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-10 text-center max-w-[800px] mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-black tracking-tight mb-4">
            ¿Listo para ser el próximo caso de éxito?
          </h2>
          <p className="text-muted text-[15px] mb-10">Hablemos sobre tu proyecto. Sin compromiso.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="https://wa.me/51904060670?text=Hola%2C%20vi%20su%20portafolio%20y%20quiero%20un%20proyecto%20similar."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white px-10 py-5 rounded-[14px] font-black text-[15px] shadow-[0_15px_40px_rgba(255,107,53,0.3)] flex items-center justify-center gap-3 uppercase tracking-wider">
              <WhatsAppIcon className="w-5 h-5" /> Iniciar Proyecto
            </motion.a>
            <Link to="/#servicios"
              className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-accent/30 text-fg px-10 py-5 rounded-[14px] font-bold text-[15px] transition-colors text-center">
              Ver Planes y Precios
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[600px] glass rounded-[32px] border-accent/20 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-muted hover:text-accent transition-colors">
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{selectedProject.emoji}</span>
                <div>
                  <h3 className="text-[24px] font-black tracking-tighter leading-none mb-1">{selectedProject.name}</h3>
                  <p className="text-[14px] text-accent font-bold uppercase tracking-widest">{selectedProject.location}</p>
                </div>
              </div>

              {selectedProject.highlight && (
                <div className="mb-6 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider">
                  <Zap className="w-3 h-3" /> {selectedProject.highlight}
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[1px] flex-grow bg-white/5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Implementación</span>
                    <div className="h-[1px] flex-grow bg-white/5" />
                  </div>
                  <ul className="space-y-4">
                    {selectedProject.tasks.map((task: string, idx: number) => (
                      <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }} className="flex gap-4 text-[14px] leading-relaxed text-muted">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" /> {task}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-accent/10 rounded-[20px] border border-accent/20 relative overflow-hidden">
                  <span className="text-[10px] font-black uppercase text-accent tracking-[0.4em] block mb-2">🔑 Enfoque Estratégico</span>
                  <p className="text-[15px] font-bold italic leading-tight text-fg">{selectedProject.focus}</p>
                </div>

                <div className="flex flex-col gap-3">
                  {selectedProject.url && (
                    <a href={`https://${selectedProject.url}`} target="_blank" rel="noopener noreferrer"
                      className="bg-white/5 border border-white/10 hover:border-accent/30 text-fg py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all">
                      Visitar Web <ExternalLink className="w-4 h-4 text-accent" />
                    </a>
                  )}
                  <a href={`https://wa.me/51904060670?text=Hola, vi el proyecto ${selectedProject.name} y quiero algo similar.`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-wider text-[12px] shadow-lg">
                    <WhatsAppIcon className="w-4 h-4" /> Quiero un Proyecto Similar
                  </a>
                  <button onClick={() => setSelectedProject(null)}
                    className="text-[11px] font-bold text-muted/50 uppercase tracking-widest hover:text-fg transition-colors py-2">
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
}
