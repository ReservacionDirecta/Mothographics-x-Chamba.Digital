/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Palette, 
  Zap, 
  TrendingUp, 
  Globe, 
  CheckCircle2, 
  MessageSquare, 
  Calendar,
  ExternalLink,
  X,
  Info
} from "lucide-react";

const Modal = ({ isOpen, onClose, title, content }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[500px] glass p-8 rounded-[16px] border-accent/20 shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Info className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-[20px] font-bold tracking-tight">{title}</h3>
          </div>
          
          <div className="space-y-4 text-[14px] text-muted leading-relaxed">
            {content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full mt-8 bg-accent text-white py-3 rounded-[8px] font-bold text-[14px]"
          >
            Entendido
          </motion.button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

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
      <a href="#portafolio" className="hover:text-fg transition-colors relative group">
        Portafolio
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
      href="https://wa.me/51904060670" 
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
        No solo creamos contenido. Generamos clientes en todo el Perú.
      </h1>
      <h2 className="text-[16px] md:text-[18px] text-muted font-normal leading-[1.5] max-w-[500px] mb-8">
        Unimos los 25 años de excelencia visual de Mothographics con los sistemas de tráfico, performance y desarrollo web de Chamba Digital para el sector hotelero y corporativo.
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
            <p className="text-[12px] text-[#ccc]">Capturando la magia: Historias visuales que trascienden marcas e industrias. (El Arte)</p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-[8px] transition-colors cursor-default"
          >
            <h4 className="text-[11px] uppercase text-accent font-bold mb-2">Chamba Digital</h4>
            <p className="text-[12px] text-[#ccc]">Ads, Desarrollo Web, Chatbots IA y Sistemas de Conversión. (La Ciencia)</p>
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

const PricingCard = ({ title, description, items, delay = 0, onOpenDetails }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.4)" }}
    className="glass p-6 rounded-[12px] flex flex-col h-full transition-colors group"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-[16px] font-bold flex items-center gap-2 group-hover:text-accent transition-colors">
        <Zap className="w-4 h-4 text-accent" />
        {title}
      </h3>
      <motion.button
        whileHover={{ scale: 1.1, color: "#3B82F6" }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenDetails}
        className="text-muted hover:text-accent transition-colors"
        title="Ver detalles"
      >
        <Info className="w-4 h-4" />
      </motion.button>
    </div>
    
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
    
    <div className="mt-auto border-t border-white/5 pt-4 flex flex-col gap-4">
      <p className="text-[11px] text-muted italic">{description}</p>
      <motion.button
        whileHover={{ x: 5 }}
        onClick={onOpenDetails}
        className="text-[11px] font-bold text-accent uppercase tracking-wider flex items-center gap-2"
      >
        Saber más <ArrowRight className="w-3 h-3" />
      </motion.button>
    </div>
  </motion.div>
);

const Services = ({ onOpenModal }: any) => (
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
        onOpenDetails={() => onOpenModal('Meta Ads', "Nuestro sistema de Meta Ads no se limita a 'poner anuncios'. Realizamos un estudio profundo de audiencias, instalamos la API de conversiones para saltar las limitaciones de iOS, y creamos embudos de retargeting que persiguen a los interesados hasta que compran.\n\nEs el motor que transforma la atención en dinero, permitiendo que el contenido de Mothographics llegue exactamente a quien tiene el poder de compra.")}
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
        onOpenDetails={() => onOpenModal('Desarrollo Web', "Construimos sitios que no solo son bonitos, sino que están optimizados para la venta. Desde landings ultra-rápidas hasta ecosistemas de e-commerce complejos con integraciones de pagos y logística.\n\nTodo bajo una arquitectura que prioriza la velocidad de carga y la experiencia del usuario (UX), asegurando que cada visitante tenga el camino más corto hacia la conversión.")}
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
        onOpenDetails={() => onOpenModal('Automatización con IA', "Liberamos a tu equipo de tareas repetitivas. Implementamos agentes de IA que atienden clientes 24/7, califican leads en tiempo real y agendan citas automáticamente en tu calendario.\n\nConectamos tus herramientas favoritas (CRM, Slack, WhatsApp) para que la información fluya sin errores humanos, permitiendo que el negocio crezca sin aumentar la carga operativa.")}
        items={[
          { name: "Chatbots de Ventas con IA", price: "Desde $300 USD" },
          { name: "Integraciones a medida", price: "Desde $400 USD" },
          { name: "Plataformas E-learning", price: "Desde $600 USD" }
        ]}
      />
    </div>
  </section>
);

const Portfolio = () => {
  const clients = [
    { name: "Peña Linda Bungalows", location: "Máncora - Perú" },
    { name: "Fundo Achamaqui", location: "Chachapoyas - Perú" },
    { name: "Punta Negritos | Wind & Surf", location: "Talara, Perú" },
    { name: "Hacienda Don Vicente", location: "Tarapoto - Perú" },
    { name: "Sauce Hotel Boutique", location: "Ollantaytambo - Perú" },
    { name: "Casa QX | Hotel Boutique", location: "Pachacamac - Perú" }
  ];

  const webs = [
    { url: "www.dupla.work", label: "Dupla Work" },
    { url: "olivosdelperu.com", label: "Olivos del Perú" },
    { url: "clasedesurf.com", label: "Clase de Surf" },
    { url: "jahsurfperu.com", label: "Jah Surf Perú" },
    { url: "penalindamancora.com", label: "Peña Linda" },
    { url: "puntanegritos.com", label: "Punta Negritos" }
  ];

  return (
    <section id="portafolio" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
      <div className="text-center mb-16">
        <span className="label-editorial mx-auto">Experiencia Comprobada</span>
        <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">Casos de Éxito y Clientes</h2>
        <p className="text-muted max-w-2xl mx-auto text-[14px]">
          Especialización en <strong className="text-fg">Marketing Hotelero Integral</strong>: Web, PMS, Anuncios, Cobranza y Gestión de Reservas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-start">
        {/* Hoteles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-[18px] font-bold flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-accent" />
            Sector Hotelero
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {clients.map((client, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="p-4 glass rounded-[10px] border-white/5 flex flex-col gap-1 cursor-default"
              >
                <span className="text-[14px] font-bold text-fg">{client.name}</span>
                <span className="text-[11px] text-muted uppercase tracking-wider">{client.location}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-full bg-white/5" />

        {/* Webs & AI */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[18px] font-bold flex items-center gap-2 mb-6">
              <ExternalLink className="w-5 h-5 text-accent" />
              Desarrollo Web
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {webs.map((web, i) => (
                <motion.a
                  key={i}
                  href={`https://${web.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="p-3 glass rounded-[8px] border-white/5 text-center transition-colors"
                >
                  <span className="text-[12px] font-medium text-muted hover:text-accent transition-colors">{web.url}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 glass rounded-[12px] border-accent/20 bg-accent/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-[18px] font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-accent" />
              Proyecto Personal IA
            </h3>
            <p className="text-[13px] text-muted mb-4 leading-relaxed">
              Desarrollo de agentes inteligentes especializados en el sector hospitalidad.
            </p>
            <motion.a
              href="https://hothelia.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-[14px] font-bold text-accent"
            >
              hothelia.com <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BusinessModel = () => (
  <section id="modelo" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01 }}
      className="glass p-6 md:p-10 rounded-[12px] transition-transform border-accent/10"
    >
      <h2 className="text-[24px] font-bold mb-6 tracking-[-0.5px]">¿Cómo ganamos todos? (Alianza de Valor)</h2>
      <p className="text-[14px] text-muted leading-[1.6] mb-8 max-w-[700px]">
        Guido, tú ya tienes la agencia y la confianza de tus clientes. Chamba Digital entra como tu <strong className="text-fg">brazo técnico estratégico</strong> para que puedas escalar resultados sin aumentar tu carga operativa. Nuestro modelo se basa en la <strong className="text-accent">justicia financiera y la equidad:</strong>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div whileHover={{ y: -5 }} className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Flexibilidad en Ads</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            El setup de $150 es un punto de partida para configuraciones estándar. Proyectos con embudos complejos o arquitecturas de datos avanzadas se cotizan a medida, asegurando que el margen sea justo para ambas partes.
          </p>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Repartición Equitativa</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Si un proyecto requiere que nuestra labor sea el mayor porcentaje del producto entregable, la estructura de ingresos se ajustará proporcionalmente al nivel de esfuerzo y complejidad técnica invertida.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="space-y-3 cursor-default p-4 bg-white/[0.02] rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <h4 className="text-[14px] font-bold">Sin Injusticias</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Cada cliente representa un reto distinto. No creemos en "tarifas únicas" que castiguen a una de las partes. Evaluamos cada caso para que la alianza sea siempre rentable, transparente y motivadora.
          </p>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/10">
        <p className="text-[12px] text-accent font-medium text-center italic">
          "El objetivo es que Mothographics crezca en facturación y servicios, mientras Chamba Digital garantiza la excelencia técnica detrás de cada entrega."
        </p>
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
        href="https://wa.me/51904060670" 
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
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });

  const openModal = (title: string, content: string) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar />
      <main className="pt-[70px]">
        <Hero />
        <Opportunity />
        <Services onOpenModal={openModal} />
        <Portfolio />
        <BusinessModel />
      </main>
      <Footer />
      
      <Modal 
        isOpen={modalData.isOpen} 
        onClose={closeModal} 
        title={modalData.title} 
        content={modalData.content} 
      />
    </div>
  );
}
