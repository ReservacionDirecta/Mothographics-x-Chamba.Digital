import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from '../../App';
import { SEO } from '../../components/SEO';
import { 
  ShoppingCart, 
  BarChart3, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Calendar,
  Lock
} from 'lucide-react';
import { FreeConsultationModal } from '../../components/FreeConsultationModal';

const EcommerceLandingPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCallType, setBookingCallType] = useState<"call_5min" | "meeting_15_30min">("meeting_15_30min");

  const openBooking = (type: "call_5min" | "meeting_15_30min" = "meeting_15_30min") => {
    setBookingCallType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white overflow-x-hidden">
      <SEO 
        title="Desarrollo E-commerce de Alta Conversión | Chamba Digital"
        description="Tiendas online ultrarrápidas con optimización de conversión (CRO), pasarelas de pago integradas y control total de inventario."
        keywords="ecommerce peru, desarrollo tiendas online, shopify peru, woocommerce waas, pasarelas de pago culqi stripe mercadopago, cro e-commerce"
        ogTitle="Desarrollo E-commerce de Alta Conversión | Chamba Digital"
        ogDescription="Tiendas online ultrarrápidas diseñadas para vender. Sin comisiones ocultas y con control total."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/ecommerce"
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
              <ShoppingBag className="w-3.5 h-3.5 text-accent" />
              Ingeniería para E-Commerce & Retail
            </div>
            
            <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-black tracking-tight leading-[1.08] text-slate-900">
              Tiendas online rápidas, limpias y <span className="text-accent underline decoration-accent/30 decoration-wavy">diseñadas para convertir</span>.
            </h1>
            
            <p className="text-[17px] sm:text-[20px] text-slate-600 leading-relaxed font-normal">
              Construimos tu plataforma de venta online sin sobrecostos ni plantillas lentas: catálogo administrable, pagos con tarjeta al instante y conexión directa con tu inventario.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBooking("meeting_15_30min")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-xl font-bold text-[14px] shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4 text-accent" />
                Agendar Diagnóstico E-Commerce (15 min)
              </motion.button>
              <a 
                href="#pilares" 
                className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 py-3 px-4"
              >
                Ver cómo funciona el sistema <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Micro-proof */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-[12px] font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Checkout en 1 paso</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Carga móvil en &lt;1 segundo</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Integración con Culqi, Stripe y Yape</span>
            </div>
          </motion.div>
        </section>

        {/* 3 Pillars of E-Commerce Engineering */}
        <section id="pilares" className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Arquitectura de Venta</span>
            <h2 className="text-[28px] sm:text-[40px] font-black tracking-tight leading-tight text-slate-900">
              Elimina los 3 mayores frenos de compra en internet.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              El 70% de los carritos se abandonan por lentitud, procesos de pago confusos o falta de confianza visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Velocidad de Carga Instantánea</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cada segundo de retraso reduce las ventas un 20%. Desarrollamos con código limpio para que tu catálogo vuele en conexiones 4G móviles.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Pasarelas de Pago Sin Fricción</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tus clientes pagan con tarjetas de crédito/débito, transferencias y billeteras digitales (Yape, Plin, MercadoPago, Culqi, Stripe).
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-slate-200/60 heroui-shadow-sm hover:heroui-shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Panel de Control Sencillo</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Administra productos, fotos, ofertas y pedidos desde una interfaz clara y sin complicaciones técnicas.
              </p>
            </div>
          </div>
        </section>

        {/* Real Proof: Dupla Work & E-Commerce Showcase */}
        <section className="py-16 md:py-20 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="label-editorial">Caso Destacado</span>
              <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight leading-tight text-slate-900">
                Dupla Work: Catálogo digital y cotización directa para empresas.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
                Plataforma comercial desarrollada para catálogo corporativo de mobiliario de oficina, con filtros dinámicos y captura directa de solicitudes a WhatsApp.
              </p>
              
              <div className="space-y-2.5 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Catálogo modular de productos y colecciones.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cierre de cotizaciones sin intermediarios ni comisiones por venta.</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Infraestructura WaaS con cambios ilimitados de productos.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.dupla.work"
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
                  Cotizar mi Tienda Online
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img 
                src="/thumbs/duplawork.webp" 
                alt="Dupla Work - Catálogo y E-Commerce Corporativo" 
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA & Diagnostic Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="label-editorial mx-auto">Empieza Hoy</span>
            <h2 className="text-[28px] sm:text-[42px] font-black tracking-tight leading-tight text-slate-900">
              ¿Listo para vender con una tienda online profesional?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              Elige el formato que mejor se adapte a tu etapa comercial:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch text-left">
            {/* Opción 1: Diagnóstico Gratuito */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Sesión de Diagnóstico (15 Minutos)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Evaluamos tu catálogo, métodos de pago requeridos y estrategia de tráfico para darte una recomendación técnica sin costo ni compromiso.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 100% gratuito y sin presiones de venta.
                </div>
              </div>
              <button
                onClick={() => openBooking("meeting_15_30min")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Agendar Sesión Gratuita <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Opción 2: Desarrollo WaaS */}
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6 border border-slate-800">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Modelo WaaS por Suscripción
                </div>
                <h3 className="text-xl font-bold text-white">2. Tienda Online Llave en Mano</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Desarrollo de tienda, integración de pasarelas, hosting cloud de alta velocidad y cambios ilimitados semanales de productos y banners.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Dominio y plataforma 100% de tu propiedad.
                </div>
              </div>
              <a
                href="https://wa.me/51904060670?text=Hola,%20quiero%20cotizar%20el%20desarrollo%20de%20mi%20tienda%20online%20e-commerce."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md text-center"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                Hablar con un Especialista por WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-12 p-5 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-1">
            <div className="text-xs font-bold uppercase text-slate-800 tracking-wider flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" /> Garantía de Calidad Chamba Digital
            </div>
            <p className="text-xs text-slate-600">
              Entrega en plazos formales con soporte técnico correctivo y mantenimiento cloud garantizado.
            </p>
          </div>
        </section>
      </main>

      <ChambaFooter />

      <FreeConsultationModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTopic="Diagnóstico de Tienda Online y E-Commerce (15 min)"
        defaultCallType={bookingCallType}
      />
    </div>
  );
};

export default EcommerceLandingPage;
