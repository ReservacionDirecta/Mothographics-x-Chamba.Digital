import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../../App';
import { Zap, ChevronDown, Check, Globe, LayoutTemplate, MessageCircle, UserCheck, ShieldCheck } from 'lucide-react';

// ─── BILINGUAL ───────────────────────────────────────────────
type Lang = 'es' | 'en';
const Tb = (lang: Lang, t: [string, string]) => t[lang === 'es' ? 0 : 1];
const T = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en;

// ─── TYPES ───────────────────────────────────────────────────
interface StackItem { name: [string, string]; detail: [string, string]; value: string; }

interface ProposalConfig {
  client: string;
  project: string;
  hook: [string, string];
  hookSub: [string, string];
  // THE PROBLEM — before / after
  gap: {
    before: { label: [string, string]; items: [string, string][] };
    after: { label: [string, string]; items: [string, string][] };
  };
  // THE SYSTEM — what we're building
  system: {
    title: [string, string];
    desc: [string, string];
    layers: { name: [string, string]; parts: [string, string][] }[];
  };
  // VALUE STACK
  stack: StackItem[];
  stackTotal: string;
  // OFFER
  offer: { priceUsd: string; priceMxn: string; anchor: [string, string] };
  // ROI
  roi: { 
    unit: [string, string]; 
    unitValue: string; 
    breakEven: [string, string]; 
    multiply: [string, string];
    projection: { 
      title: [string, string];
      headers: [ [string, string], [string, string], [string, string] ];
      rows: { label: [string, string]; m1: string; m2: string; m3: string }[];
    };
  };
  // AFTER THE ENGINE — what comes next
  nextPhase: {
    title: [string, string];
    desc: [string, string];
    items: [string, string][];
  };
  // RISK REVERSAL
  guarantee: [string, string];
  guaranteeSub: [string, string];
  // URGENCY
  urgency: { deadline: string; reason: [string, string] };
  // CTA
  cta: { whatsapp: string; acceptMsg: [string, string]; questionMsg: [string, string] };
  validity: string;
}

// ─── PROPOSALS ───────────────────────────────────────────────
const proposals: Record<string, ProposalConfig> = {
  "ingleslegal": {
    client: "Dr. Marcus Ambrose",
    project: "InglesLegal.com",

    hook: [
      "Un motor de ventas que trabaja las 24 horas.",
      "A sales engine that works around the clock.",
    ],
    hookSub: [
      "Primero construimos la máquina. Después la escalamos.",
      "First we build the machine. Then we scale it.",
    ],

    gap: {
      before: {
        label: ["Hoy", "Today"],
        items: [
          ["Su sitio existe pero no genera contactos", "Your site exists but doesn't generate contacts"],
          ["Depende de referidos y boca a boca", "You depend on referrals and word of mouth"],
          ["No sabe cuánta gente lo busca ni de dónde viene", "You don't know how many people find you or where they come from"],
          ["No tiene un embudo: visitante → interesado → alumno", "You don't have a funnel: visitor → lead → student"],
        ],
      },
      after: {
        label: ["En 14 días", "In 14 days"],
        items: [
          ["Meta Ads envía tráfico cualificado a su landing page", "Meta Ads sends qualified traffic to your landing page"],
          ["Su landing page convierte visitantes en mensajes de WhatsApp", "Your landing page converts visitors into WhatsApp messages"],
          ["WhatsApp Business responde automáticamente y muestra su catálogo", "WhatsApp Business auto-responds and shows your catalog"],
          ["Usted solo cierra. El sistema se encarga de captar y filtrar.", "You just close. The system captures and filters for you."],
        ],
      },
    },

    system: {
      title: [
        "El embudo que vamos a construir",
        "The funnel we're going to build",
      ],
      desc: [
        "Un sistema de 3 capas que convierte extraños en alumnos con la menor fricción posible.",
        "A 3-layer system that converts strangers into students with minimal friction.",
      ],
      layers: [
        {
          name: ["Capa 1 · Captación", "Layer 1 · Capture"],
          parts: [
            ["Campaña Meta Ads (Facebook + Instagram)", "Meta Ads campaign (Facebook + Instagram)"],
            ["Audiencias de abogados, bufetes y profesionistas legales", "Audiences: lawyers, law firms & legal professionals"],
            ["Copys probados + creativos + Pixel de conversión", "Proven copy + creatives + conversion Pixel"],
          ],
        },
        {
          name: ["Capa 2 · Conversión", "Layer 2 · Conversion"],
          parts: [
            ["Landing page programada a mano (carga en <2 seg)", "Custom-coded landing page (loads in <2 sec)"],
            ["SEO local + Google My Business + datos estructurados", "Local SEO + Google My Business + structured data"],
            ["Google Analytics + Search Console + Pixel Meta", "Google Analytics + Search Console + Meta Pixel"],
            ["Google Ads listo para encender cuando quiera escalar", "Google Ads ready to turn on when you want to scale"],
          ],
        },
        {
          name: ["Capa 3 · Cierre", "Layer 3 · Close"],
          parts: [
            ["WhatsApp Business con catálogo de servicios", "WhatsApp Business with service catalog"],
            ["Mensajes automáticos de bienvenida y respuesta rápida", "Auto-welcome messages and quick replies"],
            ["Flujo de prospección: pregunta → propuesta → cierre", "Prospecting flow: inquiry → proposal → close"],
          ],
        },
      ],
    },

    stack: [
      { name: ["Landing page de conversión, código propio", "Custom-coded conversion landing page"], detail: ["Hero + servicios + precios + CTA. Sin WordPress. Responsivo.", "Hero + services + pricing + CTA. No WordPress. Responsive."], value: "$6,000 MXN" },
      { name: ["SEO + Geo + Google Analytics + Search Console", "SEO + Geo + Google Analytics + Search Console"], detail: ["Visible en búsquedas locales. Todo medible desde el día 1.", "Visible in local search. Fully measurable from day 1."], value: "$2,000 MXN" },
      { name: ["Meta Pixel + Google Ads ready", "Meta Pixel + Google Ads ready"], detail: ["Tracking completo. Google Ads configurado y listo para escalar.", "Full tracking. Google Ads configured and ready to scale."], value: "$1,500 MXN" },
      { name: ["Ecosistema Meta: Facebook + Instagram + WA Business", "Meta ecosystem: Facebook + Instagram + WA Business"], detail: ["Páginas conectadas. Perfil profesional unificado.", "Connected pages. Unified professional profile."], value: "$3,000 MXN" },
      { name: ["Campaña Meta Ads (primera campaña)", "Meta Ads campaign (first campaign)"], detail: ["Audiencias + copys + estructura + lanzamiento.", "Audiences + copy + structure + launch."], value: "$4,000 MXN" },
      { name: ["WhatsApp Business: catálogo + automatizaciones", "WhatsApp Business: catalog + automations"], detail: ["Catálogo de servicios + mensajes automáticos + respuestas rápidas.", "Service catalog + auto-messages + quick replies."], value: "$3,500 MXN" },
      { name: ["Tarjeta digital + código QR", "Digital business card + QR code"], detail: ["Descargable desde su web. Lista para congresos y networking.", "Downloadable from your site. Ready for events and networking."], value: "$1,000 MXN" },
      { name: ["Videollamada de entrega + capacitación", "Delivery video call + training"], detail: ["30 min en vivo. Le explico todo el sistema.", "30 min live. I walk you through the entire system."], value: "$1,500 MXN" },
    ],
    stackTotal: "$22,500 MXN",

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
        "Con 1 alumno nuevo, ya recuperó toda la inversión.",
        "With 1 new student, you've already recovered the investment.",
      ],
      multiply: [
        "Con 5 alumnos, multiplicó su inversión x5.",
        "With 5 students, you've multiplied your investment 5x.",
      ],
      projection: {
        title: ["Proyección a 3 Meses · Efecto Bola de Nieve", "3-Month Projection · Snowball Effect"],
        headers: [
          ["Mes 1 (Arranque)", "Month 1 (Launch)"],
          ["Mes 2 (Optimizado)", "Month 2 (Tune-up)"],
          ["Mes 3 (Escala)", "Month 3 (Scale)"]
        ],
        rows: [
          { label: ["Inversión Meta Ads", "Meta Ads Budget"], m1: "$300 USD", m2: "$400 USD", m3: "$550 USD" },
          { label: ["Costo x Lead (CPL)", "Cost x Lead (CPL)"], m1: "$10.00", m2: "$8.00", m3: "$6.00" },
          { label: ["Contactos WhatsApp", "WhatsApp Leads"], m1: "30", m2: "50", m3: "91" },
          { label: ["Nuevos Alumnos (10%)", "New Students (10%)"], m1: "3", m2: "5", m3: "9" },
          { label: ["Retorno Estimado", "Estimated Return"], m1: "$1,350 USD", m2: "$2,250 USD", m3: "$4,050 USD" }
        ]
      }
    },

    nextPhase: {
      title: [
        "Después del motor: lo que viene.",
        "After the engine: what comes next.",
      ],
      desc: [
        "Una vez que el embudo esté generando leads, se implementan estrategias adicionales para escalar:",
        "Once the funnel is generating leads, we implement additional strategies to scale:",
      ],
      items: [
        ["Perfil LinkedIn optimizado para contactar bufetes", "Optimized LinkedIn profile to reach law firms"],
        ["Campañas Google Ads para captura de intención alta", "Google Ads campaigns for high-intent capture"],
        ["Ampliación de pauta Meta Ads según datos reales", "Scale Meta Ads budgets based on real data"],
        ["Email marketing y retargeting automatizado", "Email marketing and automated retargeting"],
        ["Optimización continua basada en métricas de conversión", "Continuous optimization based on conversion metrics"],
      ],
    },

    guarantee: [
      "Si no le gusta el resultado, no paga el segundo 50%.",
      "If you don't like the result, you don't pay the second 50%.",
    ],
    guaranteeSub: [
      "Revisa el diseño y la estrategia completa antes de que programemos. Si no le convence la dirección, devolvemos su anticipo. Sin preguntas.",
      "You review the full design and strategy before we code anything. If you're not convinced, we refund your deposit. No questions asked.",
    ],

    urgency: {
      deadline: "April 21",
      reason: [
        "Solo tomo 2 proyectos por quincena para darle atención completa.",
        "I only take 2 projects per cycle to give each one my full attention.",
      ],
    },

    cta: {
      whatsapp: "51904060670",
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
  bg: '#f7f3eb', fg: '#1c1917', mt: '#78716c', ac: '#1e40af',
  bgAlt: '#efe9dd', bgWarm: '#e8e0d0', border: 'rgba(0,0,0,0.08)',
  faded: '#a8a29e', red: '#dc2626',
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
          {T(lang, 'Esta propuesta no existe o ha expirado.', 'This proposal does not exist or has expired.')}
        </p>
        <Link to="/" className="text-white px-8 py-4 rounded-[12px] font-bold text-[14px]" style={{ backgroundColor: C.ac }}>
          {T(lang, 'Ir a Chamba.Digital →', 'Go to Chamba.Digital →')}
        </Link>
      </div>
    );
  }

  const p = cfg;

  return (
    <div style={{ backgroundColor: C.bg, color: C.fg, fontFamily: "'Inter', sans-serif" }} className="selection:bg-[#1e40af] selection:text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[56px] backdrop-blur-xl flex items-center justify-between px-5" style={{ backgroundColor: 'rgba(28,25,23,0.95)', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: C.ac }}>
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-[13px] font-bold hidden sm:inline" style={{ color: C.faded }}>
            {T(lang, 'Propuesta', 'Proposal')} · <span className="text-white">{p.project}</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-white/10"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#e7e5e4', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(lang, p.cta.acceptMsg))}`}
            target="_blank"
            className="text-white px-4 py-2 rounded-[8px] font-bold text-[12px]"
            style={{ backgroundColor: C.ac, boxShadow: '0 5px 15px rgba(30,64,175,0.3)' }}
          >
            {T(lang, 'Acepto', 'I accept')} →
          </motion.a>
        </div>
      </nav>

      <main className="pt-[56px]">

        {/* ═══════════════════════════════════════
            1. HOOK
        ═══════════════════════════════════════ */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[700px] mt-10"
          >
            {/* Live Indicator (Neuro-marketing: Urgency/Status) */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#10b981' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#10b981' }}></span>
              </span>
              <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.faded }}>
                {T(lang, 'Documento Confidencial · En línea', 'Confidential Document · Live')}
              </p>
            </div>

            <p className="inline-block px-4 py-2 rounded-[6px] text-[13px] font-bold uppercase tracking-[0.2em] mb-8" style={{ backgroundColor: 'rgba(30,64,175,0.06)', color: C.ac, border: `1px solid rgba(30,64,175,0.1)` }}>
              {T(lang, 'Propuesta Ejecutiva ·', 'Executive Proposal ·')} {p.client}
            </p>
            <h1
              className="text-[40px] md:text-[64px] font-black tracking-tighter leading-[1.08] mb-6 drop-shadow-sm"
              style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: C.fg }}
            >
              {Tb(lang, p.hook)}
            </h1>
            <p className="text-[24px] md:text-[32px] font-medium mb-16" style={{ color: C.mt }}>
              {Tb(lang, p.hookSub)}
            </p>
            <motion.a
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              href="#gap" className="inline-flex items-center gap-2 text-[16px] font-bold hover:opacity-70 transition-opacity" style={{ color: C.mt }}
            >
              {T(lang, 'Ver estrategia', 'View strategy')} <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.a>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════
            2. THE GAP — Before / After
        ═══════════════════════════════════════ */}
        <section id="gap" className="py-20 px-6" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="rounded-[20px] p-8 md:p-10" style={{ backgroundColor: 'rgba(0,0,0,0.03)', border: `1px solid ${C.border}` }}
              >
                <span className="text-[13px] font-black uppercase tracking-[0.25em] block mb-8" style={{ color: C.red }}>
                  {Tb(lang, p.gap.before.label)}
                </span>
                <ul className="space-y-5">
                  {p.gap.before.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[17px] leading-relaxed" style={{ color: C.mt }}>
                      <span className="shrink-0 mt-0.5 text-[18px]" style={{ color: C.red }}>✕</span>
                      {Tb(lang, item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="rounded-[20px] p-8 md:p-10" style={{ backgroundColor: 'rgba(30,64,175,0.04)', border: '1px solid rgba(30,64,175,0.15)' }}
              >
                <span className="text-[13px] font-black uppercase tracking-[0.25em] block mb-8" style={{ color: C.ac }}>
                  {Tb(lang, p.gap.after.label)}
                </span>
                <ul className="space-y-5">
                  {p.gap.after.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[17px] leading-relaxed" style={{ color: C.fg }}>
                      <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: C.ac }} />
                      {Tb(lang, item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            3. THE SYSTEM — 3-layer funnel
        ═══════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: C.ac }}>
              {T(lang, 'El sistema', 'The system')}
            </p>
            <h2 className="text-[32px] md:text-[48px] font-black text-center tracking-tight leading-tight mb-6">
              {Tb(lang, p.system.title)}
            </h2>
            <p className="text-[18px] text-center mb-16 max-w-[580px] mx-auto" style={{ color: C.mt }}>
              {Tb(lang, p.system.desc)}
            </p>

            <div className="space-y-6">
              {p.system.layers.map((layer, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: li * 0.08 }}
                  className="rounded-[20px] p-8 md:p-10"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: `1px solid ${C.border}` }}
                >
                  <p className="text-[14px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: C.ac }}>
                    {Tb(lang, layer.name)}
                  </p>
                  <ul className="space-y-4">
                    {layer.parts.map((part, pi) => (
                      <li key={pi} className="flex items-start gap-4 text-[17px] leading-relaxed">
                        <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: C.ac }} />
                        {Tb(lang, part)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Funnel flow visual icons */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-[14px] font-bold" style={{ color: C.mt }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: `1px solid ${C.border}` }}>
                <Zap className="w-4 h-4 text-[#dc2626]" /> Meta Ads
              </div>
              <span className="opacity-40">→</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: `1px solid ${C.border}` }}>
                <LayoutTemplate className="w-4 h-4 text-black" /> Landing Page
              </div>
              <span className="opacity-40">→</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(25,195,125,0.1)', color: '#047857', border: '1px solid rgba(25,195,125,0.2)' }}>
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </div>
              <span className="opacity-40">→</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full font-black" style={{ backgroundColor: C.ac, color: 'white', boxShadow: '0 4px 10px rgba(30,64,175,0.2)' }}>
                <UserCheck className="w-4 h-4" /> {T(lang, 'Alumno', 'Student')}
              </div>
            </div>

            {/* Timeline Ejecutivo de 14 días */}
            <div className="mt-20 pt-16" style={{ borderTop: `1px solid ${C.border}` }}>
              <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-center mb-10" style={{ color: C.ac }}>
                {T(lang, 'Línea de tiempo · 14 Días', 'Timeline · 14 Days')}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <div className="flex-1 rounded-[16px] p-6 text-center md:text-left" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: `1px solid ${C.border}` }}>
                  <p className="text-[14px] font-black uppercase mb-2 tracking-widest" style={{ color: C.mt }}>{T(lang, 'Día 1 – 5', 'Day 1 – 5')}</p>
                  <p className="text-[16px] font-bold mb-2">{T(lang, 'Arquitectura y Copy', 'Architecture & Copy')}</p>
                  <p className="text-[15px] leading-relaxed" style={{ color: C.mt }}>{T(lang, 'Construimos la estructura de la página y redactamos los anuncios.', 'We build the page logic and write the ad copy.')}</p>
                </div>
                <div className="flex-1 rounded-[16px] p-6 text-center md:text-left" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: `1px solid ${C.border}` }}>
                  <p className="text-[14px] font-black uppercase mb-2 tracking-widest" style={{ color: C.mt }}>{T(lang, 'Día 6 – 10', 'Day 6 – 10')}</p>
                  <p className="text-[16px] font-bold mb-2">{T(lang, 'Diseño Visual y Setup', 'Visual Design & Setup')}</p>
                  <p className="text-[15px] leading-relaxed" style={{ color: C.mt }}>{T(lang, 'Interfaz final aprobada. Pixel, SEO y WhatsApp configurados.', 'Final UI approved. Pixel, SEO, and WhatsApp configured.')}</p>
                </div>
                <div className="flex-1 rounded-[16px] p-6 text-center md:text-left" style={{ backgroundColor: 'rgba(30,64,175,0.06)', border: `1px solid rgba(30,64,175,0.15)` }}>
                  <p className="text-[14px] font-black uppercase mb-2 tracking-widest" style={{ color: C.ac }}>{T(lang, 'Día 11 – 14', 'Day 11 – 14')}</p>
                  <p className="text-[16px] font-bold mb-2">{T(lang, 'Lanzamiento', 'Launch')}</p>
                  <p className="text-[15px] leading-relaxed" style={{ color: C.mt }}>{T(lang, 'Encendemos el motor Meta Ads. Empiezan a llegar mensajes.', 'We turn on the Meta Ads engine. Messages start arriving.')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            4. VALUE STACK
        ═══════════════════════════════════════ */}
        <section className="py-20 px-6" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="max-w-[700px] mx-auto">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: C.ac }}>
              {T(lang, 'Desglose', 'Breakdown')}
            </p>
            <h2 className="text-[32px] md:text-[44px] font-black text-center tracking-tight leading-tight mb-6">
              {T(lang, 'Todo esto está incluido.', 'All of this is included.')}
            </h2>
            <p className="text-[17px] text-center mb-16" style={{ color: C.mt }}>
              {T(lang, 'Valores de mercado si contratara cada servicio por separado.', 'Market rates if you hired each service separately.')}
            </p>
            <div className="space-y-4">
              {p.stack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start justify-between gap-5 p-6 md:p-8 rounded-[16px]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: `1px solid ${C.border}` }}
                >
                  <div className="min-w-0">
                    <p className="text-[16px] font-bold md:text-[18px] mb-1">{Tb(lang, item.name)}</p>
                    <p className="text-[14px]" style={{ color: C.mt }}>{Tb(lang, item.detail)}</p>
                  </div>
                  <span className="text-[16px] md:text-[18px] font-black shrink-0 line-through" style={{ color: C.faded }}>{item.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-8 md:p-10 rounded-[20px] text-center" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: `1px solid ${C.border}` }}>
              <p className="text-[15px] font-bold mb-2 uppercase tracking-wide" style={{ color: C.mt }}>
                {T(lang, 'Valor total de mercado', 'Total market value')}
              </p>
              <p className="text-[40px] md:text-[48px] font-black line-through" style={{ color: C.faded }}>{p.stackTotal}</p>
            </div>

            {/* Parámetros del Sistema (Reglas Claras) */}
            <div className="max-w-[700px] mx-auto mt-8 p-6 md:p-8 rounded-[16px] text-left" style={{ backgroundColor: 'transparent', border: `1px dashed ${C.faded}` }}>
              <p className="font-black mb-4 uppercase tracking-[0.2em] text-[13px]" style={{ color: C.mt }}>
                {T(lang, 'Parámetros del proyecto', 'Project Parameters')}
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3" style={{ color: C.mt }}>
                  <span className="text-[18px] leading-none mt-0.5">▪</span> 
                  <span className="text-[15px]">{T(lang, 'El presupuesto publicitario (Meta Ads) se invierte directamente en su cuenta publicitaria, no se paga a Chamba.Digital.', 'The advertising budget (Meta Ads) is invested directly into your ad account, not paid to Chamba.Digital.')}</span>
                </li>
                 <li className="flex gap-3" style={{ color: C.mt }}>
                  <span className="text-[18px] leading-none mt-0.5">▪</span> 
                  <span className="text-[15px]">{T(lang, 'El alojamiento (Hosting) va incluido gratis el primer año. Después son $50 USD anuales.', 'Hosting is included free the first year. After that, it is $50 USD annually.')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            5. THE OFFER + ROI
        ═══════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: C.ac }}>
              {T(lang, 'Su inversión', 'Your investment')}
            </p>
            <p className="text-[18px] line-through mb-4" style={{ color: C.faded }}>{p.stackTotal}</p>
            <h2 className="text-[64px] md:text-[96px] font-black tracking-tighter leading-none mb-2 drop-shadow-sm" style={{ color: C.ac }}>
              {p.offer.priceUsd}
            </h2>
            <p className="text-[22px] font-medium mb-4" style={{ color: C.mt }}>{p.offer.priceMxn}</p>
            <p className="text-[18px] font-bold mb-16 px-4">{Tb(lang, p.offer.anchor)}</p>

            <div className="rounded-[20px] p-8 md:p-10 text-left" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: `1px solid ${C.border}` }}>
              <p className="text-[13px] font-bold uppercase tracking-[0.25em] mb-8" style={{ color: C.ac }}>
                {T(lang, 'La matemática', 'The math')}
              </p>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] md:text-[18px]" style={{ color: C.mt }}>{Tb(lang, p.roi.unit)}</span>
                  <span className="text-[18px] md:text-[20px] font-black">{p.roi.unitValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] md:text-[18px]" style={{ color: C.mt }}>{T(lang, 'Su inversión total', 'Your total investment')}</span>
                  <span className="text-[18px] md:text-[20px] font-black" style={{ color: C.ac }}>{p.offer.priceUsd}</span>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '32px' }}>
                  <p className="text-[17px] md:text-[20px] font-black tracking-tight mb-8 text-center">{Tb(lang, p.roi.projection.title)}</p>
                  
                  {/* Desktop / Tablet Grid */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-[14px]">
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.fg}` }}>
                          <th className="pb-3 text-[13px] uppercase tracking-wider" style={{ color: C.mt }}>{T(lang, 'Métrica', 'Metric')}</th>
                          <th className="pb-3 text-[13px] uppercase tracking-wider text-center">{Tb(lang, p.roi.projection.headers[0])}</th>
                          <th className="pb-3 text-[13px] uppercase tracking-wider text-center" style={{ color: C.ac }}>{Tb(lang, p.roi.projection.headers[1])}</th>
                          <th className="pb-3 text-[13px] uppercase tracking-wider text-center font-black" style={{ color: C.fg }}>{Tb(lang, p.roi.projection.headers[2])}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.roi.projection.rows.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: idx === p.roi.projection.rows.length - 1 ? 'none' : `1px dashed ${C.border}` }}>
                            <td className="py-4 font-medium" style={{ color: C.mt }}>{Tb(lang, row.label)}</td>
                            <td className="py-4 text-center font-bold" style={{ color: C.faded }}>{row.m1}</td>
                            <td className="py-4 text-center font-bold" style={{ color: C.ac }}>{row.m2}</td>
                            <td className="py-4 text-center font-black text-[17px]">{row.m3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Stack */}
                  <div className="md:hidden space-y-6">
                    {[0, 1, 2].map((monthIndex) => (
                      <div key={monthIndex} className="p-5 rounded-[16px]" style={{ backgroundColor: monthIndex === 2 ? 'rgba(30,64,175,0.04)' : 'rgba(255,255,255,0.7)', border: monthIndex === 2 ? `1px solid rgba(30,64,175,0.2)` : `1px solid ${C.border}`, boxShadow: monthIndex === 2 ? '0 4px 15px rgba(0,0,0,0.03)' : 'none' }}>
                        <p className="text-[14px] font-black uppercase tracking-widest text-center mb-5 pb-3 border-b" style={{ color: monthIndex === 2 ? C.ac : C.fg, borderColor: 'rgba(0,0,0,0.05)' }}>
                          {Tb(lang, p.roi.projection.headers[monthIndex as 0|1|2])}
                        </p>
                        <div className="space-y-4">
                           {p.roi.projection.rows.map((row, rIdx) => {
                             const vals = [row.m1, row.m2, row.m3];
                             const val = vals[monthIndex];
                             const isRevenue = rIdx === p.roi.projection.rows.length - 1;
                             return (
                               <div key={rIdx} className="flex justify-between items-center text-[14px]">
                                 <span style={{ color: C.mt }}>{Tb(lang, row.label)}</span>
                                 <span className={isRevenue ? 'font-black text-[16px]' : 'font-bold'} style={{ color: isRevenue ? C.ac : C.fg }}>{val}</span>
                               </div>
                             );
                           })}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            6. NEXT PHASE — After the engine
        ═══════════════════════════════════════ */}
        <section className="py-16 px-6" style={{ backgroundColor: C.bgAlt, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="max-w-[700px] mx-auto">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: C.ac }}>
              {T(lang, 'Fase 2 · Escalamiento', 'Phase 2 · Scaling')}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-black text-center tracking-tight leading-tight mb-6">
              {Tb(lang, p.nextPhase.title)}
            </h2>
            <p className="text-[17px] text-center mb-12" style={{ color: C.mt }}>
              {Tb(lang, p.nextPhase.desc)}
            </p>
            <ul className="space-y-4">
              {p.nextPhase.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-4 text-[17px] leading-relaxed p-5 rounded-[12px]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: `1px solid ${C.border}` }}
                >
                  <span className="text-[16px] shrink-0 font-bold" style={{ color: C.faded }}>+</span>
                  <span style={{ color: C.mt }}>{Tb(lang, item)}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-[14px] text-center mt-8 italic" style={{ color: C.faded }}>
              {T(lang,
                'Estas estrategias se implementan después, cuando el motor base ya esté generando datos reales.',
                'These strategies are implemented later, once the base engine is already generating real data.'
              )}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            7. RISK REVERSAL
        ═══════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: C.ac }}>
              {T(lang, 'Garantía', 'Guarantee')}
            </p>
            <h2 className="text-[32px] md:text-[44px] font-black tracking-tight leading-tight mb-8">
              {Tb(lang, p.guarantee)}
            </h2>
            <p className="text-[18px] leading-relaxed max-w-[550px] mx-auto" style={{ color: C.mt }}>
              {Tb(lang, p.guaranteeSub)}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            8. DECISION — Binary close
        ═══════════════════════════════════════ */}
        <section className="py-24 px-6" style={{ backgroundColor: C.bgWarm, borderTop: `1px solid ${C.border}` }}>
          <div className="max-w-[750px] mx-auto text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: C.ac }}>
              {T(lang, 'Decisión', 'Decision')}
            </p>
            <h2 className="text-[32px] md:text-[44px] font-black tracking-tight leading-tight mb-10">
              {T(lang, 'Dos opciones.', 'Two options.')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
              {/* Option A - Loss Aversion (Dull/Faded) */}
              <div className="rounded-[16px] p-8 md:p-10 opacity-60 transition-opacity hover:opacity-100 grayscale-[40%]" style={{ backgroundColor: 'transparent', border: `1px dashed ${C.border}` }}>
                <p className="text-[15px] font-black uppercase tracking-wider mb-5 flex items-center gap-3" style={{ color: C.faded }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.border }}></span>
                  {T(lang, 'Opción A', 'Option A')}
                </p>
                <p className="text-[17px] leading-relaxed" style={{ color: C.mt }}>
                  {T(lang,
                    'Seguir como está. Esperar que los alumnos lo encuentren solos. Depender de referidos. Cada mes sin sistema es otra oportunidad perdida.',
                    'Stay as you are. Wait for students to find you on their own. Depend on referrals. Every month without a system is another lost opportunity.'
                  )}
                </p>
              </div>

              {/* Option B - The Clear Path */}
              <div className="rounded-[16px] p-8 md:p-10 relative overflow-hidden" style={{ backgroundColor: 'rgba(30,64,175,0.04)', border: '1px solid rgba(30,64,175,0.25)', boxShadow: '0 4px 20px rgba(30,64,175,0.05)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                <p className="text-[15px] font-black uppercase tracking-wider mb-5 flex items-center gap-3 relative z-10" style={{ color: C.ac }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.ac }}></span>
                  {T(lang, 'Opción B (Recomendada)', 'Option B (Recommended)')}
                </p>
                <p className="text-[17px] leading-relaxed relative z-10 font-medium">
                  {T(lang,
                    `Invertir ${p.offer.priceUsd} y tener en 14 días un motor de ventas que capta, filtra y le entrega prospectos listos para cerrar por WhatsApp.`,
                    `Invest ${p.offer.priceUsd} and in 14 days have a sales engine that captures, filters, and delivers prospects ready to close via WhatsApp.`
                  )}
                </p>
              </div>
            </div>

            <p className="text-[16px] mb-10" style={{ color: C.mt }}>
              {Tb(lang, p.urgency.reason)} {T(lang, 'Disponible hasta el', 'Available until')} <strong style={{ color: C.fg }}>{p.urgency.deadline}</strong>.
            </p>

            {/* Neuro-marketing: Trust Anchor before CTA */}
            <div className="flex items-center justify-center gap-2 mb-8 text-[14px] font-bold" style={{ color: C.ac }}>
              <ShieldCheck className="w-5 h-5" />
              {T(lang, 'Riesgo cero. Transacción garantizada.', 'Zero risk. Guaranteed transaction.')}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ['0 10px 30px rgba(30,64,175,0.25)', '0 10px 45px rgba(30,64,175,0.5)', '0 10px 30px rgba(30,64,175,0.25)'] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(lang, p.cta.acceptMsg))}`}
                target="_blank"
                className="w-full sm:w-auto text-white px-12 py-6 rounded-[14px] font-bold text-[17px]"
                style={{ backgroundColor: C.ac }}
              >
                {T(lang, 'Elijo la Opción B →', 'I choose Option B →')}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${p.cta.whatsapp}?text=${encodeURIComponent(Tb(lang, p.cta.questionMsg))}`}
                target="_blank"
                className="w-full sm:w-auto px-12 py-6 rounded-[14px] font-bold text-[17px] transition-colors"
                style={{ backgroundColor: 'rgba(0,0,0,0.05)', border: `1px solid rgba(0,0,0,0.1)`, color: C.fg }}
              >
                {T(lang, 'Tengo preguntas', 'I have questions')}
              </motion.a>
            </div>

            <p className="text-[13px] mt-10" style={{ color: C.faded }}>
              {T(lang,
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
          {T(lang, 'Propuesta preparada para', 'Proposal prepared for')} {p.client} · {p.project}
        </p>
        <p className="text-[11px] mt-1" style={{ color: C.faded }}>
          © {new Date().getFullYear()} Chamba Digital · {T(lang, 'Ingeniería de Performance', 'Performance Engineering')}
        </p>
      </footer>
    </div>
  );
};

export default ProposalPage;
