// components/sections/ImpactSection.jsx
// Interactive timeline, animated stats, 3D tilt cards
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const timelineData = [
  {
    year: '2018',
    title: 'Foundation Established',
    description: 'She Can Foundation was born in Bhopal with 5 passionate volunteers and a dream to change lives.',
    icon: '🌱',
    color: '#9b5de5',
    stats: '5 volunteers, 1 city',
  },
  {
    year: '2019',
    title: 'First 500 Girls',
    description: 'Launched our flagship digital literacy program reaching 500 girls in government schools across Madhya Pradesh.',
    icon: '💻',
    color: '#f15bb5',
    stats: '500 girls, 3 programs',
  },
  {
    year: '2020',
    title: 'Pandemic Pivots',
    description: 'Moved all programs online during COVID-19, reaching 10x more students through digital platforms and WhatsApp workshops.',
    icon: '📱',
    color: '#00bbf9',
    stats: '2,000+ students reached',
  },
  {
    year: '2021',
    title: 'National Recognition',
    description: 'Received the National Youth Excellence Award and expanded to 6 cities with 80+ active volunteers.',
    icon: '🏆',
    color: '#00f5d4',
    stats: '80 volunteers, 6 cities',
  },
  {
    year: '2022',
    title: 'STEM for Girls Initiative',
    description: 'Launched "Code for Change" — a 6-month STEM bootcamp specifically designed for girls aged 14–22.',
    icon: '🚀',
    color: '#9b5de5',
    stats: '600 girls enrolled',
  },
  {
    year: '2023',
    title: 'Impact Fund',
    description: 'Secured ₹50L in grant funding from corporate partners, enabling 1,000 new scholarships for underprivileged students.',
    icon: '💰',
    color: '#f15bb5',
    stats: '1,000 scholarships awarded',
  },
  {
    year: '2024',
    title: '5,000 Lives Milestone',
    description: `Crossed the incredible milestone of 5,000 beneficiaries — a testament to our community's incredible dedication.`,
    icon: '✨',
    color: '#00bbf9',
    stats: '5,200+ lives changed',
  },
]

const impactCards = [
  {
    title: 'Education Access',
    value: '94%',
    desc: 'Program completion rate among enrolled students',
    icon: '📚',
    gradient: 'from-purple-600/30 to-pink-600/20',
  },
  {
    title: 'Employment Rate',
    value: '72%',
    desc: 'Graduates placed in jobs within 6 months of completion',
    icon: '💼',
    gradient: 'from-pink-600/30 to-blue-600/20',
  },
  {
    title: 'Confidence Score',
    value: '4.8/5',
    desc: 'Average self-reported confidence improvement',
    icon: '⭐',
    gradient: 'from-blue-600/30 to-cyan-600/20',
  },
  {
    title: 'Community Growth',
    value: '300%',
    desc: 'Year-over-year volunteer community growth',
    icon: '🌱',
    gradient: 'from-cyan-600/30 to-purple-600/20',
  },
]

// 3D Tilt Card Hook
function useTilt() {
  const [style, setStyle] = useState({})
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: 'transform 0.1s ease',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease',
    })
  }

  return { ref, style, handleMouseMove, handleMouseLeave }
}

function TiltCard({ card, index }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-3xl p-6 relative overflow-hidden cursor-hover`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl`} />
      <div className="relative z-10">
        <div className="text-3xl mb-3">{card.icon}</div>
        <div className="font-display text-4xl font-bold text-gradient mb-1">{card.value}</div>
        <div className="font-semibold text-white mb-2">{card.title}</div>
        <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.desc}</div>
      </div>
    </motion.div>
  )
}

function TimelineItem({ item, index, isLeft }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-6 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:w-[calc(50%-2rem)]`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Content card */}
      <div className="glass rounded-2xl p-5 flex-1 cursor-hover group hover:scale-[1.02] transition-transform duration-300"
        style={{ borderLeft: `3px solid ${item.color}` }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full text-white/60"
            style={{ background: `${item.color}20` }}>
            {item.year}
          </span>
        </div>
        <h4 className="font-display text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>
        <div className="text-xs font-mono px-3 py-1 rounded-full inline-block"
          style={{ background: `${item.color}15`, color: item.color }}>
          📊 {item.stats}
        </div>
      </div>
    </motion.div>
  )
}

export default function ImpactSection() {
  return (
    <section id="impact" className="section-padding relative z-10"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,16,48,0.5) 50%, transparent 100%)' }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 px-4 py-2 glass rounded-full"
            style={{ color: 'var(--neon-pink)' }}>
            Our Impact
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-4">
            <span className="text-white">Real Change,</span>
            <br />
            <span className="text-gradient">Measurable Results</span>
          </h2>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {impactCards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-4xl font-bold text-white">
            Our <span className="text-gradient">Journey</span>
          </h3>
          <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
            From a dream to a movement — 6 years of unstoppable growth
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full"
            style={{ background: 'linear-gradient(180deg, var(--neon-purple), var(--neon-pink), var(--neon-blue))', opacity: 0.3 }} />

          {/* Timeline items - two column desktop, single mobile */}
          <div className="flex flex-col gap-4 md:gap-0">
            {timelineData.map((item, i) => (
              <div
                key={item.year}
                className={`md:flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} relative`}
              >
                {/* Center dot - desktop */}
                <motion.div
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full items-center justify-center z-10 top-6"
                  style={{ background: item.color, boxShadow: `0 0 15px ${item.color}` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                />
                <TimelineItem item={item} index={i} isLeft={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
