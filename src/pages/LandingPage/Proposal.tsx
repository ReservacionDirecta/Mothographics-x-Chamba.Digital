import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../../App';
import { Zap, ChevronDown, Check, Globe } from 'lucide-react';

// ─── BILINGUAL HELPER ────────────────────────────────────────
type Lang = 'es' | 'en';
const t = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en;

// ─── TYPES ───────────────────────────────────────────────────
interface StackItem { name: [string, string]; detail: [string, string]; value: string; }
// [es, en] tuples for bilingual content

interface ProposalConfig {
  client: string;
  project: string;
  hook: [string, string];
  hookSub: [string, string];
  gap: {
    before: { label: [string, string]; items: [string, string][] };
    after: { label: [string, string]; items: [string, string][] };
  };
  stack: StackItem[];
  stackTotal: string;
  offer: { priceUsd: string; priceMxn: string; anchor: [string, string] };
  roi: { unit: [string, string]; unitValue: string; breakEven: [string, string]; multiply: [string, string] };
  guarantee: [string, string];
  guaranteeSub: [string, string];
  urgency: { deadline: string; reason: [string, string] };
  cta: { whatsapp: string; acceptMsg: [string, string]; questionMsg: [string, string] };
  validity: string;
}

// ─── PROPOSALS ───────────────────────────────────────────────
const proposals: Record<string, ProposalConfig> = {
  "ingleslegal": {
    client: "Dr. Marcus Ambrose",
    project: "InglesLegal.com",

    hook: [
      "En 14 días, los abogados van a encontrarlo a usted.",
      "In 14 days, lawyers will find you.",
    ],
    hookSub: [
      "No al revés.",
      "Not the other way around.",
    ],

    gap: {
      before: {
        label: ["Hoy", "Today"],
        items: [
          ["Su sitio existe pero nadie lo encuentra", "Your site exists but nobody finds it"],
          ["Depende de referidos y boca a boca", "You depend on referrals and word of mouth"],
          ["No hay forma de medir cuántos lo buscan", "No way to measure how many people look for you"],
          ["Cada mes que pasa, pierde alumnos potenciales", "Every month that passes, you lose potential students"],
        ],
      },
      after: {
        label: ["En 14 días", "In 14 days"],
        items: [
          ["Google lo muestra cuando buscan \"inglés jurídico\"", "Google shows you when they search \"legal English\""],
          ["Cada botón lleva directo a WhatsApp", "Every button leads straight to WhatsApp"],
          ["Sabe exactamente cuántos abogados lo visitan", "You know exactly how many lawyers visit your site"],
          ["Su sistema trabaja para usted mientras duerme", "Your system works for you while you sleep"],
        ],
      },
    },

    stack: [
      { name: ["Sitio web profesional programado a mano", "Custom-coded professional website"], detail: ["Código limpio que carga en <2 seg. Sin WordPress.", "Clean code that loads in <2 sec. No WordPress."], value: "$8,000 MXN" },
      { name: ["SEO + Google Analytics + Search Console", "SEO + Google Analytics + Search Console"], detail: ["Visible en Google. Todo medible desde el día 1.", "Visible on Google. Fully measurable from day 1."], value: "$3,000 MXN" },
      { name: ["Tarjeta digital + QR profesional", "Digital business card + professional QR"], detail: ["Descargable desde su web. Lista para congresos.", "Downloadable from your site. Ready for conferences."], value: "$1,500 MXN" },
      { name: ["Hosting premium 12 meses con SSL", "Premium hosting 12 months with SSL"], detail: ["Servidor rápido con certificado de seguridad.", "Fast server with security certificate included."], value: "$2,000 MXN" },
      { name: ["Estrategia Meta Ads lista para activar", "Meta Ads strategy ready to launch"], detail: ["Audiencias + copys + Pixel. Solo enciende y corre.", "Audiences + copy + Pixel. Just turn on and go."], value: "$4,000 MXN" },
      { name: ["Configuración Google Ads (Search)", "Google Ads setup (Search)"], detail: ["Keywords + anuncios + extensiones a WhatsApp.", "Keywords + ads + WhatsApp call extensions."], value: "$3,500 MXN" },
      { name: ["Perfil LinkedIn optimizado", "Optimized LinkedIn profile"], detail: ["Para contactar bufetes con guión de mensajes.", "To contact law firms with a messaging script."], value: "$2,000 MXN" },
      { name: ["Videollamada de entrega + capacitación", "Delivery video call + training"], detail: ["30 min en vivo. Le explico todo.", "30 min live. I walk you through everything."], value: "$1,500 MXN" },
    ],
    stackTotal: "$25,500 MXN",

    offer: {
      priceUsd: "$400 USD",
      priceMxn: "$7,200 MXN",
      anchor: [
        "Menos que un alumno de paquete completo.",
        "Less than one full-package student.",
      ],
    },

    roi: {
      unit: ["1 alumno de paquete 10 horas", "1 student (10-hour package)"],
      unitValue: "$450 USD",
      breakEven: [
        "Con 1 alumno nuevo, ya recuperó todo.",
        "With 1 new student, you've already made it back.",
      ],
      multiply: [
        "Con 5 alumnos, multiplicó su inversión x5.",
        "With 5 students, you've multiplied your investment 5x.",
      ],
    },

    guarantee: [
      "Si no le gusta el resultado, no paga el segundo 50%.",
      "If you don't like the result, you don't pay the second 50%.",
    ],
    guaranteeSub: [
      "Revisa el diseño completo antes de que programemos. Si no le convence, devolvemos su anticipo. Sin preguntas, sin letras chicas.",
      "You review the full design before we write a single line of code. If you're not convinced, we refund your deposit. No questions, no fine print.",
    ],

    urgency: {
      deadline: "April 21",
      reason: [
        "Solo tomo 2 proyectos por quincena para darle atención completa.",
        "I only take 2 projects per cycle to give each one my full attention.",
      ],
    },

    cta: {
      whatsapp: "525564131634",
      acceptMsg: [
        "Hola, acepto la propuesta para InglesLegal.com y quiero arrancar.",
        "Hi, I accept the proposal for InglesLegal.com and I want to get started.",
      ],
      questionMsg: [
        "Hola, tengo preguntas sobre la propuesta de InglesLegal.com",
        "Hi, I have questions about the InglesLegal.com proposal",
      ],
    },
    validity: "May 2, 2026",
  },
};

// ─── PALETTE ─────────────────────────────────────────────────
const C = {
  bg: '#f7f3eb',
  fg: '#1c1917',
  mt: '#78716c',
  ac: '#1e40af',
  bgAlt: '#efe9dd',
  bgWarm: '#e8e0d0',
  border: 'rgba(0,0,0,0.08)',
  faded: '#a8a29e',
  red: '#dc2626',
};

// ─── COMPONENT ───────────────────────────────────────────────
const ProposalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const cfg = slug ? proposals[slug] : null;
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!cfg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: C.bg, color: C.fg }}>
        <h1 className="text-[48px] font-black mb-4" style={{ background: 'none', WebkitTextFillColor: C.fg }}>404</h1>
        <p className="text-[16px] mb-8" style={{ color: C.mt }}>
          {t(lang, 'Esta propuesta no existe o ha expirado.', 'This proposal does not exist or has expired.')}
        </p>
        <Link to="/" className="text-white px-8 py-4 rounded-[12px] font-bold text-[14px]" style={{ backgroundColor: C.ac }}>
          {t(lang, 'Ir a Chamba.Digital →', 'Go to Chamba.Digital →')}
        </Link>
      </div>
    );
  }

  const p = cfg;
  const T = (es: string, en: string) => t(lang, es, en);
  const Tb = (tuple: [string, string]) => tuple[lang === 'es' ? 0 : 1];

  return (
    <div style={{ backgroundColor: C.bg, color: C.fg, fontFamily: "'Inter', sans-serif" }} className="selection:bg-[#1e40af] selection:text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[56px] backdrop-blur-xl flex items-center justify-between px-5" style={{ backgroundColor: 'rgba(28,25,23,0.95)', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: C.ac }}>
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-[13px] font-bold hidden sm:inline" style={{ color: C.faded }}>
            {T('Propuesta', 'Proposal')} · <span className="text-white">{p.project}</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[11px] font-bold uppercase tracking-wider transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#e7e5e4', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(p.cta.acceptMsg))}`}
            target="_blank"
            className="text-white px-4 py-2 rounded-[8px] font-bold text-[12px]"
            style={{ backgroundColor: C.ac, boxShadow: '0 5px 15px rgba(30,64,175,0.3)' }}
          >
            {T('Acepto', 'I accept')} →
          </motion.a>
        </div>
      </nav>

      <main className="pt-[56px]">

        {/* ════════════════════════════════════════
            1. HOOK
        ════════════════════════════════════════ */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[700px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: C.ac }}>
              {T('Propuesta para', 'Proposal for')} {p.client}
            </p>
            <h1
              className="text-[34px] md:text-[56px] font-black tracking-tight leading-[1.08] mb-4"
              style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: C.fg }}
            >
              {Tb(p.hook)}
            </h1>
            <p className="text-[20px] md:text-[28px] font-medium mb-16" style={{ color: C.mt }}>
              {Tb(p.hookSub)}
            </p>
            <motion.a
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              href="#gap" className="inline-flex items-center gap-2 text-[13px]" style={{ color: C.mt }}
            >
              {T('Ver cómo', 'See how')} <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.a>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════
            2. THE GAP — Before / After
        ════════════════════════════════════════ */}
        <section id="gap" className="py-20 px-6" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BEFORE */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="rounded-[20px] p-8" style={{ backgroundColor: 'rgba(0,0,0,0.03)', border: `1px solid ${C.border}` }}
              >
                <span className="text-[11px] font-black uppercase tracking-[0.25em] block mb-6" style={{ color: C.red }}>
                  {Tb(p.gap.before.label)}
                </span>
                <ul className="space-y-4">
                  {p.gap.before.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: C.mt }}>
                      <span className="shrink-0 mt-0.5" style={{ color: C.red }}>✕</span>
                      {Tb(item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* AFTER */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="rounded-[20px] p-8" style={{ backgroundColor: 'rgba(30,64,175,0.04)', border: '1px solid rgba(30,64,175,0.15)' }}
              >
                <span className="text-[11px] font-black uppercase tracking-[0.25em] block mb-6" style={{ color: C.ac }}>
                  {Tb(p.gap.after.label)}
                </span>
                <ul className="space-y-4">
                  {p.gap.after.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: C.fg }}>
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.ac }} />
                      {Tb(item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            3. VALUE STACK
        ════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-[650px] mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-center mb-4" style={{ color: C.ac }}>
              {T('Lo que incluye su sistema', 'What your system includes')}
            </p>
            <h2 className="text-[28px] md:text-[40px] font-black text-center tracking-tight leading-tight mb-4">
              {T('Todo esto está incluido.', 'All of this is included.')}
            </h2>
            <p className="text-[14px] text-center mb-14" style={{ color: C.mt }}>
              {T('Valores de mercado si contratara cada servicio por separado.', 'Market rates if you hired each service separately.')}
            </p>
            <div className="space-y-3">
              {p.stack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start justify-between gap-4 p-5 rounded-[14px]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: `1px solid ${C.border}` }}
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold">{Tb(item.name)}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: C.mt }}>{Tb(item.detail)}</p>
                  </div>
                  <span className="text-[14px] font-black shrink-0 line-through" style={{ color: C.faded }}>{item.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-6 rounded-[16px] text-center" style={{ backgroundColor: C.bgAlt, border: `1px solid ${C.border}` }}>
              <p className="text-[13px] font-bold mb-1" style={{ color: C.mt }}>
                {T('Valor total de mercado', 'Total market value')}
              </p>
              <p className="text-[32px] font-black line-through" style={{ color: C.faded }}>{p.stackTotal}</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            4. THE OFFER + ROI
        ════════════════════════════════════════ */}
        <section className="py-20 px-6" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="max-w-[550px] mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: C.ac }}>
              {T('Su inversión', 'Your investment')}
            </p>
            <p className="text-[14px] line-through mb-2" style={{ color: C.faded }}>{p.stackTotal}</p>
            <h2 className="text-[52px] md:text-[72px] font-black tracking-tight leading-none mb-2" style={{ color: C.ac }}>
              {p.offer.priceUsd}
            </h2>
            <p className="text-[18px] font-medium mb-2" style={{ color: C.mt }}>{p.offer.priceMxn}</p>
            <p className="text-[15px] font-bold mb-14" style={{ color: C.fg }}>{Tb(p.offer.anchor)}</p>

            {/* ROI */}
            <div className="rounded-[20px] p-8 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: `1px solid ${C.border}` }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-6" style={{ color: C.ac }}>
                {T('La matemática', 'The math')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: C.mt }}>{Tb(p.roi.unit)}</span>
                  <span className="text-[16px] font-black">{p.roi.unitValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: C.mt }}>{T('Su inversión total', 'Your total investment')}</span>
                  <span className="text-[16px] font-black" style={{ color: C.ac }}>{p.offer.priceUsd}</span>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '16px' }}>
                  <p className="text-[14px] font-bold">{Tb(p.roi.breakEven)}</p>
                  <p className="text-[14px]" style={{ color: C.mt }}>{Tb(p.roi.multiply)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            5. RISK REVERSAL
        ════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: C.ac }}>
              {T('Garantía', 'Guarantee')}
            </p>
            <h2 className="text-[24px] md:text-[36px] font-black tracking-tight leading-tight mb-6">
              {Tb(p.guarantee)}
            </h2>
            <p className="text-[15px] leading-relaxed max-w-[480px] mx-auto" style={{ color: C.mt }}>
              {Tb(p.guaranteeSub)}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            6. DECISION — Binary close
        ════════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ backgroundColor: C.bgWarm, borderTop: `1px solid ${C.border}` }}>
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: C.ac }}>
              {T('Decisión', 'Decision')}
            </p>
            <h2 className="text-[24px] md:text-[36px] font-black tracking-tight leading-tight mb-6">
              {T('Dos opciones.', 'Two options.')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
              <div className="rounded-[16px] p-6" style={{ backgroundColor: 'rgba(0,0,0,0.03)', border: `1px solid ${C.border}` }}>
                <p className="text-[13px] font-black uppercase tracking-wider mb-3" style={{ color: C.red }}>
                  {T('Opción A', 'Option A')}
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: C.mt }}>
                  {T(
                    'Seguir como está. Esperar que los alumnos lo encuentren. Depender de referidos. Cada mes cuesta oportunidades.',
                    'Stay as you are. Wait for students to find you. Depend on referrals. Every month costs you opportunities.'
                  )}
                </p>
              </div>
              <div className="rounded-[16px] p-6" style={{ backgroundColor: 'rgba(30,64,175,0.04)', border: '1px solid rgba(30,64,175,0.2)' }}>
                <p className="text-[13px] font-black uppercase tracking-wider mb-3" style={{ color: C.ac }}>
                  {T('Opción B', 'Option B')}
                </p>
                <p className="text-[14px] leading-relaxed">
                  {T(
                    `Invertir ${p.offer.priceUsd} y tener en 14 días un sistema digital que trabaja para usted 24/7, atrayendo abogados que ya buscan lo que usted ofrece.`,
                    `Invest ${p.offer.priceUsd} and in 14 days have a digital system that works for you 24/7, attracting lawyers who are already looking for what you offer.`
                  )}
                </p>
              </div>
            </div>

            <p className="text-[13px] mb-8" style={{ color: C.mt }}>
              {Tb(p.urgency.reason)} {T('Disponible hasta el', 'Available until')} <strong style={{ color: C.fg }}>{p.urgency.deadline}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(p.cta.acceptMsg))}`}
                target="_blank"
                className="w-full sm:w-auto text-white px-10 py-5 rounded-[12px] font-bold text-[15px]"
                style={{ backgroundColor: C.ac, boxShadow: '0 10px 30px rgba(30,64,175,0.25)' }}
              >
                {T('Elijo la Opción B →', 'I choose Option B →')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(p.cta.questionMsg))}`}
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 rounded-[12px] font-bold text-[15px] transition-colors"
                style={{ backgroundColor: 'rgba(0,0,0,0.05)', border: `1px solid rgba(0,0,0,0.1)`, color: C.fg }}
              >
                {T('Tengo preguntas', 'I have questions')}
              </motion.a>
            </div>

            <p className="text-[11px] mt-8" style={{ color: C.faded }}>
              {T(
                `Propuesta válida hasta el ${p.validity} · ${p.offer.priceMxn} al tipo de cambio del día`,
                `Proposal valid until ${p.validity} · ${p.offer.priceMxn} at current exchange rate`
              )}
            </p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
        <Logo />
        <p className="text-[12px] mt-4" style={{ color: C.mt }}>
          {T('Propuesta preparada para', 'Proposal prepared for')} {p.client} · {p.project}
        </p>
        <p className="text-[11px] mt-1" style={{ color: C.faded }}>
          © {new Date().getFullYear()} Chamba Digital · {T('Ingeniería de Performance', 'Performance Engineering')}
        </p>
      </footer>
    </div>
  );
};

export default ProposalPage;
