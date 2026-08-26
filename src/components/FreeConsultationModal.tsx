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
  defaultCallType?: "call_5min" | "meeting_15_30min";
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
  defaultTopic = "Auditoría Técnica y Plan WaaS (15-30 min)",
  defaultCallType = "meeting_15_30min",
}) => {
  const [callType, setCallType] = useState<"call_5min" | "meeting_15_30min">(defaultCallType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "10:00 AM",
    topic: defaultTopic,
    callType: defaultCallType === "call_5min" ? "Llamada Rápida (5 min)" : "Videollamada Estratégica (15-30 min)",
    notes: "",
  });

  // Sync default topic and callType when opened with different props
  React.useEffect(() => {
    if (isOpen) {
      setCallType(defaultCallType);
      setFormData(prev => ({
        ...prev,
        topic: defaultTopic,
        callType: defaultCallType === "call_5min" ? "Llamada Rápida (5 min)" : "Videollamada Estratégica (15-30 min)",
      }));
    }
  }, [isOpen, defaultTopic, defaultCallType]);

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
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[620px] max-h-[92vh] flex flex-col bg-slate-900 text-slate-100 rounded-[28px] sm:rounded-[32px] border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden my-auto z-10"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/25 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto p-5 sm:p-7 md:p-8 custom-scrollbar">
              {status !== "success" ? (
                <>
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5 pr-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-[0_8px_20px_rgba(59,130,246,0.25)] shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3" /> 100% Gratuito • Sin Compromiso
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                        Agenda tu Sesión Estratégica
                      </h3>
                    </div>
                  </div>

                  {/* Call Type Selector: 5 min vs 15-30 min */}
                  <div className="grid grid-cols-2 gap-2 mb-3.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setCallType("call_5min");
                        setFormData(prev => ({ ...prev, callType: "Llamada Rápida (5 min)" }));
                      }}
                      className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                        callType === "call_5min"
                          ? "bg-accent text-white shadow-md font-black"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Llamada (5 min)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCallType("meeting_15_30min");
                        setFormData(prev => ({ ...prev, callType: "Videollamada Estratégica (15-30 min)" }));
                      }}
                      className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-[12px] uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                        callType === "meeting_15_30min"
                          ? "bg-accent text-white shadow-md font-black"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Videollamada (15-30 min)</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-normal">
                    {callType === "call_5min" 
                      ? "Te llamamos por teléfono o WhatsApp para resolver dudas rápidas, alcance y precios al instante."
                      : "Analizaremos tu modelo de negocio, web actual y te diremos exactamente cómo automatizarlo y escalarlo con WaaS & IA."
                    } <strong className="text-white font-semibold">Sin compromisos ni costos ocultos.</strong>
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-accent" /> Tu Nombre *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej. Carlos Mendoza"
                          className="w-full bg-slate-950/70 border border-slate-800 hover:border-slate-700 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all font-medium"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-accent" /> Correo Corporativo *
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="carlos@empresa.com"
                          className="w-full bg-slate-950/70 border border-slate-800 hover:border-slate-700 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Phone / WhatsApp */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-accent" /> WhatsApp / Teléfono *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+51 900 000 000"
                          className="w-full bg-slate-950/70 border border-slate-800 hover:border-slate-700 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all font-medium"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-accent" /> Negocio o Proyecto
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nombre de tu negocio o URL"
                          className="w-full bg-slate-950/70 border border-slate-800 hover:border-slate-700 focus:border-accent rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Date and Time Slot Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      {/* Date */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent" /> Fecha de Consulta *
                        </label>
                        <input
                          required
                          type="date"
                          min={minDate}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 focus:border-accent rounded-xl py-2 px-3 text-xs sm:text-sm text-white focus:outline-none transition-all [color-scheme:dark]"
                        />
                      </div>

                      {/* Time Slot */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-accent" /> Horario (15 min) *
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 focus:border-accent rounded-xl py-2 px-3 text-xs sm:text-sm text-white focus:outline-none transition-all cursor-pointer"
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
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-accent" /> ¿Qué te gustaría consultar o resolver?
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Ej. Quiero migrar mi web a WaaS, automatizar reservas hoteleras con IA o captar más clientes B2B..."
                        className="w-full bg-slate-950/70 border border-slate-800 hover:border-slate-700 focus:border-accent rounded-xl py-2 px-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all resize-none font-medium"
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs font-bold text-center">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                      whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
                      className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-black py-3.5 px-5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(59,130,246,0.35)] transition-all cursor-pointer pt-3"
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
                  className="py-3 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-[0_10px_25px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5">
                      ¡Consulta Agendada con Éxito!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Hemos reservado tu espacio para el <strong className="text-white">{formData.date}</strong> a las <strong className="text-white">{formData.timeSlot}</strong>. Se ha enviado una notificación directa a nuestro equipo (<span className="text-blue-400 font-bold">yerctech@gmail.com</span>).
                    </p>
                  </div>

                  {/* Reminder action box */}
                  <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-left space-y-3">
                    <span className="text-[11px] font-black uppercase text-accent tracking-widest block">
                      📌 Crea tu recordatorio ahora:
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {calendarLinks?.googleCalendarUrl && (
                        <a
                          href={calendarLinks.googleCalendarUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <Calendar className="w-4 h-4" /> Google Calendar <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={handleDownloadIcs}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Descargar .ICS (iCal)
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
