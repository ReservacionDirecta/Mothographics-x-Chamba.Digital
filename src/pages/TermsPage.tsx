import { motion } from "motion/react";
import { ChambaNavbar, ChambaFooter, WhatsAppIcon } from "../App";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Layers, 
  CreditCard, 
  Calendar, 
  ShieldAlert, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Bot, 
  Globe, 
  Server
} from "lucide-react";
import { SEO } from "../components/SEO";

export default function TermsPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <SEO 
        title="Términos y Condiciones | Chamba Digital"
        description="Marco contractual, clasificación de planes, estructura de pagos, dinámica de cambios de los lunes, propiedad y suspensión del modelo WaaS de Chamba Digital."
        keywords="términos y condiciones chamba digital, marco legal waas, políticas de servicio, planes web app, suscripción mensual"
        ogTitle="Términos y Condiciones | Chamba Digital"
        ogDescription="Términos y condiciones oficiales del servicio de Web / Web App as a Service (WaaS)."
        ogImage="https://chamba.digital/og-image.webp"
        canonicalUrl="https://chamba.digital/terminos"
      />
      <ChambaNavbar />
      
      <main className="pt-[100px] pb-24 px-6 md:px-10 max-w-[920px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="label-editorial">Legal</span>
          <h1 className="text-[34px] md:text-[54px] font-black tracking-tight leading-none mb-4 text-slate-900">
            Términos y <span className="text-accent">Condiciones</span>
          </h1>
          <p className="text-slate-600 text-[15px] md:text-[16px] mb-10 leading-relaxed max-w-2xl font-normal">
            Última actualización: Agosto de 2026
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* 1. Naturaleza del Servicio y Marco Contractual */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                1. Naturaleza del Servicio y Marco Contractual
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Chamba Digital proporciona servicios de infraestructura tecnológica bajo el modelo <strong>WaaS (Web/Web App as a Service)</strong>, ingeniería de software, integración de inteligencia artificial y marketing.
            </p>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Las labores se ejecutan bajo la modalidad civil a título personal por <strong>Yosward Edgardy Ríos Casanova</strong> (RUC 15609816934), emitiendo los correspondientes comprobantes electrónicos (<strong>Factura, Boleta de Venta o Recibo por Honorarios - SUNAT</strong>) conforme a ley. La contratación no constituye vínculo de subordinación laboral ni relación societaria.
            </p>
          </section>

          {/* 2. Clasificación de Planes y Alcance del Servicio */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                2. Clasificación de Planes y Alcance del Servicio
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Para garantizar la transparencia en los desarrollos, los servicios bajo suscripción WaaS se categorizan en tres niveles:
            </p>
            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  Plan Web Tradicional:
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diseñado para presencia corporativa y embudos de captación. Incluye el desarrollo de páginas informativas, <em>landing pages</em> y enlaces directos a WhatsApp. No incluye bases de datos dinámicas, paneles de usuario, ni pasarelas de pago transaccionales.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-600" />
                  Plan Web App:
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diseñado para la automatización y lógica de negocio. Incluye plataformas interactivas, paneles de control (dashboards), catálogos administrables, sistemas de reservas y gestión de bases de datos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600" />
                  Plan Web App con IA:
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Solución de alta ingeniería que suma al plan anterior la integración de Inteligencia Artificial (asistentes conversacionales, automatización de reservas, procesamiento de datos o generación de contenido).
                </p>
                <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 mt-2 font-medium">
                  <strong>Nota sobre APIs de IA:</strong> Los costos variables por consumo de tokens/API de terceros (ej. OpenAI, Google Gemini, Anthropic) serán asumidos por el cliente de forma independiente, salvo que el acuerdo comercial especifique lo contrario.
                </div>
              </div>
            </div>
          </section>

          {/* 3. Estructura de Pagos y Suscripciones (Modelo WaaS) */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                3. Estructura de Pagos y Suscripciones (Modelo WaaS)
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El servicio opera bajo un esquema de suscripción prepago que incluye hosting en servidores de alta velocidad, certificado SSL y mantenimiento correctivo continuo.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Planes Mensuales:</strong>
                Requieren un <strong>compromiso de permanencia mínima de seis (6) meses</strong>. El pago se realiza de forma anticipada cada mes.
              </li>
              <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Planes Semestrales (Pago Único):</strong>
                Se abonan en su totalidad al inicio del periodo, aplicando las promociones vigentes de meses gratuitos o descuentos por pronto pago.
              </li>
              <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Desarrollos Adicionales (Fuera de suscripción):</strong>
                Requieren un <strong>60% de anticipo</strong> para iniciar operaciones y el <strong>40% restante</strong> previo a la entrega de accesos y pase a producción.
              </li>
            </ul>
          </section>

          {/* 4. Dinámica de Cambios Ilimitados (Regla de los Lunes) */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                4. Dinámica de Cambios Ilimitados (Regla de los Lunes)
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El cliente cuenta con <strong>actualizaciones de contenido ilimitadas</strong> bajo las siguientes normativas:
            </p>
            
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Recepción Consolidada:
                </strong>
                <p className="text-slate-600 pl-6">
                  El cliente debe enviar una única lista con todos sus requerimientos de actualización (textos, fotos, precios, promociones) <strong>exclusivamente los días lunes</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Implementación:
                </strong>
                <p className="text-slate-600 pl-6">
                  Nuestro equipo técnico procesará e implementará la lista de manera organizada entre el <strong>martes y el viernes</strong> de esa misma semana.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-amber-950 space-y-1">
                <strong className="text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Cambios Urgentes (Excepción de los Viernes):
                </strong>
                <p className="text-amber-900/90 pl-6">
                  Se admitirán solicitudes urgentes los días viernes, estrictamente limitadas a modificaciones de rápida ejecución (ej. ocultar promociones expiradas o corrección de precios de emergencia). Su implementación queda sujeta a la disponibilidad de la agenda técnica del equipo.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                  Límites del Alcance:
                </strong>
                <p className="text-slate-600 pl-6">
                  Las actualizaciones aplican sobre la estructura web existente. El desarrollo de nuevas funcionalidades, rediseños estructurales completos o el reentrenamiento complejo de modelos de IA se cotizarán como servicios adicionales.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Propiedad, Incumplimiento de Pago y Suspensión */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-red-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                5. Propiedad, Incumplimiento de Pago y Suspensión
              </h2>
            </div>
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Propiedad Absoluta:
                </strong>
                <p className="text-emerald-900/90 pl-6">
                  El dominio y la plataforma web son <strong>100% propiedad del cliente desde el primer día de servicio</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Atrasos en Suscripciones:
                </strong>
                <p className="text-slate-700 pl-6">
                  En caso de incumplimiento de pago en la fecha de corte, se colocará un <strong>banner visible en la página web</strong> notificando la falta de pago.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 text-xs sm:text-sm text-slate-800 space-y-1">
                <strong className="text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Suspensión del Servicio:
                </strong>
                <p className="text-slate-700 pl-6">
                  El cliente dispondrá de un periodo de gracia de <strong>treinta (30) días calendario</strong> para regularizar su cuenta manteniendo la web activa (con el banner visible). Transcurrido este lapso sin concretarse el pago, la página web y sus servicios asociados quedarán suspendidos en su totalidad.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Propiedad Intelectual, Confidencialidad y Datos */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                6. Propiedad Intelectual, Confidencialidad y Datos
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Chamba Digital se reserva la propiedad intelectual respecto a metodologías operativas, arquitecturas de software base, y código fuente propietario utilizado para el despliegue del modelo WaaS. Para más información, consulta nuestra sección de <Link to="/propiedad-intelectual" className="text-accent font-bold underline">Propiedad Intelectual</Link>.
            </p>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Ambas partes mantendrán <strong>estricta confidencialidad</strong> sobre modelos de negocio y credenciales. Los datos, clientes y <em>leads</em> capturados a través de las plataformas pertenecen de manera exclusiva y perpetua al cliente.
            </p>
          </section>

          {/* 7. Terminación del Servicio */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900">
                7. Terminación del Servicio
              </h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              El cliente puede solicitar la cancelación de su suscripción notificando con antelación (sujeto al cumplimiento de la <strong>permanencia mínima de 6 meses en planes mensuales</strong>). Los pagos realizados no son reembolsables.
            </p>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
              Chamba Digital se reserva el derecho de terminar el servicio ante faltas de respeto al equipo, impagos prolongados o solicitudes que infrinjan la legalidad.
            </p>
          </section>
        </div>

        {/* Contact box */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-bold">¿Tienes alguna pregunta sobre nuestros Términos y Condiciones?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Atendemos directamente por WhatsApp para resolver cualquier duda sobre tu contrato o suscripción.
          </p>
          <div className="pt-2">
            <a 
              href="https://wa.me/51904060670?text=Hola,%20tengo%20preguntas%20sobre%20los%20términos%20y%20condiciones%20de%20Chamba%20Digital." 
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
