import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar } from '../../App';
import { 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Mail,
  Instagram,
  Linkedin,
  MapPin,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../../App';

const EcommerceLandingPage: React.FC = () => {
  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />
      
      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center text-center justify-center px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
          <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial mx-auto">E-commerce & Digital Growth</span>
            <h1 className="text-[36px] md:text-[64px] font-black tracking-tight leading-[1.1] mb-6">
              Escala tu facturación con <span className="text-accent">E-commerce de Ingeniería</span>.
            </h1>
            <p className="text-[16px] md:text-[18px] text-muted max-w-[700px] mx-auto mb-10 leading-relaxed">
              No hacemos solo tiendas bonitas. Construimos infraestructuras de venta masiva con optimización de pixel, tracking avanzado y automatización de marketing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670"
                target="_blank"
                className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
              >
                Solicitar Diagnóstico ROAS
              </motion.a>
              <a href="#tecnologia" className="text-[14px] font-bold hover:text-accent transition-colors">
                Nuestra Tecnología
              </a>
            </div>
          </motion.div>
        </section>

        {/* Tech Features Grid */}
        <section id="tecnologia" className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Alta Conversión",
                desc: "Checkouts optimizados de un solo paso y diseño UX orientado a la venta inmediata.",
                icon: ShoppingCart
              },
              {
                title: "Tracking Avanzado",
                desc: "API de Conversiones de Meta y Google Tag Manager para medir cada centavo de tu inversión.",
                icon: BarChart3
              },
              {
                title: "Automatización",
                desc: "Recuperación de carritos abandonados y post-venta automatizada mediante agentes de IA.",
                icon: Settings
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-[20px] border-white/5 hover:border-accent/30 transition-all group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-[18px] font-bold mb-3">{item.title}</h4>
                <p className="text-[14px] text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROI/Growth Section */}
        <section className="py-24 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative order-2 lg:order-1">
              <div className="aspect-square glass rounded-[32px] border-accent/20 flex items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%]" />
                <div className="relative z-10 text-center">
                  <span className="text-[64px] font-black text-accent block mb-2">4.5x</span>
                  <span className="text-[14px] font-bold uppercase tracking-widest text-muted">ROAS Promedio de Clientes</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="label-editorial">Escalabilidad Garantizada</span>
              <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">
                De 0 a <span className="text-accent">Ventas Recurrentes</span> con un sistema real.
              </h2>
              <div className="space-y-6">
                {[
                  "Integración con pasarelas de pago globales (Stripe, PayPal, Kushki).",
                  "Sistemas de Inventario sincronizados en tiempo real.",
                  "Análisis de datos para optimizar el Costo por Adquisición (CPA).",
                  "Arquitectura serverless para soportar picos de tráfico en Hot Sales."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <p className="text-[15px] font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-10 text-center max-w-[800px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-black mb-6">Tu tienda lista para el mercado global</h2>
          <p className="text-muted mb-10 text-[16px]">Deja de jugar con plantillas. Construyamos juntos un motor de comercio electrónico profesional.</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670"
            className="inline-block bg-accent text-white px-12 py-5 rounded-[12px] font-bold text-[16px] shadow-[0_10px_40px_rgba(59,130,246,0.4)]"
          >
            Empezar mi Transformación E-com
          </motion.a>
        </section>
      </main>

      <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <Logo />
              <p className="text-[14px] text-muted leading-relaxed">
                Ingeniería Digital de alto nivel para marcas que buscan escalar. Transformamos el comercio electrónico con datos.
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-muted hover:text-accent transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted hover:text-accent transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Explorar</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-[14px] text-muted hover:text-accent transition-colors">Inicio</Link></li>
                <li><Link to="/hotels" className="text-[14px] text-muted hover:text-accent transition-colors">Hoteles</Link></li>
                <li><Link to="/servicebusinesses" className="text-[14px] text-muted hover:text-accent transition-colors">Servicios B2B</Link></li>
                <li><Link to="/alianza" className="text-[14px] text-muted hover:text-accent transition-colors">Alianza</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-muted text-[13px]">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <p>Lima, Perú</p>
                </div>
                <div className="flex items-center gap-3 text-muted text-[13px]">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <p>hola@chamba.digital</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6">
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">Alianza Estratégica</h4>
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-[11px] text-accent font-bold uppercase tracking-wider mb-2">Región</p>
                <p className="text-[13px] font-medium">México × Latam</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-muted">
              © {new Date().getFullYear()} Chamba Digital. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceLandingPage;
