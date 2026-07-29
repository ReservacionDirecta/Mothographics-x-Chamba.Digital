import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import MailerLite from '@mailerlite/mailerlite-nodejs';
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import { Polar } from "@polar-sh/sdk";
import mongoose from "mongoose";
import Redis from "ioredis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "chamba_jwt_secret_2026_waas_token";

// MongoDB Connection Setup
const mongoUrl = process.env.MONGO_PUBLIC_URL || "mongodb://localhost:27017/chambadigital";
let isMongoConnected = false;

mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    isMongoConnected = true;
    console.log("[MongoDB] Connected successfully to Database.");
    seedTestUser();
  })
  .catch((err) => {
    console.log("[MongoDB] Connection error (using in-memory fallback for auth if needed):", err.message);
  });

// Redis Connection Setup
const redisUrl = process.env.REDIS_PUBLIC_URL;
let redisClient: Redis | null = null;
if (redisUrl && !redisUrl.includes("${{")) {
  try {
    redisClient = new Redis(redisUrl);
    redisClient.on("connect", () => console.log("[Redis] Connected successfully for caching."));
    redisClient.on("error", (e) => console.log("[Redis] Error:", e.message));
  } catch (e) {
    console.log("[Redis] Could not connect to Redis server.");
  }
}

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, default: "Mi Empresa" },
  plan: { type: String, default: "Web Tradicional" },
  planPrice: { type: String, default: "$49.99/mes" },
  subscriptionStatus: { type: String, default: "activa" },
  projectStatus: { type: String, default: "en_produccion" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const UserModel = User as any;

// Message Schema & Model
const messageSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  sender: { type: String, enum: ["client", "admin", "system"], required: true },
  text: { type: String, required: true },
  timestamp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
const MessageModel = Message as any;

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["backlog", "en_progreso", "revision", "completado"], default: "backlog" },
  priority: { type: String, enum: ["alta", "media", "baja"], default: "media" },
  createdAt: { type: String, default: () => new Date().toLocaleString() },
  requestOrigin: { type: String, default: "Chat del Cliente" },
});
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
const TaskModel = Task as any;

// In-memory fallback stores for dev
const inMemoryUsers: Record<string, any> = {};
const inMemoryMessages: any[] = [];
const inMemoryTasks: any[] = [];

// Helper: Seed test user
async function seedTestUser() {
  try {
    const existing = await UserModel.findOne({ email: "demo@chamba.digital" });
    if (!existing) {
      const hashedPassword = await bcrypt.hash("demo123456", 10);
      await UserModel.create({
        name: "Usuario de Prueba WaaS",
        email: "demo@chamba.digital",
        password: hashedPassword,
        company: "Pacific Surf School",
        plan: "Web Tradicional",
        planPrice: "$49.99/mes",
        subscriptionStatus: "activa",
        projectStatus: "en_produccion"
      });
      console.log("[Seed] Test user created: demo@chamba.digital / demo123456");
    }
  } catch (e) {
    // fallback in memory
    const hashedPassword = await bcrypt.hash("demo123456", 10);
    inMemoryUsers["demo@chamba.digital"] = {
      _id: "demo_user_id_123",
      name: "Usuario de Prueba WaaS",
      email: "demo@chamba.digital",
      password: hashedPassword,
      company: "Pacific Surf School",
      plan: "Web Tradicional",
      planPrice: "$49.99/mes",
      subscriptionStatus: "activa",
      projectStatus: "en_produccion"
    };
  }
}
seedTestUser();

// Initialize Polar SDK
const polarAccessToken = process.env.POLAR_ACCESS_TOKEN || "polar_oat_x37P1mggiiwdbvArW0x0j55KAm2E5rleRzb3u311v5u";
const polar = new Polar({
  accessToken: polarAccessToken,
});

// Product IDs dictionary
const POLAR_PRODUCTS: Record<string, string> = {
  "49": "70f62d4c-2cd9-49ad-9628-24a04d462cc0",
  "99": "b78ef21a-1fdc-4fb6-b411-f4eb46f3fe96",
  "599": "ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de",
  "499": "ef4fe8a9-0f60-40c2-b0c3-0cf2663e38de",
};

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Load knowledge base once
const knowledgeBase = fs.readFileSync(path.join(__dirname, "KNOWLEDGE_BASE.md"), "utf-8");

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json());

  // AUTH API: Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password, company, plan } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Nombre, email y contraseña son obligatorios." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser: any;

      if (isMongoConnected) {
        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(400).json({ error: "El email ya está registrado." });

        newUser = await UserModel.create({
          name,
          email,
          password: hashedPassword,
          company: company || "Mi Empresa",
          plan: plan || "Web Tradicional",
          planPrice: plan?.includes("Advanced") ? "$99.99/mes" : plan?.includes("IA") ? "$599.99/mes" : "$49.99/mes",
          subscriptionStatus: "activa",
          projectStatus: "en_desarrollo"
        });
      } else {
        if (inMemoryUsers[email]) return res.status(400).json({ error: "El email ya está registrado." });
        newUser = {
          _id: `user_${Date.now()}`,
          name,
          email,
          password: hashedPassword,
          company: company || "Mi Empresa",
          plan: plan || "Web Tradicional",
          planPrice: "$49.99/mes",
          subscriptionStatus: "activa",
          projectStatus: "en_desarrollo"
        };
        inMemoryUsers[email] = newUser;
      }

      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

      if (redisClient) {
        await redisClient.setex(`session:${newUser._id}`, 86400 * 7, JSON.stringify(newUser));
      }

      return res.json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          company: newUser.company,
          plan: newUser.plan,
          planPrice: newUser.planPrice,
          subscriptionStatus: newUser.subscriptionStatus,
          projectStatus: newUser.projectStatus
        }
      });
    } catch (e: any) {
      console.error("[Auth Register Error]:", e);
      res.status(500).json({ error: "Error creando cuenta.", details: e.message });
    }
  });

  // AUTH API: Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña requeridos." });
      }

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({ email });
      } else {
        user = inMemoryUsers[email];
      }

      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas." });
      }

      const token = jwt.sign({ userId: user._id || user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      if (redisClient) {
        await redisClient.setex(`session:${user._id || user.id}`, 86400 * 7, JSON.stringify(user));
      }

      return res.json({
        token,
        user: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          company: user.company,
          plan: user.plan,
          planPrice: user.planPrice,
          subscriptionStatus: user.subscriptionStatus,
          projectStatus: user.projectStatus
        }
      });
    } catch (e: any) {
      console.error("[Auth Login Error]:", e);
      res.status(500).json({ error: "Error iniciando sesión.", details: e.message });
    }
  });

  // AUTH API: Get Profile / Verify Token
  app.get("/api/auth/me", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado." });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (redisClient) {
        const cachedUser = await redisClient.get(`session:${decoded.userId}`);
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          return res.json({ user: parsed });
        }
      }

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findById(decoded.userId).select("-password");
      } else {
        user = Object.values(inMemoryUsers).find((u: any) => u._id === decoded.userId || u.id === decoded.userId);
      }

      if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

      return res.json({
        user: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          company: user.company,
          plan: user.plan,
          planPrice: user.planPrice,
          subscriptionStatus: user.subscriptionStatus,
          projectStatus: user.projectStatus
        }
      });
    } catch (e) {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  });

  // Helper: Auth middleware for protected routes
  const requireAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado." });
    }
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  };

  // API: Get messages for a client (by clientId or current user)
  app.get("/api/messages/:clientId?", requireAuth, async (req: any, res) => {
    try {
      const clientId = req.params.clientId || req.user.userId;
      let msgs: any[];
      if (isMongoConnected) {
        msgs = await MessageModel.find({ clientId }).sort({ createdAt: 1 }).lean();
      } else {
        msgs = inMemoryMessages.filter((m: any) => m.clientId === clientId);
      }
      res.json({ messages: msgs });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo mensajes.", details: e.message });
    }
  });

  // API: Send a message (client or admin)
  app.post("/api/messages", requireAuth, async (req: any, res) => {
    try {
      const { clientId, sender, text } = req.body;
      const cId = clientId || req.user.userId;
      const senderRole = sender || "client";
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "El texto del mensaje es obligatorio." });
      }

      const newMsg: any = {
        clientId: cId,
        sender: senderRole,
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      if (isMongoConnected) {
        const created = await MessageModel.create(newMsg);
        newMsg.id = created._id;
      } else {
        newMsg.id = `msg_${Date.now()}`;
        inMemoryMessages.push(newMsg);
      }

      // Auto-create a task when a client sends a message
      if (senderRole === "client") {
        const newTask: any = {
          clientId: cId,
          title: text.trim().length > 50 ? text.trim().slice(0, 50) + "..." : text.trim(),
          description: text.trim(),
          status: "backlog",
          priority: "media",
          createdAt: new Date().toLocaleString(),
          requestOrigin: "Chat del Cliente",
        };
        if (isMongoConnected) {
          await TaskModel.create(newTask);
        } else {
          newTask.id = `task_${Date.now()}`;
          inMemoryTasks.push(newTask);
        }
      }

      res.json({ success: true, message: newMsg });
    } catch (e: any) {
      res.status(500).json({ error: "Error enviando mensaje.", details: e.message });
    }
  });

  // API: Get tasks for a client
  app.get("/api/tasks/:clientId?", requireAuth, async (req: any, res) => {
    try {
      const clientId = req.params.clientId || req.user.userId;
      let tasks: any[];
      if (isMongoConnected) {
        tasks = await TaskModel.find({ clientId }).sort({ createdAt: -1 }).lean();
      } else {
        tasks = inMemoryTasks.filter((t: any) => t.clientId === clientId);
      }
      res.json({ tasks });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo tareas.", details: e.message });
    }
  });

  // API: Admin - Get all tasks
  app.get("/api/admin/tasks", requireAuth, async (req: any, res) => {
    try {
      let tasks: any[];
      if (isMongoConnected) {
        tasks = await TaskModel.find().sort({ createdAt: -1 }).lean();
      } else {
        tasks = [...inMemoryTasks];
      }
      res.json({ tasks });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo todas las tareas.", details: e.message });
    }
  });

  // API: Admin - Update task status (Kanban move)
  app.patch("/api/tasks/:taskId/status", requireAuth, async (req: any, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      if (!["backlog", "en_progreso", "revision", "completado"].includes(status)) {
        return res.status(400).json({ error: "Estado inválido." });
      }
      if (isMongoConnected) {
        await TaskModel.findByIdAndUpdate(taskId, { status });
      } else {
        const task = inMemoryTasks.find((t: any) => t.id === taskId);
        if (task) task.status = status;
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando tarea.", details: e.message });
    }
  });

  // API: Admin - Create a task manually
  app.post("/api/tasks", requireAuth, async (req: any, res) => {
    try {
      const { clientId, title, description, priority } = req.body;
      if (!title || !clientId) {
        return res.status(400).json({ error: "Título y cliente son obligatorios." });
      }
      const newTask: any = {
        clientId,
        title,
        description: description || "Tarea creada desde el panel.",
        status: "backlog",
        priority: priority || "media",
        createdAt: new Date().toLocaleString(),
        requestOrigin: "Manual desde Admin",
      };
      if (isMongoConnected) {
        const created = await TaskModel.create(newTask);
        newTask.id = created._id;
      } else {
        newTask.id = `task_${Date.now()}`;
        inMemoryTasks.push(newTask);
      }
      res.json({ success: true, task: newTask });
    } catch (e: any) {
      res.status(500).json({ error: "Error creando tarea.", details: e.message });
    }
  });

  // API: Admin - Get all clients (for super admin)
  app.get("/api/admin/clients", requireAuth, async (req: any, res) => {
    try {
      let clients: any[];
      if (isMongoConnected) {
        clients = await UserModel.find().select("-password").lean();
      } else {
        clients = Object.values(inMemoryUsers).map((u: any) => {
          const { password, ...rest } = u;
          return rest;
        });
      }
      res.json({ clients });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo clientes.", details: e.message });
    }
  });

  // API Route: Polar.sh Checkout Creation
  app.post("/api/checkout", async (req, res) => {
    try {
      const { productId, tier } = req.body;
      const targetProductId = productId || POLAR_PRODUCTS[tier] || POLAR_PRODUCTS["49"];

      const host = req.get("host") || "localhost:3000";
      const protocol = req.protocol || "http";
      const defaultSuccessUrl = `${protocol}://${host}/success?checkout_id={CHECKOUT_ID}`;
      const successUrl = process.env.POLAR_SUCCESS_URL || defaultSuccessUrl;

      console.log(`[Polar] Creating checkout session for product: ${targetProductId}`);

      const checkout = await polar.checkouts.create({
        products: [targetProductId],
        successUrl: successUrl,
      });

      console.log(`[Polar] Checkout created successfully: ${checkout.url}`);
      return res.json({ url: checkout.url });
    } catch (error: any) {
      console.error("[Polar] Checkout Error:", error);
      return res.status(500).json({ error: "Failed to create checkout session", details: error.message });
    }
  });

  // Helper: Send email notification to Admin when a client subscribes
  const notifyAdminOnSubscription = async (data: {
    clientName: string;
    clientEmail: string;
    plan: string;
    price: string;
    checkoutId?: string;
  }) => {
    try {
      console.log(`[Email Notification] Sending subscription alert for ${data.clientEmail} to chambadigital2019@gmail.com`);

      // Configured via environment variables or fallback SMTP
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "chambadigital2019@gmail.com",
          pass: process.env.SMTP_PASS || "",
        },
      });

      const mailOptions = {
        from: '"Chamba Digital WaaS" <chambadigital2019@gmail.com>',
        to: "chambadigital2019@gmail.com",
        subject: `🚨 ¡Nueva Suscripción WaaS Activada! - ${data.plan} (${data.price})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #2563eb; margin-top: 0;">🎉 ¡Nueva Suscripción WaaS Recibida!</h2>
            <p>Se ha registrado un nuevo pago/suscripción en <strong>Chamba.Digital</strong> vía Polar.sh:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Cliente:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.clientName || 'Cliente WaaS'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.clientEmail}">${data.clientEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Plan Adquirido:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;">${data.plan}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Monto / Tarifa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #059669; font-weight: bold;">${data.price}</td>
              </tr>
              ${data.checkoutId ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">ID Checkout Polar:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">${data.checkoutId}</td>
              </tr>
              ` : ''}
            </table>

            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-size: 13px; color: #475569;">
              💡 <strong>Siguiente paso:</strong> Accede al <a href="https://chamba.digital/admin" style="color: #2563eb;">Panel Super Admin</a> para configurar su repositorio en Railway y asignarle su primer tablero Kanban.
            </div>
          </div>
        `,
      };

      if (process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`[Email Notification] Email sent successfully to chambadigital2019@gmail.com`);
      } else {
        console.log(`[Email Notification Mock] SMTP_PASS not set. Logged alert:\n`, mailOptions.html);
      }
    } catch (err) {
      console.error("[Email Notification Error]:", err);
    }
  };

  // API Route: Webhook or Success Checkout Trigger
  app.post("/api/checkout/notify", async (req, res) => {
    const { clientName, clientEmail, plan, price, checkoutId } = req.body;
    if (!clientEmail || !plan) {
      return res.status(400).json({ error: "Missing email or plan parameters" });
    }

    await notifyAdminOnSubscription({
      clientName: clientName || "Nuevo Suscriptor",
      clientEmail,
      plan,
      price: price || "$49.99/mes",
      checkoutId,
    });

    res.json({ success: true, message: "Admin notified successfully" });
  });

  // API routes
  app.post("/api/send-checklist", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      if (process.env.MAILERLITE_API_KEY) {
        // MailerLite Integration
        const mailerlite = new MailerLite({
          api_key: process.env.MAILERLITE_API_KEY
        });

        const params = {
          email: email,
          fields: {
            source: "Chamba Digital - Checklist 2026"
          },
          groups: process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : []
        };

        const response = await mailerlite.subscribers.createOrUpdate(params);
        console.log(`[MailerLite] Subscriber added: ${email}. ID: ${(response.data as any).id}`);
        return res.json({ success: true, provider: "mailerlite", messageId: (response.data as any).id });
      } else {
        // Mock fallback if .env is missing
        console.log(`[Email Mock] Simulated sending to: ${email}`);
        return res.json({ 
          success: true, 
          provider: "mock", 
          warning: "No MAILERLITE_API_KEY found, simulating success for dev." 
        });
      }
    } catch (error) {
      console.error("[Email] Error:", error);
      // Even if email fails, we send success to the user to avoid friction in DEV
      // but log the real error. In prod, we should handle this based on provider.
      res.status(200).json({ success: true, warning: "Simulated success (check server logs for SMTP errors)" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });
    if (!ai) return res.status(503).json({ error: "AI Service unavailable" });

    console.log(`[Chat] Incoming message: "${message.slice(0, 50)}"`);
    console.log(`[Chat] History steps: ${history?.length || 0}`);

    try {
      // Security: Sanitize input
      const cleanMessage = message.slice(0, 500).replace(/[<>]/g, ""); 

      const systemPrompt = `
        Eres el asistente oficial de chamba.digital (escrito exactamente así, todo pegado y en minúsculas). 
        REGLA DE ORO: Tienes estrictamente prohibido inventar o alucinar información que no esté en el CONTEXTO proporcionado abajo.
        
        INFORMACIÓN DE CONTEXTO:
        ${knowledgeBase}

        INSTRUCCIONES DE SEGURIDAD Y COMPORTAMIENTO:
        1. Identidad: El nombre de la empresa es exactamente chamba.digital (todo pegado).
        2. Enfoque WaaS (Web as a Service): Resalta que somos una empresa WaaS donde el cliente obtiene "Tu web a medida desde $50 al mes con cambios ilimitados".
        3. Estructura de Planes WaaS:
           - $50/mes: Web Tradicional (negocios, marcas, tiendas, clínicas, consultorios, sitios corporativos).
           - $100/mes: Web App Advanced (funciones avanzadas, panel administrativo a medida, REST API, integraciones enterprise).
           - $500/mes: Web App con IA & Automatizaciones (automatización de flujos de trabajo de empresa, IA en la gestión operativa 24/7).
        4. Reserva de Consultas y Cierre de Venta: Siempre invita proactivamente al usuario a agendar una consulta técnica gratuita o cerrar su plan mediante nuestro enlace directo de WhatsApp: https://wa.me/51904060670. Si el usuario solicita agendar/reservar una cita en el chat, proporciónale inmediatamente el enlace para fijar el horario de su consulta por WhatsApp de forma directa.
        5. Formato: Utiliza negritas (**texto**) y viñetas para estructurar la información y hacerla fácil de leer.
        6. Brevedad Extrema (Regla Crítica): Tus respuestas deben ser sumamente cortas, directas y al grano (máximo 2 párrafos cortos). NUNCA des discursos largos.
      `;

      const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Entendido. Soy el asistente oficial de chamba.digital. Mantendré mis respuestas extremadamente cortas, directas y concisas (máximo 2 párrafos), buscando siempre cerrar la venta llevándolos a WhatsApp." }] },
        ...(history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: cleanMessage }] }
      ];

      console.log("[Chat] Calling Gemini API...");
      const result = await ai.models.generateContent({
        model: "models/gemini-2.5-flash-lite",
        contents: contents,
        config: {
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
        }
      });

      const responseText = result.text || "Sin respuesta";
      console.log(`[Chat] Gemini response received (${responseText.length} chars)`);
      
      res.json({ content: responseText });
    } catch (error: any) {
      console.error("[Chat] Fatal Error:", error.message || error);
      res.status(500).json({ error: "Error procesando tu mensaje", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Index not found');
      }
      let html = fs.readFileSync(indexPath, 'utf-8');

      let title = "";
      let desc = "";

      if (req.path.startsWith('/hotels') || req.path.startsWith('/hospitality')) {
        title = "Marketing Hotelero y Motor de Reservas Directas | Chamba Digital";
        desc = "Recupera tus reservas directas y elimina comisiones de OTAs (Booking, Airbnb). Especialistas en Marketing Hotelero, integración de Sirvoy PMS, motores de reservas de alta conversión y automatización con Inteligencia Artificial en Perú y Latinoamérica.";
      } else if (req.path.startsWith('/ecommerce')) {
        title = "Desarrollo E-commerce de Alta Conversión | Chamba Digital";
        desc = "Tiendas virtuales ultrarrápidas optimizadas para convertir visitantes en compradores. Especialistas en Shopify, WooCommerce, Meta Ads y automatización de carritos abandonados en Perú.";
      } else if (req.path.startsWith('/servicebusinesses')) {
        title = "Marketing y Embudos B2B para Empresas de Servicios | Chamba Digital";
        desc = "Escala tu empresa de servicios con embudos de generación de leads cualificados, automatización de citas con Inteligencia Artificial y posicionamiento digital de alto nivel en Perú.";
      } else if (req.path.startsWith('/alianza') || req.path.toLowerCase().includes('mothographics')) {
        title = "Alianza Estratégica: Mothographics × Chamba Digital";
        desc = "Unión de fuerzas entre el diseño de alto impacto de Mothographics y la ingeniería de performance de Chamba Digital para transformar negocios en México y Perú.";
      }

      if (title && desc) {
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
        html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`);
        html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
        html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
        html = html.replace(/<meta property="twitter:title" content="[^"]*"/, `<meta property="twitter:title" content="${title}"`);
        html = html.replace(/<meta property="twitter:description" content="[^"]*"/, `<meta property="twitter:description" content="${desc}"`);
      }

      res.send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
