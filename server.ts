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

import multer from "multer";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import {
  registerSchema,
  loginSchema,
  createMessageSchema,
  createTaskSchema,
  updateTaskStatusSchema,
  checkoutSchema,
  updateProjectInfoSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validateBody
} from "./src/schemas/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("\n[FATAL] JWT_SECRET environment variable is required and must be at least 32 characters.");
  console.error("Generate one with: openssl rand -hex 32\n");
  process.exit(1);
}

// MongoDB Connection Setup
const mongoUrl = process.env.MONGO_PUBLIC_URL || process.env.MONGODB_URI || process.env.MONGO_URL || process.env.DATABASE_URL || "mongodb://localhost:27017/chambadigital";
let isMongoConnected = false;

async function initDatabase() {
  try {
    await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 });
    isMongoConnected = true;
    console.log("[MongoDB] Connected successfully to Database.");
    await seedTestUser();
  } catch (err: any) {
    console.log("[MongoDB] Connection notice (using fallback if needed):", err.message);
    await seedTestUser();
  }
}

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
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  company: { type: String, default: "Mi Empresa" },
  plan: { type: String, default: "Web Tradicional" },
  planPrice: { type: String, default: "$49.99/mes" },
  subscriptionStatus: { type: String, default: "activa" },
  projectStatus: { type: String, default: "en_produccion" },
  role: { type: String, enum: ["client", "admin"], default: "client", index: true },
  // Project context fields
  projectDescription: { type: String, default: "" },
  deployedUrl: { type: String, default: "" },
  thumbnailUrl: { type: String, default: "" },
  techStack: { type: String, default: "" },
  githubRepo: { type: String, default: "" },
  lastDeployedAt: { type: Date },
  // Password reset fields
  resetToken: { type: String, default: "" },
  resetTokenExpires: { type: Date },
  // Soft delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const UserModel = User as any;

// Message Schema & Model
const messageSchema = new mongoose.Schema({
  clientId: { type: String, required: true, index: true },
  sender: { type: String, enum: ["client", "admin", "system"], required: true },
  text: { type: String, default: "" },
  fileUrl: { type: String, default: "" },
  fileType: { type: String, default: "" },
  fileName: { type: String, default: "" },
  timestamp: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true },
});
messageSchema.index({ clientId: 1, createdAt: 1 });
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
const MessageModel = Message as any;

// Task Schema & Model
const taskSchema = new mongoose.Schema({
  clientId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["backlog", "en_progreso", "revision", "completado"], default: "backlog" },
  priority: { type: String, enum: ["alta", "media", "baja"], default: "media" },
  createdAt: { type: String, default: () => new Date().toLocaleString() },
  requestOrigin: { type: String, default: "Chat del Cliente" },
  isDeleted: { type: Boolean, default: false },
});
taskSchema.index({ clientId: 1, createdAt: -1 });
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
const TaskModel = Task as any;

// In-memory fallback stores for dev (DISABLED in production)
const isProduction = process.env.NODE_ENV === "production";
const inMemoryUsers: Record<string, any> = {};
const inMemoryMessages: any[] = [];
const inMemoryTasks: any[] = [];

function requireMongo() {
  if (!isMongoConnected && isProduction) {
    throw new Error("MongoDB not available in production");
  }
}

// Helper: Seed test user + admin
async function seedTestUser() {
  try {
    const existingDemo = await UserModel.findOne({ email: "demo@chamba.digital" });
    if (!existingDemo) {
      const hashedPassword = await bcrypt.hash("demo123456", 10);
      await UserModel.create({
        name: "Usuario de Prueba WaaS",
        email: "demo@chamba.digital",
        password: hashedPassword,
        company: "Pacific Surf School",
        plan: "Web Tradicional",
        planPrice: "$49.99/mes",
        subscriptionStatus: "activa",
        projectStatus: "en_produccion",
        role: "client"
      });
      console.log("[Seed] Test client created: demo@chamba.digital / demo123456");
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@chamba.digital";
    const adminPassword = process.env.ADMIN_PASSWORD || "chamba2026";
    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedAdmin = await bcrypt.hash(adminPassword, 10);
      await UserModel.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedAdmin,
        company: "Chamba Digital",
        plan: "Elite + IA",
        planPrice: "—",
        subscriptionStatus: "activa",
        projectStatus: "n/a",
        role: "admin"
      });
      console.log(`[Seed] Admin created: ${adminEmail} (password from env)`);
    }
  } catch (e) {
    if (isProduction) {
      console.error("[Seed] FATAL: Cannot seed users in production without MongoDB:", e);
      process.exit(1);
    }
    console.warn("[Seed] Using in-memory fallback (dev only):", (e as Error).message);
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
      projectStatus: "en_produccion",
      role: "client"
    };
    const adminEmail = process.env.ADMIN_EMAIL || "admin@chamba.digital";
    inMemoryUsers[adminEmail] = {
      _id: "admin_user_id_1",
      name: "Super Admin",
      email: adminEmail,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "chamba2026", 10),
      company: "Chamba Digital",
      plan: "Elite + IA",
      role: "admin"
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
  await initDatabase();

  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Trust Railway proxy (for correct IP detection in rate limiting)
  app.set("trust proxy", 1);

  // Security & Optimization Middlewares
  app.use(helmet({
    contentSecurityPolicy: false, // Prevents breaking inline scripts/styles in SPA/Vite
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:5173", "https://chamba.digital", "https://www.chambadigital.com"];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || !isProduction) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  }));

  app.use(compression());
  app.use(express.json());

  // Rate limiters
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10, // 10 attempts per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados intentos. Intenta de nuevo en 15 minutos." }
  });

  const chatLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 20, // 20 msgs/min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Demasiados mensajes. Espera un momento." }
  });

  const captureLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // 30 captures/hour per IP (Chromium is expensive)
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Límite de capturas alcanzado. Intenta en 1 hora." }
  });

  const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 100, // 100 req/min general
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use("/api/", generalLimiter);

  // Auth middleware for protected routes (defined early so endpoints can use them)
  const requireAuth = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado." });
    }
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Fetch user from DB to get current role
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findById(decoded.userId).select("role email name");
      } else if (!isProduction) {
        user = Object.values(inMemoryUsers).find((u: any) => u._id === decoded.userId || u.id === decoded.userId);
      } else {
        return res.status(503).json({ error: "Base de datos no disponible." });
      }

      if (!user) return res.status(401).json({ error: "Usuario no encontrado." });

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: user.role || "client"
      };
      next();
    } catch {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  };

  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Acceso restringido a administradores." });
    }
    next();
  };

  // File upload setup
  const uploadsDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  app.use("/uploads", express.static(uploadsDir));

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`);
    },
  });
  const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = /^(image|video|audio|application\/pdf|text)/;
      if (allowed.test(file.mimetype) || file.mimetype === "application/octet-stream") {
        cb(null, true);
      } else {
        cb(new Error("Tipo de archivo no soportado."));
      }
    },
  });

  // AUTH API: Register
  app.post("/api/auth/register", authLimiter, validateBody(registerSchema), async (req, res) => {
    try {
      const { name, email, password, company, plan } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser: any;

      if (isMongoConnected) {
        const existing = await UserModel.findOne({ email, isDeleted: { $ne: true } });
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
      } else if (!isProduction) {
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
      } else {
        return res.status(503).json({ error: "Base de datos no disponible. Intenta más tarde." });
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
  app.post("/api/auth/login", authLimiter, validateBody(loginSchema), async (req, res) => {
    try {
      const { email, password } = req.body;

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({ email, isDeleted: { $ne: true } });
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

  // AUTH API: Forgot Password
  app.post("/api/auth/forgot-password", authLimiter, validateBody(forgotPasswordSchema), async (req, res) => {
    try {
      const { email } = req.body;
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({ email, isDeleted: { $ne: true } });
      } else {
        user = inMemoryUsers[email];
      }

      // Always return 200 for security to prevent user enumeration
      if (!user) {
        return res.json({ success: true, message: "Si la cuenta existe, se ha enviado un enlace de recuperación." });
      }

      const crypto = await import("crypto");
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 3600000); // 1 hour

      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(user._id, { resetToken, resetTokenExpires: expires });
      } else {
        user.resetToken = resetToken;
        user.resetTokenExpires = expires;
      }

      console.log(`[Password Reset] Reset token generated for ${email}: ${resetToken}`);
      return res.json({ success: true, message: "Si la cuenta existe, se ha enviado un enlace de recuperación." });
    } catch (e: any) {
      res.status(500).json({ error: "Error en recuperación de contraseña." });
    }
  });

  // AUTH API: Reset Password
  app.post("/api/auth/reset-password", authLimiter, validateBody(resetPasswordSchema), async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({
          resetToken: token,
          resetTokenExpires: { $gt: new Date() },
          isDeleted: { $ne: true }
        });
      } else {
        user = Object.values(inMemoryUsers).find(
          (u: any) => u.resetToken === token && u.resetTokenExpires && new Date(u.resetTokenExpires) > new Date()
        );
      }

      if (!user) {
        return res.status(400).json({ error: "Token de recuperación inválido o expirado." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(user._id, {
          password: hashedPassword,
          resetToken: "",
          resetTokenExpires: null
        });
      } else {
        user.password = hashedPassword;
        user.resetToken = "";
        user.resetTokenExpires = null;
      }

      return res.json({ success: true, message: "Contraseña actualizada exitosamente." });
    } catch (e: any) {
      res.status(500).json({ error: "Error restableciendo contraseña." });
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

      let newToken: string | undefined;
      // Sliding expiration: If token expires within 2 days (172,800 sec), renew it
      if (decoded.exp && (decoded.exp - Math.floor(Date.now() / 1000)) < 172800) {
        newToken = jwt.sign(
          { userId: decoded.userId, email: decoded.email, role: decoded.role || "client" },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.setHeader("X-Refresh-Token", newToken);
      }

      if (redisClient) {
        const cachedUser = await redisClient.get(`session:${decoded.userId}`);
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          return res.json({ user: parsed, token: newToken });
        }
      }

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({ _id: decoded.userId, isDeleted: { $ne: true } }).select("-password");
      } else {
        user = Object.values(inMemoryUsers).find((u: any) => (u._id === decoded.userId || u.id === decoded.userId) && !u.isDeleted);
      }

      if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

      return res.json({
        token: newToken,
        user: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          company: user.company,
          plan: user.plan,
          planPrice: user.planPrice,
          subscriptionStatus: user.subscriptionStatus,
          projectStatus: user.projectStatus,
          role: user.role || "client"
        }
      });
    } catch (e) {
      return res.status(401).json({ error: "Token inválido o expirado." });
    }
  });

  // ADMIN API: Login (issues JWT with role=admin)
  app.post("/api/admin/login", authLimiter, async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email y contraseña requeridos." });

    try {
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findOne({ email });
      } else if (!isProduction) {
        user = inMemoryUsers[email];
      } else {
        return res.status(503).json({ error: "Servicio no disponible." });
      }

      if (!user || user.role !== "admin") {
        return res.status(401).json({ error: "Credenciales inválidas o sin permisos de administrador." });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Credenciales inválidas." });

      const token = jwt.sign({ userId: user._id || user.id, email: user.email, role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
      res.json({
        token,
        admin: {
          id: user._id || user.id,
          email: user.email,
          name: user.name,
          role: "admin"
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error en login.", details: e.message });
    }
  });

  // ADMIN API: Verify session
  app.get("/api/admin/me", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findById(req.user.userId).select("-password");
      } else if (!isProduction) {
        user = Object.values(inMemoryUsers).find((u: any) => u._id === req.user.userId || u.id === req.user.userId);
      }
      if (!user) return res.status(404).json({ error: "Admin no encontrado." });
      res.json({
        admin: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          role: "admin"
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error verificando sesión." });
    }
  });

  // API: Upload file for chat
  app.post("/api/upload", requireAuth, upload.single("file"), async (req: any, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No se proporciono archivo." });
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({
        success: true,
        file: {
          url: fileUrl,
          type: req.file.mimetype,
          name: req.file.originalname,
          size: req.file.size,
        },
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error subiendo archivo.", details: e.message });
    }
  });

  // API: Capture live thumbnail from deployed URL
  app.post("/api/capture-thumbnail", requireAuth, captureLimiter, async (req: any, res) => {
    try {
      const { url } = req.body;
      if (!url || !/^https?:\/\//.test(url)) {
        return res.status(400).json({ error: "URL inválida. Debe empezar con http:// o https://" });
      }

      // Import Playwright dynamically (only when needed)
      const { chromium } = await import("playwright");
      
      const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      
      const page = await browser.newPage({
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
      });

      // Set a reasonable timeout
      await page.goto(url, { 
        waitUntil: 'networkidle', 
        timeout: 30000 
      });

      // Wait a bit for dynamic content
      await page.waitForTimeout(1500);

      // Take screenshot
      const filename = `thumb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.png`;
      const filepath = path.join(uploadsDir, filename);
      
      await page.screenshot({ 
        path: filepath, 
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 720 }
      });

      await browser.close();

      const fileUrl = `/uploads/${filename}`;
      
      // Update user's thumbnailUrl in database
      const userId = req.user.userId;
      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(userId, { thumbnailUrl: fileUrl });
      } else if (!isProduction && inMemoryUsers[userId]) {
        inMemoryUsers[userId].thumbnailUrl = fileUrl;
      } else {
        return res.status(503).json({ error: "Base de datos no disponible." });
      }

      res.json({ 
        success: true, 
        thumbnailUrl: fileUrl,
        message: "Miniatura capturada correctamente" 
      });
    } catch (e: any) {
      console.error("Thumbnail capture error:", e);
      res.status(500).json({ 
        error: "Error capturando miniatura", 
        details: e.message 
      });
    }
  });

  // PUT /api/users/:id/project-info - Client updates their project context
  app.put("/api/users/:id/project-info", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      // Users can only update their own project info
      if (req.user.userId !== id) {
        return res.status(403).json({ error: "No autorizado para editar este perfil." });
      }
      const { projectDescription, deployedUrl, thumbnailUrl, techStack, githubRepo } = req.body;
      const updateData: any = {};
      if (projectDescription !== undefined) updateData.projectDescription = projectDescription;
      if (deployedUrl !== undefined) updateData.deployedUrl = deployedUrl;
      if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;
      if (techStack !== undefined) updateData.techStack = techStack;
      if (githubRepo !== undefined) updateData.githubRepo = githubRepo;

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
      } else {
        user = inMemoryUsers[id];
        if (user) {
          Object.assign(user, updateData);
        }
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
          projectStatus: user.projectStatus,
          projectDescription: user.projectDescription,
          deployedUrl: user.deployedUrl,
          thumbnailUrl: user.thumbnailUrl,
          techStack: user.techStack,
          githubRepo: user.githubRepo,
          lastDeployedAt: user.lastDeployedAt
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando info del proyecto.", details: e.message });
    }
  });

  // GET /api/admin/clients/:id - Admin gets full client details including project fields
  app.get("/api/admin/clients/:id", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findById(id).select("-password");
      } else {
        user = inMemoryUsers[id];
      }
      if (!user) return res.status(404).json({ error: "Cliente no encontrado." });

      return res.json({
        client: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || "—",
          company: user.company,
          plan: user.plan,
          price: user.planPrice,
          subscriptionStatus: user.subscriptionStatus === "activa" ? "active" : user.subscriptionStatus,
          projectStatus: user.projectStatus,
          railwayStatus: "activo",
          startDate: user.createdAt ? String(user.createdAt).slice(0, 10) : "—",
          notes: user.projectDescription || "Cliente WaaS activo",
          // Project fields
          projectDescription: user.projectDescription,
          deployedUrl: user.deployedUrl,
          thumbnailUrl: user.thumbnailUrl,
          techStack: user.techStack,
          githubRepo: user.githubRepo,
          lastDeployedAt: user.lastDeployedAt
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo cliente.", details: e.message });
    }
  });

  // PUT /api/admin/clients/:id - Admin updates full client including project fields
  app.put("/api/admin/clients/:id", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Remove immutable fields
      delete updateData.id;
      delete updateData._id;
      delete updateData.password;
      delete updateData.createdAt;

      let user: any = null;
      if (isMongoConnected) {
        user = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
      } else {
        user = inMemoryUsers[id];
        if (user) {
          Object.assign(user, updateData);
        }
      }
      if (!user) return res.status(404).json({ error: "Cliente no encontrado." });

      return res.json({
        client: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || "—",
          company: user.company,
          plan: user.plan,
          price: user.planPrice,
          subscriptionStatus: user.subscriptionStatus === "activa" ? "active" : user.subscriptionStatus,
          projectStatus: user.projectStatus,
          railwayStatus: "activo",
          startDate: user.createdAt ? String(user.createdAt).slice(0, 10) : "—",
          notes: user.projectDescription || "Cliente WaaS activo",
          projectDescription: user.projectDescription,
          deployedUrl: user.deployedUrl,
          thumbnailUrl: user.thumbnailUrl,
          techStack: user.techStack,
          githubRepo: user.githubRepo,
          lastDeployedAt: user.lastDeployedAt
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando cliente.", details: e.message });
    }
  });

  // API: Get messages for a client with pagination (?limit=50&before=2026-07-29T00:00:00.000Z)
  app.get("/api/messages/:clientId?", requireAuth, async (req: any, res) => {
    try {
      const clientId = req.params.clientId || req.user.userId;
      const limit = Math.min(Number(req.query.limit) || 50, 100);
      const before = req.query.before;

      let query: any = { clientId, isDeleted: { $ne: true } };
      if (before) {
        query.createdAt = { $lt: new Date(before as string) };
      }

      let msgs: any[];
      if (isMongoConnected) {
        msgs = await MessageModel.find(query).sort({ createdAt: 1 }).limit(limit).lean();
      } else {
        msgs = inMemoryMessages.filter((m: any) => m.clientId === clientId && !m.isDeleted);
        if (before) {
          msgs = msgs.filter((m: any) => new Date(m.createdAt || 0) < new Date(before as string));
        }
        msgs = msgs.slice(-limit);
      }
      res.json({ messages: msgs, limit, hasMore: msgs.length === limit });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo mensajes.", details: e.message });
    }
  });

  // API: Send a message (client or admin)
  app.post("/api/messages", requireAuth, validateBody(createMessageSchema), async (req: any, res) => {
    try {
      const { clientId, sender, text, fileUrl, fileType, fileName } = req.body;
      const cId = clientId || req.user.userId;
      const senderRole = sender || "client";

      const newMsg: any = {
        clientId: cId,
        sender: senderRole,
        text: text?.trim() || "",
        fileUrl: fileUrl || "",
        fileType: fileType || "",
        fileName: fileName || "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: new Date(),
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
        tasks = await TaskModel.find({ clientId, isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
      } else {
        tasks = inMemoryTasks.filter((t: any) => t.clientId === clientId && !t.isDeleted);
      }
      res.json({ tasks });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo tareas.", details: e.message });
    }
  });

  // API: Admin - Get all tasks
  app.get("/api/admin/tasks", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      let tasks: any[];
      if (isMongoConnected) {
        tasks = await TaskModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
      } else {
        tasks = inMemoryTasks.filter((t: any) => !t.isDeleted);
      }
      res.json({ tasks });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo todas las tareas.", details: e.message });
    }
  });

  // API: Admin - Update task status (Kanban move)
  app.patch("/api/tasks/:taskId/status", requireAuth, validateBody(updateTaskStatusSchema), async (req: any, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
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
  app.post("/api/tasks", requireAuth, validateBody(createTaskSchema), async (req: any, res) => {
    try {
      const { clientId, title, description, priority } = req.body;
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

  // API: Admin - Delete a task (Soft Delete)
  app.delete("/api/tasks/:taskId", requireAuth, async (req: any, res) => {
    try {
      const { taskId } = req.params;
      if (isMongoConnected) {
        await TaskModel.findByIdAndUpdate(taskId, { isDeleted: true });
      } else {
        const task = inMemoryTasks.find((t: any) => t.id === taskId);
        if (task) task.isDeleted = true;
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Error eliminando tarea.", details: e.message });
    }
  });

  // API: Admin - Get all clients (for super admin)
  app.get("/api/admin/clients", requireAuth, requireAdmin, async (req: any, res) => {
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
  // Polar.sh webhook with signature verification (Standard Webhooks spec)
  // https://docs.polar.sh/api-reference/webhooks/structure
  app.post("/api/checkout/notify", async (req, res) => {
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    const signatureHeader = req.headers["webhook-signature"] || req.headers["Webhook-Signature"];

    // Verify signature if secret is configured
    if (webhookSecret && signatureHeader) {
      const crypto = await import("crypto");
      const parts = String(signatureHeader).split(",");
      const timestamp = parts.find(p => p.startsWith("t="))?.slice(2);
      const v1Sig = parts.find(p => p.startsWith("v1="))?.slice(3);

      if (!timestamp || !v1Sig) {
        console.warn("[Polar Webhook] Invalid signature header");
        return res.status(401).json({ error: "Invalid signature header" });
      }

      // Reject events older than 5 minutes (replay protection)
      const ageMs = Date.now() - Number(timestamp);
      if (Number.isNaN(ageMs) || ageMs > 5 * 60 * 1000) {
        return res.status(401).json({ error: "Webhook timestamp too old" });
      }

      const payload = `${timestamp}.${JSON.stringify(req.body)}`;
      const expected = crypto
        .createHmac("sha256", webhookSecret)
        .update(payload)
        .digest("base64");

      const sigBuf = Buffer.from(v1Sig, "base64");
      const expBuf = Buffer.from(expected, "base64");
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        console.warn("[Polar Webhook] Signature mismatch");
        return res.status(401).json({ error: "Invalid signature" });
      }
    } else if (isProduction) {
      // In production, webhook secret MUST be configured
      console.error("[Polar Webhook] No POLAR_WEBHOOK_SECRET configured");
      return res.status(503).json({ error: "Webhook not configured" });
    }
    // In dev, allow unsigned webhooks for testing

    const event = req.body;
    const eventType = event?.type || event?.event;

    // Handle different Polar.sh events
    if (eventType === "checkout.created" || eventType === "subscription.created") {
      const data = event.data || {};
      const clientEmail = data.customer_email || data.customer?.email;
      const plan = data.product?.name || data.plan || "Plan WaaS";
      const price = data.amount ? `${(data.amount / 100).toFixed(2)} ${data.currency || "USD"}` : "$49.99/mes";
      const checkoutId = data.id || event.id;

      await notifyAdminOnSubscription({
        clientName: data.customer_name || "Nuevo Suscriptor",
        clientEmail,
        plan,
        price,
        checkoutId,
      });
    } else if (eventType === "customer.subscription.deleted" || eventType === "subscription.revoked" || eventType === "subscription.canceled") {
      const data = event.data || {};
      const clientEmail = data.customer_email || data.customer?.email;
      if (clientEmail) {
        if (isMongoConnected) {
          await UserModel.findOneAndUpdate({ email: clientEmail }, { subscriptionStatus: "cancelada" });
        } else if (inMemoryUsers[clientEmail]) {
          inMemoryUsers[clientEmail].subscriptionStatus = "cancelada";
        }
        console.log(`[Polar Webhook] Subscription status updated to cancelada for ${clientEmail}`);
      }
    } else {
      console.log(`[Polar Webhook] Handled event: ${eventType}`);
    }

    res.json({ success: true, received: eventType });
  });

  // API routes
  app.post("/api/send-checklist", captureLimiter, async (req, res) => {
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
      res.status(200).json({ success: true, warning: "Simulated success (check server logs for SMTP errors)" });
    }
  });

  // Robust Health Check Endpoint for Railway / Uptime monitoring
  app.get("/api/health", async (req, res) => {
    const mongoStatus = isMongoConnected ? "connected" : "disconnected";
    const redisStatus = redisClient && redisClient.status === "ready" ? "connected" : "disabled_or_disconnected";
    const memoryUsage = process.memoryUsage();
    
    const isHealthy = isProduction ? isMongoConnected : true;
    
    res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: mongoStatus,
        redis: redisStatus,
      },
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      }
    });
  });

  app.post("/api/chat", chatLimiter, async (req, res) => {
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
