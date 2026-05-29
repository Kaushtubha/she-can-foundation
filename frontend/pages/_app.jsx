// pages/_app.jsx
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import '../styles/globals.css'
import LoadingScreen from '../components/ui/LoadingScreen'
import CustomCursor from '../components/ui/CustomCursor'
import ParticlesBackground from '../components/ui/ParticlesBackground'

export default function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.className = saved
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.className = next
  }

  return (
    <>
      <Head>
        <title>She Can Foundation – Empowering Youth, Creating Opportunities</title>
        <meta name="description" content="She Can Foundation empowers young women through education, mentorship, and skill development programs across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="She Can Foundation" />
        <meta property="og:description" content="Empowering Youth. Creating Opportunities." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticlesBackground />
          <CustomCursor />
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />
            </motion.div>
          </AnimatePresence>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(13,16,48,0.95)',
                color: '#fff',
                border: '1px solid rgba(155,93,229,0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
              duration: 4000,
            }}
          />
        </>
      )}
    </>
  )
}
