import { describe, it, expect } from "vitest";
import {
  registerSchema,
  loginSchema,
  createMessageSchema,
  createTaskSchema,
  updateTaskStatusSchema
} from "../../src/schemas/index.js";

describe("Zod Validation Schemas", () => {
  describe("registerSchema", () => {
    it("should validate a valid registration payload", () => {
      const valid = {
        name: "Carlos Perez",
        email: "carlos@example.com",
        password: "securepassword123",
        company: "Surf Inc.",
        plan: "Web Tradicional"
      };
      const result = registerSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject an invalid email", () => {
      const invalid = {
        name: "Carlos",
        email: "not-an-email",
        password: "123"
      };
      const result = registerSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it("should reject a password shorter than 6 chars", () => {
      const invalid = {
        name: "Carlos",
        email: "carlos@example.com",
        password: "123"
      };
      const result = registerSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("should validate a valid login payload", () => {
      const valid = { email: "demo@chamba.digital", password: "demo123456" };
      const result = loginSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject empty password", () => {
      const invalid = { email: "demo@chamba.digital", password: "" };
      const result = loginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("createMessageSchema", () => {
    it("should validate message with text", () => {
      const valid = { text: "Hola equipo, necesito ayuda con mi web." };
      const result = createMessageSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject message without text and without file", () => {
      const invalid = { text: "   ", fileUrl: "" };
      const result = createMessageSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("createTaskSchema", () => {
    it("should validate task creation", () => {
      const valid = {
        clientId: "client_123",
        title: "Actualizar banner principal",
        priority: "alta"
      };
      const result = createTaskSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("should reject missing title or clientId", () => {
      const invalid = { clientId: "", title: "" };
      const result = createTaskSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("updateTaskStatusSchema", () => {
    it("should accept valid status values", () => {
      expect(updateTaskStatusSchema.safeParse({ status: "en_progreso" }).success).toBe(true);
      expect(updateTaskStatusSchema.safeParse({ status: "completado" }).success).toBe(true);
    });

    it("should reject invalid status", () => {
      expect(updateTaskStatusSchema.safeParse({ status: "invalid_status" }).success).toBe(false);
    });
  });
});
