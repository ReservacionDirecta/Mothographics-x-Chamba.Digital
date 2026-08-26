import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from '../../App';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageSquare,
  Hotel,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  PhoneCall,
  Calendar,
  AlertTriangle,
  Lock,
  Zap,
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { FreeConsultationModal } from '../../components/FreeConsultationModal';

const HospitalitySolutions: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCallType, setBookingCallType] = useState<"call_5min" | "meeting_15_30min">("meeting_15_30min");

  const openBooking = (type: "call_5min" | "meeting_15_30min" = "meeting_15_30min") => {
    setBookingCallType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO 
        title="Más Reservas Directas para tu Hotel | 0% Comisiones a Intermediarios"
        description="Descubre cómo los hoteles boutique e independientes aumentan sus ganancias hasta un 40% vendiendo directo y reteniendo el 100% de cada reserva."
        keywords="aumentar reservas directas hotel, eliminar comisiones booking airbnb, rentabilidad hotelera, ventas directas hoteles peru, marketing hotelero efectivo"
        ogTitle="Más Reservas Directas para tu Hotel | 0% Comisiones a Intermediarios"
        ogDescription="Deja de regalar hasta el 25% de tus ingresos a las plataformas. Sistema probado de venta directa para hoteles."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/hospitality"
      />
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero Section: Brian Tracy - Direct Value & Pain Relief */}
        <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-10 max-w-[1024px] mx-auto overflow-hidden py-16 md:py-24">
          <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Especialistas en Rentabilidad Hotelera
            </div>
            
            <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-black tracking-tight leading-[1.08] text-slate-900">
              Deja de regalar hasta el <span className="text-accent underline decoration-accent/30 decoration-wavy">25% de cada noche</span> a las aplicaciones de reserva.
            </h1>
            
            <p className="text-[17px] sm:text-[20px] text-slate-600 leading-relaxed font-normal">
              Ayudamos a dueños de hoteles y hospedajes a tomar el control total de sus ventas, llenar habitaciones en temporada baja y quedarse con el <strong className="text-slate-900 font-bold">100% del dinero de cada huésped</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBooking("meeting_15_30min")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-xl font-bold text-[14px] shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4 text-accent" />
                Agendar Sesión de Diagnóstico (15 min)
              </motion.button>
              <a 
                href="#comparativa" 
                className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 py-3 px-4"
              >
                ¿Cuánto dinero estás perdiendo? <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Micro-proof indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-[12px] font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sin costo ni compromiso</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Análisis 1 a 1 de tu hotel</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Garantía total de resultados</span>
            </div>
          </motion.div>
        </section>

        {/* The Math & Economic Reality: Brian Tracy "Cost of Inaction" */}
        <section id="comparativa" className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">La Realidad Financiera</span>
            <h2 className="text-[28px] sm:text-[40px] font-black tracking-tight leading-tight text-slate-900">
              El verdadero costo de depender de terceros.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              Si tu hotel factura $10,000 al mes en habitaciones a través de intermediarios, estás perdiendo hasta <strong>$2,500 cada mes</strong> en comisiones que deberían ser tu ganancia neta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Camino Tradicional / Ineficiente */}
            <div className="p-7 sm:p-8 rounded-2xl border border-red-200 bg-red-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-4">
                  <AlertTriangle className="w-4 h-4" /> La Trampa de las Plataformas
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Depender de Booking y Airbnb</h3>
                <ul className="space-y-3.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold text-base leading-none">✕</span>
                    <span><strong>15% al 25% de comisión</strong> descontada de cada reserva antes de que el dinero llegue a tu cuenta.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold text-base leading-none">✕</span>
                    <span><strong>Los clientes no son tuyos:</strong> La plataforma se queda con su correo y teléfono para venderles otros hoteles el próximo año.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold text-base leading-none">✕</span>
                    <span><strong>Respuestas tardías por WhatsApp:</strong> Si un viajero pregunta a las 11 PM y nadie contesta en 10 minutos, reserva en otro hotel.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-red-200/60 mt-6 text-xs text-red-800 font-medium">
                Resultado: Trabajas el doble para ganar menos y dependes de algoritmos ajenos.
              </div>
            </div>

            {/* Camino Chamba Digital */}
            <div className="p-7 sm:p-8 rounded-2xl border border-emerald-300 bg-emerald-50/50 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> El Sistema de Venta Directa
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Tu Propio Canal Directo</h3>
                <ul className="space-y-3.5 text-sm text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>0% de comisión:</strong> El 100% de la tarifa va directo a tu cuenta bancaria desde el primer día.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Base de datos propia:</strong> Conoces el nombre, WhatsApp y gustos de cada huésped para fidelizarlo y que regrese.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Atención inmediata 24/7:</strong> Sistema inteligente que responde consultas, envía fotos y cobra reservas al instante.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-emerald-200 mt-6 text-xs text-emerald-900 font-bold">
                Resultado: Mayor margen de ganancia, tarifas predecibles y huéspedes leales.
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars: Simplicity & Benefits (Not Technical Features) */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Cómo lo Hacemos</span>
            <h2 className="text-[28px] sm:text-[40px] font-black tracking-tight leading-tight text-slate-900">
              Un sistema completo para que tu hotel venda mientras duermes.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              No necesitas saber de tecnología ni contratar más personal. Nosotros implementamos todo y nos aseguramos de que funcione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pilar 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold">
                <Hotel className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Página Web que Enamora y Vende</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Diseño visualmente impecable y ultra veloz en celulares. Muestra tus habitaciones, amenidades y experiencias para que el viajero elija reservar contigo al instante.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Motor de Reservas y Pagos en Línea</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tus huéspedes eligen fechas, ven disponibilidad en tiempo real y pagan de inmediato con tarjeta o transferencia. Cero sobreventas y sincronización total.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Vendedor Automático por WhatsApp</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Atiende a los interesados las 24 horas del día en segundos. Resuelve dudas sobre precios, mascotas o cochera, y envía el enlace de pago directo.
              </p>
            </div>
          </div>
        </section>

        {/* Real Success Story: Peña Linda & Costa Blanca (Social Proof) */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="label-editorial">Caso Real</span>
              <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight leading-tight text-slate-900">
                Peña Linda Bungalows Máncora: Más reservas directas y menos comisiones.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                Antes dependían casi por completo de plataformas intermediarias. Implementamos su web de alta conversión con motor de reservas directas y pagos en línea.
              </p>
              
              <div className="space-y-2.5 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+40% de incremento en reservas directas sin intermediarios.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cobro automático de tarifas y confirmación inmediata al huésped.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Carga instantánea en teléfonos celulares en menos de 1 segundo.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://penalindabungalows.up.railway.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Ver Proyecto en Vivo <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => openBooking("meeting_15_30min")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-5 rounded-lg transition-colors cursor-pointer"
                >
                  Quiero un sistema para mi hotel
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img 
                src="/thumbs/penalindamancora.webp" 
                alt="Peña Linda Bungalows Máncora - Plataforma de Reservas Directas" 
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </section>

        {/* Brian Tracy Risk-Reversal & Offer Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Toma Acción Hoy</span>
            <h2 className="text-[28px] sm:text-[42px] font-black tracking-tight leading-tight text-slate-900">
              ¿Cuánto más vas a esperar para recuperar tus ganancias?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              Cada mes que pasa sin un canal directo propio es dinero que no vuelve. Te ofrecemos dos formas muy sencillas de empezar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
            {/* Opción 1: Diagnóstico Gratuito */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Diagnóstico Gratuito (15 Minutos)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Revisamos tu web actual, tus tarifas y tus canales de venta. Te diremos con total honestidad si este sistema te conviene y cuánto dinero extra podrías generar.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Sin presiones de venta ni costo alguno.
                </div>
              </div>
              <button
                onClick={() => openBooking("meeting_15_30min")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Agendar Sesión de 15 Minutos <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Opción 2: Implementación Llave en Mano */}
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6 border border-slate-800">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Recomendado para Hoteles
                </div>
                <h3 className="text-xl font-bold text-white">2. Sistema Completo Llave en Mano</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Web profesional para tu hotel, motor de reservas sin comisiones, pasarela de pagos y asistente de WhatsApp funcionando en 5 días.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Garantía de Satisfacción Total de 15 Días.
                </div>
              </div>
              <a
                href="https://wa.me/51904060670?text=Hola,%20quiero%20implementar%20el%20sistema%20de%20reservas%20directas%20para%20mi%20hotel."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                Hablar por WhatsApp con un Especialista
              </a>
            </div>
          </div>

          {/* Guarantee Seal */}
          <div className="mt-12 p-5 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-1">
            <div className="text-xs font-bold uppercase text-slate-800 tracking-wider flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" /> Garantía Escrita Chamba Digital
            </div>
            <p className="text-xs text-slate-600">
              Si en los primeros 15 días sientes que el sistema no es lo que esperabas, te devolvemos el 100% de tu dinero. Sin preguntas incómodas.
            </p>
          </div>
        </section>
      </main>

      <ChambaFooter />

      {/* Free Consultation / Booking Modal */}
      <FreeConsultationModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTopic="Auditoría de Reservas Directas y Rentabilidad Hotelera (15 min)"
        defaultCallType={bookingCallType}
      />
    </div>
  );
};

export default HospitalitySolutions;
