import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, WhatsAppIcon, ChambaFooter } from '../App';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
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
  Layers
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const waasPillars = [
    {
      title: "Web Tradicional WaaS",
      price: "$49.99",
      period: "/ mes",
      badge: "Plan Inicial",
      icon: Code2,
      productId: "70f62d4c-2cd9-49ad-9628-24a04d462cc0",
      desc: "Web a medida para profesionales, tiendas, clínicas y negocios locales. Sin inversión inicial masiva.",
      features: [
        "Código 100% propio (sin plantillas)",
        "Cambios ilimitados de contenido",
        "Mantenimiento técnico continuo",
        "Despliegue en Railway (desde $5/mes a tu cuenta)",
        "Certificado SSL & Dominio configurado",
        "Soporte rápido por WhatsApp"
      ]
    },
    {
      title: "Web App Advanced",
      price: "$99.99",
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
        "Despliegue escalable en Railway",
        "Optimización de velocidad y SEO",
        "Soporte prioritario directo"
      ]
    },
    {
      title: "Web App con IA",
      price: "$599.99",
      period: "/ mes",
      badge: "Empresarial & IA",
      icon: Sparkles,
      productId: "ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de",
      desc: "Para empresas que buscan automatizar flujos de trabajo e implementar agentes de Inteligencia Artificial.",
      features: [
        "Agentes de IA y Asistentes 24/7",
        "Automatización de procesos operativos",
        "Integración con WhatsApp y CRMs",
        "Servidores privados y bases vectoriales",
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
      title: "Arquitectura Cloud & Railway",
      icon: Server,
      desc: "Despliegue seguro en servidores cloud de alto rendimiento a un costo accesible.",
      features: ["Despliegue en Railway desde $5/mes", "Bases de Datos PostgreSQL / Redis", "Certificados SSL Automáticos", "Uptime de 99.9%"]
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {waasPillars.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`interactive-card p-8 rounded-[28px] border flex flex-col justify-between transition-all ${
                  plan.popular
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xl relative"
                    : "bg-white text-slate-900 border-slate-200 shadow-lg hover:shadow-xl"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      plan.popular ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-700"
                    }`}>
                      {plan.badge}
                    </span>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? "text-amber-400" : "text-accent"}`} />
                  </div>

                  <h3 className={`text-[22px] font-black tracking-tight mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
                    {plan.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed mb-6 font-medium ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                    {plan.desc}
                  </p>

                  <div className="mb-8 pb-6 border-b border-slate-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-[44px] font-black tracking-tight ${plan.popular ? "text-amber-400" : "text-accent"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-[14px] font-bold ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-[13px] font-medium leading-normal">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-amber-400" : "text-emerald-600"}`} />
                        <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ productId: plan.productId }),
                        });
                        const data = await res.json();
                        if (data.url) window.location.href = data.url;
                        else window.open(`https://wa.me/51904060670?text=Hola!%20Me%20interesa%20el%20plan%20WaaS%20${encodeURIComponent(plan.title)}.`, "_blank");
                      } catch (e) {
                        window.open(`https://wa.me/51904060670?text=Hola!%20Me%20interesa%20el%20plan%20WaaS%20${encodeURIComponent(plan.title)}.`, "_blank");
                      }
                    }}
                    className={`w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-black text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer text-center leading-tight ${
                      plan.popular
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md"
                        : "bg-accent hover:bg-accent/90 text-white shadow-md"
                    }`}
                  >
<Zap className="w-4 h-4" />
                Suscripción Polar
                  </button>

                  <a
                    href={`https://wa.me/51904060670?text=Hola!%20Me%20interesa%20el%20plan%20WaaS%20${encodeURIComponent(plan.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 rounded-xl font-bold text-[12px] text-center flex items-center justify-center gap-2 transition-colors ${
                      plan.popular ? "text-slate-300 hover:text-white bg-slate-800" : "text-slate-700 hover:text-slate-900 bg-slate-100"
                    }`}
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                    O consulta por WhatsApp
                  </a>
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
        </section>
      </main>

      <ChambaFooter />
    </div>
  );
};

export default ServicesPage;
