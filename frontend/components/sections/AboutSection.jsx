// components/sections/AboutSection.jsx
// Mission/vision cards with counter animations and reveal effects
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'

const stats = [
  { value: 5200, suffix: '+', label: 'Students Helped', icon: '🎓', color: '#9b5de5' },
  { value: 240, suffix: '+', label: 'Active Volunteers', icon: '💜', color: '#f15bb5' },
  { value: 85, suffix: '+', label: 'Events Conducted', icon: '🌟', color: '#00bbf9' },
  { value: 12, suffix: '', label: 'Cities Reached', icon: '🌍', color: '#00f5d4' },
]

const values = [
  {
    icon: '🔥',
    title: 'Our Mission',
    description: 'To empower young women and girls from underserved communities through access to quality education, skill-building workshops, and transformative mentorship programs that unlock their fullest potential.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/20',
  },
  {
    icon: '🌟',
    title: 'Our Vision',
    description: 'A world where every girl, regardless of her background, has the confidence, resources, and opportunity to lead — breaking barriers of poverty, inequality, and gender discrimination.',
    gradient: 'from-pink-500/20 to-blue-500/20',
    border: 'border-pink-500/20',
  },
  {
    icon: '💡',
    title: 'Our Approach',
    description: 'Community-first, data-driven, and deeply human. We combine grassroots organizing with innovative digital tools to create measurable, lasting change in the lives of young women.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
  },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-6 neon-border cursor-hover group relative overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.04, translateY: -4 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
        style={{ background: stat.color, opacity: 0.04 }}
      />

      <div className="flex items-start gap-4">
        <div className="text-3xl">{stat.icon}</div>
        <div>
          <div className="text-4xl font-display font-bold stat-number leading-none">
            {inView ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                separator=","
                suffix={stat.suffix}
              />
            ) : (
              <span>0{stat.suffix}</span>
            )}
          </div>
          <div className="text-sm mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ValueCard({ value, index }) {
  return (
    <motion.div
      className={`glass rounded-3xl p-8 border ${value.border} relative overflow-hidden group cursor-hover`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ translateY: -6 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-50 rounded-3xl`} />

      <div className="relative z-10">
        <div className="text-4xl mb-5">{value.icon}</div>
        <h3 className="font-display text-2xl font-bold text-white mb-4">{value.title}</h3>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{value.description}</p>
      </div>

      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative z-10">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 px-4 py-2 glass rounded-full"
            style={{ color: 'var(--neon-purple)' }}
          >
            Who We Are
          </motion.span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-4">
            <span className="text-white">Driven by </span>
            <span className="text-gradient">Purpose,</span>
            <br />
            <span className="text-white">Powered by </span>
            <span className="text-gradient">People</span>
          </h2>
          <p className="text-lg mt-6 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}>
            Founded in 2018 by a group of passionate educators and social workers,
            She Can Foundation has grown into a movement — touching thousands of lives
            across India through innovative programs and relentless community care.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Mission/Vision/Approach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>

        {/* Feature Strip */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 neon-border relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Every Girl Deserves a{' '}
                <span className="text-gradient">Champion</span>
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                She Can Foundation operates at the intersection of education and empowerment.
                Our programs cover digital literacy, leadership training, financial literacy,
                mental health awareness, and STEM education — all specifically designed
                for young women in Tier 2 and Tier 3 cities across India.
              </p>
              <button
                onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary cursor-hover inline-flex items-center gap-2"
              >
                View Our Impact
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Features checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Mentorship Programs',
                'Digital Literacy',
                'Leadership Training',
                'STEM Education',
                'Mental Health Support',
                'Financial Literacy',
                'Career Counseling',
                'Community Networks',
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
