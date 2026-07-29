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
  Sparkles
} from "lucide-react";

// --- Types ---
export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: "Web Tradicional" | "Web App Advanced" | "Web App con IA";
  price: string;
  subscriptionStatus: "active" | "pending" | "canceled";
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
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "clients" | "kanban" | "chat">("overview");
  const [clients, setClients] = useState<ClientProfile[]>(initialClients);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const [selectedClientId, setSelectedClientId] = useState<string>("cli_1");
  const [chatInput, setChatInput] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [editClientData, setEditClientData] = useState<any>(null);
  const [savingClient, setSavingClient] = useState(false);

  // Simple admin token (kept in localStorage) to authenticate against backend endpoints
  const getAdminHeaders = (): HeadersInit => {
    const token = localStorage.getItem("chamba_admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch admin token from /api/auth/login (re-uses demo credentials) or fallback
  const ensureAdminToken = async (): Promise<string | null> => {
    const existing = localStorage.getItem("chamba_admin_token");
    if (existing) return existing;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@chamba.digital", password: "demo123456" }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("chamba_admin_token", data.token);
        return data.token;
      }
    } catch {
      // ignore network errors
    }
    return null;
  };

  const fetchAdminData = async () => {
    await ensureAdminToken();
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
            projectStatus: u.projectStatus,
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

  // Simple Auth Check (Password: chamba2026)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "chamba2026" || passwordInput === "admin") {
      setIsAuthenticated(true);
      setAuthError(false);
      fetchAdminData();
    } else {
      setAuthError(true);
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      clientId: selectedClientId,
      sender: "admin",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setChatInput("");

    // Send to backend
    const headers = getAdminHeaders();
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          clientId: selectedClientId,
          sender: "admin",
          text: chatInput,
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

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    setSavingClient(true);
    const headers = getAdminHeaders();
    try {
      const res = await fetch(`/api/admin/clients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(editingClient),
      });
      const data = await res.json();
      if (res.ok && data.client) {
        setClients(clients.map(c => c.id === editingClient.id ? data.client : c));
        setShowEditClientModal(false);
        setEditingClient(null);
        alert("Cliente actualizado ✓");
      } else {
        alert(data.error || "Error actualizando cliente");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setSavingClient(false);
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
        alert("Cliente actualizado ✓");
      } else {
        alert(data.error || "Error actualizando cliente");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
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
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Contraseña de acceso..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3.5 text-[14px] text-white outline-none transition-colors"
              />
              {authError && <p className="text-red-400 text-[11px] mt-2 font-bold">Contraseña incorrecta. Inténtalo de nuevo.</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 rounded-xl text-[13px] uppercase tracking-wider transition-all shadow-lg cursor-pointer">
              Ingresar al Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-xl font-black text-sm">CD</div>
          <div>
            <h1 className="text-[16px] font-black text-white flex items-center gap-2">
              Chamba.Digital <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">Super Admin WaaS</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-slate-400 font-medium hidden sm:inline-block">chambadigital2019@gmail.com</span>
          <button onClick={() => setIsAuthenticated(false)} className="p-2 text-slate-400 hover:text-white transition-colors" title="Cerrar sesión">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2">
          {[
            { id: "overview", label: "Resumen General", icon: Activity },
            { id: "clients", label: "Clientes & Suscripciones", icon: Users },
            { id: "kanban", label: "Tablero Kanban Tareas", icon: Kanban },
            { id: "chat", label: "Chat & Peticiones", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Dynamic Content */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[26px] font-black text-white tracking-tight">Panel General WaaS</h2>
                <p className="text-slate-400 text-[14px]">Monitoreo de suscripciones Polar.sh y estado de servidores en Railway.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Ingresos Mensuales</span>
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[32px] font-black text-white">$749.97</span>
                  <p className="text-[11px] text-emerald-400 mt-1 font-bold">+100% cobro vía Polar.sh</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Clientes Activos</span>
                    <UserCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[32px] font-black text-white">{clients.length}</span>
                  <p className="text-[11px] text-slate-400 mt-1 font-bold">100% Retención este mes</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Hosting Railway</span>
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[32px] font-black text-white">3 Servidores</span>
                  <p className="text-[11px] text-amber-400 mt-1 font-bold">99.9% Uptime ($5/mes por cliente)</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Tareas Pendientes</span>
                    <Kanban className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-[32px] font-black text-white">{tasks.filter(t => t.status !== "completado").length}</span>
                  <p className="text-[11px] text-purple-400 mt-1 font-bold">En flujo de trabajo WaaS</p>
                </div>
              </div>

              {/* Recent Clients Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-[18px] font-black text-white mb-6">Suscripciones Recientes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Cliente / Empresa</th>
                        <th className="py-3 px-4">Plan WaaS</th>
                        <th className="py-3 px-4">Suscripción</th>
                        <th className="py-3 px-4">Proyecto</th>
                        <th className="py-3 px-4">Railway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {clients.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-4 font-bold text-white">
                            <div>{c.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{c.company}</div>
                          </td>
                          <td className="py-4 px-4 font-extrabold text-blue-400">{c.plan} ({c.price})</td>
                          <td className="py-4 px-4">
                            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-black border border-emerald-500/30">
                              Activa
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-300 capitalize">{c.projectStatus.replace("_", " ")}</td>
                          <td className="py-4 px-4 text-emerald-400 font-mono text-[11px]">{c.railwayStatus}</td>
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
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-[26px] font-black text-white tracking-tight">Perfiles de Clientes</h2>
                  <p className="text-slate-400 text-[14px]">Gestión de planes WaaS, estado del proyecto y Railway.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {clients.map((c) => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                          {c.plan}
                        </span>
                        <span className="text-emerald-400 font-bold text-[14px]">{c.price}</span>
                      </div>
                      <h3 className="text-[18px] font-black text-white">{c.name}</h3>
                      <p className="text-[12px] font-bold text-slate-400 mb-4">{c.company}</p>

                      <div className="space-y-2 text-[12px] text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-500" /> {c.email}</div>
                        <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-500" /> {c.phone}</div>
                        <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-emerald-400" /> Railway: {c.railwayStatus}</div>
                      </div>

                      <p className="text-[12px] text-slate-400 italic mt-3 leading-relaxed">{c.notes}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedClientId(c.id);
                        setActiveTab("chat");
                      }}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-[12px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-400" /> Abrir Chat de Peticiones
                    </button>
                    <button
                      onClick={() => openEditClientModal(c)}
                      className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-[12px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" /> Editar Cliente
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KANBAN BOARD */}
          {activeTab === "kanban" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-[26px] font-black text-white tracking-tight">Tablero Kanban WaaS</h2>
                  <p className="text-slate-400 text-[14px]">Flujo de trabajo e iteraciones por suscripción.</p>
                </div>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black px-4 py-2.5 rounded-xl text-[12px] uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Nueva Tarea
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { id: "backlog", title: "Backlog / Pendientes", color: "border-slate-700" },
                  { id: "en_progreso", title: "En Progreso", color: "border-blue-500" },
                  { id: "revision", title: "En Revisión", color: "border-amber-500" },
                  { id: "completado", title: "Completado", color: "border-emerald-500" },
                ].map((col) => (
                  <div key={col.id} className={`bg-slate-900/80 border-t-4 ${col.color} border-slate-800 p-4 rounded-2xl min-h-[500px] flex flex-col space-y-4`}>
                    <h3 className="text-[14px] font-black text-white uppercase tracking-wider flex items-center justify-between">
                      <span>{col.title}</span>
                      <span className="bg-slate-800 text-slate-400 text-[11px] px-2 py-0.5 rounded-full">
                        {tasks.filter(t => t.status === col.id).length}
                      </span>
                    </h3>

                    <div className="space-y-3 flex-grow">
                      {tasks.filter(t => t.status === col.id).map((task) => {
                        const clientObj = clients.find(c => c.id === task.clientId);
                        return (
                          <div key={task.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 hover:border-slate-700 transition-all shadow-md">
                            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                              {clientObj?.company || "Cliente"}
                            </span>
                            <h4 className="text-[13px] font-black text-white leading-tight">{task.title}</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">{task.description}</p>
                            
                            {/* Move controls */}
                            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                              <span className="text-slate-500">{task.createdAt}</span>
                              <select
                                value={task.status}
                                onChange={(e) => handleMoveTaskStatus(task.id, e.target.value as any)}
                                className="bg-slate-900 border border-slate-700 text-slate-300 rounded px-1.5 py-0.5 outline-none text-[10px]"
                              >
                                <option value="backlog">Backlog</option>
                                <option value="en_progreso">En Progreso</option>
                                <option value="revision">Revisión</option>
                                <option value="completado">Completado</option>
                              </select>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[750px]">
              {/* Clients Sidebar */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h3 className="text-[14px] font-black text-white uppercase tracking-wider mb-2">Peticiones de Clientes</h3>
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClientId(c.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      selectedClientId === c.id ? "bg-blue-600 text-white shadow-lg" : "bg-slate-950/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-[13px]">{c.name}</div>
                      <div className="text-[11px] opacity-80">{c.company}</div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10">
                      {c.plan.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Chat View */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-800 pb-4 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-[18px] font-black text-white">{selectedClient.name} ({selectedClient.company})</h3>
                      <p className="text-[12px] text-blue-400 font-bold">Plan {selectedClient.plan} — {selectedClient.price}</p>
                    </div>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                      Suscripción Activa
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                    {clientMessages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
                        <div className={`p-4 rounded-2xl max-w-[80%] text-[13px] leading-relaxed ${
                          msg.sender === "admin" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none"
                        }`}>
                          {msg.text}
                          {msg.sender === "client" && (
                            <button
                              onClick={() => handleCreateTaskFromChat(msg.text)}
                              className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-amber-400 hover:underline bg-amber-400/10 px-2 py-1 rounded-md"
                            >
                              <Plus className="w-3 h-3" /> Crear Tarea Kanban de esta Petición
                            </button>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-slate-800 flex gap-3">
                  <input
                    type="text"
                    placeholder="Escribe una respuesta o instrucción WaaS..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-[13px] text-white outline-none"
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Simple Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-[18px] font-black text-white">Nueva Tarea WaaS</h3>
            <input
              type="text"
              placeholder="Título de la tarea..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[13px] text-white outline-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white text-[12px] font-bold px-4 py-2">Cancelar</button>
              <button
                onClick={() => {
                  if (newTaskTitle.trim()) {
                    setTasks([...tasks, {
                      id: `task_${Date.now()}`,
                      clientId: selectedClientId,
                      title: newTaskTitle,
                      description: "Tarea manual creada desde el Dashboard Super Admin.",
                      status: "backlog",
                      priority: "media",
                      createdAt: new Date().toLocaleTimeString()
                    }]);
                    setNewTaskTitle("");
                    setShowTaskModal(false);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-[12px]"
              >
                Crear Tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
