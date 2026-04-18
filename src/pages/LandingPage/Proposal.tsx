import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../../App';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Code2,
  Headphones,
  Zap,
  ChevronDown,
  Repeat,
  BarChart3,
  Target,
  Users,
  Sparkles,
} from 'lucide-react';

// --- Types ---
interface ServiceLine {
  name: string;
  detail: string;
  price: string;
  priceUsd: string;
}

interface ProposalData {
  client: string;
  project: string;
  tagline: string;
  metrics: { label: string; value: string }[];
  pitch: string;
  results: { emoji: string; text: string }[];
  services: ServiceLine[];
  servicesTotal: string;
  notIncluded: string[];
  payment: { step: string; amount: string; detail: string }[];
  paymentNote: string;
  process: { step: string; title: string; desc: string }[];
  whyUs: { title: string; desc: string }[];
  investment: { regular: string; regularUsd: string };
  urgency: {
    price: string;
    priceUsd: string;
    saving: string;
    deadline: string;
  };
  cta: { whatsapp: string; acceptMsg: string; questionMsg: string };
  validity: string;
}

// --- Proposals ---
const proposals: Record<string, ProposalData> = {
  "ingleslegal": {
    client: "Dr. Marcus Ambrose",
    project: "InglesLegal.com",
    tagline: "Un sistema digital que convierte visitas en alumnos",
    metrics: [
      { label: "Inversión", value: "$400 USD" },
      { label: "Equivalente", value: "$7,200 MXN" },
      { label: "Entrega", value: "14 días" },
      { label: "Incluye", value: "8 módulos" },
    ],
    pitch: "Su sitio existe pero no vende. Lo que proponemos es convertirlo en un sistema que trabaja para usted: encuentra abogados que necesitan inglés jurídico y los lleva directo a agendar por WhatsApp. Sin complicaciones.",
    results: [
      { emoji: "🌐", text: "Sitio web que transmite autoridad y profesionalismo al instante" },
      { emoji: "🔍", text: "Visible en Google cuando buscan \"inglés jurídico México\"" },
      { emoji: "📱", text: "Funciona perfecto en celular — donde llega el 72% de su tráfico" },
      { emoji: "📣", text: "Campañas de Facebook e Instagram listas para activar" },
      { emoji: "🎯", text: "Configuración de Google Ads para captura de intención alta" },
      { emoji: "💼", text: "Perfil de LinkedIn optimizado para contactar bufetes directamente" },
      { emoji: "💬", text: "Cada botón lleva directo a WhatsApp — su canal de cierre" },
      { emoji: "📊", text: "Todo medible desde el día 1 con Analytics y Pixel" },
    ],
    services: [
      { name: "Rediseño y desarrollo de landing page", detail: "Reconstrucción completa: hero + contenido + precios + contacto · Responsivo", price: "$5,500 MXN", priceUsd: "~$305 USD" },
      { name: "SEO on-page + Google Analytics + Search Console", detail: "Optimización completa + datos estructurados", price: "$1,000 MXN", priceUsd: "~$56 USD" },
      { name: "vCard profesional + Código QR personalizado", detail: "Descargable desde la página · Imprimible para tarjetas", price: "$500 MXN", priceUsd: "~$28 USD" },
      { name: "Hosting 12 meses incluido", detail: "Servidor veloz con SSL · Sin costo adicional el primer año", price: "$500 MXN", priceUsd: "~$28 USD" },
      { name: "Estrategia Meta Ads completa", detail: "Audiencias + copys + estructura de campaña + Pixel instalado", price: "$1,500 MXN", priceUsd: "~$83 USD" },
      { name: "Configuración Google Ads (Search)", detail: "Keywords + anuncios responsivos + extensiones de llamada", price: "$800 MXN", priceUsd: "~$44 USD" },
      { name: "Optimización perfil LinkedIn", detail: "Perfil profesional + guión de mensajes para bufetes", price: "$700 MXN", priceUsd: "~$39 USD" },
      { name: "Llamada de entrega y capacitación (30 min)", detail: "Explicación completa + resolución de dudas + guía de uso", price: "Incluida", priceUsd: "" },
    ],
    servicesTotal: "$10,500 MXN (~$585 USD)",
    notIncluded: [
      "Presupuesto de pauta en Meta/Google Ads (se invierte directo a las plataformas)",
      "Sesión fotográfica profesional del Dr. Ambrose",
      "Migración de contenidos del sitio actual (si lo requiere, se cotiza aparte)",
      "Cancelación de su hosting actual (lo decide usted cuando quiera)",
    ],
    payment: [
      { step: "1", amount: "$3,600 MXN (~$200 USD)", detail: "Al arrancar. Transferencia o depósito. Empezamos el mismo día." },
      { step: "2", amount: "$3,600 MXN (~$200 USD)", detail: "Al entregar. Se paga cuando usted aprueba y publicamos en vivo." },
    ],
    paymentNote: "Total con descuento: $7,200 MXN ≈ $400 USD al tipo de cambio actual. Una inversión que se recupera con 1 alumno de paquete completo ($450 USD).",
    process: [
      { step: "01", title: "Arranque", desc: "Anticipo + brief de 5 minutos. Empezamos el mismo día." },
      { step: "02", title: "Diseño", desc: "Creamos todo el diseño visual para su aprobación." },
      { step: "03", title: "Desarrollo", desc: "Programamos con código limpio y responsivo." },
      { step: "04", title: "Revisión", desc: "Usted revisa y ajustamos. 2 rondas incluidas." },
      { step: "05", title: "Técnico", desc: "SEO, Analytics, QR, Pixel, Google Ads — todo configurado." },
      { step: "06", title: "Entrega", desc: "Publicamos + videollamada de 30 min para explicar todo." },
    ],
    whyUs: [
      { title: "Un sistema, no solo una página", desc: "No hacemos sitios bonitos que nadie visita. Construimos infraestructura digital que genera clientes de forma predecible." },
      { title: "Deadline real: 14 días", desc: "Si nos pasamos del plazo acordado, devolvemos el 20% del pago final. Así de simple." },
      { title: "Código escrito a mano", desc: "Cero plantillas, cero WordPress. Su sitio carga en menos de 2 segundos y rankea mejor que el 90% de su competencia." },
      { title: "Cada centavo se mide", desc: "Analytics, Pixel y tracking desde el día 1. Usted siempre sabe cuántos leads llegan y de dónde vienen." },
      { title: "2 rondas de ajustes incluidas", desc: "Nada se publica sin su aprobación. Si algo no le convence, lo cambiamos sin costo adicional." },
      { title: "Soporte técnico 30 días", desc: "Después de entregar, seguimos resolviendo cualquier detalle técnico que surja. Sin tickets, sin esperas." },
    ],
    investment: {
      regular: "$10,500 MXN (~$585 USD)",
      regularUsd: "$585 USD",
    },
    urgency: {
      price: "$7,200 MXN",
      priceUsd: "$400 USD",
      saving: "$3,300 MXN (~$183 USD)",
      deadline: "lunes 21 de abril de 2026",
    },
    cta: {
      whatsapp: "525564131634",
      acceptMsg: "Hola, acepto la propuesta para InglesLegal.com y quiero arrancar.",
      questionMsg: "Hola, tengo preguntas sobre la propuesta de InglesLegal.com",
    },
    validity: "2 de mayo de 2026",
  },
};

// --- Component ---
const ProposalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const proposal = slug ? proposals[slug] : null;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!proposal) {
    return (
      <div className="bg-bg text-fg min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-[48px] font-black mb-4">404</h1>
        <p className="text-muted text-[16px] mb-8">Esta propuesta no existe o ha expirado.</p>
        <Link to="/" className="bg-accent text-white px-8 py-4 rounded-[12px] font-bold text-[14px]">
          Ir a Chamba.Digital →
        </Link>
      </div>
    );
  }

  const p = proposal;

  return (
    <div
      className="text-fg selection:bg-accent selection:text-white"
      style={{
        '--color-bg': '#f7f3eb',
        '--color-fg': '#1c1917',
        '--color-muted': '#78716c',
        '--color-accent': '#1e40af',
        '--color-glass': 'rgba(255, 255, 255, 0.6)',
        '--color-glass-border': 'rgba(0, 0, 0, 0.08)',
        backgroundColor: '#f7f3eb',
        color: '#1c1917',
      } as React.CSSProperties}
    >
      {/* Sticky Nav — stays dark for brand consistency */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[56px] bg-[#1c1917]/95 backdrop-blur-xl border-b border-black/10 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#1e40af] rounded-[6px] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-[13px] font-bold text-[#a8a29e] hidden sm:inline">Propuesta · <span className="text-white">{p.project}</span></span>
        </Link>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(p.cta.acceptMsg)}`}
          target="_blank"
          className="bg-[#1e40af] text-white px-5 py-2 rounded-[8px] font-bold text-[12px] shadow-[0_5px_15px_rgba(30,64,175,0.3)]"
        >
          Acepto →
        </motion.a>
      </nav>

      <main className="pt-[56px]">
        {/* ====== HERO ====== */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(30,64,175,0.08) 0%, transparent 70%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[700px] relative z-10"
          >
            <span className="label-editorial mx-auto">{p.client}</span>
            <h1 className="text-[36px] md:text-[56px] font-black tracking-tight leading-[1.1] mb-4 mt-4" style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: '#1c1917' }}>
              {p.project}
            </h1>
            <p className="text-[17px] md:text-[20px] text-muted font-medium mb-12 max-w-[520px] mx-auto leading-relaxed">
              {p.tagline}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {p.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass rounded-[12px] p-4 border-white/5"
                >
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{m.label}</p>
                  <p className="text-[18px] font-black text-accent">{m.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              href="#detalle"
              className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-accent transition-colors"
            >
              Ver detalle <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.a>
          </motion.div>
        </section>

        {/* ====== PITCH ====== */}
        <section id="detalle" className="py-16 px-6 max-w-[700px] mx-auto border-t border-white/5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[16px] md:text-[18px] text-muted leading-[1.9]"
          >
            {p.pitch}
          </motion.p>
        </section>

        {/* ====== RESULTS (What You Get) ====== */}
        <section className="py-16 px-6 max-w-[800px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-black text-center mb-12">
            Lo que va a obtener
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4 p-5 glass rounded-[14px] border-white/5"
              >
                <span className="text-[22px] shrink-0">{r.emoji}</span>
                <p className="text-[14px] text-fg leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====== SERVICE BREAKDOWN ====== */}
        <section className="py-16 px-6 bg-[#efe9dd] border-y border-black/5">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[24px] md:text-[32px] font-black text-center mb-4">
              Desglose de servicios
            </h2>
            <p className="text-[13px] text-muted text-center mb-10">Propuesta {p.project} · {p.client}</p>

            <div className="space-y-3">
              {p.services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start justify-between gap-4 p-4 glass rounded-[12px] border-white/5"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-fg">{s.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">{s.detail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[14px] font-black block ${s.price === 'Incluida' ? 'text-green-400' : 'text-accent'}`}>
                      {s.price}
                    </span>
                    {s.priceUsd && <span className="text-[11px] text-muted/60 block">{s.priceUsd}</span>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 p-5 glass rounded-[16px] border-accent/20 flex items-center justify-between">
              <span className="text-[15px] font-bold">Total del proyecto</span>
              <span className="text-[20px] font-black text-accent">{p.servicesTotal}</span>
            </div>
          </div>
        </section>

        {/* ====== NOT INCLUDED ====== */}
        <section className="py-12 px-6 max-w-[700px] mx-auto">
          <h3 className="text-[16px] font-bold mb-5 flex items-center gap-2 text-muted">
            <Shield className="w-4 h-4 text-muted/50" /> ¿Qué NO incluye?
          </h3>
          <p className="text-[12px] text-muted/60 mb-4">Para que no haya confusiones:</p>
          <ul className="space-y-2">
            {p.notIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] text-muted/70 leading-relaxed">
                <span className="text-red-400/60 shrink-0 mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ====== PAYMENT ====== */}
        <section className="py-12 px-6 max-w-[700px] mx-auto border-t border-white/5">
          <h3 className="text-[18px] font-bold mb-8 text-center">Forma de pago</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {p.payment.map((pay, i) => (
              <div key={i} className="glass rounded-[16px] p-6 border-white/5 text-center">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-[13px] font-black text-accent">{pay.step}</span>
                </div>
                <p className="text-[20px] font-black text-accent mb-2">{pay.amount}</p>
                <p className="text-[12px] text-muted leading-relaxed">{pay.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-muted text-center italic">{p.paymentNote}</p>
        </section>

        {/* ====== PROCESS (Compact) ====== */}
        <section className="py-16 px-6 bg-[#efe9dd] border-y border-black/5">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[24px] md:text-[32px] font-black text-center mb-4">
              Proceso claro. Sin sorpresas.
            </h2>
            <p className="text-[14px] text-muted text-center mb-12">Entrega en 14 días hábiles.</p>
            <div className="space-y-4">
              {p.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="text-[11px] font-black text-accent">{step.step}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-[14px] font-bold">{step.title}</span>
                    <span className="text-[13px] text-muted ml-2">— {step.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== COMPROMISOS REALES ====== */}
        <section className="py-20 px-6 max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="label-editorial mx-auto">Compromisos Reales</span>
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-tight mt-4">
              No prometemos. <span className="text-accent">Entregamos.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-5 glass rounded-[16px] border-white/5 hover:border-accent/20 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-[11px] font-black text-accent">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold mb-1">{item.title}</h4>
                    <p className="text-[12px] text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====== ARRANQUE INMEDIATO ====== */}
        <section className="py-20 px-6 bg-[#e8e0d0] border-y border-[#1e40af]/15">
          <div className="max-w-[600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="label-editorial mx-auto">Arranque Inmediato</span>
              <h2 className="text-[24px] md:text-[36px] font-bold tracking-tight mt-4 mb-8">
                Confirme esta semana y <span className="text-accent">ahorre {p.urgency.saving}</span>
              </h2>

              <div className="glass rounded-[24px] p-8 md:p-10 border-accent/20 mb-8">
                <p className="text-[14px] text-muted line-through mb-1">{p.investment.regular}</p>
                <p className="text-[42px] font-black text-accent leading-none">{p.urgency.price}</p>
                <p className="text-[20px] font-bold text-accent/60 mt-2">{p.urgency.priceUsd}</p>
                <div className="w-16 h-[1px] bg-white/10 mx-auto my-5" />
                <p className="text-[13px] text-muted">Mismo alcance completo · 8 módulos · Todo incluido</p>
                <div className="mt-5 bg-accent/10 rounded-[8px] px-5 py-2.5 inline-block">
                  <p className="text-[12px] font-bold text-accent">{Math.round((1 - 7200/10500) * 100)}% menos porque cerramos agenda anticipada</p>
                </div>
              </div>

              <p className="text-[12px] text-muted/50 mb-8">
                Disponible hasta el {p.urgency.deadline}. Después regresa a {p.investment.regular}.
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(`Hola, quiero arrancar con la oferta de ${p.urgency.priceUsd} para ${p.project}.`)}`}
                target="_blank"
                className="inline-block bg-[#1e40af] text-white px-10 py-4 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(30,64,175,0.25)]"
              >
                Arrancar ahora →
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ====== CIERRE ====== */}
        <section className="py-24 px-6 text-center max-w-[600px] mx-auto">
          <span className="label-editorial mx-auto">Siguiente Paso</span>
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight mt-4 mb-4">
            Su sistema digital, <span className="text-accent">listo en 14 días</span>.
          </h2>
          <p className="text-muted text-[14px] mb-10 leading-relaxed max-w-[420px] mx-auto">
            Confirme antes del {p.validity} y arrancamos de inmediato.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(p.cta.acceptMsg)}`}
              target="_blank"
              className="w-full sm:w-auto bg-[#1e40af] text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(30,64,175,0.25)]"
            >
              Acepto la propuesta →
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(p.cta.questionMsg)}`}
              target="_blank"
              className="w-full sm:w-auto bg-black/5 border border-black/10 hover:border-[#1e40af]/30 text-fg px-10 py-5 rounded-[12px] font-bold text-[15px] transition-colors"
            >
              Tengo preguntas
            </motion.a>
          </div>
          <p className="text-[11px] text-muted/40 mt-8">
            Propuesta válida hasta el {p.validity} · Precios en USD al tipo de cambio del día
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/10 bg-[#efe9dd]">
        <div className="max-w-[600px] mx-auto text-center">
          <Logo />
          <p className="text-[12px] text-muted mt-4 mb-2">
            Propuesta preparada especialmente para {p.client} · {p.project}
          </p>
          <p className="text-[11px] text-muted/40">
            © {new Date().getFullYear()} Chamba Digital · Ingeniería de Performance · Abril 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProposalPage;
