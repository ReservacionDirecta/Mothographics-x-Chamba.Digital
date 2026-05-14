import { motion } from "motion/react";
import { ChambaNavbar, Logo, ChambaFooter } from "../App";
import { Link } from "react-router-dom";
import { Eye, ShieldCheck, Database, Mail, Bell } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      <main className="pt-[100px] pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="label-editorial">Seguridad</span>
          <h1 className="text-[36px] md:text-[60px] font-black tracking-tighter leading-none mb-8">
            Política de <span className="text-accent">Privacidad</span>
          </h1>
        </motion.div>

        <div className="space-y-10 text-[15px] text-muted leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4 text-fg">
              <Eye className="w-5 h-5 text-accent" />
              <h2 className="text-[18px] font-black uppercase tracking-tight">Recopilación de Datos</h2>
            </div>
            <p>
              Chamba Digital recopila información personal únicamente a través de nuestros formularios de contacto, suscripciones a boletines y herramientas de diagnóstico. Los datos incluyen: Nombre, correo electrónico, teléfono de WhatsApp y detalles sobre su necesidad tecnológica o comercial.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-fg">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <h2 className="text-[18px] font-black uppercase tracking-tight">Uso de la Información</h2>
            </div>
            <p>Utilizamos sus datos exclusivamente para:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Responder a solicitudes de presupuesto y asesoría.</li>
              <li>Personalizar las propuestas técnicas que enviamos.</li>
              <li>Enviar actualizaciones críticas sobre sus proyectos activos.</li>
              <li>Remitir contenido de valor sobre IA y negocios (opcional).</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-fg">
              <Database className="w-5 h-5 text-accent" />
              <h2 className="text-[18px] font-black uppercase tracking-tight">Seguridad de Datos</h2>
            </div>
            <p>
              Implementamos protocolos de seguridad estándar (SSL, encriptación en reposo y acceso restringido) para proteger la integridad de su información. Nunca vendemos ni compartimos sus datos con terceros con fines publicitarios ajenos a Chamba Digital.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-fg">
              <Mail className="w-5 h-5 text-accent" />
              <h2 className="text-[18px] font-black uppercase tracking-tight">Derechos del Usuario</h2>
            </div>
            <p>
              Usted tiene derecho a solicitar el acceso, corrección o eliminación de sus datos personales de nuestra base de datos en cualquier momento. Puede hacerlo enviando un mensaje a <span className="text-accent font-bold">contacto@chamba.digital</span> o vía WhatsApp.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-fg">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="text-[16px] font-black uppercase tracking-tight">Cookies</h2>
            </div>
            <p className="text-[13px]">
              Utilizamos cookies técnicas y de análisis (Google Analytics, Pixel de Meta) para entender cómo interactúan los usuarios con nuestra web y mejorar la experiencia de navegación. Puede desactivarlas desde la configuración de su navegador.
            </p>
          </section>
        </div>
      </main>
      <ChambaFooter />
    </div>
  );
}
