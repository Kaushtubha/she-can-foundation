// components/layout/Footer.jsx
// Footer with animated wave, social links, contact info, and mini newsletter
import { motion } from 'framer-motion'
import { useState } from 'react'

const footerLinks = {
  'Foundation': [
    { label: 'About Us', href: '#about' },
    { label: 'Our Mission', href: '#about' },
    { label: 'Impact', href: '#impact' },
    { label: 'Gallery', href: '#gallery' },
  ],
  'Programs': [
    { label: 'Digital Literacy', href: '#' },
    { label: 'Leadership Academy', href: '#' },
    { label: 'Code for Change', href: '#' },
    { label: 'Mentorship Program', href: '#' },
  ],
  'Get Involved': [
    { label: 'Volunteer', href: '#volunteer' },
    { label: 'Donate', href: '#' },
    { label: 'Corporate CSR', href: '#' },
    { label: 'Become a Mentor', href: '#' },
  ],
}

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'Twitter/X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Animated Wave SVG */}
      <div className="relative h-32 overflow-hidden" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute w-full"
            style={{
              height: '120px',
              top: 0,
              opacity: i === 0 ? 0.3 : i === 1 ? 0.2 : 0.1,
              fill: i === 0 ? 'var(--neon-purple)' : i === 1 ? 'var(--neon-pink)' : 'var(--neon-blue)',
            }}
            animate={{ x: i % 2 === 0 ? [0, -100, 0] : [0, 100, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"/>
          </motion.svg>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand col */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' }}>
                <span className="text-white font-display font-bold text-sm">SC</span>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gradient">She Can</div>
                <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Foundation</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Empowering young women through education, technology, and mentorship.
              Building a future where every girl can realize her potential.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-mono tracking-wider uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                Stay Updated
              </p>
              {subscribed ? (
                <motion.div
                  className="flex items-center gap-2 text-green-400 text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span>✓</span>
                  <span>Thank you for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input flex-1 text-sm py-2.5"
                  />
                  <button type="submit" className="btn-primary text-sm py-2.5 px-4 cursor-hover whitespace-nowrap">
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:scale-110 cursor-hover"
                  style={{ '--hover-shadow': 'var(--shadow-neon)' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-neon)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          {Object.entries(footerLinks).map(([group, links], i) => (
            <motion.div
              key={group}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase mb-5 font-semibold"
                style={{ color: 'var(--text-muted)' }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        if (href.startsWith('#')) {
                          e.preventDefault()
                          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="text-sm hover:text-white transition-colors duration-300 cursor-hover nav-link"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact col */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase mb-5 font-semibold"
              style={{ color: 'var(--text-muted)' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📍', text: '45 Civil Lines, Bhopal, MP 462001', label: 'Address' },
                { icon: '📧', text: 'hello@shecan.org', label: 'Email' },
                { icon: '📞', text: '+91 75 0000 0000', label: 'Phone' },
                { icon: '🕐', text: 'Mon–Sat, 9 AM – 6 PM IST', label: 'Hours' },
              ].map(({ icon, text, label }) => (
                <div key={label} className="flex gap-3 items-start">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} She Can Foundation. All rights reserved. Made with 💜 in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs hover:text-white transition-colors cursor-hover"
                style={{ color: 'var(--text-muted)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
