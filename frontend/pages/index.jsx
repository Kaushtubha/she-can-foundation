// pages/index.jsx
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ImpactSection from '../components/sections/ImpactSection'
import VolunteerSection from '../components/sections/VolunteerSection'
import GallerySection from '../components/sections/GallerySection'
import TestimonialsSection from '../components/sections/TestimonialsSection'

export default function Home({ theme, toggleTheme }) {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <ImpactSection />
        <VolunteerSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
