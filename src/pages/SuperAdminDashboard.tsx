import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Layers, 
  Kanban, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Send, 
  Search, 
  Filter, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  BarChart3, 
  ChevronRight, 
  ChevronLeft,
  Activity,
  UserCheck,
  Building,
  Mail,
  Phone,
  FileText,
  Trash2,
  Edit3,
  Edit,
  ExternalLink,
  Lock,
  LogOut,
  Sparkles,
  Paperclip,
  File,
  Download
} from "lucide-react";
import { useToast } from "../context/ToastContext";

// --- Types ---
export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: "Web Tradicional" | "Web App Advanced" | "Web App con IA";
  price: string;
  subscriptionStatus: "active" | "activa" | "pending" | "canceled" | "cancelada";
  projectStatus: "en_desarrollo" | "en_revision" | "en_produccion" | "pausado";
  railwayStatus: "activo" | "configurando" | "inactivo";
  startDate: string;
  notes: string;
}

export interface TaskItem {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: "backlog" | "en_progreso" | "revision" | "completado";
  priority: "alta" | "media" | "baja";
  createdAt: string;
  requestOrigin?: string;
}

export interface ChatMessage {
  id: string;
  clientId: string;
  sender: "client" | "admin" | "system";
  text: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
  timestamp: string;
}

// --- Initial Mock Data ---
const initialClients: ClientProfile[] = [
  {
    id: "cli_1",
    name: "Carlos Mendoza",
    email: "contacto@pacificsurfschool.pe",
    phone: "+51 987 654 321",
    company: "Pacific Surf School",
    plan: "Web Tradicional",
    price: "$49.99/mes",
    subscriptionStatus: "active",
    projectStatus: "en_produccion",
    railwayStatus: "activo",
    startDate: "2026-06-15",
    notes: "Plataforma de reservas de clases de surf en Miraflores. Dominio pacificsurfschool.com.pe"
  },
  {
    id: "cli_2",
    name: "Dra. Elena Ramos",
    email: "elena@latamabogados.com",
    phone: "+51 912 345 678",
    company: "Latam Abogados",
    plan: "Web App Advanced",
    price: "$99.99/mes",
    subscriptionStatus: "active",
    projectStatus: "en_desarrollo",
    railwayStatus: "activo",
    startDate: "2026-07-01",
    notes: "Web app headless React + API de MailerLite y sistema de consultas legales."
  },
  {
    id: "cli_3",
    name: "Ing. Roberto Silva",
    email: "rsilva@empresaia.com",
    phone: "+51 999 888 777",
    company: "Automations Corp",
    plan: "Web App con IA",
    price: "$599.99/mes",
    subscriptionStatus: "active",
    projectStatus: "en_revision",
    railwayStatus: "activo",
    startDate: "2026-07-10",
    notes: "Integración de agente de IA para calificación de leads y flujo automatizado."
  }
];

const initialTasks: TaskItem[] = [
  {
    id: "task_1",
    clientId: "cli_1",
    title: "Actualizar horarios de clases de verano",
    description: "El cliente solicitó modificar la tabla de horarios en la landing de reservas.",
    status: "completado",
    priority: "media",
    createdAt: "2026-07-20 10:30",
    requestOrigin: "Chat del Cliente"
  },
  {
    id: "task_2",
    clientId: "cli_2",
    title: "Integrar webhook de MailerLite",
    description: "Configurar el endpoint REST API para captar leads del formulario B2B.",
    status: "en_progreso",
    priority: "alta",
    createdAt: "2026-07-25 14:15",
    requestOrigin: "Petición WaaS"
  },
  {
    id: "task_3",
    clientId: "cli_3",
    title: "Ajustar temperatura del modelo de IA",
    description: "Optimizar la respuesta del Asistente a 0.2 para evitar alucinaciones en respuestas técnicas.",
    status: "backlog",
    priority: "alta",
    createdAt: "2026-07-28 09:00",
    requestOrigin: "Feedback del Cliente"
  }
];

const initialMessages: ChatMessage[] = [
  { id: "m1", clientId: "cli_1", sender: "client", text: "Hola equipo de Chamba Digital, quisiéramos cambiar el número de WhatsApp de contacto en la web.", timestamp: "10:15 AM" },
  { id: "m2", clientId: "cli_1", sender: "admin", text: "¡Hola Carlos! Con gusto, procedemos con la actualización dentro de tu plan WaaS.", timestamp: "10:18 AM" },
  { id: "m3", clientId: "cli_2", sender: "client", text: "Buenas tardes, ¿cuándo estará listo el módulo de agendamiento?", timestamp: "02:30 PM" },
];

export default function SuperAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [adminEmailInput, setAdminEmailInput] = useState("admin@chamba.digital");
  const [authError, setAuthError] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Try restore session on mount
  useEffect(() => { restoreAdminSession().then(ok => { if (ok) fetchAdminData(); }); }, []);

  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "kanban" | "chat">("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  // Search and Filter states
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState("todos");

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.plan.toLowerCase().includes(clientSearchQuery.toLowerCase());
    const matchesFilter =
      clientStatusFilter === "todos" ||
      (clientStatusFilter === "active" && (c.subscriptionStatus === "active" || c.subscriptionStatus === "activa")) ||
      c.projectStatus === clientStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const exportClientsCSV = () => {
    const headers = ["ID", "Nombre", "Email", "Empresa", "Plan", "Precio", "Estado Suscripcion", "Estado Proyecto", "Fecha Inicio"];
    const rows = filteredClients.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.company}"`,
      `"${c.plan}"`,
      `"${c.price}"`,
      `"${c.subscriptionStatus}"`,
      `"${c.projectStatus}"`,
      `"${c.startDate}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clientes_chamba_digital_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Listado de clientes exportado a CSV ✓");
  };

  const [selectedClientId, setSelectedClientId] = useState<string>("cli_1");
  const [chatInput, setChatInput] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [editClientData, setEditClientData] = useState<any>(null);
  const [savingClient, setSavingClient] = useState(false);

  // File upload state
  const [adminUploading, setAdminUploading] = useState(false);
  const [adminPendingFile, setAdminPendingFile] = useState<{ url: string; type: string; name: string } | null>(null);
  const adminFileRef = React.useRef<HTMLInputElement>(null);

  // Task modal state (enhanced)
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"alta" | "media" | "baja">("media");
  const [newTaskClientId, setNewTaskClientId] = useState("cli_1");

  // Simple admin token (kept in localStorage) to authenticate against backend endpoints
  const getAdminHeaders = (): HeadersInit => {
    const token = localStorage.getItem("chamba_admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Restore admin session from localStorage
  const restoreAdminSession = async () => {
    const token = localStorage.getItem("chamba_admin_token");
    if (!token) return false;
    try {
      const res = await fetch("/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setAdminEmail(localStorage.getItem("chamba_admin_email") || "");
        return true;
      }
      localStorage.removeItem("chamba_admin_token");
      return false;
    } catch {
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmailInput, password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("chamba_admin_token", data.token);
        localStorage.setItem("chamba_admin_email", data.admin?.email || adminEmailInput);
        setAdminEmail(data.admin?.email || adminEmailInput);
        setIsAuthenticated(true);
        toast.success("¡Bienvenido al Panel Super Admin!");
        await fetchAdminData();
      } else {
        setAuthError(data.error || "Credenciales de administrador incorrectas.");
        toast.error(data.error || "Credenciales incorrectas.");
      }
    } catch {
      setAuthError("Error de conexión al servidor.");
      toast.error("Error de conexión.");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchAdminData = async () => {
    const headers = getAdminHeaders();
    try {
      const [clientsRes, tasksRes] = await Promise.all([
        fetch("/api/admin/clients", { headers }),
        fetch("/api/admin/tasks", { headers }),
      ]);
      const clientsData = await clientsRes.json();
      const tasksData = await tasksRes.json();
      if (clientsData.clients?.length) {
        setClients(
          clientsData.clients.map((u: any) => ({
            id: u._id || u.id,
            name: u.name,
            email: u.email,
            phone: u.phone || "—",
            company: u.company,
            plan: u.plan,
            price: u.planPrice,
            subscriptionStatus: u.subscriptionStatus === "activa" ? "active" : u.subscriptionStatus,
            projectStatus: u.projectStatus || "en_desarrollo",
            railwayStatus: "activo",
            startDate: u.createdAt ? String(u.createdAt).slice(0, 10) : "—",
            notes: u.projectDescription || "Cliente WaaS activo",
            // Project fields
            projectDescription: u.projectDescription,
            deployedUrl: u.deployedUrl,
            thumbnailUrl: u.thumbnailUrl,
            techStack: u.techStack,
            githubRepo: u.githubRepo,
            lastDeployedAt: u.lastDeployedAt,
          }))
        );
      }
      if (tasksData.tasks?.length) {
        setTasks(
          tasksData.tasks.map((t: any) => ({
            id: t._id || t.id,
            clientId: t.clientId,
            title: t.title,
            description: t.description,
            status: t.status,
            priority: t.priority,
            createdAt: t.createdAt,
            requestOrigin: t.requestOrigin,
          }))
        );
      }
    } catch (err) {
      console.warn("Admin fetch failed, using mock data:", err);
    }
  };

  // Fetch messages for selected client
  const fetchClientMessages = async (clientId: string) => {
    const headers = getAdminHeaders();
    try {
      const res = await fetch(`/api/messages/${clientId}`, { headers });
      const data = await res.json();
      if (data.messages?.length) {
        const fetched: ChatMessage[] = data.messages.map((m: any) => ({
          id: m._id || m.id,
          clientId: m.clientId,
          sender: m.sender,
          text: m.text,
          fileUrl: m.fileUrl || "",
          fileType: m.fileType || "",
          fileName: m.fileName || "",
          timestamp: m.timestamp,
        }));
        setMessages((prev) => {
          const ids = new Set(prev.map((p) => p.id));
          const merged = [...prev];
          fetched.forEach((m) => { if (!ids.has(m.id)) merged.push(m); });
          return merged;
        });
      }
    } catch (err) {
      console.warn("Failed to fetch client messages:", err);
    }
};

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const clientMessages = messages.filter(m => m.clientId === selectedClientId);

  // Fetch messages when selected client changes
  useEffect(() => {
    if (isAuthenticated && selectedClientId) {
      fetchClientMessages(selectedClientId);
    }
  }, [selectedClientId, isAuthenticated]);

  const handleAdminFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAdminUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: getAdminHeaders(),
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.file) {
        setAdminPendingFile(data.file);
        toast.success("Archivo adjuntado ✓");
      } else {
        toast.error(data.error || "Error subiendo archivo");
      }
    } catch {
      toast.error("Error de conexión al subir archivo");
    } finally {
      setAdminUploading(false);
      if (adminFileRef.current) adminFileRef.current.value = "";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() && !adminPendingFile) return;

    const fileUrl = adminPendingFile?.url || "";
    const fileType = adminPendingFile?.type || "";
    const fileName = adminPendingFile?.name || "";

    const newMsg: any = {
      id: `msg_${Date.now()}`,
      clientId: selectedClientId,
      sender: "admin",
      text: chatInput,
      fileUrl,
      fileType,
      fileName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setChatInput("");
    setAdminPendingFile(null);

    const headers = getAdminHeaders();
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          clientId: selectedClientId,
          sender: "admin",
          text: chatInput,
          fileUrl,
          fileType,
          fileName,
        }),
      });
    } catch (err) {
      console.warn("Failed to send admin message to API:", err);
    }
  };

  const handleCreateTaskFromChat = async (text: string) => {
    const title = text.slice(0, 45) + (text.length > 45 ? "..." : "");
    // Optimistic local insert
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      clientId: selectedClientId,
      title,
      description: text,
      status: "backlog",
      priority: "media",
      createdAt: new Date().toLocaleString(),
      requestOrigin: "Convertido desde Chat"
    };
    setTasks([...tasks, newTask]);
    setActiveTab("kanban");

    // Persist to backend
    const headers = getAdminHeaders();
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          clientId: selectedClientId,
          title,
          description: text,
        }),
      });
    } catch (err) {
      console.warn("Failed to create task on backend:", err);
    }
  };

  const handleMoveTaskStatus = async (taskId: string, newStatus: TaskItem["status"]) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    const headers = getAdminHeaders();
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.warn("Failed to update task status on backend:", err);
    }
  };

  const openEditClientModal = (client: ClientProfile) => {
    setEditClientData({ ...client });
    setShowEditClientModal(true);
  };

  const saveEditClient = async () => {
    if (!editClientData) return;
    setSavingClient(true);
    const headers = getAdminHeaders();
    try {
      const res = await fetch(`/api/admin/clients/${editClientData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(editClientData),
      });
      const data = await res.json();
      if (res.ok && data.client) {
        setClients(clients.map(c => c.id === editClientData.id ? data.client : c));
        setShowEditClientModal(false);
        setEditClientData(null);
        toast.success("Cliente actualizado ✓");
      } else {
        toast.error(data.error || "Error actualizando cliente");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de conexión");
    } finally {
      setSavingClient(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-[28px] max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-[26px] font-black tracking-tight mb-2">Panel Super Admin</h1>
          <p className="text-slate-400 text-[13px] mb-8 font-medium">Acceso restringido para el equipo de Chamba.Digital</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email admin..."
              value={adminEmailInput}
              onChange={(e) => setAdminEmailInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3.5 text-[14px] text-white outline-none transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Contrasena de acceso..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3.5 text-[14px] text-white outline-none transition-colors"
              required
            />
            {authError && <p className="text-red-400 text-[11px] font-bold">{authError}</p>}
            <button type="submit" disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl text-[13px] uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-50">
              {authLoading ? "Verificando..." : "Ingresar al Dashboard"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 bg-blue-600 text-white rounded-xl font-black text-[clamp(11px,2vw,14px)] shrink-0">CD</div>
          <div className="min-w-0">
            <h1 className="text-[clamp(13px,3vw,16px)] font-black text-white flex items-center gap-2">
              <span className="truncate">Chamba.Digital</span> <span className="text-[clamp(8px,1.5vw,10px)] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30 hidden sm:inline-block">Super Admin WaaS</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="text-[clamp(10px,2vw,12px)] text-slate-400 font-medium hidden md:inline-block">{adminEmail || "admin@chamba.digital"}</span>
          <button onClick={() => { localStorage.removeItem("chamba_admin_token"); localStorage.removeItem("chamba_admin_email"); setIsAuthenticated(false); setAdminEmail(""); }} className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer" title="Cerrar sesión">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside
          className={`w-full ${
            isSidebarCollapsed ? "md:w-20" : "md:w-64"
          } bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-3 sm:p-4 flex md:flex-col md:space-y-2 gap-2 overflow-x-auto custom-scrollbar transition-all duration-300 relative shrink-0`}
        >
          {/* Toggle button for collapse (Desktop) */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex items-center justify-between p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mb-1 cursor-pointer border border-slate-700/50 w-full"
            title={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {!isSidebarCollapsed && (
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
                Menú
              </span>
            )}
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 mx-auto text-blue-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {[
            { id: "overview", label: "Resumen General", icon: Activity },
            { id: "clients", label: "Clientes & Suscripciones", icon: Users },
            { id: "kanban", label: "Tablero Kanban Tareas", icon: Kanban },
            { id: "chat", label: "Chat & Peticiones", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              title={tab.label}
              className={`flex items-center ${
                isSidebarCollapsed ? "md:justify-center px-3" : "gap-3 px-4"
              } py-3 rounded-xl font-extrabold text-[clamp(12px,2.5vw,13px)] transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </>
              )}
            </button>
          ))}
        </aside>

        {/* Dynamic Content */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-[clamp(20px,4vw,26px)] font-black text-white tracking-tight">Panel General WaaS</h2>
                <p className="text-slate-400 text-[clamp(12px,2.5vw,14px)]">Monitoreo de suscripciones Polar.sh y estado de servidores en Railway.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[clamp(9px,2vw,11px)] font-extrabold text-slate-400 uppercase tracking-wider">Ingresos Mensuales</span>
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[clamp(22px,5vw,32px)] font-black text-white">$749.97</span>
                  <p className="text-[clamp(10px,2vw,11px)] text-emerald-400 mt-1 font-bold">+100% cobro vía Polar.sh</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[clamp(9px,2vw,11px)] font-extrabold text-slate-400 uppercase tracking-wider">Clientes Activos</span>
                    <UserCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[clamp(22px,5vw,32px)] font-black text-white">{clients.length}</span>
                  <p className="text-[clamp(10px,2vw,11px)] text-slate-400 mt-1 font-bold">100% Retención este mes</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[clamp(9px,2vw,11px)] font-extrabold text-slate-400 uppercase tracking-wider">Hosting Railway</span>
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[clamp(18px,4vw,28px)] font-black text-white">3 Servidores</span>
                  <p className="text-[clamp(10px,2vw,11px)] text-amber-400 mt-1 font-bold">99.9% Uptime ($5/mes)</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[clamp(9px,2vw,11px)] font-extrabold text-slate-400 uppercase tracking-wider">Tareas Pendientes</span>
                    <Kanban className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-[clamp(22px,5vw,32px)] font-black text-white">{tasks.filter(t => t.status !== "completado").length}</span>
                  <p className="text-[clamp(10px,2vw,11px)] text-purple-400 mt-1 font-bold">En flujo de trabajo WaaS</p>
                </div>
              </div>

              {/* Recent Clients Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
                <h3 className="text-[clamp(15px,3vw,18px)] font-black text-white mb-4 sm:mb-6">Suscripciones Recientes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[clamp(11px,2.5vw,13px)] whitespace-nowrap">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[clamp(9px,2vw,11px)]">
                      <tr>
                        <th className="py-3 px-2 sm:px-4">Cliente / Empresa</th>
                        <th className="py-3 px-2 sm:px-4">Plan WaaS</th>
                        <th className="py-3 px-2 sm:px-4">Suscripción</th>
                        <th className="py-3 px-2 sm:px-4">Proyecto</th>
                        <th className="py-3 px-2 sm:px-4">Railway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {clients.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-2 sm:px-4 font-bold text-white">
                            <div className="truncate max-w-[120px] sm:max-w-none">{c.name}</div>
                            <div className="text-[clamp(9px,2vw,11px)] text-slate-400 font-normal">{c.company}</div>
                          </td>
                          <td className="py-4 px-2 sm:px-4 font-extrabold text-blue-400">{c.plan} ({c.price})</td>
                          <td className="py-4 px-2 sm:px-4">
                            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[clamp(9px,2vw,11px)] font-black border border-emerald-500/30">
                              Activa
                            </span>
                          </td>
                          <td className="py-4 px-2 sm:px-4 font-semibold text-slate-300 capitalize">{(c.projectStatus || "en_desarrollo").replace(/_/g, " ")}</td>
                          <td className="py-4 px-2 sm:px-4 text-emerald-400 font-mono text-[clamp(9px,2vw,11px)]">{c.railwayStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLIENTS & SUBSCRIPTIONS */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-[clamp(20px,4vw,26px)] font-black text-white tracking-tight">Perfiles de Clientes</h2>
                  <p className="text-slate-400 text-[clamp(12px,2.5vw,14px)]">Gestión de planes WaaS, estado del proyecto y Railway.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, email, plan..."
                      value={clientSearchQuery}
                      onChange={(e) => setClientSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                  <select
                    value={clientStatusFilter}
                    onChange={(e) => setClientStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="todos">Todos los Estados</option>
                    <option value="active">Suscripción Activa</option>
                    <option value="en_produccion">En Producción</option>
                    <option value="en_desarrollo">En Desarrollo</option>
                    <option value="pausado">Pausado</option>
                  </select>
                  <button
                    onClick={exportClientsCSV}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" /> Exportar CSV
                  </button>
                </div>
              </div>

              {filteredClients.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 font-medium">
                  No se encontraron clientes que coincidan con la búsqueda.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredClients.map((c) => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[clamp(9px,2vw,10px)] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                          {c.plan}
                        </span>
                        <span className="text-emerald-400 font-bold text-[clamp(12px,2.5vw,14px)]">{c.price}</span>
                      </div>
                      <h3 className="text-[clamp(16px,3vw,18px)] font-black text-white">{c.name}</h3>
                      <p className="text-[clamp(11px,2vw,12px)] font-bold text-slate-400 mb-4">{c.company}</p>

                      <div className="space-y-2 text-[clamp(11px,2vw,12px)] text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <div className="flex flex-wrap items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" /> <span className="truncate">{c.email || "N/A"}</span></div>
                        <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {c.phone || "N/A"}</div>
                        <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {c.railwayStatus || "Activo"}</div>
                      </div>

                      <p className="text-[clamp(11px,2vw,12px)] text-slate-400 italic mt-3 leading-relaxed line-clamp-2">{c.notes || ""}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedClientId(c.id);
                          setActiveTab("chat");
                        }}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-[clamp(11px,2.5vw,12px)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-400" /> Abrir Chat
                      </button>
                      <button
                        onClick={() => openEditClientModal(c)}
                        className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-[clamp(11px,2.5vw,12px)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" /> Editar Cliente
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {/* TAB 3: KANBAN BOARD */}
          {activeTab === "kanban" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-[clamp(20px,4vw,26px)] font-black text-white tracking-tight">Tablero Kanban WaaS</h2>
                  <p className="text-slate-400 text-[clamp(12px,2.5vw,14px)]">Flujo de trabajo e iteraciones por suscripción.</p>
                </div>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black px-4 py-2.5 rounded-xl text-[clamp(11px,2.5vw,12px)] uppercase tracking-wider flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" /> Nueva Tarea
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto">
                {[
                  { id: "backlog", title: "Backlog / Pendientes", color: "border-slate-700" },
                  { id: "en_progreso", title: "En Progreso", color: "border-blue-500" },
                  { id: "revision", title: "En Revisión", color: "border-amber-500" },
                  { id: "completado", title: "Completado", color: "border-emerald-500" },
                ].map((col) => (
                  <div key={col.id} className={`bg-slate-900/80 border-t-4 ${col.color} border-slate-800 p-3 sm:p-4 rounded-2xl min-h-[300px] sm:min-h-[500px] flex flex-col space-y-3 sm:space-y-4 min-w-[240px]`}>
                    <h3 className="text-[clamp(12px,2.5vw,14px)] font-black text-white uppercase tracking-wider flex items-center justify-between">
                      <span>{col.title}</span>
                      <span className="bg-slate-800 text-slate-400 text-[clamp(10px,2vw,11px)] px-2 py-0.5 rounded-full">
                        {tasks.filter(t => t.status === col.id).length}
                      </span>
                    </h3>

                    <div className="space-y-3 flex-grow">
                      {tasks.filter(t => t.status === col.id).map((task) => {
                        const clientObj = clients.find(c => c.id === task.clientId);
                        const priorityColor = task.priority === "alta" ? "text-red-400 bg-red-500/10" : task.priority === "baja" ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10";
                        return (
                          <div key={task.id} className="bg-slate-950 border border-slate-800 p-3 sm:p-4 rounded-xl space-y-2 hover:border-slate-700 transition-all shadow-md">
                            <div className="flex items-center justify-between">
                              <span className="text-[clamp(9px,2vw,10px)] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                                {clientObj?.company || "Cliente"}
                              </span>
                              <span className={`text-[clamp(9px,2vw,10px)] font-bold px-2 py-0.5 rounded-full ${priorityColor}`}>
                                {task.priority}
                              </span>
                            </div>
                            <h4 className="text-[clamp(12px,2.5vw,13px)] font-black text-white leading-tight">{task.title}</h4>
                            <p className="text-[clamp(10px,2vw,11px)] text-slate-400 leading-relaxed">{task.description}</p>
                            
                            {/* Move controls + Delete */}
                            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[clamp(9px,2vw,10px)]">
                              <span className="text-slate-500 truncate max-w-[80px]">{task.createdAt}</span>
                              <div className="flex items-center gap-2">
                                <select
                                  value={task.status}
                                  onChange={(e) => handleMoveTaskStatus(task.id, e.target.value as any)}
                                  className="bg-slate-900 border border-slate-700 text-slate-300 rounded px-1.5 py-0.5 outline-none text-[clamp(9px,2vw,10px)] cursor-pointer"
                                >
                                  <option value="backlog">Backlog</option>
                                  <option value="en_progreso">En Progreso</option>
                                  <option value="revision">Revision</option>
                                  <option value="completado">Completado</option>
                                </select>
                                <button
                                  onClick={() => {
                                    setTasks(tasks.filter(t => t.id !== task.id));
                                  }}
                                  className="text-red-500/50 hover:text-red-400 transition-colors cursor-pointer"
                                  title="Eliminar tarea"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CHAT & REQUESTS */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[600px] sm:h-[750px]">
              {/* Clients Sidebar */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 overflow-y-auto custom-scrollbar lg:max-h-full max-h-[150px] lg:max-h-none">
                <h3 className="text-[clamp(12px,2.5vw,14px)] font-black text-white uppercase tracking-wider mb-2 hidden lg:block">Peticiones de Clientes</h3>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClientId(c.id)}
                    className={`text-left p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between shrink-0 lg:w-full ${
                      selectedClientId === c.id ? "bg-blue-600 text-white shadow-lg" : "bg-slate-950/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold text-[clamp(11px,2.5vw,13px)]">{c.name}</div>
                      <div className="text-[clamp(9px,2vw,11px)] opacity-80 hidden sm:block">{c.company}</div>
                    </div>
                    <span className="text-[clamp(8px,1.5vw,10px)] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 shrink-0 ml-2">
                      {c.plan.split(" ")[0]}
                    </span>
                  </button>
                ))}
                </div>
              </div>

              {/* Chat View */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-4 mb-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="min-w-0">
                      <h3 className="text-[clamp(14px,3vw,18px)] font-black text-white truncate">{selectedClient.name} ({selectedClient.company})</h3>
                      <p className="text-[clamp(10px,2vw,12px)] text-blue-400 font-bold">Plan {selectedClient.plan} — {selectedClient.price}</p>
                    </div>
                    <span className="text-[clamp(9px,2vw,11px)] bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
                      Suscripción Activa
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="space-y-4 max-h-[300px] sm:max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                    {clientMessages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
                        <div className={`p-3 sm:p-4 rounded-2xl max-w-[85%] sm:max-w-[80%] text-[clamp(11px,2.5vw,13px)] leading-relaxed ${
                          msg.sender === "admin" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none"
                        }`}>
                          {msg.text && <p>{msg.text}</p>}
                          {(msg as any).fileUrl && (msg as any).fileType?.startsWith("image") && (
                            <a href={(msg as any).fileUrl} target="_blank" rel="noopener noreferrer" className="block mt-2">
                              <img src={(msg as any).fileUrl} alt={(msg as any).fileName || "image"} className="max-w-[200px] sm:max-w-[280px] max-h-[200px] rounded-lg object-cover" />
                            </a>
                          )}
                          {(msg as any).fileUrl && (msg as any).fileType?.startsWith("video") && (
                            <video src={(msg as any).fileUrl} controls className="max-w-[200px] sm:max-w-[280px] max-h-[200px] rounded-lg mt-2" />
                          )}
                          {(msg as any).fileUrl && (msg as any).fileType?.startsWith("audio") && (
                            <audio src={(msg as any).fileUrl} controls className="w-full mt-2" />
                          )}
                          {(msg as any).fileUrl && !(msg as any).fileType?.startsWith("image") && !(msg as any).fileType?.startsWith("video") && !(msg as any).fileType?.startsWith("audio") && (
                            <a href={(msg as any).fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-2 text-blue-300 hover:underline text-[clamp(10px,2vw,12px)]">
                              <File className="w-4 h-4" /> {(msg as any).fileName || "Archivo adjunto"}
                            </a>
                          )}
                          {msg.sender === "client" && (
                            <button
                              onClick={() => handleCreateTaskFromChat(msg.text)}
                              className="mt-3 flex items-center gap-1.5 text-[clamp(9px,2vw,10px)] font-bold text-amber-400 hover:underline bg-amber-400/10 px-2 py-1 rounded-md"
                            >
                              <Plus className="w-3 h-3" /> Crear Tarea
                            </button>
                          )}
                        </div>
                        <span className="text-[clamp(9px,2vw,10px)] text-slate-500 mt-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                  {adminPendingFile && (
                    <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[clamp(11px,2.5vw,12px)] text-slate-300">
                      <Paperclip className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate flex-1">{adminPendingFile.name}</span>
                      <button type="button" onClick={() => setAdminPendingFile(null)} className="text-red-400 hover:text-red-300 font-bold cursor-pointer shrink-0">x</button>
                    </div>
                  )}
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      ref={adminFileRef}
                      type="file"
                      accept="image/*,video/*,audio/*,.pdf"
                      onChange={handleAdminFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => adminFileRef.current?.click()}
                      disabled={adminUploading}
                      className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 sm:p-3 rounded-xl cursor-pointer disabled:opacity-50 shrink-0"
                      title="Adjuntar archivo"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      placeholder="Escribe una respuesta o instruccion WaaS..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-grow bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[clamp(12px,2.5vw,13px)] text-white outline-none min-w-0"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 cursor-pointer shrink-0">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Enhanced Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-[18px] font-black text-white">Nueva Tarea WaaS</h3>
            <input
              type="text"
              placeholder="Titulo de la tarea..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[13px] text-white outline-none"
            />
            <textarea
              placeholder="Descripcion (opcional)..."
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[13px] text-white outline-none resize-none"
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prioridad</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "alta" | "media" | "baja")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[13px] text-white outline-none mt-1 cursor-pointer"
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cliente</label>
                <select
                  value={newTaskClientId}
                  onChange={(e) => setNewTaskClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[13px] text-white outline-none mt-1 cursor-pointer"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowTaskModal(false); setNewTaskTitle(""); setNewTaskDescription(""); }} className="text-slate-400 hover:text-white text-[12px] font-bold px-4 py-2 cursor-pointer">Cancelar</button>
              <button
                onClick={() => {
                  if (newTaskTitle.trim()) {
                    const task: TaskItem = {
                      id: `task_${Date.now()}`,
                      clientId: newTaskClientId,
                      title: newTaskTitle,
                      description: newTaskDescription || "Tarea creada desde el Dashboard Super Admin.",
                      status: "backlog",
                      priority: newTaskPriority,
                      createdAt: new Date().toLocaleString()
                    };
                    setTasks([...tasks, task]);
                    setNewTaskTitle("");
                    setNewTaskDescription("");
                    setShowTaskModal(false);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-[12px] cursor-pointer"
              >
                Crear Tarea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditClientModal && editClientData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-[18px] font-black text-white">Editar Cliente</h3>
            {editClientData.thumbnailUrl && (
              <img src={editClientData.thumbnailUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Nombre</label>
                <input type="text" value={editClientData.name} onChange={(e) => setEditClientData({ ...editClientData, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Empresa</label>
                <input type="text" value={editClientData.company} onChange={(e) => setEditClientData({ ...editClientData, company: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
                <input type="email" value={editClientData.email} onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Telefono</label>
                <input type="tel" value={editClientData.phone || ""} onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Plan</label>
                <select value={editClientData.plan} onChange={(e) => setEditClientData({ ...editClientData, plan: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1 cursor-pointer">
                  <option value="Landing Page">Landing Page</option>
                  <option value="Business">Business</option>
                  <option value="Elite + IA">Elite + IA</option>
                  <option value="Plan Hoteles">Plan Hoteles</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Precio</label>
                <input type="text" value={editClientData.price} onChange={(e) => setEditClientData({ ...editClientData, price: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Estado del Proyecto</label>
                <select value={editClientData.projectStatus || "pendiente"} onChange={(e) => setEditClientData({ ...editClientData, projectStatus: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1 cursor-pointer">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En Progreso</option>
                  <option value="completado">Completado</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">URL Desplegue</label>
                <input type="url" value={editClientData.deployedUrl || ""} onChange={(e) => setEditClientData({ ...editClientData, deployedUrl: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">URL Thumbnail</label>
              <input type="url" value={editClientData.thumbnailUrl || ""} onChange={(e) => setEditClientData({ ...editClientData, thumbnailUrl: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1" placeholder="https://..." />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Descripcion del Proyecto</label>
              <textarea value={editClientData.projectDescription || ""} onChange={(e) => setEditClientData({ ...editClientData, projectDescription: e.target.value })} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[13px] text-white outline-none mt-1 resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowEditClientModal(false); setEditClientData(null); }} className="text-slate-400 hover:text-white text-[12px] font-bold px-4 py-2 cursor-pointer">Cancelar</button>
              <button
                onClick={saveEditClient}
                disabled={savingClient}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-[12px] disabled:opacity-50 cursor-pointer"
              >
                {savingClient ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
