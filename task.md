# 📋 Plan de Seguimiento y Lista de Tareas - Chamba Digital

> **Estado general:** En progreso / Fases críticas y de alta prioridad completadas  
> **Última actualización:** 2026-07-29

---

## 🔴 Crítico (Atender ASAP)
- [x] **Helmet + CORS**: Configurar `helmet()` y `cors()` con políticas estrictas de seguridad y headers anti-XSS / clickjacking en `server.ts`.
- [x] **Validación de Input con Zod**: Crear esquemas de validación Zod (`src/schemas/index.ts`) y middleware `validateBody` para `/api/auth/register`, `/api/auth/login`, `/api/messages`, `/api/tasks`, `/api/checkout`, etc.
- [x] **Token Refresh / Sliding Expiration**: Implementar renovación de JWT (header `X-Refresh-Token` y body payload) en `/api/auth/me` para evitar logouts forzados a los 7 días.
- [x] **CI/CD con GitHub Actions**: Crear `.github/workflows/ci.yml` para ejecutar automáticamente lint, unit tests y build en cada commit/PR.
- [x] **Monitoring/Logs Centralizados**: Integrar middleware de logging estructurado y respuestas de error seguras.

---

## 🟠 Alto (Prioridad Alta)
- [x] **Refactor de App.tsx**: Extraer componentes modulares (`src/components/chat/Chatbot.tsx`, `src/context/ToastContext.tsx`, etc.) reduciendo la complejidad del archivo monolítico.
- [x] **Sistema de Toasts UI**: Crear `ToastContext` / `ToastProvider` con animaciones `motion` y reemplazar todos los `alert()` nativos (14+) con notificaciones toast flotantes.
- [x] **Sistema de Notificaciones (Email/Push)**: Alerta por correo al administrador tras suscripciones y manejo de notificaciones.
- [x] **Búsqueda y Filtro Global en SuperAdmin**: Implementar barra de búsqueda en tiempo real por nombre, email, empresa o plan y selector de filtros en la vista de Clientes.
- [x] **Paginación en `/api/messages`**: Agregar soporte para parámetros `?limit=50&before=<timestamp>` con indicador `hasMore`.
- [x] **Tests Unitarios e Integración**: Configurar Vitest (`vitest.config.ts`), script `pnpm test:unit` y suite de pruebas para validadores Zod (`tests/unit/schemas.test.ts`).
- [x] **Health Check Robusto**: Extender `/api/health` para comprobar conexión a MongoDB, Redis, tiempo de actividad y uso de memoria.
- [x] **Code Splitting & Lazy Loading Components**: Optimizar bundle inicial y empaquetado Vite.

---

## 🟡 Medio (Próximo Quarter)
- [x] **Índices MongoDB**: Definir índices en Mongoose en `email`, `role`, `{ clientId: 1, createdAt: 1 }` y `{ clientId: 1, createdAt: -1 }`.
- [x] **Soft-Delete**: Agregar campos `isDeleted: Boolean` y `deletedAt: Date` en esquemas User, Message y Task.
- [x] **Webhooks Polar.sh para Cancelaciones**: Manejar eventos `customer.subscription.deleted`, `subscription.revoked` y `subscription.canceled` en `/api/checkout/notify`.
- [x] **Password Reset Flow**: Implementar endpoints `/api/auth/forgot-password` y `/api/auth/reset-password` con tokens temporales de recuperación.
- [ ] **Migraciones de BD**: Sistema de versiones/migraciones de esquemas para MongoDB/Mongoose.
- [ ] **Notificación de Tareas Incompletas**: Cron / worker para enviar recordatorio de tareas pendientes en backlog o revisión.
- [ ] **Documentación OpenAPI / Swagger**: Especificación OpenAPI 3.0 para los endpoints de la API REST.
- [ ] **i18n (Soporte Multi-idioma)**: Infraestructura con `react-i18next` para español e inglés.
- [ ] **Validación de Email en Registro**: Envió de token de activación de correo.

---

## 🟢 Bajo (Backlog & Polish)
- [x] **Compression Middleware**: Habilitar `compression()` en Express para servir respuestas comprimidas (Gzip/Brotli).
- [x] **Exportación CSV de Clientes**: Implementar función `exportClientsCSV()` con botón de descarga en el SuperAdmin.
- [x] **Sirvoy PMS Demo Component**: Crear `SirvoyPmsDemo.tsx` widget interactivo de demostración de Channel Manager integrado en `HospitalitySolutions.tsx`.
- [ ] **Dark Mode en Dashboards**: Alternador de tema claro/oscuro en paneles de Cliente y Admin.
- [ ] **PWA / Service Worker**: Service Worker para caching offline básico y manifest PWA.
- [ ] **Analytics Real**: Conectar `trackEvent()` con Google Analytics 4 / Plausible.
- [ ] **Lazy Loading de Imágenes**: Atributos `loading="lazy"` y componentes optimizados de imagen en todas las páginas.
- [ ] **Cache Headers**: Configuración de `Cache-Control` en assets estáticos del servidor.
- [ ] **Image Optimization Pipeline**: Pipeline/scripts WebP/AVIF para reducir peso de assets públicos.
