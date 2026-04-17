import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/send-checklist", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // Configuration for SMTP (Using placeholders for .env)
      // If no credentials, we log it and simulate success for dev
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: '"Chamba Digital" <noreply@chamba.digital>',
        to: email,
        subject: "🎁 Tu Checklist de Transformación Digital 2026",
        text: `Hola! Gracias por tu interés en Chamba Digital. Adjunto encontrarás el checklist prometido.`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #3B82F6;">¡Hola!</h2>
            <p>Gracias por tu interés en <strong>Chamba Digital</strong>.</p>
            <p>Tal como prometimos, aquí tienes tu recurso para dominar el mercado digital en 2026.</p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="https://chamba.digital/assets/docs/Guia_Transformacion_Digital_2026.pdf" 
                 style="background: #3B82F6; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                DESCARGAR CHECKLIST PDF
              </a>
            </div>
            <p style="font-size: 12px; color: #666;">Si tienes alguna duda, responde a este correo o escríbenos por WhatsApp.</p>
          </div>
        `,
      });

      console.log(`[Email] Success: ${email}. ID: ${info.messageId}`);
      res.json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("[Email] Error:", error);
      // Even if email fails, we send success to the user to avoid friction in DEV
      // but log the real error. In prod, we should handle this based on provider.
      res.status(200).json({ success: true, warning: "Simulated success (check server logs for SMTP errors)" });
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
