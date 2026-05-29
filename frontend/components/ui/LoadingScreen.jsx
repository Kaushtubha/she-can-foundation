// components/ui/LoadingScreen.jsx
// Cinematic loading screen with progress animation
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const steps = [
      { target: 30, delay: 100 },
      { target: 65, delay: 400 },
      { target: 85, delay: 700 },
      { target: 100, delay: 1000 },
    ]

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay)
    })

    setTimeout(() => {
      setDone(true)
      setTimeout(onComplete, 600)
    }, 1800)
  }, [onComplete])

  const letters = 'SHE CAN'.split('')

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo text animated entrance */}
          <div className="flex gap-1 mb-4" aria-label="She Can Foundation">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-5xl font-bold text-gradient"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="text-sm font-mono tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Foundation
          </motion.p>

          {/* Spinner */}
          <motion.div
            className="loading-logo-ring mt-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />

          {/* Progress bar */}
          <motion.div
            className="loading-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="loading-progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Progress number */}
          <motion.span
            className="text-xs font-mono mt-2"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.span>

          {/* Floating orbs */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 blur-3xl"
              style={{
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                background: i === 0
                  ? 'var(--neon-purple)'
                  : i === 1
                    ? 'var(--neon-pink)'
                    : 'var(--neon-blue)',
                left: `${15 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
