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
      transition={spin ? { duration: 10, repeat: Infinity, ease: 'linear' } : {}}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 40% 35%, rgba(255,80,60,0.18) 0%, rgba(30,180,80,0.12) 40%, rgba(30,60,220,0.1) 70%, transparent 100%)',
            transform: 'scale(1.6)',
            filter: 'blur(14px)',
            zIndex: 0,
          }}
        />
      )}
      {/* Trionda — official FIFA World Cup 2026 match ball */}
      <img
        src="/images/ball/trionda-1.jpg"
        alt="Adidas Trionda — Official FIFA World Cup 2026 Match Ball"
        width={size}
        height={size}
        loading="eager"
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          filter: glow
            ? 'drop-shadow(0 0 10px rgba(255,80,60,0.35)) drop-shadow(0 0 20px rgba(30,60,220,0.2))'
            : 'none',
        }}
      />
    </motion.div>
  )
}
