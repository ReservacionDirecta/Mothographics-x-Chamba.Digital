import React, { useState, useMemo } from 'react';
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
  Globe,
  Building2,
  Calculator,
  AlertTriangle,
  Percent,
  DollarSign,
  Clock,
  XCircle
} from 'lucide-react';
import { SEO } from '../../components/SEO';

const HospitalitySolutions: React.FC = () => {
  // Estado para la Calculadora de ROI / Discurso del Lápiz (Alex Dey Style)
  const [rooms, setRooms] = useState<number>(25);
  const [avgRate, setAvgRate] = useState<number>(120);
  const [occRate, setOccRate] = useState<number>(65);

  // Cálculos matemáticos en tiempo real
  const calculations = useMemo(() => {
    const totalRevenueYear = rooms * avgRate * (occRate / 100) * 365;
    // Asumimos que el 60% de las reservas llegan por OTAs (Booking, Airbnb, Expedia)
    const otaShare = totalRevenueYear * 0.6;
    // Comisión promedio de OTAs (18%)
    const commissionsPaid = otaShare * 0.18;
    
    // Con Chamba Digital: Plan de $999 USD. Ahorro neto el primer año.
    const netSavingsFirstYear = commissionsPaid - 999;
    // Días para recuperar la inversión de $999 USD
    const daysToROI = Math.max(1, Math.ceil((999 / (commissionsPaid / 365))));

    return {
      commissionsPaid: Math.round(commissionsPaid),
      netSavingsFirstYear: Math.round(netSavingsFirstYear),
      daysToROI
    };
  }, [rooms, avgRate, occRate]);

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO 
        title="Ingeniería Digital para Hoteles de Alto Nivel | Chamba Digital"
        description="Vende el 100% de tus habitaciones sin pagar comisiones a Booking o Airbnb. Especialistas en Marketing Hotelero, Sirvoy PMS, Desarrollo Web Premium y Automatización IA."
        keywords="Sirvoy PMS Perú, Marketing Hotelero Premium, Motor de Reservas Directas, Automatización IA Hoteles, Agentes IA Reservas, Desarrollo Web Cadenas Hoteleras, Consultoría Hotelera Lima, Chamba Digital Hospitality"
        ogTitle="Ingeniería Digital para Hoteles de Alto Nivel | Chamba Digital"
        ogDescription="Vende el 100% de tus habitaciones sin pagar comisiones a Booking o Airbnb. Especialistas en Marketing Hotelero, Sirvoy PMS y Automatización IA."
        ogImage="https://chamba.digital/og-image.png"
        canonicalUrl="https://chamba.digital/hospitality"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://chamba.digital/hospitality#webpage",
              "url": "https://chamba.digital/hospitality",
              "name": "Ingeniería Digital para Hoteles de Alto Nivel | Chamba Digital",
              "description": "Vende el 100% de tus habitaciones sin pagar comisiones a Booking o Airbnb. Especialistas en Marketing Hotelero, Sirvoy PMS y Automatización IA.",
              "isPartOf": {
                "@id": "https://chamba.digital/#website"
              }
            },
            {
              "@type": "Service",
              "@id": "https://chamba.digital/hospitality#service",
              "name": "Ecosistema Digital 360° para Hoteles",
              "provider": {
                "@id": "https://chamba.digital/#organization"
              },
              "description": "Soluciones avanzadas de marketing estratégico, integración y optimización de Sirvoy PMS, desarrollo web de alto rendimiento y agentes de inteligencia artificial para venta y atención 24/7.",
              "category": "Hospitality Technology & Marketing",
              "areaServed": [
                { "@type": "Country", "name": "Perú" },
                { "@type": "Country", "name": "México" },
                { "@type": "Country", "name": "Estados Unidos" },
                { "@type": "Country", "name": "América Latina" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Hospitality 360",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Plan Desarrollo Web para Hoteles ($999 USD)",
                      "description": "Web premium, integración de PMS, agente de reservas básico conectado al motor y 2500 créditos/mes en Google Flow para videos e imágenes IA."
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
        {/* Hero Section: The Ultimate Hook (Alex Dey Style) */}
        <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-10 max-w-[1280px] mx-auto overflow-hidden py-20">
          <div className="absolute top-[-10%]/2 left-[30%] w-[700px] h-[700px] bg-accent/15 blur-[160px] rounded-full -z-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Persuasive Copy & Hook */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 z-10 space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[13px] font-black uppercase tracking-widest backdrop-blur-md shadow-[0_5px_20px_rgba(59,130,246,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                Ingeniería de Ventas para Hoteles & Resorts
              </div>
              
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black tracking-tight leading-[1.05] text-fg">
                Vende el <span className="text-accent underline decoration-accent/30 underline-offset-8">100% de tus Habitaciones</span> sin Pagar Comisiones a Booking o Airbnb.
              </h1>
              
              <p className="text-[18px] sm:text-[22px] text-muted max-w-[680px] leading-relaxed font-medium">
                El sistema definitivo de Ingeniería de Performance para hoteles boutique y cadenas. Automatizamos tus reservas directas con <span className="text-fg font-bold">Sirvoy PMS</span> e <span className="text-fg font-bold">Inteligencia Artificial 24/7</span>.
              </p>
              
              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-2 pb-4">
                <div className="p-4 glass rounded-2xl border-white/5 border-l-4 border-l-accent shadow-lg">
                  <h4 className="text-[24px] sm:text-[32px] font-black text-fg leading-none mb-1">+38%</h4>
                  <p className="text-[12px] text-muted font-bold uppercase tracking-wider">Reservas Directas</p>
                </div>
                <div className="p-4 glass rounded-2xl border-white/5 border-l-4 border-l-green-500 shadow-lg">
                  <h4 className="text-[24px] sm:text-[32px] font-black text-fg leading-none mb-1">0%</h4>
                  <p className="text-[12px] text-muted font-bold uppercase tracking-wider">Comisiones OTAs</p>
                </div>
                <div className="p-4 glass rounded-2xl border-white/5 border-l-4 border-l-purple-500 shadow-lg">
                  <h4 className="text-[24px] sm:text-[32px] font-black text-fg leading-none mb-1">24/7</h4>
                  <p className="text-[12px] text-muted font-bold uppercase tracking-wider">Atención IA</p>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-2">
                <motion.a
                  whileHover={{ scale: 1.03, shadow: "0 25px 50px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20eliminar%20las%20comisiones%20de%20Booking%20y%20potenciar%20mis%20reservas%20directas."
                  target="_blank"
                  className="bg-accent text-white px-10 py-6 rounded-2xl font-black text-[16px] shadow-[0_20px_40px_rgba(59,130,246,0.3)] uppercase tracking-widest flex items-center justify-center gap-3 text-center group"
                >
                  Auditoría Gratuita de tu Hotel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <a 
                  href="#calculadora" 
                  className="glass border border-white/10 hover:border-accent/40 text-fg px-8 py-6 rounded-2xl font-black text-[15px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Calculator className="w-5 h-5 text-accent" /> Calcular mi Pérdida
                </a>
              </div>
            </motion.div>

            {/* Right Column: Visual Dashboard Mockup & Live Proof */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative glass p-6 sm:p-8 rounded-[36px] border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] space-y-6 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[13px] font-mono text-muted uppercase tracking-widest font-bold">Live AI Dashboard</span>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-black rounded-full uppercase tracking-wider">Sirvoy Connected</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-bg/60 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-[12px] text-muted font-bold">
                      <span>Última Reserva Directa</span>
                      <span className="text-accent">Hace 3 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[16px] font-black text-fg">Bungalow Suite Deluxe (3 Noches)</span>
                      <span className="text-[18px] font-black text-green-400">+$540 USD</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-muted pt-1 border-t border-white/5">
                      <span>Comisión Pagada a Booking:</span>
                      <span className="text-red-400 font-bold line-through">$97.20 USD</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-green-400 font-bold">
                      <span>Ahorro Chamba Digital:</span>
                      <span>$97.20 USD directo a tu cuenta</span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg/60 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                        <Bot className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-fg">Asistente IA WhatsApp</h4>
                        <p className="text-[12px] text-muted">Conversación activa con huésped</p>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-[13px] text-fg/90 italic border border-white/5">
                      "¡Perfecto! Ya generé tu link de pago seguro para el Bungalow. ¿Deseas agregar el traslado desde el aeropuerto de Talara?"
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl border border-accent/30 flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-[16px] font-black text-white">Plan Desarrollo Web Hoteles</h4>
                      <p className="text-[12px] text-white/80 font-medium">Incluye Motor PMS + Bot IA + 2500 Créditos</p>
                    </div>
                    <span className="text-[22px] font-black text-white">$999</span>
                  </div>
                </div>
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-2xl border-white/10 shadow-2xl flex items-center gap-4 hidden sm:flex animate-bounce duration-1000">
                <Building2 className="w-8 h-8 text-accent" />
                <div>
                  <h4 className="text-[14px] font-black text-fg leading-none mb-1">Cero Riesgo</h4>
                  <p className="text-[11px] text-muted font-bold uppercase tracking-wider">Implementación Garantizada</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* El Discurso de Contraste (Alex Dey Style: Dolor vs Placer) */}
        <section className="py-28 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="label-editorial mx-auto">Análisis de Realidad Comercial</span>
            <h2 className="text-[32px] sm:text-[48px] font-black tracking-tight leading-none text-fg">
              La Trampa de las OTAs vs. <span className="text-accent">La Libertad Digital</span>.
            </h2>
            <p className="text-[17px] text-muted leading-relaxed font-medium">
              Muchos hoteleros trabajan duro para pagarle el 20% de sus ingresos a plataformas externas. Observa la diferencia matemática y operativa de tener tu propio ecosistema de conversión.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left Card: The Pain (Traditional Model) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[36px] border-red-500/20 bg-gradient-to-b from-red-500/[0.05] to-transparent flex flex-col justify-between relative overflow-hidden group hover:border-red-500/40 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[11px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                Modelo Tradicional (Pérdida)
              </div>
              
              <div className="space-y-8 pt-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-[28px] font-black text-fg leading-tight">
                  Trabajas para Booking, Airbnb y Expedia.
                </h3>

                <ul className="space-y-5">
                  {[
                    { bold: "Comisiones Asfixiantes:", desc: "Pagas entre el 15% y el 25% por cada reserva. En un año, les regalas el valor de un auto nuevo." },
                    { bold: "Riesgo de Overbooking:", desc: "Gestión manual en Excel o papel que genera reservas duplicadas y clientes insatisfechos." },
                    { bold: "Pérdida del Cliente:", desc: "Booking se queda con el email y teléfono real del huésped. No puedes hacerles retargeting." },
                    { bold: "Esclavitud Operativa:", desc: "Tu equipo pasa horas respondiendo mensajes repetitivos de WhatsApp a deshora." }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed">
                      <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-fg font-bold">{item.bold}</strong> <span className="text-muted">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-red-500/20 flex items-center justify-between">
                <span className="text-[14px] font-black text-red-400 uppercase tracking-wider">Fuga de Capital Estimada:</span>
                <span className="text-[22px] font-black text-red-500">~$21,600 USD / año</span>
              </div>
            </motion.div>

            {/* Right Card: The Pleasure (Chamba Digital Model) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[36px] border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent flex flex-col justify-between relative overflow-hidden group hover:border-accent/60 shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 bg-accent text-white text-[11px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                Modelo Chamba Digital (Rentabilidad)
              </div>

              <div className="space-y-8 pt-4">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30 mb-6">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-[28px] font-black text-fg leading-tight">
                  Tu Hotel como una Máquina Autónoma.
                </h3>

                <ul className="space-y-5">
                  {[
                    { bold: "0% Comisiones de OTAs:", desc: "El 100% del dinero va directo a tu cuenta bancaria al instante mediante pasarelas de pago." },
                    { bold: "Sirvoy PMS Sincronizado:", desc: "Disponibilidad y tarifas actualizadas en tiempo real en tu web y en todos los canales." },
                    { bold: "Base de Datos 100% Tuya:", desc: "Capturas el email y WhatsApp de cada huésped para campañas de fidelización y upsells." },
                    { bold: "Inteligencia Artificial 24/7:", desc: "Un agente virtual responde cotizaciones y cierra ventas por WhatsApp en segundos." }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed">
                      <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-fg font-bold">{item.bold}</strong> <span className="text-muted">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-accent/20 flex items-center justify-between">
                <span className="text-[14px] font-black text-accent uppercase tracking-wider">Retorno de Inversión:</span>
                <span className="text-[22px] font-black text-green-400">100% de Ganancia Neta</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pillars Section: Soluciones Estructuradas con Equilibrio Perfecto */}
        <section id="servicios" className="py-28 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="label-editorial mx-auto">Arquitectura de Conversión</span>
            <h2 className="text-[32px] sm:text-[56px] font-black tracking-tight leading-none text-fg">
              Soluciones <span className="text-accent">360°</span> para Escalar.
            </h2>
            <p className="text-[17px] text-muted leading-relaxed font-medium">
              Cada pilar de nuestro servicio está diseñado milimétricamente para resolver un cuello de botella en la comercialización y gestión de tu propiedad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* Pillar 1: Marketing */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-full shadow-xl"
            >
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-accent/20">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-[24px] font-black mb-4 leading-tight">Marketing <br/><span className="text-accent">Estratégico</span></h3>
                <p className="text-muted text-[15px] leading-relaxed mb-8 font-medium">
                  Captación directa de huéspedes de alto valor mediante campañas de performance avanzada en Meta Ads y Google Ads.
                </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {["Ads de Conversión Directa", "SEO Hospitality Local", "Retargeting Dinámico"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-fg/80">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {li}
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
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-full shadow-xl"
            >
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-accent/20">
                  <Database className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-[24px] font-black mb-4 leading-tight">Sirvoy <br/><span className="text-accent">Expertise</span></h3>
                <p className="text-muted text-[15px] leading-relaxed mb-8 font-medium">
                  Configuración, migración y optimización de tu Property Management System para una gestión hotelera impecable y sin errores.
                </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {["Configuración de Inventario", "Channel Manager Global", "Motor de Reservas Web"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-fg/80">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {li}
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
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-full shadow-xl"
            >
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-accent/20">
                  <Code2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-[24px] font-black mb-4 leading-tight">Desarrollo <br/><span className="text-accent">Web Premium</span></h3>
                <p className="text-muted text-[15px] leading-relaxed mb-8 font-medium">
                  Sitios web inmersivos, ultrarrápidos y orientados al cierre de ventas que integran tu motor de reservas y deslumbran al visitante.
                </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {["Diseño Mobile-First", "High Performance SEO", "UX/UI de Lujo"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-fg/80">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {li}
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
              className="group p-8 glass rounded-[32px] border-white/5 hover:border-accent/40 hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-full shadow-xl"
            >
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-accent/20">
                  <Bot className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-[24px] font-black mb-4 leading-tight">IA & <br/><span className="text-accent">Automatización</span></h3>
                <p className="text-muted text-[15px] leading-relaxed mb-8 font-medium">
                  Agentes virtuales inteligentes que atienden a tus huéspedes por WhatsApp, automatizan cobros y gestionan leads las 24 horas.
                </p>
              </div>
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {["Chatbots IA Avanzados", "Cobros Automáticos", "Calificación de Leads VIP"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] font-bold text-fg/80">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> {li}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Deep Dive: AI Agents & Chatbots (El Vendedor que Nunca Duerme) */}
        <section className="py-28 px-6 md:px-10 bg-accent/[0.03] border-y border-white/5">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <span className="label-editorial">Fuerza de Ventas Autónoma</span>
                <h2 className="text-[36px] sm:text-[52px] font-black leading-tight text-fg">
                  El Vendedor Estrella que Trabaja <span className="text-accent">24/7/365</span> sin Pedir Aumento.
                </h2>
                <p className="text-[18px] text-muted leading-relaxed font-medium">
                  Implementamos agentes entrenados específicamente con la data, tarifas y políticas de tu hotel. No son simples bots de botones obsoletos; son verdaderos cerradores de ventas capaces de entender audios y texto en lenguaje natural.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  {[
                    { title: "Atención Inmediata 24/7", desc: "Respuestas en menos de 2 segundos a cualquier hora del día o de la noche.", icon: MessageSquare },
                    { title: "Cotización Inteligente", desc: "Sugiere la suite perfecta calculando el precio exacto según el número de huéspedes.", icon: Sparkles },
                    { title: "Cierre con Link de Pago", desc: "Genera y envía enlaces de pago seguros para cerrar la reserva en el acto.", icon: Wallet },
                    { title: "Escalado Human-in-the-Loop", desc: "Detecta solicitudes complejas o clientes VIP y notifica de inmediato a recepción.", icon: UserCheck }
                  ].map((feat, i) => (
                    <div key={i} className="space-y-3 glass p-6 rounded-3xl border-white/5 hover:border-accent/30 transition-colors">
                      <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                        <feat.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="text-[17px] font-black uppercase tracking-tight text-fg">{feat.title}</h4>
                      <p className="text-[14px] text-muted leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* WhatsApp Live Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative glass p-3 rounded-[48px] border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
              >
                <div className="bg-bg/80 backdrop-blur-2xl rounded-[42px] p-8 sm:p-10 flex flex-col justify-between space-y-8 border border-white/5">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg relative">
                        <Bot className="w-7 h-7 text-white" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-[16px] font-black text-fg leading-none mb-1">IA Hotel Concierge</h4>
                        <p className="text-[12px] text-green-400 font-bold uppercase tracking-wider">En línea • Respondiendo</p>
                      </div>
                    </div>
                    <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-6 text-[14px]">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center shrink-0 mt-1 shadow">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none font-medium max-w-[85%] leading-relaxed text-fg/90 shadow-md">
                        ¡Hola! He visto que buscas habitación para el próximo fin de semana en Máncora. Tengo disponible el <strong className="text-accent font-bold">Bungalow Vista Mar</strong> por $360 USD (3 noches). ¿Te gustaría reservarlo ahora?
                      </div>
                    </div>

                    <div className="flex gap-4 items-start justify-end">
                      <div className="bg-accent/15 border border-accent/30 p-5 rounded-3xl rounded-tr-none font-bold max-w-[85%] leading-relaxed text-fg shadow-md">
                        Sí, me encanta la vista. ¿Aceptan tarjeta de crédito o transferencia?
                      </div>
                      <div className="w-8 h-8 bg-fg rounded-xl flex items-center justify-center shrink-0 mt-1 shadow">
                        <Users className="w-5 h-5 text-bg" />
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center shrink-0 mt-1 shadow">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none space-y-4 max-w-[85%] shadow-md">
                        <p className="font-medium text-fg/90 leading-relaxed">¡Por supuesto! Aceptamos todas las tarjetas y transferencias bancarias. Haz clic en el botón seguro de abajo para confirmar tu suite antes de que se ocupe.</p>
                        <button className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]">
                          Pagar Reserva Segura <Wallet className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[12px] text-muted font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                      <span>Sirvoy PMS Live Sync</span>
                    </div>
                    <span>Cifrado de Extremo a Extremo</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PMS Integration: Sirvoy (El Motor Blindado) */}
        <section className="py-28 px-6 md:px-10 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, order: 2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6 lg:order-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Database, t: "Sincronización Total", d: "Inventario centralizado. Adiós para siempre al overbooking." },
                  { icon: Globe, t: "Channel Manager", d: "Conexión oficial con Booking, Airbnb, Expedia y Google Hotels." },
                  { icon: Wallet, t: "Pasarelas de Pago", d: "Integración nativa con Stripe, PayPal, Culqi, Niubiz y MercadoPago." },
                  { icon: BarChart3, t: "Reportes en Vivo", d: "Métricas exactas de ocupación, RevPAR y flujo de caja en tiempo real." }
                ].map((item, i) => (
                  <div key={i} className="p-8 glass rounded-[32px] border-white/5 space-y-5 hover:border-accent/30 transition-all group shadow-lg">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-accent/20">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h4 className="text-[18px] font-black uppercase tracking-tight leading-none text-fg">{item.t}</h4>
                    <p className="text-[14px] text-muted leading-relaxed font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 lg:order-2 space-y-8"
            >
              <span className="label-editorial">PMS Certified Specialists</span>
              <h2 className="text-[36px] sm:text-[52px] font-black leading-tight text-fg">
                Especialistas en <span className="text-accent underline decoration-accent/30 underline-offset-8">Sirvoy PMS</span>.
              </h2>
              <p className="text-[18px] text-muted leading-relaxed font-medium">
                No somos una agencia genérica que solo instala plugins. Entendemos la operación hotelera desde adentro. Configuramos toda tu estructura comercial: planes de tarifas, temporadas altas, restricciones de estadía y la conexión perfecta con tu motor de reservas directo.
              </p>
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-5 p-6 glass rounded-3xl border-white/5 hover:border-accent/20 transition-colors shadow">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Zap className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-fg mb-1">Configuración Estratégica de Ingresos</h4>
                    <p className="text-[14px] text-muted font-medium">Estructuramos tus tarifas para maximizar el RevPAR en cada temporada.</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 glass rounded-3xl border-white/5 hover:border-accent/20 transition-colors shadow">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20">
                    <Smartphone className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-fg mb-1">Módulo de Housekeeping en Vivo</h4>
                    <p className="text-[14px] text-muted font-medium">Tu equipo de limpieza y recepción sincronizados al segundo desde el móvil.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Study: Peña Linda Máncora (La Prueba Irrefutable) */}
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
                Ingeniería de Performance en <span className="text-accent underline decoration-accent/30 underline-offset-8">penalindamancora.com</span>
              </h2>
              <p className="text-[18px] text-muted leading-relaxed font-medium">
                Transformamos la presencia digital de Peña Linda Bungalows en Máncora en una máquina autónoma de reservas directas, eliminando la dependencia de comisiones externas y asegurando el 100% de ocupación en temporada alta.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                <a
                  href="https://penalindamancora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center justify-center gap-3 uppercase tracking-widest text-center"
                >
                  Visitar penalindamancora.com <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20una%20web%20hotelera%20como%20la%20de%20Pe%C3%B1a%20Linda%20M%C3%A1ncora."
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
                  { num: "01", title: "Motor Sirvoy Integrado", desc: "Sincronización en tiempo real de tarifas y disponibilidad sin riesgo de overbooking." },
                  { num: "02", title: "Asistente IA por WhatsApp", desc: "Atención automatizada 24/7 que guía a los huéspedes hasta el Hub de pago." },
                  { num: "03", title: "Diseño Premium & Mobile-First", desc: "Interfaz inmersiva orientada a la conversión con fotografías de alta calidad." },
                  { num: "04", title: "+10 Años de Rentabilidad", desc: "Estrategia continua de crecimiento, Meta Ads y fidelización de huéspedes." }
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

          {/* Área de Exhibición: Escritorio y Móvil Lado a Lado sin Superposición */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Browser Window */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 w-full rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.8)] bg-bg group"
            >
              {/* Contenedor Scrollable */}
              <div className="relative h-[550px] bg-bg overflow-y-auto custom-scrollbar">
                <img 
                  src="/penalindamancora-escritorio.png" 
                  alt="Peña Linda Máncora Desktop Interface" 
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>

            {/* Mobile Device Frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 w-full max-w-[340px] mx-auto rounded-[40px] overflow-hidden border-8 border-bg-subtle shadow-[0_30px_100px_rgba(0,0,0,0.9)] bg-bg group flex flex-col"
            >
              {/* Contenedor Scrollable */}
              <div className="relative h-[488px] bg-bg overflow-y-auto custom-scrollbar">
                <img 
                  src="/www.penalindamancora.com_(iPhone 14 Pro Max).png" 
                  alt="Peña Linda Máncora Mobile Booking" 
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* El Discurso del Lápiz / Calculadora de Pérdidas y Retorno (The Pencil Speech ROI Calculator) */}
        <section id="calculadora" className="py-10 md:py-14 px-6 md:px-10 max-w-[1280px] mx-auto border-t border-white/5">
          <div className="glass py-8 px-6 sm:py-10 sm:px-12 rounded-[36px] border-accent/30 bg-gradient-to-b from-accent/[0.05] to-transparent relative overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 bg-accent text-white text-[11px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-xl">
              Calculadora Interactiva de Pérdidas
            </div>

            <div className="max-w-3xl mx-auto text-center mb-10 space-y-3 pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[12px] font-black uppercase tracking-widest">
                <Calculator className="w-4 h-4" /> El Discurso del Lápiz (Alex Dey Style)
              </div>
              <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight leading-none text-fg">
                Descubre Cuánto Dinero le Estás <span className="text-accent underline decoration-accent/30 underline-offset-8">Regalando a las OTAs</span>.
              </h2>
              <p className="text-[16px] text-muted leading-relaxed font-medium">
                Mueve los selectores inferiores según la realidad de tu hotel. Observa la fuga de capital anual y descubre cómo nuestro Plan de Desarrollo Web ($999 USD) se paga solo en tiempo récord.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Sliders Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider 1: Habitaciones */}
                <div className="space-y-3 glass p-5 rounded-2xl border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[15px] font-bold text-fg flex items-center gap-2.5">
                      <Hotel className="w-5 h-5 text-accent" /> Número de Habitaciones:
                    </label>
                    <span className="text-[20px] font-black text-accent bg-accent/10 px-3.5 py-1 rounded-xl border border-accent/20">{rooms}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    value={rooms} 
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[11px] text-muted font-bold">
                    <span>10 Hab.</span>
                    <span>150 Hab.</span>
                  </div>
                </div>

                {/* Slider 2: Tarifa Promedio */}
                <div className="space-y-3 glass p-5 rounded-2xl border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[15px] font-bold text-fg flex items-center gap-2.5">
                      <DollarSign className="w-5 h-5 text-accent" /> Tarifa Promedio por Noche (USD):
                    </label>
                    <span className="text-[20px] font-black text-accent bg-accent/10 px-3.5 py-1 rounded-xl border border-accent/20">${avgRate}</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="500" 
                    value={avgRate} 
                    onChange={(e) => setAvgRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[11px] text-muted font-bold">
                    <span>$30 USD</span>
                    <span>$500 USD</span>
                  </div>
                </div>

                {/* Slider 3: Ocupación Promedio */}
                <div className="space-y-3 glass p-5 rounded-2xl border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[15px] font-bold text-fg flex items-center gap-2.5">
                      <Percent className="w-5 h-5 text-accent" /> Ocupación Promedio Anual:
                    </label>
                    <span className="text-[20px] font-black text-accent bg-accent/10 px-3.5 py-1 rounded-xl border border-accent/20">{occRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="95" 
                    value={occRate} 
                    onChange={(e) => setOccRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[11px] text-muted font-bold">
                    <span>30%</span>
                    <span>95%</span>
                  </div>
                </div>
              </div>

              {/* Live ROI Results Display */}
              <div className="lg:col-span-5 space-y-4">
                <div className="glass p-6 rounded-2xl border-red-500/30 bg-red-500/[0.05] space-y-1.5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[9px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Pérdida Actual
                  </div>
                  <p className="text-[13px] text-muted font-bold uppercase tracking-wider">Comisiones Pagadas a OTAs al Año (Aprox. 18%):</p>
                  <h3 className="text-[28px] sm:text-[36px] font-black text-red-500 leading-none">
                    ${calculations.commissionsPaid.toLocaleString()} <span className="text-[16px] font-bold text-red-400">USD</span>
                  </h3>
                  <p className="text-[12px] text-muted pt-0.5">Dinero que pierdes por no tener un motor de reservas directas potente.</p>
                </div>

                <div className="glass p-6 rounded-2xl border-green-500/30 bg-green-500/[0.05] space-y-1.5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[9px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Tu Ganancia
                  </div>
                  <p className="text-[13px] text-muted font-bold uppercase tracking-wider">Ahorro Neto con Chamba Digital (0% Comisiones):</p>
                  <h3 className="text-[28px] sm:text-[36px] font-black text-green-400 leading-none">
                    ${calculations.netSavingsFirstYear.toLocaleString()} <span className="text-[16px] font-bold text-green-300">USD</span>
                  </h3>
                  <p className="text-[12px] text-muted pt-0.5">Descontando la inversión única de $999 USD en tu nueva web premium.</p>
                </div>

                <div className="glass p-6 rounded-2xl border-accent/30 bg-accent/[0.08] space-y-1.5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent/20 text-accent text-[9px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Velocidad ROI
                  </div>
                  <p className="text-[13px] text-muted font-bold uppercase tracking-wider">Tiempo de Retorno de Inversión (Plan $999 USD):</p>
                  <h3 className="text-[28px] sm:text-[36px] font-black text-accent leading-none flex items-center gap-2.5">
                    <Clock className="w-7 h-7 text-accent animate-spin" style={{ animationDuration: '10s' }} /> ¡{calculations.daysToROI} Días!
                  </h3>
                  <p className="text-[12px] text-muted pt-0.5">Tu nueva web se paga sola en menos de {calculations.daysToROI} días con las reservas directas generadas.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/51904060670?text=Hola,%20he%20calculado%20en%20vuestra%20web%20que%20pago%20aprox%20$${calculations.commissionsPaid.toLocaleString()}%20USD%20en%20comisiones%20al%20a%C3%B1o.%20Quiero%20contratar%20el%20Plan%20de%20$999%20USD%20para%20ahorrarme%20ese%20dinero.`}
                target="_blank"
                className="inline-flex items-center gap-3 bg-accent text-white px-6 py-4 sm:px-8 sm:py-4.5 rounded-xl font-black text-[15px] sm:text-[16px] shadow-[0_20px_40px_rgba(59,130,246,0.4)] uppercase tracking-widest group"
              >
                Reclamar mi Ahorro de ${calculations.netSavingsFirstYear.toLocaleString()} USD <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </section>

        {/* Portfolio / Trust */}
        <section className="py-28 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1280px] mx-auto text-center">
            <span className="label-editorial mx-auto">Experiencia Comprobada</span>
            <h2 className="text-[32px] sm:text-[48px] font-black mb-16 text-fg">Hoteles que ya están <span className="text-accent">creciendo</span>.</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Peña Linda Bungalows", detail: "Marketing + PMS + IA" },
                { name: "Fundo Achamaqui", detail: "Web + Estrategia" },
                { name: "Punta Negritos", detail: "Lanzamiento 360°" },
                { name: "Sauce Hotel Boutique", detail: "Optimización PMS" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.5)" }}
                  className="p-8 glass rounded-[32px] border-white/5 flex flex-col items-center justify-center group shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors border border-accent/20">
                    <Hotel className="w-7 h-7" />
                  </div>
                  <span className="text-[16px] font-black text-fg uppercase tracking-tight leading-tight mb-1">{item.name}</span>
                  <span className="text-[11px] font-bold text-accent uppercase tracking-widest">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA Section: El Cierre Maestro (Doble Alternativa Alex Dey Style) */}
        <section className="py-36 px-6 md:px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[180px] rounded-full -z-10 pointer-events-none" />
          
          <div className="max-w-[1024px] mx-auto space-y-12">
            <div className="space-y-4">
              <span className="label-editorial mx-auto">Toma el Control de tu Negocio</span>
              <h2 className="text-[40px] sm:text-[64px] font-black leading-tight text-fg">
                ¿Cómo Prefieres Empezar a <span className="text-accent underline decoration-accent/30 underline-offset-8">Escalar tu Hotel</span>?
              </h2>
              <p className="text-[18px] sm:text-[22px] text-muted max-w-[800px] mx-auto font-medium leading-relaxed">
                Elige la opción que mejor se adapte a tu momento actual. Ambas te garantizan eliminar comisiones y potenciar tu venta directa desde el primer mes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch text-left pt-6">
              {/* Option 1: Auditoría */}
              <div className="glass p-10 rounded-[36px] border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between space-y-8 shadow-2xl group">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-[26px] font-black text-fg leading-tight">Opción 1: Auditoría Estratégica Gratuita</h3>
                  <p className="text-[16px] text-muted leading-relaxed font-medium">
                    Habla con un especialista en hospitalidad. Analizamos la configuración actual de tu PMS, tu sitio web y tus procesos de venta para detectar fugas de capital sin ningún compromiso.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/51904060670?text=Hola,%20quisiera%20agendar%20una%20auditor%C3%ADa%20digital%20gratuita%20para%20mi%20hotel."
                  target="_blank"
                  className="w-full bg-white/10 hover:bg-white/15 text-fg py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest flex items-center justify-center gap-3 transition-colors border border-white/10 text-center"
                >
                  Agendar Auditoría Gratis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              {/* Option 2: Contratar Plan */}
              <div className="glass p-10 rounded-[36px] border-accent/40 hover:border-accent transition-all flex flex-col justify-between space-y-8 shadow-[0_25px_50px_rgba(59,130,246,0.2)] group bg-gradient-to-b from-accent/[0.08] to-transparent">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[26px] font-black text-fg leading-tight">Opción 2: Acción Inmediata (Plan $999 USD)</h3>
                  <p className="text-[16px] text-muted leading-relaxed font-medium">
                    Contrata hoy mismo el Plan de Desarrollo Web para Hoteles. Incluye sitio web premium, integración de Sirvoy PMS, agente IA de reservas y 2500 créditos mensuales en Google Flow.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02, shadow: "0 20px 40px rgba(59,130,246,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/51904060670?text=Hola,%20quiero%20contratar%20el%20Plan%20Desarrollo%20Web%20para%20Hoteles%20de%20$999%20USD%20para%20empezar%20a%20vender%20sin%20comisiones."
                  target="_blank"
                  className="w-full bg-accent text-white py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-transform text-center"
                >
                  Contratar Plan $999 USD <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-[12px] font-black uppercase tracking-[0.3em] text-muted/70 pt-8">
              <span>Sirvoy Certified Partner</span>
              <span className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
              <span>AI Implementation Specialists</span>
            </div>
          </div>
        </section>
      </main>

      <ChambaFooter />
    </div>
  );
};
export default HospitalitySolutions;
