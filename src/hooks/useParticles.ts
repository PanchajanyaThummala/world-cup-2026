import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  fadeSpeed: number
}

export function useParticles(count = 80) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const spawn = (): Particle => ({
      x: Math.random() * (canvas.width || 1),
      y: Math.random() * (canvas.height || 1),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      fadeSpeed: Math.random() * 0.002 + 0.001,
    })

    const init = () => {
      resize()
      particles = Array.from({ length: count }, spawn)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.opacity -= p.fadeSpeed
        if (p.opacity <= 0 || p.y < -10) particles[i] = spawn()

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = '#C9A84C'
        ctx.shadowBlur = 4
        ctx.shadowColor = '#C9A84C'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return canvasRef
}
