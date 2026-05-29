// components/sections/VolunteerSection.jsx
// Full-stack volunteer form with validation, loading states, and toast notifications
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const skillOptions = [
  'Teaching / Tutoring',
  'Web Development',
  'Graphic Design',
  'Content Writing',
  'Social Media',
  'Event Management',
  'Counseling / Mentoring',
  'Photography / Videography',
  'Data Analysis',
  'Legal / Finance',
  'Medical / Health',
  'Other',
]

const initialState = {
  name: '',
  email: '',
  phone: '',
  skills: [],
  message: '',
}

const initialErrors = {
  name: '',
  email: '',
  phone: '',
  skills: '',
  message: '',
}

// Input field component
function FormField({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// Success overlay
function SuccessOverlay({ onReset }) {
  return (
    <motion.div
      className="absolute inset-0 glass rounded-3xl flex flex-col items-center justify-center gap-6 z-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', duration: 0.6 }}
    >
      {/* Success checkmark animation */}
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 0.2, duration: 0.8 }}
      >
        <motion.svg
          width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.polyline
            points="20 6 9 17 4 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-display text-3xl font-bold text-white mb-3">
          Welcome, Change-Maker! 💜
        </h3>
        <p className="text-base max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Your application has been received. Our team will reach out within 48 hours to begin your volunteer journey.
        </p>
      </motion.div>

      {/* Confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: ['#9b5de5', '#f15bb5', '#00bbf9', '#00f5d4'][i % 4],
            left: `${10 + (i * 7)}%`,
            top: '20%',
          }}
          initial={{ y: 0, opacity: 1, scale: 0 }}
          animate={{
            y: [0, -80 - Math.random() * 60, 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            rotate: [0, Math.random() * 360],
          }}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
        />
      ))}

      <motion.button
        onClick={onReset}
        className="btn-secondary cursor-hover mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Submit Another
      </motion.button>
    </motion.div>
  )
}

export default function VolunteerSection() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const formRef = useRef(null)

  const validate = () => {
    const newErrors = { ...initialErrors }
    let valid = true

    if (!form.name.trim() || form.name.length < 2) {
      newErrors.name = 'Please enter your full name (min 2 characters)'
      valid = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
      valid = false
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number'
      valid = false
    }
    if (form.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill'
      valid = false
    }
    if (!form.message.trim() || form.message.length < 20) {
      newErrors.message = 'Please tell us more about yourself (min 20 characters)'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSkillToggle = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
    if (errors.skills) setErrors(prev => ({ ...prev, skills: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors above', { icon: '⚠️' })
      return
    }

    setLoading(true)
    try {
      await axios.post(`${BACKEND_URL}/api/volunteers`, form)
      setSuccess(true)
      setForm(initialState)
      toast.success('Application submitted successfully!', { icon: '🎉' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(msg, { icon: '❌' })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => setSuccess(false)

  return (
    <section id="volunteer" className="section-padding relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 px-4 py-2 glass rounded-full"
              style={{ color: 'var(--neon-cyan)' }}>
              Get Involved
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold leading-tight mt-4 mb-6">
              <span className="text-white">Be the</span>
              <br />
              <span className="text-gradient">Change You</span>
              <br />
              <span className="text-white">Want to See</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              Join hundreds of passionate volunteers who are transforming lives every single day.
              Whether you're a teacher, designer, developer, or just someone with a big heart —
              we have a place for you.
            </p>

            {/* Benefits */}
            {[
              { icon: '🎯', title: 'Meaningful Work', desc: 'Your time directly impacts real lives in your community.' },
              { icon: '📈', title: 'Grow Your Skills', desc: 'Gain leadership, communication, and project management experience.' },
              { icon: '🤝', title: 'Build a Network', desc: 'Connect with passionate changemakers and industry professionals.' },
              { icon: '🏅', title: 'Earn Recognition', desc: 'Receive certificates, letters of recommendation, and public recognition.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="flex gap-4 mb-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{title}</div>
                  <div className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            ref={formRef}
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="glass rounded-3xl p-8 relative overflow-hidden neon-border">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {success ? (
                  <SuccessOverlay key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative z-10 flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-2">
                      <h3 className="font-display text-2xl font-bold text-white">Volunteer Application</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Fill in the details below and we'll be in touch soon.
                      </p>
                    </div>

                    {/* Name */}
                    <FormField label="Full Name" id="name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Sharma"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        autoComplete="name"
                      />
                    </FormField>

                    {/* Email */}
                    <FormField label="Email Address" id="email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        autoComplete="email"
                      />
                    </FormField>

                    {/* Phone */}
                    <FormField label="Phone Number" id="phone" error={errors.phone}>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                          style={{ color: 'var(--text-muted)' }}>+91</span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          className={`form-input pl-12 ${errors.phone ? 'error' : ''}`}
                          autoComplete="tel"
                        />
                      </div>
                    </FormField>

                    {/* Skills */}
                    <FormField label="Your Skills" id="skills" error={errors.skills}>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skillOptions.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-hover ${
                              form.skills.includes(skill)
                                ? 'border-purple-500 text-white'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                            style={
                              form.skills.includes(skill)
                                ? { background: 'linear-gradient(135deg, rgba(155,93,229,0.3), rgba(241,91,181,0.2))', color: 'white' }
                                : { color: 'var(--text-secondary)' }
                            }
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </FormField>

                    {/* Message */}
                    <FormField label="Why Do You Want to Volunteer?" id="message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your motivation, experience, and how you'd like to contribute..."
                        rows={4}
                        className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                      />
                      <div className="text-right mt-1">
                        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                          {form.message.length}/500
                        </span>
                      </div>
                    </FormField>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full mt-2 cursor-hover relative overflow-hidden"
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Submitting Your Application...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Submit Application
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      )}
                    </motion.button>

                    <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                      By submitting, you agree to our Privacy Policy. We respect your data.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
