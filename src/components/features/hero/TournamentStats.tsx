import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const STATS = [
  { value: 48,  label: 'Nations',  suffix: '' },
  { value: 12,  label: 'Groups',   suffix: '' },
  { value: 16,  label: 'Venues',   suffix: '' },
  { value: 104, label: 'Matches',  suffix: '' },
  { value: 32,  label: 'Days',     suffix: '' },
]

function Stat({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) {
      setCount(0)
      return
    }
    if (shouldReduce) { setCount(value); return }
    const start = performance.now()
    const dur = 1800
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, shouldReduce])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 16px',
        position: 'relative',
      }}
    >
      {/* Vertical divider (not after last) */}
      {index < STATS.length - 1 && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: '20%',
            bottom: '20%',
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.25), transparent)',
          }}
        />
      )}

      {/* Big number */}
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(64px, 8vw, 100px)',
          lineHeight: 0.9,
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: 'var(--color-primary)',
          textShadow: '0 0 40px rgba(255,215,0,0.3)',
          tabularNums: 'tabular-nums',
        }}
      >
        {count}{suffix}
      </span>

      {/* Label */}
      <span
        style={{
          marginTop: 12,
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </span>

      {/* Gold underline dot */}
      <span
        style={{
          marginTop: 8,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(255,215,0,0.4)',
          display: 'block',
        }}
      />
    </motion.div>
  )
}

export function TournamentStats() {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        background: 'linear-gradient(180deg, var(--color-bg-surface) 0%, var(--color-bg-base) 100%)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
    >
      {/* Background STATS watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(120px, 18vw, 220px)',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: 'rgba(255,215,0,0.025)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          FIFA 2026
        </span>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          position: 'relative',
          paddingLeft: 'var(--gutter-x)',
          paddingRight: 'var(--gutter-x)',
        }}
        className="md:grid-cols-5"
      >
        {STATS.map((s, i) => <Stat key={s.label} {...s} index={i} />)}
      </div>
    </div>
  )
}
