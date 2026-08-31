import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from '../../App';
import { SEO } from '../../components/SEO';
import { 
  Briefcase, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Lock,
  ExternalLink,
  Users,
  Filter,
  Layers,
  Bot
} from 'lucide-react';
import { FreeConsultationModal } from '../../components/FreeConsultationModal';

const ServiceBusinessesLandingPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCallType, setBookingCallType] = useState<"call_5min" | "meeting_15_30min">("meeting_15_30min");

  const openBooking = (type: "call_5min" | "meeting_15_30min" = "meeting_15_30min") => {
    setBookingCallType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO 
        title="Embudos de Captación y Generación de Leads B2B | Chamba Digital"
        description="Páginas web de alta conversión y embudos automatizados para empresas de servicios, consultoras y agencias. Agenda llena de prospectos calificados."
        keywords="lead generation peru, embudos de ventas b2b, desarrollo web para servicios profesionales, captacion de clientes empresas, automatizacion whatsapp crm"
        ogTitle="Embudos de Captación y Generación de Leads B2B | Chamba Digital"
        ogDescription="Convierte visitas en reuniones comerciales con prospectos calificados. Sin perder tiempo en tareas manuales."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/servicebusinesses"
      />
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wide">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              Sistemas de Captación para Servicios Profesionales
            </div>
            
            <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-black tracking-tight leading-[1.08] text-slate-900">
              Convierte el tráfico web en <span className="text-accent underline decoration-accent/30 decoration-wavy">reuniones con clientes calificados</span>.
            </h1>
            
            <p className="text-[17px] sm:text-[20px] text-slate-600 leading-relaxed font-normal">
              Diseñamos la infraestructura digital de tu empresa: páginas de presentación de alto impacto, formularios con filtros de calificación y agendamiento automático directo a tu calendario.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBooking("meeting_15_30min")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-xl font-bold text-[14px] shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4 text-accent" />
                Agendar Diagnóstico Comercial (15 min)
              </motion.button>
              <a 
                href="#mecanismo" 
                className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 py-3 px-4"
              >
                Ver el flujo paso a paso <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Micro-proof */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-[12px] font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Filtro de presupuesto previo</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sincronización con Google Calendar</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Notificaciones instantáneas por WhatsApp</span>
            </div>
          </motion.div>
        </section>

        {/* 3 Step Funnel Mechanism */}
        <section id="mecanismo" className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Mecanismo de Conversión</span>
            <h2 className="text-[28px] sm:text-[40px] font-black tracking-tight leading-tight text-slate-900">
              El flujo probado para cerrar servicios de alto valor.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              Elimina los intercambios infinitos de mensajes. Tu cliente ideal agenda en 3 pasos sencillos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Presentación de Autoridad</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Página web con propuesta de valor clara, testimonios reales, portafolio de proyectos y casos de éxito que eliminan las dudas de compra.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Filter className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Calificación del Prospecto</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Formulario inteligente que valida si el cliente cuenta con el presupuesto y perfil adecuado antes de permitir el agendamiento.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Cita Automática en tu Agenda</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                El prospecto selecciona día y hora disponible en tu calendario. Ambos reciben recordatorios automáticos por correo y WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Real Proof: TuAgente.pe / Kabsa Constructora */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="label-editorial">Caso Real</span>
              <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight leading-tight text-slate-900">
                TuAgente.pe: Plataforma inmobiliaria con captura directa de compradores.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                Desarrollo de plataforma web para agentes y propiedades inmobiliarias, con filtros de búsqueda por zona, formularios de cotización y contacto directo.
              </p>
              
              <div className="space-y-2.5 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Captura de leads inmobiliarios cualificados en tiempo real.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enrutamiento de prospectos directo al WhatsApp del asesor.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Diseño mobile-first y velocidad de carga extrema.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://tuagentepe.up.railway.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Ver Proyecto en Vivo <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => openBooking("meeting_15_30min")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-5 rounded-lg transition-colors cursor-pointer"
                >
                  Diseñar mi Embudo
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img 
                src="/thumbs/tuagente.webp" 
                alt="TuAgente.pe - Plataforma Inmobiliaria y Captación de Leads" 
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Da el Siguiente Paso</span>
            <h2 className="text-[28px] sm:text-[42px] font-black tracking-tight leading-tight text-slate-900">
              Llena tu agenda con clientes que valoran tu trabajo.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              Elige cómo deseas iniciar la modernización de tu canal comercial:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
            {/* Opción 1: Diagnóstico Gratuito */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Diagnóstico Comercial (15 Minutos)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Analizamos tu presencia web actual y tu proceso de prospección para identificar exactamente dónde se están perdiendo tus prospectos.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Sin costo ni compromiso comercial.
                </div>
              </div>
              <button
                onClick={() => openBooking("meeting_15_30min")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Agendar Sesión de Diagnóstico <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Opción 2: Implementación WaaS */}
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6 border border-slate-800">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Modelo WaaS por Suscripción
                </div>
                <h3 className="text-xl font-bold text-white">2. Embudo Completo Llave en Mano</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Web corporativa, formularios de calificación, integración con Google Calendar y WhatsApp, hosting cloud y soporte técnico continuo.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Dominio y plataforma 100% de tu propiedad.
                </div>
              </div>
              <a
                href="https://wa.me/51904060670?text=Hola,%20quiero%20implementar%20un%20embudo%20de%20captación%20para%20mis%20servicios%20profesionales."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-12 p-5 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-1">
            <div className="text-xs font-bold uppercase text-slate-800 tracking-wider flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" /> Garantía de Calidad Chamba Digital
            </div>
            <p className="text-xs text-slate-600">
              Entrega formal en plazos garantizados con soporte prioritario y cambios de contenido ilimitados semanales.
            </p>
          </div>
        </section>
      </main>

      <ChambaFooter />

      <FreeConsultationModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTopic="Diagnóstico Comercial y Embudo de Captación (15 min)"
        defaultCallType={bookingCallType}
      />
    </div>
  );
};

export default ServiceBusinessesLandingPage;
