import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, MessageSquare, Search } from "lucide-react";
import { ChambaNavbar, ChambaFooter } from "../App";

export default function NotFoundPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <ChambaNavbar />
      <main className="flex-grow flex items-center justify-center px-4 pt-[100px] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-lg space-y-6"
        >
          <div className="text-[clamp(60px,15vw,100px)] font-black text-slate-200 leading-none select-none">
            404
          </div>
          <h1 className="text-[clamp(20px,5vw,28px)] font-black text-slate-900 tracking-tight">
            Esta página no existe
          </h1>
          <p className="text-slate-500 text-[clamp(13px,2.5vw,15px)] font-medium max-w-md mx-auto">
            Parece que la URL que visitaste no está disponible o fue movida. Te ayudamos a encontrar lo que necesitas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md w-full sm:w-auto"
            >
              <Home className="w-4 h-4" /> Volver al Inicio
            </Link>
            <Link
              to="/servicios"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm transition-all w-full sm:w-auto"
            >
              <Search className="w-4 h-4" /> Ver Servicios
            </Link>
            <a
              href="https://wa.me/51904060670?text=Hola,%20necesito%20ayuda%20con%20la%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" /> Contactar por WhatsApp
            </a>
          </div>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline cursor-pointer pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a la página anterior
          </button>
        </motion.div>
      </main>
      <ChambaFooter />
    </div>
  );
}
