import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { ChambaNavbar, ChambaFooter } from "../App";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkout_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!checkoutId) {
      setStatus("error");
      return;
    }
    const timer = setTimeout(() => setStatus("success"), 2000);
    return () => clearTimeout(timer);
  }, [checkoutId]);

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
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-[clamp(20px,5vw,28px)] font-black text-slate-900 tracking-tight">
                Procesando tu pago...
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Estamos confirmando tu suscripción con Polar.sh
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </motion.div>
              <h1 className="text-[clamp(20px,5vw,28px)] font-black text-slate-900 tracking-tight">
                ¡Pago exitoso!
              </h1>
              <p className="text-slate-500 text-[clamp(13px,2.5vw,15px)] font-medium max-w-md mx-auto">
                Tu suscripción WaaS ha sido activada correctamente. Ya puedes acceder a tu panel para gestionar tu proyecto.
              </p>
              {checkoutId && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500">
                  <span className="font-bold text-slate-700">ID de transacción:</span>{" "}
                  <span className="font-mono">{checkoutId}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  to="/portal"
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md w-full sm:w-auto"
                >
                  Ir a mi Portal <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm transition-all w-full sm:w-auto"
                >
                  <Home className="w-4 h-4" /> Volver al Inicio
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-[clamp(20px,5vw,28px)] font-black text-slate-900 tracking-tight">
                Algo salió mal
              </h1>
              <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">
                No pudimos confirmar tu pago. Si realizaste el pago, contacta a nuestro equipo por WhatsApp para asistencia inmediata.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="https://wa.me/51904060670?text=Hola,%20realicé%20un%20pago%20pero%20no%20recibí%20confirmación.%20Mi%20ID%20de%20checkout%20es:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md w-full sm:w-auto"
                >
                  Contactar por WhatsApp
                </a>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm transition-all w-full sm:w-auto"
                >
                  <Home className="w-4 h-4" /> Volver al Inicio
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </main>
      <ChambaFooter />
    </div>
  );
}
