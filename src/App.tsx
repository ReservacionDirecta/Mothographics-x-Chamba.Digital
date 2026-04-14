/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Palette, 
  Zap, 
  TrendingUp, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  Calendar,
  ExternalLink
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] px-6 md:px-10 flex items-center justify-between border-b border-glass-border bg-black/80 backdrop-blur-[10px]">
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 font-extrabold text-[16px] md:text-[18px] tracking-[-1px] cursor-default"
    >
      Mothographics <span className="text-accent">×</span> Chamba Digital
    </motion.div>
    <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium text-muted uppercase tracking-[1px]">
      <a href="#oportunidad" className="hover:text-fg transition-colors relative group">
        La Oportunidad
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
      </a>
      <a href="#servicios" className="hover:text-fg transition-colors relative group">
        Servicios y Precios
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
      </a>
      <a href="#modelo" className="hover:text-fg transition-colors relative group">
        Modelo
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
      </a>
    </div>
    <motion.a 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="https://wa.me/yournumber" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-fg text-bg px-4 md:px-5 py-2 md:py-2.5 rounded-[4px] text-[10px] md:text-[12px] font-bold uppercase cursor-pointer transition-colors hover:bg-white/90"
    >
      Iniciar Piloto
    </motion.a>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-[80vh] flex flex-col items-start justify-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
    <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="z-10"
    >
      <span className="label-editorial">
        🤝 Propuesta de Alianza Estratégica
      </span>
      <h1 className="text-[40px] md:text-[64px] max-w-[800px] leading-tight md:leading-[1]">
        No solo creamos contenido. Generamos clientes.
      </h1>
      <h2 className="text-[16px] md:text-[18px] text-muted font-normal leading-[1.5] max-w-[500px] mb-8">
        Unimos los 25 años de excelencia visual de Mothographics con los sistemas de tráfico, performance y desarrollo de Chamba Digital.
      </h2>
      <motion.a 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        whileHover={{ x: 5 }}
        href="#oportunidad" 
        className="group inline-flex items-center gap-2 text-[14px] font-bold text-fg hover:text-accent transition-colors"
      >
        Ver Modelo de Colaboración
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </motion.div>
  </section>
);

const Opportunity = () => (
  <section id="oportunidad" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-[30px] items-start">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass p-6 md:p-8 rounded-[12px]"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[24px] font-bold mb-4 tracking-[-0.5px] text-fg"
        >
          El Ecosistema Perfecto.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[14px] text-muted leading-[1.6] mb-6"
        >
          Guido, tu trabajo ya genera la base perfecta: marcas con una identidad visual impecable y contenido de alto nivel. Lo único que falta en la ecuación para que tus clientes escalen es <strong className="text-fg font-medium">inyectar tráfico calificado y sistemas de conversión.</strong>
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-[8px] transition-colors cursor-default"
          >
            <h4 className="text-[11px] uppercase text-accent font-bold mb-2">Mothographics</h4>
            <p className="text-[12px] text-[#ccc]">Fotografía, Diseño, Branding y Contenido (El Arte)</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-[8px] transition-colors cursor-default"
          >
            <h4 className="text-[11px] uppercase text-accent font-bold mb-2">Chamba Digital</h4>
            <p className="text-[12px] text-[#ccc]">Ads, Desarrollo Web, Chatbots IA (La Ciencia)</p>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-start gap-4 p-4 glass rounded-[12px] cursor-default"
        >
          <div className="p-2 bg-white/10 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-[14px] font-bold">Escalabilidad inmediata</p>
            <p className="text-[12px] text-muted">Transformamos el arte en resultados medibles.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const PricingCard = ({ title, description, items, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.4)" }}
    className="glass p-6 rounded-[12px] flex flex-col h-full transition-colors group"
  >
    <h3 className="text-[16px] font-bold mb-3 flex items-center gap-2 group-hover:text-accent transition-colors">
      <Zap className="w-4 h-4 text-accent" />
      {title}
    </h3>
    
    <ul className="space-y-4 flex-grow mb-6">
      {items.map((item: any, idx: number) => (
        <li key={idx} className="border-b border-white/5 pb-3 last:border-0">
          <div className="flex justify-between items-start gap-4 mb-1">
            <span className="text-[13px] font-medium text-fg">{item.name}</span>
            <span className="text-[14px] font-bold text-accent whitespace-nowrap">{item.price}</span>
          </div>
          {item.details && (
            <p className="text-[11px] text-muted leading-relaxed">
              {item.details}
            </p>
          )}
        </li>
      ))}
    </ul>
    
    <p className="text-[11px] text-muted italic mt-auto border-t border-white/5 pt-4">{description}</p>
  </motion.div>
);

const Services = () => (
  <section id="servicios" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">Menú de Servicios</span>
      <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">Upsells para tus clientes</h2>
      <p className="text-muted max-w-xl mx-auto text-[14px]">Sistemas de alto impacto diseñados para escalar resultados de forma inmediata.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PricingCard 
        title="El Motor de Tráfico (Meta Ads)"
        description="Ideal para activar ventas rápidas (Ej: Galería de Arte)."
        delay={0.1}
        items={[
          { 
            name: "Setup Inicial", 
            price: "$150 USD", 
            details: "Pago único. Incluye configuración de Business Manager, Pixel, eventos, públicos y campañas." 
          },
          { 
            name: "Gestión Mensual", 
            price: "Desde $150 USD/mes", 
            details: "Optimización y escalado continuo." 
          }
        ]}
      />
      <PricingCard 
        title="El Ecosistema Web (Desarrollo)"
        description="Sistemas robustos de alta conversión."
        delay={0.2}
        items={[
          { name: "Landing / One Page", price: "Desde $280 USD" },
          { name: "Web Corporativa", price: "Desde $850 USD" },
          { name: "Ecommerce", price: "Desde $1,100 USD" },
          { name: "Web App a medida", price: "Desde $2,500 USD" }
        ]}
      />
      <PricingCard 
        title="La Automatización (Sistemas)"
        description="Atención y ventas 24/7."
        delay={0.3}
        items={[
          { name: "Chatbots de Ventas con IA", price: "Desde $300 USD" },
          { name: "Integraciones a medida", price: "Desde $400 USD" },
          { name: "Plataformas E-learning", price: "Desde $600 USD" }
        ]}
      />
    </div>
  </section>
);

const BusinessModel = () => (
  <section id="modelo" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01 }}
      className="glass p-6 md:p-10 rounded-[12px] transition-transform"
    >
      <h2 className="text-[24px] font-bold mb-6 tracking-[-0.5px]">¿Cómo ganamos todos?</h2>
      <p className="text-[14px] text-muted leading-[1.6] mb-8 max-w-[600px]">
        El objetivo es que escales la facturación por cliente sin sumar horas a tu carga operativa. Operamos bajo un <strong className="text-fg">Modelo Híbrido:</strong>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ x: 5 }} className="space-y-3 cursor-default">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Para Ads</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Chamba Digital maneja una tarifa plana preferencial para tu agencia ($150). Tú defines el precio final al cliente y el margen superior es tuyo.
          </p>
        </motion.div>
        <motion.div whileHover={{ x: 5 }} className="space-y-3 cursor-default">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Para Web y Sistemas</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Proyectos cotizados directamente por Chamba Digital con un esquema de comisión para Mothographics por derivación, o bajo formato "Marca Blanca".
          </p>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="min-h-[100px] py-8 md:py-0 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 border-t border-glass-border bg-white/[0.02]">
    <div className="flex flex-col gap-1 text-center md:text-left">
      <p className="text-[14px] font-bold">Próximo Paso: Piloto Galería Arte Urbano</p>
      <span className="text-[12px] text-muted">Validemos la maquinaria en 2 semanas antes de escalar.</span>
    </div>
    
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[30px]">
      <div className="text-[11px] text-muted italic">Por Yosward Ríos - Chamba Digital</div>
      <motion.a 
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-accent text-white px-8 py-4 rounded-[8px] font-bold text-[14px] transition-all w-full md:w-auto text-center"
      >
        Agendar Llamada de Inicio
      </motion.a>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar />
      <main className="pt-[70px]">
        <Hero />
        <Opportunity />
        <Services />
        <BusinessModel />
      </main>
      <Footer />
    </div>
  );
}
