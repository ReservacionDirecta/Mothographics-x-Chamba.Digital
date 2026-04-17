import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar } from '../../App';
import { 
  Building2, 
  Users, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Mail,
  Instagram,
  Linkedin,
  MapPin,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../../App';

const HotelsLandingPage: React.FC = () => {
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
            <span className="label-editorial mx-auto">Sector Hospitality & Hotels</span>
            <h1 className="text-[36px] md:text-[64px] font-black tracking-tight leading-[1.1] mb-6">
              Recupera tus <span className="text-accent">Reservas Directas</span> y elimina comisiones.
            </h1>
            <p className="text-[16px] md:text-[18px] text-muted max-w-[700px] mx-auto mb-10 leading-relaxed">
              Software a medida, integración de PMS y estrategias de Meta Ads diseñadas específicamente para maximizar la ocupación de tu hotel sin depender de las OTAs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670"
                target="_blank"
                className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
              >
                Auditar mi Motor de Reservas
              </motion.a>
              <a href="#soluciones" className="text-[14px] font-bold hover:text-accent transition-colors">
                Ver Soluciones Técnicas
              </a>
            </div>
          </motion.div>
        </section>

        {/* Solutions Grid */}
        <section id="soluciones" className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Optimización PMS",
                desc: "Conectamos tu inventario en tiempo real con canales de venta directos para evitar overbooking.",
                icon: Building2
              },
              {
                title: "Motor de Reservas",
                desc: "Experiencia de reserva fluida en móviles que reduce el abandono y aumenta el ticket promedio.",
                icon: Smartphone
              },
              {
                title: "Anuncios de Tráfico",
                desc: "Campañas de Meta Ads hiper-segmentadas para viajeros que ya están buscando tu destino.",
                icon: BarChart3
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

        {/* Benefits Section */}
        <section className="py-24 px-6 md:px-10 bg-accent/[0.02] border-y border-white/5">
          <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-editorial">Resultados Tangibles</span>
              <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight mb-8">
                ¿Por qué los hoteles eligen nuestra <span className="text-accent">Ingeniería</span>?
              </h2>
              <div className="space-y-6">
                {[
                  "Ahorro de hasta 20% en comisiones de Booking/Expedia.",
                  "Control total de la base de datos de tus huéspedes.",
                  "Automatización de procesos de check-in y cobros.",
                  "Soporte técnico especializado 24/7."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <p className="text-[15px] font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass rounded-[32px] border-accent/20 flex items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%]" />
                <div className="relative z-10 text-center">
                  <span className="text-[64px] font-black text-accent block mb-2">+35%</span>
                  <span className="text-[14px] font-bold uppercase tracking-widest text-muted">Aumento en reserva directa</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-10 text-center max-w-[800px] mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-black mb-6">¿Listo para llenar tu hotel?</h2>
          <p className="text-muted mb-10 text-[16px]">Analizamos tu sistema actual sin compromiso y te mostramos dónde estás perdiendo dinero.</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/51904060670"
            className="inline-block bg-accent text-white px-12 py-5 rounded-[12px] font-bold text-[16px] shadow-[0_10px_40px_rgba(59,130,246,0.4)]"
          >
            Hablar con un Especialista
          </motion.a>
        </section>
      </main>

      <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <Logo />
              <p className="text-[14px] text-muted leading-relaxed">
                Ingeniería Digital de alto nivel para el sector Hospitality. Transformamos hoteles con tecnología y datos.
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
                <li><Link to="/ecommerce" className="text-[14px] text-muted hover:text-accent transition-colors">E-commerce</Link></li>
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
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-fg">¿Nueva Alianza?</h4>
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-[11px] text-accent font-bold uppercase tracking-wider mb-2">Próxima Parada</p>
                <p className="text-[13px] font-medium">Expansión México × Perú</p>
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

export default HotelsLandingPage;
