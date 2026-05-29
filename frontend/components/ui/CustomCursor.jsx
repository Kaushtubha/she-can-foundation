// components/ui/CustomCursor.jsx
// Magnetic glow cursor that follows mouse with smooth lag
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const outlinePos = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnterLink = () => {
      outlineRef.current?.classList.add('expanded')
    }

    const handleMouseLeaveLink = () => {
      outlineRef.current?.classList.remove('expanded')
    }

    const animateCursor = () => {
      // Dot follows mouse instantly
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.95
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.95

      // Outline follows with smooth lag
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * 0.12
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`
        dotRef.current.style.top = `${dotPos.current.y}px`
      }

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlinePos.current.x}px`
        outlineRef.current.style.top = `${outlinePos.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animateCursor)
    }

    // Attach listeners to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    document.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animateCursor)

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover')
      newInteractives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnterLink)
        el.addEventListener('mouseleave', handleMouseLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" aria-hidden="true" />
    </>
  )
}
