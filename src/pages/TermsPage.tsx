import { motion } from "motion/react";
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from "../App";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Layers, 
  KeyRound, 
  AlertTriangle, 
  Server, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { SEO } from "../components/SEO";

export default function TermsPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <SEO 
        title="Términos y Condiciones del Servicio WaaS | Chamba Digital"
        description="Políticas, condiciones de suscripción, dinámica de cambios de los lunes, permanencia y soporte técnico de Chamba Digital."
        keywords="términos y condiciones chamba digital, políticas waas, suscripción web mensual, reglas de servicio"
        ogTitle="Términos y Condiciones del Servicio WaaS | Chamba Digital"
        ogDescription="Políticas y condiciones claras y transparentes del servicio de Web as a Service (WaaS)."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/terminos"
      />
      <ChambaNavbar />
      
      <main className="pt-[100px] pb-24 px-6 md:px-10 max-w-[920px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="label-editorial">Marco Contractual & Operativo</span>
          <h1 className="text-[34px] md:text-[54px] font-black tracking-tight leading-none mb-4 text-slate-900">
            Políticas y Condiciones <br />
            <span className="text-accent">del Servicio WaaS</span>
          </h1>
          <p className="text-slate-600 text-[15px] md:text-[16px] mb-10 leading-relaxed max-w-2xl font-normal">
            En Chamba Digital operamos bajo un modelo transparente de Web as a Service (WaaS) para garantizar la continuidad, seguridad y evolución permanente de tu plataforma web.
          </p>
        </motion.div>

        {/* Marco Legal & Emisión SUNAT */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 mb-10 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
          <Building2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <strong>Identificación y Formalidad Tributaria:</strong> Los servicios son prestados por <strong>Yosward Edgardy Ríos Casanova</strong> (RUC 15609816934 / Chamba Digital), emitiendo los comprobantes electrónicos correspondientes conforme a la normativa de SUNAT (Perú).
          </div>
        </div>

        <div className="space-y-10">
          {/* Política 1: Dinámica de Cambios (Regla de los Lunes) */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                1. Dinámica de Cambios (Regla de los Lunes)
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El plan incluye <strong>cambios ilimitados de contenido</strong>. Para garantizar un desarrollo ordenado y tiempos de entrega eficientes, las solicitudes no se procesan de forma individual día a día.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
              <div className="font-bold flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cómo enviar tus solicitudes:
              </div>
              <p>
                El cliente debe enviar una lista consolidada con todos sus requerimientos <strong>exclusivamente los días lunes</strong> vía WhatsApp o correo. Nuestro equipo técnico implementará los cambios de manera organizada a lo largo de la semana.
              </p>
            </div>
          </section>

          {/* Política 2: Alcance de los Cambios */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                2. Alcance de los Cambios
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Las actualizaciones semanales aplican <strong>únicamente sobre la estructura web existente</strong>:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Modificación y redacción de textos
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Actualización de fotografías y galerías
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Ajustes de precios y catálogo de servicios
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Banners promocionales estacionales
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-500 italic pt-1">
              * El desarrollo de nuevas funcionalidades complejas (pasarelas adicionales, sistemas externos a medida), añadir páginas principales nuevas o realizar rediseños estructurales completos se cotiza por separado como módulo adicional.
            </p>
          </section>

          {/* Política 3: Propiedad y Permanencia Mínima */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                3. Propiedad y Permanencia Mínima
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El dominio (.com / .pe) y la plataforma web son <strong>100% propiedad del cliente desde el primer día</strong>. Eres el dueño legítimo de tu activo digital y de la información de tus clientes.
            </p>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
              <strong>Compromiso de permanencia:</strong> Para aquellos clientes que elijan el <strong>plan mensual por suscripción (sin desembolso inicial de miles de dólares)</strong>, existe un compromiso de pago mínimo de <strong>6 meses de servicio</strong> para amortizar los costos de ingeniería, despliegue y configuración de infraestructura.
            </div>
          </section>

          {/* Política 4: Pagos, Atrasos y Suspensión */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-red-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                4. Pagos, Atrasos y Suspensión
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El servicio funciona bajo la modalidad de <strong>suscripción prepago mensual</strong>. En caso de incumplimiento de pago en la fecha acordada, se aplicarán las siguientes medidas consecutivas:
            </p>
            
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Aviso y Banner de Regularización:</strong> Se colocará un banner visible en la página web indicando la falta de pago de la suscripción.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Periodo de Gracia de 30 Días:</strong> El cliente dispondrá de un periodo de gracia de <strong>30 días naturales</strong> para regularizar su cuenta manteniendo el sitio web activo (con el banner informativo visible).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Suspensión Total del Servicio:</strong> Si transcurridos los 30 días el cliente decide no regularizar el pago, <strong>la página web y los servicios cloud quedarán suspendidos</strong> en su totalidad hasta la liquidación del saldo pendiente.
                </div>
              </div>
            </div>
          </section>

          {/* Política 5: Mantenimiento y Soporte Técnico */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                5. Mantenimiento y Soporte Técnico
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              La suscripción mensual cubre de manera integral todos los costos operativos de infraestructura:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Servidores de alta velocidad:</strong> Alojamiento cloud optimizado para carga en menos de 1 segundo.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Certificado de seguridad SSL:</strong> Renovación y protección de encriptación HTTPS continua.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Soporte correctivo prioritario:</strong> Monitoreo 24/7 y resolución técnica inmediata en caso de incidencias o caídas del sitio.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Contact box */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-bold">¿Tienes alguna pregunta sobre nuestras condiciones?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Atendemos directamente por WhatsApp para resolver cualquier duda sobre tu contrato o suscripción.
          </p>
          <div className="pt-2">
            <a 
              href="https://wa.me/51904060670?text=Hola,%20tengo%20dudas%20sobre%20los%20términos%20y%20condiciones%20del%20servicio%20WaaS." 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              Contactar Soporte por WhatsApp
            </a>
          </div>
        </div>
      </main>
      
      <ChambaFooter />
    </div>
  );
}
