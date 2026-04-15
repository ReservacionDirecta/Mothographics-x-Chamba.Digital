/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  Info,
  User,
  Mail,
  Send,
  MapPin
} from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`flex items-center gap-2 cursor-pointer ${className}`}
  >
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-[10px] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
    </div>
    <span className="text-[18px] sm:text-[22px] font-black tracking-tighter">
      Chamba<span className="text-accent">.Digital</span>
    </span>
  </motion.div>
);

const SplashScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <Logo className="scale-150" />
    </motion.div>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: 200 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-[2px] bg-accent mt-12 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
    />
  </motion.div>
);

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
    <div className="flex items-center gap-4">
      <Logo className="scale-90 origin-left" />
      <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
      <div className="hidden sm:flex items-center gap-2 font-bold text-[14px] text-muted">
        Mothographics <span className="text-accent">×</span>
      </div>
    </div>
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
        El Brazo Tecnológico que tu Agencia en México necesita.
      </h1>
      <h2 className="text-[16px] md:text-[18px] text-muted font-normal leading-[1.5] max-w-[500px] mb-8">
        Potenciamos la excelencia visual de Mothographics con la ingeniería de performance de Chamba Digital. <strong className="text-fg">Escalamos tu capacidad técnica</strong> sin que tengas que contratar un equipo interno.
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
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">La Sinergia Estratégica</span>
      <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-tight mb-6">
        Tu Agencia, <span className="text-accent">Potenciada</span>.
      </h2>
      <p className="text-muted text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
        Guido, Mothographics es el corazón creativo en <strong className="text-fg">México</strong>. Chamba Digital se convierte en tu <strong className="text-fg">infraestructura tecnológica remota</strong> desde Perú, permitiéndote ofrecer soluciones de alto nivel técnico a cualquier cliente.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-8 rounded-[16px] border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Palette className="w-24 h-24" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Palette className="w-5 h-5 text-accent" />
          El Arte (Mothographics)
        </h3>
        <ul className="space-y-3">
          {[
            "Storytelling visual de alto impacto.",
            "Branding que trasciende industrias.",
            "Excelencia estética y emocional.",
            "25 años de autoridad creativa."
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[14px] text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-8 rounded-[16px] border-accent/10 relative overflow-hidden bg-accent/[0.02]"
      >
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Zap className="w-24 h-24 text-accent" />
        </div>
        <h3 className="text-[20px] font-bold mb-4 flex items-center gap-3">
          <Zap className="w-5 h-5 text-accent" />
          La Ciencia (Chamba Digital)
        </h3>
        <ul className="space-y-3">
          {[
            "Sistemas de tráfico y Meta Ads.",
            "Webs de alta conversión (UX/UI).",
            "Automatización con Agentes IA.",
            "Escalabilidad técnica y datos."
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[14px] text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {[
        { title: "Agencia 360", desc: "Posicionamiento Full-Stack inmediato.", icon: Globe },
        { title: "Nuevos Ingresos", desc: "Venta de Web y Sistemas IA.", icon: TrendingUp },
        { title: "Cero Fricción", desc: "Nosotros manejamos la técnica.", icon: CheckCircle2 },
        { title: "Datos Reales", desc: "Reportes de ROI para tus clientes.", icon: MessageSquare }
      ].map((item, i) => (
        <div key={i} className="p-5 glass rounded-[12px] border-white/5 hover:border-accent/20 transition-colors">
          <item.icon className="w-6 h-6 text-accent mb-3" />
          <h4 className="text-[14px] font-bold mb-1">{item.title}</h4>
          <p className="text-[12px] text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </motion.div>
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
        onOpenDetails={() => onOpenModal('Meta Ads: Motor de Tráfico', "Nuestro sistema de Meta Ads no se limita a 'poner anuncios'. Realizamos un estudio profundo de audiencias, instalamos la API de conversiones para saltar las limitaciones de iOS, y creamos embudos de retargeting que persiguen a los interesados hasta que compran.\n\n📈 CASOS DE ÉXITO:\n- Galería de Arte: Incremento del 300% en leads calificados en 30 días.\n- E-commerce de Moda: ROAS (Retorno de Inversión Publicitaria) de 4.5x constante.\n- Sector Inmobiliario: Reducción del 40% en el costo por lead mediante segmentación avanzada.\n\n⭐ TESTIMONIOS:\n'Chamba Digital transformó nuestra inversión en un activo real. Pasamos de gastar dinero a generar ventas predecibles.' - Cliente Sector Retail.\n'La precisión técnica con la que manejan las audiencias es algo que no habíamos visto en otras agencias.' - Director de Marketing.")}
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
        title="Web & Vertical Hotelero"
        description="Desarrollo general y sistemas para hoteles."
        delay={0.2}
        onOpenDetails={() => onOpenModal('Desarrollo Web & Tech', "Somos tu brazo de desarrollo. Construimos desde webs corporativas de alto impacto hasta sistemas especializados para hoteles. \n\nNos especializamos en la integración de PMS (Property Management Systems) y Motores de Reserva Directa para que los hoteles recuperen el control de sus ventas y reduzcan comisiones de terceros.\n\nNos encargamos de toda la complejidad técnica (hosting, seguridad, integraciones API) para que tú te enfoques en la estrategia creativa y la relación con el cliente.")}
        items={[
          { name: "Web Corporativa / Landing", price: "Desde $450 USD" },
          { name: "Motor de Reservas Directas", price: "Desde $650 USD" },
          { name: "Integración PMS / Channel Manager", price: "Desde $800 USD" },
          { name: "E-commerce / Web App a medida", price: "Personalizado" }
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
    { url: "www.dupla.work", label: "Dupla Work", thumb: "https://s.wordpress.com/mshots/v1/https://www.dupla.work?w=600" },
    { url: "kabsa.pe", label: "Kabsa", thumb: "https://s.wordpress.com/mshots/v1/https://kabsa.pe?w=600" },
    { url: "olivosdelperu.com", label: "Olivos del Perú", thumb: "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600" },
    { url: "clasedesurf.com", label: "Clase de Surf", thumb: "https://s.wordpress.com/mshots/v1/https://clasedesurf.com?w=600" },
    { url: "jahsurfperu.com", label: "Jah Surf Perú", thumb: "https://s.wordpress.com/mshots/v1/https://jahsurfperu.com?w=600" },
    { url: "penalindamancora.com", label: "Peña Linda", thumb: "https://s.wordpress.com/mshots/v1/https://penalindamancora.com?w=600" },
    { url: "puntanegritos.com", label: "Punta Negritos", thumb: "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600" }
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.2fr] gap-12 items-start">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {webs.map((web, i) => (
                <motion.a
                  key={i}
                  href={`https://${web.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group flex flex-col glass rounded-[12px] border-white/5 overflow-hidden transition-all hover:border-accent/30"
                >
                  <div className="aspect-video w-full overflow-hidden bg-white/5 relative">
                    <img 
                      src={web.thumb} 
                      alt={web.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-3 text-center border-t border-white/5">
                    <span className="text-[11px] font-bold text-muted group-hover:text-accent transition-colors uppercase tracking-wider">{web.label}</span>
                  </div>
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
            <p className="text-[13px] text-muted mb-6 leading-relaxed">
              Desarrollo de agentes inteligentes especializados en el sector hospitalidad.
            </p>
            <motion.a
              href="https://hothelia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link block relative aspect-video w-full rounded-[8px] overflow-hidden border border-white/5 mb-4"
            >
              <img 
                src="https://s.wordpress.com/mshots/v1/https://hothelia.com?w=600" 
                alt="Hothelia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover/link:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover/link:bg-transparent transition-colors flex items-center justify-center">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover/link:opacity-100 transition-opacity flex items-center gap-2">
                  <span className="text-[12px] font-bold text-white">Visitar hothelia.com</span>
                  <ArrowRight className="w-3 h-3 text-accent" />
                </div>
              </div>
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
            <h4 className="text-[14px] font-bold">Presencia en México</h4>
          </div>
          <p className="text-[12px] text-muted leading-[1.6]">
            Mothographics es la cara local en México, gestionando la relación directa y el branding. Chamba Digital es el motor remoto que garantiza que la ejecución técnica sea impecable y escalable.
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
      <div className="text-[11px] text-muted italic text-center md:text-right">
        México × Perú <br />
        Por Yosward Ríos - Chamba Digital
      </div>
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

const ChambaNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] px-6 md:px-10 flex items-center justify-between border-b border-glass-border bg-black/80 backdrop-blur-[10px]">
    <Logo />
    <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium text-muted uppercase tracking-[1px]">
      <a href="#servicios" className="hover:text-fg transition-colors relative group">
        Servicios
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
      </a>
      <a href="#portafolio" className="hover:text-fg transition-colors relative group">
        Clientes
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
      </a>
    </div>
    <motion.a 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="https://wa.me/51904060670" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-accent text-white px-5 md:px-6 py-2.5 md:py-3 rounded-[8px] text-[11px] md:text-[13px] font-bold uppercase cursor-pointer transition-all hover:bg-accent/90 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    >
      Empezar Proyecto
    </motion.a>
  </nav>
);

const ChambaHero = () => (
  <section className="relative min-h-[80vh] flex flex-col items-center text-center justify-center pt-[70px] px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
    <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="z-10"
    >
      <span className="label-editorial mx-auto">
        🚀 Ingeniería de Performance
      </span>
      <h1 className="text-[36px] sm:text-[48px] md:text-[64px] max-w-[800px] leading-[1.1] md:leading-[1] mb-6 font-black tracking-tight">
        Transformamos tu negocio con <span className="text-accent">Tecnología de Alto Nivel</span>.
      </h1>
      <p className="text-[15px] md:text-[18px] text-muted font-normal leading-[1.6] max-w-[600px] mb-10 mx-auto px-4">
        Desarrollo web, Meta Ads y Automatización con IA. Operamos desde Perú para el mundo, entregando resultados medibles y escalables.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <motion.a 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="#servicios" 
          className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] w-full sm:w-auto shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] transition-all"
        >
          Impulsar mi Negocio
        </motion.a>
        <motion.a 
          whileHover={{ x: 5 }}
          href="#portafolio" 
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-fg hover:text-accent transition-colors py-3"
        >
          Ver Casos de Éxito
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  </section>
);

const PainPoints = () => (
  <section className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
    <div className="text-center mb-16">
      <span className="label-editorial mx-auto">¿Te suena familiar?</span>
      <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight mb-4">El problema de la mayoría de negocios digitales</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          title: "Inversión sin Retorno", 
          desc: "Gastas en anuncios pero no ves ventas reales. El tráfico llega, pero no convierte.",
          icon: TrendingUp 
        },
        { 
          title: "Webs 'Fantasma'", 
          desc: "Tienes una web bonita que nadie visita o que es tan lenta que espanta a los clientes.",
          icon: Globe 
        },
        { 
          title: "Procesos Manuales", 
          desc: "Pierdes tiempo respondiendo lo mismo una y otra vez en lugar de cerrar ventas.",
          icon: MessageSquare 
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 glass rounded-[16px] border-white/5 hover:border-red-500/20 transition-colors group"
        >
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <item.icon className="w-6 h-6 text-red-500" />
          </div>
          <h4 className="text-[18px] font-bold mb-3">{item.title}</h4>
          <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Methodology = () => (
  <section className="py-20 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
    <div className="max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="label-editorial">Nuestro Método</span>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-tight mb-6">
            No vendemos humo, <br /> vendemos <span className="text-accent">Ingeniería</span>.
          </h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Auditoría & Estrategia", desc: "Analizamos tus datos actuales para encontrar las fugas de dinero." },
              { step: "02", title: "Implementación Técnica", desc: "Construimos la infraestructura (Web, Ads, IA) optimizada para conversión." },
              { step: "03", title: "Escalado Basado en Datos", desc: "No adivinamos. Optimizamos cada dólar invertido según el ROI real." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-[24px] font-black text-accent/20">{item.step}</span>
                <div>
                  <h4 className="text-[18px] font-bold mb-2">{item.title}</h4>
                  <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square glass rounded-[24px] border-accent/20 flex items-center justify-center p-12 overflow-hidden">
            <div className="absolute inset-0 bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%]" />
            <Zap className="w-32 h-32 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "¿En cuánto tiempo veré resultados?", a: "Las campañas de Meta Ads pueden generar leads en las primeras 48-72 horas. Proyectos web y de IA suelen tomar entre 2 a 4 semanas según complejidad." },
    { q: "¿Trabajan con clientes fuera de Perú?", a: "Sí, operamos de forma remota para clientes en México, España, Estados Unidos y toda Latinoamérica." },
    { q: "¿Necesito una inversión mínima en publicidad?", a: "Recomendamos iniciar con al menos $10-$15 USD diarios para que el algoritmo de Meta tenga datos suficientes para optimizar." }
  ];

  return (
    <section className="py-20 px-6 md:px-10 max-w-[800px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">Preguntas Frecuentes</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-[12px] border-white/5 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-5 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[14px] font-bold">{faq.q}</span>
              <ArrowRight className={`w-4 h-4 text-accent transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-[13px] text-muted leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contacto" className="py-20 px-6 md:px-10 max-w-[1024px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="label-editorial">Contacto</span>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-tight mb-6">
            ¿Listo para <span className="text-accent">escalar</span>?
          </h2>
          <p className="text-muted text-[16px] mb-8 leading-relaxed">
            Cuéntanos sobre tu proyecto. Analizaremos tu situación actual y te propondremos una estrategia técnica a medida.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">Email</p>
                <p className="text-[14px] font-medium">contacto@chamba.digital</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">WhatsApp</p>
                <p className="text-[14px] font-medium">+51 904 060 670</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[12px] text-muted uppercase tracking-wider font-bold">Ubicación</p>
                <p className="text-[14px] font-medium leading-relaxed">
                  Alameda del premio Real 736, La Encantada de Villa, Chorrillos, Lima, Perú
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-[24px] border-white/5 relative overflow-hidden">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-[20px] font-bold mb-2">¡Mensaje Enviado!</h3>
              <p className="text-muted text-[14px]">Nos pondremos en contacto contigo en menos de 24 horas.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-accent text-[14px] font-bold hover:underline"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input 
                    required
                    type="text" 
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">Email Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input 
                    required
                    type="email" 
                    placeholder="juan@empresa.com"
                    className="w-full bg-white/5 border border-white/10 rounded-[12px] py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-muted uppercase tracking-wider">¿En qué podemos ayudarte?</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Cuéntanos brevemente sobre tu negocio y objetivos..."
                  className="w-full bg-white/5 border border-white/10 rounded-[12px] p-4 text-[14px] focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className="w-full bg-accent text-white py-4 rounded-[12px] font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar Consulta
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ChambaContent = ({ onOpenModal }: any) => (
  <div className="selection:bg-accent selection:text-white">
    <ChambaNavbar />
    <main className="pt-[70px]">
      <ChambaHero />
      <PainPoints />
      <Methodology />
      <Services onOpenModal={onOpenModal} />
      <Portfolio />
      <FAQ />
      <ContactForm />
    </main>
    <footer className="min-h-[100px] py-16 px-6 md:px-10 border-t border-glass-border bg-white/[0.02]">
      <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-[400px]">
          <Logo />
          <span className="text-[14px] text-muted leading-relaxed">Ingeniería Digital desde Perú para el mundo.</span>
          <div className="flex items-start gap-3 text-muted">
            <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
            <p className="text-[12px] leading-relaxed">
              Alameda del premio Real 736, La Encantada de Villa, Chorrillos, Lima, Perú
            </p>
          </div>
        </div>
        <motion.a 
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] transition-all w-full md:w-auto text-center shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
        >
          Solicitar Auditoría Gratuita
        </motion.a>
      </div>
      <div className="mt-12 text-center text-[11px] text-muted italic">
        © {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.
      </div>
    </footer>
  </div>
);

export default function App() {
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (title: string, content: string) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const AllianceContent = () => (
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
    </div>
  );

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>
      
      <Routes>
        <Route path="/" element={<ChambaContent onOpenModal={openModal} />} />
        <Route path="/Mothographics×ChambaDigital" element={<AllianceContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Modal 
        isOpen={modalData.isOpen} 
        onClose={closeModal} 
        title={modalData.title} 
        content={modalData.content} 
      />
    </BrowserRouter>
  );
}
