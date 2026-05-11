# 🏆 ANCA — Andaman & Nicobar Chess Association

Official web portal for the **Andaman & Nicobar Chess Association (ANCA)** — affiliated to AICF & FIDE. Built with Next.js 16, React 19, Tailwind CSS v4, and Supabase.

🌐 **Live:** [website-2-c0xizkb3g-sathiyas-projects-b021083f.vercel.app](https://website-2-c0xizkb3g-sathiyas-projects-b021083f.vercel.app)
📦 **Repo:** [github.com/sathiyatskrj/website-2](https://github.com/sathiyatskrj/website-2)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Database (Supabase)](#database-supabase)
9. [Deployment](#deployment)
10. [Domain & Hosting Costs](#domain--hosting-costs)
11. [Performance](#performance)
12. [Pages Reference](#pages-reference)
13. [Contributing](#contributing)

---

## Overview

ANCA's digital portal serves players, arbiters, coaches, and administrators across the Andaman & Nicobar Islands. It provides:

- Public-facing tournament listings, news, and player directory
- Admin dashboard (auth-protected) to manage all content via Supabase
- AICF & FIDE affiliation links and downloadable official documents
- Interactive chess widget, animated hero, and dark/light theme

---

## Features

| Category | Feature |
|---|---|
| 🎨 **UI/UX** | Glassmorphism bento grid, dark/light theme, smooth animations |
| 🏆 **Tournaments** | Calendar, registration, live results, archives |
| 👤 **Players** | Directory, FIDE rating links, AICF registration |
| 📰 **News** | Animated news ticker, article cards, announcements |
| ♟️ **Chess Widget** | Playable mini chess board (canvas-based, click-to-move) |
| 🔍 **Search** | Cmd+K global search overlay |
| ♿ **Accessibility** | Skip nav, screen reader access, font size A-/A/A+ controls |
| 📱 **Responsive** | Full mobile support, mobile-first navigation |
| 🔐 **Admin** | Supabase-protected dashboard for content management |
| 🚀 **Performance** | IntersectionObserver-gated animations, 30fps particle throttle |
| 🌐 **SEO** | Full Open Graph, Twitter cards, per-page title templates |

---

## Tech Stack

### Core
| Package | Version | Purpose |
|---|---|---|
| `next` | 16.1.6 | React framework (App Router, SSG/SSR) |
| `react` | 19.2.3 | UI library |
| `typescript` | ^5 | Type safety |

### Styling
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS (v4 CSS-first config) |
| `@tailwindcss/postcss` | ^4 | PostCSS Tailwind v4 compiler |
| `tw-animate-css` | ^1.4 | animate-in/out utility keyframes |
| `shadcn` | ^3.8 | Component primitives (new-york style) |

### Animation
| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | ^12.35 | Page transitions, scroll reveals, hero carousel |

### Backend / Auth
| Package | Version | Purpose |
|---|---|---|
| `@supabase/supabase-js` | ^2.100 | Database client |
| `@supabase/ssr` | ^0.5 | Server-side Supabase (middleware auth) |

### Forms & Validation
| Package | Version | Purpose |
|---|---|---|
| `react-hook-form` | ^7.71 | Form state management |
| `@hookform/resolvers` | ^5.2 | Zod schema resolver |
| `zod` | ^4.3 | Schema validation |

### Utilities
| Package | Version | Purpose |
|---|---|---|
| `lucide-react` | ^0.577 | Icon library (500+ SVG icons) |
| `next-themes` | ^0.4 | Dark/light theme provider |
| `date-fns` | ^4.1 | Date formatting for tournaments/news |
| `clsx` | ^2.1 | Conditional className utility |
| `tailwind-merge` | ^3.5 | Merge Tailwind classes safely |
| `radix-ui` | ^1.4 | Headless accessible primitives |

### Dev Tools
| Package | Purpose |
|---|---|
| `eslint` + `eslint-config-next` | Linting |
| `@types/node`, `@types/react` | TypeScript definitions |

---

## Architecture

```
Browser
  │
  ▼
Next.js 16 (App Router)
  │
  ├── Middleware (src/middleware.ts)
  │     └── Supabase session refresh + /admin route protection
  │
  ├── Layout (src/app/layout.tsx)
  │     ├── ThemeProvider (next-themes)
  │     ├── Header (sticky, 3-tier)
  │     ├── PageTransition (framer-motion)
  │     └── Footer
  │
  ├── Public Pages (Static SSG)
  │     ├── / → Homepage (bento grid)
  │     ├── /tournaments → Tournament calendar
  │     ├── /players → Player directory
  │     ├── /news → News & announcements
  │     ├── /downloads → Documents & circulars
  │     ├── /arbiters-coaches → Officials directory
  │     ├── /about → About ANCA
  │     ├── /contact → Contact form
  │     ├── /gallery → Photo gallery
  │     └── /districts → District units
  │
  ├── Admin Pages (Auth-protected via middleware)
  │     ├── /admin → Dashboard home
  │     ├── /admin/tournaments → CRUD tournaments
  │     ├── /admin/news → CRUD news articles
  │     ├── /admin/players → CRUD player records
  │     ├── /admin/downloads → CRUD documents
  │     ├── /admin/gallery → CRUD gallery
  │     └── /admin/login → Supabase auth login
  │
  └── Supabase (PostgreSQL backend)
        ├── auth.users → Admin authentication
        ├── tournaments → Tournament records
        ├── news → News articles
        ├── players → Player profiles
        ├── downloads → Document metadata
        └── gallery → Image records
```

### Data Flow
```
Admin logs in → Supabase Auth → JWT stored in cookie
→ middleware.ts validates session → allows /admin access
→ Admin creates tournament → Supabase insert
→ Public page fetches from Supabase → displays to users
```

---

## Project Structure

```
website-2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (Header + Footer + Providers)
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles + Tailwind v4 + design tokens
│   │   ├── loading.tsx               # Page load skeleton
│   │   ├── not-found.tsx             # 404 page (chess-themed)
│   │   ├── about/page.tsx
│   │   ├── admin/                    # Protected admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── tournaments/page.tsx
│   │   │   ├── news/page.tsx
│   │   │   ├── players/page.tsx
│   │   │   ├── downloads/page.tsx
│   │   │   └── gallery/page.tsx
│   │   ├── tournaments/
│   │   │   ├── page.tsx
│   │   │   └── [id]/register/page.tsx
│   │   ├── players/page.tsx
│   │   ├── news/page.tsx
│   │   ├── downloads/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── districts/page.tsx
│   │   ├── arbiters-coaches/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── auth/callback/page.tsx    # Supabase OAuth callback
│   │
│   ├── components/
│   │   ├── HeroCarousel.tsx          # Auto-playing hero with framer-motion
│   │   ├── NewsTicker.tsx            # Scrolling news strip
│   │   ├── SponsorsMarquee.tsx       # Partner logos marquee
│   │   ├── SearchOverlay.tsx         # Cmd+K search modal
│   │   ├── theme-provider.tsx        # next-themes wrapper
│   │   ├── theme-toggle.tsx          # Dark/light toggle button
│   │   ├── animations/
│   │   │   ├── AnimationUtils.tsx    # ScrollReveal, StaggerList, CountUp
│   │   │   ├── AnimeTextReveal.tsx   # Word-by-word text animation
│   │   │   ├── MicroAnimations.tsx   # HoverCard, AnimatedLink, Magnetic
│   │   │   ├── PageTransition.tsx    # Route transition wrapper
│   │   │   ├── ParticleNetworkBackground.tsx  # Canvas particle system
│   │   │   ├── ScrollAnimationWebGL.tsx       # Floating chess pieces
│   │   │   ├── TypewriterText.tsx    # Rotating typewriter for hero
│   │   │   └── VantaBackground.tsx   # CSS gradient mesh background
│   │   ├── games/
│   │   │   └── MiniChessBoard.tsx    # Playable canvas chess widget
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 3-tier sticky header + mega menu
│   │   │   ├── Footer.tsx            # Multi-column footer
│   │   │   └── DynamicWrappers.tsx   # SSR:false dynamic imports
│   │   └── ui/                       # shadcn/ui component library
│   │
│   ├── lib/
│   │   ├── mockData.ts               # Placeholder data (replace with Supabase)
│   │   ├── utils.ts                  # cn() class utility
│   │   └── supabase/
│   │       ├── client.ts             # Browser Supabase client
│   │       ├── server.ts             # Server-side Supabase client
│   │       └── middleware.ts         # Session refresh + admin guard
│   │
│   └── middleware.ts                 # Next.js edge middleware
│
├── public/
│   ├── favicon.ico
│   └── images/                       # Uploaded images
│
├── supabase/                         # Supabase migrations (if used)
├── next.config.ts                    # Next.js config
├── postcss.config.mjs                # Tailwind v4 PostCSS
├── tailwind.config.ts               # (v4 is CSS-first, minimal config)
├── components.json                   # shadcn/ui config
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10
- A Supabase project (free tier works)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/sathiyatskrj/website-2.git
cd website-2

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Fill in your Supabase keys (see below)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# ── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: for server-side operations (admin mutations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ **Never commit `.env.local`** — it's in `.gitignore`.
> The site runs without these vars (public pages use mock data), but admin login and live data require them.

### Setting on Vercel

1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

---

## Database (Supabase)

### Tables

| Table | Purpose | Key Columns |
|---|---|---|
| `tournaments` | Events & championships | `id, title, date, venue, status, prize_fund, registration_url` |
| `news` | Articles & circulars | `id, title, content, tag, published_at, slug` |
| `players` | Member directory | `id, name, fide_id, rating, district, category` |
| `downloads` | Documents & PDFs | `id, title, file_url, category, published_at` |
| `gallery` | Event photos | `id, title, image_url, event_date, album` |

### Replacing Mock Data

Currently `src/lib/mockData.ts` provides placeholder data for all public pages. To use live Supabase data:

1. Create tables in your Supabase project
2. Replace imports from `@/lib/mockData` with Supabase queries:

```ts
// Example: fetch tournaments from Supabase
import { createServerSupabaseClient } from '@/lib/supabase/server';

const supabase = await createServerSupabaseClient();
const { data: tournaments } = await supabase
  .from('tournaments')
  .select('*')
  .order('date', { ascending: true });
```

### Admin Access

1. Go to `/admin/login`
2. Sign in with your Supabase email/password
3. Manage all content from the dashboard

To create an admin user: Supabase Dashboard → Authentication → Users → Invite user.

---

## Deployment

### Vercel (Recommended — currently live)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect GitHub repo to Vercel for automatic deployments on every push.

**Vercel Settings:**
- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Output directory: `.next`
- Node version: 20.x

### Self-hosted (VPS/Docker)

```bash
npm run build
npm run start   # Runs on port 3000
```

Use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name ancachess.in www.ancachess.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Domain & Hosting Costs

### Domain Registration

| Registrar | `.in` (Indian) | `.org` | `.com` | Notes |
|---|---|---|---|---|
| **GoDaddy** | ₹800/yr | ₹1,200/yr | ₹1,000/yr | Popular, good UI |
| **Namecheap** | ₹750/yr | ₹900/yr | ₹950/yr | Best value |
| **BigRock** | ₹850/yr | ₹1,100/yr | ₹1,100/yr | India-focused |
| **Google Domains** | ₹999/yr | ₹1,100/yr | ₹1,100/yr | Clean dashboard |
| **Hostinger** | ₹699/yr | ₹850/yr | ₹900/yr | Cheapest option |

**Recommendation:** Register `ancachess.in` (₹750–850/yr) from Namecheap or BigRock.

**Steps:**
1. Buy domain at registrar
2. In Vercel: Project → Settings → Domains → Add `ancachess.in`
3. Add DNS records at registrar (Vercel shows exact values):
   ```
   A     @      76.76.21.21
   CNAME www    cname.vercel-dns.com
   ```

### Hosting Plans

#### Option A — Vercel (Current, Recommended)

| Plan | Cost | Limits | Good for |
|---|---|---|---|
| **Hobby (Free)** | ₹0/mo | 100GB bandwidth, 1 member | Development, testing |
| **Pro** | ~₹1,700/mo ($20) | 1TB bandwidth, analytics, team | Production traffic |
| **Enterprise** | Custom | Unlimited | High scale |

> ✅ **Free tier is sufficient** for ANCA's traffic level. Upgrade to Pro only if bandwidth exceeds 100GB/month.

#### Option B — Hostinger VPS (Self-hosted)

| Plan | Cost | Specs | Notes |
|---|---|---|---|
| **KVM 1** | ₹289/mo | 1 vCPU, 4GB RAM | Enough for this site |
| **KVM 2** | ₹579/mo | 2 vCPU, 8GB RAM | Comfortable headroom |

Requires: Node.js setup, Nginx, SSL via Let's Encrypt (free), PM2 for process management.

#### Option C — Railway

| Plan | Cost | Notes |
|---|---|---|
| **Hobby** | $5/mo (~₹420) | 512MB RAM, easy deploy |
| **Pro** | $20/mo (~₹1,700) | 8GB RAM, more resources |

#### Option D — Render

| Plan | Cost | Notes |
|---|---|---|
| **Free** | ₹0/mo | Spins down after 15min inactivity |
| **Starter** | $7/mo (~₹585) | Always-on |

### Supabase (Database & Auth)

| Plan | Cost | Limits |
|---|---|---|
| **Free** | ₹0/mo | 500MB DB, 50MB storage, 50K MAU auth |
| **Pro** | $25/mo (~₹2,100) | 8GB DB, 100GB storage, unlimited auth |

> ✅ **Free tier is sufficient** for ANCA until database exceeds 500MB.

### Total Cost Summary

| Scenario | Monthly | Annual | Notes |
|---|---|---|---|
| **Free (current)** | ₹0 | ~₹800 | Vercel free + Supabase free + domain |
| **Low-traffic production** | ~₹70 | ~₹1,650 | Domain only, all hosting free |
| **Pro production** | ~₹3,800 | ~₹46,400 | Vercel Pro + Supabase Pro + domain |

**Recommended for ANCA:** Stay on **Vercel Free + Supabase Free** and pay only ~₹800/year for the domain.

---

## Performance

### Optimizations Applied

| Technique | Component | Impact |
|---|---|---|
| `IntersectionObserver` pause | ParticleNetworkBackground, MiniChessBoard | Stops RAF when off-screen |
| 30fps throttle (`frameCount % 2`) | ParticleNetworkBackground | Halves CPU from canvas |
| Bounding-box rejection | Particle line drawing | Avoids ~70% of expensive `sqrt()` calls |
| 120→55 particles | ParticleNetworkBackground | ~3.5× fewer O(n²) calculations |
| Word-level animation | AnimeTextReveal | 180 → 12 Framer Motion nodes on homepage |
| `dynamic()` with `ssr:false` | All canvas components | No server-render overhead |
| `once: true` IntersectionObserver | ScrollReveal, StaggerList | Never re-animates after first view |
| Debounced resize | ParticleNetworkBackground | Prevents rapid re-init on drag |
| Removed global floating pieces | ScrollAnimationWebGL | Was running on all 29 pages |

### Core Web Vitals Targets

| Metric | Target | Notes |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Hero text loads fast (SSG) |
| FID (First Input Delay) | < 100ms | Animations don't block main thread |
| CLS (Cumulative Layout Shift) | < 0.1 | Fixed hero height prevents jumps |
| TTI (Time to Interactive) | < 3.5s | Dynamic imports defer heavy components |

---

## Pages Reference

| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage — bento grid, hero carousel, stats |
| `/about` | Static | ANCA history, mission, executive committee |
| `/tournaments` | Static | Tournament calendar with filters |
| `/tournaments/[id]/register` | SSG | Individual tournament registration |
| `/players` | Static | Player directory with search |
| `/news` | Static | News articles and circulars |
| `/downloads` | Static | Constitution, annual reports, circulars |
| `/gallery` | Static | Event photo albums |
| `/arbiters-coaches` | Static | Officials directory |
| `/districts` | Static | District unit information |
| `/contact` | Static | Contact form + map |
| `/privacy-policy` | Static | Legal page |
| `/terms` | Static | Terms & conditions |
| `/admin` | Protected | Dashboard home |
| `/admin/login` | Public | Supabase auth login |
| `/admin/*` | Protected | Content management pages |
| `/auth/callback` | Public | Supabase OAuth redirect handler |

---

## Contributing

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/website-2.git

# 2. Create feature branch
git checkout -b feat/your-feature-name

# 3. Make changes and test
npm run dev

# 4. Build to check for errors
npm run build

# 5. Commit with clear message
git commit -m "feat: add player rating display card"

# 6. Push and open Pull Request
git push origin feat/your-feature-name
```

### Commit Convention

```
feat:     New feature
fix:      Bug fix
perf:     Performance improvement
style:    CSS/UI changes only
refactor: Code restructuring
docs:     Documentation only
chore:    Build, config, dependencies
```

### Code Style

- **TypeScript** — all components must be fully typed, no `any`
- **Components** — functional, hooks-based, no class components
- **CSS** — Tailwind utilities only, no inline styles except for dynamic values
- **Imports** — use `@/` path aliases, not relative `../../`
- **Dynamic imports** — all canvas/animation components must use `dynamic(..., { ssr: false })`

---

## License

This project is proprietary software of the **Andaman & Nicobar Chess Association**.
All rights reserved © 2026 ANCA IT Team.

For licensing inquiries: [info@ancachess.in](mailto:info@ancachess.in)

---

<div align="center">
  <strong>Built with ❤️ for chess players across the Andaman & Nicobar Islands</strong><br/>
  <sub>Affiliated to AICF · Recognised by FIDE · Supported by SAI</sub>
</div>
