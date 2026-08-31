import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from "../App";
import { SEO } from "../components/SEO";
import { FreeConsultationModal } from "../components/FreeConsultationModal";
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Lock, 
  Building2, 
  HelpCircle,
  Clock,
  RefreshCw,
  Server
} from "lucide-react";
import { useToast } from "../context/ToastContext";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  period: string;
  semestralPrice?: string;
  description: string;
  features: string[];
  ctaText: string;
  checkoutTier?: string;
  isCustom?: boolean;
  tagColor?: string;
}

export const PaymentsPage: React.FC = () => {
  const toast = useToast();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "semestral">("monthly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleCheckout = async (tier: string) => {
    setLoadingTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier })
      });
      const data = await res.json();
      if (data.url) {
        toast.info("Redirigiendo a pasarela segura Polar.sh...");
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Error iniciando checkout seguro");
      }
    } catch {
      toast.error("Error de conexión al procesar el pago");
    } finally {
      setLoadingTier(null);
    }
  };

  const plans: PricingPlan[] = [
    {
      id: "web-tradicional",
      name: "Web Tradicional WaaS",
      badge: "Más Accesible",
      price: billingCycle === "monthly" ? "$49" : "$245",
      period: billingCycle === "monthly" ? "/ mes" : " / 6 meses",
      semestralPrice: billingCycle === "monthly" ? "o $245 semestral (paga 5, recibe 6)" : "Ahorras $49 pagando 5 meses",
      description: "Ideal para empresas, profesionales, tiendas y marcas que buscan presencia de alto nivel y captación.",
      features: [
        "Desarrollo Handcrafted a medida (React + Vite)",
        "Hosting Cloud ultra rápido en Railway incluido",
        "Certificado SSL, Dominio & SEO Técnico",
        "Actualizaciones y cambios ilimitados de contenido",
        "Regla de los lunes + Urgencias de los viernes",
        "Soporte directo prioritario por WhatsApp",
        "Garantía Cero Riesgo 15 días (100% devolución)"
      ],
      ctaText: "Suscribirme al Plan Tradicional",
      checkoutTier: "49",
      tagColor: "bg-blue-50 text-accent border-blue-100"
    },
    {
      id: "web-app",
      name: "Web App Advanced",
      badge: "Recomendado",
      popular: true,
      price: billingCycle === "monthly" ? "$99" : "$495",
      period: billingCycle === "monthly" ? "/ mes" : " / 6 meses",
      semestralPrice: billingCycle === "monthly" ? "o $495 semestral (paga 5, recibe 6)" : "Ahorras $99 con pago único semestral",
      description: "Para negocios que requieren panel de administración, catálogo interactivo, APIs y base de datos.",
      features: [
        "Todo lo incluido en Web Tradicional",
        "Panel de Control (Dashboard) y Base de Datos Cloud",
        "Integración de pasarelas (Yape, Plin, Culqi, Stripe)",
        "Gestión dinámica de usuarios, leads y productos",
        "Copias de seguridad diarias automatizadas",
        "Arquitectura escalable sin caídas por tráfico",
        "Soporte técnico dedicado de ingeniería"
      ],
      ctaText: "Suscribirme a Web App",
      checkoutTier: "99",
      tagColor: "bg-accent text-white"
    },
    {
      id: "web-hospitality",
      name: "Hospitality Pro (Hoteles)",
      badge: "Especializado Hotelería",
      price: "$999",
      period: "pago único",
      description: "Solución integral para hoteles y resorts: motor directo sin comisiones y paquete visual con IA.",
      features: [
        "Web Hotelera de alta conversión y carga <1s",
        "Integración completa con Sirvoy PMS / Channel Manager",
        "Motor de reservas directas 0% de comisiones OTA",
        "Agente de reservas básico para atención 24/7",
        "Paquete Visual Google Flow (2,500 créditos incluidos)",
        "Sincronización en vivo con Booking, Airbnb y Expedia",
        "Capacitación en vivo y entrega llave en mano"
      ],
      ctaText: "Cotizar Plan Hospitality Pro",
      isCustom: true,
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "web-ia",
      name: "Web App con IA & Agentes",
      badge: "Enterprise IA",
      price: "$599.99",
      period: "/ mes",
      description: "Transformación operativa con agentes autónomos 24/7, integración LLM y flujos de trabajo inteligentes.",
      features: [
        "Agentes inteligentes y asistentes conversacionales 24/7",
        "Automatización de workflows con WhatsApp y CRM",
        "Infraestructura cloud dedicada y monitoreo 24/7",
        "Integración con modelos Gemini 2.5 Flash / Claude",
        "Entrenamiento con Base de Conocimiento de tu empresa",
        "Analítica predictiva y optimización mensual",
        "Consultoría VIP de arquitectura de software"
      ],
      ctaText: "Suscribirme con IA",
      checkoutTier: "500",
      tagColor: "bg-purple-50 text-purple-700 border-purple-200"
    }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white min-h-screen flex flex-col">
      <SEO
        title="Planes y Pagos WaaS | Chamba Digital"
        description="Selecciona tu plan Web as a Service (WaaS) desde $49/mes. Desarrollo a medida, hosting cloud, cambios ilimitados y pasarela de pago seguro."
        canonicalUrl="https://chamba.digital/payments"
      />
      <ChambaNavbar />

      <main className="flex-1 pt-[100px] pb-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto w-full">
        {/* Header Hero */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="label-editorial mx-auto">Pasarela & Suscripciones</span>
            <h1 className="text-[32px] sm:text-[46px] md:text-[54px] font-black tracking-tight text-slate-900 leading-[1.08] mb-4">
              Invierte en tecnología con <span className="text-accent">sombra de calidad</span>
            </h1>
            <p className="text-slate-600 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto font-normal">
              Sin desembolsos de miles de dólares a ciegas. Accede a tu equipo de ingeniería y servidor cloud de alta velocidad por una suscripción transparente.
            </p>

            {/* Billing Switcher */}
            <div className="mt-8 inline-flex items-center p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 heroui-shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-900 heroui-shadow-sm border border-slate-200/50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Facturación Mensual
              </button>
              <button
                onClick={() => setBillingCycle("semestral")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === "semestral"
                    ? "bg-white text-slate-900 heroui-shadow-sm border border-slate-200/50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Semestral</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-black">
                  6to mes GRATIS
                </span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards Grid with HeroUI realistic soft shadows */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                plan.popular
                  ? "bg-slate-900 text-white border border-slate-800 heroui-shadow-xl ring-1 ring-accent/30"
                  : "bg-white text-slate-900 border border-slate-200/70 heroui-shadow-md hover:heroui-shadow-lg hover:border-slate-300/80"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase tracking-[0.15em] px-3.5 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                {!plan.popular && plan.badge && (
                  <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-3 ${plan.tagColor || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                    {plan.badge}
                  </span>
                )}

                <h3 className={`text-xl font-black tracking-tight ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>

                <div className="mt-4 mb-2 flex items-baseline gap-1.5">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs font-bold ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {plan.period}
                  </span>
                </div>

                {plan.semestralPrice && (
                  <p className={`text-[11px] font-bold mb-4 ${plan.popular ? "text-emerald-400" : "text-emerald-700"}`}>
                    {plan.semestralPrice}
                  </p>
                )}

                <p className={`text-[13px] leading-relaxed mb-6 font-normal ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {plan.description}
                </p>

                <div className={`pt-4 border-t ${plan.popular ? "border-slate-800" : "border-slate-100"}`}>
                  <span className={`text-[11px] font-black uppercase tracking-[0.15em] block mb-3.5 ${plan.popular ? "text-slate-400" : "text-slate-400"}`}>
                    Incluye en el servicio:
                  </span>
                  <ul className="space-y-2.5 text-[12px] sm:text-[13px]">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-emerald-600"}`} />
                        <span className={`leading-snug ${plan.popular ? "text-slate-200 font-medium" : "text-slate-700 font-medium"}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                {plan.isCustom ? (
                  <a
                    href="https://wa.me/51904060670?text=Hola%2C%20quiero%20cotizar%20el%20Plan%20Hospitality%20Pro%20($999)%20para%20mi%20hotel."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 heroui-shadow-sm text-center"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> {plan.ctaText}
                  </a>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan.checkoutTier || "49")}
                    disabled={loadingTier === plan.checkoutTier}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-accent hover:bg-accent/90 text-white heroui-shadow-md"
                        : "bg-slate-900 hover:bg-slate-800 text-white heroui-shadow-sm"
                    }`}
                  >
                    {loadingTier === plan.checkoutTier ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        {plan.ctaText}
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Confidence & Policy Guarantees (HeroUI Card Layout) */}
        <section className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-10 heroui-shadow-lg mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="label-editorial mx-auto">Políticas & Transparencia</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Garantías y Condiciones Claras
            </h2>
            <p className="text-slate-600 text-sm font-normal mt-2">
              Trabajamos bajo estándares rigurosos de ingeniería y respaldo civil con emisión de comprobantes SUNAT.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/50 heroui-shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Regla de los Lunes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envías tu lista consolidada los lunes y nuestro equipo la implementa de forma organizada entre martes y viernes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/50 heroui-shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Urgencias de los Viernes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recepción hasta las 12:00 PM para correcciones críticas inmediatas (precios erróneos o promociones vencidas).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/50 heroui-shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Garantía Cero Riesgo 15d</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% de devolución si el diseño preliminar no cumple con tus expectativas de marca en los primeros 15 días.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/50 heroui-shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Facturación SUNAT</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emisión legal con RUC 15609816934 (Factura, Boleta de Venta o Recibo por Honorarios Electrónico).
              </p>
            </div>
          </div>
        </section>

        {/* CTA Consultation Banner */}
        <section className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 heroui-shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block bg-accent/20 border border-accent/40 text-blue-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              ¿Dudas sobre cuál plan elegir?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Agenda una Consulta Gratuita de 15 Minutos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Un ingeniero analizará tu caso sin ningún compromiso para recomendarte la arquitectura óptima.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-extrabold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all heroui-shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Agendar Sesión de 15 min
              </button>
              <a
                href="https://wa.me/51904060670?text=Hola%2C%20tengo%20preguntas%20sobre%20los%20planes%20WaaS."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-700 text-center"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <ChambaFooter />

      <FreeConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultTopic="Asesoría Técnica de Planes WaaS y Pagos (15 min)"
      />
    </div>
  );
};

export default PaymentsPage;
