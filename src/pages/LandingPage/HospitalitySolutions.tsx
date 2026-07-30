import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from '../../App';
import { 
  Code2, 
  Bot, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageSquare,
  Hotel,
  Database,
  Globe,
  Wallet,
  UserCheck,
  Smartphone,
  ArrowUpRight,
  Building2,
  Users,
  BarChart3,
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { SirvoyPmsDemo } from '../../components/SirvoyPmsDemo';

const HospitalitySolutions: React.FC = () => {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO 
        title="Soluciones Digitales para Hoteles | Chamba Digital"
        description="Vende tus habitaciones directamente desde tu web sin pagar comisiones a Booking o Airbnb. Sirvoy PMS, agentes IA y marketing hotelero."
        keywords="Sirvoy PMS Perú, Marketing Hotelero, Motor de Reservas Directas, Automatización IA Hoteles, Desarrollo Web Hoteles, Chamba Digital Hospitality"
        ogTitle="Soluciones Digitales para Hoteles | Chamba Digital"
        ogDescription="Elimina comisiones de OTAs. Web premium, Sirvoy PMS e IA para hoteles que quieren vender directo."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/hospitality"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://chamba.digital/hospitality#webpage",
              "url": "https://chamba.digital/hospitality",
              "name": "Soluciones Digitales para Hoteles | Chamba Digital",
              "description": "Vende tus habitaciones directamente desde tu web sin pagar comisiones a Booking o Airbnb.",
              "isPartOf": {
                "@id": "https://chamba.digital/#website"
              }
            },
            {
              "@type": "Service",
              "@id": "https://chamba.digital/hospitality#service",
              "name": "Soluciones Digitales para Hoteles",
              "provider": {
                "@id": "https://chamba.digital/#organization"
              },
              "description": "Web premium, integración Sirvoy PMS, agentes de IA para reservas 24/7 y marketing hotelero.",
              "category": "Hospitality Technology",
              "areaServed": [
                { "@type": "Country", "name": "Perú" },
                { "@type": "Country", "name": "México" },
                { "@type": "Country", "name": "América Latina" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Hoteleros",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plan Web para Hoteles ($999 USD)",
                      "description": "Web premium, integración PMS, agente IA de reservas y 2500 créditos/mes."
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
        {/* Hero */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden py-16 md:py-20">
          <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[12px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Soluciones Hoteleras
            </div>
            
            <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-black tracking-tight leading-[1.05] text-fg max-w-[800px]">
              Tu hotel vendiendo directo. <span className="text-accent">Sin comisiones.</span>
            </h1>
            
            <p className="text-[17px] sm:text-[20px] text-muted max-w-[600px] leading-relaxed font-medium">
              Web premium, motor de reservas y atención con IA para que tus huéspeds compren directo en tu sitio.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/51904060670?text=Hola,%20quiero%20eliminar%20las%20comisiones%20de%20Booking%20y%20vender%20directo."
                target="_blank"
                className="bg-accent text-white px-6 py-3.5 rounded-lg font-bold text-[14px] shadow-md flex items-center justify-center gap-2 text-center"
              >
                Hablar con un Asesor <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a 
                href="#como-funciona" 
                className="text-[14px] font-bold text-muted hover:text-fg transition-colors flex items-center justify-center gap-2"
              >
                Cómo funciona <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-[13px] font-bold text-muted">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sirvoy Certified Partner</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> +10 años de experiencia</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Soporte continuo</span>
            </div>
          </motion.div>
        </section>

        {/* Sirvoy PMS Demo */}
        <section className="px-6 md:px-10 max-w-[1024px] mx-auto py-14 md:py-20">
          <SirvoyPmsDemo />
        </section>

        {/* El Problema */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="label-editorial mx-auto">El Problema</span>
            <h2 className="text-[32px] sm:text-[44px] font-black tracking-tight leading-none text-fg">
              Cada reserva por OTA es dinero que <span className="text-accent">pierdes</span>.
            </h2>
            <p className="text-[17px] text-muted leading-relaxed font-medium">
              Booking, Airbnb y Expedia te traen clientes, pero se quedan con un pedazo grande de cada venta.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Modelo Tradicional */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border-red-500/20 bg-gradient-to-b from-red-500/[0.04] to-transparent flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                Sin sistema propio
              </div>
              
              <div className="space-y-6 pt-4">
                <h3 className="text-[24px] font-black text-fg">Depender de OTAs</h3>
                <ul className="space-y-4">
                  {[
                    "Pagas 15-25% de comisión por cada reserva",
                    "No controlas el inventario ni los precios",
                    "Pierdes los datos de tus huéspedes",
                    "Horas perdidas respondiendo WhatsApp manually"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5 text-red-500 text-[12px] font-bold">✕</span>
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Modelo Chamba */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border-accent/30 bg-gradient-to-b from-accent/[0.06] to-transparent flex flex-col justify-between shadow-lg"
            >
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                Con Chamba Digital
              </div>
              
              <div className="space-y-6 pt-4">
                <h3 className="text-[24px] font-black text-fg">Tu propia máquina de reservas</h3>
                <ul className="space-y-4">
                  {[
                    "0% de comisiones — el dinero es tuyo",
                    "Sirvoy PMS: inventario en tiempo real",
                    "Capturas emails y teléfonos de cada huésped",
                    "Agentes IA cierran reservas 24/7 por WhatsApp"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-fg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pilares */}
        <section id="como-funciona" className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="label-editorial mx-auto">Cómo Funciona</span>
            <h2 className="text-[32px] sm:text-[44px] font-black tracking-tight leading-none text-fg">
              Cuatro pilares. <span className="text-accent">Un sistema.</span>
            </h2>
            <p className="text-[17px] text-muted leading-relaxed font-medium">
              Todo lo que necesitas para vender directo, en un solo paquete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              { 
                icon: Target, 
                title: "Marketing Hotelero", 
                desc: "Anuncios segmentados que traen huéspedes directos a tu web.",
                items: ["Ads de conversión directa", "SEO local para hoteles", "Retargeting de visitantes"]
              },
              { 
                icon: Database, 
                title: "Sirvoy PMS", 
                desc: "Tu inventario sincronizado en tiempo real. Sin overbooking.",
                items: ["Channel Manager global", "Motor de reservas web", "Reportes en vivo"]
              },
              { 
                icon: Code2, 
                title: "Web Premium", 
                desc: "Sitio rápido, bonito y diseñado para que el huésped reserve.",
                items: ["Diseño mobile-first", "SEO de alto rendimiento", "Fotografía profesional"]
              },
              { 
                icon: Bot, 
                title: "Agentes IA", 
                desc: "Atención y cierre automatizado por WhatsApp las 24 horas.",
                items: ["Respuesta inmediata 24/7", "Cierre con link de pago", "Escalado a tu equipo"]
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-3xl border-white/5 hover:border-accent/30 transition-all group"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-accent/20">
                  <pillar.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-[20px] font-black mb-3 text-fg">{pillar.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed mb-5 font-medium">{pillar.desc}</p>
                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-[13px] font-bold text-fg/80">
                      <CheckCircle2 className="w-4 h-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Agentes IA - deep dive */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-accent/[0.03] border-y border-white/5">
          <div className="max-w-[1024px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="label-editorial">Vendedor Autónomo</span>
                <h2 className="text-[32px] sm:text-[44px] font-black leading-tight text-fg">
                  Tu vendedor IA <span className="text-accent">24/7</span>.
                </h2>
                <p className="text-[17px] text-muted leading-relaxed font-medium">
                  Un chatbot inteligente en WhatsApp que responde preguntas, cotiza y cierra reservas sin que hagas nada.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {[
                    { title: "Respuesta inmediata", desc: "Sin esperas. El huésped pregunta, la IA responde al instante.", icon: MessageSquare },
                    { title: "Cotización automática", desc: "Calcula precios según fechas y disponibilidad del PMS.", icon: Sparkles },
                    { title: "Cierre con pago", desc: "Envía link de pago seguro y confirma la reserva.", icon: Wallet },
                    { title: "Escala a tu equipo", desc: "Si el caso es complejo, lo pasa a una persona real.", icon: UserCheck }
                  ].map((feat, i) => (
                    <div key={i} className="space-y-2.5 p-5 glass rounded-2xl border-white/5">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                        <feat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="text-[15px] font-black text-fg">{feat.title}</h4>
                      <p className="text-[13px] text-muted leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* WhatsApp Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-3 rounded-[40px] border-white/10 shadow-2xl"
              >
                <div className="bg-bg/80 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-white/5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center relative">
                        <Bot className="w-6 h-6 text-white" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-bg" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-black text-fg">Asistente IA</h4>
                        <p className="text-[11px] text-green-400 font-bold">En línea</p>
                      </div>
                    </div>
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                  </div>

                  <div className="space-y-4 text-[13px]">
                    <div className="flex gap-3 items-start">
                      <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                        Tengo disponible el <strong className="text-accent">Bungalow Vista Mar</strong> para esas fechas. ¿Reservamos?
                      </div>
                    </div>

                    <div className="flex gap-3 items-start justify-end">
                      <div className="bg-accent/15 border border-accent/30 p-4 rounded-2xl rounded-tr-none font-bold max-w-[85%]">
                        ¿Aceptan tarjeta?
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none space-y-3 max-w-[85%]">
                        <p>Sí, todos los medios de pago. Aquí está tu link seguro:</p>
                        <button className="w-full bg-accent text-white py-3 rounded-xl font-black text-[12px] uppercase tracking-wider flex items-center justify-center gap-2">
                          Pagar Reserva <Wallet className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-muted font-bold">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                    <span>Sirvoy PMS sincronizado en tiempo real</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sirvoy PMS Integration */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="label-editorial">PMS Certified</span>
              <h2 className="text-[32px] sm:text-[44px] font-black leading-tight text-fg">
                Especialistas en <span className="text-accent">Sirvoy PMS</span>.
              </h2>
              <p className="text-[17px] text-muted leading-relaxed font-medium">
                Configuramos tu hotel para que todo funcione solo: tarifas, canales y reservas directas.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 p-5 glass rounded-2xl border-white/5">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-fg">Tarifas Inteligentes</h4>
                    <p className="text-[13px] text-muted">Estructuramos precios por temporada para maximizar ingresos.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 glass rounded-2xl border-white/5">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Smartphone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-fg">Equipo Sincronizado</h4>
                    <p className="text-[13px] text-muted">Recepción y housekeeping coordinados desde el móvil.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                { icon: Database, t: "Inventario Centralizado", d: "Sin overbooking. Todo sincronizado." },
                { icon: Globe, t: "Canales Globales", d: "Booking, Airbnb, Expedia, Google Hotels." },
                { icon: Wallet, t: "Pagos Integrados", d: "Stripe, PayPal, Culqi, MercadoPago." },
                { icon: BarChart3, t: "Reportes en Vivo", d: "Ocupación, RevPAR y flujo de caja." }
              ].map((item, i) => (
                <div key={i} className="p-6 glass rounded-2xl border-white/5 space-y-3 hover:border-accent/30 transition-all">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-[15px] font-black text-fg">{item.t}</h4>
                  <p className="text-[13px] text-muted leading-relaxed">{item.d}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Caso de Estudio */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="label-editorial">Caso de Estudio</span>
              <h2 className="text-[32px] sm:text-[44px] font-black tracking-tight leading-[1.1] text-fg">
                Peña Linda <span className="text-accent">Máncora</span>.
              </h2>
              <p className="text-[17px] text-muted leading-relaxed font-medium">
                +10 años trabajando juntos. Web, PMS, marketing y atención IA funcionando como una sola máquina.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Motor Sirvoy con disponibilidad en tiempo real",
                  "Asistente IA que cierra reservas por WhatsApp",
                  "Diseño premium mobile-first",
                  "Estrategia continua de marketing digital"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[14px] font-bold text-fg/80">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href="https://penalindamancora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white px-6 py-3.5 rounded-lg font-bold text-[13px] shadow-md flex items-center justify-center gap-2 text-center"
                >
                  Ver sitio <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20una%20web%20hotelera%20como%20la%20de%20Peña%20Linda."
                  target="_blank"
                  className="text-[13px] font-bold text-muted hover:text-fg transition-colors flex items-center justify-center gap-2"
                >
                  Quiero una similar <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src="/penalindamancora-escritorio.png" 
                alt="Peña Linda Máncora - Sitio web de reservas directas" 
                className="w-full h-auto block"
              />
            </motion.div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1024px] mx-auto text-center">
            <span className="label-editorial mx-auto">Experiencia Comprobada</span>
            <h2 className="text-[32px] sm:text-[44px] font-black mb-12 text-fg">Hoteles que ya <span className="text-accent">crecen</span> con nosotros.</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Peña Linda", detail: "PMS + Marketing + IA" },
                { name: "Fundo Achamaqui", detail: "Web + Estrategia" },
                { name: "Punta Negritos", detail: "Lanzamiento 360°" },
                { name: "Sauce Hotel", detail: "Optimización PMS" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -3 }}
                  className="p-6 glass rounded-2xl border-white/5 flex flex-col items-center justify-center group shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors border border-accent/20">
                    <Hotel className="w-6 h-6" />
                  </div>
                  <span className="text-[14px] font-black text-fg uppercase tracking-tight mb-1">{item.name}</span>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 md:py-32 px-6 md:px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10 pointer-events-none" />
          <div className="max-w-[800px] mx-auto space-y-10">
            <div className="space-y-4">
              <span className="label-editorial mx-auto">Empieza Hoy</span>
              <h2 className="text-[36px] sm:text-[52px] font-black leading-tight text-fg">
                ¿Listo para dejar de <span className="text-accent">regalar comisiones</span>?
              </h2>
              <p className="text-[17px] text-muted max-w-[600px] mx-auto font-medium leading-relaxed">
                Elige cómo quieres empezar. Ambas opciones eliminan comisiones y ponen tu hotel a vender directo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
              <div className="glass p-8 rounded-3xl border-white/10 hover:border-accent/30 transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-[22px] font-black text-fg">Auditoría Gratuita</h3>
                  <p className="text-[15px] text-muted leading-relaxed">
                    Analizamos tu PMS, web y ventas para encontrar dónde estás perdiendo dinero. Sin compromiso.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/51904060670?text=Hola,%20quisiera%20una%20auditoría%20digital%20gratuita%20para%20mi%20hotel."
                  target="_blank"
                  className="w-full bg-white/10 hover:bg-white/15 text-fg py-4 rounded-xl font-bold text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-white/10 text-center"
                >
                  Agendar Auditoría <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

              <div className="glass p-8 rounded-3xl border-accent/40 hover:border-accent transition-all flex flex-col justify-between space-y-6 shadow-lg bg-gradient-to-b from-accent/[0.06] to-transparent">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[22px] font-black text-fg">Plan Hoteles — $999 USD</h3>
                  <p className="text-[15px] text-muted leading-relaxed">
                    Web premium, Sirvoy PMS, agente IA y 2500 créditos. Todo listo para vender directo.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20el%20Plan%20Hoteles%20de%20$999%20USD."
                  target="_blank"
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-md text-center"
                >
                  Contratar Plan <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-muted/60 pt-6">
              <span>Sirvoy Certified</span>
              <span className="w-1 h-1 bg-accent/40 rounded-full" />
              <span>IA Specialists</span>
              <span className="w-1 h-1 bg-accent/40 rounded-full" />
              <span>Soporte Continuo</span>
            </div>
          </div>
        </section>
      </main>

      <ChambaFooter />
    </div>
  );
};

export default HospitalitySolutions;
