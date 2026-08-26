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
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card - Clean, solid, human design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[540px] max-h-[90vh] flex flex-col bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto z-10"
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-20"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-7 custom-scrollbar">
              {status !== "success" ? (
                <>
                  {/* Clean Header */}
                  <div className="mb-5 pr-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      Agendar llamada
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Elige el tipo de sesión que prefieras para evaluar tu proyecto.
                    </p>
                  </div>

                  {/* Clean Tab Selector */}
                  <div className="grid grid-cols-2 gap-2 mb-5 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setCallType("call_5min");
                        setFormData(prev => ({ ...prev, callType: "Llamada Rápida (5 min)" }));
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        callType === "call_5min"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      Llamada (5 min)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCallType("meeting_15_30min");
                        setFormData(prev => ({ ...prev, callType: "Videollamada Estratégica (15-30 min)" }));
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        callType === "meeting_15_30min"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      Videollamada (15 min)
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Nombre
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Tu nombre completo"
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Correo electrónico
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="correo@empresa.com"
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          WhatsApp / Teléfono
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+51 900 000 000"
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Negocio o Web actual
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Opcional"
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Fecha
                        </label>
                        <input
                          required
                          type="date"
                          min={minDate}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Horario (Hora Perú)
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 outline-none transition-all cursor-pointer"
                        >
                          {AVAILABLE_TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Mensaje o consulta breve
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="¿Qué te gustaría resolver o qué plan te interesa?"
                        className="w-full bg-white border border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/15 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all cursor-pointer mt-2"
                    >
                      {status === "loading" ? "Guardando..." : "Confirmar fecha y hora"}
                    </button>
                  </form>
                </>
              ) : (
                /* Clean Success State */
                <div className="py-4 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Llamada agendada
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                      Nos conectamos el <strong>{formData.date}</strong> a las <strong>{formData.timeSlot}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2.5">
                    <p className="text-xs font-semibold text-slate-700">
                      Opciones de recordatorio:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {calendarLinks?.googleCalendarUrl && (
                        <a
                          href={calendarLinks.googleCalendarUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white hover:bg-slate-100 text-slate-800 font-medium py-2 px-3 rounded-lg text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-accent" /> Google Calendar
                        </a>
                      )}
                      <button
                        onClick={handleDownloadIcs}
                        className="bg-white hover:bg-slate-100 text-slate-800 font-medium py-2 px-3 rounded-lg text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" /> Descargar .ICS
                      </button>
                    </div>

                    <a
                      href={`https://wa.me/51904060670?text=${encodeURIComponent(`Hola! Agendé una consulta para el ${formData.date} a las ${formData.timeSlot}. Mi nombre es ${formData.name}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-all mt-1"
                    >
                      <MessageCircle className="w-4 h-4" /> Confirmar por WhatsApp
                    </a>
                  </div>

                  <button
                    onClick={resetAndClose}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors pt-2 cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
