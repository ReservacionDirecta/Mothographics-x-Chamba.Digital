import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Mail, 
  Building, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  LogOut, 
  Sparkles,
  Server,
  Layers,
  MessageSquare,
  Paperclip,
  Image,
  Video,
  FileAudio,
  File,
  MonitorPlay,
  ExternalLink
} from "lucide-react";
import { ChambaNavbar, ChambaFooter } from "../App";

export default function UserPortal() {
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Auth Form State
  const [email, setEmail] = useState("demo@chamba.digital");
  const [password, setPassword] = useState("demo123456");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [plan, setPlan] = useState("Web Tradicional");

  // User State
  const [user, setUser] = useState<any>(null);

  // Client chat & tasks state (declared before any handlers that use them)
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [clientTasks, setClientTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "chat" | "project">("overview");

  // Project context state
  const [projectInfo, setProjectInfo] = useState({
    projectDescription: "",
    deployedUrl: "",
    thumbnailUrl: "",
    techStack: "",
    githubRepo: "",
  });
  const [savingProject, setSavingProject] = useState(false);
  const [capturingThumbnail, setCapturingThumbnail] = useState(false);

  // File upload state for chat
  const [uploading, setUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState<{ url: string; type: string; name: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem("chamba_user_token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
            setView("dashboard");
            fetchClientData(data.user.id);
          }
        })
        .catch(() => localStorage.removeItem("chamba_user_token"));
    }
  }, []);

  // Fetch messages and tasks for the logged-in client
  const fetchClientData = async (userId: string) => {
    const token = localStorage.getItem("chamba_user_token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [msgRes, taskRes, userRes] = await Promise.all([
        fetch(`/api/messages/${userId}`, { headers }),
        fetch(`/api/tasks/${userId}`, { headers }),
        fetch(`/api/auth/me`, { headers }), // refresca info completa con campos proyecto
      ]);
      const msgData = await msgRes.json();
      const taskData = await taskRes.json();
      const userData = await userRes.json();
      
      if (msgData.messages) {
        setChatMessages(msgData.messages.map((m: any) => ({
          id: m.id || m._id,
          sender: m.sender,
          text: m.text,
          fileUrl: m.fileUrl || "",
          fileType: m.fileType || "",
          fileName: m.fileName || "",
          time: m.timestamp,
        })));
      }
      if (taskData.tasks) {
        setClientTasks(taskData.tasks.map((t: any) => ({
          id: t.id || t._id,
          title: t.title,
          description: t.description || "",
          status: t.status,
          priority: t.priority || "media",
          date: t.createdAt,
        })));
      }
      if (userData.user) {
        // Actualizar info de proyecto si viene del backend
        setProjectInfo({
          projectDescription: userData.user.projectDescription || "",
          deployedUrl: userData.user.deployedUrl || "",
          thumbnailUrl: userData.user.thumbnailUrl || "",
          techStack: userData.user.techStack || "",
          githubRepo: userData.user.githubRepo || "",
        });
        // Actualizar user state con campos proyecto
        setUser(prev => prev ? { ...prev, ...userData.user } : null);
      }
    } catch (err) {
      console.warn("Failed to fetch client data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("chamba_user_token", data.token);
        setUser(data.user);
        setView("dashboard");
        fetchClientData(data.user.id);
        window.dispatchEvent(new Event("chamba-auth-change"));
        navigate("/portal", { replace: true });
      } else {
        // Dev / Fallback demo user
        if (email === "demo@chamba.digital" && (password === "demo123456" || password.length >= 4)) {
          const mockUser = {
            id: "demo_user_123",
            name: "Usuario de Prueba WaaS",
            email: "demo@chamba.digital",
            company: "Pacific Surf School",
            plan: "Web Tradicional",
            planPrice: "$49.99/mes",
            subscriptionStatus: "activa",
            projectStatus: "en_produccion"
          };
          localStorage.setItem("chamba_user_token", "mock_demo_jwt_token");
          setUser(mockUser);
          setView("dashboard");
          fetchClientData(mockUser.id);
          window.dispatchEvent(new Event("chamba-auth-change"));
          navigate("/portal", { replace: true });
        } else {
          setErrorMsg(data.error || "Credenciales inválidas.");
        }
      }
    } catch (err: any) {
      console.warn("API request failed, using instant client fallback for demo:", err);
      if (email === "demo@chamba.digital") {
        const mockUser = {
          id: "demo_user_123",
          name: "Usuario de Prueba WaaS",
          email: "demo@chamba.digital",
          company: "Pacific Surf School",
          plan: "Web Tradicional",
          planPrice: "$49.99/mes",
          subscriptionStatus: "activa",
          projectStatus: "en_produccion"
        };
        localStorage.setItem("chamba_user_token", "mock_demo_jwt_token");
        setUser(mockUser);
        setView("dashboard");
        fetchClientData(mockUser.id);
      } else {
        setErrorMsg("Error de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, company, plan })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("chamba_user_token", data.token);
        setUser(data.user);
        setView("dashboard");
        fetchClientData(data.user.id);
        window.dispatchEvent(new Event("chamba-auth-change"));
        navigate("/portal", { replace: true });
      } else {
        setErrorMsg(data.error || "Error al registrar cuenta.");
      }
    } catch (err: any) {
      setErrorMsg("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chamba_user_token");
    setUser(null);
    setView("login");
    window.dispatchEvent(new Event("chamba-auth-change"));
    navigate("/login", { replace: true });
  };

  const saveProjectInfo = async () => {
    const token = localStorage.getItem("chamba_user_token");
    if (!token || token === "mock_demo_jwt_token" || !user) return;
    setSavingProject(true);
    try {
      const res = await fetch(`/api/users/${user.id}/project-info`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          projectDescription: user.projectDescription || "",
          deployedUrl: user.deployedUrl || "",
          thumbnailUrl: user.thumbnailUrl || "",
          techStack: user.techStack || "",
          githubRepo: user.githubRepo || "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        alert("Información de proyecto guardada ✓");
      } else {
        alert(data.error || "Error guardando información");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setSavingProject(false);
    }
  };

  // (chat/tasks/activeTab state is declared at the top of the component to avoid hoisting issues)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const token = localStorage.getItem("chamba_user_token");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: token && token !== "mock_demo_jwt_token" ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.file) {
        setPendingFile(data.file);
      } else {
        alert(data.error || "Error subiendo archivo");
      }
    } catch {
      alert("Error de conexion al subir archivo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() && !pendingFile) return;

    const token = localStorage.getItem("chamba_user_token");
    const fileUrl = pendingFile?.url || "";
    const fileType = pendingFile?.type || "";
    const fileName = pendingFile?.name || "";

    const userMsg: any = {
      id: `m_${Date.now()}`,
      sender: "client",
      text: newMessageText,
      fileUrl,
      fileType,
      fileName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setNewMessageText("");
    setPendingFile(null);

    const taskText = newMessageText.trim() || `[Archivo] ${fileName}`;
    const newTask = {
      id: `t_${Date.now()}`,
      title: taskText.length > 50 ? taskText.slice(0, 50) + "..." : taskText,
      description: taskText,
      status: "backlog",
      priority: "media",
      date: "Ahora"
    };
    setClientTasks(prev => [newTask, ...prev]);

    try {
      if (token && token !== "mock_demo_jwt_token") {
        await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            clientId: user?.id,
            sender: "client",
            text: newMessageText,
            fileUrl,
            fileType,
            fileName,
          }),
        });
      }
    } catch (err) {
      console.warn("Failed to send message to API:", err);
    }

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: `m_reply_${Date.now()}`,
          sender: "admin",
          text: "Solicitud recibida! Se ha generado automaticamente una tarea en el panel Super Admin para que nuestro equipo la ejecute.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleSaveProjectInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProjectInfo();
  };

  const captureThumbnail = async () => {
    const deployedUrl = user?.deployedUrl?.trim();
    if (!deployedUrl) {
      alert("Primero ingresa la URL del sitio desplegado y guarda los cambios.");
      return;
    }
    setCapturingThumbnail(true);
    try {
      const token = localStorage.getItem("chamba_user_token");
      const res = await fetch("/api/capture-thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: deployedUrl }),
      });
      const data = await res.json();
      if (res.ok && data.thumbnailUrl) {
        setUser(prev => prev ? { ...prev, thumbnailUrl: data.thumbnailUrl } : null);
        await saveProjectInfo(); // persist to backend
        alert("¡Miniatura capturada y guardada!");
      } else {
        alert(data.error || "Error capturando miniatura");
      }
    } catch (err: any) {
      alert("Error de conexión: " + err.message);
    } finally {
      setCapturingThumbnail(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-accent selection:text-white min-h-screen flex flex-col">
      <ChambaNavbar />

      <main className={`${view === "dashboard" ? "pt-[60px] pb-12 px-4 sm:px-6" : "pt-[100px] pb-20 px-4 sm:px-6 items-center"} max-w-[1100px] mx-auto w-full flex-grow flex justify-center`}>
        {/* DASHBOARD VISTA CLIENTE */}
        {view === "dashboard" && user ? (
          <div className="w-full space-y-5 sm:space-y-8">
            {/* Header User */}
            <div className="bg-slate-900 text-white p-5 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[28px] shadow-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-6">
              <div className="min-w-0">
                <span className="text-[clamp(9px,2.5vw,11px)] font-black uppercase tracking-[0.2em] text-amber-400 mb-2 block">Portal de Clientes WaaS</span>
                <h1 className="text-[clamp(22px,5vw,36px)] font-black tracking-tight leading-tight">
                  ¡Hola, {user.name}! 👋
                </h1>
                <p className="text-slate-300 text-[clamp(12px,3vw,14px)] mt-1 font-medium truncate">{user.company} · {user.email}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-[clamp(11px,2.5vw,12px)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Cerrar Sesión</span><span className="sm:hidden">Salir</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 gap-3 sm:gap-6 text-[clamp(11px,2.5vw,13px)] font-bold overflow-x-auto custom-scrollbar whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === "overview"
                    ? "border-accent text-accent"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Layers className="w-4 h-4" /> Resumen
              </button>
              <button
                onClick={() => setActiveTab("project")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === "project"
                    ? "border-accent text-accent"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Server className="w-4 h-4" /> Proyecto
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === "requests"
                    ? "border-accent text-accent"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Clock className="w-4 h-4" /> Solicitudes ({clientTasks.length})
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === "chat"
                    ? "border-accent text-accent"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Chat
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Plan Card */}
                  <div className="interactive-card bg-white p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[24px] border border-slate-200 shadow-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(9px,2vw,10px)] font-black uppercase tracking-wider bg-blue-50 text-accent px-3 py-1 rounded-full border border-blue-100">
                        Tu Plan Activo
                      </span>
                      <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-[clamp(18px,4vw,22px)] font-black text-slate-900">{user.plan}</h3>
                      <p className="text-[clamp(12px,2.5vw,14px)] text-emerald-600 font-extrabold mt-0.5">{user.planPrice}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[clamp(11px,2.5vw,12px)]">
                      <span className="text-slate-500 font-medium">Suscripción:</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black text-[clamp(9px,2vw,11px)] uppercase">
                        {user.subscriptionStatus}
                      </span>
                    </div>
                  </div>

                  {/* Railway Server Card */}
                  <div className="interactive-card bg-white p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[24px] border border-slate-200 shadow-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(9px,2vw,10px)] font-black uppercase tracking-wider bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">
                        Infraestructura Railway
                      </span>
                      <Server className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-[clamp(18px,4vw,22px)] font-black text-slate-900">Servidor Cloud</h3>
                      <p className="text-[clamp(11px,2.5vw,13px)] text-slate-500 font-medium mt-0.5">Uptime 99.9% · Host Railway ($5/mes directos)</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[clamp(11px,2.5vw,12px)]">
                      <span className="text-slate-500 font-medium">Servidor:</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black text-[clamp(9px,2vw,11px)] uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping" /> Activo
                      </span>
                    </div>
                  </div>

                  {/* Project Status */}
                  <div className="interactive-card bg-white p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[24px] border border-slate-200 shadow-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(9px,2vw,10px)] font-black uppercase tracking-wider bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                        Estado del Proyecto
                      </span>
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-[clamp(18px,4vw,22px)] font-black text-slate-900 capitalize">{user.projectStatus.replace("_", " ")}</h3>
                      <p className="text-[clamp(11px,2.5vw,13px)] text-slate-500 font-medium mt-0.5">Cambios e iteraciones ilimitadas activas</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[clamp(11px,2.5vw,12px)]">
                      <span className="text-slate-500 font-medium">Iteración WaaS:</span>
                      <span className="text-slate-900 font-bold">Semanal</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Banner */}
                <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-[20px] sm:rounded-[28px] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-[clamp(16px,3.5vw,20px)] font-black">¿Quieres pedir una modificación o nueva funcionalidad?</h3>
                    <p className="text-slate-300 text-[clamp(11px,2.5vw,13px)] font-medium mt-1">Usa nuestro chat integrado para comunicarte directamente con el equipo técnico.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className="bg-accent hover:bg-accent/90 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-[clamp(11px,2.5vw,12px)] uppercase tracking-wider shrink-0 flex items-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto justify-center"
                  >
                    <MessageSquare className="w-4 h-4" /> Abrir Chat de Servicio
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PROJECT INFO */}
            {activeTab === "project" && (
              <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-md">
                <div className="flex justify-between items-start flex-col">
                  <div>
                    <h2 className="text-[clamp(17px,3.5vw,20px)] font-black text-slate-900">Información del Proyecto</h2>
                    <p className="text-[clamp(11px,2.5vw,13px)] text-slate-500">Mantén actualizado el contexto técnico de tu sitio.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProjectInfo} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Descripción del Proyecto</label>
                    <textarea
                      value={user?.projectDescription || ""}
                      onChange={(e) => setUser(prev => prev ? { ...prev, projectDescription: e.target.value } : null)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                      placeholder="Describe tu proyecto: objetivos, funcionalidades clave..."
                    />
                  </div>

                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">URL del Sitio Desplegado</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={user?.deployedUrl || ""}
                        onChange={(e) => setUser(prev => prev ? { ...prev, deployedUrl: e.target.value } : null)}
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                        placeholder="https://tusitio.com"
                      />
                      {user?.deployedUrl && (
                        <button
                          type="button"
                          onClick={captureThumbnail}
                          disabled={capturingThumbnail}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl text-[clamp(11px,2.5vw,12px)] font-bold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
                          title="Capturar miniatura en vivo"
                        >
                          {capturingThumbnail ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <MonitorPlay className="w-4 h-4" />
                              Capturar
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">URL Miniatura / Thumbnail (opcional)</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={user?.thumbnailUrl || ""}
                        onChange={(e) => setUser(prev => prev ? { ...prev, thumbnailUrl: e.target.value } : null)}
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                        placeholder="https://tusitio.com/og-image.jpg"
                      />
                      {user?.thumbnailUrl && (
                        <a
                          href={user.thumbnailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-3 rounded-xl text-[clamp(11px,2.5vw,12px)] font-bold transition-colors cursor-pointer flex items-center gap-2 shrink-0"
                          title="Ver miniatura actual"
                        >
                          <ExternalLink className="w-4 h-4" /> Ver
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Stack Tecnológico</label>
                    <input
                      type="text"
                      value={user?.techStack || ""}
                      onChange={(e) => setUser(prev => prev ? { ...prev, techStack: e.target.value } : null)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                      placeholder="React, Node.js, PostgreSQL, Tailwind..."
                    />
                  </div>

                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Repositorio GitHub (opcional)</label>
                    <input
                      type="url"
                      value={user?.githubRepo || ""}
                      onChange={(e) => setUser(prev => prev ? { ...prev, githubRepo: e.target.value } : null)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                      placeholder="https://github.com/tu-usuario/tu-repo"
                    />
                  </div>

                  {user?.thumbnailUrl && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-[clamp(10px,2vw,11px)] font-bold text-slate-700 mb-2">Vista previa miniatura:</p>
                      <img
                        src={user.thumbnailUrl}
                        alt="Thumbnail"
                        className="max-w-full sm:max-w-xs h-auto rounded-lg border border-slate-200 shadow-sm"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={savingProject}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl text-[clamp(13px,2.5vw,13px)] uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {savingProject ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: REQUESTS / TASKS */}
            {activeTab === "requests" && (
              <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-md">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <h2 className="text-[clamp(17px,3.5vw,20px)] font-black text-slate-900">Historial de Iteraciones & Tareas</h2>
                    <p className="text-[clamp(11px,2.5vw,13px)] text-slate-500">Supervisa el progreso en tiempo real.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-[clamp(11px,2.5vw,12px)] font-bold flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    + Solicitar Cambio
                  </button>
                </div>

                <div className="space-y-3">
                  {clientTasks.map((t) => (
                    <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 sm:gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[clamp(12px,2.5vw,14px)] font-bold text-slate-900">{t.title}</span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                            t.priority === "alta" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                        <p className="text-[clamp(10px,2vw,11px)] text-slate-500 font-medium">Solicitado: {t.date}</p>
                      </div>

                      <div className="shrink-0">
                        {t.status === "completado" ? (
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[clamp(10px,2vw,11px)] font-black uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completado
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[clamp(10px,2vw,11px)] font-black uppercase flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> En Progreso
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LIVE CHAT */}
            {activeTab === "chat" && (
              <div className="bg-white border border-slate-200 rounded-[20px] sm:rounded-[24px] shadow-xl overflow-hidden flex flex-col h-[480px] sm:h-[500px]">
                <div className="bg-slate-900 text-white p-4 px-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-8 sm:w-9 h-8 sm:h-9 bg-accent rounded-full flex items-center justify-center font-black text-white text-[clamp(11px,2vw,13px)]">
                        CD
                      </div>
                      <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full absolute bottom-0 right-0" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[clamp(12px,2.5vw,14px)] leading-tight truncate">Soporte Técnico Chamba Digital</h4>
                      <p className="text-[clamp(10px,2vw,11px)] text-slate-300">Respuesta en menos de 1 hora</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-500/30 shrink-0 hidden sm:block">
                    Canal Directo
                  </span>
                </div>

                <div className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
                  {chatMessages.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "client" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl text-[clamp(12px,2.5vw,13px)] leading-relaxed font-medium shadow-sm ${
                          msg.sender === "client"
                            ? "bg-accent text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                        }`}
                      >
                        {msg.text && <div className="p-3 sm:p-4">{msg.text}</div>}
                        {msg.fileUrl && (
                          <div className={msg.text ? "border-t border-current/10 px-3 sm:px-4 py-2" : "p-3 sm:p-4"}>
                            {msg.fileType?.startsWith("image/") ? (
                              <img src={msg.fileUrl} alt={msg.fileName} className="max-w-[160px] sm:max-w-[200px] max-h-[200px] rounded-lg object-cover cursor-pointer" onClick={() => window.open(msg.fileUrl, "_blank")} />
                            ) : msg.fileType?.startsWith("video/") ? (
                              <video src={msg.fileUrl} controls className="max-w-[160px] sm:max-w-[200px] max-h-[200px] rounded-lg" />
                            ) : msg.fileType?.startsWith("audio/") ? (
                              <audio src={msg.fileUrl} controls className="w-[140px] sm:w-[180px]" />
                            ) : (
                              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 underline ${msg.sender === "client" ? "text-white" : "text-accent"}`}>
                                <File className="w-4 h-4" /> {msg.fileName || "Archivo"}
                              </a>
                            )}
                          </div>
                        )}
                        {!msg.text && !msg.fileUrl && <div className="p-3 sm:p-4">[mensaje vacío]</div>}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {pendingFile && (
                  <div className="px-3 sm:px-4 py-2 bg-accent/5 border-t border-slate-200 flex items-center gap-2">
                    <Paperclip className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[clamp(11px,2.5vw,12px)] text-slate-700 font-medium truncate flex-1">{pendingFile.name}</span>
                    <button type="button" onClick={() => setPendingFile(null)} className="text-red-500 text-[11px] font-bold cursor-pointer shrink-0">x</button>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex gap-2 sm:gap-3 items-center">
                  <input ref={fileInputRef} type="file" accept="image/*,video/*,audio/*,.pdf" className="hidden" onChange={handleFileUpload} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="p-2.5 sm:p-3 text-slate-400 hover:text-accent transition-colors cursor-pointer disabled:opacity-50 shrink-0" title="Adjuntar archivo">
                    {uploading ? <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" /> : <Paperclip className="w-4 h-4" />}
                  </button>
                  <input
                    type="text"
                    placeholder="Escribe tu solicitud..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[clamp(13px,2.5vw,13px)] outline-none focus:border-accent min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={!newMessageText.trim() && !pendingFile}
                    className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-[clamp(12px,2.5vw,13px)] uppercase tracking-wider cursor-pointer transition-all shadow-md shrink-0 disabled:opacity-50"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* VISTA FORMULARIO LOGIN / REGISTRO */
          <div className="w-full max-w-md px-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[28px] shadow-2xl space-y-5 sm:space-y-6">
              <div className="text-center">
                <span className="label-editorial mx-auto">Portal de Clientes WaaS</span>
                <h1 className="text-[clamp(22px,5vw,30px)] font-black tracking-tight text-slate-900">
                  {view === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                </h1>
                <p className="text-slate-500 text-[clamp(12px,2.5vw,13px)] font-medium mt-1">
                  {view === "login" ? "Accede a tu panel y solicita cambios en tu web" : "Únete a nuestro servicio Web as a Service"}
                </p>
              </div>

              {/* Demo user hint */}
              {view === "login" && (
                <div className="bg-blue-50 border border-blue-100 p-3 sm:p-3.5 rounded-xl text-[clamp(11px,2.5vw,12px)] text-slate-700 leading-snug">
                  💡 <strong>Usuario de prueba precargado:</strong><br />
                  Email: <span className="font-mono text-accent font-bold">demo@chamba.digital</span><br />
                  Password: <span className="font-mono text-accent font-bold">demo123456</span>
                </div>
              )}

              {errorMsg && (
                <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-[clamp(11px,2.5vw,12px)] font-bold text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={view === "login" ? handleLogin : handleRegister} className="space-y-4">
                {view === "register" && (
                  <>
                    <div>
                      <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carlos Mendoza"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Empresa / Negocio</label>
                      <input
                        type="text"
                        placeholder="Ej. Pacific Surf School"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Contraseña</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none font-medium"
                  />
                </div>

                {view === "register" && (
                  <div>
                    <label className="block text-[clamp(10px,2vw,11px)] font-extrabold text-slate-700 uppercase mb-1">Selecciona tu Plan WaaS</label>
                    <select
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-[clamp(13px,2.5vw,13px)] text-slate-900 outline-none font-medium"
                    >
                      <option value="Web Tradicional">Web Tradicional ($49.99/mes)</option>
                      <option value="Web App Advanced">Web App Advanced ($99.99/mes)</option>
                      <option value="Web App con IA">Web App con IA ($599.99/mes)</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 sm:py-4 rounded-xl text-[clamp(13px,2.5vw,13px)] uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
                >
                  {loading ? "Procesando..." : view === "login" ? "Ingresar al Panel" : "Crear Cuenta WaaS"}
                </button>
              </form>

              <div className="text-center pt-2">
                {view === "login" ? (
                  <button
                    onClick={() => { setView("register"); setErrorMsg(""); }}
                    className="text-[clamp(11px,2.5vw,12px)] font-bold text-accent hover:underline cursor-pointer"
                  >
                    ¿No tienes cuenta? Regístrate aquí
                  </button>
                ) : (
                  <button
                    onClick={() => { setView("login"); setErrorMsg(""); }}
                    className="text-[clamp(11px,2.5vw,12px)] font-bold text-accent hover:underline cursor-pointer"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
