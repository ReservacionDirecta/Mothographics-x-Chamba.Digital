import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Download, 
  ExternalLink,
  MessageCircle
} from "lucide-react";

interface FreeConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

const AVAILABLE_TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

export const FreeConsultationModal: React.FC<FreeConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = "Auditoría Técnica y Plan WaaS (15 min)",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "10:00 AM",
    topic: defaultTopic,
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [calendarLinks, setCalendarLinks] = useState<{ googleCalendarUrl?: string; icsContent?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setCalendarLinks({
          googleCalendarUrl: data.googleCalendarUrl,
          icsContent: data.icsContent,
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "No se pudo agendar la consulta. Intenta de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión con el servidor. Intenta de nuevo o contáctanos por WhatsApp.");
    }
  };

  const handleDownloadIcs = () => {
    if (!calendarLinks?.icsContent) return;
    const blob = new Blob([calendarLinks.icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `consulta_15min_chamba_digital_${formData.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-[620px] glass p-6 sm:p-8 md:p-10 rounded-[32px] border border-accent/30 text-left overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] my-8 z-10"
          >
            {/* Glow effects */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 blur-[90px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {status !== "success" ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-[0_10px_25px_rgba(59,130,246,0.2)] shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" /> 100% Gratuito • 15 Minutos
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                      Agenda tu Consulta Gratuita
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  Analizaremos tu modelo de negocio, web actual y te diremos exactamente cómo automatizarlo y escalarlo con WaaS & IA. <strong className="text-white">Sin compromisos ni costos ocultos.</strong>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-accent" /> Tu Nombre *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-slate-900/80 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-accent" /> Correo Corporativo *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="carlos@empresa.com"
                        className="w-full bg-slate-900/80 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Phone / WhatsApp */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-accent" /> WhatsApp / Teléfono *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+51 900 000 000"
                        className="w-full bg-slate-900/80 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-accent" /> Negocio o Proyecto
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nombre de tu negocio o URL"
                        className="w-full bg-slate-900/80 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Date and Time Slot Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-accent" /> Fecha de Consulta *
                      </label>
                      <input
                        required
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white focus:outline-none transition-all [color-scheme:dark]"
                      />
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-accent" /> Horario (15 min) *
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white focus:outline-none transition-all"
                      >
                        {AVAILABLE_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} (Hora Perú/PET)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Topic / Details */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-accent" /> ¿Qué te gustaría consultar o resolver?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ej. Quiero migrar mi web a WaaS, automatizar reservas hoteleras con IA o captar más clientes B2B..."
                      className="w-full bg-slate-900/80 border border-slate-800 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold text-center">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                    whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
                    className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-black py-3.5 sm:py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(59,130,246,0.3)] transition-all cursor-pointer mt-2"
                  >
                    {status === "loading" ? (
                      "Confirmando horario..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Confirmar Consulta de 15 Minutos
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center space-y-5"
              >
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl flex items-center justify-center mx-auto text-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    ¡Consulta Agendada con Éxito!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Hemos reservado tu espacio para el <strong className="text-white">{formData.date}</strong> a las <strong className="text-white">{formData.timeSlot}</strong>. Se ha enviado una notificación directa a nuestro equipo (<span className="text-blue-400 font-bold">yerctech@gmail.com</span>).
                  </p>
                </div>

                {/* Reminder action box */}
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-left space-y-3">
                  <span className="text-[11px] font-black uppercase text-accent tracking-widest block">
                    📌 Crea tu recordatorio ahora:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {calendarLinks?.googleCalendarUrl && (
                      <a
                        href={calendarLinks.googleCalendarUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <Calendar className="w-4 h-4" /> Google Calendar <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={handleDownloadIcs}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Descargar .ICS (iCal/Outlook)
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/51904060670?text=${encodeURIComponent(`Hola! Acabo de agendar una consulta de 15 minutos en Chamba Digital para el ${formData.date} a las ${formData.timeSlot}. Mi nombre es ${formData.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md mt-1"
                  >
                    <MessageCircle className="w-4 h-4" /> Notificar al WhatsApp de Chamba Digital
                  </a>
                </div>

                <button
                  onClick={resetAndClose}
                  className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors pt-2 cursor-pointer"
                >
                  Cerrar Ventana
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
