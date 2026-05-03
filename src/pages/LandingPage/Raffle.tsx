import React from 'react';
import { motion } from 'motion/react';
import { ChambaNavbar, Logo } from '../../App';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Medal,
  Award,
  Instagram,
  Linkedin,
  MapPin,
  Mail
} from 'lucide-react';

const RaffleLandingPage: React.FC = () => {
  const prizes = [
    {
      place: "Primer Puesto",
      emoji: "🏆",
      title: "Landing Page de Alta Conversión",
      desc: "Diseño de cinco secciones con tres revisiones y entrega en siete días. (No incluye dominio ni hosting)",
      icon: Trophy,
      color: "text-yellow-400"
    },
    {
      place: "Segundo Puesto",
      emoji: "🥈",
      title: "50% de Descuento en Desarrollo Web",
      desc: "Válido para el desarrollo que elija ya sea Landing, página web empresarial, o web app institucional. (Sin incluir costos operativos)",
      icon: Medal,
      color: "text-gray-400"
    },
    {
      place: "Tercer Puesto",
      emoji: "🥉",
      title: "Asesoría Web Gratuita",
      desc: "Una hora de asesoría WEB estratégica para empresas, servicios y negocios.",
      icon: Award,
      color: "text-amber-600"
    }
  ];

  return (
    <div className="bg-bg text-fg selection:bg-accent selection:text-white">
      <ChambaNavbar />

      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col items-center text-center justify-center px-6 md:px-10 overflow-hidden max-w-[1024px] mx-auto">
          <div className="absolute top-[-100px] left-[30%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-[circle,rgba(59,130,246,0.1)_0%,transparent_70%] blur-[60px] -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-editorial mx-auto">Gran Sorteo</span>
            <h1 className="text-[36px] md:text-[64px] font-black tracking-tight leading-[1.1] mb-6">
              Participa y gana <br className="hidden md:block"/> <span className="text-accent">Ingeniería Digital</span> para tu negocio.
            </h1>
            <p className="text-[16px] md:text-[18px] text-muted max-w-[700px] mx-auto mb-10 leading-relaxed">
              Impulsa tu presencia online con premios diseñados para escalar tus ventas y optimizar tu operación digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/51904060670"
                target="_blank"
                className="bg-accent text-white px-10 py-5 rounded-[12px] font-bold text-[15px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all"
              >
                Inscribirme al Sorteo
              </motion.a>
              <a href="#premios" className="text-[14px] font-bold hover:text-accent transition-colors">
                Ver Premios
              </a>
            </div>
          </motion.div>
        </section>

        {/* Prizes Section */}
        <section id="premios" className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <span className="label-editorial mx-auto">Premios del Sorteo</span>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">
              Lo que puedes <span className="text-accent">ganar</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {prizes.map((prize, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-[20px] border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <prize.icon className="w-24 h-24" />
                </div>
                <div className="text-4xl mb-4">{prize.emoji}</div>
                <h3 className={`text-[12px] font-black uppercase tracking-widest mb-2 ${prize.color}`}>{prize.place}</h3>
                <h4 className="text-[20px] font-bold mb-3">{prize.title}</h4>
                <p className="text-[14px] text-muted leading-relaxed flex-grow">{prize.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-10 border-t border-glass-border bg-black/40 backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <Logo />
              <p className="text-[14px] text-muted leading-relaxed">
                Ingeniería Digital de alto nivel. Transformamos negocios con tecnología y datos.
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
                <li><Link to="/hotels" className="text-[14px] text-muted hover:text-accent transition-colors">Hoteles</Link></li>
                <li><Link to="/servicebusinesses" className="text-[14px] text-muted hover:text-accent transition-colors">Servicios B2B</Link></li>
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

export default RaffleLandingPage;
