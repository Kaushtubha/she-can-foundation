# 💜 She Can Foundation — Full Stack NGO Website

> **Full Stack Internship Project** | Next.js + Three.js + Node.js + MongoDB

A cinematic, fully responsive full-stack NGO website with 3D animations, glassmorphism UI, particle effects, and a real volunteer application backend.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🚀 **Frontend (Live)** | [she-can-foundation-mu-indol.vercel.app](https://she-can-foundation-mu-indol.vercel.app) |
| ⚙️ **Backend API** | [she-can-foundation-xz4b.onrender.com](https://she-can-foundation-xz4b.onrender.com) |
| 💾 **GitHub Repo** | [github.com/Kaushtubha/she-can-foundation](https://github.com/Kaushtubha/she-can-foundation) |

---

## 🏗️ What We Built

### 📄 Pages & Sections
| Section | Description |
|---------|-------------|
| 🦸 **Hero Section** | Full-screen landing with 3D animated globe, particle background, and animated tagline |
| 💡 **About Section** | NGO mission, values, and team info with scroll-reveal animations |
| 📊 **Impact Section** | Animated counters showing lives touched, cities active, and milestones timeline |
| 🙋 **Volunteer Section** | Real working form connected to backend — submissions saved to MongoDB |
| 🖼️ **Gallery Section** | Visual showcase with hover effects and glassmorphism cards |
| 💬 **Testimonials Section** | Stories and quotes from community members |
| 🧭 **Navbar** | Sticky navigation with smooth scroll and dark/light mode toggle |
| 🦶 **Footer** | Links, social icons, and animated wave |

### 🎨 UI Components
| Component | Description |
|-----------|-------------|
| 🖱️ **Custom Cursor** | Dual-element magnetic cursor with velocity-based lag using RAF |
| ✨ **Particles Background** | Canvas-based particle system with mouse repulsion physics |
| ⏳ **Loading Screen** | Animated splash screen on first load |

### ⚙️ Backend
| Feature | Description |
|---------|-------------|
| 📩 **Volunteer API** | `POST /api/volunteers` — saves form data to MongoDB |
| 📋 **Applications List** | `GET /api/volunteers` — fetch all submissions with pagination |
| 📈 **Stats API** | `GET /api/volunteers/stats` — summary statistics |
| 🏥 **Health Check** | `GET /api/health` — server status endpoint |
| 🔒 **Security** | Helmet headers, rate limiting, express-validator |

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

## ✨ Features

- 🌍 **3D Interactive Globe** — Three.js with MeshDistortMaterial & orbit rings
- 🎇 **Particle System** — Pure canvas with mouse repulsion physics
- 🖱️ **Magnetic Custom Cursor** — Dual-element RAF loop with velocity-based lag
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS
- 🌙 **Glassmorphism UI** — Modern frosted glass design system
- 📩 **Volunteer Form** — Real backend with MongoDB storage & validation
- ⚡ **Smooth Animations** — Framer Motion scroll reveals & page transitions
- 🔒 **Secure Backend** — Helmet, rate limiting, express-validator

---

## 📁 Project Structure

```
she-can-foundation/
├── frontend/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ImpactSection.jsx
│   │   │   ├── VolunteerSection.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   └── TestimonialsSection.jsx
│   │   ├── ui/
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ParticlesBackground.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   └── styles/
│
└── backend/
    ├── models/
    │   └── Volunteer.js
    ├── routes/
    │   └── volunteers.js
    ├── server.js
    └── .env.example
```

---

## ⚡ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/Kaushtubha/she-can-foundation.git
cd she-can-foundation

# Backend
cd backend
npm install
cp .env.example .env
# Fill in your MONGO_URI in .env

# Frontend
cd ../frontend
npm install
```

### 2. Start Backend

```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
```

### 3. Start Frontend

```bash
cd frontend
npm run dev
# App starts on http://localhost:3000
```

---

## 🔌 API Reference

### `POST /api/volunteers`
Submit a volunteer application.

```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "9876543210",
  "skills": ["Teaching / Tutoring", "Web Development"],
  "message": "I want to contribute my web dev skills."
}
```

### `GET /api/volunteers` — Fetch all applications
### `GET /api/volunteers/stats` — Get summary statistics
### `GET /api/health` — Health check

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--neon-purple` | `#9b5de5` | Primary brand, CTAs |
| `--neon-pink` | `#f15bb5` | Accents, hover states |
| `--neon-blue` | `#00bbf9` | Highlights, orbit rings |
| `--bg-primary` | `#030014` | Page background |

**Fonts:** Cormorant Garamond (headings) · DM Sans (body) · JetBrains Mono (labels)

---

## 🚀 Deployment

| Service | Platform | Config |
|---------|----------|--------|
| Frontend | Vercel | Root dir: `frontend` |
| Backend | Render | Start: `node server.js` |
| Database | MongoDB Atlas | Free M0 cluster |

---

*Made with 💜 for She Can Foundation — empowering youth through technology.*
