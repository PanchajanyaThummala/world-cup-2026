import { motion, useReducedMotion } from 'framer-motion'

interface SoccerBallProps {
  size?: number
  className?: string
  glow?: boolean
  spin?: boolean
}

export function SoccerBall({ size = 80, className = '', glow = true, spin = true }: SoccerBallProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={spin && !shouldReduce ? { rotate: 360 } : {}}
      transition={spin ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.25) 0%, transparent 70%)',
            transform: 'scale(1.8)',
            filter: 'blur(12px)',
          }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 1, filter: glow ? 'drop-shadow(0 0 8px rgba(201,168,76,0.4))' : 'none' }}
      >
        <defs>
          <radialGradient id="ballGrad" cx="38%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#F0D98B" />
            <stop offset="40%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#4a3800" />
          </radialGradient>
          <radialGradient id="darkPanel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1200" />
            <stop offset="100%" stopColor="#0a0800" />
          </radialGradient>
          <clipPath id="ballClip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </defs>

        {/* Ball base */}
        <circle cx="50" cy="50" r="48" fill="url(#ballGrad)" />

        {/* Classic soccer ball panel pattern — dark panels on gold */}
        <g clipPath="url(#ballClip)" fill="url(#darkPanel)" opacity="0.85">
          {/* Center pentagon */}
          <polygon points="50,28 62,37 57,51 43,51 38,37" />
          {/* Top pentagon */}
          <polygon points="50,6 58,14 54,24 46,24 42,14" />
          {/* Bottom pentagon */}
          <polygon points="50,94 42,86 46,76 54,76 58,86" />
          {/* Left pentagons */}
          <polygon points="14,38 24,34 30,44 22,52 12,48" />
          <polygon points="8,62 18,58 26,66 20,76 8,74" />
          {/* Right pentagons */}
          <polygon points="86,38 76,34 70,44 78,52 88,48" />
          <polygon points="92,62 82,58 74,66 80,76 92,74" />
          {/* Upper left */}
          <polygon points="24,18 34,16 38,26 30,34 20,28" />
          {/* Upper right */}
          <polygon points="76,18 66,16 62,26 70,34 80,28" />
          {/* Lower left */}
          <polygon points="20,72 30,66 38,74 34,84 24,82" />
          {/* Lower right */}
          <polygon points="80,72 70,66 62,74 66,84 76,82" />
        </g>

        {/* Specular highlight */}
        <ellipse cx="38" cy="34" rx="10" ry="7" fill="rgba(255,255,255,0.15)" style={{ filter: 'blur(2px)' }} />

        {/* Rim */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}
