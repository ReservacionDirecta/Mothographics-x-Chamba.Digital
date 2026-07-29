import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChambaNavbar, WhatsAppIcon, ChambaFooter } from "../App";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, X, Zap, ExternalLink, MapPin,
  Globe, Terminal, Layers, Bot, Building2, ShoppingCart, ShieldCheck, RefreshCw,
} from "lucide-react";

// --- Data ---
const hotelClients = [
  {
    emoji: "🏄‍♂️", name: "Pacific Surf School", location: "Miraflores – Perú",
    category: "hotel", url: "pacificsurfschool.com.pe",
    thumb: "https://s.wordpress.com/mshots/v1/https://pacificsurfschool.com.pe?w=600",
    highlight: "Suscripción WaaS Activa",
    tasks: ["Sitio Web WaaS a Medida", "Reserva de Clases Online", "Diseño UX Mobile-First", "Integración WhatsApp Directo", "Mantenimiento Continuo"],
    focus: "Plataforma web de alto rendimiento sin inversión inicial masiva. Cambios e iteraciones ilimitadas.",
  },
  {
    emoji: "🏝️", name: "Peña Linda Bungalows", location: "Máncora – Perú",
    category: "hotel", url: "penalindamancora.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600",
    highlight: "+10 años operando juntos",
    tasks: ["PMS Integral", "Web Oficial WaaS", "Motor de Reservas Directas", "Atención WhatsApp e IA", "Soporte Continuo"],
    focus: "Ecosistema comercial autónomo con evolución y mantenimiento permanente.",
  },
  {
    emoji: "🌿", name: "Fundo Achamaqui", location: "Chachapoyas – Perú",
    category: "hotel", url: "fundoachamaqui.webflow.io",
    thumb: "https://s.wordpress.com/mshots/v1/https://fundoachamaqui.webflow.io?w=600",
    highlight: "Producto turístico premium",
    tasks: ["Plataforma Web", "Paquetes Turísticos Premium", "Estrategia Pricing", "Atención por WhatsApp"],
    focus: "Transformación de hospedaje en producto turístico premium escalable.",
  },
  {
    emoji: "🌊", name: "Punta Negritos | Wind & Surf", location: "Talara – Perú",
    category: "hotel", url: "puntanegritos.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600",
    highlight: "Presencia digital continua",
    tasks: ["Web Oficial", "Motor de Reservas Directas", "Integración OTAs", "Mantenimiento Cloud"],
    focus: "Infraestructura digital completa sin costo inicial elevado.",
  },
  {
    emoji: "🌴", name: "Hacienda Don Vicente", location: "Tarapoto – Perú",
    category: "hotel", url: "haciendadonvicente.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://haciendadonvicente.com?w=600",
    highlight: "Optimización de conversión",
    tasks: ["Web Responsiva", "Mensajes de Venta Directa", "Promociones Estacionales", "Soporte Activo"],
    focus: "Incremento de reservas directas eliminando comisiones de terceros.",
  },
  {
    emoji: "🏔️", name: "Sauce Hotel Boutique", location: "Ollantaytambo – Perú",
    category: "hotel", url: "sauce.pe",
    thumb: "https://s.wordpress.com/mshots/v1/https://sauce.pe?w=600",
    highlight: "Soporte & Eficiencia",
    tasks: ["Web Oficial", "Control de Reservas", "Optimización de Carga", "Soporte Técnico WaaS"],
    focus: "Velocidad de carga ultra rápida y gestión sin fricción.",
  },
];

const techClients = [
  {
    emoji: "⚖️", name: "Latam Abogados", location: "React / Headless WaaS",
    category: "tech", url: "latamabogados.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://latamabogados.com?w=600",
    highlight: "Web App por Suscripción",
    tasks: ["Desarrollo React/Vite", "Integración API REST", "Sistema de Consultas B2B", "SEO Internacional"],
    focus: "Plataforma legal internacional con captura y procesamiento automatizado de leads.",
  },
  {
    emoji: "🤖", name: "Sistema Autónomo B2B", location: "VPS Linux & IA",
    category: "tech", url: "hothelia.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://hothelia.com?w=600",
    highlight: "-70% tiempo operativo",
    tasks: ["API RESTful Escalable", "Agente IA en Servidor Privado", "Flujos Automatizados", "Monitoreo 24/7"],
    focus: "Automatización de flujos de trabajo internos con Inteligencia Artificial.",
  },
  {
    emoji: "🛍️", name: "E-Commerce & Exportación", location: "Arquitectura Cloud",
    category: "tech", url: "olivosdelperu.com",
    thumb: "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600",
    highlight: "Tienda + Agente IA",
    tasks: ["Atención IA 24/7", "Integración GraphQL", "Webhooks WhatsApp", "Catálogo Dinámico"],
    focus: "Venta directa y calificación predictiva de compradores en tiempo real.",
  },
];

const webProjects = [
  { url: "pacificsurfschool.com.pe", label: "Escuela & Clases de Surf", category: "hotel" },
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

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string; icon: any }[] = [
    { key: "all", label: "Todos los Proyectos", icon: Layers },
    { key: "hotel", label: "Hoteles & Servicios", icon: Building2 },
    { key: "tech", label: "Web Apps & IA", icon: Bot },
    { key: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  ];

  const filteredProjects = filter === "all" ? allProjects : allProjects.filter(p => p.category === filter);
  const filteredWebs = filter === "all" ? webProjects : webProjects.filter(w => w.category === filter);

  return (
    <div className="bg-white text-slate-900 selection:bg-accent selection:text-white min-h-screen">
      <ChambaNavbar />
      <main className="pt-[70px]">

        {/* Hero Section */}
        <section className="relative py-20 md:py-28 px-6 md:px-10 text-center max-w-[1024px] mx-auto overflow-hidden">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-radial-[circle,rgba(37,99,235,0.06)_0%,transparent_70%] blur-[60px] -z-10" />
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-editorial mx-auto">Filosofía WaaS en Acción</span>
            <h1 className="text-[36px] sm:text-[52px] md:text-[64px] font-black tracking-tight leading-[1.05] mb-6 text-slate-900">
              Webs que crecen <br />
              <span className="text-accent">con tu negocio</span>.
            </h1>
            <p className="text-slate-600 text-[16px] md:text-[19px] max-w-[680px] mx-auto leading-relaxed font-medium">
              No creamos webs para luego abandonarlas. Con nuestro modelo <strong className="text-slate-900">Web as a Service</strong>, mantenemos, actualizamos y evolucionamos cada proyecto mes a mes.
            </p>
          </motion.div>

          {/* Value Props Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4 text-[12px] font-bold text-slate-700"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Cambios Ilimitados</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              <span>Hosting + SSL Incluido</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
              <Zap className="w-4 h-4 text-cta" />
              <span>Soporte por WhatsApp</span>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-14 flex flex-wrap justify-center gap-8 md:gap-16 pt-10 border-t border-slate-100"
          >
            {[
              { n: "+50", l: "Proyectos Activos" },
              { n: "+10", l: "Años de Experiencia" },
              { n: "100%", l: "Código Propio" },
              { n: "24/7", l: "Soporte WaaS" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[32px] md:text-[40px] font-black text-accent tracking-tight">{s.n}</span>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em]">{s.l}</span>
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
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-wider transition-all border ${
                  filter === f.key
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(project)}
                  className="interactive-card bg-white rounded-[24px] border border-slate-200 shadow-lg hover:shadow-xl overflow-hidden cursor-pointer group flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  {project.thumb ? (
                    <div className="relative h-[190px] overflow-hidden border-b border-slate-100 bg-slate-100">
                      <img
                        src={project.thumb} alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]" />
                      {project.highlight && (
                        <div className="absolute bottom-3 left-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          {project.highlight}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-[190px] bg-slate-50 flex items-center justify-center border-b border-slate-100 relative">
                      <span className="text-6xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                      {project.highlight && (
                        <div className="absolute bottom-3 left-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          {project.highlight}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{project.emoji}</span>
                      <h3 className="text-[17px] font-extrabold text-slate-900 group-hover:text-accent transition-colors leading-tight">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{project.location}</span>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-4 flex-grow">{project.focus}</p>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform">
                      <span>Ver Detalles del Proyecto</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Web Gallery */}
        <section className="py-20 px-6 md:px-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="label-editorial mx-auto">Webs en Producción</span>
              <h2 className="text-[28px] md:text-[38px] font-black tracking-tight text-slate-900">
                Plataformas <span className="text-accent">100% Autónomas</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWebs.map((web, i) => (
                <motion.a
                  key={i} href={`https://${web.url}`} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="interactive-card group block p-3 rounded-[20px] bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video rounded-[14px] overflow-hidden border border-slate-200 mb-3 shadow-sm">
                    <img
                      src={`https://s.wordpress.com/mshots/v1/https://${web.url}?w=600`}
                      alt={web.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="p-3 bg-accent text-white rounded-full shadow-lg">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-[13px] font-extrabold text-slate-900 mb-0.5 group-hover:text-accent transition-colors">{web.label}</h4>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {web.url}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Hothelia SaaS Feature Card */}
        <section className="py-20 px-6 md:px-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-slate-900 text-white rounded-[32px] overflow-hidden shadow-2xl group border border-slate-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-14">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400 mb-4 block">Software In-House</span>
                <h3 className="text-[28px] md:text-[36px] font-black tracking-tight mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-amber-400" /> Hothelia SaaS
                </h3>
                <p className="text-[15px] text-slate-300 leading-relaxed mb-8 font-medium">
                  Nuestra plataforma hotelera con Inteligencia Artificial integrada. Demuestra la capacidad técnica de Chamba Digital para crear productos escalables de alto nivel.
                </p>
                <a href="https://hothelia.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-4 rounded-xl font-black text-[13px] uppercase tracking-wider transition-all shadow-lg">
                  Explorar Plataforma <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative h-[280px] lg:h-full lg:min-h-[400px] border-t lg:border-t-0 lg:border-l border-slate-800 overflow-hidden">
                <img src="https://s.wordpress.com/mshots/v1/https://hothelia.com?w=1000" alt="Hothelia"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-10 text-center max-w-[850px] mx-auto">
          <span className="label-editorial mx-auto">Comienza Hoy</span>
          <h2 className="text-[32px] md:text-[44px] font-black tracking-tight mb-4 text-slate-900">
            Tu web a medida desde <span className="text-accent">$49/mes</span>.
          </h2>
          <p className="text-slate-600 text-[16px] mb-10 max-w-[600px] mx-auto font-medium">
            Sin contratos de permanencia. Mantenimiento, hosting cloud y soporte por WhatsApp incluido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              href="https://wa.me/51904060670?text=Hola%2C%20vi%20su%20portafolio%20y%20quiero%20informaci%C3%B3n%20sobre%20sus%20planes%20WaaS."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white px-9 py-4.5 rounded-xl font-black text-[14px] shadow-[0_10px_25px_rgba(234,88,12,0.4)] flex items-center justify-center gap-3 uppercase tracking-wider cta-pulse">
              <WhatsAppIcon className="w-5 h-5" /> Hablar con un Asesor
            </motion.a>
            <Link to="/#servicios"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 px-9 py-4.5 rounded-xl font-bold text-[14px] transition-colors text-center">
              Ver Planes WaaS
            </Link>
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-[620px] bg-white rounded-[28px] border border-slate-200 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar text-slate-900 z-10"
            >
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl sm:text-5xl">{selectedProject.emoji}</span>
                <div>
                  <h3 className="text-[22px] sm:text-[26px] font-black tracking-tight leading-tight">{selectedProject.name}</h3>
                  <p className="text-[12px] text-accent font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedProject.location}
                  </p>
                </div>
              </div>

              {selectedProject.highlight && (
                <div className="mb-6 inline-flex items-center gap-2 bg-blue-50 text-accent px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-blue-100">
                  <Zap className="w-3.5 h-3.5" /> {selectedProject.highlight}
                </div>
              )}

              <div className="space-y-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block mb-1">Enfoque WaaS</span>
                  <p className="text-[14px] font-bold text-slate-800 leading-relaxed">{selectedProject.focus}</p>
                </div>

                <div>
                  <h4 className="text-[12px] font-black uppercase tracking-wider text-slate-400 mb-3">Servicios & Características</h4>
                  <ul className="space-y-3">
                    {selectedProject.tasks.map((task: string, idx: number) => (
                      <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }} className="flex items-start gap-3 text-[13px] leading-relaxed text-slate-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> {task}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  {selectedProject.url && (
                    <a href={`https://${selectedProject.url}`} target="_blank" rel="noopener noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-extrabold text-[13px] transition-all shadow-md">
                      Visitar Web en Vivo <ExternalLink className="w-4 h-4 text-amber-400" />
                    </a>
                  )}
                  <a href={`https://wa.me/51904060670?text=Hola, vi el proyecto ${selectedProject.name} y quiero un desarrollo similar.`}
                    target="_blank" rel="noopener noreferrer"
                    className="bg-cta hover:bg-cta-hover text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-wider text-[12px] shadow-md">
                    <WhatsAppIcon className="w-4 h-4" /> Consultar Proyecto Similar
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChambaFooter />
    </div>
  );
}
