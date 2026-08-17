import { motion } from "motion/react";
import { ChambaNavbar, Logo, ChambaFooter } from "../App";
import { Link } from "react-router-dom";
import { Shield, Scale, CreditCard, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[100px] pb-24 px-6 md:px-10 max-w-[900px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label-editorial">Legal</span>
          <h1 className="text-[36px] md:text-[60px] font-black tracking-tighter leading-none mb-8">
            Términos y <span className="text-accent">Condiciones</span>
          </h1>
          <p className="text-muted text-[16px] mb-12 leading-relaxed">
            Última actualización: {new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">1. Naturaleza del Servicio y Marco Contractual</h2>
            </div>
            <p className="text-muted text-[15px] leading-relaxed mb-3">
              Chamba Digital proporciona servicios de consultoría tecnológica, ingeniería de software, desarrollo web, integración de inteligencia artificial y marketing de conversión. 
            </p>
            <p className="text-muted text-[15px] leading-relaxed">
              Las labores se ejecutan bajo la modalidad civil de <strong>Locación de Servicios a título personal</strong> por <strong>Yosward Edgardy Ríos Casanova</strong> (RUC 15609816934), emitiendo los correspondientes <strong>Recibos por Honorarios Electrónicos (RHE - SUNAT)</strong> conforme a ley. La contratación no constituye vínculo de subordinación laboral ni relación societaria.
            </p>
          </section>

          {/* Section 2 - Payments (CRITICAL) */}
          <section className="bg-white/5 p-8 rounded-[32px] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">2. Estructura de Pagos y Comprobantes</h2>
            </div>
            <div className="space-y-6 text-[15px]">
              <div>
                <h3 className="font-bold text-fg mb-2">Proyectos Mayores o Iguales a $500 USD:</h3>
                <ul className="list-disc pl-5 text-muted space-y-2">
                  <li><strong>Pago Inicial:</strong> 40% del total para iniciar el levantamiento de información y diseño.</li>
                  <li><strong>Saldo Restante (60%):</strong> Se divide en 4 cuotas semanales consecutivas del 15% cada una.</li>
                  <li><strong>Condición de Revisión:</strong> Cada pago semanal debe realizarse 24 horas antes de la sesión de revisión programada. El incumplimiento del pago pausará el desarrollo sin responsabilidad para Chamba Digital.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-fg mb-2">Proyectos Menores a $500 USD:</h3>
                <ul className="list-disc pl-5 text-muted space-y-2">
                  <li><strong>Pago Inicial:</strong> 60% para iniciar el trabajo.</li>
                  <li><strong>Pago Final:</strong> 40% previo a la entrega de accesos y puesta en producción.</li>
                </ul>
              </div>
              <div className="pt-3 border-t border-white/10 text-muted text-[14px]">
                * Todo desembolso cuenta con la emisión del respectivo Recibo por Honorarios Electrónico (RHE) a la persona natural o jurídica contratante.
              </div>
            </div>
          </section>

          {/* Section 3 - Revisions */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">3. Revisiones y Aceptación</h2>
            </div>
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              Para proyectos estándar, se incluyen 4 rondas de revisiones técnicas y estéticas sincronizadas con el cronograma de pagos.
            </p>
            <ul className="list-disc pl-5 text-muted text-[14px] space-y-2">
              <li>Una "ronda" se define como una lista consolidada de ajustes sobre los entregables de la semana.</li>
              <li>Cambios estructurales fuera del brief inicial se cotizarán como adicionales.</li>
              <li>El silencio del cliente por más de 7 días naturales tras una entrega se considerará como aceptación tácita del entregable.</li>
            </ul>
          </section>

          {/* Section 4 - Intellectual Property */}
          <section className="p-6 md:p-8 rounded-[24px] bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">4. Propiedad Intelectual y Secretos Comerciales</h2>
            </div>
            <p className="text-fg/90 text-[15px] leading-relaxed mb-4">
              Conforme a las prácticas comerciales nacionales e internacionales, <strong>CHAMBA</strong> se reserva su propiedad intelectual respecto a estrategias, procesos y desarrollos, bien sean estos referidos a marketing, secretos y procesos comerciales, datos, metodologías operativas, estructuras de campañas, desarrollo de tecnologías propias y actividades afines a nuestro propósito comercial.
            </p>
            <p className="text-muted text-[14px] leading-relaxed">
              La propiedad de los códigos fuente y activos finales a medida se transfiere al cliente de forma completa y perpetua <strong>únicamente tras la liquidación del 100% del proyecto</strong>. Conoce más en nuestra sección de <Link to="/propiedad-intelectual" className="text-accent underline font-bold">Propiedad Intelectual</Link>.
            </p>
          </section>

          {/* Section 5 - Confidentiality */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">5. Confidencialidad y Datos</h2>
            </div>
            <p className="text-muted text-[15px] leading-relaxed">
              Ambas partes se comprometen a no divulgar información estratégica, contraseñas o modelos de negocio compartidos durante el proyecto. Los datos de leads capturados a través de nuestras implementaciones pertenecen exclusivamente al cliente.
            </p>
          </section>

          {/* Section 6 - Termination */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h2 className="text-[20px] font-black uppercase tracking-tight">6. Terminación</h2>
            </div>
            <p className="text-muted text-[15px] leading-relaxed">
              El cliente puede cancelar el proyecto en cualquier momento, sin embargo, los pagos realizados hasta la fecha no son reembolsables, ya que cubren las horas de ingeniería y diseño ya ejecutadas. Chamba Digital puede terminar el servicio ante faltas de respeto, impagos prolongados o solicitudes que infrinjan la ética legal.
            </p>
          </section>
        </div>

        <div className="mt-20 p-8 border border-accent/20 rounded-[24px] bg-accent/5 text-center">
          <p className="text-[14px] font-bold">¿Tienes dudas sobre nuestras políticas?</p>
          <a href="https://wa.me/51904060670" className="text-accent font-black uppercase tracking-widest text-[12px] mt-2 block hover:underline">
            Hablar con un consultor legal
          </a>
        </div>
      </main>
      <ChambaFooter />
    </div>
  );
}
