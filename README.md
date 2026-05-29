# 💜 She Can Foundation — Full Stack NGO Website

> **Award-worthy internship project** | Next.js + Three.js + Node.js + MongoDB

A cinematic, fully responsive full-stack NGO website with 3D animations, glassmorphism UI, particle effects, and a real volunteer application backend.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| 3D / Animation | Three.js, React Three Fiber, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Deployment | Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## 📁 Project Structure

```
she-can-foundation/
├── frontend/
│   ├── components/
│   │   ├── 3d/                  # Three.js scene components
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ImpactSection.jsx
│   │   │   ├── VolunteerSection.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   └── TestimonialsSection.jsx
│   │   ├── ui/                  # Reusable UI
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ParticlesBackground.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── _app.jsx
│   │   ├── _document.jsx
│   │   └── index.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/
    ├── models/
    │   └── Volunteer.js
    ├── routes/
    │   └── volunteers.js
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## ⚡ Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)

---

### 1. Clone & Install

```bash
# Backend
cd she-can-foundation/backend
npm install
cp .env.example .env
# Fill in your MONGO_URI in .env

# Frontend
cd ../frontend
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 2. Start Backend

```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
# Visit http://localhost:5000/api/health to verify
```

---

### 3. Start Frontend

```bash
cd frontend
npm run dev
# App starts on http://localhost:3000
```

---

## 🌐 Deployment Guide

### Frontend → Vercel

```bash
cd frontend
npx vercel --prod

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
```

### Backend → Render

1. Push backend folder to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - Build command: `npm install`
   - Start command: `node server.js`
4. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `FRONTEND_URL` = your Vercel URL
   - `NODE_ENV` = production

### Database → MongoDB Atlas

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free M0 cluster
3. Whitelist IPs: `0.0.0.0/0` (or Render's IPs)
4. Create DB user and copy the connection string to `MONGO_URI`

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--neon-purple` | `#9b5de5` | Primary brand, CTAs |
| `--neon-pink` | `#f15bb5` | Accents, hover states |
| `--neon-blue` | `#00bbf9` | Highlights, orbit rings |
| `--neon-cyan` | `#00f5d4` | Success states |
| `--bg-primary` | `#030014` | Page background |

### Typography
- **Display**: Cormorant Garamond (headings, quotes)
- **Body**: DM Sans (paragraphs, UI)
- **Mono**: JetBrains Mono (labels, code, tags)

---

## 🎭 How Animations Work

### 1. Framer Motion
- **Page transitions**: `AnimatePresence` with opacity fades between routes
- **Scroll reveals**: `whileInView` with `viewport={{ once: true }}` for entrance animations
- **Hover effects**: `whileHover` for tilt, scale, and glow on interactive elements
- **Stagger children**: `transition.delay` offset per item for cascade reveals

### 2. Three.js (React Three Fiber)
- **Globe**: `MeshDistortMaterial` with animated `distort` creates fluid morphing
- **Orbit rings**: `useFrame` hook for per-frame rotation updates
- **Stars**: `@react-three/drei` Stars component with fade effect
- **Float**: `<Float>` component for gentle hover animation

### 3. Canvas Particles
- Pure requestAnimationFrame loop
- Connection lines drawn between nearby particles
- Mouse repulsion field using distance-based force vectors
- Each particle has pulsed glow using radial gradient

### 4. CSS Animations
- `gradientFlow` keyframe for animated text gradient
- `scrollBounce` for hero scroll indicator
- `waveMotion` for footer SVG wave
- CSS `transition` for cursor tracking

---

## 🔌 Backend API Reference

### `POST /api/volunteers`
Submit a volunteer application.

**Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "9876543210",
  "skills": ["Teaching / Tutoring", "Web Development"],
  "message": "I want to contribute my web dev skills to help girls learn coding."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "data": { "id": "...", "name": "Priya Sharma", "submittedAt": "..." }
}
```

### `GET /api/volunteers`
Fetch all applications with pagination.
- Query params: `?page=1&limit=20`

### `GET /api/volunteers/stats`
Get summary statistics.

### `GET /api/health`
Health check endpoint.

---

## 🏆 How to Impress Interviewers

### 1. Lead with Impact
*"This website is for a real cause — empowering young women through tech. The design choices aren't random; they're intentional — the purple-pink-blue palette symbolizes strength, femininity, and possibility."*

### 2. Explain Architecture Decisions
- **Next.js over CRA**: SSR/SSG for SEO, Image optimization, file-based routing
- **MongoDB**: Schema flexibility for volunteer data with evolving fields
- **Framer Motion + GSAP**: Framer for React-managed animations, GSAP for timeline-based scroll sequences

### 3. Highlight Advanced Features
- **Custom cursor system**: RAF loop with velocity-based lag — not a CSS trick
- **Particle system**: Pure canvas with Verlet integration and mouse repulsion physics
- **Form UX**: Multi-step validation, optimistic UI, success micro-animation
- **3D Globe**: MeshDistortMaterial with real-time vertex distortion via Three.js shaders

### 4. Show the Data Flow
*"When a user submits the form: React validates → Axios POST → Express rate limiter → Mongoose schema validation → duplicate check pre-save hook → MongoDB save → 201 response → Framer Motion success animation → react-hot-toast notification."*

### 5. Performance Wins
- Dynamic imports for Three.js (code split, ~200KB saved)
- `viewport={{ once: true }}` prevents scroll listener pile-up
- Image optimization via Next.js `<Image>` component
- Canvas particle count scales with viewport width

---

## 📦 Key Dependencies Explained

| Package | Why Used |
|---------|----------|
| `@react-three/fiber` | React renderer for Three.js — declarative 3D |
| `@react-three/drei` | Helpers: Float, Stars, MeshDistortMaterial |
| `framer-motion` | Production-grade React animation library |
| `react-hot-toast` | Beautiful toast notifications, zero config |
| `react-countup` | Animated counter that triggers on scroll |
| `express-validator` | Declarative server-side input validation |
| `helmet` | Sets secure HTTP headers automatically |
| `express-rate-limit` | Prevents form spam and API abuse |

---

## 🌟 Bonus Feature: Magnetic Cursor

The custom cursor uses a dual-element system:
1. **Dot** (8px): Follows mouse at 95% lerp speed — nearly instant
2. **Outline** (40px): Follows at 12% lerp speed — silky lag effect

On hover over interactive elements, the outline expands (60px) and changes color — creating a "magnetic pull" feel that no other NGO website has. This is pure `requestAnimationFrame` with no libraries.

---

*Made with 💜 to demonstrate full-stack mastery, 3D web graphics, and real-world NGO storytelling.*
