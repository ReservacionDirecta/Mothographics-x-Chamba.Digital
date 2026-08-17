import React from "react";
import { motion } from "motion/react";
import { ChambaNavbar, ChambaFooter } from "../App";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import {
  Shield,
  FileCode2,
  Lock,
  Scale,
  Brain,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Zap
} from "lucide-react";

export default function IntellectualPropertyPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white min-h-screen flex flex-col">
      <SEO
        title="Propiedad Intelectual y Derechos de Autor | Chamba Digital"
        description="Aviso de reserva y protección de propiedad intelectual, metodologías operativas, código propietario, secretos comerciales y activos intangibles de Chamba Digital."
        keywords="Propiedad Intelectual Chamba Digital, Derechos de Autor, Secretos Comerciales, Metodología Propietaria, WaaS Copyright"
        canonicalUrl="https://chamba.digital/propiedad-intelectual"
      />
      <ChambaNavbar />

      <main className="pt-[110px] pb-24 px-6 md:px-10 max-w-[920px] mx-auto flex-1 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-extrabold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            Marco Legal Internacional
          </div>
          <h1 className="text-[34px] md:text-[54px] font-black tracking-tight leading-[1.05] mb-6">
            Aviso de Reserva y Protección de <br className="hidden md:inline" />
            <span className="text-accent">Propiedad Intelectual</span>
          </h1>
          <p className="text-muted text-[15px] md:text-[17px] leading-relaxed">
            Conforme a las leyes de propiedad intelectual vigentes, tratados de la OMPI (WIPO) y las prácticas comerciales internacionales, se expone el régimen de titularidad sobre metodologías, tecnología, desarrollos y marcas de CHAMBA.
          </p>
          <div className="mt-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
            Vigente desde 2026 · Régimen de Servicios Profesionales Independientes
          </div>
        </motion.div>

        {/* Core Declaration Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 md:p-8 rounded-[28px] bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border border-accent/30 shadow-xl mb-12 relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-[17px] md:text-[19px] font-black tracking-tight text-fg uppercase">
                Declaración Expresa de Reserva de Derechos
              </h2>
              <p className="text-[14px] md:text-[15px] text-fg/90 leading-relaxed font-medium">
                Conforme a las prácticas comerciales nacionales e internacionales, <strong>CHAMBA</strong> se reserva de forma irrevocable su propiedad intelectual respecto a estrategias, procesos y desarrollos, bien sean estos referidos a marketing, secretos y procesos comerciales, datos, metodologías operativas, estructuras de campañas, desarrollo de tecnologías propias y actividades afines a nuestro propósito comercial.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section className="glass p-7 md:p-8 rounded-[24px] border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <Brain className="w-5 h-5" />
              <h3 className="text-[18px] font-black uppercase tracking-tight text-fg">
                1. Metodologías, Estrategias y Secretos Comerciales
              </h3>
            </div>
            <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">
              Todos los modelos estratégicos, árboles de decisión, flujos de automatización (Make/n8n/IA), prompts propietarios, arquitecturas de embudo y marcos de conversión diseñados por CHAMBA constituyen <strong>secretos comerciales y creaciones intelectuales propias</strong>.
            </p>
            <ul className="list-disc pl-5 text-muted text-[14px] space-y-2">
              <li>El cliente recibe una licencia de uso comercial no exclusiva para su proyecto contratado.</li>
              <li>Queda expresamente prohibida la reventa, sublicenciamiento, clonación, ingeniería inversa o explotación directa de estas metodologías en beneficio de terceras agencias o consultoras competidoras.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="glass p-7 md:p-8 rounded-[24px] border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <FileCode2 className="w-5 h-5" />
              <h3 className="text-[18px] font-black uppercase tracking-tight text-fg">
                2. Código Fuente y Entregables Finales
              </h3>
            </div>
            <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">
              La transferencia de derechos patrimoniales sobre los activos o desarrollos específicos creados a medida se regirá estrictamente por lo siguiente:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-fg text-[14px] mb-1">Proyectos por Hitos / A Medida</h4>
                <p className="text-[13px] text-muted leading-relaxed">
                  Los derechos de uso y disposición del código desarrollado para el cliente se transfieren de forma definitiva <strong>únicamente tras la liquidación del 100% del precio pactado</strong>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="font-bold text-fg text-[14px] mb-1">Suscripciones Web (WaaS)</h4>
                <p className="text-[13px] text-muted leading-relaxed">
                  Bajo modelo de suscripción activa, la titularidad del software y componentes base permanece con CHAMBA mientras dure el servicio. En caso de retiro bajo los términos acordados, se facilita la entrega del código compilado para su migración.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="glass p-7 md:p-8 rounded-[24px] border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <Scale className="w-5 h-5" />
              <h3 className="text-[18px] font-black uppercase tracking-tight text-fg">
                3. Prestación de Servicios y Modalidad de Contratación
              </h3>
            </div>
            <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">
              Las labores profesionales y técnicas son prestadas en modalidad civil de <strong>Locación de Servicios a título personal</strong> (independiente / freelance) por su titular <em>Yosward Edgardy Ríos Casanova</em> (RUC 15609816934), emitiendo los correspondientes <strong>Recibos por Honorarios Electrónicos (RHE - SUNAT)</strong> para efectos de tributación y validez jurídica en Perú y en el extranjero.
            </p>
            <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">
              Esta relación no constituye contrato laboral, societario ni de subordinación, preservando la total autonomía técnica y metodológica en la ejecución de los servicios encomendados.
            </p>
          </section>

          {/* Section 4 */}
          <section className="glass p-7 md:p-8 rounded-[24px] border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-accent">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-[18px] font-black uppercase tracking-tight text-fg">
                4. Marcas y Protección de Portafolio
              </h3>
            </div>
            <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">
              CHAMBA, sus logotipos, imagotipos, diagramas y dominios asociados son de exclusiva titularidad. Salvo suscripción de un Acuerdo de Confidencialidad (NDA) previo y expreso, CHAMBA mantiene el derecho de exhibir casos de estudio, métricas anonimizadas e interfaces producidas en su portafolio comercial y canales digitales.
            </p>
          </section>

          {/* Related Links */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-fg text-[14px]">Documentación Legal Relacionada</h4>
              <p className="text-[12px] text-muted">Revisa las normas operativas y de privacidad complementarias.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/terminos"
                className="text-[12px] font-bold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-fg transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                to="/privacidad"
                className="text-[12px] font-bold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-fg transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 border border-accent/20 rounded-[28px] bg-accent/5 text-center">
          <h3 className="text-[18px] font-bold text-fg mb-2">¿Consultas sobre licencias o acuerdos de cesión?</h3>
          <p className="text-muted text-[14px] mb-5 max-w-md mx-auto">
            Si requieres convenios de confidencialidad específicos (NDA) o cláusulas de cesión a medida para corporaciones, contáctanos.
          </p>
          <a
            href="https://wa.me/51904060670?text=Hola!%20Deseo%20consultar%20sobre%20t%C3%A9rminos%20legales%20o%20NDA."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-6 py-3 rounded-xl font-bold text-[13px] uppercase tracking-wider shadow-md transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </main>

      <ChambaFooter />
    </div>
  );
}
