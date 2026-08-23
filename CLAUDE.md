# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Autonomous Workflow

**Read `AGENTS.md` first.** It defines the circular workflow (understand → plan → execute → verify → iterate) that must be followed for every task. It specifies when to act autonomously vs when to ask, verification commands, error recovery, and project conventions.

## Project Overview

**Chamba Digital** is a high-performance digital agency website built with React 19, TypeScript, Vite, and Tailwind CSS v4. It serves as the marketing and lead-generation platform for a digital engineering agency specializing in:
- Hospitality technology (Sirvoy PMS integration, direct booking engines, AI agents)
- E-commerce development (Shopify, WooCommerce, custom)
- B2B service businesses (lead generation funnels, AI automation)
- Custom software development (React, Node.js, cloud infrastructure)

The site features multiple specialized landing pages, an AI chatbot powered by Gemini, and a lead capture system integrated with MailerLite.

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 (with React 18 compat) |
| Language | TypeScript (strict mode) |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (with @tailwindcss/vite plugin) |
| Routing | React Router DOM v7 |
| Animations | Motion (Framer Motion) v12 |
| Icons | Lucide React |
| Server | Express + Vite middleware (dev), Static serving (prod) |
| AI | Google GenAI (Gemini 2.5 Flash Lite) |
| Email | Nodemailer + MailerLite API |
| Package Manager | pnpm 11.1.1 |

## Project Structure

```
chamba.digital/
├── public/                 # Static assets (images, PDFs)
├── src/
│   ├── components/
│   │   ├── animations/     # HeroAnimation, TechComposition
│   │   ├── HeroAnimation.tsx
│   │   └── SEO.tsx         # Dynamic SEO meta tags + Schema.org
│   ├── pages/
│   │   ├── LandingPage/    # Specialized landing pages
│   │   │   ├── Hotels.tsx           # Hospitality-focused landing
│   │   │   ├── ECommerce.tsx        # E-commerce landing
│   │   │   ├── ServiceBusinesses.tsx # B2B services landing
│   │   │   ├── HospitalitySolutions.tsx # Deep-dive hospitality
│   │   │   └── Proposal.tsx
│   │   ├── RaffleLandingPage/
│   │   ├── PortfolioPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── MethodologyPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── PrivacyPage.tsx
│   ├── App.tsx             # Main app: routing, all components, chatbot
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind v4 theme + custom utilities
├── server.ts               # Express server with API routes
├── vite.config.ts          # Vite config with Tailwind plugin
├── tsconfig.json           # TypeScript config
├── package.json
├── KNOWLEDGE_BASE.md       # Business knowledge for AI chatbot
└── vercel.json             # Vercel SPA routing
```

## Common Commands

```bash
# Development (starts Express + Vite HMR on port 3000)
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview

# Lint/Type-check (no emit)
pnpm lint

# Clean build artifacts
pnpm clean
```

## Architecture Highlights

### 1. Single-Page Application with Multi-Page Routing
- `src/App.tsx` is the monolithic component file containing:
  - All page components (Hero, Services, Portfolio, Pricing, etc.)
  - Shared UI components (Navbar, Footer, Modals, Chatbot)
  - Routing configuration with `react-router-dom`
  - Business logic (A/B testing, analytics tracking)

### 2. Specialized Landing Pages (`src/pages/LandingPage/`)
Each vertical has a dedicated landing page with tailored SEO, schema.org markup, and conversion funnels:
- **Hotels.tsx** - Hospitality focus with Sirvoy PMS, case studies
- **ECommerce.tsx** - E-commerce focus with ROAS metrics
- **ServiceBusinesses.tsx** - B2B lead gen focus
- **HospitalitySolutions.tsx** - Deep-dive with ROI calculator (interactive sliders)

### 3. AI Chatbot Integration
- Located in `App.tsx` as `Chatbot` component
- Communicates with `/api/chat` endpoint on Express server
- Uses Gemini 2.5 Flash Lite with strict system prompt from `KNOWLEDGE_BASE.md`
- Floating action button → modal chat interface
- Auto-generates WhatsApp deep links with context

### 4. Server Architecture (`server.ts`)
Express server with dual mode:
- **Development**: Vite middleware for HMR + SPA fallback
- **Production**: Static file serving from `dist/` + SPA fallback

API Endpoints:
- `POST /api/send-checklist` - Lead capture → MailerLite
- `POST /api/chat` - AI chatbot → Gemini API
- `GET /api/health` - Health check

### 5. Styling System (Tailwind CSS v4)
Custom theme in `src/index.css`:
- CSS variables for colors (`--color-bg`, `--color-accent`, `--color-cta`, etc.)
- Custom fonts: Plus Jakarta Sans, Playfair Display, Space Grotesk
- Glassmorphism utilities (`.glass`, `.glass-premium`)
- Custom scrollbar, animations, editorial label utility

### 6. SEO & Schema.org
- `SEO.tsx` component dynamically injects meta tags, Open Graph, Twitter cards, canonical URLs, and JSON-LD schema
- Each landing page includes structured data for services, offers, and organization

## Key Business Logic

### Pricing Tiers (defined in App.tsx Services section)
| Plan | Price | Target |
|------|-------|--------|
| Lanzamiento OnePage | $150 USD | Validation/landing |
| Crecimiento Business | $500 USD | Full website + automation |
| Dominio Elite & IA | $1,200+ USD | Custom software + AI agents |
| **Plan Hoteles** | **$999 USD** | Web + Sirvoy PMS + AI agent + 2500 AI credits |

### AI Chatbot Plans (from KNOWLEDGE_BASE.md)
- Starter: $49/mo + $250 setup (1,000 msgs)
- Pro: $99/mo + $400 setup (3,000 msgs, WhatsApp/IG)
- Business: $199/mo + $600 setup (10,000 msgs, PMS/CRM integration)

### Lead Capture Flow
1. Exit-intent modal (`ExitIntentModal`) offers "Checklist 2026"
2. Email submitted to `/api/send-checklist`
3. Server calls MailerLite API (or mock in dev)
4. Success → direct PDF download + WhatsApp CTA

### A/B Testing
- `getABVariant()` in App.tsx uses localStorage for persistence
- Currently used for Hero headline variants (A/B)

## Environment Variables

Required in `.env`:
```env
GEMINI_API_KEY=           # For AI chatbot
MAILERLITE_API_KEY=       # For lead capture (optional in dev)
MAILERLITE_GROUP_ID=      # MailerLite group for subscribers
PORT=3000                 # Server port (default 3000)
```

## Development Notes

### Adding a New Landing Page
1. Create component in `src/pages/LandingPage/`
2. Import and add route in `App.tsx`
3. Add SEO metadata with schema.org structured data
4. Update `server.ts` SPA fallback for dynamic meta tags (see lines 158-180)

### Modifying the Chatbot
- System prompt is in `server.ts` (lines 88-105) - loads from `KNOWLEDGE_BASE.md`
- Frontend chat UI is the `Chatbot` component in `App.tsx`
- WhatsApp deep link generation uses last user message for context

### Styling Conventions
- Use CSS variables from `@theme` in `index.css` (e.g., `bg-bg`, `text-accent`)
- Glassmorphism: `.glass` or `.glass-premium` classes
- Animations: Motion components with `initial`/`animate`/`whileInView` props
- Responsive: Mobile-first, breakpoints at `sm:`, `md:`, `lg:`

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` → project root
- No emit (type-check only via `tsc --noEmit`)

## Deployment

### Vercel (configured via `vercel.json`)
- SPA rewrite rule for client-side routing
- Build command: `pnpm build`
- Output directory: `dist`

### Manual/Other
```bash
pnpm build    # Outputs to dist/
# Serve dist/ with any static host + SPA fallback
```

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main application, routing, all shared components |
| `src/server.ts` | Express server, API endpoints, AI chat logic |
| `src/index.css` | Tailwind theme, design system utilities |
| `KNOWLEDGE_BASE.md` | Business knowledge for AI chatbot |
| `vite.config.ts` | Vite + Tailwind + path aliases config |
| `src/pages/LandingPage/HospitalitySolutions.tsx` | Most complex page (ROI calculator, case studies) |

## Common Patterns

### Adding a New Section to a Landing Page
```tsx
<section className="py-24 px-6 md:px-10 max-w-[1024px] mx-auto">
  <div className="text-center mb-16">
    <span className="label-editorial mx-auto">Section Label</span>
    <h2 className="text-[32px] md:text-[56px] font-black tracking-tighter">
      Section Title
    </h2>
  </div>
  {/* Content with motion.div for scroll animations */}
</section>
```

### Creating a Pricing Card
Use the `PricingCard` component in `App.tsx` (line 933) with props:
```tsx
<PricingCard
  title="Plan Name"
  description="Description"
  items=[{ name: "Feature", details: "Detail" }]
  price="$XXX"
  period="USD / Pago Único"
  isPopular={false}
  onOpenDetails={() => openModal("Plan Name", "Details...")}
/>
```

### Tracking Events
```tsx
trackEvent("event_name", { key: "value" })
// Implement real analytics in trackEvent() function (App.tsx line 563)
```