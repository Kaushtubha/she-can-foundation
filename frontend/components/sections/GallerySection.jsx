// components/sections/GallerySection.jsx
// Masonry photo gallery with parallax hover and zoom effects
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Realistic gallery items with Unsplash images
const galleryItems = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    alt: 'Girls learning coding at She Can workshop',
    category: 'Workshops',
    title: 'Code for Change Bootcamp',
    height: 'tall',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    alt: 'Team meeting at annual volunteer summit',
    category: 'Events',
    title: 'Annual Volunteer Summit 2023',
    height: 'short',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80',
    alt: 'Scholarship distribution ceremony',
    category: 'Milestones',
    title: 'Scholarship Ceremony 2024',
    height: 'short',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80',
    alt: 'Young women at leadership training',
    category: 'Programs',
    title: 'Leadership Academy Graduation',
    height: 'tall',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    alt: 'Community health awareness camp',
    category: 'Community',
    title: 'Health Awareness Drive',
    height: 'short',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    alt: 'Girls studying with mentors',
    category: 'Mentorship',
    title: 'One-on-One Mentorship Program',
    height: 'tall',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
    alt: 'STEM fair winners',
    category: 'Workshops',
    title: 'STEM Innovation Fair 2023',
    height: 'short',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    alt: 'Office volunteers',
    category: 'Team',
    title: 'Our Dedicated Team',
    height: 'short',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    alt: 'Award ceremony',
    category: 'Milestones',
    title: 'National Award Ceremony',
    height: 'tall',
  },
]

const categories = ['All', 'Workshops', 'Events', 'Programs', 'Community', 'Mentorship', 'Milestones', 'Team']

// Lightbox Modal
function Lightbox({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <motion.div
        className="relative z-10 max-w-4xl w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-3xl overflow-hidden">
          <div className="relative h-[60vh]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono px-3 py-1 rounded-full mb-3 inline-block"
                style={{ background: 'rgba(155,93,229,0.2)', color: 'var(--neon-purple)' }}>
                {item.category}
              </span>
              <h4 className="font-display text-2xl font-bold text-white">{item.title}</h4>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{item.alt}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white flex-shrink-0 cursor-hover"
            >
              ✕
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Gallery Item
function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`masonry-item relative cursor-pointer rounded-2xl overflow-hidden group cursor-hover ${
        item.height === 'tall' ? 'row-span-2' : ''
      }`}
      style={{ aspectRatio: item.height === 'tall' ? '3/4' : '4/3' }}
      onClick={() => onClick(item)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full" style={{ minHeight: item.height === 'tall' ? '340px' : '200px' }}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className={`object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(3,0,20,0.9) 0%, rgba(3,0,20,0.3) 50%, transparent 100%)',
          }}
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(155,93,229,0.5)', color: 'white' }}>
            {item.category}
          </span>
        </div>

        {/* Zoom icon */}
        <motion.div
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-display text-lg font-bold text-white">{item.title}</h4>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="section-padding relative z-10">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-4 px-4 py-2 glass rounded-full"
            style={{ color: 'var(--neon-blue)' }}>
            Gallery
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-4">
            <span className="text-white">Moments That</span>
            <br />
            <span className="text-gradient">Matter</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 cursor-hover ${
                activeCategory === cat
                  ? 'border-transparent text-white'
                  : 'border-white/10 hover:border-white/30'
              }`}
              style={
                activeCategory === cat
                  ? { background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))', color: 'white' }
                  : { color: 'var(--text-secondary)' }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="masonry-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={setLightboxItem}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
