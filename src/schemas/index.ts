import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().trim().email("El correo electrónico no es válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  company: z.string().trim().optional(),
  plan: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("El correo electrónico no es válido."),
  password: z.string().min(1, "La contraseña es requerida."),
});

export const createMessageSchema = z.object({
  clientId: z.string().optional(),
  sender: z.enum(["client", "admin", "system"]).optional().default("client"),
  text: z.string().optional().default(""),
  fileUrl: z.string().optional().default(""),
  fileType: z.string().optional().default(""),
  fileName: z.string().optional().default(""),
}).refine((data) => (data.text && data.text.trim().length > 0) || (data.fileUrl && data.fileUrl.length > 0), {
  message: "El mensaje debe incluir texto o un archivo adjunto.",
  path: ["text"],
});

export const createTaskSchema = z.object({
  clientId: z.string().min(1, "El ID del cliente es obligatorio."),
  title: z.string().trim().min(2, "El título debe tener al menos 2 caracteres."),
  description: z.string().trim().optional().default(""),
  priority: z.enum(["alta", "media", "baja"]).optional().default("media"),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(["backlog", "en_progreso", "revision", "completado"], {
    error: "Estado inválido.",
  }),
});

export const checkoutSchema = z.object({
  productId: z.string().optional(),
  tier: z.string().optional(),
});

export const updateProjectInfoSchema = z.object({
  projectDescription: z.string().optional(),
  deployedUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  techStack: z.string().optional(),
  githubRepo: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("El correo electrónico no es válido."),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "El token de recuperación es requerido."),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres."),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().trim().email("El correo electrónico no es válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  company: z.string().trim().optional().default("Chamba Digital"),
  role: z.enum(["client", "manager", "admin", "superadmin"]).optional().default("client"),
  plan: z.string().trim().optional().default("Web Tradicional"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres.").optional().or(z.literal("")),
  email: z.string().trim().email("El correo electrónico no es válido.").optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  role: z.enum(["client", "manager", "admin", "superadmin"]).optional(),
  plan: z.string().trim().optional().or(z.literal("")),
  projectStatus: z.string().optional(),
  subscriptionStatus: z.string().optional(),
});

export const updateUserPasswordSchema = z.object({
  currentPassword: z.string().optional().nullable().or(z.literal("")),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres."),
});

export const verify2FASchema = z.object({
  token: z.string().length(6, "El código de verificación debe ser de 6 dígitos."),
});


export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map((i) => i.message).join(" ");
      return res.status(400).json({ error: issues, details: result.error.issues });
    }
    req.body = result.data;
    next();
  };
}
