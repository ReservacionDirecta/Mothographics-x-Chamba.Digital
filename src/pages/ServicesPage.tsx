import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, Logo, WhatsAppIcon, ChambaFooter } from '../App';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Bot, 
  TrendingUp, 
  Palette, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  Database,
  Cpu,
  MonitorPlay,
  Globe,
  ShoppingCart,
  Building2,
  Briefcase
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const categories = [
    {
      title: "Desarrollo Web de Alto Rendimiento",
      icon: Code2,
      desc: "Ingeniería limpia, ultra rápida y optimizada para buscadores. Creamos experiencias que no solo se ven bien, sino que venden.",
      features: ["React / Next.js", "Liquid Glass Design", "SEO Técnico Avanzado", "Mobile First Strategy"]
    },
    {
      title: "Agentes e IA Avanzada",
      icon: Bot,
      desc: "Automatizamos tu atención al cliente y ventas con agentes inteligentes que entienden a tu prospecto 24/7.",
      features: ["Chatbots Cognitivos", "Automatización de WhatsApp", "Análisis de Datos con IA", "Entrenamiento de Modelos Propios"]
    },
    {
      title: "Automatización de Negocios",
      icon: Zap,
      desc: "Eliminamos tareas manuales. Conectamos tu CRM, pagos y logística en un ecosistema fluido.",
      features: ["Integración de APIs", "Automatización de CRMs", "Flujos de Trabajo sin Código", "Sistemas de Pago Globales"]
    },
    {
      title: "Data & Analytics de Conversión",
      icon: BarChart3,
      desc: "Si no se puede medir, no se puede mejorar. Implementamos tracking de precisión quirúrgica.",
      features: ["Meta Pixel & GA4", "Tracking Server-Side", "Dashboards de ROI", "Atribución de Ventas"]
    }
  ];

  const niches = [
    { title: "Hoteles & Hospitality", path: "/hotels", icon: Building2, desc: "Sistemas de reserva directos y chatbots de reserva." },
    { title: "E-Commerce de Escala", path: "/ecommerce", icon: ShoppingCart, desc: "Tiendas diseñadas para procesar miles de órdenes." },
    { title: "Servicios & B2B", path: "/servicebusinesses", icon: Briefcase, desc: "Generación de leads y agendamiento automático." }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      
      <main className="pt-[100px] pb-24">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center max-w-[1000px] mx-auto overflow-hidden">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[80px] -z-10" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-editorial mx-auto">Nuestro Arsenal Técnico</span>
            <h1 className="text-[40px] md:text-[72px] font-black tracking-tighter leading-[0.9] mb-8">
              Ingeniería Digital <br /> para <span className="text-accent">Dominar Mercados</span>.
            </h1>
            <p className="text-muted text-[17px] md:text-[20px] max-w-[700px] mx-auto leading-relaxed mb-12">
              No hacemos simples páginas web. Construimos infraestructuras digitales de alto impacto diseñadas para escalar tu facturación y automatizar tu operación.
            </p>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="px-6 md:px-10 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[40px] border-white/5 hover:border-accent/20 transition-all group"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <cat.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-[24px] font-black mb-4 tracking-tight">{cat.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed mb-8">{cat.desc}</p>
              <ul className="grid grid-cols-2 gap-4">
                {cat.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2 text-[12px] font-bold text-fg/80">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        {/* Niche Solutions */}
        <section className="py-24 px-6 md:px-10 bg-accent/[0.03] border-y border-white/5">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <span className="label-editorial mx-auto">Soluciones Verticales</span>
              <h2 className="text-[32px] md:text-[48px] font-black tracking-tight mb-4">Especialización por <span className="text-accent">Industria</span></h2>
              <p className="text-muted text-[16px]">Infraestructura optimizada para modelos de negocio específicos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niches.map((niche, i) => (
                <Link to={niche.path} key={i}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass p-8 rounded-[32px] border-white/10 hover:border-accent/40 transition-all h-full flex flex-col"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                      <niche.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-[18px] font-black mb-3">{niche.title}</h4>
                    <p className="text-[13px] text-muted leading-relaxed mb-6 flex-grow">{niche.desc}</p>
                    <div className="flex items-center gap-2 text-accent text-[12px] font-black uppercase tracking-widest">
                      Ver Solución <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Horizontal Scroll/Marquee feel */}
        <section className="py-20 overflow-hidden opacity-30">
          <div className="flex gap-20 items-center justify-center grayscale">
            {[Code2, Database, Cpu, MonitorPlay, Globe, Zap, Bot, BarChart3].map((Icon, i) => (
              <Icon key={i} className="w-12 h-12" />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full border border-green-500/20 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest">Capacidad para 2 nuevos proyectos</span>
          </div>
          <h2 className="text-[32px] md:text-[56px] font-black tracking-tight mb-8">
            ¿Listo para construir <br /> tu <span className="text-accent">ventaja competitiva</span>?
          </h2>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670?text=Hola!%20Quiero%20hablar%20de%20servicios%20avanzados."
            className="inline-flex items-center gap-4 bg-gradient-to-r from-cta to-cta-hover text-white px-12 py-6 rounded-2xl font-black text-[16px] shadow-2xl uppercase tracking-widest cta-pulse"
          >
            <WhatsAppIcon className="w-6 h-6" /> Iniciar Consultoría Gratis
          </motion.a>
        </section>
      </main>

      <ChambaFooter />
    </div>
  );
};

export default ServicesPage;
