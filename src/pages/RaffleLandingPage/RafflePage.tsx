import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Gift,
  Users,
  Trophy,
  CheckCircle2,
} from "lucide-react";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  ciudad: string;
  mensaje: string;
}

const RafflePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    ciudad: "",
    mensaje: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const trackEvent = (name: string, payload: any = {}) => {
    try {
      const dl = (window && (window as any).dataLayer) || [];
      if (Array.isArray(dl)) dl.push({ event: name, ...payload });
    } catch {
      // ignore
    }
  };
  const handleParticipateClick = () => {
    trackEvent('participate_click', { section: 'hero' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mensajeWhatsApp = `🎯 *NUEVO PARTICIPANTE SORTEO* 🎯

📋 *Datos del Participante:*
• Nombre: ${formData.nombre}
• Email: ${formData.email}
• Teléfono: ${formData.telefono}
• DNI: ${formData.dni}
• Ciudad: ${formData.ciudad}
• Mensaje: ${formData.mensaje}

🎉 Verificando participación...`;

    const url = `https://wa.me/51904060670?text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(url, "_blank");

    setIsSubmitted(true);
  };

  const raffleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Gran Sorteo Especial 2026",
    description:
      "Participa para ganar premios: Landing Page personalizada, descuento del 50% en servicio web y asesoría de 1 hora.",
    url: typeof window !== 'undefined' ? (window as any).location?.origin + (window as any).location?.pathname : "https://localhost:3000/sorteo",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    provider: {
      "@type": "Organization",
      name: "Chamba.Digital / Mothographics",
    },
  };

  const prizeItems = [
    { icon: Trophy, title: "1er Premio", desc: "Landing Page personalizada para tu negocio (diseño + implementación)", color: "text-yellow-500" },
    { icon: Gift, title: "2do Premio", desc: "Descuento del 50% en el servicio web de tu elección", color: "text-purple-500" },
    { icon: Users, title: "3er Premio", desc: "Asesoría de 1 hora para proyecto web, apps, automatización, marketing", color: "text-blue-500" },
  ];

  const steps = [
    { step: "1", title: "Completa el Formulario", desc: "Llena todos tus datos" },
    { step: "2", title: "Envíalo por WhatsApp", desc: "Clic para enviarnos tu info" },
    { step: "3", title: "Espera el Sorteo", desc: "Te notificaremos si ganas" },
  ];

  const terms = [
    "Sorteo válido solo para residentes en Perú",
    "Un participante por DNI válido",
    "Sorteo del 1 al 7 de mayo 2026 - resultado el 7 de mayo",
    "Los ganadores serán notificados via WhatsApp",
    "Premios se entregan en máximo 7 días hábiles",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(raffleJsonLd)}} />

      {/* Hero */}
      <section className="relative py-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90" />
        <div className="relative z-10 text-center text-white px-4">
          <Trophy className="w-14 h-14 mx-auto mb-2 text-yellow-300" />
          <h1 className="text-3xl md:text-5xl font-bold mb-1">🎉 Gran Sorteo Especial</h1>
          <p className="text-base md:text-lg mb-3 opacity-90">Participa y gana premios increíbles</p>
          <div className="flex flex-col items-center">
            <button
              className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold text-base hover:bg-yellow-300 transition-colors"
              onClick={() => {
                handleParticipateClick();
                document.getElementById("seccion-formulario")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ¡Quiero Participar!
            </button>
          </div>
        </div>
      </section>

      {/* Hosting */}
      <p className="text-center text-xs text-gray-500 py-1">Hosting desde $5/mes</p>

      {/* Premios */}
      <section className="py-6 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">🎁 Premios</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {prizeItems.map((premio, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-5 text-center">
              <premio.icon className={`w-10 h-10 mx-auto mb-2 ${premio.color}`} />
              <h3 className="text-lg font-bold text-gray-800 mb-1">{premio.title}</h3>
              <p className="text-sm text-gray-600">{premio.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo Participar */}
      <section className="py-6 bg-white px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">📱 Cómo Participar</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-lg">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Términos y Condiciones */}
      <section className="py-6 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">📋 Términos y Condiciones</h2>
          <div className="bg-white rounded-xl shadow p-5 space-y-2">
            <ul className="space-y-2 text-sm text-gray-600">
              {terms.map((term, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="seccion-formulario" className="py-6 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">🎯 Formulario de Inscripción</h2>
          <p className="text-center text-gray-600 text-sm mb-4">Completa tus datos para participar</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">Nombre completo *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Juan Pérez García" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="juan@ejemplo.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">WhatsApp *</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required pattern="[0-9]{9}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="987654321" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">DNI *</label>
                  <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} required pattern="[0-9]{8}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="12345678" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">Ciudad</label>
                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Lima" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">¿Por qué quieres ganar? (opcional)</label>
                <textarea name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Cuéntanos..." />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold text-base hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Enviar por WhatsApp y Participar</span>
              </button>
              <div className="w-full h-36 md:h-44 mx-auto">
                <iframe title="Ubicación"
                  src="https://maps.google.com/maps?q=Chamba%20Digital%20HQ&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen />
              </div>
              <p className="text-xs text-gray-500 text-center">Al enviar, aceptas los términos y condiciones</p>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">🎉 ¡Listo!</h3>
              <p className="text-gray-600 text-sm mb-4">Se ha abierto WhatsApp. Por favor, envía el mensaje para completar tu inscripción.</p>
              <button onClick={() => setIsSubmitted(false)} className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
                Registrar a otra persona
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-xs text-gray-300">© 2024 - Sorteo Especial. Todos los derechos reservados.</p>
        <p className="text-xs text-gray-400 mt-1">Contáctanos: +51 904 060 670</p>
      </footer>
    </div>
  );
};

export default RafflePage;