import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChambaNavbar, ChambaFooter } from '../../App';
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
import { SEO } from '../../components/SEO';

const HotelsLandingPage: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    {
      name: "Hotel Costa Blanca",
      location: "Vichayito – Perú",
      tasks: ["Plataforma Web WaaS", "Catálogo Dinámico de Habitaciones", "Motor de Reservas Directas", "Integración WhatsApp", "Soporte Cloud"],
      focus: "Operación comercial autónoma y reservas directas."
    },
    {
      name: "Fundo Achamaqui",
      location: "Chachapoyas – Perú",
      tasks: ["PMS + Reservas", "Diseño de Paquetes Premium", "Pricing Estratégico", "Conversión IA"],
      focus: "Hospedaje convertido en producto turístico."
    },
    {
      name: "Punta Negritos | Wind & Surf",
      location: "Talara – Perú",
      tasks: ["PMS Configurado", "Web Oficial", "OTAs Sincronizadas", "Google Business"],
      focus: "Lanzamiento digital y canales de venta activos."
    },
    {
      name: "Hacienda Don Vicente",
      location: "Tarapoto – Perú",
      tasks: ["Copywriting Estratégico", "Promociones Estacionales", "Ofertas Premium", "Conversión"],
      focus: "Incremento de reservas vía comunicación estratégica."
    },
    {
      name: "Sauce Hotel Boutique",
      location: "Ollantaytambo – Perú",
      tasks: ["PMS Optimizado", "Pricing Dinámico", "Sincronización OTAs", "Soporte Técnico"],
      focus: "Eficiencia operativa y control total."
    },
    {
      name: "Casa QX | Hotel Boutique",
      location: "Pachacamac – Perú",
      tasks: ["Concepto Boutique", "Comunicación Premium", "Posicionamiento", "Contenido Visual"],
      focus: "Marca exclusiva enfocada en experiencia privada."
    }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <SEO 
        title="Marketing Hotelero y Motor de Reservas Directas | Chamba Digital"
        description="Recupera tus reservas directas y elimina comisiones de OTAs (Booking, Airbnb). Especialistas en Marketing Hotelero, integración de Sirvoy PMS, motores de reservas de alta conversión y automatización con Inteligencia Artificial en Perú y Latinoamérica."
        keywords="Marketing Hotelero Perú, Motor de Reservas Hoteles, Sirvoy PMS Perú, Desarrollo Web Hoteles, Automatización Hotelera IA, Reservas Directas Hoteles, Agencia Marketing Hotelero Lima, Máncora Hoteles Marketing, Chamba Digital Hoteles"
        ogTitle="Marketing Hotelero y Motor de Reservas Directas | Chamba Digital"
        ogDescription="Elimina comisiones de Booking y Airbnb. Marketing hotelero, PMS y automatización con IA."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/hotels"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://chamba.digital/hotels#webpage",
              "url": "https://chamba.digital/hotels",
              "name": "Marketing Hotelero y Motor de Reservas Directas | Chamba Digital",
              "description": "Elimina comisiones de Booking y Airbnb. Marketing hotelero, PMS y automatización con IA.",
              "isPartOf": {
                "@id": "https://chamba.digital/#website"
              }
            },
            {
              "@type": "Service",
              "@id": "https://chamba.digital/hotels#service",
              "name": "Marketing Hotelero y Motor de Reservas Directas",
              "provider": {
                "@id": "https://chamba.digital/#organization"
              },
              "description": "PMS Sirvoy, web hotelera, reservas directas y atención automatizada con IA.",
              "category": "Marketing Hotelero y Tecnología PMS",
              "areaServed": [
                { "@type": "Country", "name": "Perú" },
                { "@type": "Country", "name": "México" },
                { "@type": "Country", "name": "Estados Unidos" },
                { "@type": "Country", "name": "América Latina" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Planes de Desarrollo y Marketing Hotelero",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plan Desarrollo Web para Hoteles ($999 USD)",
                      "description": "Web hotelera, integración PMS, agente de reservas y 2500 créditos/mes para contenido IA."
                    },
                    "price": "999.00",
                    "priceCurrency": "USD"
                  }
                ]
              }
            }
          ]
        }}
      />
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
              Tus <span className="text-accent">Reservas Directas</span>. 0% Comisiones.
            </h1>
            <p className="text-[16px] md:text-[18px] text-muted max-w-[700px] mx-auto mb-10 leading-relaxed">
              Ecosistema de captación directa: Motor de reservas y agentes de Inteligencia Artificial operativos 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670"
                target="_blank"
                className="bg-accent text-white px-6 py-3.5 rounded-lg font-bold text-[13px] shadow-md transition-all"
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
                desc: "Inventario en tiempo real con canales directos. Sin overbooking.",
                icon: Building2
              },
              {
                title: "Motor de Reservas",
                desc: "Experiencia fluida móvil que aumenta tu ticket promedio.",
                icon: Smartphone
              },
              {
                title: "Tráfico Avanzado",
                desc: "Meta Ads hiper-segmentados para viajeros calificados.",
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

        {/* Featured Case Study: Hotel Costa Blanca */}
        <section className="py-28 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-white/5 overflow-hidden">
          {/* Encabezado y Contexto Estratégico */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <span className="label-editorial">CASO DE ESTUDIO DESTACADO</span>
              <h2 className="text-[36px] sm:text-[52px] font-black tracking-tight leading-[1.1] text-fg font-display">
                Performance en <span className="text-accent underline decoration-accent/30 underline-offset-8">Costa Blanca Vichayito</span>
              </h2>
              <p className="text-[18px] text-muted leading-relaxed font-medium">
                Implementamos una plataforma web de alto rendimiento optimizada para reservas directas y experiencias de playa. 0% comisiones a intermediarios, conversión fluida vía WhatsApp y motor cloud.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                <a
                  href="https://costablanca.up.railway.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-3 uppercase tracking-widest text-center"
                >
                  Visitar Demo en Vivo <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20una%20web%20hotelera%20como%20la%20de%20Costa%20Blanca."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center justify-center gap-2 uppercase tracking-widest text-center"
                >
                  Solicitar Web Similar
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="bg-bg-subtle/40 p-8 rounded-3xl border border-white/5 space-y-6 shadow-xl">
                <h3 className="text-[20px] font-bold text-fg mb-2 font-display flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Pilares del Proyecto
                </h3>
                {[
                  { num: "01", title: "Reserva Directa", desc: "Embudo sin fricciones directo a WhatsApp y motor." },
                  { num: "02", title: "Catálogo Dinámico", desc: "Tarifas y habitaciones actualizadas al instante." },
                  { num: "03", title: "Diseño Mobile-First", desc: "Experiencia visual envolvente de playa." },
                  { num: "04", title: "Hosting Cloud WaaS", desc: "Despliegue de alta disponibilidad en Railway." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 group pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="font-mono text-[14px] font-bold text-accent pt-0.5 tracking-wider">{item.num}</span>
                    <div>
                      <h4 className="text-[17px] font-bold text-fg mb-1 group-hover:text-accent transition-colors">{item.title}</h4>
                      <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Área de Exhibición Desktop Showcase */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-[1000px] mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.8)] bg-bg group"
            >
              <img 
                src="/thumbs/costablanca.webp" 
                alt="Hotel Costa Blanca Vichayito Interface" 
                className="w-full h-auto block object-cover max-h-[600px]"
              />
            </motion.div>
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
                whileHover={{ y: -6, borderColor: "rgba(59, 130, 246, 0.4)" }}
                onClick={() => setSelectedClient(client)}
                className="p-7 rounded-[22px] border border-slate-200 bg-white shadow-xs hover:shadow-md flex flex-col items-center text-center cursor-pointer group transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-[17px] font-black leading-tight mb-1 text-slate-900 group-hover:text-accent transition-colors">{client.name}</h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-5">{client.location}</p>
                <button className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
                  Ver Estrategia <Info className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Conclusion Global */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 md:p-10 rounded-3xl border border-slate-200 bg-slate-50/80 relative overflow-hidden"
          >
            <div className="relative z-10 max-w-[800px]">
              <h3 className="text-[22px] md:text-[24px] font-black mb-6 flex items-center gap-2.5 text-slate-900">
                <BarChart3 className="w-6 h-6 text-accent" />
                Conclusión y Fases Estratégicas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { level: "1. Lanzamiento", clients: "(Punta Negritos)", desc: "Web + Canales de Venta" },
                  { level: "2. Automatización", clients: "(Costa Blanca)", desc: "Marketing + WhatsApp + Catálogo" },
                  { level: "3. Escalada", clients: "(Fundo Achamaqui)", desc: "Conversión y Rentabilidad" }
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
                { s: "01", t: "Auditoría", d: "Analizamos tu negocio actual.", icon: Target },
                { s: "02", t: "Estrategia", d: "Plan para reservas directas.", icon: BarChart3 },
                { s: "03", t: "Desarrollo", d: "Motor + IA integrada.", icon: Code2 },
                { s: "04", t: "Lanzamiento", d: "SEO y tracking activos.", icon: Zap },
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
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">Qué <span className="text-accent">garantizamos</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Clock, t: "En Plazo", d: "Devolvemos el 20% si fallamos." },
              { icon: Code2, t: "Propio", d: "Sin plantillas. SEO técnico." },
              { icon: Headphones, t: "Soporte", d: "30 días de ajustes gratuitos." },
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="https://wa.me/51904060670?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20mi%20motor%20de%20reservas." target="_blank" className="w-full sm:w-auto bg-accent text-white px-6 py-3.5 rounded-lg font-bold text-[13px] shadow-[0_6px_20px_rgba(59,130,246,0.3)]">
              Auditar Motor de Reservas
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="https://wa.me/51904060670?text=Hola%2C%20tengo%20preguntas%20sobre%20el%20servicio%20de%20hoteles." target="_blank" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:border-accent/30 text-fg px-6 py-3.5 rounded-lg font-bold text-[13px] transition-colors">
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
                Desarrollo web y marketing para hoteles. Tecnología y datos para vender directo.
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
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">¿Nueva Aventura?</h4>
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-[11px] text-accent font-bold uppercase tracking-wider mb-2">Mercados</p>
                <p className="text-[13px] font-medium">Perú · Latinoamérica · EE. UU.</p>
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
                    className="text-[11px] font-bold text-muted uppercase tracking-widest hover:text-fg transition-colors"
                  >
                    Volver al portafolio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ChambaFooter />
    </div>
  );
};

export default HotelsLandingPage;
