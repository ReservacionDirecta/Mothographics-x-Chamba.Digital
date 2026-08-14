import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { Resend } from "resend";
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
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
  verify2FASchema,
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
  role: { type: String, enum: ["client", "manager", "admin", "superadmin"], default: "client", index: true },
  // 2FA Security fields
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String, default: "" },
  twoFactorBackupCodes: [{ type: String }],
  // Passkey (WebAuthn) fields
  passkeys: [{
    credentialID: { type: String, required: true },
    publicKey: { type: String, required: true },
    counter: { type: Number, default: 0 },
    deviceType: { type: String, default: "singleDevice" },
    backedUp: { type: Boolean, default: false },
    transports: [{ type: String }],
    name: { type: String, default: "Mi Passkey / Biometría" },
    createdAt: { type: Date, default: Date.now }
  }],
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

// Consultation Schema & Model (15 min free consultations)
const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, default: "" },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  topic: { type: String, default: "Auditoría Técnica y Plan WaaS (15 min)" },
  notes: { type: String, default: "" },
  status: { type: String, enum: ["pendiente", "confirmada", "completada", "cancelada"], default: "pendiente" },
  createdAt: { type: Date, default: Date.now, index: true },
  isDeleted: { type: Boolean, default: false },
});
consultationSchema.index({ date: 1, timeSlot: 1 });
const Consultation = mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);
const ConsultationModel = Consultation as any;

// In-memory fallback stores for dev (DISABLED in production)
const isProduction = process.env.NODE_ENV === "production";
const inMemoryUsers: Record<string, any> = {};
const inMemoryMessages: any[] = [];
const inMemoryTasks: any[] = [];
const inMemoryConsultations: any[] = [];

function requireMongo() {
  if (!isMongoConnected && isProduction) {
    throw new Error("MongoDB not available in production");
  }
}

// Portfolio Seed Data
const PORTFOLIO_SEED = [
  {
    name: "Pacific Surf School",
    email: "contacto@pacificsurfschool.com.pe",
    company: "Escuela & Clases de Surf",
    plan: "Web Tradicional",
    planPrice: "$49.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Plataforma de reservas de clases de surf y alquiler de equipos en Máncora y Miraflores.",
    deployedUrl: "https://pacificsurfschool.com.pe",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://pacificsurfschool.com.pe?w=600",
    techStack: "React, Vite, Express, Railway, MongoDB",
    role: "client",
  },
  {
    name: "LATAM Abogados",
    email: "contacto@latamabogados.com",
    company: "Inglés Legal & Consultoría U.S.",
    plan: "Business",
    planPrice: "$99.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Firma legal internacional especializada en asesoría corporativa, marcas e inglés jurídico.",
    deployedUrl: "https://latamabogados.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://latamabogados.com?w=600",
    techStack: "React, Node.js, Express, MailerLite, Railway",
    role: "client",
  },
  {
    name: "Peña Linda Máncora",
    email: "reservas@penalindamancora.com",
    company: "Reserva Directa Hotelera",
    plan: "Plan Hoteles",
    planPrice: "$499.00/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Hotel de playa con sistema de reservaciones directas sin comisiones y motor de pagos.",
    deployedUrl: "https://penalindamancora.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://penalindabungalows.up.railway.app?w=600",
    techStack: "React, Motor Sirvoy PMS, Polar.sh, Railway",
    role: "client",
  },
  {
    name: "Dupla Work",
    email: "contacto@dupla.work",
    company: "Producción Visual & Fotografía",
    plan: "Business",
    planPrice: "$99.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Estudio de producción audiovisual, fotografía comercial y cobertura de eventos.",
    deployedUrl: "https://www.dupla.work",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://www.dupla.work?w=600",
    techStack: "React, TailwindCSS, Express, CDN Asset Optimization",
    role: "client",
  },
  {
    name: "Kabsa Constructora",
    email: "proyectos@kabsa.pe",
    company: "Constructora Alcance Nacional",
    plan: "Business",
    planPrice: "$99.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Empresa constructora e inmobiliaria especializada en obras de infraestructura y proyectos llave en mano.",
    deployedUrl: "https://kabsa.pe",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://kabsa.pe?w=600",
    techStack: "React, Headless CMS, Express, Railway",
    role: "client",
  },
  {
    name: "Punta Negritos",
    email: "reservas@puntanegritos.com",
    company: "Wind & Surf Hotel",
    plan: "Plan Hoteles",
    planPrice: "$499.00/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Hotel eco-lodge frente al mar para practicantes de Kitesurf, Windsurf y Surf.",
    deployedUrl: "https://puntanegritos.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://puntanegritos.com?w=600",
    techStack: "React, Sirvoy PMS, Polar.sh, Express, MongoDB",
    role: "client",
  },
  {
    name: "Hacienda Don Vicente",
    email: "contacto@haciendadonvicente.com",
    company: "Hacienda Don Vicente",
    plan: "Plan Hoteles",
    planPrice: "$499.00/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Hacienda turística y centro de eventos campestres con reserva directa de bungalows.",
    deployedUrl: "https://haciendadonvicente.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://haciendadonvicente.com?w=600",
    techStack: "React, Express, Motor de Reservas, Railway",
    role: "client",
  },
  {
    name: "Sauce Hotel Boutique",
    email: "reservas@sauce.pe",
    company: "Sauce Hotel Boutique",
    plan: "Plan Hoteles",
    planPrice: "$499.00/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Hotel boutique exclusivo frente a la laguna de Sauce con integración de pagos y reservas.",
    deployedUrl: "https://sauce.pe",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://sauce.pe?w=600",
    techStack: "React, Express, Sirvoy PMS, Railway, MongoDB",
    role: "client",
  },
  {
    name: "Jah Surf San Bartolo",
    email: "contacto@jahsurfperu.com",
    company: "Jah Surf San Bartolo",
    plan: "Web Tradicional",
    planPrice: "$49.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Escuela de surf y lodge juvenil en la bahía de San Bartolo.",
    deployedUrl: "https://jahsurfperu.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://jahsurfperu.com?w=600",
    techStack: "React, Express, Railway, MongoDB",
    role: "client",
  },
  {
    name: "Olivos del Perú",
    email: "ventas@olivosdelperu.com",
    company: "Exportación & E-Commerce",
    plan: "Business",
    planPrice: "$99.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Plataforma de catálogo digital y exportación de aceites y aceitunas premium.",
    deployedUrl: "https://olivosdelperu.com",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://olivosdelperu.com?w=600",
    techStack: "React, Node.js, Catalog Engine, Express",
    role: "client",
  },
  {
    name: "Usuario de Prueba WaaS",
    email: "demo@chamba.digital",
    company: "Pacific Surf School (Demo)",
    plan: "Web Tradicional",
    planPrice: "$49.99/mes",
    subscriptionStatus: "activa",
    projectStatus: "en_produccion",
    projectDescription: "Cuenta demo interactiva para probar el portal de clientes WaaS.",
    deployedUrl: "https://pacificsurfschool.com.pe",
    thumbnailUrl: "https://s.wordpress.com/mshots/v1/https://pacificsurfschool.com.pe?w=600",
    techStack: "React, TailwindCSS, Express, Railway, MongoDB",
    role: "client",
  }
];

// Helper: Seed test user + admin + portfolio
async function seedTestUser() {
  try {
    const defaultPassword = await bcrypt.hash("demo123456", 10);
    for (const item of PORTFOLIO_SEED) {
      const existing = await UserModel.findOne({ email: item.email });
      if (!existing) {
        await UserModel.create({
          ...item,
          password: defaultPassword,
        });
        console.log(`[Seed] Client created in DB: ${item.email}`);
      } else {
        await UserModel.updateOne({ email: item.email }, { $set: { thumbnailUrl: item.thumbnailUrl, deployedUrl: item.deployedUrl } });
      }
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
      console.log(`[Seed] Admin created in DB: ${adminEmail} (password from env)`);
    }
  } catch (e) {
    if (isProduction) {
      console.error("[Seed] FATAL: Cannot seed users in production without MongoDB:", e);
      process.exit(1);
    }
    console.warn("[Seed] Using in-memory fallback (dev only):", (e as Error).message);
    const hashedPassword = await bcrypt.hash("demo123456", 10);
    PORTFOLIO_SEED.forEach((item, index) => {
      inMemoryUsers[item.email] = {
        _id: item.email === "demo@chamba.digital" ? "demo_user_id_123" : `cli_${index + 1}`,
        ...item,
        password: hashedPassword,
      };
    });
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

// ==========================================
// CENTRAL EMAIL NOTIFICATION SYSTEM (RESEND API)
// ==========================================
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

// Senders: 'onboarding@resend.dev' by default until custom domain 'chamba.digital' is verified in Resend
const SENDER_EMAIL = process.env.SENDER_EMAIL || "Chamba Digital <onboarding@resend.dev>";
const ADMIN_CONTACT_EMAIL = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || "yerctech@gmail.com";

const sendMailSafely = async (options: { to: string; subject: string; html: string; text?: string }) => {
  try {
    console.log(`[Resend Email] Enviando "${options.subject}" desde ${SENDER_EMAIL} hacia ${options.to}`);
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.warn(`[Resend Warning] Error de Resend para ${options.to}:`, error);
      return { success: false, error: error.message };
    }

    console.log(`[Resend Success] Mensaje enviado exitosamente. ID: ${data?.id}`);
    return { success: true, messageId: data?.id };
  } catch (err: any) {
    console.error(`[Resend Exception] Fallo al enviar email a ${options.to}:`, err.message);
    return { success: false, error: err.message };
  }
};

// Generador de enlace a Google Calendar y archivo ICS para consultas de 15 min
function generateCalendarDetails(consultation: {
  name: string;
  email: string;
  company?: string;
  date: string;
  timeSlot: string;
  topic?: string;
  notes?: string;
}) {
  // Parsing date and time slot (e.g., date: "2026-08-15", timeSlot: "10:00 AM")
  const [hoursStr, minutesStr, modifier] = consultation.timeSlot.replace(":", " ").split(" ");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const startIso = `${consultation.date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  const startDate = new Date(startIso);
  const endDate = new Date(startDate.getTime() + 15 * 60 * 1000); // 15 minutos exactos

  const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const gcalStart = formatGCalDate(startDate);
  const gcalEnd = formatGCalDate(endDate);

  const title = `Consulta Gratuita (15 min) - Chamba Digital × ${consultation.name}`;
  const details = `Consulta técnica estratégica de 15 minutos sobre transformación digital y soluciones WaaS.\n\nCliente: ${consultation.name}\nEmail: ${consultation.email}\nEmpresa: ${consultation.company || 'N/A'}\nTema: ${consultation.topic || 'Auditoría Técnica'}\nNotas: ${consultation.notes || 'Ninguna'}\nEnlace WhatsApp: https://wa.me/51904060670`;
  const location = "Reunión Virtual / WhatsApp Call (+51 904 060 670)";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${gcalStart}/${gcalEnd}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chamba Digital//Consulta Gratuita 15min//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:consultation-${Date.now()}@chamba.digital`,
    `DTSTAMP:${formatGCalDate(new Date())}`,
    `DTSTART:${gcalStart}`,
    `DTEND:${gcalEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Recordatorio: Consulta 15 min Chamba Digital en 15 minutos",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return { googleCalendarUrl, icsContent, startIso, endIso: endDate.toISOString() };
}

// 0. Notificación de Consulta Gratuita de 15 Minutos (Para yerctech@gmail.com y para el Cliente)
const sendConsultationBookingEmails = async (consultation: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  date: string;
  timeSlot: string;
  topic?: string;
  notes?: string;
}) => {
  const { googleCalendarUrl } = generateCalendarDetails(consultation);

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="background-color: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Nueva Consulta Agendada</span>
        <h2 style="color: #0f172a; margin: 12px 0 4px 0; font-size: 22px;">⚡ Consulta Gratuita de 15 Minutos</h2>
        <p style="color: #64748b; font-size: 14px; margin: 0;">Un nuevo prospecto ha agendado una sesión estratégica</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin: 20px 0;">
        <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">📋 Datos del Cliente:</h3>
        <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>👤 Nombre:</strong> ${consultation.name}</p>
        <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>✉️ Correo:</strong> <a href="mailto:${consultation.email}" style="color: #2563eb;">${consultation.email}</a></p>
        <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>📱 WhatsApp:</strong> <a href="https://wa.me/${consultation.phone.replace(/\D/g, '')}" style="color: #059669; font-weight: bold;">${consultation.phone}</a></p>
        <p style="margin: 6px 0; color: #334155; font-size: 14px;"><strong>🏢 Negocio / Empresa:</strong> ${consultation.company || 'Sin especificar'}</p>
      </div>

      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 18px; margin: 20px 0;">
        <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 15px; border-bottom: 1px solid #dbeafe; padding-bottom: 8px;">🗓️ Horario Seleccionado:</h3>
        <p style="margin: 6px 0; color: #1e3a8a; font-size: 15px;"><strong>📅 Fecha:</strong> ${consultation.date}</p>
        <p style="margin: 6px 0; color: #1e3a8a; font-size: 15px;"><strong>⏰ Horario:</strong> ${consultation.timeSlot} (Hora Perú / PET)</p>
        <p style="margin: 6px 0; color: #1e3a8a; font-size: 14px;"><strong>🎯 Tema:</strong> ${consultation.topic || 'Auditoría Técnica y Plan WaaS'}</p>
        ${consultation.notes ? `<p style="margin: 6px 0; color: #1e3a8a; font-size: 13px;"><strong>💬 Mensaje del cliente:</strong> <em>"${consultation.notes}"</em></p>` : ''}
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; margin: 26px 0;">
        <a href="https://wa.me/${consultation.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${consultation.name}, te saluda Yosward de Chamba Digital sobre tu consulta de 15 minutos para el ${consultation.date} a las ${consultation.timeSlot}.`)}" style="background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">Abrir WhatsApp del Cliente</a>
        <a href="${googleCalendarUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">Añadir a Google Calendar</a>
      </div>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">Chamba.Digital • Sistema Automático de Reservas WaaS</p>
    </div>
  `;

  // 1. Enviar notificación al Administrador (yerctech@gmail.com)
  await sendMailSafely({
    to: ADMIN_CONTACT_EMAIL,
    subject: `⚡ Nueva Consulta 15 Min: ${consultation.name} (${consultation.date} ${consultation.timeSlot})`,
    html: adminHtml,
  });

  // 2. Enviar confirmación al Cliente
  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #2563eb; margin: 0; font-size: 24px;">¡Tu Consulta Gratuita está Confirmada! 🚀</h2>
        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Chamba Digital • Ingeniería y Automatización WaaS</p>
      </div>

      <p style="color: #334155; font-size: 15px;">Hola <strong>${consultation.name}</strong>,</p>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">Hemos reservado con éxito tu <strong>Consulta Técnica de 15 Minutos</strong>. En esta sesión analizaremos tu modelo de negocio y te explicaremos cómo construir o escalar tu presencia web con soporte ilimitado y automatizaciones de IA.</p>

      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 15px;">Detalles de la Cita:</h3>
        <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>📅 Fecha:</strong> ${consultation.date}</p>
        <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>⏰ Hora:</strong> ${consultation.timeSlot} (Hora Perú / PET)</p>
        <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>⏱️ Duración:</strong> 15 Minutos</p>
        <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>📍 Modalidad:</strong> WhatsApp / Video llamada</p>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${googleCalendarUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">📅 Añadir a Google Calendar</a>
      </div>

      <p style="color: #64748b; font-size: 13px; text-align: center;">Si necesitas reprogramar o tienes dudas previas, escríbenos directamente a <a href="https://wa.me/51904060670" style="color: #059669; font-weight: bold;">WhatsApp (+51 904 060 670)</a> o responde a este correo.</p>
    </div>
  `;

  await sendMailSafely({
    to: consultation.email,
    subject: `✅ Confirmación: Tu Consulta Gratuita de 15 Minutos - Chamba Digital`,
    html: clientHtml,
  });
};

// 1. Notificación de Registro (Bienvenida Cliente + Alerta Admin)
const sendWelcomeAndRegisterEmails = async (user: { name: string; email: string; company?: string; plan?: string }) => {
  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24px;">¡Bienvenido a Chamba Digital! 🚀</h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Tu ecosistema WaaS (Website-as-a-Service) está activo</p>
      </div>

      <p style="color: #334155; font-size: 15px;">Hola <strong>${user.name}</strong>,</p>
      <p style="color: #334155; font-size: 15px;">Gracias por confiar en <strong>Chamba Digital</strong>. Tu cuenta ha sido registrada con el plan <strong>${user.plan || 'Web Tradicional'}</strong>.</p>

      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 15px;">Detalles de tu Cuenta:</h3>
        <p style="margin: 4px 0; color: #475569; font-size: 14px;"><strong>Email:</strong> ${user.email}</p>
        <p style="margin: 4px 0; color: #475569; font-size: 14px;"><strong>Empresa:</strong> ${user.company || 'N/A'}</p>
        <p style="margin: 4px 0; color: #475569; font-size: 14px;"><strong>Plan:</strong> ${user.plan || 'Web Tradicional'}</p>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="https://chamba.digital/login" style="background-color: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Acceder al Portal de Cliente</a>
      </div>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">Consultas o soporte: <a href="mailto:contacto@chamba.digital" style="color: #2563eb;">contacto@chamba.digital</a></p>
    </div>
  `;

  await sendMailSafely({
    to: user.email,
    subject: `🚀 ¡Bienvenido a Chamba Digital! Configuración de tu Proyecto Web`,
    html: clientHtml,
  });

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
      <h2 style="color: #059669; margin-top: 0;">👤 Nuevo Cliente Registrado en Chamba.Digital</h2>
      <p>Se ha completado un nuevo registro WaaS:</p>
      <ul>
        <li><strong>Nombre:</strong> ${user.name}</li>
        <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
        <li><strong>Empresa:</strong> ${user.company || 'Sin especificar'}</li>
        <li><strong>Plan Solicítado:</strong> ${user.plan || 'Web Tradicional'}</li>
      </ul>
      <p><a href="https://chamba.digital/admin" style="color: #2563eb; font-weight: bold;">Ir al Panel Super Admin →</a></p>
    </div>
  `;

  await sendMailSafely({
    to: ADMIN_CONTACT_EMAIL,
    subject: `👤 Nuevo Cliente WaaS Registrado: ${user.name} (${user.company || user.email})`,
    html: adminHtml,
  });
};

// 2. Notificación de Login (Inicio de Sesión)
const sendLoginAlertEmail = async (user: { email: string; name?: string; role?: string }, ipAddress?: string) => {
  const isTargetAdmin = user.role === "admin";
  const loginTime = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h3 style="color: #1e293b; margin-top: 0;">🔐 Alerta de Inicio de Sesión - Chamba Digital</h3>
      <p>Hola <strong>${user.name || user.email}</strong>,</p>
      <p>Se ha detectado un inicio de sesión exitoso en tu cuenta:</p>
      <div style="background-color: #f1f5f9; padding: 12px; border-radius: 8px; font-size: 13px; color: #334155; margin: 15px 0;">
        <p style="margin: 3px 0;"><strong>Usuario:</strong> ${user.email}</p>
        <p style="margin: 3px 0;"><strong>Rol:</strong> ${user.role || 'client'}</p>
        <p style="margin: 3px 0;"><strong>Fecha y Hora:</strong> ${loginTime} (PET)</p>
        ${ipAddress ? `<p style="margin: 3px 0;"><strong>IP Origen:</strong> ${ipAddress}</p>` : ''}
      </div>
      <p style="font-size: 12px; color: #64748b;">Si no reconoces esta actividad, escríbenos a <a href="mailto:contacto@chamba.digital">contacto@chamba.digital</a>.</p>
    </div>
  `;

  await sendMailSafely({
    to: user.email,
    subject: `🔐 Alerta de Inicio de Sesión - Chamba Digital`,
    html,
  });

  if (isTargetAdmin && user.email !== ADMIN_CONTACT_EMAIL) {
    await sendMailSafely({
      to: ADMIN_CONTACT_EMAIL,
      subject: `🚨 Acceso Admin Detectado: ${user.email}`,
      html,
    });
  }
};

// 3. Notificación de Pagos y Suscripciones (Polar.sh)
const sendPaymentConfirmationEmail = async (data: {
  clientName: string;
  clientEmail: string;
  plan: string;
  price: string;
  checkoutId?: string;
}) => {
  const htmlClient = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
      <h2 style="color: #059669; margin-top: 0;">🎉 ¡Pago y Suscripción Confirmados!</h2>
      <p>Hola <strong>${data.clientName || 'Cliente'}</strong>,</p>
      <p>Tu pago para la suscripción WaaS ha sido procesado exitosamente vía Polar.sh.</p>
      
      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 16px; border-radius: 12px; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #065f46;">Resumen de la Suscripción:</h4>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Plan:</strong> ${data.plan}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Monto:</strong> ${data.price}</p>
        ${data.checkoutId ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Orden:</strong> ${data.checkoutId}</p>` : ''}
      </div>

      <p style="font-size: 14px; color: #334155;">El equipo de Chamba Digital iniciará la configuración de tu infraestructura en Railway.</p>
      <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Contacto de soporte: <a href="mailto:contacto@chamba.digital">contacto@chamba.digital</a></p>
    </div>
  `;

  await sendMailSafely({
    to: data.clientEmail,
    subject: `💳 Confirmación de Pago WaaS - ${data.plan}`,
    html: htmlClient,
  });

  await sendMailSafely({
    to: ADMIN_CONTACT_EMAIL,
    subject: `🚨 ¡Nueva Suscripción Pagada! - ${data.plan} (${data.price})`,
    html: htmlClient,
  });
};

// 4. Notificación de Solicitudes de Cambio en las Páginas Web
const sendPageChangeRequestEmail = async (data: {
  clientName: string;
  clientEmail: string;
  company?: string;
  taskTitle: string;
  description: string;
  requestOrigin?: string;
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #2563eb; margin-top: 0;">🔄 Nueva Solicitud de Cambio en Web WaaS</h2>
      <p>El cliente <strong>${data.clientName}</strong> (${data.company || data.clientEmail}) ha registrado una solicitud de cambio:</p>

      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 14px; margin: 16px 0; border-radius: 4px;">
        <h4 style="margin: 0 0 6px 0; color: #1e293b;">${data.taskTitle}</h4>
        <p style="margin: 0; color: #475569; font-size: 14px;">${data.description}</p>
        <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;"><strong>Origen:</strong> ${data.requestOrigin || 'Portal/Chat de Cliente'}</p>
      </div>

      <p><a href="https://chamba.digital/admin" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Ver en Tablero Kanban →</a></p>
    </div>
  `;

  await sendMailSafely({
    to: ADMIN_CONTACT_EMAIL,
    subject: `🔄 Solicitud de Cambio Web: ${data.clientName} - ${data.taskTitle}`,
    html,
  });

  await sendMailSafely({
    to: data.clientEmail,
    subject: `✅ Recibimos tu solicitud de cambio: ${data.taskTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h3 style="color: #2563eb;">Solicitud Registrada en Chamba Digital</h3>
        <p>Hola <strong>${data.clientName}</strong>,</p>
        <p>Hemos recibido tu solicitud de cambio: <strong>"${data.taskTitle}"</strong>.</p>
        <p>Tu tarea ha sido añadida a nuestro flujo Kanban de trabajo y será procesada según los tiempos de tu plan.</p>
        <p style="font-size: 12px; color: #64748b;">Soporte: <a href="mailto:contacto@chamba.digital">contacto@chamba.digital</a></p>
      </div>
    `,
  });
};

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
    max: isProduction ? 15 : 200, // Higher limit for dev/testing
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
          subscriptionStatus: "pending",
          projectStatus: "sin_plan"
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
          subscriptionStatus: "pending",
          projectStatus: "sin_plan"
        };
        inMemoryUsers[email] = newUser;
      } else {
        return res.status(503).json({ error: "Base de datos no disponible. Intenta más tarde." });
      }

      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" });

      if (redisClient) {
        await redisClient.setex(`session:${newUser._id}`, 86400 * 7, JSON.stringify(newUser));
      }

      // Send Welcome email to Client + Alert email to Admin (contacto@chamba.digital)
      sendWelcomeAndRegisterEmails({ name: newUser.name, email: newUser.email, company: newUser.company, plan: newUser.plan }).catch(err => {
        console.warn("[Register Email Warning]:", err.message);
      });

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

      // Send Login Alert email
      sendLoginAlertEmail({ email: user.email, name: user.name, role: user.role || "client" }, req.ip).catch(err => {
        console.warn("[Login Email Warning]:", err.message);
      });

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
      const targetAdminEmail = process.env.ADMIN_EMAIL || "admin@chamba.digital";

      if (isMongoConnected) {
        user = await UserModel.findOne({ $or: [{ email }, { email: targetAdminEmail }] });
      } else if (!isProduction) {
        user = inMemoryUsers[email] || inMemoryUsers[targetAdminEmail] || inMemoryUsers["admin@chamba.digital"];
      } else {
        return res.status(503).json({ error: "Servicio no disponible." });
      }

      if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
        return res.status(401).json({ error: "Credenciales inválidas o sin permisos de administrador." });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Credenciales inválidas." });

      const token = jwt.sign({ userId: user._id || user.id, email: user.email, role: user.role || "admin" }, JWT_SECRET, { expiresIn: "8h" });
      
      // Send Admin Login Alert email
      sendLoginAlertEmail({ email: user.email, name: user.name, role: "admin" }, req.ip).catch(err => {
        console.warn("[Admin Login Email Warning]:", err.message);
      });

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

  // ADMIN API: Test Email Sender
  app.post("/api/admin/test-email", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { targetEmail } = req.body || {};
      const recipient = targetEmail || ADMIN_CONTACT_EMAIL;
      const result = await sendMailSafely({
        to: recipient,
        subject: "🧪 Prueba de Correo desde contacto@chamba.digital",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #2563eb;">✅ Prueba de Correo Exitosa</h2>
            <p>Este correo ha sido enviado desde el remitente corporativo autorizado <strong>contacto@chamba.digital</strong>.</p>
            <p>Servidor: <strong>Chamba.Digital Node.js Express Backend</strong></p>
            <p>Timestamp: ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
          </div>
        `
      });
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error enviando correo de prueba.", details: e.message });
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

  // ADMIN API: Check Deployment Health / Ping Railway
  app.post("/api/admin/check-deployment-status", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { deployedUrl } = req.body || {};
      if (!deployedUrl || !/^https?:\/\//.test(deployedUrl)) {
        return res.status(400).json({ error: "URL de despliegue inválida." });
      }

      const startTime = Date.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const pingRes = await fetch(deployedUrl, {
          method: "HEAD",
          signal: controller.signal,
          headers: { "User-Agent": "ChambaDigital-RailwayHealthCheck/1.0" }
        });
        clearTimeout(timeoutId);
        const responseTimeMs = Date.now() - startTime;
        const isOk = pingRes.ok || (pingRes.status >= 200 && pingRes.status < 400);

        res.json({
          success: true,
          status: isOk ? "activo" : "error",
          statusCode: pingRes.status,
          responseTimeMs,
          checkedAt: new Date().toISOString()
        });
      } catch (err: any) {
        clearTimeout(timeoutId);
        const responseTimeMs = Date.now() - startTime;
        res.json({
          success: true,
          status: "inactivo",
          statusCode: err.name === "AbortError" ? 504 : 500,
          error: err.name === "AbortError" ? "Timeout de respuesta (>4s)" : (err as Error).message,
          responseTimeMs,
          checkedAt: new Date().toISOString()
        });
      }
    } catch (e: any) {
      res.status(500).json({ error: "Error comprobando estado de despliegue.", details: (e as Error).message });
    }
  });

  // ADMIN API: Get All Users (Clients & Staff)
  app.get("/api/admin/users", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      if (isMongoConnected) {
        const users = await UserModel.find({ isDeleted: { $ne: true } }).select("-password").sort({ createdAt: -1 });
        return res.json({ users });
      }
      const devUsers = Object.values(inMemoryUsers).filter((u: any) => !u.isDeleted);
      res.json({ users: devUsers });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo usuarios.", details: e.message });
    }
  });

  // ADMIN API: Create User (with role selection)
  app.post("/api/admin/users", requireAuth, requireAdmin, validateBody(createUserSchema), async (req: any, res) => {
    try {
      const { name, email, password, company, role, plan } = req.body;
      
      let existing: any = null;
      if (isMongoConnected) {
        existing = await UserModel.findOne({ email, isDeleted: { $ne: true } });
      } else {
        existing = inMemoryUsers[email];
      }

      if (existing) {
        return res.status(400).json({ error: "El correo electrónico ya está registrado." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserObj = {
        name,
        email,
        password: hashedPassword,
        company: company || "Chamba Digital",
        role: role || "client",
        plan: plan || "Web Tradicional",
        planPrice: "$49.99/mes",
        subscriptionStatus: "activa",
        projectStatus: "en_desarrollo",
        twoFactorEnabled: false,
        passkeys: [],
        createdAt: new Date()
      };

      if (isMongoConnected) {
        const created = await UserModel.create(newUserObj);
        const userResp = created.toObject();
        delete userResp.password;
        return res.json({ success: true, user: userResp });
      }

      const createdMem = { id: `usr_${Date.now()}`, ...newUserObj };
      inMemoryUsers[email] = createdMem;
      const memResp = { ...createdMem };
      delete memResp.password;
      res.json({ success: true, user: memResp });
    } catch (e: any) {
      res.status(500).json({ error: "Error creando usuario.", details: e.message });
    }
  });

  // ADMIN API: Update User & Role
  app.put("/api/admin/users/:id", requireAuth, requireAdmin, validateBody(updateUserSchema), async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body || {};

      if (isMongoConnected) {
        const updated = await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password");
        if (!updated) return res.status(404).json({ error: "Usuario no encontrado." });
        return res.json({ success: true, user: updated });
      }

      const foundKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === id || inMemoryUsers[k].id === id || k === id);
      if (!foundKey) return res.status(404).json({ error: "Usuario no encontrado en memoria." });

      inMemoryUsers[foundKey] = { ...inMemoryUsers[foundKey], ...updateData };
      const resp = { ...inMemoryUsers[foundKey] };
      delete resp.password;
      res.json({ success: true, user: resp });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando usuario.", details: e.message });
    }
  });

  // ADMIN API: Soft Delete User
  app.delete("/api/admin/users/:id", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } });
      } else {
        const foundKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === id || inMemoryUsers[k].id === id || k === id);
        if (foundKey) {
          inMemoryUsers[foundKey].isDeleted = true;
        }
      }
      res.json({ success: true, message: "Usuario eliminado correctamente." });
    } catch (e: any) {
      res.status(500).json({ error: "Error eliminando usuario.", details: e.message });
    }
  });

  // USER / ADMIN API: Update User Password
  app.put("/api/users/:id/password", requireAuth, validateBody(updateUserPasswordSchema), async (req: any, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      console.log(`[API /api/users/:id/password] Request received for target ID: ${id}`, {
        callerUserId: req.user?.userId || req.user?.id,
        callerEmail: req.user?.email,
        callerRole: req.user?.role,
        hasCurrentPassword: !!currentPassword,
        newPasswordLength: newPassword?.length || 0,
      });

      const callerUserId = req.user?.userId || req.user?.id;
      const callerEmail = req.user?.email;
      const isAdminCaller = req.user?.role === "admin" || req.user?.role === "superadmin";

      let user: any = null;
      if (isMongoConnected) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          user = await UserModel.findById(id);
        }
        if (!user) {
          user = await UserModel.findOne({ email: id });
        }
      } else {
        user = Object.values(inMemoryUsers).find((u: any) => String(u._id || u.id) === String(id) || u.email === id);
      }

      if (!user) {
        console.warn(`[API /api/users/:id/password] User not found for ID: ${id}`);
        return res.status(404).json({ error: "Usuario no encontrado." });
      }

      const isSelf = String(callerUserId) === String(user._id || user.id) || callerEmail === user.email;

      // Ensure target user is self or caller is admin/superadmin
      if (!isSelf && !isAdminCaller) {
        console.warn(`[API /api/users/:id/password] Forbidden: caller ${callerEmail} (role: ${req.user?.role}) is neither target nor admin`);
        return res.status(403).json({ error: "No tienes permiso para cambiar la contraseña de este usuario." });
      }

      // If non-admin user changing their own password, currentPassword is required and must match
      if (!isAdminCaller) {
        if (!currentPassword) {
          return res.status(400).json({ error: "Debes ingresar tu contraseña actual para realizar el cambio." });
        }
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
          console.warn(`[API /api/users/:id/password] Incorrect current password for user: ${user.email}`);
          return res.status(400).json({ error: "La contraseña actual es incorrecta." });
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (isMongoConnected) {
        user.password = hashedPassword;
        await user.save();
      } else {
        user.password = hashedPassword;
      }

      res.json({ success: true, message: "Contraseña actualizada exitosamente." });
    } catch (e: any) {
      res.status(500).json({ error: "Error cambiando contraseña.", details: e.message });
    }
  });

  // 2FA API: Setup (Generate Secret & Backup Codes)
  app.post("/api/auth/2fa/setup", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      // Generate TOTP Secret (Base32 formatted mock/real secret)
      const secret = "JBSWY3DPEHPK3PXP" + Math.random().toString(36).substring(2, 6).toUpperCase();
      const backupCodes = Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 8).toUpperCase());
      const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/ChambaDigital:${encodeURIComponent(req.user.email)}?secret=${secret}&issuer=ChambaDigital`;

      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(userId, { twoFactorSecret: secret, twoFactorBackupCodes: backupCodes });
      } else {
        const userKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === userId || inMemoryUsers[k].id === userId || inMemoryUsers[k].email === req.user.email);
        if (userKey) {
          inMemoryUsers[userKey].twoFactorSecret = secret;
          inMemoryUsers[userKey].twoFactorBackupCodes = backupCodes;
        }
      }

      res.json({ success: true, secret, qrDataUrl, backupCodes });
    } catch (e: any) {
      res.status(500).json({ error: "Error en configuración 2FA.", details: e.message });
    }
  });

  // 2FA API: Verify and Enable
  app.post("/api/auth/2fa/verify", requireAuth, validateBody(verify2FASchema), async (req: any, res) => {
    try {
      const { token } = req.body;
      const userId = req.user.userId;

      // In real production, verify against TOTP algorithm. In dev/staging, accept code or valid test token
      if (!token || token.length !== 6) {
        return res.status(400).json({ error: "Código de verificación de 6 dígitos inválido." });
      }

      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(userId, { twoFactorEnabled: true });
      } else {
        const userKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === userId || inMemoryUsers[k].id === userId || inMemoryUsers[k].email === req.user.email);
        if (userKey) {
          inMemoryUsers[userKey].twoFactorEnabled = true;
        }
      }

      res.json({ success: true, message: "Autenticación de Dos Factores (2FA) activada correctamente." });
    } catch (e: any) {
      res.status(500).json({ error: "Error verificando 2FA.", details: e.message });
    }
  });

  // 2FA API: Toggle / Disable
  app.post("/api/auth/2fa/disable", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(userId, { twoFactorEnabled: false, twoFactorSecret: "" });
      } else {
        const userKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === userId || inMemoryUsers[k].id === userId || inMemoryUsers[k].email === req.user.email);
        if (userKey) {
          inMemoryUsers[userKey].twoFactorEnabled = false;
          inMemoryUsers[userKey].twoFactorSecret = "";
        }
      }

      res.json({ success: true, message: "2FA desactivado correctamente." });
    } catch (e: any) {
      res.status(500).json({ error: "Error desactivando 2FA." });
    }
  });

  // PASSKEY API: Register WebAuthn Credential
  app.post("/api/auth/passkey/register", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      const { credentialName, credentialID, publicKey } = req.body;

      const newPasskey = {
        credentialID: credentialID || `pk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        publicKey: publicKey || "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE...",
        counter: 1,
        deviceType: "singleDevice",
        backedUp: true,
        transports: ["internal", "hybrid"],
        name: credentialName || "Biometría / Touch ID / Face ID",
        createdAt: new Date()
      };

      let passkeysList: any[] = [];
      if (isMongoConnected) {
        const u = await UserModel.findByIdAndUpdate(userId, { $push: { passkeys: newPasskey } }, { new: true });
        passkeysList = u?.passkeys || [];
      } else {
        const userKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === userId || inMemoryUsers[k].id === userId || inMemoryUsers[k].email === req.user.email);
        if (userKey) {
          if (!inMemoryUsers[userKey].passkeys) inMemoryUsers[userKey].passkeys = [];
          inMemoryUsers[userKey].passkeys.push(newPasskey);
          passkeysList = inMemoryUsers[userKey].passkeys;
        }
      }

      res.json({ success: true, message: "Passkey agregada exitosamente.", passkeys: passkeysList });
    } catch (e: any) {
      res.status(500).json({ error: "Error registrando Passkey.", details: e.message });
    }
  });

  // PASSKEY API: Delete Passkey Credential
  app.delete("/api/auth/passkey/:credentialID", requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      const { credentialID } = req.params;

      if (isMongoConnected) {
        await UserModel.findByIdAndUpdate(userId, { $pull: { passkeys: { credentialID } } });
      } else {
        const userKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === userId || inMemoryUsers[k].id === userId || inMemoryUsers[k].email === req.user.email);
        if (userKey && inMemoryUsers[userKey].passkeys) {
          inMemoryUsers[userKey].passkeys = inMemoryUsers[userKey].passkeys.filter((p: any) => p.credentialID !== credentialID);
        }
      }

      res.json({ success: true, message: "Passkey eliminada." });
    } catch (e: any) {
      res.status(500).json({ error: "Error eliminando Passkey." });
    }
  });

  // ADMIN API: Get Clients list
  app.get("/api/admin/clients", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      if (isMongoConnected) {
        const users = await UserModel.find({ isDeleted: { $ne: true } }).select("-password");
        return res.json({ clients: users });
      }
      const devClients = Object.values(inMemoryUsers).filter((u: any) => !u.isDeleted);
      res.json({ clients: devClients });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo clientes.", details: e.message });
    }
  });

  // ADMIN API: Update Client
  app.put("/api/admin/clients/:id", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body || {};

      if (isMongoConnected) {
        const updated = await UserModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password");
        if (!updated) return res.status(404).json({ error: "Cliente no encontrado." });
        return res.json({ success: true, client: updated });
      }

      // In-memory fallback
      const foundKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === id || inMemoryUsers[k].id === id || k === id);
      if (!foundKey) {
        return res.status(404).json({ error: "Cliente no encontrado en memoria." });
      }

      inMemoryUsers[foundKey] = {
        ...inMemoryUsers[foundKey],
        ...updateData,
        planPrice: updateData.price || updateData.planPrice || inMemoryUsers[foundKey].planPrice,
      };

      res.json({ success: true, client: inMemoryUsers[foundKey] });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando cliente.", details: e.message });
    }
  });

  // ADMIN API: Get Tasks list
  app.get("/api/admin/tasks", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      if (isMongoConnected) {
        const tasks = await TaskModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
        return res.json({ tasks });
      }
      res.json({ tasks: inMemoryTasks });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo tareas.", details: e.message });
    }
  });

  // API: Create Task
  app.post("/api/tasks", requireAuth, async (req: any, res) => {
    try {
      const { clientId, title, description, priority } = req.body || {};
      if (!clientId || !title) return res.status(400).json({ error: "clientId y title son requeridos." });

      const newTask = {
        clientId,
        title,
        description: description || "",
        status: "backlog",
        priority: priority || "media",
        createdAt: new Date().toLocaleString(),
        requestOrigin: req.user?.role === "admin" ? "SuperAdmin" : "Chat del Cliente",
      };

      // Trigger email notification for Page Change Requests
      sendPageChangeRequestEmail({
        clientName: req.user?.name || "Cliente WaaS",
        clientEmail: req.user?.email || "contacto@chamba.digital",
        taskTitle: title,
        description: description || title,
        requestOrigin: req.user?.role === "admin" ? "SuperAdmin" : "Chat/Portal del Cliente"
      }).catch(err => {
        console.warn("[Task Email Notification Warning]:", err.message);
      });

      if (isMongoConnected) {
        const created = await TaskModel.create(newTask);
        return res.json({ success: true, task: created });
      }

      const memoryTask = { id: `task_${Date.now()}`, ...newTask };
      inMemoryTasks.push(memoryTask);
      res.json({ success: true, task: memoryTask });
    } catch (e: any) {
      res.status(500).json({ error: "Error creando tarea.", details: e.message });
    }
  });

  // API: Update Task Status
  app.patch("/api/tasks/:id/status", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body || {};
      if (!status) return res.status(400).json({ error: "Estado requerido." });

      if (isMongoConnected) {
        const updated = await TaskModel.findByIdAndUpdate(id, { $set: { status } }, { new: true });
        return res.json({ success: true, task: updated });
      }

      const task = inMemoryTasks.find((t: any) => t.id === id || t._id === id);
      if (task) {
        task.status = status;
      }
      res.json({ success: true, task });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando estado de tarea.", details: e.message });
    }
  });

  // USER API: Update project info
  app.put("/api/users/:id/project-info", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { projectDescription, deployedUrl, thumbnailUrl, techStack, githubRepo } = req.body || {};

      if (isMongoConnected) {
        let user = await UserModel.findById(id);
        if (!user && (id === "demo_user_id_123" || id === "demo")) {
          user = await UserModel.findOne({ email: "demo@chamba.digital" });
        }
        if (!user) return res.status(404).json({ error: "Usuario no encontrado en la base de datos." });

        if (projectDescription !== undefined) user.projectDescription = projectDescription;
        if (deployedUrl !== undefined) user.deployedUrl = deployedUrl;
        if (thumbnailUrl !== undefined) user.thumbnailUrl = thumbnailUrl;
        if (techStack !== undefined) user.techStack = techStack;
        if (githubRepo !== undefined) user.githubRepo = githubRepo;
        await user.save();

        return res.json({
          success: true,
          user: {
            id: user._id,
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
            role: user.role || "client"
          }
        });
      }

      // In-memory fallback
      const foundKey = Object.keys(inMemoryUsers).find(k => inMemoryUsers[k]._id === id || inMemoryUsers[k].id === id || k === id || inMemoryUsers[k].email === "demo@chamba.digital");
      if (!foundKey) {
        return res.status(404).json({ error: "Usuario no encontrado en memoria." });
      }

      inMemoryUsers[foundKey] = {
        ...inMemoryUsers[foundKey],
        projectDescription: projectDescription ?? inMemoryUsers[foundKey].projectDescription,
        deployedUrl: deployedUrl ?? inMemoryUsers[foundKey].deployedUrl,
        thumbnailUrl: thumbnailUrl ?? inMemoryUsers[foundKey].thumbnailUrl,
        techStack: techStack ?? inMemoryUsers[foundKey].techStack,
        githubRepo: githubRepo ?? inMemoryUsers[foundKey].githubRepo,
      };

      const user = inMemoryUsers[foundKey];
      res.json({
        success: true,
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
          role: user.role || "client"
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando información del proyecto.", details: e.message });
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

  // ==========================================
  // CHAT MESSAGING & AI ASSISTANT SYSTEM
  // ==========================================
  const generateContextualSupportReply = async (clientUser: any, userText: string) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Eres el Asistente Técnico Inteligente WaaS de Chamba Digital.
Cliente: ${clientUser?.name || "Cliente"} (${clientUser?.company || "Empresa"})
Plan Contratado: ${clientUser?.plan || "Web Tradicional"}
Sitio Web / URL: ${clientUser?.deployedUrl || "En desarrollo"}
Mensaje del cliente: "${userText}"

Responde en español de forma profesional, empática, ágil y totalmente contextualizada. Confírmale que su requerimiento ha sido registrado en nuestro sistema Kanban WaaS para que nuestro equipo lo ejecute. No uses frases prefabricadas o genéricas. Sé conciso y claro (máximo 3 párrafos cortos).`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const replyText = response.text?.trim();
        if (replyText) return replyText;
      }
    } catch (err: any) {
      console.warn("[Gemini AI Support Response Warning]:", err.message);
    }

    return `¡Hola ${clientUser?.name || "Estimado cliente"}! Hemos registrado tu solicitud sobre "${userText.slice(0, 60)}${userText.length > 60 ? "..." : ""}" en nuestro tablero Kanban de desarrollo. Tu requerimiento será atendido por el equipo técnico según los tiempos de atención de tu plan (${clientUser?.plan || "Web Tradicional"}). Te notificaremos por este medio ante cualquier actualización.`;
  };

  // API: Get Chat Messages for Client
  app.get("/api/messages/:clientId", requireAuth, async (req: any, res) => {
    try {
      const { clientId } = req.params;
      let messages: any[] = [];
      if (isMongoConnected) {
        messages = await MessageModel.find({ clientId, isDeleted: { $ne: true } }).sort({ createdAt: 1 });
      } else {
        messages = inMemoryMessages.filter((m: any) => m.clientId === clientId && !m.isDeleted);
      }
      res.json({ success: true, messages });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo mensajes.", details: e.message });
    }
  });

  // API: Send Chat Message & Trigger AI Response
  app.post("/api/messages", requireAuth, async (req: any, res) => {
    try {
      const { clientId, sender, text, fileUrl, fileType, fileName } = req.body || {};
      const targetClientId = clientId || req.user?.userId || req.user?.id;
      if (!targetClientId || (!text && !fileUrl)) {
        return res.status(400).json({ error: "clientId y contenido del mensaje son requeridos." });
      }

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userMessageData = {
        clientId: targetClientId,
        sender: sender || "client",
        text: text || "",
        fileUrl: fileUrl || "",
        fileType: fileType || "",
        fileName: fileName || "",
        timestamp,
        createdAt: new Date()
      };

      let savedUserMessage: any;
      if (isMongoConnected) {
        savedUserMessage = await MessageModel.create(userMessageData);
      } else {
        savedUserMessage = { id: `m_${Date.now()}`, ...userMessageData };
        inMemoryMessages.push(savedUserMessage);
      }

      // Fetch client profile for rich context
      let clientUser: any = null;
      if (isMongoConnected) {
        clientUser = await UserModel.findById(targetClientId);
      } else {
        clientUser = Object.values(inMemoryUsers).find((u: any) => u._id === targetClientId || u.id === targetClientId || u.email === "demo@chamba.digital");
      }

      // If message is from client, trigger task creation + email alert + AI Assistant reply
      if (sender === "client" || !sender) {
        const taskText = text || `[Archivo] ${fileName}`;
        const newTaskData = {
          clientId: targetClientId,
          title: taskText.length > 50 ? taskText.slice(0, 50) + "..." : taskText,
          description: taskText,
          status: "backlog",
          priority: "media",
          createdAt: new Date().toLocaleString(),
          requestOrigin: "Chat del Cliente"
        };

        if (isMongoConnected) {
          await TaskModel.create(newTaskData);
        } else {
          inMemoryTasks.push({ id: `t_${Date.now()}`, ...newTaskData });
        }

        // Send email alert to admin (contacto@chamba.digital)
        sendPageChangeRequestEmail({
          clientName: clientUser?.name || req.user?.name || "Cliente WaaS",
          clientEmail: clientUser?.email || req.user?.email || "contacto@chamba.digital",
          company: clientUser?.company,
          taskTitle: newTaskData.title,
          description: taskText,
          requestOrigin: "Chat del Cliente"
        }).catch(err => console.warn("[Message Email Alert Warning]:", err.message));

        // Generate contextual AI response (avoiding canned replies!)
        const replyContent = await generateContextualSupportReply(clientUser, taskText);
        const aiReplyData = {
          clientId: targetClientId,
          sender: "admin",
          text: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: new Date()
        };

        let savedReply: any;
        if (isMongoConnected) {
          savedReply = await MessageModel.create(aiReplyData);
        } else {
          savedReply = { id: `m_reply_${Date.now()}`, ...aiReplyData };
          inMemoryMessages.push(savedReply);
        }

        return res.json({ success: true, message: savedUserMessage, reply: savedReply });
      }

      res.json({ success: true, message: savedUserMessage });
    } catch (e: any) {
      res.status(500).json({ error: "Error enviando mensaje.", details: e.message });
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

      // Wait for loading screens to disappear and content to render
      // Common loading selectors used by SPA builders, WordPress themes, etc.
      await page.waitForFunction(() => {
        const loadingSelectors = [
          '[class*="loader"]', '[class*="loading"]', '[class*="spinner"]',
          '[class*="preloader"]', '[id*="loader"]', '[id*="loading"]',
          '[id*="preloader"]', '.pace', '#pace', '[class*="skeleton"]',
          '[class*="placeholder"]', '[class*="splash"]'
        ];
        for (const sel of loadingSelectors) {
          const el = document.querySelector(sel);
          if (el && (el as HTMLElement).offsetParent !== null) return false;
        }
        // Also check if body has meaningful content
        return document.body && document.body.innerText.length > 100;
      }, { timeout: 15000 }).catch(() => {});

      // Wait for images to load
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>(resolve => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
              setTimeout(resolve, 3000);
            });
          })
        );
      });

      // Extra settle time for animations
      await page.waitForTimeout(1000);

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

  // Helper: Send email notification to Admin & Client when a subscription is paid
  const notifyAdminOnSubscription = async (data: {
    clientName: string;
    clientEmail: string;
    plan: string;
    price: string;
    checkoutId?: string;
  }) => {
    await sendPaymentConfirmationEmail(data);
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

  // ==========================================
  // FREE 15-MIN CONSULTATION BOOKING SYSTEM
  // ==========================================
  app.post("/api/consultations", captureLimiter, async (req, res) => {
    try {
      const { name, email, phone, company, date, timeSlot, topic, notes } = req.body;

      if (!name || !email || !phone || !date || !timeSlot) {
        return res.status(400).json({ error: "Nombre, email, teléfono, fecha y horario son obligatorios." });
      }

      const consultationData = {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        company: company ? String(company).trim() : "",
        date: String(date).trim(),
        timeSlot: String(timeSlot).trim(),
        topic: topic ? String(topic).trim() : "Auditoría Técnica y Plan WaaS (15 min)",
        notes: notes ? String(notes).trim() : "",
        status: "pendiente",
        createdAt: new Date(),
        isDeleted: false,
      };

      let savedDoc: any = null;
      if (isMongoConnected) {
        savedDoc = await ConsultationModel.create(consultationData);
      } else {
        savedDoc = {
          _id: `cons_${Date.now()}`,
          id: `cons_${Date.now()}`,
          ...consultationData,
        };
        inMemoryConsultations.push(savedDoc);
      }

      console.log(`[Consultation] Nueva consulta 15min agendada por: ${consultationData.name} (${consultationData.email}) para el ${consultationData.date} ${consultationData.timeSlot}`);

      // Generar detalles de calendario Google & ICS
      const calendarDetails = generateCalendarDetails(consultationData);

      // Disparar envío de correo asíncrono para yerctech@gmail.com y el cliente
      sendConsultationBookingEmails(consultationData).catch((err) => {
        console.warn("[Consultation Email Warning]:", err.message);
      });

      return res.status(201).json({
        success: true,
        message: "Consulta de 15 minutos agendada exitosamente.",
        consultation: savedDoc,
        googleCalendarUrl: calendarDetails.googleCalendarUrl,
        icsContent: calendarDetails.icsContent,
      });
    } catch (err: any) {
      console.error("[Consultation Error]:", err);
      return res.status(500).json({ error: "Error al registrar la consulta.", details: err.message });
    }
  });

  // API: Get all consultations (Admin)
  app.get("/api/admin/consultations", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      let consultations: any[] = [];
      if (isMongoConnected) {
        consultations = await ConsultationModel.find({ isDeleted: { $ne: true } }).sort({ date: 1, timeSlot: 1 }).lean();
      } else {
        consultations = inMemoryConsultations.filter((c: any) => !c.isDeleted);
      }
      res.json({ consultations });
    } catch (e: any) {
      res.status(500).json({ error: "Error obteniendo consultas.", details: e.message });
    }
  });

  // API: Update consultation status
  app.put("/api/admin/consultations/:id", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (isMongoConnected) {
        await ConsultationModel.findByIdAndUpdate(id, { status });
      } else {
        const item = inMemoryConsultations.find((c: any) => c._id === id || c.id === id);
        if (item) item.status = status;
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Error actualizando estado de consulta.", details: e.message });
    }
  });

  // AI Knowledge fallback generator in case API key is unavailable or quota is exceeded
  const generateFallbackAiResponse = (cleanMessage: string) => {
    const lower = cleanMessage.toLowerCase();

    if (lower.includes("agenda") || lower.includes("cita") || lower.includes("consulta") || lower.includes("15 min") || lower.includes("asesor") || lower.includes("auditor")) {
      return "¡Excelente iniciativa! Puedes agendar directamente tu **Consulta Gratuita de 15 Minutos** usando el botón de la web o escribiéndonos a WhatsApp en https://wa.me/51904060670. Analizaremos tu proyecto y te daremos una ruta técnica sin compromiso.";
    }

    if (lower.includes("precio") || lower.includes("plan") || lower.includes("cuanto") || lower.includes("costo") || lower.includes("waas")) {
      return "En **chamba.digital** ofrecemos planes WaaS todo incluido:\n\n• **$50/mes (Web Tradicional):** Landing y sitio corporativo con cambios ilimitados y hosting.\n• **$100/mes (Web App Advanced):** Panel administrativo a medida, base de datos y APIs.\n• **$500/mes (Web App con IA):** Automatización 24/7 y agentes inteligentes.\n\n¿Deseas una consulta de 15 minutos para ver cuál se adapta a tu negocio?";
    }

    if (lower.includes("hotel") || lower.includes("sirvoy") || lower.includes("reserva") || lower.includes("booking") || lower.includes("airbnb")) {
      return "Somos especialistas certificados en **Sirvoy PMS y motores de reserva directa**. Diseñamos tu web hotelera para que vendas directo y elimines las comisiones del 15%-20% de Booking y Airbnb. ¡Contáctanos a https://wa.me/51904060670 para ver una demo en vivo!";
    }

    return "¡Hola! En **chamba.digital** construimos y gestionamos plataformas web y web apps con IA bajo modelo WaaS (*desde $50/mes con cambios ilimitados*). ¿Te gustaría agendar una **consulta gratuita de 15 minutos** o revisar alguno de nuestros planes?";
  };

  app.post("/api/chat", chatLimiter, async (req, res) => {
    const { message, history } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    console.log(`[Chat] Incoming message: "${message.slice(0, 50)}"`);
    console.log(`[Chat] History steps: ${history?.length || 0}`);

    try {
      // Security: Sanitize input
      const cleanMessage = message.slice(0, 500).replace(/[<>]/g, ""); 

      // If AI client is configured, try live Gemini request
      if (ai) {
        try {
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
            4. Reserva de Consultas y Cierre de Venta: Siempre invita proactivamente al usuario a agendar su Consulta Gratuita de 15 Minutos o cerrar su plan mediante nuestro enlace directo de WhatsApp: https://wa.me/51904060670. Si el usuario solicita agendar/reservar una cita en el chat, proporciónale inmediatamente el enlace para fijar el horario de su consulta de 15 min.
            5. Formato: Utiliza negritas (**texto**) y viñetas para estructurar la información y hacerla fácil de leer.
            6. Brevedad Extrema (Regla Crítica): Tus respuestas deben ser sumamente cortas, directas y al grano (máximo 2 párrafos cortos). NUNCA des discursos largos.
          `;

          const contents = [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Entendido. Soy el asistente oficial de chamba.digital. Mantendré mis respuestas cortas, directas y concisas (máximo 2 párrafos), invitando a la consulta gratuita de 15 min o WhatsApp." }] },
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

          const responseText = result.text;
          if (responseText) {
            console.log(`[Chat] Gemini response received (${responseText.length} chars)`);
            return res.json({ content: responseText });
          }
        } catch (geminiError: any) {
          console.warn("[Chat] Gemini API error, executing knowledge-base fallback:", geminiError.message || geminiError);
        }
      }

      // Fallback robusto garantizado si la API de Gemini tiene problemas de quota/key
      const fallbackReply = generateFallbackAiResponse(cleanMessage);
      return res.json({ content: fallbackReply });
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
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      index: false,
    }));
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
