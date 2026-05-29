// components/ui/ParticlesBackground.jsx
// Pure canvas particle system with connecting lines
import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let mouse = { x: null, y: null }

    const PARTICLE_COUNT = window.innerWidth < 768 ? 50 : 100
    const CONNECTION_DISTANCE = 150
    const MOUSE_REPEL_DISTANCE = 120

    const colors = [
      'rgba(155, 93, 229, ',
      'rgba(241, 91, 181, ',
      'rgba(0, 187, 249, ',
      'rgba(0, 245, 212, ',
    ]

    class Particle {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width
        this.y = initial ? Math.random() * canvas.height : canvas.height + 10
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = -(Math.random() * 0.5 + 0.1)
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.5 + 0.1
        this.opacitySpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
        this.pulse = 0
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += this.pulseSpeed
        this.opacity += this.opacitySpeed
        if (this.opacity > 0.6 || this.opacity < 0.05) this.opacitySpeed *= -1

        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_REPEL_DISTANCE) {
            const force = (MOUSE_REPEL_DISTANCE - dist) / MOUSE_REPEL_DISTANCE
            this.x += (dx / dist) * force * 2
            this.y += (dy / dist) * force * 2
          }
        }

        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset()
        }
      }

      draw() {
        const pulsedSize = this.size + Math.sin(this.pulse) * 0.5
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulsedSize, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulsedSize * 3, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulsedSize * 3)
        grad.addColorStop(0, this.color + (this.opacity * 0.3) + ')')
        grad.addColorStop(1, this.color + '0)')
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      resize()
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(155, 93, 229, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()
      animId = requestAnimationFrame(animate)
    }

    function handleMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function handleMouseLeave() {
      mouse.x = null
      mouse.y = null
    }

    init()
    animate()

    window.addEventListener('resize', () => { resize(); init() })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
