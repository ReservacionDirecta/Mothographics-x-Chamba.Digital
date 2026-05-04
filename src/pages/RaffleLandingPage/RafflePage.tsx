import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Gift,
  Users,
  Trophy,
  CheckCircle2,
  Zap,
  Mail,
  User,
  MapPin,
  X,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

// Note: Re-implementing Logo and Navbar here to avoid circular dependencies 
// without major refactoring, ensuring consistent styling.

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${className}`}
    >
      
      <div className="flex flex-col sm:flex-row sm:items-center leading-[0.9] sm:leading-none">
        <span className="text-[16px] sm:text-[22px] font-black tracking-tighter text-fg">
          Chamba
        </span>
        <span className="text-[14px] sm:text-[22px] font-bold sm:font-black tracking-tighter text-accent">
          .Digital
        </span>
      </div>
    </motion.div>
  </Link>
);

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ChambaNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/#servicios" },
    { name: "Portafolio", path: "/#portafolio" },
    { name: "Metodología", path: "/#metodologia" },
    { name: "Sorteo", path: "/raffle" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-10 flex items-center justify-between smooth-gpu ${
        scrolled
          ? "h-[70px] bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "h-[90px] bg-transparent"
      }`}
    >
      <div className="flex items-center gap-12">
        <Logo />
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[12px] font-black uppercase tracking-[0.2em] text-muted hover:text-accent transition-all relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/51904060670"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex bg-accent text-white px-8 py-3.5 rounded-[14px] text-[12px] font-black uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.5)] border border-white/10"
        >
          Iniciar Proyecto
        </motion.a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-fg" /> : <Menu className="w-6 h-6 text-fg" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-[30px] flex flex-col p-8 pt-24 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[32px] font-black tracking-tight text-fg hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  ciudad: string;
  mensaje: string;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerItems = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-6 mt-10 mb-12">
      {timerItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 border border-white/10 rounded-[20px] flex items-center justify-center mb-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[24px] md:text-[40px] font-black text-accent tabular-nums leading-none group-hover:scale-110 transition-transform duration-500">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] md:text-[12px] font-black text-muted uppercase tracking-[0.2em]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const RafflePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    ciudad: "",
    mensaje: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<any>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensajeWhatsApp = `🎯 *NUEVO PARTICIPANTE SORTEO* 🎯\n\n📋 *Datos:* \n• Nombre: ${formData.nombre}\n• Email: ${formData.email}\n• WhatsApp: ${formData.telefono}\n• DNI: ${formData.dni}\n• Ciudad: ${formData.ciudad}\n• Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/51904060670?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, "_blank");
    setIsSubmitted(true);
  };

  const prizeItems = [
    { 
      icon: Trophy, 
      title: "1er Premio", 
      desc: "Landing Page Profesional", 
      color: "text-yellow-500",
      details: {
        features: [
          "Diseño de 5 secciones estratégicas",
          "3 rondas de revisiones incluidas",
          "Despliegue rápido en 7 días",
          "Optimización SEO y Performance",
          "Tracking (GA4/Pixel) configurado"
        ],
        note: "No incluye costo de hosting ni dominio."
      }
    },
    { 
      icon: Gift, 
      title: "2do Premio", 
      desc: "50% de Descuento Especial", 
      color: "text-blue-500",
      details: {
        features: [
          "50% OFF en Desarrollo Web a medida",
          "50% OFF en Servicios de Marketing",
          "50% OFF en Implementación de PMS",
          "50% OFF en Automatización de Procesos",
          "50% OFF en Agente de IA para Ventas"
        ]
      }
    },
    { 
      icon: Users, 
      title: "3er Premio", 
      desc: "Asesoría Especializada", 
      color: "text-accent",
      details: {
        features: [
          "1 hora de consultoría 1-a-1",
          "Análisis de arquitectura digital",
          "Estrategia de escalado de ventas",
          "Optimización de procesos con IA",
          "Resolución de dudas técnicas"
        ]
      }
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero */}
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-accent/10 blur-[80px] md:blur-[100px] rounded-full -z-10" />
          
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="label-editorial mx-auto">Evento Exclusivo 2026</span>
              <h1 className="text-[36px] md:text-[64px] font-black leading-[1.1] mb-4">
                Gran Sorteo <span className="text-accent">Especial</span>
              </h1>
              <p className="text-muted text-[16px] md:text-[18px] max-w-xl mx-auto mb-4 leading-relaxed">
                Potencia tu presencia digital. Participa hoy y gana herramientas de ingeniería de performance para tu negocio.
              </p>
              
              <CountdownTimer targetDate="2026-05-11T00:00:00" />
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("seccion-formulario")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px] shadow-[0_10px_25px_rgba(59,130,246,0.3)] transition-all uppercase tracking-widest"
              >
                ¡Participar Ahora!
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Premios */}
        <section className="py-12 px-4 max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {prizeItems.map((premio, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPrize(premio)}
                className="liquid-glass p-6 group hover:border-accent/40 transition-all text-center cursor-pointer relative"
              >
                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-3 h-3 text-accent" />
                </div>
                <premio.icon className={`w-10 h-10 mx-auto mb-4 ${premio.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-[18px] font-black mb-2">{premio.title}</h3>
                <p className="text-muted text-[13px] leading-relaxed mb-4">{premio.desc}</p>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest border border-accent/20 px-3 py-1 rounded-full group-hover:bg-accent group-hover:text-white transition-all">Ver Detalles</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedPrize && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPrize(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-[450px] liquid-glass p-8 md:p-10 shadow-2xl"
              >
                <button onClick={() => setSelectedPrize(null)} className="absolute top-6 right-6 text-muted hover:text-accent transition-colors">
                  <X className="w-5 h-5" />
                </button>
                
                <selectedPrize.icon className={`w-12 h-12 mb-6 ${selectedPrize.color}`} />
                <h3 className="text-[24px] font-black mb-2">{selectedPrize.title}</h3>
                <p className="text-accent text-[14px] font-bold mb-6 uppercase tracking-widest">{selectedPrize.desc}</p>
                
                <div className="space-y-4 mb-8">
                  {selectedPrize.details.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex gap-3 text-[14px] text-muted leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {selectedPrize.details.note && (
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-8">
                    <p className="text-[12px] text-muted italic">⚠️ {selectedPrize.details.note}</p>
                  </div>
                )}

                <button 
                  onClick={() => {
                    setSelectedPrize(null);
                    document.getElementById("seccion-formulario")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold text-[14px] uppercase tracking-widest"
                >
                  ¡Me interesa este premio!
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Formulario */}
        <section id="seccion-formulario" className="py-16 px-4 bg-accent/[0.01] border-y border-white/5">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="label-editorial mx-auto">Inscripción Directa</span>
              <h2 className="text-[28px] md:text-[40px] font-black mb-3">Asegura tu <span className="text-accent">Cupo</span></h2>
              <p className="text-muted text-[14px]">Completa tus datos y envíalos vía WhatsApp para validar tu entrada.</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="liquid-glass p-6 md:p-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                      <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                        className="w-full bg-white/5 border border-white/10 rounded-[10px] py-3.5 pl-11 pr-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="Juan Pérez" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider">Email Corporativo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        className="w-full bg-white/5 border border-white/10 rounded-[10px] py-3.5 pl-11 pr-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="juan@empresa.com" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider">WhatsApp (9 dígitos)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required pattern="[0-9]{9}"
                        className="w-full bg-white/5 border border-white/10 rounded-[10px] py-3.5 pl-11 pr-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="987654321" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-muted uppercase tracking-wider">DNI / Documento</label>
                    <div className="relative">
                      <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                      <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} required
                        className="w-full bg-white/5 border border-white/10 rounded-[10px] py-3.5 pl-11 pr-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="Número de documento" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider">Ciudad</label>
                  <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-[10px] py-3.5 px-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all"
                    placeholder="Lima, Perú" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider">¿Por qué quieres ganar?</label>
                  <textarea name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-[10px] p-4 text-[13px] focus:outline-none focus:border-accent/50 transition-all resize-none"
                    placeholder="Cuéntanos sobre tu negocio..." />
                </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-accent text-white py-4 rounded-[10px] font-black text-[14px] shadow-[0_10px_25px_rgba(59,130,246,0.2)] transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Enviar y Participar
                  </motion.button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="liquid-glass p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-[24px] font-black mb-3">¡Registro Iniciado!</h3>
                <p className="text-muted text-[14px] mb-8">Se ha abierto WhatsApp para completar tu inscripción. No olvides enviar el mensaje generado.</p>
                <button onClick={() => setIsSubmitted(false)} className="text-accent font-bold hover:underline text-[14px]">
                  Registrar otro participante
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* New Sales Section: Value & Automation ROI */}
        <section className="py-16 px-4">
          <div className="max-w-[1024px] mx-auto">
            <div className="liquid-glass p-8 md:p-12 relative overflow-hidden group border-accent/20">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full -z-10 animate-pulse" />
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="label-editorial">Escala sin límites</span>
                  <h2 className="text-[32px] md:text-[42px] font-black mb-6 leading-[1.1]">
                    ¿Tu negocio está preparado para <span className="text-accent">crecer rápido</span>?
                  </h2>
                  <p className="text-muted text-[16px] mb-8 leading-relaxed">
                    Creamos <strong className="text-fg">sistemas automatizados que trabajan por ti</strong>. 
                    Nos encargamos de toda la tecnología (webs rápidas y asistentes con inteligencia artificial) 
                    para que tú solo te enfoques en cerrar ventas.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { title: "Ventas en Automático", desc: "Sistemas que atienden y venden las 24 horas." },
                      { title: "Webs Ultra Rápidas", desc: "Páginas que cargan al instante y nunca fallan." },
                      { title: "Ahorro de Tiempo", desc: "Eliminamos el trabajo manual y repetitivo." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                          <Zap className="w-3 h-3 text-accent" />
                        </div>
                        <div>
                          <p className="text-[14px] font-black text-fg">{item.title}</p>
                          <p className="text-[12px] text-muted">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="p-8 bg-white/5 rounded-[24px] border border-white/10 relative group-hover:border-accent/30 transition-all">
                    <h3 className="text-[18px] font-black mb-4">Auditoría Gratuita de tu Negocio</h3>
                    <p className="text-[14px] text-muted mb-6">
                      Analizamos cómo vendes actualmente y te mostramos la ruta exacta para automatizarlo. 
                      <strong> Sin costo, solo valor real para tu empresa.</strong>
                    </p>
                    
                    <motion.a
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/51904060670?text=Hola,%20quiero%20agendar%20mi%20Auditoría%20Gratuita."
                      target="_blank"
                      className="w-full bg-accent text-white py-4 rounded-xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(59,130,246,0.3)]"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      Agendar Auditoría
                    </motion.a>
                  </div>
                  
                  <p className="text-center text-[11px] text-muted/50 font-bold uppercase tracking-[0.2em]">
                    Cupos Limitados por Semana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 px-4 border-t border-white/5 text-center">
        <Logo className="mx-auto mb-6 scale-90" />
        <p className="text-muted text-[12px] mb-1">© {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 text-[10px] font-black text-muted/30 uppercase tracking-widest mt-4">
          <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
          <a href="#seccion-formulario" className="hover:text-accent transition-colors">Participar</a>
          <a href="https://wa.me/51904060670" className="hover:text-accent transition-colors">Soporte</a>
        </div>
      </footer>
    </div>
  );
};

export default RafflePage;