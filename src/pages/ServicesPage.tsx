import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, WhatsAppIcon, ChambaFooter } from '../App';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FreeConsultationModal } from '../components/FreeConsultationModal';
import { 
  Code2, 
  Bot, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  Database,
  Cpu,
  Globe,
  ShoppingCart,
  Building2,
  Briefcase,
  CheckCircle2,
  RefreshCw,
  Server,
  Sparkles,
  Layers,
  Shield,
  Phone
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [bookingModal, setBookingModal] = React.useState({
    isOpen: false,
    topic: "Auditoría Técnica y Plan WaaS (15-30 min)",
    callType: "meeting_15_30min" as "call_5min" | "meeting_15_30min",
  });

  const handleOpenBooking = (topic: string, callType: "call_5min" | "meeting_15_30min" = "meeting_15_30min") => {
    setBookingModal({
      isOpen: true,
      topic,
      callType,
    });
  };
  const waasPillars = [
    {
      title: "Web Tradicional WaaS",
      price: "$49",
      period: "/ mes",
      badge: "Plan Inicial",
      icon: Code2,
      productId: "70f62d4c-2cd9-49ad-9628-24a04d462cc0",
      desc: "Web a medida para profesionales, tiendas, clínicas y negocios locales. Sin inversión inicial masiva.",
      features: [
        "Código 100% propio (sin plantillas)",
        "Actualizaciones de contenido incluidas",
        "Mantenimiento técnico continuo",
        "Infraestructura Cloud de Alto Rendimiento incluida",
        "Certificado SSL & Dominio configurado",
        "Soporte rápido por WhatsApp",
        "Promo semestral: $245 (6 meses)"
      ]
    },
    {
      title: "Web App Advanced",
      price: "$99",
      period: "/ mes",
      badge: "Más Popular",
      icon: Layers,
      popular: true,
      productId: "b78ef21a-1fdc-4fb6-b411-f4eb46f3fe96",
      desc: "Para empresas que necesitan panel de administración, catálogo dinámico o API REST.",
      features: [
        "Base de datos & Panel Admin dinámico",
        "Integración de Pasarelas y APIs",
        "Cambios e iteraciones semanales",
        "Infraestructura Cloud + Backups incluidos",
        "Optimización de velocidad y SEO",
        "Soporte prioritario directo",
        "Promo semestral: $495 (6 meses)"
      ]
    },
    {
      title: "Web App con IA",
      price: "$500",
      period: "/ mes",
      badge: "Empresarial & IA",
      icon: Sparkles,
      productId: "ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de",
      desc: "Para empresas que buscan automatizar flujos de trabajo e implementar agentes de Inteligencia Artificial.",
      features: [
        "Agentes de IA y Asistentes 24/7",
        "Automatización de procesos operativos",
        "Integración con WhatsApp y CRMs",
        "Infraestructura Cloud Dedicada",
        "Monitoreo constante y respaldos",
        "Consultoría y evolución mensual"
      ]
    }
  ];

  const categories = [
    {
      title: "Desarrollo Web & Apps a Medida",
      icon: Code2,
      desc: "Plataformas web ultra rápidas y personalizadas construidas con React y Vite.",
      features: ["React / Vite", "Mobile First Strategy", "SEO Técnico & Estructurado", "Paneles de Control Custom"]
    },
    {
      title: "Inteligencia Artificial Operativa",
      icon: Bot,
      desc: "Asistentes de atención y agentes IA para automatizar la captación y gestión de clientes.",
      features: ["Integración WhatsApp Webhooks", "Agentes de Venta 24/7", "Procesamiento de Documentos", "Flujos Inteligentes"]
    },
    {
      title: "Infraestructura Cloud & Rendimiento",
      icon: Server,
      desc: "Servidores cloud de alto rendimiento con 99.9% de uptime y soporte activo.",
      features: ["Infraestructura Cloud Optimizada", "Bases de Datos PostgreSQL / Redis", "Certificados SSL Automáticos", "Uptime de 99.9%"]
    },
    {
      title: "Medición & Analytics de Conversión",
      icon: BarChart3,
      desc: "Configuración precisa de métricas para entender el rendimiento de tu plataforma.",
      features: ["Google Analytics 4", "Meta Pixel & Conversions API", "Eventos de Venta Personalizados", "Reportes Claros"]
    }
  ];

  const niches = [
    { title: "Hoteles & Hospedaje", path: "/hotels", icon: Building2, desc: "Webs oficiales y motores de reserva directa para eliminar comisiones de OTAs." },
    { title: "E-Commerce & Marcas", path: "/ecommerce", icon: ShoppingCart, desc: "Catálogos interactivos diseñados para procesar pedidos por WhatsApp o pasarelas." },
    { title: "Servicios & B2B", path: "/servicebusinesses", icon: Briefcase, desc: "Captura de clientes potenciales y agendamiento automático de reuniones." }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <SEO 
        title="Servicios de Desarrollo Web y Automatización | Chamba Digital"
        description="Planes WaaS desde $49/mes. Desarrollo web a medida, e-commerce, automatización con IA y consultoría digital."
        keywords="Desarrollo Web Peru, WaaS Web as a Service, Automatización IA, Consultoría Digital, Chamba Digital Servicios"
        ogTitle="Servicios de Desarrollo Web y Automatización | Chamba Digital"
        ogDescription="Planes WaaS desde $49/mes. Web a medida, e-commerce, automatización y consultoría digital."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/servicios"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://chamba.digital/servicios#webpage",
              "url": "https://chamba.digital/servicios",
              "name": "Servicios de Desarrollo Web y Automatización | Chamba Digital",
              "isPartOf": { "@id": "https://chamba.digital/#website" }
            },
            {
              "@type": "Service",
              "@id": "https://chamba.digital/servicios#service",
              "name": "Servicios de Desarrollo Web y Automatización",
              "provider": { "@id": "https://chamba.digital/#organization" },
              "description": "Planes WaaS desde $49/mes. Desarrollo web a medida, e-commerce, automatización con IA.",
              "category": "Web Development"
            }
          ]
        }}
      />
      <ChambaNavbar />
      
      <main className="pt-[90px] pb-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-6 text-center max-w-[1000px] mx-auto overflow-hidden">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-[circle,rgba(37,99,235,0.06)_0%,transparent_70%] blur-[80px] -z-10" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-editorial mx-auto">Modelo Web as a Service</span>
            <h1 className="text-[38px] sm:text-[56px] md:text-[68px] font-black tracking-tight leading-[1.05] mb-6 text-slate-900">
              Servicios Web por Suscripción <br />
              <span className="text-accent">Sin Inversión Inicial Masiva</span>
            </h1>
            <p className="text-slate-600 text-[16px] md:text-[19px] max-w-[720px] mx-auto leading-relaxed font-medium mb-8">
              Tu sitio o aplicación web siempre al día. Nos encargamos del desarrollo, código a medida, mantenimiento y actualizaciones continuas por una tarifa mensual fija.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-[12px] font-bold text-slate-700">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Cambios Ilimitados</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>Hosting en Railway desde $5/mes</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                <Zap className="w-4 h-4 text-cta" />
                <span>Sin Contrato de Permanencia</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* WaaS Pricing Tiers */}
        <section className="px-6 md:px-10 max-w-[1200px] mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="label-editorial mx-auto">Planes & Tarifas</span>
            <h2 className="text-[28px] md:text-[40px] font-black tracking-tight text-slate-900">
              Selecciona el plan ideal <span className="text-accent">para tu etapa</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {waasPillars.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 sm:p-6 rounded-2xl border bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full ${
                  plan.popular
                    ? "border-accent/40 ring-1 ring-accent/10"
                    : "border-slate-200"
                }`}
              >
                {/* Popular indicator */}
                {plan.popular && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">Recomendado</span>
                  </div>
                )}

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${plan.popular ? "bg-accent/10 text-accent" : "bg-slate-100 text-slate-600"}`}>
                    <plan.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black tracking-tight text-slate-900">{plan.title}</h3>
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">{plan.badge}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[32px] sm:text-[36px] font-black tracking-tighter text-slate-900 leading-none">{plan.price}</span>
                  <span className="text-[12px] font-medium text-slate-400">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{plan.desc}</p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 mt-0.5 shrink-0" />
                      <span className="text-[12px] font-medium text-slate-700 leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenBooking(`Plan ${plan.title} (${plan.price}${plan.period})`, "meeting_15_30min")}
                    className="w-full py-3 px-4 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-center bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                    Agendar Videollamada (15-30 min)
                  </motion.button>
                  <div className="flex items-center justify-between pt-1 px-1">
                    <button
                      onClick={() => handleOpenBooking(`Consulta Express: ${plan.title}`, "call_5min")}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3 text-accent" />
                      Llamada express (5 min)
                    </button>
                    <a
                      href={`https://wa.me/51904060670?text=Hola!%20Me%20interesa%20el%20plan%20WaaS%20${encodeURIComponent(plan.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
                    >
                      <WhatsAppIcon className="w-3 h-3 text-emerald-600" />
                      WhatsApp directo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Capabilities */}
        <section className="px-6 md:px-10 max-w-[1200px] mx-auto mb-24">
          <div className="text-center mb-16">
            <span className="label-editorial mx-auto">Nuestra Especialidad</span>
            <h2 className="text-[28px] md:text-[40px] font-black tracking-tight text-slate-900">
              Capacidades Técnicas <span className="text-accent">a tu Disposición</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="interactive-card bg-white p-8 md:p-10 rounded-[28px] border border-slate-200 shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                  <cat.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-[22px] font-extrabold mb-3 text-slate-900 tracking-tight">{cat.title}</h3>
                <p className="text-slate-600 text-[14px] leading-relaxed mb-6 font-medium">{cat.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  {cat.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-2 text-[12px] font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Niche Solutions */}
        <section className="py-20 px-6 md:px-10 bg-slate-50 border-y border-slate-200 mb-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <span className="label-editorial mx-auto">Sistemas Especializados</span>
              <h2 className="text-[28px] md:text-[40px] font-black tracking-tight text-slate-900 mb-3">
                Soluciones por <span className="text-accent">Industria</span>
              </h2>
              <p className="text-slate-600 text-[15px] font-medium max-w-[600px] mx-auto">
                Adaptamos la arquitectura web a los objetivos específicos de cada sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {niches.map((niche, i) => (
                <Link to={niche.path} key={i} className="block group">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="interactive-card bg-white p-8 rounded-[24px] border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-slate-100 group-hover:bg-blue-50 rounded-xl flex items-center justify-center mb-6 transition-colors">
                        <niche.icon className="w-6 h-6 text-slate-700 group-hover:text-accent transition-colors" />
                      </div>
                      <h4 className="text-[18px] font-extrabold mb-3 text-slate-900 group-hover:text-accent transition-colors">{niche.title}</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed mb-6 font-medium">{niche.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-accent text-[12px] font-extrabold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      Ver Detalles <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-6 text-center max-w-[850px] mx-auto">
          <span className="label-editorial mx-auto">Consulta Directa</span>
          <h2 className="text-[32px] md:text-[48px] font-black tracking-tight mb-4 text-slate-900">
            ¿Listo para lanzar tu web <br /> con <span className="text-accent">suscripción WaaS</span>?
          </h2>
          <p className="text-slate-600 text-[16px] mb-10 max-w-[600px] mx-auto font-medium">
            Cuéntanos qué necesitas y te responderemos en menos de 2 horas con la mejor propuesta para tu proyecto.
          </p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://wa.me/51904060670?text=Hola!%20Quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20WaaS."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3.5 rounded-lg font-black text-[13px] uppercase tracking-wider shadow-md"
          >
            <WhatsAppIcon className="w-5 h-5" /> Hablar con un Asesor por WhatsApp
          </motion.a>

          {/* Intellectual Property Disclaimer */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 text-center max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-slate-500 dark:text-muted/70 text-[11px] mb-3">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold tracking-wider uppercase">Aviso de Propiedad Intelectual</span>
            </div>
            <p className="text-[12px] md:text-[13px] text-slate-500 dark:text-muted/80 leading-relaxed font-medium">
              Conforme a las prácticas comerciales nacionales e internacionales, <strong>CHAMBA</strong> se reserva su propiedad intelectual respecto a estrategias, procesos y desarrollos, bien sean estos referidos a marketing, secretos y procesos comerciales, datos, metodologías operativas, estructuras de campañas, desarrollo de tecnologías propias y actividades afines a nuestro propósito comercial.
            </p>
          </div>
        </section>
      </main>

      <FreeConsultationModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal(prev => ({ ...prev, isOpen: false }))}
        defaultTopic={bookingModal.topic}
        defaultCallType={bookingModal.callType}
      />

      <ChambaFooter />
    </div>
  );
};

export default ServicesPage;
