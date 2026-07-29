import React, { useState } from "react";
import { motion } from "motion/react";
import { Hotel, RefreshCw, CheckCircle2, Calendar, ShieldCheck, ArrowRight, Layers } from "lucide-react";

export const SirvoyPmsDemo: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Hace 1 minuto");
  const [channels, setChannels] = useState([
    { name: "Booking.com", status: "Sincronizado 2-Way", active: true, count: 14 },
    { name: "Airbnb", status: "iCal + API Sync", active: true, count: 8 },
    { name: "Expedia", status: "Sincronizado 2-Way", active: true, count: 5 },
    { name: "Motor Directo (Chamba)", status: "0% Comisión", active: true, count: 22 },
  ]);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync("Justo ahora");
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 border border-blue-500/20 rounded-[32px] p-6 md:p-10 shadow-2xl backdrop-blur-xl my-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-blue-500/20">
            <Hotel className="w-3.5 h-3.5" /> Integración Sirvoy PMS 2-Way
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Demostración en Vivo: Sirvoy Channel Manager
          </h3>
          <p className="text-muted text-sm mt-1">
            Sincronización instantánea de inventario, tarifas y reservas directas sin comisiones.
          </p>
        </div>
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Sincronizando..." : "Forzar Sincronización"}
        </button>
      </div>

      {/* Grid of channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {channels.map((ch, idx) => (
          <div key={idx} className="bg-surface/80 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-white text-base">{ch.name}</span>
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black text-blue-400">{ch.count}</span>
              <span className="text-xs text-muted font-bold">reservas este mes</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block text-center">
              {ch.status}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-blue-950/40 border border-blue-500/30 p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
          <span>
            <strong>Estado del Servidor Sirvoy:</strong> Sincronización automática activada. Última actualización: <span className="text-white font-bold">{lastSync}</span>.
          </span>
        </div>
        <a
          href="https://wa.me/51904060670?text=Hola%20Chamba%20Digital,%20quiero%20integrar%20Sirvoy%20PMS%20con%20mi%20hotel"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-colors"
        >
          Conectar mi PMS <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
