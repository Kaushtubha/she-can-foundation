// components/sections/TestimonialsSection.jsx
// Auto-sliding testimonial carousel with glassmorphism cards
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Ananya Verma',
    role: 'Software Engineer at TCS',
    program: 'Code for Change 2022',
    quote: "She Can Foundation didn't just teach me to code — they taught me to believe in myself. The mentors here saw potential in me when I couldn't see it myself. Today I work at a top tech company and mentor other girls from my hometown.",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    impact: 'Secured first tech job after 6-month bootcamp',
  },
  {
    id: 2,
    name: 'Kavya Mehta',
    role: 'Social Media Manager',
    program: 'Digital Skills Workshop 2023',
    quote: "I was a dropout who thought my future was decided. The She Can team came to my village, believed in me, and helped me develop skills I never thought I'd have. Now I run a small digital agency serving 15 clients.",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    impact: 'Started her own digital agency with 15 clients',
  },
  {
    id: 3,
    name: 'Riya Singh',
    role: 'Government School Teacher',
    program: 'Leadership Academy 2021',
    quote: "The leadership program changed how I see my role in society. I went back to my village and started a free tutoring program for 80 girls. She Can showed me that one person really can make a difference.",
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    impact: 'Launched free tutoring for 80 girls in her village',
  },
  {
    id: 4,
    name: 'Shreya Nair',
    role: 'UX Designer',
    program: 'Design Thinking 2023',
    quote: "The best decision of my life was signing up for the She Can design workshop. The curriculum was world-class, the community was incredibly supportive, and the career guidance was spot-on. Landed my dream job in 3 months.",
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    rating: 5,
    impact: 'Landed UX design role at a product startup',
  },
  {
    id: 5,
    name: 'Pooja Tiwari',
    role: 'Entrepreneur',
    program: 'Financial Literacy 2022',
    quote: "She Can gave me the courage to start my own business. The financial literacy module was incredible — I understood loans, budgeting, and business plans for the first time. My bakery now earns 3x what I used to make.",
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    rating: 5,
    impact: 'Grew bakery revenue by 300% using learned skills',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <motion.svg
          key={i}
          width="14" height="14" viewBox="0 0 24 24"
          fill="url(#starGrad)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9b5de5"/>
              <stop offset="100%" stopColor="#f15bb5"/>
            </linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </motion.svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((index, dir) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1)
  }, [current, goTo])

  // Auto-slide
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isPaused, next])

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <section id="testimonials" className="section-padding relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-10 blur-3xl rounded-full"
          style={{ background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' }} />
      </div>

      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 px-4 py-2 glass rounded-full"
            style={{ color: 'var(--neon-pink)' }}>
            Success Stories
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-4">
            <span className="text-white">Voices of</span>
            <br />
            <span className="text-gradient">Transformation</span>
          </h2>
        </motion.div>

        {/* Main Carousel */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote mark */}
          <div className="absolute -top-8 left-8 font-display text-9xl leading-none pointer-events-none select-none"
            style={{ color: 'rgba(155,93,229,0.15)' }}>"</div>

          {/* Card */}
          <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <div className="glass rounded-3xl p-8 md:p-12 h-full neon-border cursor-hover">
                  <div className="flex flex-col gap-6 h-full">
                    {/* Rating */}
                    <StarRating count={testimonials[current].rating} />

                    {/* Quote */}
                    <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed text-white flex-1">
                      "{testimonials[current].quote}"
                    </blockquote>

                    {/* Impact badge */}
                    <div className="flex items-center gap-2 glass rounded-full px-4 py-2 w-fit">
                      <span className="text-green-400 text-xs">✓</span>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {testimonials[current].impact}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2"
                        style={{ ringColor: 'var(--neon-purple)' }}>
                        <Image
                          src={testimonials[current].avatar}
                          alt={testimonials[current].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-display text-lg font-bold text-white">
                          {testimonials[current].name}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {testimonials[current].role}
                        </div>
                        <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--neon-purple)' }}>
                          {testimonials[current].program}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev/Next */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all hover:scale-110 cursor-hover"
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 cursor-hover"
                style={{ background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' }}
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="rounded-full transition-all duration-300 cursor-hover"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current
                      ? 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))'
                      : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Avatar strip */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="relative transition-all duration-300 cursor-hover"
              style={{
                transform: i === current ? 'scale(1.2)' : 'scale(1)',
                opacity: i === current ? 1 : 0.4,
              }}
              aria-label={`View ${t.name}'s testimonial`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 transition-all"
                style={{ ringColor: i === current ? 'var(--neon-purple)' : 'transparent' }}>
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover" />
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
