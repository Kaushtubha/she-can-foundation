// components/sections/HeroSection.jsx
// Fullscreen hero with animated 3D sphere, floating icons, and mouse-parallax
import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ── 3D Animated Globe ──────────────────────────────────────
function AnimatedGlobe() {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.004
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group>
        {/* Main sphere */}
        <Sphere ref={meshRef} args={[1.8, 64, 64]}>
          <MeshDistortMaterial
            color="#9b5de5"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0}
            metalness={0.2}
            wireframe={false}
          >
            <primitive
              object={new THREE.Color('#9b5de5')}
              attach="color"
            />
          </MeshDistortMaterial>
        </Sphere>

        {/* Inner glow sphere */}
        <Sphere args={[1.6, 32, 32]}>
          <meshStandardMaterial
            color="#f15bb5"
            transparent
            opacity={0.15}
            wireframe={false}
          />
        </Sphere>

        {/* Orbit ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#00bbf9"
            emissive="#00bbf9"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Second orbit ring */}
        <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#9b5de5"
            emissive="#9b5de5"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Orbitals() {
  const group = useRef()
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 4
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 0.5) * 1,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#9b5de5' : i % 3 === 1 ? '#f15bb5' : '#00bbf9'}
              emissive={i % 3 === 0 ? '#9b5de5' : i % 3 === 1 ? '#f15bb5' : '#00bbf9'}
              emissiveIntensity={2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// ── Floating Icon Pill ──────────────────────────────────────
function FloatingIcon({ icon, label, style, delay }) {
  return (
    <motion.div
      className="absolute glass rounded-full px-4 py-2 flex items-center gap-2 border border-white/10"
      style={style}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      >
        {icon}
      </motion.div>
      <span className="text-xs font-medium text-white/80 whitespace-nowrap">{label}</span>
    </motion.div>
  )
}

// ── Hero Section ────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%'])
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%'])
  const textX = useTransform(smoothX, [-0.5, 0.5], ['-8px', '8px'])
  const textY = useTransform(smoothY, [-0.5, 0.5], ['-5px', '5px'])

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5))
      mouseY.set((e.clientY / innerHeight - 0.5))
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleScroll = () => {
    const target = document.getElementById('about')
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background gradient orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--neon-purple)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'var(--neon-pink)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--neon-blue)' }} />
      </motion.div>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen pt-24 pb-16">
        {/* Left: Content */}
        <motion.div style={{ x: textX, y: textY }} className="flex flex-col gap-6">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 w-fit"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Making a Difference Since 2018
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight">
              <span className="text-white">Empowering</span>
              <br />
              <span className="text-gradient-animated">Youth.</span>
              <br />
              <span className="text-white">Creating</span>
              <br />
              <span className="text-gradient">Opportunities.</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            She Can Foundation is a youth-driven non-profit empowering girls and young women
            through education, mentorship, and skill development — building a world where
            every woman can achieve her full potential.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <button
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary cursor-hover group"
            >
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Join Us
              </span>
            </button>

            <button
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary cursor-hover"
            >
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Become a Volunteer
              </span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex gap-8 pt-4 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            {[
              { value: '5K+', label: 'Girls Helped' },
              { value: '200+', label: 'Volunteers' },
              { value: '50+', label: 'Programs' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-display font-bold text-gradient">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Canvas */}
        <div className="relative h-[450px] lg:h-[600px]">
          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 7], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#9b5de5" />
              <pointLight position={[-5, -3, -5]} intensity={1} color="#f15bb5" />
              <pointLight position={[0, 5, -5]} intensity={0.8} color="#00bbf9" />

              <Suspense fallback={null}>
                <AnimatedGlobe />
                <Orbitals />
                <Stars radius={100} depth={50} count={2000} factor={3} saturation={0.8} fade speed={0.5} />
              </Suspense>
            </Canvas>
          )}

          {/* Floating icon pills */}
          <FloatingIcon
            icon={<span className="text-lg">✨</span>}
            label="5000+ Lives Touched"
            style={{ top: '12%', left: '-5%' }}
            delay={1.0}
          />
          <FloatingIcon
            icon={<span className="text-lg">🌍</span>}
            label="12 Cities Active"
            style={{ bottom: '20%', left: '-8%' }}
            delay={1.2}
          />
          <FloatingIcon
            icon={<span className="text-lg">🎓</span>}
            label="Education Programs"
            style={{ top: '20%', right: '0%' }}
            delay={1.4}
          />
          <FloatingIcon
            icon={<span className="text-lg">💜</span>}
            label="Community Driven"
            style={{ bottom: '15%', right: '5%' }}
            delay={1.6}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScroll}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div className="scroll-indicator w-5 h-8 border rounded-full flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--text-muted)' }}>
          <div className="w-1 h-2 rounded-full bg-gradient-to-b from-purple-400 to-pink-400" />
        </div>
      </motion.button>
    </section>
  )
}
